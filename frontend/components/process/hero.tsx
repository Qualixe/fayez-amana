import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Stages of Work in a Structural (Shell) Project",
    heading: ["The 21", "stages of a", "structural build."],
    lede: "The structural (shell) phase consists of 21 consecutive stages, beginning with excavation works and the setting-out of foundations, proceeding through execution of the concrete frame, and reaching completion of the building in its structural state. Each stage is designed to guarantee quality, precision, and adherence to the schedule, with continuous follow-up between the execution and supervision teams to ensure safety and that work proceeds according to the approved engineering specifications.",
    meta: [
      { label: "Structural Stages", value: "21 consecutive" },
      { label: "Starts With", value: "Excavation & foundations" },
      { label: "Ends With", value: "Building in structural state" },
      { label: "Governed By", value: "Approved engineering specifications" },
    ],
  },
  ar: {
    eyebrow: "مراحل العمل في مشروع عظم",
    heading: ["مراحل بناء", "الهيكل الإنشائي", "الـ21."],
    lede: "تتكوّن مرحلة العظم من 21 مرحلة متتابعة تبدأ من أعمال الحفر وتأسيس الأساسات، مرورًا بتنفيذ الهيكل الخرساني، وصولًا إلى اكتمال المبنى في حالته العظمية. كل مرحلة مصممة لضمان الجودة، الدقة، والالتزام بالجدول الزمني، مع متابعة مستمرة بين فرق التنفيذ والإشراف لضمان سلامة وسير العمل وفق المواصفات الهندسية المعتمدة.",
    meta: [
      { label: "المراحل الإنشائية", value: "21 مرحلة متتابعة" },
      { label: "تبدأ بـ", value: "الحفر وتأسيس الأساسات" },
      { label: "تنتهي بـ", value: "اكتمال المبنى في حالته الإنشائية" },
      { label: "وفق", value: "المواصفات الهندسية المعتمدة" },
    ],
  },
} as const;

export default function ProcessHero({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <header className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-steel">
      <div className="absolute inset-[-8%] overflow-hidden" aria-hidden="true">
        <img
          src="/images/work-img5.avif"
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
          {t.heading.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
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
          {t.meta.map((item) => (
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
