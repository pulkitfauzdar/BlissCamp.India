// BlissCamp mark: a camp tent in front of a twin Himalayan peak, with a rising
// sun, inside the spruce-green badge. Drawn as SVG so it stays sharp at any size.
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="24" fill="#1B2E28" />
      <circle cx="33.5" cy="14" r="3.2" fill="#E8A33D" />
      {/* twin peaks behind the tent */}
      <path d="M6 34 L17 18 L22 25 L28 15 L42 34 Z" fill="#fff" opacity="0.35" />
      {/* snow caps */}
      <path d="M17 18 L19.6 21.8 L17.8 21 L15.6 22.2 Z" fill="#fff" />
      <path d="M28 15 L31.2 19.6 L29 18.8 L26.4 20.2 Z" fill="#fff" />
      {/* tent */}
      <path d="M12.5 35 L24 19.5 L35.5 35 Z" fill="#fff" />
      <path d="M24 24.5 L20.2 35 H27.8 Z" fill="#1B2E28" />
      {/* ground line */}
      <rect x="10" y="35" width="28" height="1.6" rx="0.8" fill="#fff" />
    </svg>
  );
}

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`flex rounded-full ${inverted ? "ring-2 ring-white" : ""}`}>
        <LogoMark />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-body text-xl font-semibold tracking-tight ${
            inverted ? "text-white" : "text-spruce"
          }`}
        >
          Bliss<span className={inverted ? "text-amber-light" : "text-amber"}>Camp</span>
        </span>
        <span
          className={`mt-1 text-[10px] font-medium uppercase tracking-[0.35em] ${
            inverted ? "text-white/70" : "text-ink/50"
          }`}
        >
          India
        </span>
      </span>
    </span>
  );
}
