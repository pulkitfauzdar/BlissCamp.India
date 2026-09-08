// Placeholder testimonials — swap these for real trekker reviews before
// launch. Deliberately not styled as "Google Reviews" since these aren't
// real reviews yet; once you have genuine ones, consider embedding an
// actual Google Reviews widget instead of hand-typing star ratings here.
const testimonials = [
  {
    name: "Ananya R.",
    trek: "Kedarkantha Winter Trek",
    quote:
        "First time trekking in snow and the pace never felt unsafe. Our trek leader checked in constantly.",
  },
  {
    name: "Rohit M.",
    trek: "Hampta Pass Crossing",
    quote:
        "The landscape change from Chika to Shea Goru was unreal. Crew handled the river crossings really well.",
  },
  {
    name: "Priya K.",
    trek: "Valley of Flowers Trek",
    quote:
        "Went solo and never felt out of place — good mix of first-timers and repeat trekkers in the group.",
  },
];

const avatarColors = ["bg-spruce", "bg-glacier-dark", "bg-amber-dark"];

export default function Testimonials() {
  return (
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-dark">
          Trekker stories
        </p>
        <h2 className="mt-2 font-display text-3xl text-spruce md:text-4xl">What trekkers say</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
              <figure
                  key={t.name}
                  className="group relative flex flex-col border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
            <span
                aria-hidden
                className="font-display text-6xl italic leading-none text-amber/25"
            >
              &ldquo;
            </span>
                <blockquote className="-mt-3 flex-1 text-[15px] leading-relaxed text-ink/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-medium text-stone-paper ${avatarColors[i % avatarColors.length]}`}
              >
                {t.name.charAt(0)}
              </span>
                  <span className="text-xs text-ink/60">
                <span className="block font-medium text-spruce">{t.name}</span>
                    {t.trek}
              </span>
                </figcaption>
              </figure>
          ))}
        </div>
      </section>
  );
}