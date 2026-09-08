import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: { booking?: string };
}) {
  const booking = searchParams.booking
    ? await prisma.booking.findUnique({
        where: { id: searchParams.booking },
        include: { trek: true, departure: true },
      })
    : null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <span className="font-display text-3xl italic text-amber-dark">✓</span>
      <h1 className="mt-4 font-display text-3xl text-spruce">
        {booking?.status === "confirmed" ? "Booking confirmed" : "Payment received"}
      </h1>
      {booking ? (
        <div className="mt-6 space-y-1 text-sm text-ink/70">
          <p>{booking.trek.title}</p>
          <p>{new Date(booking.departure.date).toDateString()}</p>
          <p>
            {booking.travelers} traveler{booking.travelers > 1 ? "s" : ""} ·{" "}
            {formatMoney(booking.amountPaise)}
          </p>
          <p className="pt-2 text-xs text-ink/50">
            A confirmation has been sent to {booking.email}. If the status above
            still says &quot;payment received&quot;, it will flip to
            &quot;confirmed&quot; within a minute once our system finishes
            processing your payment.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink/70">
          Your payment went through. Check your email for confirmation details.
        </p>
      )}
      <Link
        href="/treks"
        className="mt-10 inline-block bg-spruce px-6 py-3 text-sm font-medium text-stone-paper hover:bg-spruce-dark"
      >
        Browse more treks
      </Link>
    </div>
  );
}
