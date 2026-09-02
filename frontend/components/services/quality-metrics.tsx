import Reveal from "@/components/reveal";
import Counter from "@/components/counter";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    counters: [
      { value: 21, suffix: "", label: "Structural stages with sign-off" },
      { value: 95, suffix: "%", label: "Minimum compaction per layer" },
      { value: 30, suffix: "cm", label: "Maximum backfill layer thickness" },
      { value: 3, suffix: "×", label: "Anti-termite treatment passes" },
    ],
  },
  ar: {
    counters: [
      { value: 21, suffix: "", label: "مرحلة إنشائية معتمدة" },
      { value: 95, suffix: "%", label: "الحد الأدنى للدمك لكل طبقة" },
      { value: 30, suffix: "سم", label: "الحد الأقصى لسمك طبقة الردم" },
      { value: 3, suffix: "×", label: "مرات معالجة مضادة للنمل الأبيض" },
    ],
  },
} as const;

export default function QualityMetrics({ locale }: { locale: Locale }) {
  const { counters } = content[locale];
  return (
    <section id="quality-assurance" className="scroll-mt-24 border-b border-steel">
      <div className="mx-auto bg-steel max-w-full px-6 sm:px-8 lg:px-12">
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((counter, index) => (
            <Reveal
              key={counter.label}
              tag="div"
              delay={index * 90}
              className="flex flex-col gap-3 bg-void px-6 py-14 sm:px-8"
            >
              <div className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-azure-glow">
                <Counter value={counter.value} suffix={counter.suffix} />
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ash">
                {counter.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
