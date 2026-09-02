import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import type { Locale } from "@/lib/locale";

const content = {
    en: {
        eyebrow: "Vision & Mission",
        title: "Our Direction & Vision 2030 Commitment",
        closing: "Aligned with Saudi Vision 2030, we remain committed to delivering innovative solutions, strengthening the private sector's role in urban development, and building a sustainable future for our nation.",
        items: [
            {
                number: "01",
                title: "Vision",
                description: "To integrate architecture, construction, and engineering expertise into one unified entity, and to remain the first reference in construction in the Kingdom, contributing to Saudi Arabia's development in alignment with Vision 2030 through sustainable growth and excellence in every project.",
            },
            {
                number: "02",
                title: "Mission",
                description: "To deliver integrated construction solutions under one roof, from foundation to finish, with precision and excellence; to attract top qualified talents while training and empowering ambitious young Saudi professionals; and to strengthen the private sector's role in urban development.",
            },
        ],
    },
    ar: {
        eyebrow: "الرؤية والرسالة",
        title: "توجهنا والتزامنا برؤية 2030",
        closing: "انسجامًا مع رؤية المملكة 2030، نبقى ملتزمين بتقديم حلول مبتكرة، وتعزيز دور القطاع الخاص في التنمية العمرانية، وبناء مستقبل مستدام لوطننا.",
        items: [
            {
                number: "01",
                title: "الرؤية",
                description: "دمج خبرات العمارة والإنشاء والهندسة في كيان واحد متكامل، والبقاء المرجع الأول في البناء بالمملكة، بالمساهمة في تنمية المملكة العربية السعودية انسجامًا مع رؤية 2030 عبر نمو مستدام وتميز في كل مشروع.",
            },
            {
                number: "02",
                title: "الرسالة",
                description: "تقديم حلول إنشائية متكاملة تحت مظلة واحدة، من الأساسات حتى التشطيب النهائي، بدقة وتميّز؛ واستقطاب أفضل الكفاءات مع تدريب وتمكين الشباب السعودي الطموح؛ وتعزيز دور القطاع الخاص في التنمية العمرانية.",
            },
        ],
    },
} as const;

export default function VisionMission({ locale }: { locale: Locale }) {
    const t = content[locale];
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
                    {t.items.map((item, index) => (
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
