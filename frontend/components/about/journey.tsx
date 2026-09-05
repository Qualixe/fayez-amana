import Reveal from "@/components/reveal";
import Counter from "@/components/counter";
import type { AboutPageSettings, AboutMilestone } from "@/lib/db/about";

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

export default function Journey({
    settings,
    milestones,
}: {
    settings: AboutPageSettings["journey"];
    milestones: AboutMilestone[];
}) {
    const t = settings;
    return (
        <section className="border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
                    <div className="flex flex-col gap-6">
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
                            className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
                        >
                            {t.title1}
                            <br />
                            {t.title2}
                        </Reveal>

                        <Reveal tag="p" delay={160} className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust">
                            {t.lede}
                        </Reveal>
                    </div>

                    <Reveal tag="div" delay={220} className="flex shrink-0 flex-col gap-2">
                        <span className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-none text-azure-glow">
                            <Counter value={t.counterValue} suffix="+" />
                        </span>
                        <span className="max-w-xs text-sm text-ash">
                            {t.counterLabel}
                        </span>
                    </Reveal>
                </div>

                <ol className="relative mt-20">
                    <span aria-hidden="true" className="absolute start-0 top-0 hidden h-full w-px bg-steel md:block" />
                    {milestones.map((milestone, index) => (
                        <Reveal
                            key={milestone.year}
                            tag="li"
                            delay={index * 100}
                            className="group relative grid gap-5 border-b border-edge pb-16 last:border-b-0 md:grid-cols-[220px_1fr] md:gap-14 md:border-b-0 md:ps-12"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute -start-[5px] top-2 hidden h-2.5 w-2.5 rotate-45 bg-rebar transition-colors duration-500 group-hover:bg-azure md:block"
                            />
                            <div className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-azure-glow">
                                {milestone.year}
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                                    {milestone.title}
                                </h3>
                                <p className="max-w-2xl text-[0.9875rem] leading-[1.72] text-dust">
                                    {milestone.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </ol>

                <Reveal tag="div">
                    <a
                        href="/process"
                        className="btn-premium btn-premium-outline group inline-flex min-h-[56px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone hover:bg-white/[0.08]"
                    >
                        {t.cta}
                        <ArrowIcon />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
