import Reveal from "@/components/reveal";
import type { Service } from "@/lib/db/services";
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

export default function Services({ settings, services }: { settings: HomeSettings["services"]; services: Service[] }) {
    const t = settings;
    return (
        <section id="services" className="relative border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto grid max-w-full gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
                <div className="flex flex-col gap-7 lg:sticky lg:top-32 lg:h-fit">
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
                        <span className="text-azure-glow">{t.title2}</span>
                    </Reveal>

                    <Reveal tag="p" delay={140} className="max-w-md text-[1.0625rem] leading-relaxed text-dust">
                        {t.lede}
                    </Reveal>

                    <Reveal tag="p" delay={200} className="max-w-md text-sm leading-relaxed text-ash">
                        {t.note}
                    </Reveal>

                    <Reveal tag="div" delay={260}>
                        <a
                            href="/services"
                            className="group inline-flex min-h-[56px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08]"
                        >
                            {t.explore}
                            <ArrowIcon />
                        </a>
                    </Reveal>
                </div>

                <ul className="flex flex-col">
                    {services.map((service, index) => (
                        <Reveal key={service.id} tag="li" delay={index * 90} className="list-none">
                            <a href={`/services#${service.slug}`} className="group relative block border-t border-steel py-9 last:border-b">
                                <div className="flex items-start gap-6">
                                    <span className="mt-2 shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-ash transition-colors duration-500 group-hover:text-azure-glow">
                                        {service.number}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:text-azure-glow">
                                            {service.title}
                                        </h3>
                                        <p className="mt-3 max-w-xl text-[0.9875rem] leading-[1.72] text-dust">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden bg-slab opacity-0 transition-opacity duration-500 group-hover:opacity-100 xl:block">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-azure transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                                />
                            </a>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
