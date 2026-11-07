import Link from "next/link";
import { contact } from "@/lib/site";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-spruce text-stone-fog">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-3 max-w-xs text-sm text-stone-fog/80">
            Small-group treks across the Garhwal and Pir Panjal ranges, run by
            certified trek leaders who know these trails in every season.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-fog/60">
            Treks by season
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {["Winter", "Spring", "Summer", "Monsoon", "Autumn"].map((s) => (
              <li key={s}>
                <Link href={`/treks?season=${s}`} className="hover:text-amber-light">
                  {s} treks
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-fog/60">
            Before you book
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/treks?theme=Beginner" className="hover:text-amber-light">
                Treks for beginners
              </Link>
            </li>
            <li>
              <Link href="/#safety" className="hover:text-amber-light">
                Our safety standards
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-amber-light">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/treks/kedarkantha-winter-trek#cancellation" className="hover:text-amber-light">
                Cancellation policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-fog/60">
            Talk to a trek expert
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={contact.phoneHref} className="hover:text-amber-light">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.whatsappHref} className="hover:text-amber-light">
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-amber-light">
                {contact.email}
              </a>
            </li>
            <li>{contact.office}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-stone-fog/50">
        © {new Date().getFullYear()} Blisscamp India. All routes subject to weather and permits.
      </div>
    </footer>
  );
}
