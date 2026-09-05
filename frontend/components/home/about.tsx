import Reveal from "@/components/reveal";
import type { HomeSettings } from "@/lib/db/home";

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

export default function About({ settings }: { settings: HomeSettings["about"] }) {
    const t = settings;
    return (
        <section id="about" className="relative overflow-hidden border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto grid max-w-full gap-16 px-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 lg:px-12">
                <div className="flex flex-col gap-8">
                    <Reveal
                        tag="p"
                        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
                    >
                        <span aria-hidden="true" className="h-px w-8 bg-azure" />
                        {t.eyebrow}
                    </Reveal>

                    <Reveal
                        tag="h2"
                        delay={80}
                        className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone"
                    >
                        {t.title.map((line, index) => (
                            <span key={index} className="block">
                                {line}
                            </span>
                        ))}
                    </Reveal>

                    <Reveal
                        tag="p"
                        delay={160}
                        className="max-w-lg text-[clamp(1.0625rem,1.45vw,1.375rem)] leading-[1.55] text-dust"
                    >
                        {t.body}
                    </Reveal>

                    <Reveal tag="div" delay={240} className="mt-2 flex gap-12">
                        {[t.stat1, t.stat2].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-azure-glow">
                                    {stat.value}
                                </div>
                                <div className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-ash">{stat.label}</div>
                            </div>
                        ))}
                    </Reveal>

                    <Reveal tag="div" delay={320} className="mt-4">
                        <a
                            href="/about"
                            className="btn-premium btn-premium-outline group inline-flex min-h-[56px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone hover:bg-white/[0.08]"
                        >
                            {t.ourStory}
                            <ArrowIcon />
                        </a>
                    </Reveal>
                </div>

                <div className="flex flex-col gap-10">
                    <Reveal clip className="relative aspect-[16/10] overflow-hidden bg-slab">
                        <img
                            src={t.image}
                            alt="Architectural render of a modern Fayez Amana residential villa in Jeddah, Saudi Arabia"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent"
                        />
                    </Reveal>

                    <div className="flex flex-col gap-6">
                        <Reveal
                            tag="p"
                            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ash"
                        >
                            <span aria-hidden="true" className="h-px w-8 bg-rebar" />
                            {t.expertiseEyebrow}
                        </Reveal>

                        <Reveal
                            tag="p"
                            className="max-w-xl text-[clamp(0.9875rem,1.05vw,1.0625rem)] leading-[1.72] tracking-[-0.004em] text-dust"
                        >
                            {t.expertiseP1}
                        </Reveal>

                        <Reveal
                            tag="p"
                            delay={120}
                            className="max-w-xl text-[clamp(0.9875rem,1.05vw,1.0625rem)] leading-[1.72] tracking-[-0.004em] text-dust"
                        >
                            {t.expertiseP2}
                        </Reveal>

                        <Reveal tag="ul" delay={220} className="mt-2 flex flex-wrap gap-2.5">
                            {t.expertiseTags.map((tag) => (
                                <li
                                    key={tag}
                                    className="border border-steel px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-dust"
                                >
                                    {tag}
                                </li>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
