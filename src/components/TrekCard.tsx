import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import type { TrekWithParsedFields } from "@/types";

const shortDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" });

export default function TrekCard({
  trek,
  nextDeparture,
}: {
  trek: TrekWithParsedFields;
  nextDeparture?: Date;
}) {
  return (
    <Link
      href={`/treks/${trek.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-xl hover:shadow-spruce-dark/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={trek.images[0]}
          alt={trek.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {trek.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-amber px-3 py-1 text-xs font-medium text-spruce-dark">
            {trek.badge}
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-spruce-dark/80 px-3 py-1 text-xs text-stone-paper backdrop-blur">
          {trek.seasons.join(" · ")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-glacier-dark">
          {trek.region.split(",")[0]}
        </p>
        <h3 className="mt-1 font-display text-xl text-spruce">{trek.title}</h3>
        <dl className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-stone-paper p-3 text-center text-xs">
          <div>
            <dt className="text-ink/50">Duration</dt>
            <dd className="mt-0.5 font-medium text-spruce">{trek.durationDays} days</dd>
          </div>
          <div>
            <dt className="text-ink/50">Grade</dt>
            <dd className="mt-0.5 font-medium text-spruce">{trek.difficulty}</dd>
          </div>
          <div>
            <dt className="text-ink/50">Altitude</dt>
            <dd className="mt-0.5 font-medium text-spruce">
              {trek.maxAltitudeM.toLocaleString("en-IN")}m
            </dd>
          </div>
        </dl>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/70">{trek.summary}</p>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="font-display text-lg text-spruce">
              {formatMoney(trek.pricePerPersonPaise)}
              <span className="font-body text-xs text-ink/50"> + GST / person</span>
            </p>
            {nextDeparture && (
              <p className="text-xs text-ink/60">
                Next batch: {shortDate.format(nextDeparture)}
              </p>
            )}
          </div>
          <span className="rounded-full border border-spruce px-3 py-1.5 text-xs font-medium text-spruce transition-colors group-hover:bg-spruce group-hover:text-stone-paper">
            View trek
          </span>
        </div>
      </div>
    </Link>
  );
}
