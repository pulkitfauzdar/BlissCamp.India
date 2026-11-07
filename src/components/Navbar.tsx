"use client";

import Link from "next/link";
import { useState } from "react";
import { contact } from "@/lib/site";
import Logo from "@/components/Logo";

const seasonLinks = [
  { label: "Winter treks", href: "/treks?season=Winter" },
  { label: "Spring treks", href: "/treks?season=Spring" },
  { label: "Summer treks", href: "/treks?season=Summer" },
  { label: "Monsoon treks", href: "/treks?season=Monsoon" },
  { label: "Autumn treks", href: "/treks?season=Autumn" },
];

const navLinks = [
  { label: "Upcoming departures", href: "/#departures" },
  { label: "Safety", href: "/#safety" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-stone-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="BlissCamp India home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/80 lg:flex">
          <div className="group relative">
            <Link href="/treks" className="flex items-center gap-1 py-2 hover:text-spruce">
              All treks <span aria-hidden className="text-xs">▾</span>
            </Link>
            <div className="invisible absolute left-0 top-full w-52 rounded-lg border border-line bg-white p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {seasonLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block rounded-md px-3 py-2 hover:bg-stone-fog"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/treks?theme=Beginner"
                className="block rounded-md px-3 py-2 hover:bg-stone-fog"
              >
                Beginner treks
              </Link>
            </div>
          </div>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-spruce">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.phoneHref}
            className="hidden text-sm font-medium text-spruce hover:text-amber-dark md:block"
          >
            {contact.phone}
          </a>
          <Link
            href="/treks"
            className="rounded-full bg-amber px-4 py-2 text-sm font-medium text-spruce-dark transition-colors hover:bg-amber-dark"
          >
            Find a trek
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
          >
            <span aria-hidden className="text-lg leading-none text-spruce">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-line bg-stone-paper px-4 pb-6 pt-2 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink/50">
            Treks by season
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {seasonLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-line px-3 py-1.5 text-sm text-spruce"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 divide-y divide-line border-y border-line">
            <Link href="/treks" className="block py-3 text-sm font-medium text-spruce">
              All treks
            </Link>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="block py-3 text-sm font-medium text-spruce">
                {l.label}
              </Link>
            ))}
          </div>
          <a href={contact.phoneHref} className="mt-4 block text-sm font-medium text-spruce">
            Call us: {contact.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
