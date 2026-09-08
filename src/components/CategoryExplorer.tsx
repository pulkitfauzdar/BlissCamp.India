import Link from "next/link";
import type { TrekWithParsedFields } from "@/types";

function bucketDuration(days: number): { label: string; value: string } {
  if (days <= 4) return { label: "Up to 4 days", value: "0-4" };
  if (days <= 6) return { label: "5–6 days", value: "5-6" };
  return { label: "7+ days", value: "7-99" };
}

export default function CategoryExplorer({ treks }: { treks: TrekWithParsedFields[] }) {
  const difficulties = Array.from(new Set(treks.map((t) => t.difficulty)));
  const regions = Array.from(new Set(treks.map((t) => t.region)));
  const durations = Array.from(
    new Map(treks.map((t) => bucketDuration(t.durationDays)).map((d) => [d.value, d])).values()
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl text-spruce">Explore treks by category</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="border border-line bg-stone-paper p-6">
          <h3 className="text-xs font-medium uppercase tracking-wide text-glacier-dark">
            By difficulty
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {difficulties.map((d) => (
              <li key={d}>
                <Link href={`/treks?difficulty=${encodeURIComponent(d)}`} className="text-ink/75 hover:text-spruce">
                  {d}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-stone-paper p-6">
          <h3 className="text-xs font-medium uppercase tracking-wide text-glacier-dark">
            By region
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {regions.map((r) => (
              <li key={r}>
                <Link href={`/treks?region=${encodeURIComponent(r)}`} className="text-ink/75 hover:text-spruce">
                  {r}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-stone-paper p-6">
          <h3 className="text-xs font-medium uppercase tracking-wide text-glacier-dark">
            By duration
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {durations.map((d) => (
              <li key={d.value}>
                <Link href={`/treks?duration=${d.value}`} className="text-ink/75 hover:text-spruce">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
