import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Our Services",
    title1: "Four disciplines,",
    title2: "one roof.",
    lede: "Comprehensive construction solutions under one roof, from foundation to finish, BRU delivers with precision and excellence.",
    disciplines: [
      { label: "01", value: "Structural & Construction Works" },
      { label: "02", value: "Architectural Works" },
      { label: "03", value: "Electromechanical Works" },
      { label: "04", value: "Interior Design & Finishing" },
    ],
  },
  ar: {
    eyebrow: "خدماتنا",
    title1: "أربعة تخصصات،",
    title2: "تحت سقف واحد.",
    lede: "حلول إنشائية متكاملة تحت مظلة واحدة، من الأساسات حتى التشطيب النهائي، تقدّمها BRU بدقة وتميّز.",
    disciplines: [
      { label: "01", value: "الأعمال الإنشائية والبناء" },
      { label: "02", value: "الأعمال المعمارية" },
      { label: "03", value: "الأعمال الكهروميكانيكية" },
      { label: "04", value: "التصميم الداخلي والتشطيبات" },
    ],
  },
} as const;

export default function ServicesHero({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <header className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-steel">
      <div className="absolute inset-[-8%] overflow-hidden" aria-hidden="true">
        <img
          src="/images/service-hero-bg.avif"
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, rgba(11,15,20,0) 35%, rgba(11,15,20,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-full px-6 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12">
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
          className="mt-7 text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone [text-shadow:0_2px_30px_rgba(11,15,20,0.45)]"
        >
          {t.title1}
          <br />
          <span className="text-azure-glow">{t.title2}</span>
        </Reveal>

        <Reveal
          tag="p"
          delay={220}
          className="mt-8 max-w-2xl text-[clamp(1.0625rem,1.45vw,1.375rem)] leading-[1.55] tracking-[-0.011em] text-bone/80"
        >
          {t.lede}
        </Reveal>

        <Reveal
          tag="dl"
          delay={300}
          className="mt-12 grid w-full gap-px border border-steel/70 bg-steel/70 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.disciplines.map((item) => (
            <div
              key={item.label}
              className="group flex flex-col gap-2.5 bg-void/92 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-void"
            >
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-dust/85 transition-colors duration-500 group-hover:text-azure-glow">
                {item.label}
              </dt>
              <dd className="text-base font-medium leading-[1.5] tracking-[-0.012em] text-bone">
                {item.value}
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </header>
  );
}
