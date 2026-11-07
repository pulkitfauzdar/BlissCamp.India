import { PrismaClient } from "@prisma/client";
import { addDays, addWeeks, setHours, setMinutes } from "date-fns";

const prisma = new PrismaClient();

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

const standardInclusions = (lastDay: number) => [
  "Camping and stay on twin/triple sharing",
  `All vegetarian meals from Day 1 dinner to Day ${lastDay} breakfast`,
  "Certified trek leader, local guide and support crew",
  "Daily oximeter and BP checks, oxygen cylinder and medical kit",
  "Forest permits and camping fees",
  "Tents, sleeping bags and mattresses",
];

const standardExclusions = [
  "GST (5%)",
  "Personal trekking gear (available to rent)",
  "Backpack offloading (available as an add-on)",
  "Anything not listed in inclusions",
];

// Placeholder content — swap in real copy, prices and photos before launch.
const treks = [
  {
    slug: "kedarkantha-winter-trek",
    title: "Kedarkantha Winter Trek",
    region: "Uttarakhand, Garhwal Himalayas",
    difficulty: "Easy-Moderate",
    durationDays: 6,
    maxAltitudeM: 3810,
    distanceKm: 20,
    pricePerPersonPaise: 899000,
    groupSizeMax: 15,
    featured: true,
    badge: "Bestseller",
    seasons: ["Winter", "Spring"],
    bestMonths: [12, 1, 2, 3, 4],
    themes: ["Snow", "Summit a peak", "Beginner"],
    startPoint: "Sankri (pickup from Dehradun)",
    summary:
      "A snow-capped summit trek through pine forests, perfect for first-time winter trekkers.",
    description:
      "Kedarkantha is one of the most popular winter treks in India, and for good reason — wide snow meadows, dense pine and oak forest, and a 360-degree summit view that takes in the Swargarohini and Bandarpoonch ranges. The trail is well marked and forgiving, which makes it a strong choice if this is your first time trekking in snow.",
    fitness:
      "Be able to jog 5 km in 35 minutes before the trek, and climb four floors of stairs with a 5 kg backpack without stopping. Summit day is 8–9 hours on snow.",
    howToReach:
      "Reach Dehradun by train, bus or flight (Jolly Grant airport). Our pickup leaves Dehradun railway station at 6:30 AM on Day 1 for the 8–9 hour drive to Sankri. Shared cab cost is paid directly to the driver.",
    highlights: [
      "Summit views of Swargarohini and Bandarpoonch peaks",
      "Camping on snow at Juda ka Talab",
      "Beginner-friendly gradient with one summit push",
      "Dense pine, oak and maple forest trail",
    ],
    inclusions: standardInclusions(6),
    exclusions: ["Transport from Dehradun to Sankri and back", ...standardExclusions],
    itinerary: [
      { day: 1, title: "Dehradun to Sankri, base camp", description: "Drive along the Yamuna and Tons valleys to Sankri village, the last motorable point. Evening briefing and gear check.", elevationM: 1920, hours: "8–9 hr drive" },
      { day: 2, title: "Sankri to Juda ka Talab", description: "Trek through pine forest to a frozen alpine lake, our first camp on snow.", elevationM: 2700, distanceKm: 4, hours: "5 hr" },
      { day: 3, title: "Juda ka Talab to Kedarkantha Base", description: "A short but steep climb to base camp, with open views of the ranges ahead.", elevationM: 3400, distanceKm: 4, hours: "4 hr" },
      { day: 4, title: "Summit day, descend to Hargaon", description: "Pre-dawn start for the summit push, sunrise from the top, then descend to Hargaon camp.", elevationM: 3810, distanceKm: 6, hours: "8–9 hr" },
      { day: 5, title: "Hargaon to Sankri", description: "Trek back down through the forest to Sankri. Celebration dinner.", elevationM: 1920, distanceKm: 6, hours: "4 hr" },
      { day: 6, title: "Drive back to Dehradun", description: "Early drive back to Dehradun, reaching by evening.", elevationM: 640, hours: "8–9 hr drive" },
    ],
    faqs: [
      { q: "How cold does it get on Kedarkantha?", a: "In December–January, nights at base camp drop to −8 °C to −12 °C. Days are usually sunny and close to 5–10 °C." },
      { q: "Do I need microspikes?", a: "Yes in winter. We provide microspikes and gaiters on snow days at no extra cost." },
    ],
    images: [img("1483728642387-6c3bdd6c93e5"), img("1517824806704-9040b037703b"), img("1478131143081-80f7f84ca84d")],
  },
  {
    slug: "hampta-pass-crossing",
    title: "Hampta Pass Crossing",
    region: "Himachal Pradesh, Pir Panjal Range",
    difficulty: "Moderate",
    durationDays: 5,
    maxAltitudeM: 4270,
    distanceKm: 26,
    pricePerPersonPaise: 799000,
    groupSizeMax: 15,
    featured: true,
    badge: "Crossover",
    seasons: ["Summer", "Monsoon"],
    bestMonths: [6, 7, 8, 9],
    themes: ["Crossover", "Lakes", "River"],
    startPoint: "Manali",
    summary:
      "A dramatic landscape shift from green Kullu valley to the high-desert of Lahaul in one crossing.",
    description:
      "Hampta Pass is known for contrast — you start among lush meadows and birch forest on the Kullu side, cross a high pass at 4,270m, and descend into the stark, dry mountains of Lahaul. Most groups add on a side trip to the Chandratal lake, one of the highest lakes in the country.",
    fitness:
      "Be able to jog 5 km in 35 minutes and carry a 7 kg backpack. The pass day is long, with a steep descent on loose scree.",
    howToReach:
      "Reach Manali by overnight bus from Delhi or Chandigarh, or fly to Bhuntar (Kullu) and take a 1.5 hour cab. Our pickup leaves from Manali Mall Road at 9 AM on Day 1.",
    highlights: [
      "Crossing from green valley to high-altitude desert in a day",
      "Side trip to Chandratal Lake",
      "River crossings and a genuine pass climb",
      "Camping at Balu ka Ghera and Shea Goru",
    ],
    inclusions: [...standardInclusions(5), "Drive from Chatru to Chandratal and back to Manali"],
    exclusions: ["Transport to and from Manali", ...standardExclusions],
    itinerary: [
      { day: 1, title: "Manali to Jobra, trek to Chika", description: "Drive to the trailhead at Jobra and trek a short distance to the first campsite at Chika.", elevationM: 3100, distanceKm: 2, hours: "2 hr" },
      { day: 2, title: "Chika to Balu ka Ghera", description: "Cross the Rani nala and walk through meadows to camp below the pass.", elevationM: 3600, distanceKm: 9, hours: "5 hr" },
      { day: 3, title: "Over Hampta Pass to Shea Goru", description: "The main crossing day — climb to the pass, take in views of Lahaul, then descend the other side.", elevationM: 4270, distanceKm: 8, hours: "8–9 hr" },
      { day: 4, title: "Shea Goru to Chatru, drive to Chandratal", description: "Descend to the roadhead at Chatru and drive to camp near Chandratal lake.", elevationM: 4300, distanceKm: 7, hours: "4 hr + drive" },
      { day: 5, title: "Drive back to Manali", description: "Return drive to Manali via the Atal Tunnel, reaching by evening.", elevationM: 2050, hours: "6 hr drive" },
    ],
    faqs: [
      { q: "Is the Chandratal visit guaranteed?", a: "It depends on the road from Chatru, which can close after heavy rain. If it is closed we drive straight back to Manali." },
      { q: "Are there river crossings?", a: "Two or three, depending on the month. Leaders rope them where needed — carry floaters." },
    ],
    images: [img("1626621341517-bbf3d9990a23"), img("1533130061792-64b345e4a833"), img("1501785888041-af3ef285b470")],
  },
  {
    slug: "valley-of-flowers",
    title: "Valley of Flowers Trek",
    region: "Uttarakhand, Garhwal Himalayas",
    difficulty: "Easy",
    durationDays: 6,
    maxAltitudeM: 4329,
    distanceKm: 38,
    pricePerPersonPaise: 749000,
    groupSizeMax: 15,
    featured: false,
    badge: "UNESCO site",
    seasons: ["Monsoon"],
    bestMonths: [7, 8, 9],
    themes: ["Meadow", "Waterfall", "Beginner", "Family"],
    startPoint: "Govindghat (pickup from Rishikesh)",
    summary:
      "A gentle walk into a UNESCO World Heritage valley carpeted in wildflowers, best from July to September.",
    description:
      "The Valley of Flowers is a UNESCO World Heritage Site and one of the few Himalayan treks that rewards you without a difficult climb. Between July and September the valley floor turns into a carpet of alpine flowers against a backdrop of glaciers, and the nearby Hemkund Sahib adds a pilgrimage stop for those who want it.",
    fitness:
      "Be able to walk 10 km on a hilly road in a day. Hemkund Sahib day is a steep 6 km climb — it's optional.",
    howToReach:
      "Reach Rishikesh by train or bus. Our pickup leaves Rishikesh at 6 AM on Day 1 for the 10 hour drive to Govindghat.",
    highlights: [
      "UNESCO World Heritage valley in full bloom",
      "Gentle gradient, suitable for first-time trekkers",
      "Optional visit to Hemkund Sahib",
      "Base camp at Ghangaria, surrounded by waterfalls",
    ],
    inclusions: [
      "Stay on twin/triple sharing (guesthouse at Ghangaria)",
      ...standardInclusions(6).slice(1),
      "Valley of Flowers entry fee",
    ],
    exclusions: ["Transport from Rishikesh to Govindghat and back", ...standardExclusions],
    itinerary: [
      { day: 1, title: "Rishikesh to Govindghat", description: "A long, scenic drive along the Alaknanda river to Govindghat.", elevationM: 1828, hours: "10 hr drive" },
      { day: 2, title: "Govindghat to Ghangaria", description: "Trek along the Pushpawati river to the base village of Ghangaria.", elevationM: 3050, distanceKm: 10, hours: "6 hr" },
      { day: 3, title: "Valley of Flowers", description: "A full day inside the valley itself, walking among alpine flowers and glacial streams.", elevationM: 3658, distanceKm: 8, hours: "6–7 hr" },
      { day: 4, title: "Hemkund Sahib (optional)", description: "A steeper climb to the glacial lake and gurudwara at Hemkund.", elevationM: 4329, distanceKm: 12, hours: "7–8 hr" },
      { day: 5, title: "Descend to Govindghat", description: "Trek back down to Govindghat along the same river trail.", elevationM: 1828, distanceKm: 10, hours: "5 hr" },
      { day: 6, title: "Drive back to Rishikesh", description: "Trip ends at Rishikesh by evening.", elevationM: 372, hours: "10 hr drive" },
    ],
    faqs: [
      { q: "When are the most flowers in bloom?", a: "Late July to mid-August is peak bloom. September has fewer flowers but clearer skies." },
      { q: "Is it safe in the monsoon?", a: "The trail is paved most of the way. Landslides on the highway can cause delays, so keep a buffer day before your return travel." },
    ],
    images: [img("1490750967868-88aa4486c946"), img("1502786129293-79981df4e689"), img("1500534314209-a25ddb2bd429")],
  },
  {
    slug: "brahmatal-trek",
    title: "Brahmatal Trek",
    region: "Uttarakhand, Chamoli",
    difficulty: "Moderate",
    durationDays: 6,
    maxAltitudeM: 3734,
    distanceKm: 24,
    pricePerPersonPaise: 849000,
    groupSizeMax: 15,
    featured: true,
    badge: "Winter pick",
    seasons: ["Winter"],
    bestMonths: [12, 1, 2, 3],
    themes: ["Snow", "Lakes", "Summit a peak"],
    startPoint: "Lohajung (pickup from Kathgodam)",
    summary:
      "Frozen alpine lakes and the closest view of Mt Trishul you'll get on a winter trek.",
    description:
      "Brahmatal is a winter trek that delivers big-mountain views for moderate effort. From the summit ridge you look straight at Mt Trishul and Nanda Ghunti, and the two frozen lakes — Bekaltal and Brahmatal — make some of the most memorable campsites in Uttarakhand.",
    fitness:
      "Be able to jog 5 km in 35 minutes. Summit day has a steep snow section, so prior trek experience helps but is not required.",
    howToReach:
      "Reach Kathgodam by overnight train from Delhi. Our pickup leaves Kathgodam station at 6 AM on Day 1 for the 10 hour drive to Lohajung.",
    highlights: [
      "Face-to-face views of Mt Trishul and Nanda Ghunti",
      "Camping beside frozen Bekaltal",
      "Rhododendron and oak forest blanketed in snow",
      "Summit ridge with a 360° panorama",
    ],
    inclusions: standardInclusions(6),
    exclusions: ["Transport from Kathgodam to Lohajung and back", ...standardExclusions],
    itinerary: [
      { day: 1, title: "Kathgodam to Lohajung", description: "Drive through Almora and Gwaldam to the trek base at Lohajung.", elevationM: 2300, hours: "10 hr drive" },
      { day: 2, title: "Lohajung to Bekaltal", description: "Climb through oak forest to camp near the Bekaltal lake.", elevationM: 2940, distanceKm: 6, hours: "5 hr" },
      { day: 3, title: "Bekaltal to Telandi", description: "Gain the ridge and camp on open slopes with views of Trishul.", elevationM: 3350, distanceKm: 5, hours: "4 hr" },
      { day: 4, title: "Summit and Brahmatal lake", description: "Pre-dawn climb to Brahmatal top, then descend past the frozen lake.", elevationM: 3734, distanceKm: 8, hours: "7–8 hr" },
      { day: 5, title: "Back to Lohajung", description: "Descend through the forest to Lohajung.", elevationM: 2300, distanceKm: 5, hours: "4 hr" },
      { day: 6, title: "Drive back to Kathgodam", description: "Drive back, reaching Kathgodam by evening.", elevationM: 554, hours: "10 hr drive" },
    ],
    faqs: [
      { q: "Brahmatal or Kedarkantha for a first winter trek?", a: "Kedarkantha is a little gentler. Brahmatal has bigger mountain views and fewer crowds." },
    ],
    images: [img("1519681393784-d120267933ba"), img("1486870591958-9b9d0d1dda99"), img("1458668383970-8ddd3927deed")],
  },
  {
    slug: "dayara-bugyal",
    title: "Dayara Bugyal Trek",
    region: "Uttarakhand, Uttarkashi",
    difficulty: "Easy",
    durationDays: 5,
    maxAltitudeM: 3639,
    distanceKm: 18,
    pricePerPersonPaise: 699000,
    groupSizeMax: 15,
    featured: false,
    badge: "Beginner friendly",
    seasons: ["Winter", "Spring", "Autumn"],
    bestMonths: [1, 2, 3, 4, 5, 9, 10, 11, 12],
    themes: ["Meadow", "Snow", "Beginner", "Family"],
    startPoint: "Raithal (pickup from Dehradun)",
    summary:
      "Rolling high-altitude meadows that turn into ski-slope snowfields in winter.",
    description:
      "Dayara is one of the largest alpine meadows in India — a wide, open grassland above the tree line with the Bandarpoonch and Gangotri ranges along the horizon. It's a short, easy trek that works in almost every season, which makes it a favourite for families and first-timers.",
    fitness: "Be able to walk 8 km on hilly terrain. Suitable for fit children aged 10 and up.",
    howToReach:
      "Reach Dehradun by train, bus or flight. Our pickup leaves Dehradun railway station at 6:30 AM on Day 1 for the 7 hour drive to Raithal.",
    highlights: [
      "Vast alpine meadows with Gangotri range views",
      "Gentle gradient — good for families",
      "Snow camping in winter, wildflowers in spring",
      "Traditional village stay at Raithal",
    ],
    inclusions: standardInclusions(5),
    exclusions: ["Transport from Dehradun to Raithal and back", ...standardExclusions],
    itinerary: [
      { day: 1, title: "Dehradun to Raithal", description: "Drive to the village of Raithal via Uttarkashi.", elevationM: 2100, hours: "7 hr drive" },
      { day: 2, title: "Raithal to Gui", description: "Climb through oak and rhododendron forest to the Gui campsite.", elevationM: 2900, distanceKm: 5, hours: "4 hr" },
      { day: 3, title: "Gui to Dayara Bugyal and back", description: "Walk out onto the meadows and up to the Dayara top for the panorama.", elevationM: 3639, distanceKm: 8, hours: "6 hr" },
      { day: 4, title: "Descend to Raithal", description: "Descend to Raithal for a final night in the village.", elevationM: 2100, distanceKm: 5, hours: "3 hr" },
      { day: 5, title: "Drive back to Dehradun", description: "Drive back to Dehradun, reaching by evening.", elevationM: 640, hours: "7 hr drive" },
    ],
    faqs: [
      { q: "Can kids do this trek?", a: "Yes, fit children aged 10 and up regularly do Dayara with a parent." },
    ],
    images: [img("1464822759023-fed622ff2c3b"), img("1506905925346-21bda4d32df4"), img("1523987355523-c7b5b0dd90a7")],
  },
  {
    slug: "har-ki-dun",
    title: "Har Ki Dun Trek",
    region: "Uttarakhand, Govind Wildlife Sanctuary",
    difficulty: "Easy-Moderate",
    durationDays: 7,
    maxAltitudeM: 3566,
    distanceKm: 47,
    pricePerPersonPaise: 949000,
    groupSizeMax: 15,
    featured: false,
    badge: null,
    seasons: ["Spring", "Autumn", "Winter"],
    bestMonths: [4, 5, 6, 9, 10, 11, 12],
    themes: ["Walk in the valley", "River", "Off-beat"],
    startPoint: "Sankri (pickup from Dehradun)",
    summary:
      "An ancient valley trail past 3,000-year-old villages to a glacier-fed cradle beneath Swargarohini.",
    description:
      "Har Ki Dun — the 'Valley of Gods' — follows the Supin river through some of the oldest villages in Garhwal, with carved wooden houses and terraced fields. The valley ends at a wide meadow surrounded by the Swargarohini and Black Peak massifs.",
    fitness: "Be able to jog 4 km in 30 minutes. Days are long but the gradient is gentle.",
    howToReach:
      "Reach Dehradun by train, bus or flight. Our pickup leaves Dehradun railway station at 6:30 AM on Day 1 for the 8–9 hour drive to Sankri.",
    highlights: [
      "Ancient wooden villages of Osla and Gangaad",
      "Valley floor ringed by Swargarohini peaks",
      "Optional walk to Marinda Tal",
      "Long, gentle river trail through pine forest",
    ],
    inclusions: standardInclusions(7),
    exclusions: ["Transport from Dehradun to Sankri and back", ...standardExclusions],
    itinerary: [
      { day: 1, title: "Dehradun to Sankri", description: "Drive to Sankri, the trailhead village.", elevationM: 1920, hours: "8–9 hr drive" },
      { day: 2, title: "Sankri to Pauni Garaat", description: "Drive to Taluka and trek along the Supin river.", elevationM: 2500, distanceKm: 11, hours: "6 hr" },
      { day: 3, title: "Pauni Garaat to Kalkattiyadhaar", description: "Walk past Osla village and up to the camp with first views of the peaks.", elevationM: 3000, distanceKm: 7, hours: "5 hr" },
      { day: 4, title: "Har Ki Dun and back", description: "Walk into the Har Ki Dun valley, explore, and return to camp.", elevationM: 3566, distanceKm: 12, hours: "7 hr" },
      { day: 5, title: "Kalkattiyadhaar to Pauni Garaat", description: "Retrace the trail down the valley.", elevationM: 2500, distanceKm: 7, hours: "4 hr" },
      { day: 6, title: "Pauni Garaat to Sankri", description: "Trek to Taluka and drive to Sankri.", elevationM: 1920, distanceKm: 11, hours: "5 hr" },
      { day: 7, title: "Drive back to Dehradun", description: "Drive back, reaching Dehradun by evening.", elevationM: 640, hours: "8–9 hr drive" },
    ],
    faqs: [],
    images: [img("1477346611705-65d1883cee1e"), img("1469854523086-cc02fe5d8800"), img("1426604966848-d7adac402bff")],
  },
  {
    slug: "kuari-pass",
    title: "Kuari Pass Trek",
    region: "Uttarakhand, Chamoli",
    difficulty: "Moderate",
    durationDays: 6,
    maxAltitudeM: 3876,
    distanceKm: 33,
    pricePerPersonPaise: 899000,
    groupSizeMax: 15,
    featured: false,
    badge: "Big views",
    seasons: ["Winter", "Spring", "Autumn"],
    bestMonths: [1, 2, 3, 4, 10, 11, 12],
    themes: ["Snow", "Peaks view", "Summit a peak"],
    startPoint: "Joshimath (pickup from Rishikesh)",
    summary:
      "Walk the 'Curzon Trail' to a pass that lines up Nanda Devi, Dronagiri and Kamet in one frame.",
    description:
      "Kuari Pass offers one of the best close-up views of India's highest peaks for a moderate effort. The trail climbs through dense oak forest and open clearings to the pass, where Nanda Devi, Dronagiri, Hathi-Ghoda and Kamet line the horizon.",
    fitness: "Be able to jog 5 km in 35 minutes and climb continuously for 3 hours.",
    howToReach:
      "Reach Rishikesh by train or bus. Our pickup leaves Rishikesh at 6 AM on Day 1 for the 9 hour drive to Joshimath.",
    highlights: [
      "Nanda Devi, Dronagiri and Kamet from the pass",
      "Oak and rhododendron forest trail",
      "Clearings at Khullara and Tali with peak views",
      "Historic route walked by Lord Curzon in 1905",
    ],
    inclusions: standardInclusions(6),
    exclusions: ["Transport from Rishikesh to Joshimath and back", ...standardExclusions],
    itinerary: [
      { day: 1, title: "Rishikesh to Joshimath", description: "Drive along the Alaknanda via Devprayag and Rudraprayag.", elevationM: 1875, hours: "9 hr drive" },
      { day: 2, title: "Joshimath to Gulling", description: "Drive to Dhak and trek up through villages to Gulling.", elevationM: 2960, distanceKm: 6, hours: "5 hr" },
      { day: 3, title: "Gulling to Khullara", description: "A forest climb to the Khullara clearing.", elevationM: 3350, distanceKm: 5, hours: "4 hr" },
      { day: 4, title: "Kuari Pass and back", description: "Climb to the pass for sunrise over the peaks, then return to camp.", elevationM: 3876, distanceKm: 10, hours: "7–8 hr" },
      { day: 5, title: "Khullara to Joshimath", description: "Descend to Dhak and drive to Joshimath.", elevationM: 1875, distanceKm: 11, hours: "5 hr" },
      { day: 6, title: "Drive back to Rishikesh", description: "Drive back, reaching Rishikesh by evening.", elevationM: 372, hours: "9 hr drive" },
    ],
    faqs: [],
    images: [img("1544735716-392fe2489ffa"), img("1465311440653-ba9b1d9b0f5b"), img("1491555103944-7c647fd857e6")],
  },
  {
    slug: "nag-tibba-weekend",
    title: "Nag Tibba Weekend Trek",
    region: "Uttarakhand, Mussoorie hills",
    difficulty: "Easy",
    durationDays: 2,
    maxAltitudeM: 3022,
    distanceKm: 14,
    pricePerPersonPaise: 349000,
    groupSizeMax: 15,
    featured: false,
    badge: "Weekend",
    seasons: ["Winter", "Spring", "Summer", "Autumn"],
    bestMonths: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
    themes: ["Weekend", "Beginner", "Summit a peak", "Family"],
    startPoint: "Pantwari (pickup from Dehradun)",
    summary:
      "The highest peak in the lower Garhwal hills, doable over a weekend from Delhi.",
    description:
      "Nag Tibba is the quickest way to a real Himalayan summit if you only have a weekend. You camp one night below the top and climb for sunrise views of Bandarpoonch, Kedarnath and the Gangotri group.",
    fitness: "Be able to walk 6 km uphill. Suitable for first-timers and fit children aged 8 and up.",
    howToReach:
      "Take an overnight bus or train from Delhi to Dehradun. Our pickup leaves Dehradun railway station at 6:30 AM on Saturday.",
    highlights: [
      "A real summit in just two days",
      "Sunrise view of Bandarpoonch and Kedarnath peaks",
      "Easy access from Delhi and Dehradun",
      "Snow from late December to February",
    ],
    inclusions: standardInclusions(2),
    exclusions: ["Transport from Dehradun to Pantwari and back", ...standardExclusions],
    itinerary: [
      { day: 1, title: "Dehradun to Pantwari, trek to base camp", description: "Drive to Pantwari village and trek up to the Nag Tibba base camp.", elevationM: 2800, distanceKm: 6, hours: "3 hr drive + 4 hr" },
      { day: 2, title: "Summit and return to Dehradun", description: "Pre-dawn climb to the summit, descend to Pantwari and drive back.", elevationM: 3022, distanceKm: 8, hours: "6 hr + 3 hr drive" },
    ],
    faqs: [],
    images: [img("1504280390367-361c6d9f38f4"), img("1445363692815-ebcd599f7621"), img("1522163182402-834f871fd851")],
  },
];

