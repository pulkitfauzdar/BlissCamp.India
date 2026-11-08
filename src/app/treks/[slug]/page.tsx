import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllTreks,
  getNextDepartureByTrek,
  getTrekBySlug,
  getUpcomingDepartures,
  MONTHS,
} from "@/lib/treks";
import { formatMoney } from "@/lib/money";
import { cancellationPolicy, contact, generalFaqs, packingList, whatsappLink } from "@/lib/site";
import ElevationProfile from "@/components/ElevationProfile";
import BmiCalculator from "@/components/BmiCalculator";
import FaqList from "@/components/FaqList";
import TrekCard from "@/components/TrekCard";

// Rebuilt at most every 5 minutes instead of on every visit, so the small
// Render instance serves cached HTML and rarely touches the database.
export const revalidate = 300;

// Lets Next cache trek pages; new treks added later are built on first visit.
export async function generateStaticParams() {
  const treks = await getAllTreks();
  return treks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const trek = await getTrekBySlug(params.slug);
  if (!trek) return {};
  return {
    title: `${trek.title} — ${trek.durationDays} days | Blisscamp India`,
    description: trek.summary,
  };
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "fitness", label: "Fitness" },
  { id: "how-to-reach", label: "How to reach" },
  { id: "inclusions", label: "Inclusions" },
  { id: "packing", label: "Packing list" },
  { id: "cancellation", label: "Cancellation" },
  { id: "faqs", label: "FAQs" },
];

const h2 = "font-display text-2xl text-spruce md:text-3xl";

