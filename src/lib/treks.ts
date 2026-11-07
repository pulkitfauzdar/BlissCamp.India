import { prisma } from "@/lib/prisma";
import type { Trek } from "@prisma/client";
import type { TrekFilters, TrekWithParsedFields } from "@/types";
import type { MapTrek } from "@/components/TrekMap";
import { formatMoney } from "@/lib/money";

export const SEASONS = ["Winter", "Spring", "Summer", "Monsoon", "Autumn"] as const;
export const DIFFICULTIES = ["Easy", "Easy-Moderate", "Moderate", "Difficult"] as const;
export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

export function parseTrek(trek: Trek): TrekWithParsedFields {
  return {
    id: trek.id,
    slug: trek.slug,
    title: trek.title,
    region: trek.region,
    difficulty: trek.difficulty,
    durationDays: trek.durationDays,
    maxAltitudeM: trek.maxAltitudeM,
    pricePerPersonPaise: trek.pricePerPersonPaise,
    groupSizeMax: trek.groupSizeMax,
    summary: trek.summary,
    description: trek.description,
    featured: trek.featured,
    badge: trek.badge,
    seasons: JSON.parse(trek.seasons),
    bestMonths: JSON.parse(trek.bestMonths),
    themes: JSON.parse(trek.themes),
    startPoint: trek.startPoint,
    distanceKm: trek.distanceKm,
    fitness: trek.fitness,
    howToReach: trek.howToReach,
    faqs: JSON.parse(trek.faqs),
    lat: trek.lat,
    lng: trek.lng,
    highlights: JSON.parse(trek.highlights),
    inclusions: JSON.parse(trek.inclusions),
    exclusions: JSON.parse(trek.exclusions),
    itinerary: JSON.parse(trek.itinerary),
    images: JSON.parse(trek.images),
  };
}

/** "Uttarakhand, Garhwal Himalayas" → "Uttarakhand" */
export function stateOf(region: string): string {
  return region.split(",")[0].trim();
}

export async function getAllTreks(): Promise<TrekWithParsedFields[]> {
  const treks = await prisma.trek.findMany({ orderBy: { createdAt: "asc" } });
  return treks.map(parseTrek);
}

export async function getFeaturedTreks(): Promise<TrekWithParsedFields[]> {
  const treks = await prisma.trek.findMany({
    where: { featured: true },
    orderBy: { createdAt: "asc" },
  });
  return treks.map(parseTrek);
}

// The catalogue is small, so filtering in memory keeps the JSON-array fields
// simple on SQLite. Move this into the query if the catalogue grows large.
export function filterTreks(
  treks: TrekWithParsedFields[],
  f: TrekFilters
): TrekWithParsedFields[] {
  const q = f.q?.trim().toLowerCase();
  const month = f.month ? MONTHS.indexOf(f.month as (typeof MONTHS)[number]) + 1 : 0;

  return treks.filter((t) => {
    if (q && !`${t.title} ${t.region} ${t.summary}`.toLowerCase().includes(q)) return false;
    if (f.season && !t.seasons.includes(f.season)) return false;
    if (month && !t.bestMonths.includes(month)) return false;
    if (f.difficulty && t.difficulty !== f.difficulty) return false;
    if (f.region && stateOf(t.region) !== f.region) return false;
    if (f.theme && !t.themes.includes(f.theme)) return false;
    return true;
  });
}

export async function getTrekBySlug(
  slug: string
): Promise<TrekWithParsedFields | null> {
  const trek = await prisma.trek.findUnique({ where: { slug } });
  return trek ? parseTrek(trek) : null;
}

export async function getUpcomingDepartures(trekId: string) {
  const departures = await prisma.departure.findMany({
    where: { trekId, date: { gte: new Date() } },
    orderBy: { date: "asc" },
  });
  return departures.map((d) => ({
    id: d.id,
    date: d.date.toISOString(),
    capacity: d.capacity,
    booked: d.booked,
    seatsLeft: d.capacity - d.booked,
  }));
}

/** Next departure date per trek, keyed by trek id. */
export async function getNextDepartureByTrek(): Promise<Record<string, Date>> {
  const departures = await prisma.departure.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
    select: { trekId: true, date: true, capacity: true, booked: true },
  });
  const next: Record<string, Date> = {};
  for (const d of departures) {
    if (d.booked < d.capacity && !next[d.trekId]) next[d.trekId] = d.date;
  }
  return next;
}

/** Upcoming departures across all treks, for the home page calendar. */
export async function getUpcomingDeparturesAll(limit = 12) {
  const departures = await prisma.departure.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: limit,
    include: { trek: true },
  });
  return departures.map((d) => ({
    id: d.id,
    date: d.date,
    seatsLeft: d.capacity - d.booked,
    trek: parseTrek(d.trek),
  }));
}

/** The fields the trek map needs, for treks that have a map pin. */
export function toMapTreks(treks: TrekWithParsedFields[]): MapTrek[] {
  return treks
    .filter((t) => t.lat && t.lng)
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      state: stateOf(t.region),
      lat: t.lat,
      lng: t.lng,
      durationDays: t.durationDays,
      difficulty: t.difficulty,
      maxAltitudeM: t.maxAltitudeM,
      price: formatMoney(t.pricePerPersonPaise),
      image: t.images[0],
    }));
}
