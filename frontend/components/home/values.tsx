import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import type { CoreValue, CoreValuesSettings } from "@/lib/db/home";
import type { Locale } from "@/lib/locale";

export default function Values({
    locale,
    settings,
    values,
}: {
    locale: Locale;
    settings: CoreValuesSettings;
    values: CoreValue[];
}) {
    const t = settings;
    return (
        <section className="relative border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-6">
                    <Reveal
                        tag="p"
                        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
                    >
                        <span aria-hidden="true" className="h-px w-8 bg-azure" />
                        {t.eyebrow}
                    </Reveal>

                    <Reveal tag="div" delay={80}>
                        <h2
                            dir="ltr"
                            className={`text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone ${locale === "ar" ? "text-right" : "text-left"}`}
                        >
                            {t.title}
                        </h2>
                    </Reveal>

                    <Reveal tag="p" delay={160} className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust">
                        {t.lede}
                    </Reveal>
                </div>

                <div className="mt-16 grid gap-6 lg:grid-cols-3">
                    {values.map((value, index) => (
                        <Reveal key={value.id} delay={index * 110} className="h-full">
                            <SpotlightCard className="group glass relative flex h-full flex-col gap-5 overflow-hidden p-9">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                                    style={{
                                        background:
                                            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(30,104,172,0.22), transparent 60%)",
                                    }}
                                />
                                <span
                                    aria-hidden="true"
                                    dir="ltr"
                                    className={`text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-none text-azure/35 ${
                                        locale === "ar" ? "text-right" : "text-left"
                                    }`}
                                >
                                    {value.letter}
                                </span>
                                <h3 className="text-[clamp(1.5rem,1.9vw,2rem)] font-semibold text-bone [text-wrap:balance]">
                                    {value.title}
                                </h3>
                                <p className="text-[0.9875rem] leading-[1.72] text-dust">{value.description}</p>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>

                <Reveal
                    tag="p"
                    delay={330}
                    className="mt-14 max-w-3xl font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] italic leading-relaxed text-bone/85"
                >
                    {t.closing}
                </Reveal>
            </div>
        </section>
    );
}
