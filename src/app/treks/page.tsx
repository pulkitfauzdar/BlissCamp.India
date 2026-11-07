import Link from "next/link";
import TrekCard from "@/components/TrekCard";
import HeroSlider from "@/components/HeroSlider";
import TrekMap from "@/components/TrekMap";
import { filterTreks, getAllTreks, getNextDepartureByTrek, toMapTreks } from "@/lib/treks";
import type { TrekFilters } from "@/types";

export const metadata = { title: "All treks — Blisscamp India" };
export const dynamic = "force-dynamic";

const filterKeys = ["q", "season", "month", "difficulty", "region", "theme"] as const;

export default async function TreksPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters: TrekFilters = {};
  for (const key of filterKeys) {
    const v = searchParams[key];
    if (typeof v === "string" && v) filters[key] = v;
  }

  const [all, nextDeparture] = await Promise.all([getAllTreks(), getNextDepartureByTrek()]);
  const treks = filterTreks(all, filters);
  const active = filterKeys.filter((k) => filters[k]);

  return (
    <div>
      <h1 className="sr-only">All treks</h1>
      <HeroSlider
        heightClass="h-[60vh] min-h-[420px] max-h-[600px]"
        slides={all.map((t) => ({
          image: t.images[0],
          alt: t.title,
          eyebrow: `${t.durationDays} days · ${t.difficulty} · ${t.region.split(",")[0]}`,
          title: t.title,
          text: t.summary,
          cta: { label: "View trek", href: `/treks/${t.slug}` },
        }))}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="mt-10" aria-labelledby="map-heading">
          <h2 id="map-heading" className="font-display text-2xl text-spruce">Trek map</h2>
          <p className="mt-1 text-sm text-ink/70">Tap a pin to see the trek.</p>
          <div className="mt-4">
            <TrekMap treks={toMapTreks(all)} />
          </div>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-sm text-ink/70">
            <span className="font-medium text-spruce">{treks.length}</span>{" "}
            {treks.length === 1 ? "trek" : "treks"} found
          </p>
          {active.length > 0 && (
            <Link href="/treks" className="text-sm font-medium text-glacier-dark hover:text-spruce">
              Clear all filters
            </Link>
          )}
        </div>

        {treks.length > 0 ? (
          <div className="mt-8 grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
            {treks.map((trek) => (
              <TrekCard key={trek.id} trek={trek} nextDeparture={nextDeparture[trek.id]} />
            ))}
          </div>
        ) : (
          <div className="my-16 rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="font-display text-xl text-spruce">No treks match those filters</p>
            <p className="mt-2 text-sm text-ink/70">
              Try a different month or season, or{" "}
              <Link href="/treks" className="font-medium text-glacier-dark underline">
                see all treks
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
