import Image from "next/image";
import { notFound } from "next/navigation";
import { getTrekBySlug, getUpcomingDepartures, getAllTreks } from "@/lib/treks";
import { formatMoney } from "@/lib/money";
import ElevationProfile from "@/components/ElevationProfile";
import BookingWidget from "@/components/BookingWidget";

export async function generateStaticParams() {
  const treks = await getAllTreks();
  return treks.map((t) => ({ slug: t.slug }));
}

export default async function TrekDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const trek = await getTrekBySlug(params.slug);
  if (!trek) notFound();

  const departures = await getUpcomingDepartures(trek.id);

  return (
    <div>
      <div className="relative h-[50vh] min-h-[360px]">
        <Image src={trek.images[0]} alt={trek.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-spruce-dark/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-10 text-stone-paper">
          <p className="text-xs font-medium uppercase tracking-wide text-amber-light">
            {trek.region}
          </p>
          <h1 className="mt-2 font-display text-4xl italic md:text-5xl">{trek.title}</h1>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone-fog/90">
            <span>{trek.durationDays} days</span>
            <span>{trek.difficulty}</span>
            <span>Up to {trek.maxAltitudeM.toLocaleString("en-IN")}m</span>
            <span>Groups of {trek.groupSizeMax}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="max-w-prose text-lg leading-relaxed text-ink/80">{trek.description}</p>

          <h2 className="mt-12 font-display text-2xl text-spruce">Highlights</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {trek.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-ink/80">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-dark" />
                {h}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-2xl text-spruce">Elevation profile</h2>
          <div className="mt-4 border border-line bg-stone-paper p-4">
            <ElevationProfile itinerary={trek.itinerary} />
          </div>

          <h2 className="mt-12 font-display text-2xl text-spruce">Day by day</h2>
          <ol className="mt-6 space-y-6 border-l border-line pl-6">
            {trek.itinerary.map((day) => (
              <li key={day.day} className="relative">
                <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center bg-spruce text-xs font-medium text-stone-paper">
                  {day.day}
                </span>
                <p className="text-sm font-medium text-spruce">{day.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{day.description}</p>
                <p className="mt-1 text-xs text-glacier-dark">
                  {day.elevationM.toLocaleString("en-IN")}m
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-xl text-spruce">Inclusions</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink/70">
                {trek.inclusions.map((i) => (
                  <li key={i}>+ {i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl text-spruce">Exclusions</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink/70">
                {trek.exclusions.map((i) => (
                  <li key={i}>− {i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-4 font-display text-2xl text-spruce">
            {formatMoney(trek.pricePerPersonPaise)}
            <span className="text-sm font-normal text-ink/50"> / person</span>
          </p>
          <BookingWidget
            trekId={trek.id}
            trekTitle={trek.title}
            pricePerPersonPaise={trek.pricePerPersonPaise}
            groupSizeMax={trek.groupSizeMax}
            departures={departures}
          />
        </aside>
      </div>
    </div>
  );
}
