type Reason = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

// Small hand-drawn line icons (no external icon library needed) — each is
// just a 24x24 stroke path, colored via currentColor so it inherits the
// badge color below.
const icons = {
  shield: (
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z M9 12l2 2 4-4" />
  ),
  users: (
      <path d="M8 12a3 3 0 100-6 3 3 0 000 6zM16 12a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-2.5 2-4.5 5-4.5s5 2 5 4.5" />
  ),
  tag: (
      <path d="M3 11l8-8h6a2 2 0 012 2v6l-8 8a2 2 0 01-3 0l-5-5a2 2 0 010-3z M13 7h.01" />
  ),
  pulse: (
      <path d="M2 12h4l2-7 4 14 3-9 2 4h5" />
  ),
  seat: (
      <path d="M4 12V6a2 2 0 012-2h8a2 2 0 012 2v6 M4 12h12v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z M4 12l-1 6h2 M16 12l1 6h-2" />
  ),
  doc: (
      <path d="M7 3h7l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z M14 3v4h4 M9 13l2 2 4-4" />
  ),
};

const reasons: Reason[] = [
  {
    title: "Certified trek leaders",
    body: "Every group is led by a certified trek leader with a support crew on the trail, not just a guide who knows the route.",
    icon: icons.shield,
  },
  {
    title: "Small groups by design",
    body: "We cap group size per trek so the trail doesn't feel crowded and your leader can actually keep track of everyone.",
    icon: icons.users,
  },
  {
    title: "All-inclusive, upfront pricing",
    body: "The price you see includes camping, meals, permits and a support crew. No surprise add-ons at checkout.",
    icon: icons.tag,
  },
  {
    title: "Fitness guidance before you commit",
    body: "Each trek lists its difficulty and max altitude honestly, so you can judge for yourself whether you're ready for it.",
    icon: icons.pulse,
  },
  {
    title: "Fixed batch dates",
    body: "Every trek runs on published batch dates, so you can plan your leave and travel well in advance.",
    icon: icons.seat,
  },
  {
    title: "We handle the permits",
    body: "Forest and region permits are arranged before you arrive — one less thing to chase down yourself.",
    icon: icons.doc,
  },
];

export default function WhyUs() {
  return (
      <section className="border-y border-line bg-stone-fog/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-dark">
            Why Blisscamp India
          </p>
          <h2 className="mt-2 font-display text-3xl text-spruce md:text-4xl">
            Why trek with us
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
                <div
                    key={r.title}
                    className="group relative overflow-hidden border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-spruce/30 hover:shadow-lg"
                >
              <span className="absolute -right-2 -top-3 font-display text-6xl italic text-spruce/5 transition-colors group-hover:text-amber/10">
                {String(i + 1).padStart(2, "0")}
              </span>

                  <span className="relative flex h-11 w-11 items-center justify-center bg-spruce/8 text-spruce transition-colors duration-300 group-hover:bg-amber group-hover:text-spruce-dark">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                >
                  {r.icon}
                </svg>
              </span>

                  <h3 className="relative mt-4 font-display text-lg text-spruce">{r.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-ink/70">{r.body}</p>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}