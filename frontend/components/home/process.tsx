import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
    en: {
        eyebrow: "Construction Process",
        title1: "The 21-stage",
        title2: "structural programme.",
        lede: "The structural (shell) phase consists of 21 consecutive stages, beginning with excavation works and the setting-out of foundations, proceeding through execution of the concrete frame, and reaching completion of the building in its structural state. Each stage is designed to guarantee quality, precision, and adherence to the schedule, with continuous follow-up between the execution and supervision teams to ensure safety and that work proceeds according to the approved engineering specifications.",
        cta: "Walk the 21 stages",
        steps: [
            {
                number: "01",
                title: "Planning",
                description: "Site setup, permits, municipality clearances and the project identification board, stage 1 of the structural programme.",
            },
            {
                number: "02",
                title: "Design",
                description: "Architectural and structural design, merging form with function, before a single metre is excavated.",
            },
            {
                number: "03",
                title: "Engineering",
                description: "Soil report, founding levels, plate load testing and the reinforcement design that follows from them.",
            },
            {
                number: "04",
                title: "Construction",
                description: "The 21-stage structural programme: excavation, raft, columns, tie beams, slabs, blockwork and mechanical, electrical and plumbing (MEP) first fix.",
            },
            {
                number: "05",
                title: "Quality Control",
                description: "Continuous follow-up between execution and supervision teams, 95% compaction checks, plumb-bob verification, re-inspection after striking formwork.",
            },
            {
                number: "06",
                title: "Completion",
                description: "The finishing programme, from preparatory works through to handing over the project ready for use.",
            },
        ],
    },
    ar: {
        eyebrow: "منهجية العمل",
        title1: "المراحل الـ 21",
        title2: "للبرنامج الإنشائي.",
        lede: "تتكوّن مرحلة العظم من 21 مرحلة متتابعة تبدأ من أعمال الحفر وتأسيس الأساسات، مرورًا بتنفيذ الهيكل الخرساني، وصولًا إلى اكتمال المبنى في حالته العظمية. كل مرحلة مصممة لضمان الجودة، الدقة، والالتزام بالجدول الزمني، مع متابعة مستمرة بين فرق التنفيذ والإشراف لضمان سلامة وسير العمل وفق المواصفات الهندسية المعتمدة.",
        cta: "تعرّف على المراحل الـ 21",
        steps: [
            {
                number: "01",
                title: "التخطيط",
                description: "تجهيز الموقع والتراخيص وموافقات البلدية ولوحة تعريف المشروع، المرحلة الأولى من البرنامج الإنشائي.",
            },
            {
                number: "02",
                title: "التصميم",
                description: "التصميم المعماري والإنشائي، بالجمع بين الشكل والوظيفة، قبل بدء أي أعمال حفر.",
            },
            {
                number: "03",
                title: "الهندسة",
                description: "تقرير التربة، منسوب التأسيس، اختبار التحميل، وتصميم التسليح المبني عليها.",
            },
            {
                number: "04",
                title: "التنفيذ الإنشائي",
                description: "البرنامج الإنشائي بمراحله الـ 21: الحفر، اللبشة، الأعمدة، الميدات، الأسقف، أعمال المباني، والتمديدات الكهروميكانيكية الأولية.",
            },
            {
                number: "05",
                title: "ضبط الجودة",
                description: "متابعة مستمرة بين فرق التنفيذ والإشراف، فحوصات دمك بنسبة 95%، توزين بالبلبل، وإعادة الفحص بعد فك الشدة الخشبية.",
            },
            {
                number: "06",
                title: "التسليم",
                description: "برنامج التشطيب، من الأعمال التحضيرية وحتى تسليم المشروع جاهزًا للاستخدام.",
            },
        ],
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

export default function Process({ locale }: { locale: Locale }) {
    const t = content[locale];
    return (
        <section id="process" className="relative overflow-hidden border-t border-steel bg-ink py-20 sm:py-28">
            <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

            <div className="relative mx-auto max-w-full px-6 sm:px-8 lg:px-12">
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

                <ol className="mt-16 grid gap-px border-x border-t border-b-2 border-steel bg-steel sm:grid-cols-2 lg:grid-cols-3">
                    {t.steps.map((step, index) => (
                        <Reveal
                            key={step.number}
                            tag="li"
                            delay={index * 80}
                            className="group relative flex flex-col gap-4 bg-ink p-8 transition-colors duration-500 hover:bg-slab"
                        >
                            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                                {step.number}
                            </span>
                            <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                                {step.title}
                            </h3>
                            <p className="text-[0.9875rem] leading-[1.72] text-dust">{step.description}</p>
                            <span
                                aria-hidden="true"
                                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-azure transition-transform duration-700 group-hover:scale-x-100"
                            />
                        </Reveal>
                    ))}
                </ol>

                <Reveal tag="div" delay={480} className="mt-12">
                    <a
                        href="/process"
                        className="group inline-flex min-h-[56px] items-center justify-center gap-3 border border-white/10 px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white transition-[filter] duration-500 hover:brightness-110"
                        style={{
                            backgroundImage:
                                "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
                        }}
                    >
                        {t.cta}
                        <ArrowIcon />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
