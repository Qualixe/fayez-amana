import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Building Reference United · Est. 2000",
    title: ["Building", "Reference", "United"],
    body: "BRU CO. (Building Reference United) is a Jeddah-based construction company and general contractor delivering integrated construction under one roof: structural, architectural, electromechanical and interior works. 25+ years, 300+ completed projects, ISO-certified and classified by the Saudi Contractors Authority, serving Jeddah, Makkah and the wider Kingdom of Saudi Arabia.",
    stats: [
      { label: "Established", value: "2000" },
      { label: "Headquarters", value: "Jeddah, Saudi Arabia" },
      { label: "Projects Delivered", value: "300+" },
      { label: "Team", value: "80+ members" },
    ],
  },
  ar: {
    eyebrow: "شركة مرجع المباني المتحدة · تأسست 2000",
    title: ["مرجع", "المباني", "المتحدة"],
    body: "شركة مرجع المباني المتحدة (BRU) هي شركة مقاولات عامة مقرها جدة، تقدّم أعمال إنشاء متكاملة تحت مظلة واحدة: الأعمال الإنشائية والمعمارية والكهروميكانيكية والتشطيبات الداخلية. أكثر من 25 عامًا من الخبرة، وأكثر من 300 مشروع منجز، معتمدة ISO ومصنّفة من الهيئة السعودية للمقاولين، تخدم جدة ومكة المكرمة وسائر أنحاء المملكة العربية السعودية.",
    stats: [
      { label: "تأسست", value: "2000" },
      { label: "المقر الرئيسي", value: "جدة، السعودية" },
      { label: "مشاريع منجزة", value: "+300" },
      { label: "الفريق", value: "+80 عضو" },
    ],
  },
} as const;

export default function AboutHero({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <header className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-steel">
      <div className="absolute inset-[-8%] overflow-hidden" aria-hidden="true">
        <img
          src="/images/about-hero-banner.avif"
          alt=""
          className="hero-settle h-full w-full object-cover"
          style={{ animationDelay: "2.9s" }}
        />
      </div>
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(11,15,20,0.97) 0%, rgba(11,15,20,0.86) 26%, rgba(11,15,20,0.5) 58%, rgba(11,15,20,0.34) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-full px-6 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12">
        <div className="flex flex-col">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {t.eyebrow}
          </Reveal>

          <Reveal
            tag="h1"
            delay={80}
            className="mt-7 text-[clamp(2.75rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone"
          >
            {t.title[0]}
            <br />
            {t.title[1]}
            <br />
            {t.title[2]}
          </Reveal>

          <Reveal
            tag="p"
            delay={220}
            className="mt-8 max-w-2xl text-[clamp(1.0625rem,1.45vw,1.375rem)] leading-[1.55] text-bone/80"
          >
            {t.body}
          </Reveal>

          <Reveal
            tag="dl"
            delay={300}
            className="mt-12 grid w-full gap-px border border-steel/70 bg-steel/70 sm:grid-cols-2 lg:grid-cols-4"
          >
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="group flex flex-col gap-2.5 bg-void/92 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-void"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-dust/85 transition-colors duration-500 group-hover:text-azure-glow">
                  {stat.label}
                </dt>
                <dd className="text-lg font-semibold text-bone">
                  {stat.value}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </header>
  );
}
