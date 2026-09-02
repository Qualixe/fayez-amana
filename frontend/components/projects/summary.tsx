import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Summary",
    body: "BRU CO. (Building Reference United) is a general contractor headquartered in Jeddah, founded in 2000, with more than 300 completed projects across Saudi Arabia: villa and residential construction, commercial buildings, hospitality, healthcare, F&B and sports facilities. Structural, architectural, electromechanical (MEP) and interior finishing works are delivered by one general contractor, from excavation and foundations through to handover.",
    quickLinks: [
      { label: "Construction services", href: "/services" },
      { label: "The 21-stage process", href: "/process" },
      { label: "Construction company in Jeddah", href: "/construction-company-jeddah" },
      { label: "General contractor in Makkah", href: "/construction-company-makkah" },
    ],
    stats: [
      { label: "Sectors built", value: "Residential, commercial, hospitality, healthcare, F&B, sports" },
      { label: "Primary cities", value: "Jeddah, Makkah and the Western Region" },
      { label: "Delivery models", value: "General contracting, design-build, turnkey" },
      { label: "General contractor since", value: "2000" },
    ],
  },
  ar: {
    eyebrow: "نبذة",
    body: "شركة مرجع المباني المتحدة (BRU) شركة مقاولات عامة مقرها جدة، تأسست عام 2000، وأنجزت أكثر من 300 مشروع في أنحاء المملكة العربية السعودية: بناء الفلل والمشاريع السكنية، المباني التجارية، الضيافة، الرعاية الصحية، المطاعم والمقاهي، والمنشآت الرياضية. تُنفَّذ الأعمال الإنشائية والمعمارية والكهروميكانيكية والتشطيبات الداخلية عبر مقاول عام واحد، من الحفر والأساسات وحتى التسليم.",
    quickLinks: [
      { label: "خدماتنا الإنشائية", href: "/services" },
      { label: "منهجية العمل بمراحلها الـ 21", href: "/process" },
      { label: "شركة مقاولات في جدة", href: "/construction-company-jeddah" },
      { label: "مقاول عام في مكة المكرمة", href: "/construction-company-makkah" },
    ],
    stats: [
      { label: "القطاعات التي نبني فيها", value: "سكني، تجاري، ضيافة، رعاية صحية، مطاعم ومقاهٍ، منشآت رياضية" },
      { label: "المدن الرئيسية", value: "جدة ومكة المكرمة والمنطقة الغربية" },
      { label: "نماذج التنفيذ", value: "مقاولات عامة، تصميم وتنفيذ، تسليم مفتاح" },
      { label: "مقاول عام منذ", value: "2000" },
    ],
  },
} as const;

export default function ProjectsSummary({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section className="border-b border-steel bg-ink py-16 sm:py-20">
      <div className="mx-auto grid max-w-full gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:h-fit">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {t.eyebrow}
          </Reveal>

          <Reveal tag="p" delay={80} className="text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-bone/90">
            {t.body}
          </Reveal>

          <Reveal tag="ul" delay={160} className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
            {t.quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow transition-colors duration-400 hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </Reveal>
        </div>

        <div className="grid gap-px self-start bg-steel sm:grid-cols-2">
          {t.stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              tag="div"
              delay={index * 70}
              className="flex flex-col gap-2.5 bg-ink p-6"
            >
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-dust/85">
                {stat.label}
              </dt>
              <dd className="text-base font-medium leading-[1.5] tracking-[-0.012em] text-bone">
                {stat.value}
              </dd>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
