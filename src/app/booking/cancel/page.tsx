import Link from "next/link";

export default function BookingCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-spruce">Checkout cancelled</h1>
      <p className="mt-4 text-sm text-ink/70">
        No payment was taken. Your seats weren&apos;t confirmed — feel free to
        try again whenever you&apos;re ready.
      </p>
      <Link
        href="/treks"
        className="mt-10 inline-block bg-spruce px-6 py-3 text-sm font-medium text-stone-paper hover:bg-spruce-dark"
      >
        Back to all treks
      </Link>
    </div>
  );
}
