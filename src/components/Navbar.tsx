import Link from "next/link";

export default function Navbar() {
  return (
      <header className="sticky top-0 z-40 border-b border-line bg-stone-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-xl italic tracking-tight text-spruce">
            Blisscamp <span className="not-italic">India</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/80 md:flex">
            <Link href="/treks" className="hover:text-spruce">
              All treks
            </Link>
            <Link href="/#how-it-works" className="hover:text-spruce">
              How it works
            </Link>
            <Link href="/#faq" className="hover:text-spruce">
              FAQ
            </Link>
            <Link href="/#contact" className="hover:text-spruce">
              Contact
            </Link>
          </nav>
          <Link
              href="/treks"
              className="rounded-sm bg-spruce px-4 py-2 text-sm font-medium text-stone-paper transition-colors hover:bg-spruce-dark"
          >
            Find a trek
          </Link>
        </div>
      </header>
  );
}