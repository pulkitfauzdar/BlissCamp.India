import { prisma } from "@/lib/prisma";
import type { Trek } from "@prisma/client";
import type { TrekWithParsedFields } from "@/types";

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
    highlights: JSON.parse(trek.highlights),
    inclusions: JSON.parse(trek.inclusions),
    exclusions: JSON.parse(trek.exclusions),
    itinerary: JSON.parse(trek.itinerary),
    images: JSON.parse(trek.images),
  };
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
