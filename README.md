# Blisscamp India

A booking website for a Himalayan trekking company: trek listings, trek detail
pages with a day-by-day itinerary and elevation profile, and a full booking
flow with date/traveler selection and Stripe payment.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma ·
SQLite in dev (swap to Postgres/MySQL for production) · Stripe Checkout.

## What's actually implemented

- Trek listing and detail pages, rendered from the database (not hardcoded).
- Upcoming departure dates per trek, with live seats-left.
- Booking form → Stripe Checkout → webhook confirms the booking and marks
  seats as taken.
- Seat reservation happens in a database transaction at checkout time, so two
  people can't both book the last seat. If a checkout session expires
  unpaid, the webhook releases the seats automatically.
- Placeholder copy, prices, and stock photography for three treks — replace
  before launch (see "Replacing placeholder content" below).

## What's intentionally out of scope

This is a strong starting point, not a finished company site. Before taking
real bookings, you'll still want:

- **An admin view.** Right now, treks and departures are managed via
  `prisma/seed.ts` or Prisma Studio (`npm run db:studio`), not a UI. If
  you'll be adding treks often, that's the next thing worth building.
- **Email notifications.** The webhook confirms bookings in the database, but
  no confirmation email is sent yet — wire up something like Resend or
  Postmark in `src/app/api/webhook/route.ts`.
- **Refunds and cancellations.** Not built. You'd handle these from the
  Stripe Dashboard directly to start.

## Local setup

1. **Install dependencies**
   ```bash
   npm install
   ```
   This also runs `prisma generate`, which downloads Prisma's query engine —
   it needs normal internet access to `binaries.prisma.sh`. (This step
   couldn't be verified in the sandbox this project was built in, since that
   environment blocks that domain — it should work fine on your machine or
   CI.)

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Stripe test keys (see below). The default `DATABASE_URL`
   (SQLite) works with no other setup for local development.

3. **Create the database and load placeholder treks**
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Run it**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

## Setting up Stripe

1. Create a [Stripe account](https://dashboard.stripe.com/register) if you
   don't have one, and switch to **test mode**.
2. Copy your test **Secret key** and **Publishable key** from
   [API keys](https://dashboard.stripe.com/test/apikeys) into `.env`.
3. For webhooks during local dev, install the
   [Stripe CLI](https://docs.stripe.com/stripe-cli) and run:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   This prints a webhook signing secret (`whsec_...`) — put that in
   `STRIPE_WEBHOOK_SECRET`.
4. Test a booking with Stripe's test card `4242 4242 4242 4242`, any future
   expiry date, and any CVC.
5. When you're ready to take real payments, switch to your live API keys and
   create a **live** webhook endpoint in the Stripe Dashboard pointing at
   `https://yourdomain.com/api/webhook`, listening for at least
   `checkout.session.completed` and `checkout.session.expired`.

## Replacing placeholder content

All trek content — copy, pricing, itinerary, images — lives in
`prisma/seed.ts`. Edit the `treks` array there (or build an admin UI on top
of the same Prisma models) and re-run `npm run db:seed`; it upserts by slug,
so re-running it is safe. Prices are stored as integer paise (₹1 = 100), to
avoid floating-point rounding on money.

Trek photography currently links to Unsplash placeholders. Replace the
`images` array per trek with your own photos before launch — either hosted
files, or update `next.config.mjs`'s `images.remotePatterns` if you use a
different image host.

## Going to production

The live site runs on **[Render](https://render.com)** (hosting) with a
**[Supabase](https://supabase.com)** Postgres database:
<https://blisscamp-india.onrender.com>.

1. **Database (Supabase).** `prisma/schema.prisma` uses Postgres.
   `DATABASE_URL` is Supabase's pooled connection (port 6543, with
   `?pgbouncer=true`) and `DIRECT_URL` is the direct connection (port 5432),
   used only by `db push`. If the database password contains special
   characters such as `@`, URL-encode them (`@` → `%40`). To create the
   tables and load the treks, run once against Supabase:
   ```bash
   npm run db:push && npm run db:seed
   ```
2. **Deploy (Render).** Create a **Web Service** from this GitHub repo:
   - Runtime: **Node** · Branch: **main** · Region: **Singapore** (same as
     the Supabase database)
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Instance type: **Free**
   - Environment variables: `DATABASE_URL`, `DIRECT_URL`,
     `NEXT_PUBLIC_SITE_URL` (`https://blisscamp-india.onrender.com`) and
     `NEXT_PUBLIC_CURRENCY` (`inr`)
   - Turn **Auto-Deploy** on (Settings → Build & Deploy) so every push to
     `main` redeploys. Otherwise use **Manual Deploy → Deploy latest commit**.
3. **Free-plan notes.**
   - Render's free instance sleeps after 15 minutes without visitors; the
     next visit takes 30–60 seconds to wake it. The paid Starter instance
     removes this.
   - Next.js's image optimizer runs out of resources on the free instance,
     so `next.config.mjs` sets `images.unoptimized: true` and photos load
     straight from Unsplash.
   - Supabase pauses free projects after a week without activity. If the
     live site shows a database error, restore the project from the
     Supabase dashboard.
4. **Online payments (optional).** Bookings currently go through WhatsApp.
   To turn Stripe checkout back on, add the Stripe keys to Render's
   environment variables and set up the production webhook as described in
   "Setting up Stripe" above.

## Project structure

```
prisma/schema.prisma       Trek, Departure and Booking models
prisma/seed.ts             Placeholder trek content — edit this
src/app/                   Pages (home, treks, treks/[slug], booking/*)
src/app/api/checkout/      Creates the Stripe Checkout session
src/app/api/webhook/       Confirms bookings, releases expired holds
src/components/            Navbar, Footer, TrekCard, BookingWidget, etc.
src/lib/                   Prisma client, Stripe client, money formatting
```
