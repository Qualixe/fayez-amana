import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";
import { getSiteCtaSettings } from "@/lib/db/site";
import { getContactSettings } from "@/lib/db/contact";

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

export default async function ContactCta({ locale }: { locale: Locale }) {
    const [t, contactSettings] = await Promise.all([getSiteCtaSettings(locale), getContactSettings(locale)]);
    return (
        <section className="relative overflow-hidden border-t border-steel">
            <div className="absolute inset-0" aria-hidden="true">
                <img src={t.backgroundImage} alt="" className="h-full w-full object-cover opacity-25" />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to right, var(--color-void), color-mix(in oklab, var(--color-void) 85%, transparent), color-mix(in oklab, var(--color-void) 40%, transparent))",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-full px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
                <div className="max-w-3xl">
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
                        className="mt-7 text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone"
                    >
                        {t.title1}
                        <br />
                        <span className="text-azure-glow">{t.title2}</span>
                    </Reveal>

                    <Reveal tag="p" delay={160} className="mt-7 max-w-xl text-[clamp(1.0625rem,1.45vw,1.375rem)] leading-[1.55] text-dust">
                        {t.lede}
                    </Reveal>

                    <Reveal tag="div" delay={240} className="mt-10 flex flex-wrap items-center gap-5">
                        <a
                            href="/contact"
                            className="btn-premium btn-premium-fill group inline-flex min-h-[56px] items-center justify-center gap-3 border border-white/10 px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white hover:brightness-110"
                            style={{
                                backgroundImage:
                                    "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
                            }}
                        >
                            {t.startProject}
                            <ArrowIcon />
                        </a>
                        <a
                            href={`tel:${contactSettings.phone.replace(/\s+/g, "")}`}
                            dir="ltr"
                            className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold text-bone transition-colors duration-500 hover:text-azure-glow"
                        >
                            {contactSettings.phone}
                        </a>
                        <a
                            href={`mailto:${contactSettings.email}`}
                            dir="ltr"
                            className="text-sm text-dust transition-colors duration-500 hover:text-bone"
                        >
                            {contactSettings.email}
                        </a>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
