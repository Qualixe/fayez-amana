import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
    en: {
        eyebrow: "Credentials",
        title: "Certifications & Licenses",
        lede: "BRU CO. operates in full compliance with all regulatory, quality, and professional standards required in the Saudi construction industry.",
        cta: "Quality & Safety",
        certifications: [
            {
                number: "01",
                title: "Commercial Registration",
                description: "Officially registered with Saudi authorities, legal and regulatory compliance confirmed",
            },
            {
                number: "02",
                title: "Certified Contractor Membership Certificate",
                description: "Member of the Saudi Contractors Authority, recognized professional contractor status",
            },
            {
                number: "03",
                title: "Contractor Classification Certificate",
                description: "Formally classified by regulatory bodies for structural, architectural, and MEP works",
            },
            {
                number: "04",
                title: "ISO Certification",
                description: "International standards certification for quality management, safety, and environmental responsibility",
            },
            {
                number: "05",
                title: "Engineers Qualifications & Memberships",
                description: "All engineers have verified professional qualifications and active memberships with relevant bodies",
            },
            {
                number: "06",
                title: "Saudization Certificate",
                description: "Compliant with Saudi nationalization requirements, investing in Saudi talent and workforce",
            },
        ],
    },
    ar: {
        eyebrow: "الاعتمادات",
        title: "الشهادات والتراخيص",
        lede: "تعمل BRU CO. في التزام تام بكل المعايير التنظيمية والجودة والمهنية المطلوبة في قطاع الإنشاءات السعودي.",
        cta: "الجودة والسلامة",
        certifications: [
            {
                number: "01",
                title: "السجل التجاري",
                description: "مسجّلة رسميًا لدى الجهات السعودية، مع تأكيد الامتثال القانوني والتنظيمي",
            },
            {
                number: "02",
                title: "شهادة عضوية مقاول معتمد",
                description: "عضو في الهيئة السعودية للمقاولين، بصفة مقاول محترف معترف بها",
            },
            {
                number: "03",
                title: "شهادة تصنيف المقاولين",
                description: "مصنّفة رسميًا من الجهات التنظيمية للأعمال الإنشائية والمعمارية والكهروميكانيكية",
            },
            {
                number: "04",
                title: "شهادة ISO",
                description: "شهادة معايير دولية لإدارة الجودة والسلامة والمسؤولية البيئية",
            },
            {
                number: "05",
                title: "مؤهلات وعضويات المهندسين",
                description: "جميع المهندسين لديهم مؤهلات مهنية موثقة وعضويات فعّالة في الجهات ذات الصلة",
            },
            {
                number: "06",
                title: "شهادة السعودة",
                description: "ملتزمة بمتطلبات التوطين السعودية، والاستثمار في الكفاءات والكوادر الوطنية",
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

export default function Certifications({ locale }: { locale: Locale }) {
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
                    {t.certifications.map((cert, index) => (
                        <Reveal key={cert.number} tag="li" delay={index * 70} className="flex flex-col gap-3 bg-void p-8">
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
                        className="group inline-flex min-h-[56px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08]"
                    >
                        {t.cta}
                        <ArrowIcon />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
