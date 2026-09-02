import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
    en: {
        eyebrow: "Our Expertise",
        p1: "Founded in the year 2000, BRU (Building Reference United Company) was established with a bold vision: to integrate architecture, construction, and engineering expertise into one unified entity. From a modest beginning driven by great ambition, BRU has grown into an integrated construction and engineering company, and one of the most trusted contracting firms in Saudi Arabia.",
        p2: "Our team of engineers, architects, project managers, and skilled site personnel work in seamless collaboration, turning ideas into reality, whether executing complex structural projects, delivering precise finishes, or implementing advanced MEP systems. Aligned with Saudi Vision 2030, we remain committed to innovation and the advancement of the nation's built environment, proud partners to developers, government entities, and private clients across the Kingdom.",
        tags: ["Residential", "Commercial", "Hospitality", "Public Works", "Government"],
    },
    ar: {
        eyebrow: "خبراتنا",
        p1: "تأسست BRU (شركة مرجع المباني المتحدة) عام 2000 برؤية جريئة: دمج خبرات العمارة والإنشاء والهندسة في كيان واحد متكامل. من بداية متواضعة مدفوعة بطموح كبير، نمت BRU لتصبح شركة إنشاء وهندسة متكاملة، وواحدة من أوثق شركات المقاولات في المملكة العربية السعودية.",
        p2: "يعمل فريقنا من المهندسين والمعماريين ومديري المشاريع والكوادر الفنية الماهرة في تناغم تام، لتحويل الأفكار إلى واقع، سواء في تنفيذ المشاريع الإنشائية المعقدة، أو تسليم تشطيبات دقيقة، أو تنفيذ أنظمة كهروميكانيكية متطورة. وانسجامًا مع رؤية المملكة 2030، نبقى ملتزمين بالابتكار وتطوير البيئة العمرانية للوطن، شركاء فخورون للمطورين والجهات الحكومية والعملاء من القطاع الخاص في أنحاء المملكة.",
        tags: ["سكني", "تجاري", "ضيافة", "أشغال عامة", "حكومي"],
    },
} as const;

export default function Expertise({ locale }: { locale: Locale }) {
    const t = content[locale];
    return (
        <section className="border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12">
                <div className="flex flex-col gap-7">
                    <Reveal
                        tag="p"
                        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
                    >
                        <span aria-hidden="true" className="h-px w-8 bg-azure" />
                        {t.eyebrow}
                    </Reveal>

                    <Reveal tag="p" className="text-[1.0625rem] leading-[1.72] tracking-[-0.004em] text-dust">
                        {t.p1}
                    </Reveal>

                    <Reveal tag="p" delay={120} className="text-[1.0625rem] leading-[1.72] tracking-[-0.004em] text-dust">
                        {t.p2}
                    </Reveal>

                    <Reveal tag="ul" delay={220} className="mt-3 flex flex-wrap gap-2.5">
                        {t.tags.map((tag) => (
                            <li
                                key={tag}
                                className="border border-steel px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-dust"
                            >
                                {tag}
                            </li>
                        ))}
                    </Reveal>
                </div>

                <Reveal clip className="relative aspect-[16/11] self-center overflow-hidden bg-slab">
                    <img
                        src="/images/about-img1.avif"
                        alt="BRU CO. RB Villa, a modern residential villa façade at night in Jeddah, Saudi Arabia"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </Reveal>
            </div>
        </section>
    );
}
