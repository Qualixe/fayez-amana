import Reveal from "@/components/reveal";
import Counter from "@/components/counter";
import type { TeamCategory, AboutSettings } from "@/lib/db/about";

export default function Team({ settings, breakdown }: { settings: AboutSettings; breakdown: TeamCategory[] }) {
    const t = settings;
    return (
        <section className="relative overflow-hidden border-t-[0.5px] border-steel bg-ink py-20 sm:py-28">
            <div className="relative mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.35fr] lg:gap-20 lg:px-12">
                <div className="flex flex-col gap-7">
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
                        {t.title}
                    </Reveal>

                    <Reveal tag="p" delay={160} className="max-w-md text-[1.0625rem] leading-relaxed text-dust">
                        {t.lede}
                    </Reveal>

                    <Reveal tag="div" delay={240} className="mt-auto border-t-[0.5px] border-steel pt-8">
                        <div className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-none text-azure-glow">
                            <Counter value={t.totalCount} suffix="+" />
                        </div>
                        <div className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-dust">
                            {t.totalLabel}
                        </div>
                    </Reveal>
                </div>

                <div className="flex flex-col gap-[0.5px] bg-steel">
                    <ul className="grid flex-1 auto-rows-fr gap-[0.5px] sm:grid-cols-2 lg:grid-cols-4">
                        {breakdown.map((item, index) => (
                            <Reveal
                                key={item.id}
                                tag="li"
                                delay={index * 60}
                                className="group flex flex-col justify-between gap-5 border-t-[0.5px] border-steel bg-ink p-7 transition-colors duration-500 hover:bg-slab first:border-t-0 sm:nth-[-n+2]:border-t-0 sm:even:border-s-[0.5px] sm:border-s-steel lg:nth-[-n+4]:border-t-0 lg:not-nth-[4n+1]:border-s-[0.5px] lg:border-s-steel"
                            >
                                <span className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone transition-colors group-hover:text-azure-glow">
                                    <Counter value={item.count} />
                                </span>
                                <span className="text-sm leading-snug text-dust">{item.role}</span>
                            </Reveal>
                        ))}
                    </ul>

                    <div className="grid gap-[0.5px] bg-steel sm:grid-cols-2">
                        <div className="flex flex-col gap-3 bg-ink p-7">
                            <h3 className="text-lg font-semibold text-bone">{t.managementTitle}</h3>
                            <p className="text-sm leading-relaxed text-dust">
                                {t.managementBody}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 bg-ink p-7">
                            <h3 className="text-lg font-semibold text-bone">{t.adminTitle}</h3>
                            <p className="text-sm leading-relaxed text-dust">
                                {t.adminBody}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
