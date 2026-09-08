import Link from "next/link";
import TrekCard from "@/components/TrekCard";
import { getAllTreks } from "@/lib/treks";

export const metadata = { title: "All treks — Blisscamp India" };

function matchesDuration(days: number, bucket: string): boolean {
    const [min, max] = bucket.split("-").map(Number);
    if (Number.isNaN(min) || Number.isNaN(max)) return true;
    return days >= min && days <= max;
}

export default async function TreksPage({
                                            searchParams,
                                        }: {
    searchParams: { difficulty?: string; region?: string; duration?: string };
}) {
    const allTreks = await getAllTreks();
    const { difficulty, region, duration } = searchParams;

    const treks = allTreks.filter((t) => {
        if (difficulty && t.difficulty !== difficulty) return false;
        if (region && t.region !== region) return false;
        if (duration && !matchesDuration(t.durationDays, duration)) return false;
        return true;
    });

    const activeFilters = [
        difficulty && { key: "difficulty", label: difficulty },
        region && { key: "region", label: region },
        duration && { key: "duration", label: `${duration.replace("-", "–")} days` },
    ].filter(Boolean) as { key: string; label: string }[];

    return (
        <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="text-xs font-medium uppercase tracking-wide text-glacier-dark">
                {treks.length} of {allTreks.length} treks
            </p>
            <h1 className="mt-2 font-display text-4xl text-spruce">Find your next trek</h1>

            {activeFilters.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {activeFilters.map((f) => (
                        <span
                            key={f.key}
                            className="border border-line bg-stone-paper px-3 py-1 text-xs text-ink/70"
                        >
              {f.label}
            </span>
                    ))}
                    <Link href="/treks" className="text-xs font-medium text-glacier-dark hover:text-spruce">
                        Clear filters
                    </Link>
                </div>
            )}

            {treks.length === 0 ? (
                <p className="mt-10 text-sm text-ink/70">
                    No treks match that filter right now. <Link href="/treks" className="underline">See all treks</Link>.
                </p>
            ) : (
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {treks.map((trek) => (
                        <TrekCard key={trek.id} trek={trek} />
                    ))}
                </div>
            )}
        </div>
    );
}