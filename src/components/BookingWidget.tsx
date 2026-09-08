"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/money";

type Departure = {
  id: string;
  date: string;
  seatsLeft: number;
};

export default function BookingWidget({
  trekId,
  trekTitle,
  pricePerPersonPaise,
  groupSizeMax,
  departures,
}: {
  trekId: string;
  trekTitle: string;
  pricePerPersonPaise: number;
  groupSizeMax: number;
  departures: Departure[];
}) {
  const [departureId, setDepartureId] = useState(departures[0]?.id ?? "");
  const [travelers, setTravelers] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedDeparture = departures.find((d) => d.id === departureId);
  const maxTravelers = Math.min(selectedDeparture?.seatsLeft ?? groupSizeMax, groupSizeMax);
  const total = pricePerPersonPaise * travelers;

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    []
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!departureId) {
      setError("Choose a departure date to continue.");
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Fill in your name, email and phone to continue.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trekId,
          departureId,
          travelers,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setLoading(false);
    }
  }

  if (departures.length === 0) {
    return (
      <div className="border border-line bg-stone-paper p-6">
        <p className="font-display text-lg text-spruce">No open departures right now</p>
        <p className="mt-2 text-sm text-ink/70">
          {trekTitle} isn&apos;t scheduled for the next few months. Write to us and
          we&apos;ll let you know when new dates are added.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-stone-paper p-6"
      aria-label={`Book ${trekTitle}`}
    >
      <p className="font-display text-lg text-spruce">Book this trek</p>

      <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-ink/60">
        Departure date
      </label>
      <div className="mt-2 space-y-2">
        {departures.map((d) => (
          <label
            key={d.id}
            className={`flex cursor-pointer items-center justify-between border px-3 py-2 text-sm transition-colors ${
              departureId === d.id
                ? "border-spruce bg-spruce/5"
                : "border-line hover:border-spruce/40"
            } ${d.seatsLeft === 0 ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="departure"
                value={d.id}
                checked={departureId === d.id}
                disabled={d.seatsLeft === 0}
                onChange={() => {
                  setDepartureId(d.id);
                  setTravelers(1);
                }}
                className="accent-spruce"
              />
              {dateFormatter.format(new Date(d.date))}
            </span>
            <span className="text-ink/60">
              {d.seatsLeft === 0 ? "Full" : `${d.seatsLeft} seats left`}
            </span>
          </label>
        ))}
      </div>

      <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-ink/60">
        Travelers
      </label>
      <input
        type="number"
        min={1}
        max={maxTravelers || 1}
        value={travelers}
        onChange={(e) =>
          setTravelers(Math.max(1, Math.min(maxTravelers || 1, Number(e.target.value))))
        }
        className="mt-2 w-24 border border-line bg-white px-3 py-2 text-sm"
      />

      <div className="mt-5 grid gap-3">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
            Full name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border border-line bg-white px-3 py-2 text-sm"
            placeholder="As on your ID"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-line bg-white px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
            Phone
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full border border-line bg-white px-3 py-2 text-sm"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="text-ink/70">
          {formatMoney(pricePerPersonPaise)} × {travelers}
        </span>
        <span className="font-display text-lg text-spruce">{formatMoney(total)}</span>
      </div>

      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={loading || maxTravelers === 0}
        className="mt-5 w-full bg-amber px-4 py-3 text-sm font-medium text-spruce-dark transition-colors hover:bg-amber-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting to payment…" : "Continue to payment"}
      </button>
      <p className="mt-3 text-center text-xs text-ink/50">
        Secure payment via Stripe. You&apos;ll get a confirmation email once paid.
      </p>
    </form>
  );
}
