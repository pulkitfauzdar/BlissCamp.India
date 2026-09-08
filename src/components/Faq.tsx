const faqs = [
  {
    q: "I'm a solo woman. Is it safe to join?",
    a: "Yes. Every group has a trek leader and support staff on the trail at all times, and solo travelers — including solo women — are common on our departures, not the exception.",
  },
  {
    q: "What are some easy treks for beginners?",
    a: "Look for the \"Easy\" or \"Moderate\" tag on a trek's listing. Valley of Flowers is a good first Himalayan trek — a gentle gradient with no technical sections.",
  },
  {
    q: "I have health issues like BP, asthma or diabetes. Can I trek?",
    a: "Often yes, with the right preparation — but altitude changes things. Write to us with your specifics before booking and we'll tell you honestly whether a given trek is a good fit.",
  },
  {
    q: "Why do I need to book so far in advance?",
    a: "Group sizes are capped so trails aren't overcrowded, and permits for some regions take time to process. Popular departures do fill up.",
  },
  {
    q: "Do you offer group or student discounts?",
    a: "For groups of 6 or more traveling together, write to us directly and we'll work out a group rate.",
  },
  {
    q: "What are toilets and washing like on the trail?",
    a: "Camping treks use tented toilets moved daily by the crew — not luxury, but kept clean. Guesthouse-based treks (like Valley of Flowers) have attached or shared bathrooms.",
  },
];

export default function Faq() {
  return (
      <section id="faq" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-dark">
          Before you book
        </p>
        <h2 className="mt-2 font-display text-3xl text-spruce md:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {faqs.map((item) => (
              <details
                  key={item.q}
                  className="group border border-line bg-white px-5 py-4 shadow-sm transition-shadow duration-200 open:shadow-md open:ring-1 open:ring-spruce/15 hover:border-spruce/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-spruce marker:content-none">
                  {item.q}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-spruce/8 text-base leading-none text-spruce transition-all duration-200 group-open:rotate-45 group-open:bg-amber group-open:text-spruce-dark">
                +
              </span>
                </summary>
                <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-ink/70">
                  {item.a}
                </p>
              </details>
          ))}
        </div>
      </section>
  );
}