import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
    en: {
        eyebrow: "Building Reference United · Est. 2000",
        title: ["Building", "Reference", "United"],
        body: "BRU CO. (Building Reference United) is a Jeddah-based construction company and general contractor delivering integrated construction under one roof: structural, architectural, electromechanical and interior works. 25+ years, 300+ completed projects, ISO-certified and classified by the Saudi Contractors Authority, serving Jeddah, Makkah and the wider Kingdom of Saudi Arabia.",
        stats: [
            { value: "300+", label: "Projects Delivered" },
            { value: "25+", label: "Years Active" },
        ],
        ourStory: "Our Story",
        expertiseEyebrow: "Our Expertise",
        expertiseP1: "Founded in the year 2000, BRU (Building Reference United Company) was established with a bold vision: to integrate architecture, construction, and engineering expertise into one unified entity. From a modest beginning driven by great ambition, BRU has grown into an integrated construction and engineering company, and one of the most trusted contracting firms in Saudi Arabia.",
        expertiseP2: "Our team of engineers, architects, project managers, and skilled site personnel work in seamless collaboration, turning ideas into reality, whether executing complex structural projects, delivering precise finishes, or implementing advanced MEP systems. Aligned with Saudi Vision 2030, we remain committed to innovation and the advancement of the nation's built environment, proud partners to developers, government entities, and private clients across the Kingdom.",
        expertiseTags: ["Residential", "Commercial", "Hospitality", "Public Works", "Government"],
    },
    ar: {
        eyebrow: "شركة مرجع المباني المتحدة · تأسست 2000",
        title: ["مرجع", "المباني", "المتحدة"],
        body: "شركة مرجع المباني المتحدة (BRU) هي شركة مقاولات عامة مقرها جدة، تقدّم أعمال إنشاء متكاملة تحت مظلة واحدة: الأعمال الإنشائية والمعمارية والكهروميكانيكية والتشطيبات الداخلية. أكثر من 25 عامًا من الخبرة، وأكثر من 300 مشروع منجز، معتمدة ISO ومصنّفة من الهيئة السعودية للمقاولين، تخدم جدة ومكة المكرمة وسائر أنحاء المملكة العربية السعودية.",
        stats: [
            { value: "+300", label: "مشروع منجز" },
            { value: "+25", label: "عامًا من النشاط" },
        ],
        ourStory: "قصتنا",
        expertiseEyebrow: "خبراتنا",
        expertiseP1: "تأسست BRU (شركة مرجع المباني المتحدة) عام 2000 برؤية جريئة: دمج خبرات العمارة والإنشاء والهندسة في كيان واحد متكامل. من بداية متواضعة مدفوعة بطموح كبير، نمت BRU لتصبح شركة إنشاء وهندسة متكاملة، وواحدة من أوثق شركات المقاولات في المملكة العربية السعودية.",
        expertiseP2: "يعمل فريقنا من المهندسين والمعماريين ومديري المشاريع والكوادر الفنية الماهرة في تناغم تام، لتحويل الأفكار إلى واقع، سواء في تنفيذ المشاريع الإنشائية المعقدة، أو تسليم تشطيبات دقيقة، أو تنفيذ أنظمة كهروميكانيكية متطورة. وانسجامًا مع رؤية المملكة 2030، نبقى ملتزمين بالابتكار وتطوير البيئة العمرانية للوطن، شركاء فخورون للمطورين والجهات الحكومية والعملاء من القطاع الخاص في أنحاء المملكة.",
        expertiseTags: ["سكني", "تجاري", "ضيافة", "أشغال عامة", "حكومي"],
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

export default function About({ locale }: { locale: Locale }) {
    const t = content[locale];
    return (
        <section id="about" className="relative overflow-hidden border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto grid max-w-full gap-16 px-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 lg:px-12">
                <div className="flex flex-col gap-8">
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
                        className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone"
                    >
                        {t.title[0]}
                        <br />
                        {t.title[1]}
                        <br />
                        {t.title[2]}
                    </Reveal>

                    <Reveal
                        tag="p"
                        delay={160}
                        className="max-w-lg text-[clamp(1.0625rem,1.45vw,1.375rem)] leading-[1.55] text-dust"
                    >
                        {t.body}
                    </Reveal>

                    <Reveal tag="div" delay={240} className="mt-2 flex gap-12">
                        {t.stats.map((stat) => (
                            <div key={stat.label}>
                                <div className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-azure-glow">
                                    {stat.value}
                                </div>
                                <div className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-ash">{stat.label}</div>
                            </div>
                        ))}
                    </Reveal>

                    <Reveal tag="div" delay={320} className="mt-4">
                        <a
                            href="/about"
                            className="group inline-flex min-h-[56px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08]"
                        >
                            {t.ourStory}
                            <ArrowIcon />
                        </a>
                    </Reveal>
                </div>

                <div className="flex flex-col gap-10">
                    <Reveal clip className="relative aspect-[16/10] overflow-hidden bg-slab">
                        <img
                            src="/images/about-img1.avif"
                            alt="Architectural render of a modern BRU CO. residential villa in Jeddah, Saudi Arabia"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent"
                        />
                    </Reveal>

                    <div className="flex flex-col gap-6">
                        <Reveal
                            tag="p"
                            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ash"
                        >
                            <span aria-hidden="true" className="h-px w-8 bg-rebar" />
                            {t.expertiseEyebrow}
                        </Reveal>

                        <Reveal
                            tag="p"
                            className="max-w-xl text-[clamp(0.9875rem,1.05vw,1.0625rem)] leading-[1.72] tracking-[-0.004em] text-dust"
                        >
                            {t.expertiseP1}
                        </Reveal>

                        <Reveal
                            tag="p"
                            delay={120}
                            className="max-w-xl text-[clamp(0.9875rem,1.05vw,1.0625rem)] leading-[1.72] tracking-[-0.004em] text-dust"
                        >
                            {t.expertiseP2}
                        </Reveal>

                        <Reveal tag="ul" delay={220} className="mt-2 flex flex-wrap gap-2.5">
                            {t.expertiseTags.map((tag) => (
                                <li
                                    key={tag}
                                    className="border border-steel px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-dust"
                                >
                                    {tag}
                                </li>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