const batchDate = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function TrekDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const trek = await getTrekBySlug(params.slug);
  if (!trek) notFound();

  const [allDepartures, all, nextDeparture] = await Promise.all([
    getUpcomingDepartures(trek.id),
    getAllTreks(),
    getNextDepartureByTrek(),
  ]);
  // Full batches are hidden rather than shown as "Full".
  const departures = allDepartures.filter((d) => d.seatsLeft > 0);
  const related = all
    .filter((t) => t.id !== trek.id)
    .sort(
      (a, b) =>
        b.seasons.filter((s) => trek.seasons.includes(s)).length -
        a.seasons.filter((s) => trek.seasons.includes(s)).length
    )
    .slice(0, 3);

  const bookOnWhatsapp = whatsappLink(
    `Hi BlissCamp India, I want to book the ${trek.title}. Please share the available batches.`
  );
  const bookBatchOnWhatsapp = (date: string) =>
    whatsappLink(
      `Hi BlissCamp India, I want to book the ${trek.title} batch starting ${batchDate.format(new Date(date))}. Is a seat available?`
    );

  const facts = [
    { label: "Duration", value: `${trek.durationDays} days` },
    { label: "Difficulty", value: trek.difficulty },
    { label: "Max altitude", value: `${trek.maxAltitudeM.toLocaleString("en-IN")} m` },
    { label: "Trek distance", value: trek.distanceKm ? `${trek.distanceKm} km` : "—" },
    { label: "Base camp", value: trek.startPoint || "—" },
    { label: "Best time", value: trek.bestMonths.map((m) => MONTHS[m - 1]).join(", ") },
  ];

  return (
    <div className="pb-24 lg:pb-0">
      {/* Gallery */}
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <div className="grid h-[320px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:h-[440px]">
          <div className="relative col-span-4 row-span-2 md:col-span-3">
            <Image src={trek.images[0]} alt={trek.title} fill priority sizes="(min-width: 768px) 75vw, 100vw" className="object-cover" />
          </div>
          {trek.images.slice(1, 3).map((src, i) => (
            <div key={src} className="relative hidden md:block">
              <Image src={src} alt={`${trek.title} photo ${i + 2}`} fill sizes="25vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-ink/60">
          <Link href="/" className="hover:text-spruce">Home</Link> /{" "}
          <Link href="/treks" className="hover:text-spruce">Treks</Link> /{" "}
          <span className="text-ink">{trek.title}</span>
        </nav>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {trek.badge && (
            <span className="rounded-full bg-amber px-3 py-1 text-xs font-medium text-spruce-dark">{trek.badge}</span>
          )}
          {trek.themes.map((t) => (
            <Link
              key={t}
              href={`/treks?theme=${encodeURIComponent(t)}`}
              className="rounded-full border border-line px-3 py-1 text-xs text-spruce hover:border-spruce"
            >
              {t}
            </Link>
          ))}
        </div>
        <h1 className="mt-3 font-display text-4xl text-spruce md:text-5xl">{trek.title}</h1>
        <p className="mt-2 text-ink/70">{trek.region}</p>

        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((f) => (
            <div key={f.label} className="bg-white p-4">
              <dt className="text-xs text-ink/50">{f.label}</dt>
              <dd className="mt-1 text-sm font-medium text-spruce">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Section nav */}
      <div className="sticky top-[67px] z-30 mt-8 border-y border-line bg-stone-paper/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 text-sm font-medium text-ink/70 sm:px-6">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 border-b-2 border-transparent py-3 hover:border-amber hover:text-spruce">
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-16 [&>section]:scroll-mt-32">
          <section id="overview">
            <h2 className={h2}>Overview</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{trek.description}</p>
            <h3 className="mt-8 font-medium text-spruce">Why you&apos;ll love this trek</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {trek.highlights.map((h) => (
                <li key={h} className="flex gap-3 rounded-xl bg-white p-4 text-sm text-ink/80">
                  <span aria-hidden className="text-amber-dark">▲</span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section id="itinerary">
            <h2 className={h2}>Day-by-day itinerary</h2>
            <div className="mt-6 rounded-2xl border border-line bg-white p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink/50">Altitude profile</p>
              <ElevationProfile itinerary={trek.itinerary} />
            </div>
            <div className="mt-6 space-y-3">
              {trek.itinerary.map((day) => (
                <details key={day.day} open={day.day === 1} className="group rounded-2xl border border-line bg-white">
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-spruce text-xs font-medium text-stone-paper">
                      D{day.day}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-spruce">{day.title}</span>
                      <span className="block text-xs text-ink/60">
                        {day.elevationM.toLocaleString("en-IN")} m
                        {day.distanceKm ? ` · ${day.distanceKm} km` : ""}
                        {day.hours ? ` · ${day.hours}` : ""}
                      </span>
                    </span>
                    <span aria-hidden className="text-lg text-amber-dark transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-4 pb-4 pl-[4.5rem] text-sm leading-relaxed text-ink/70">{day.description}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="fitness">
            <h2 className={h2}>Is this trek right for you?</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-5">
                <p className="font-medium text-spruce">Fitness required</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{trek.fitness}</p>
                <p className="mt-4 text-xs text-ink/50">
                  We send a week-by-week fitness plan after you book. Trekkers who
                  can&apos;t meet the benchmark may be asked to stay at base camp.
                </p>
              </div>
              <BmiCalculator />
            </div>
          </section>

          <section id="how-to-reach">
            <h2 className={h2}>How to reach</h2>
            <div className="mt-4 rounded-2xl border border-line bg-white p-5">
              <p className="text-sm font-medium text-spruce">Base camp: {trek.startPoint}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{trek.howToReach}</p>
            </div>
          </section>

          <section id="inclusions">
            <h2 className={h2}>What&apos;s included</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                <p className="font-medium text-emerald-900">Included</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/80">
                  {trek.inclusions.map((i) => (
                    <li key={i} className="flex gap-2"><span aria-hidden className="text-emerald-700">✓</span>{i}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-red-200 bg-red-50/60 p-5">
                <p className="font-medium text-red-900">Not included</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/80">
                  {trek.exclusions.map((i) => (
                    <li key={i} className="flex gap-2"><span aria-hidden className="text-red-700">✕</span>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="packing">
            <h2 className={h2}>Packing list</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Object.entries(packingList).map(([group, items]) => (
                <div key={group} className="rounded-2xl border border-line bg-white p-5">
                  <p className="font-medium text-spruce">{group}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
                    {items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="cancellation">
            <h2 className={h2}>Cancellation policy</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-fog/70 text-xs uppercase tracking-wide text-ink/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">If you cancel</th>
                    <th className="px-4 py-3 font-medium">You get</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {cancellationPolicy.map((row) => (
                    <tr key={row.when}>
                      <td className="px-4 py-3 text-ink/80">{row.when}</td>
                      <td className="px-4 py-3 text-spruce">{row.refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-ink/50">
              If we cancel a batch because of weather or permits, you get a full trek voucher valid for a year.
            </p>
          </section>

          <section id="faqs">
            <h2 className={h2}>Frequently asked questions</h2>
            <div className="mt-6">
              <FaqList faqs={[...trek.faqs, ...generalFaqs]} />
            </div>
          </section>
        </div>

        <aside id="book" className="scroll-mt-32 lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto lg:pb-4">
          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="font-display text-3xl text-spruce">
              {formatMoney(trek.pricePerPersonPaise)}
            </p>
            <p className="text-xs text-ink/60">per person + 5% GST · from {trek.startPoint}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-line bg-white p-5">
            <p className="font-medium text-spruce">Upcoming batches</p>
            <p className="mt-1 text-xs text-ink/60">Tap a date to book it on WhatsApp.</p>
            {departures.length > 0 ? (
              <ul className="mt-3 divide-y divide-line text-sm">
                {departures.map((d) => (
                  <li key={d.id}>
                    <a
                      href={bookBatchOnWhatsapp(d.date)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-2.5 hover:text-spruce"
                    >
                      <span className="text-ink/80 group-hover:text-spruce group-hover:underline">
                        {batchDate.format(new Date(d.date))}
                      </span>
                      <span className="text-xs font-medium text-[#1a9e4b]">Book →</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-ink/70">No batches scheduled right now — ask us for the next dates.</p>
            )}
          </div>
          <div className="mt-4 rounded-2xl border border-line bg-white p-5 text-sm">
            <p className="font-medium text-spruce">Have questions?</p>
            <p className="mt-1 text-ink/70">Call or WhatsApp a trek expert to reserve your seat.</p>
            <div className="mt-3 flex gap-2">
              <a href={contact.phoneHref} className="flex-1 rounded-full border border-spruce px-3 py-2 text-center font-medium text-spruce hover:bg-spruce hover:text-stone-paper">
                Call
              </a>
              <a href={bookOnWhatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-full bg-[#25D366] px-3 py-2 text-center font-medium text-white hover:opacity-90">
                WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-stone-fog/60 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className={h2}>Treks you might also like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <TrekCard key={t.id} trek={t} nextDeparture={nextDeparture[t.id]} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-line bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] lg:hidden">
        <div>
          <p className="font-display text-xl text-spruce">{formatMoney(trek.pricePerPersonPaise)}</p>
          <p className="text-xs text-ink/60">per person + GST</p>
        </div>
        <div className="flex gap-2">
          <a href="#book" className="rounded-full border border-spruce px-4 py-3 text-sm font-medium text-spruce">
            Batches
          </a>
          <a
            href={bookOnWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white"
          >
            Book on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
