"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type Slide = {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  text?: string;
  cta?: { label: string; href: string };
};

const INTERVAL_MS = 5000;

export default function HeroSlider({
  slides,
  heightClass = "h-[80vh] min-h-[520px] max-h-[760px]",
}: {
  slides: Slide[];
  heightClass?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <section
      className={`relative overflow-hidden bg-spruce-dark ${heightClass}`}
      aria-roledescription="carousel"
      aria-label="Trek photos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={s.image}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-transform duration-[6000ms] ease-out ${
              i === index ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-spruce-dark/60 via-spruce-dark/30 to-spruce-dark/80" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-14 text-center text-stone-paper sm:px-20">
            {s.eyebrow && (
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-light">
                {s.eyebrow}
              </p>
            )}
            <h2 className="mt-4 max-w-3xl font-display text-4xl italic leading-tight sm:text-5xl md:text-6xl">
              {s.title}
            </h2>
            {s.text && <p className="mt-5 max-w-xl text-stone-fog/90">{s.text}</p>}
            {s.cta && (
              <Link
                href={s.cta.href}
                tabIndex={i === index ? 0 : -1}
                className="mt-8 rounded-full bg-amber px-6 py-3 text-sm font-medium text-spruce-dark transition-colors hover:bg-amber-dark"
              >
                {s.cta.label}
              </Link>
            )}
          </div>
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur transition-colors hover:bg-white/40 sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur transition-colors hover:bg-white/40 sm:right-6"
          >
            ›
          </button>
          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-amber" : "w-2 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
