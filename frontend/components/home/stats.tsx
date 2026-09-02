import Reveal from "@/components/reveal";
import Counter from "@/components/counter";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    stats: [
      {
        value: 300,
        suffix: "+",
        label: "Completed Projects",
        description: "Across residential, commercial, hospitality and public sectors",
      },
      {
        value: 25,
        suffix: "+",
        label: "Years of Experience",
        description: "Shaping the construction landscape of Saudi Arabia since 2000",
      },
      {
        value: 80,
        suffix: "+",
        label: "Team Members",
        description: "Engineers, architects, project managers and skilled professionals",
      },
      {
        value: 4,
        suffix: "",
        label: "Core Disciplines",
        description: "Structural · Architectural · Electromechanical · Interior",
      },
    ],
  },
  ar: {
    stats: [
      {
        value: 300,
        suffix: "+",
        label: "مشروع منجز",
        description: "في القطاعات السكنية والتجارية والفندقية والحكومية",
      },
      {
        value: 25,
        suffix: "+",
        label: "عامًا من الخبرة",
        description: "نشكّل ملامح قطاع الإنشاءات في المملكة العربية السعودية منذ عام 2000",
      },
      {
        value: 80,
        suffix: "+",
        label: "عضو فريق",
        description: "مهندسون ومعماريون ومديرو مشاريع وكوادر فنية ماهرة",
      },
      {
        value: 4,
        suffix: "",
        label: "تخصصات أساسية",
        description: "إنشائي · معماري · كهروميكانيكي · داخلي",
      },
    ],
  },
} as const;

export default function Stats({ locale }: { locale: Locale }) {
  const { stats } = content[locale];
  return (
    <section className="relative border-t border-steel bg-void">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <div className="grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              tag="div"
              delay={index * 90}
              className="group relative flex flex-col gap-4 bg-void px-6 py-14 transition-colors duration-500 hover:bg-ink sm:px-8"
            >
              <div className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone transition-colors duration-500 group-hover:text-azure-glow">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                {stat.label}
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ash">
                {stat.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
