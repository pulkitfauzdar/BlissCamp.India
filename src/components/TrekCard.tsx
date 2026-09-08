import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import type { TrekWithParsedFields } from "@/types";

export default function TrekCard({
  trek,
  featured = false,
}: {
  trek: TrekWithParsedFields;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/treks/${trek.slug}`}
      className={`group flex flex-col overflow-hidden border border-line bg-stone-paper transition-shadow hover:shadow-[0_1px_0_0_#1B2E28] ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[4/3] md:w-1/2" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={trek.images[0]}
          alt={trek.title}
          fill
          sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-spruce px-2 py-1 text-xs font-medium text-stone-paper">
          {trek.difficulty}
        </span>
      </div>
      <div className={`flex flex-1 flex-col p-5 ${featured ? "md:justify-center md:p-8" : ""}`}>
        <p className="text-xs font-medium uppercase tracking-wide text-glacier-dark">
          {trek.region}
        </p>
        <h3 className={`mt-1 font-display text-spruce ${featured ? "text-2xl" : "text-xl"}`}>
          {trek.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{trek.summary}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="text-ink/70">
            {trek.durationDays} days · up to {trek.maxAltitudeM.toLocaleString("en-IN")}m
          </span>
          <span className="font-medium text-spruce">
            {formatMoney(trek.pricePerPersonPaise)}
            <span className="text-ink/50"> / person</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
