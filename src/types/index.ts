export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  elevationM: number;
  distanceKm?: number;
  hours?: string;
};

export type Faq = { q: string; a: string };

export type TrekWithParsedFields = {
  id: string;
  slug: string;
  title: string;
  region: string;
  difficulty: string;
  durationDays: number;
  maxAltitudeM: number;
  pricePerPersonPaise: number;
  groupSizeMax: number;
  summary: string;
  description: string;
  featured: boolean;
  badge: string | null;
  seasons: string[];
  bestMonths: number[];
  themes: string[];
  startPoint: string;
  distanceKm: number;
  fitness: string;
  howToReach: string;
  faqs: Faq[];
  lat: number;
  lng: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: string[];
};

export type TrekFilters = {
  q?: string;
  season?: string;
  month?: string;
  difficulty?: string;
  region?: string;
  theme?: string;
};
