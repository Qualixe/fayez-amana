import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
    en: {
        eyebrow: "Core Values",
        title: "B · R · U",
        lede: "Our principles are not statements on a wall, they are practiced on every site, in every decision, on every project we deliver.",
        closing: "Building Reference United, our name is our identity, our values are our foundation.",
        values: [
            {
                letter: "B",
                title: "Building Excellence",
                description: "We strive to achieve the highest levels of quality in all our projects, utilizing the latest technologies and premium materials to ensure outstanding results with precise, professional execution in full compliance with specifications and standards.",
            },
            {
                letter: "R",
                title: "Reliability & Trust",
                description: "We are committed to meeting the needs and requirements of our clients and delivering projects on time, strengthening their trust in us and fostering long-term partnerships built on transparency and accountability.",
            },
            {
                letter: "U",
                title: "Unmatched Innovation",
                description: "We continuously seek to improve our methods and create innovative construction solutions that keep pace with the latest standards, technologies, and practices in engineering and construction, aligned with Saudi Vision 2030.",
            },
        ],
    },
    ar: {
        eyebrow: "قيمنا الأساسية",
        title: "B · R · U",
        lede: "مبادئنا ليست شعارات على الجدار، بل تُمارَس في كل موقع، وفي كل قرار، وفي كل مشروع نسلّمه.",
        closing: "مرجع المباني المتحدة، اسمنا هويتنا، وقيمنا أساسنا.",
        values: [
            {
                letter: "B",
                title: "التميّز في البناء",
                description: "نسعى لتحقيق أعلى مستويات الجودة في جميع مشاريعنا، مستخدمين أحدث التقنيات وأجود المواد لضمان نتائج متميزة بتنفيذ دقيق ومحترف يلتزم تمامًا بالمواصفات والمعايير.",
            },
            {
                letter: "R",
                title: "الموثوقية والثقة",
                description: "نلتزم بتلبية احتياجات ومتطلبات عملائنا وتسليم المشاريع في مواعيدها، مما يعزز ثقتهم بنا ويرسّخ شراكات طويلة الأمد مبنية على الشفافية والمساءلة.",
            },
            {
                letter: "U",
                title: "ابتكار لا يُضاهى",
                description: "نسعى باستمرار لتطوير أساليبنا وابتكار حلول إنشائية تواكب أحدث المعايير والتقنيات والممارسات في الهندسة والبناء، انسجامًا مع رؤية المملكة 2030.",
            },
        ],
    },
} as const;

export default function ValuesList({ locale }: { locale: Locale }) {
    const t = content[locale];
    return (
        <section className="border-t border-steel bg-ink py-20 sm:py-28">
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
                            className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
                        >
                            {t.title}
                        </h2>
                    </Reveal>

                    <Reveal tag="p" delay={160} className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust">
                        {t.lede}
                    </Reveal>
                </div>

                <div className="mt-16 flex flex-col">
                    {t.values.map((value, index) => (
                        <Reveal
                            key={value.letter}
                            tag="article"
                            delay={index * 110}
                            className="group grid gap-6 border-t border-steel py-10 last:border-b md:grid-cols-[auto_1fr_2fr] md:items-start md:gap-12"
                        >
                            <span
                                aria-hidden="true"
                                dir="ltr"
                                className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.8] text-azure/30 transition-colors duration-700 group-hover:text-azure/70"
                            >
                                {value.letter}
                            </span>
                            <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                                {value.title}
                            </h3>
                            <p className="text-[0.9875rem] leading-[1.72] text-dust">{value.description}</p>
                        </Reveal>
                    ))}
                </div>

                <Reveal
                    tag="p"
                    delay={330}
                    className="mt-12 max-w-3xl font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] italic leading-relaxed text-bone/85"
                >
                    {t.closing}
                </Reveal>
            </div>
        </section>
    );
}
