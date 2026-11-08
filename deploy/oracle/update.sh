#!/usr/bin/env bash
# Deploy the latest commit on main to the Oracle Cloud server.
# Run on the server:  bash ~/blisscamp-india/deploy/oracle/update.sh
set -euo pipefail

cd "$HOME/blisscamp-india"
git pull --ff-only
npm ci
npm run build
pm2 restart blisscamp
echo "Deployed $(git log -1 --format='%h %s')"
