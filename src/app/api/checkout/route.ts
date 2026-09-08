import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { checkoutRequestSchema } from "@/lib/validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = checkoutRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }
  const { trekId, departureId, travelers, name, email, phone } = parsed.data;

  const trek = await prisma.trek.findUnique({ where: { id: trekId } });
  if (!trek) {
    return NextResponse.json({ error: "Trek not found." }, { status: 404 });
  }

  // Reserve seats and create a pending booking in one transaction so two
  // simultaneous bookings can't both claim the last seat.
  let booking;
  try {
    booking = await prisma.$transaction(async (tx) => {
      const departure = await tx.departure.findUnique({ where: { id: departureId } });
      if (!departure || departure.trekId !== trekId) {
        throw new Error("DEPARTURE_NOT_FOUND");
      }
      const seatsLeft = departure.capacity - departure.booked;
      if (travelers > seatsLeft) {
        throw new Error("NOT_ENOUGH_SEATS");
      }

      await tx.departure.update({
        where: { id: departureId },
        data: { booked: { increment: travelers } },
      });

      return tx.booking.create({
        data: {
          trekId,
          departureId,
          travelers,
          name,
          email,
          phone,
          amountPaise: trek.pricePerPersonPaise * travelers,
          currency: process.env.NEXT_PUBLIC_CURRENCY || "inr",
          status: "pending",
        },
      });
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "UNKNOWN";
    if (message === "NOT_ENOUGH_SEATS") {
      return NextResponse.json(
        { error: "Not enough seats left on that date." },
        { status: 409 }
      );
    }
    if (message === "DEPARTURE_NOT_FOUND") {
      return NextResponse.json({ error: "Departure date not found." }, { status: 404 });
    }
    console.error("Booking transaction failed:", err);
    return NextResponse.json({ error: "Could not create booking." }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const departure = await prisma.departure.findUniqueOrThrow({ where: { id: departureId } });

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: booking.currency,
            unit_amount: trek.pricePerPersonPaise,
            product_data: {
              name: `${trek.title} — ${travelers} traveler${travelers > 1 ? "s" : ""}`,
              description: `Departure on ${departure.date.toDateString()}`,
            },
          },
          quantity: travelers,
        },
      ],
      metadata: {
        bookingId: booking.id,
        trekId,
        departureId,
        travelers: String(travelers),
      },
      success_url: `${siteUrl}/booking/success?booking=${booking.id}`,
      cancel_url: `${siteUrl}/booking/cancel?booking=${booking.id}`,
    });

    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Roll back the seat reservation if Stripe session creation failed.
    await prisma.$transaction([
      prisma.departure.update({
        where: { id: departureId },
        data: { booked: { decrement: travelers } },
      }),
      prisma.booking.update({
        where: { id: booking.id },
        data: { status: "cancelled" },
      }),
    ]);
    console.error("Stripe session creation failed:", err);
    return NextResponse.json(
      { error: "Payment provider is unavailable right now. Please try again." },
      { status: 502 }
    );
  }
}
