import Reveal from "@/components/reveal";

const kicker = "مراحل العمل في مشروع عظم";

const arabicLede =
  "تتكوّن مرحلة العظم من 21 مرحلة متتابعة تبدأ من أعمال الحفر وتأسيس الأساسات، مرورًا بتنفيذ الهيكل الخرساني، وصولًا إلى اكتمال المبنى في حالته العظمية. كل مرحلة مصممة لضمان الجودة، الدقة، والالتزام بالجدول الزمني، مع متابعة مستمرة بين فرق التنفيذ والإشراف لضمان سلامة وسير العمل وفق المواصفات الهندسية المعتمدة.";

const englishLede =
  "The structural (shell) phase consists of 21 consecutive stages, beginning with excavation works and the setting-out of foundations, proceeding through execution of the concrete frame, and reaching completion of the building in its structural state. Each stage is designed to guarantee quality, precision, and adherence to the schedule, with continuous follow-up between the execution and supervision teams to ensure safety and that work proceeds according to the approved engineering specifications.";

export default function ProcessBilingualIntro() {
  return (
    <section className="border-b border-steel py-16">
      <div className="mx-auto grid max-w-full gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-4">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {kicker}
          </Reveal>

          <Reveal tag="div" delay={80}>
            <p
              dir="rtl"
              className="font-serif text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.18] tracking-[-0.02em] text-bone/90"
            >
              {arabicLede}
            </p>
          </Reveal>
        </div>

        <Reveal
          tag="p"
          delay={140}
          className="text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust"
        >
          {englishLede}
        </Reveal>
      </div>
    </section>
  );
}
