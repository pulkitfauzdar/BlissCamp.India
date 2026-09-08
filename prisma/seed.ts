import { PrismaClient } from "@prisma/client";
import { addWeeks, setHours, setMinutes } from "date-fns";

const prisma = new PrismaClient();

// Placeholder content — swap in real copy, prices and photos before launch.
const treks = [
  {
    slug: "kedarkantha-winter-trek",
    title: "Kedarkantha Winter Trek",
    region: "Uttarakhand, Garhwal Himalayas",
    difficulty: "Moderate",
    durationDays: 6,
    maxAltitudeM: 3810,
    pricePerPersonPaise: 899000,
    groupSizeMax: 15,
    featured: true,
    summary:
      "A snow-capped summit trek through pine forests, perfect for first-time winter trekkers.",
    description:
      "Kedarkantha is one of the most popular winter treks in India, and for good reason — wide snow meadows, dense pine and oak forest, and a 360-degree summit view that takes in the Swargarohini and Bandarpoonch ranges. The trail is well marked and forgiving, which makes it a strong choice if this is your first time trekking in snow.",
    highlights: [
      "Summit views of Swargarohini and Bandarpoonch peaks",
      "Camping on snow at Juda ka Talab",
      "Beginner-friendly gradient with one summit push",
      "Dense pine, oak and maple forest trail",
    ],
    inclusions: [
      "Camping and stay on twin/triple sharing",
      "All meals from Day 1 dinner to Day 6 breakfast",
      "Certified trek leader and support crew",
      "First-aid kit and oximeter checks",
      "Forest permits and camping fees",
    ],
    exclusions: [
      "Transport to and from the base camp",
      "Personal trekking gear",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      { day: 1, title: "Drive to Sankri, base camp", description: "Arrive in Dehradun and drive to Sankri village, the last motorable point. Evening briefing and gear check.", elevationM: 1920 },
      { day: 2, title: "Sankri to Juda ka Talab", description: "Trek through pine forest to a frozen alpine lake, our first camp on snow.", elevationM: 2700 },
      { day: 3, title: "Juda ka Talab to Kedarkantha Base", description: "A short but steep climb to base camp, with open views of the ranges ahead.", elevationM: 3400 },
      { day: 4, title: "Summit day and back to base", description: "Pre-dawn start for the summit push, sunrise from the top, then descend to base camp.", elevationM: 3810 },
      { day: 5, title: "Descend to Sankri", description: "Trek back down through the same forest trail, now familiar, to Sankri.", elevationM: 1920 },
      { day: 6, title: "Drive back to Dehradun", description: "Early drive back to Dehradun, trip ends by evening.", elevationM: 640 },
    ],
    images: [
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "hampta-pass-crossing",
    title: "Hampta Pass Crossing",
    region: "Himachal Pradesh, Pir Panjal Range",
    difficulty: "Moderate",
    durationDays: 5,
    maxAltitudeM: 4270,
    pricePerPersonPaise: 799000,
    groupSizeMax: 15,
    featured: true,
    summary:
      "A dramatic landscape shift from green Kullu valley to the high-desert of Lahaul in one crossing.",
    description:
      "Hampta Pass is known for contrast — you start among lush meadows and birch forest on the Kullu side, cross a high pass at 4,270m, and descend into the stark, dry mountains of Lahaul. Most groups add on a side trip to the Chandratal lake, one of the highest lakes in the country.",
    highlights: [
      "Crossing from green valley to high-altitude desert in a day",
      "Optional extension to Chandratal Lake",
      "River crossings and a genuine pass climb",
      "Camping at Balu ka Ghera and Shea Goru",
    ],
    inclusions: [
      "Camping and stay on twin/triple sharing",
      "All meals from Day 1 dinner to Day 5 breakfast",
      "Certified trek leader, guide and support crew",
      "First-aid kit and oximeter checks",
      "Forest permits and camping fees",
    ],
    exclusions: [
      "Transport to and from Manali",
      "Personal trekking gear",
      "Chandratal extension (available as an add-on)",
    ],
    itinerary: [
      { day: 1, title: "Manali to Jobra, trek to Chika", description: "Drive to the trailhead at Jobra and trek a short distance to the first campsite at Chika.", elevationM: 3100 },
      { day: 2, title: "Chika to Balu ka Ghera", description: "Cross the Rani nala and walk through meadows to camp below the pass.", elevationM: 3600 },
      { day: 3, title: "Balu ka Ghera to Shea Goru via Hampta Pass", description: "The main crossing day — climb to the pass, take in views of Lahaul, then descend the other side.", elevationM: 4270 },
      { day: 4, title: "Shea Goru to Chatru, drive to Chandratal", description: "Descend to the roadhead at Chatru and drive to camp near Chandratal lake.", elevationM: 4300 },
      { day: 5, title: "Drive back to Manali", description: "Return drive to Manali via Rohtang, trip ends by evening.", elevationM: 2050 },
    ],
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "valley-of-flowers",
    title: "Valley of Flowers Trek",
    region: "Uttarakhand, Garhwal Himalayas",
    difficulty: "Easy",
    durationDays: 6,
    maxAltitudeM: 3658,
    pricePerPersonPaise: 749000,
    groupSizeMax: 20,
    featured: false,
    summary:
      "A gentle walk into a UNESCO World Heritage valley carpeted in wildflowers, best from July to September.",
    description:
      "The Valley of Flowers is a UNESCO World Heritage Site and one of the few Himalayan treks that rewards you without a difficult climb. Between July and September the valley floor turns into a carpet of alpine flowers against a backdrop of glaciers, and the nearby Hemkund Sahib adds a pilgrimage stop for those who want it.",
    highlights: [
      "UNESCO World Heritage valley in full bloom",
      "Gentle gradient, suitable for first-time trekkers",
      "Optional visit to Hemkund Sahib",
      "Base camp at Ghangaria, surrounded by waterfalls",
    ],
    inclusions: [
      "Stay on twin/triple sharing (guesthouse and camping)",
      "All meals from Day 1 dinner to Day 6 breakfast",
      "Certified trek leader and support crew",
      "Forest permits and entry fees",
    ],
    exclusions: [
      "Transport to and from Govindghat",
      "Personal trekking gear",
      "Mules or porters for personal luggage",
    ],
    itinerary: [
      { day: 1, title: "Drive to Govindghat, trek to Ghangaria", description: "Arrive and trek along the Pushpawati river to the base village of Ghangaria.", elevationM: 3050 },
      { day: 2, title: "Valley of Flowers", description: "A full day inside the valley itself, walking among alpine flowers and glacial streams.", elevationM: 3658 },
      { day: 3, title: "Hemkund Sahib (optional)", description: "A steeper climb to the glacial lake and gurudwara at Hemkund, for those who want the extra day.", elevationM: 4329 },
      { day: 4, title: "Buffer day at Ghangaria", description: "Rest day or a second visit to the valley if the weather was poor earlier.", elevationM: 3050 },
      { day: 5, title: "Descend to Govindghat", description: "Trek back down to Govindghat along the same river trail.", elevationM: 1828 },
      { day: 6, title: "Drive onward", description: "Trip ends after breakfast; onward drive to Haridwar/Rishikesh.", elevationM: 1828 },
    ],
    images: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502786129293-79981df4e689?q=80&w=1600&auto=format&fit=crop",
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  for (const trek of treks) {
    const created = await prisma.trek.upsert({
      where: { slug: trek.slug },
      update: {
        ...trek,
        highlights: JSON.stringify(trek.highlights),
        inclusions: JSON.stringify(trek.inclusions),
        exclusions: JSON.stringify(trek.exclusions),
        itinerary: JSON.stringify(trek.itinerary),
        images: JSON.stringify(trek.images),
      },
      create: {
        ...trek,
        highlights: JSON.stringify(trek.highlights),
        inclusions: JSON.stringify(trek.inclusions),
        exclusions: JSON.stringify(trek.exclusions),
        itinerary: JSON.stringify(trek.itinerary),
        images: JSON.stringify(trek.images),
      },
    });

    // Create a handful of upcoming Saturday departures for each trek.
    const existing = await prisma.departure.count({ where: { trekId: created.id } });
    if (existing === 0) {
      const departureDates = [2, 5, 8, 11].map((weeks) => {
        const base = addWeeks(new Date(), weeks);
        return setMinutes(setHours(base, 6), 0);
      });

      for (const date of departureDates) {
        await prisma.departure.create({
          data: {
            trekId: created.id,
            date,
            capacity: trek.groupSizeMax,
            booked: Math.floor(Math.random() * (trek.groupSizeMax - 3)),
          },
        });
      }
    }

    console.log(`  seeded ${created.title}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
