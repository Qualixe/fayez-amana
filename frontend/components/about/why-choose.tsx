import Reveal from "@/components/reveal";
import type { AboutPageSettings } from "@/lib/db/about";
import type { Highlight } from "@/lib/db/home";

export default function WhyChoose({
    settings,
    reasons,
}: {
    settings: AboutPageSettings["why"];
    reasons: Highlight[];
}) {
    const t = settings;
    return (
        <section className="relative overflow-hidden border-t border-steel bg-ink py-20 sm:py-28">
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
                <img
                    src={t.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            <div className="relative mx-auto max-w-full px-6 sm:px-8 lg:px-12">
                <Reveal
                    tag="p"
                    className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
                >
                    <span aria-hidden="true" className="h-px w-8 bg-azure" />
                    {t.eyebrow}
                </Reveal>

                <Reveal
                    tag="p"
                    delay={60}
                    className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-ash"
                >
                    {t.tagline}
                </Reveal>

                <Reveal
                    tag="h2"
                    delay={100}
                    className="mt-7 text-[clamp(2.75rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone"
                >
                    {t.title}
                </Reveal>

                <div className="mt-16 grid gap-px bg-steel sm:grid-cols-2">
                    {reasons.map((reason, index) => (
                        <Reveal
                            key={reason.title}
                            tag="div"
                            delay={index * 90}
                            className="flex flex-col gap-4 bg-ink p-9"
                        >
                            <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                                {reason.title}
                            </h3>
                            <p className="text-[0.9875rem] leading-[1.72] text-dust">
                                {reason.description}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
