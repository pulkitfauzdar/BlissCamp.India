// Site-wide content: contact details, policies, and the home page sections.
//
// PLACEHOLDER — everything marked below must be replaced with real figures
// before launch. Publishing invented stats as genuine is misleading to
// customers. (Testimonials live in src/components/Testimonials.tsx.)

import type { Faq } from "@/types";

const WHATSAPP_NUMBER = "916397458719";

/** WhatsApp chat link that opens with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const contact = {
  phone: "+91 63974 58719",
  phoneHref: "tel:+916397458719",
  whatsappHref: whatsappLink("Hi BlissCamp India, I'd like to know about your upcoming treks."),
  email: "hello@blisscampindia.example",
  office: "Dehradun, Uttarakhand",
};

export const announcement = {
  text: "Winter batches for Kedarkantha and Brahmatal are filling up.",
  cta: "See winter treks",
  href: "/treks?season=Winter",
};

// Home page photo carousel. Swap in your own trek photos before launch.
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=2000&auto=format&fit=crop`;

export const heroSlides = [
  {
    image: unsplash("1454496522488-7a8e488e8606"),
    alt: "Sunrise over a Himalayan ridge line",
    eyebrow: "Small-group Himalayan treks",
    title: "Trails that start before sunrise.",
    text: "Certified leaders, daily health checks and batches of 15 or fewer — across Uttarakhand and Himachal Pradesh.",
    cta: { label: "See upcoming departures", href: "/#departures" },
  },
  {
    image: unsplash("1519681393784-d120267933ba"),
    alt: "Snow peaks under a starry night sky",
    eyebrow: "Winter treks are open",
    title: "Camp on snow, wake up to the stars.",
    text: "Kedarkantha, Brahmatal and Kuari Pass — December to March batches.",
    cta: { label: "See winter treks", href: "/treks?season=Winter" },
  },
  {
    image: unsplash("1551632811-561732d1e306"),
    alt: "Trekkers walking a mountain trail",
    eyebrow: "Never trekked before?",
    title: "Your first Himalayan summit is closer than you think.",
    text: "Beginner-friendly treks with a fitness plan sent to you after booking.",
    cta: { label: "Start with an easy trek", href: "/treks?theme=Beginner" },
  },
  {
    image: unsplash("1490750967868-88aa4486c946"),
    alt: "Wildflowers in an alpine valley",
    eyebrow: "Monsoon special",
    title: "Walk into a valley in full bloom.",
    text: "The Valley of Flowers turns into a carpet of colour from July to September.",
    cta: { label: "See monsoon treks", href: "/treks?season=Monsoon" },
  },
];

// PLACEHOLDER — replace with your real numbers.
export const stats = [
  { value: "8", label: "Himalayan treks" },
  { value: "1:8", label: "Leader to trekker ratio" },
  { value: "15", label: "Max group size" },
  { value: "100%", label: "Certified trek leaders" },
];

export const safetyPillars = [
  {
    title: "Daily health checks",
    body: "Oxygen saturation, pulse and BP recorded morning and evening, every trekker, every day.",
  },
  {
    title: "Certified leaders",
    body: "Every group is led by a leader trained in wilderness first aid and high-altitude rescue.",
  },
  {
    title: "Emergency kit on every trail",
    body: "Oxygen cylinders, stretcher and a full medical kit travel with each batch.",
  },
  {
    title: "Small groups only",
    body: "We cap batches at 15 so leaders can watch every trekker, not just the front of the line.",
  },
];

export const trekCategories = [
  {
    title: "Winter snow treks",
    href: "/treks?season=Winter",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "First Himalayan trek",
    href: "/treks?theme=Beginner",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Monsoon & flower valleys",
    href: "/treks?season=Monsoon",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Weekend getaways",
    href: "/treks?theme=Weekend",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=900&auto=format&fit=crop",
  },
];

export const howItWorks = [
  {
    step: "1",
    title: "Pick a trek and date",
    body: "Filter by season, month or difficulty, and check live seats left on every batch.",
  },
  {
    step: "2",
    title: "Book and pay online",
    body: "Secure checkout holds your seats the moment payment goes through.",
  },
  {
    step: "3",
    title: "Get your trip pack",
    body: "Gear list, fitness plan, pickup point and permits, sent by email after booking.",
  },
  {
    step: "4",
    title: "Meet us at base camp",
    body: "Your trek leader briefs the group the evening before you set off.",
  },
];

export const packingList = {
  "Clothing": [
    "Three warm layers (fleece, light down, padded jacket)",
    "Waterproof outer jacket and pants",
    "Two quick-dry trek pants",
    "Thermal inner set",
    "Woolen cap, sun cap, and buff",
  ],
  "Footwear": [
    "Trekking shoes with ankle support and good grip",
    "Camp sandals or floaters",
    "Three pairs of woolen socks",
  ],
  "Accessories": [
    "40–60L backpack with rain cover",
    "Trekking pole",
    "UV-protection sunglasses",
    "Headlamp with spare batteries",
    "Two 1L water bottles",
  ],
  "Personal": [
    "Personal medicines and a basic first-aid pouch",
    "Sunscreen (SPF 50) and lip balm",
    "Government photo ID (original + copy)",
    "Medical certificate (we send the format after booking)",
  ],
};

export const cancellationPolicy = [
  { when: "30 days or more before departure", refund: "Full refund minus 5% processing fee, or 100% trek voucher" },
  { when: "15–29 days before departure", refund: "50% refund, or 100% trek voucher" },
  { when: "7–14 days before departure", refund: "No refund, 70% trek voucher" },
  { when: "Less than 7 days before departure", refund: "No refund or voucher" },
];

export const generalFaqs: Faq[] = [
  {
    q: "I have never trekked before. Can I join?",
    a: "Yes — look for treks marked Easy or Beginner. We send a four-week fitness plan after booking, and leaders set a pace the whole group can hold.",
  },
  {
    q: "Can I come alone?",
    a: "Most of our trekkers do. You'll share a tent with another solo trekker of the same gender unless you ask otherwise.",
  },
  {
    q: "Is there phone network on the trail?",
    a: "Usually only at base camp. Leaders carry a satellite or radio link for emergencies.",
  },
  {
    q: "Can I rent gear instead of buying it?",
    a: "Yes. Jackets, trekking poles, microspikes and backpacks can be rented at base camp — you'll get a rental form after booking.",
  },
  {
    q: "Can I offload my backpack?",
    a: "Yes, for a per-day fee paid at base camp. Book it in advance as mules and porters are limited.",
  },
];
