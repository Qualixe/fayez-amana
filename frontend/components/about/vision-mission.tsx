import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import type { AboutPageSettings, AboutVisionItem } from "@/lib/db/about";

export default function VisionMission({
    settings,
    items,
}: {
    settings: AboutPageSettings["vision"];
    items: AboutVisionItem[];
}) {
    const t = settings;
    return (
        <section className="border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
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
                    className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
                >
                    {t.title}
                </Reveal>

                <div className="mt-14 grid gap-6 lg:grid-cols-2">
                    {items.map((item, index) => (
                        <Reveal key={item.number} delay={index * 130} className="h-full">
                            <SpotlightCard className="group glass relative flex h-full flex-col gap-6 overflow-hidden p-10">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                                    style={{
                                        background:
                                            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(30,104,172,0.22), transparent 60%)",
                                    }}
                                />
                                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                                    {item.number}
                                </span>
                                <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                                    {item.title}
                                </h3>
                                <p className="text-[0.9875rem] leading-[1.72] text-dust">{item.description}</p>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>

                <Reveal
                    tag="p"
                    delay={260}
                    className="mt-14 max-w-4xl font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] italic leading-relaxed text-bone/85"
                >
                    {t.closing}
                </Reveal>
            </div>
        </section>
    );
}