// Map pin for each trek — the summit, pass or main highlight.
const coordinates: Record<string, [number, number]> = {
  "kedarkantha-winter-trek": [31.0232, 78.1702],
  "hampta-pass-crossing": [32.2667, 77.3667],
  "valley-of-flowers": [30.728, 79.605],
  "brahmatal-trek": [30.1418, 79.6597],
  "dayara-bugyal": [30.8412, 78.5746],
  "har-ki-dun": [31.1495, 78.4133],
  "kuari-pass": [30.5085, 79.6328],
  "nag-tibba-weekend": [30.5842, 78.1466],
};

const jsonFields = [
  "highlights", "inclusions", "exclusions", "itinerary", "images",
  "seasons", "bestMonths", "themes", "faqs",
] as const;

async function main() {
  console.log("Seeding database...");

  for (const [index, trek] of treks.entries()) {
    const data = { ...trek } as Record<string, unknown>;
    for (const field of jsonFields) data[field] = JSON.stringify(trek[field]);
    [data.lat, data.lng] = coordinates[trek.slug] ?? [0, 0];

    const created = await prisma.trek.upsert({
      where: { slug: trek.slug },
      update: data as Parameters<typeof prisma.trek.update>[0]["data"],
      create: data as Parameters<typeof prisma.trek.create>[0]["data"],
    });

    // Create a handful of upcoming departures for each trek, staggered by a
    // few days per trek so batches don't all start on the same date.
    const existing = await prisma.departure.count({ where: { trekId: created.id } });
    if (existing === 0) {
      const departureDates = [1, 2, 4, 6, 8, 11].map((weeks) => {
        const base = addDays(addWeeks(new Date(), weeks), index * 3);
        return setMinutes(setHours(base, 6), 0);
      });

      for (const date of departureDates) {
        await prisma.departure.create({
          data: {
            trekId: created.id,
            date,
            capacity: trek.groupSizeMax,
            booked: Math.floor(Math.random() * trek.groupSizeMax),
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
