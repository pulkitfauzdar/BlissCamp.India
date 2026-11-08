import Image from "next/image";
import Link from "next/link";
import TrekCard from "@/components/TrekCard";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import HeroSlider from "@/components/HeroSlider";
import TrekMap from "@/components/TrekMap";
import {
  getAllTreks,
  getNextDepartureByTrek,
  getUpcomingDeparturesAll,
  toMapTreks,
} from "@/lib/treks";
import { formatMoney } from "@/lib/money";
import {
  heroSlides,
  howItWorks,
  safetyPillars,
  stats,
  trekCategories,
} from "@/lib/site";

// Rebuilt at most every 5 minutes instead of on every visit, so the small
// Render instance serves cached HTML and rarely touches the database.
export const revalidate = 300;

const departureDate = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

export default async function HomePage() {
  const [all, nextDeparture, departures] = await Promise.all([
    getAllTreks(),
    getNextDepartureByTrek(),
    getUpcomingDeparturesAll(8),
  ]);
  const popular = [...all].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 6);

  return (
    <>
      <h1 className="sr-only">Blisscamp India — small-group Himalayan treks</h1>
      <HeroSlider slides={heroSlides} />

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col rounded-2xl border border-line bg-white p-5 text-center">
              <dt className="order-2 text-xs text-ink/60">{s.label}</dt>
              <dd className="font-display text-3xl text-spruce">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Popular treks */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-glacier-dark">
              Most booked this season
            </p>
            <h2 className="mt-1 font-display text-3xl text-spruce">Popular Himalayan treks</h2>
          </div>
          <Link href="/treks" className="text-sm font-medium text-glacier-dark hover:text-spruce">
            View all {all.length} treks →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((trek) => (
            <TrekCard key={trek.id} trek={trek} nextDeparture={nextDeparture[trek.id]} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-stone-fog/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl text-spruce">Find a trek that fits you</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {trekCategories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-spruce-dark/85 via-spruce-dark/10 to-transparent" />
                <p className="absolute inset-x-4 bottom-4 font-display text-lg leading-snug text-stone-paper sm:text-xl">
                  {c.title} <span aria-hidden>→</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trek map */}
      <section id="map" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-wide text-glacier-dark">Where we trek</p>
        <h2 className="mt-1 font-display text-3xl text-spruce">Trek map of Uttarakhand</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/70">
          Every trek we run, pinned at its summit or highlight. Tap a pin or a trek in the
          list to see details — drag the map to find our Himachal treks too.
        </p>
        <div className="mt-8">
          <TrekMap treks={toMapTreks(all)} />
        </div>
      </section>

      {/* Upcoming departures */}
      <section id="departures" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl text-spruce">Upcoming departures</h2>
        <p className="mt-2 text-sm text-ink/70">Fixed batch dates — tap one to see the trek and book.</p>
        <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {departures.filter((d) => d.seatsLeft > 0).map((d) => (
            <Link
              key={d.id}
              href={`/treks/${d.trek.slug}#book`}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 transition-colors hover:bg-stone-paper sm:grid-cols-[110px_1fr_auto_auto] sm:px-6"
            >
              <span className="text-sm font-medium text-spruce">{departureDate.format(d.date)}</span>
              <span>
                <span className="block text-sm font-medium text-ink">{d.trek.title}</span>
                <span className="block text-xs text-ink/60">
                  {d.trek.durationDays} days · {d.trek.difficulty}
                </span>
              </span>
              <span className="hidden text-sm text-spruce sm:block">
                {formatMoney(d.trek.pricePerPersonPaise)}
              </span>
              <span className="text-xs font-medium text-glacier-dark">View →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="scroll-mt-24 bg-spruce py-16 text-stone-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-amber-light">
              Safety first, every trail
            </p>
            <h2 className="mt-2 font-display text-3xl italic md:text-4xl">
              A system behind every summit.
            </h2>
            <p className="mt-4 text-stone-fog/80">
              Mountains don&apos;t forgive shortcuts. Our safety protocol runs the
              same way on a weekend trek as it does on a high pass — trained
              people, proper equipment, and daily checks on every trekker.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {safetyPillars.map((p) => (
              <div key={p.title} className="rounded-2xl bg-spruce-light p-5">
                <p className="font-medium text-amber-light">{p.title}</p>
                <p className="mt-2 text-sm text-stone-fog/80">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl text-spruce">How booking works</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((s) => (
            <div key={s.step}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber font-display text-lg text-spruce-dark">
                {s.step}
              </span>
              <h3 className="mt-3 font-medium text-spruce">{s.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyUs />
      <Testimonials />
      <Faq />

      {/* CTA */}
      <section className="mx-auto mb-16 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-amber px-6 py-10 sm:px-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl text-spruce-dark md:text-3xl">
              Not sure which trek is right for you?
            </h2>
            <p className="mt-2 text-spruce-dark/80">
              Tell us your dates and experience — a trek expert will suggest a fit.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 rounded-full bg-spruce px-6 py-3 text-sm font-medium text-stone-paper hover:bg-spruce-dark"
          >
            Talk to a trek expert
          </a>
        </div>
      </section>
    </>
  );
}
