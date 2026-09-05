import Reveal from "@/components/reveal";
import type { Certification } from "@/lib/db/about";
import type { Locale } from "@/lib/locale";

const content = {
    en: {
        eyebrow: "Credentials",
        title: "Certifications & Licenses",
        lede: "Fayez Amana operates in full compliance with all regulatory, quality, and professional standards required in the Saudi construction industry.",
        cta: "Quality & Safety",
    },
    ar: {
        eyebrow: "الاعتمادات",
        title: "الشهادات والتراخيص",
        lede: "تعمل Fayez Amana في التزام تام بكل المعايير التنظيمية والجودة والمهنية المطلوبة في قطاع الإنشاءات السعودي.",
        cta: "الجودة والسلامة",
    },
} as const;

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

export default function Certifications({ locale, certifications }: { locale: Locale; certifications: Certification[] }) {
    const t = content[locale];
    return (
        <section id="certifications" className="scroll-mt-24 border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
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
                        {t.title}
                    </Reveal>

                    <Reveal tag="p" delay={160} className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust">
                        {t.lede}
                    </Reveal>
                </div>

                <ul className="mt-14 grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-3">
                    {certifications.map((cert, index) => (
                        <Reveal key={cert.id} tag="li" delay={index * 70} className="flex flex-col gap-3 bg-void p-8">
                            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                                {cert.number}
                            </span>
                            <h3 className="text-lg font-semibold leading-snug text-bone">{cert.title}</h3>
                            <p className="text-sm leading-relaxed text-ash">{cert.description}</p>
                        </Reveal>
                    ))}
                </ul>

                <Reveal tag="div" delay={420} className="mt-10">
                    <a
                        href="/services#quality-assurance"
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
