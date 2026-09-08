import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

// Stripe needs the raw request body to verify the signature, so this route
// must not run through any body-parsing middleware.
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      if (bookingId) {
        await prisma.booking.updateMany({
          where: { id: bookingId, status: "pending" },
          data: { status: "confirmed" },
        });
      }
      break;
    }

    // Covers abandoned checkouts (Stripe expires unpaid sessions, by
    // default after 24 hours) — release the seats we reserved.
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      const departureId = session.metadata?.departureId;
      const travelers = Number(session.metadata?.travelers ?? 0);

      if (bookingId && departureId && travelers > 0) {
        await prisma.$transaction(async (tx) => {
          const booking = await tx.booking.findUnique({ where: { id: bookingId } });
          if (booking && booking.status === "pending") {
            await tx.booking.update({
              where: { id: bookingId },
              data: { status: "cancelled" },
            });
            await tx.departure.update({
              where: { id: departureId },
              data: { booked: { decrement: travelers } },
            });
          }
        });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
