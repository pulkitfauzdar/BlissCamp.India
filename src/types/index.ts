export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  elevationM: number;
};

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
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: string[];
};
