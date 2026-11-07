import type { Faq } from "@/types";

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-spruce">
            {f.q}
            <span
              aria-hidden
              className="text-lg leading-none text-amber-dark transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
