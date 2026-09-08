import Image from "next/image";
import Link from "next/link";
import TrekCard from "@/components/TrekCard";
import CategoryExplorer from "@/components/CategoryExplorer";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import { getAllTreks, getFeaturedTreks } from "@/lib/treks";

export default async function HomePage() {
    const [featured, all] = await Promise.all([getFeaturedTreks(), getAllTreks()]);
    const rest = all.filter((t) => !t.featured);

    return (
        <>
            <section className="relative flex h-[80vh] min-h-[520px] items-end overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2000&auto=format&fit=crop"
                    alt="Sunrise over a Himalayan ridge line"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-spruce-dark/90 via-spruce-dark/20 to-transparent" />
                <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 text-stone-paper">
                    <p className="text-xs font-medium uppercase tracking-wide text-amber-light">
                        Uttarakhand &amp; Himachal Pradesh
                    </p>
                    <h1 className="mt-3 max-w-2xl font-display text-5xl italic leading-tight md:text-6xl">
                        Trails that start before sunrise.
                    </h1>
                    <p className="mt-4 max-w-md text-stone-fog/90">
                        Small-group Himalayan treks, run by certified leaders who know
                        these ridgelines in every season.
                    </p>
                    <Link
                        href="/treks"
                        className="mt-8 inline-block bg-amber px-6 py-3 text-sm font-medium text-spruce-dark transition-colors hover:bg-amber-dark"
                    >
                        See upcoming departures
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="flex items-end justify-between">
                    <h2 className="font-display text-3xl text-spruce">Featured treks</h2>
                    <Link href="/treks" className="text-sm font-medium text-glacier-dark hover:text-spruce">
                        View all treks →
                    </Link>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {featured.map((trek) => (
                        <TrekCard key={trek.id} trek={trek} featured />
                    ))}
                </div>
            </section>

            <CategoryExplorer treks={all} />

            <section id="how-it-works" className="border-y border-line bg-stone-fog/60">
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <h2 className="font-display text-3xl text-spruce">How a booking works</h2>
                    <div className="mt-10 grid gap-10 md:grid-cols-3">
                        {[
                            {
                                day: "1",
                                title: "Pick a trek and date",
                                body: "Browse open departures and check seats left before you commit.",
                            },
                            {
                                day: "2",
                                title: "Book and pay online",
                                body: "Secure checkout holds your seats the moment payment goes through.",
                            },
                            {
                                day: "3",
                                title: "Get your trip pack",
                                body: "We follow up by email with the gear list, pickup point and permits.",
                            },
                        ].map((step) => (
                            <div key={step.day}>
                                <span className="font-display text-3xl italic text-amber-dark">{step.day}</span>
                                <h3 className="mt-2 text-lg font-medium text-spruce">{step.title}</h3>
                                <p className="mt-2 text-sm text-ink/70">{step.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {rest.length > 0 && (
                <section className="mx-auto max-w-6xl px-6 py-16">
                    <h2 className="font-display text-3xl text-spruce">More departures</h2>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {rest.map((trek) => (
                            <TrekCard key={trek.id} trek={trek} />
                        ))}
                    </div>
                </section>
            )}

            <WhyUs />
            <Testimonials />
            <Faq />
        </>
    );
}