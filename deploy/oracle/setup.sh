#!/usr/bin/env bash
# One-time setup of BlissCamp India on an Oracle Cloud "Always Free" Ubuntu VM.
#
# Run it on the server as the default "ubuntu" user:
#   curl -fsSL https://raw.githubusercontent.com/pulkitfauzdar/BlissCamp.India/main/deploy/oracle/setup.sh | bash
#
# It installs Node.js 20, PM2 (keeps the app running and restarts it on reboot)
# and Caddy (serves the site on ports 80/443 with a free HTTPS certificate),
# then clones the repo, builds it and starts it. Safe to run again.
set -euo pipefail

REPO="https://github.com/pulkitfauzdar/BlissCamp.India.git"
APP_DIR="$HOME/blisscamp-india"
APP_NAME="blisscamp"
PORT=3000

step() { printf '\n\033[1;32m==> %s\033[0m\n' "$1"; }

step "Installing system packages"
sudo apt-get update -y
sudo apt-get install -y git curl gnupg debian-keyring debian-archive-keyring apt-transport-https

# The 1 GB "Micro" VM runs out of memory during `next build` without swap.
if [ "$(free -m | awk '/^Mem:/ {print $2}')" -lt 3000 ] && [ ! -f /swapfile ]; then
  step "Adding 2 GB of swap"
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
fi

if ! command -v node >/dev/null || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]; then
  step "Installing Node.js 20"
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null; then
  step "Installing PM2"
  sudo npm install -g pm2
fi

if ! command -v caddy >/dev/null; then
  step "Installing Caddy"
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | sudo gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    | sudo tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
  sudo apt-get update -y
  sudo apt-get install -y caddy
fi

# Oracle's Ubuntu images block every port except SSH in iptables, on top of
# the VCN security list (which you open in the Oracle console).
step "Opening ports 80 and 443 in the server firewall"
for p in 80 443; do
  sudo iptables -C INPUT -p tcp --dport "$p" -j ACCEPT 2>/dev/null \
    || sudo iptables -I INPUT 1 -p tcp --dport "$p" -j ACCEPT
done
if command -v netfilter-persistent >/dev/null; then
  sudo netfilter-persistent save
fi

step "Fetching the code"
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" pull --ff-only
else
  git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"

# Without a domain of your own, sslip.io gives the server's IP a free hostname
# (1.2.3.4 -> 1-2-3-4.sslip.io) that Caddy can get an HTTPS certificate for.
PUBLIC_IP="$(curl -fsSL https://ifconfig.me)"
DOMAIN="${DOMAIN:-${PUBLIC_IP//./-}.sslip.io}"

if [ ! -f .env ]; then
  step "Database settings"
  echo "Paste the Supabase connection strings (Supabase -> Connect -> ORMs -> Prisma)."
  echo "Encode special characters in the password, e.g. @ as %40."
  read -r -p "DATABASE_URL (port 6543, ends with ?pgbouncer=true): " DATABASE_URL </dev/tty
  read -r -p "DIRECT_URL (port 5432): " DIRECT_URL </dev/tty
  cat > .env <<EOF
DATABASE_URL="$DATABASE_URL"
DIRECT_URL="$DIRECT_URL"
NEXT_PUBLIC_SITE_URL="https://$DOMAIN"
NEXT_PUBLIC_CURRENCY="inr"
EOF
  chmod 600 .env
fi

step "Building the site (takes a few minutes)"
npm ci
npm run build

step "Starting the site with PM2"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME"
else
  pm2 start node_modules/next/dist/bin/next --name "$APP_NAME" -- start -H 127.0.0.1 -p "$PORT"
fi
pm2 save
sudo env PATH="$PATH" "$(command -v pm2)" startup systemd -u "$USER" --hp "$HOME" >/dev/null

step "Serving https://$DOMAIN with Caddy"
sudo tee /etc/caddy/Caddyfile >/dev/null <<EOF
$DOMAIN {
	encode gzip
	reverse_proxy 127.0.0.1:$PORT
}
EOF
sudo systemctl reload caddy || sudo systemctl restart caddy

step "Done"
echo "Your site: https://$DOMAIN"
echo "To deploy new commits later, run: bash $APP_DIR/deploy/oracle/update.sh"
