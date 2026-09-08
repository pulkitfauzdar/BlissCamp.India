import Stripe from "stripe";

function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your .env file — see .env.example."
    );
  }
  return key;
}

let stripeInstance: Stripe | null = null;

// Lazily constructed so the app can build/boot without Stripe keys present
// (e.g. in CI), and only throws when a booking is actually attempted.
export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(getStripeSecretKey(), {
      apiVersion: "2024-06-20",
    });
  }
  return stripeInstance;
}
