export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-spruce text-stone-fog">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg italic text-stone-paper">Blisscamp India</p>
          <p className="mt-3 max-w-xs text-sm text-stone-fog/80">
            Small-group treks across the Garhwal and Pir Panjal ranges, run by
            certified trek leaders who know these trails in every season.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-fog/60">
            Reach us
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>hello@blisscampindia.example</li>
            <li>+91 98765 43210</li>
            <li>Dehradun, Uttarakhand</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-fog/60">
            Before you book
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Cancellation policy</li>
            <li>What to pack</li>
            <li>Fitness guidelines</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-stone-fog/50">
        © {new Date().getFullYear()} Blisscamp India. All routes subject to weather and permits.
      </div>
    </footer>
  );
}
