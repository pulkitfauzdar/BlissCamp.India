import Link from "next/link";
import { announcement } from "@/lib/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-spruce-dark px-4 py-2 text-center text-xs text-stone-fog sm:text-sm">
      {announcement.text}{" "}
      <Link
        href={announcement.href}
        className="ml-1 font-medium text-amber-light underline underline-offset-2 hover:text-amber"
      >
        {announcement.cta} →
      </Link>
    </div>
  );
}
