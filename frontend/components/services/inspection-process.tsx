import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Inspection Process",
    title: "Checked, then checked again.",
    lede: "Quality assurance at BRU is written into the method statement itself, each of the 21 structural stages carries its own verification, and supervision re-inspects after every formwork strike.",
    phases: ["SOIL & FOUNDING LEVEL", "STRUCTURAL FRAME", "ENVELOPE & MEP", "HANDOVER"],
    steps: [
      { title: "Soil & Founding Level", body: "Founding level taken from the soil report; plate load test confirms bearing capacity and permissible settlement are within safe design limits." },
      { title: "Fill Classification", body: "Backfill sample classified by test, graded coarse granular fill, ideally type (a-1-a), and placed in 30 cm layers to code." },
      { title: "Compaction Verification", body: "95% compaction confirmed for every layer to prevent settlement cracking the ground-floor blinding and dropping the floor tiling." },
      { title: "Formwork Inspection", body: "Timber formwork must be new; strengthened with tie rods, clamps and sound bracing to prevent failure during casting." },
      { title: "Plumb & Alignment", body: "Columns plumbed on all sides before casting, then re-inspected after the formwork is struck." },
      { title: "Casting Control", body: "Required concrete strength enforced, moulds thoroughly wetted before pouring, vibrator used throughout the pour." },
      { title: "Setting-Out Compliance", body: "Structural drawing followed for setting-out, column dimensions and column heights; rooms, bathrooms and kitchens squared per the architectural plan." },
      { title: "Waterproofing", body: "Tie beams insulated to stop moisture migrating into ground-floor walls and causing paint to peel." },
    ],
  },
  ar: {
    eyebrow: "عملية الفحص",
    title: "فُحص، ثم فُحص مرة أخرى.",
    lede: "ضمان الجودة في BRU مكتوب في بيان الطريقة ذاته، فكل مرحلة من المراحل الإنشائية الـ 21 تحمل تحققها الخاص، ويعيد الإشراف الفحص بعد كل عملية فك للشدة الخشبية.",
    phases: ["التربة ومنسوب التأسيس", "الهيكل الإنشائي", "الغلاف والكهروميكانيكا", "التسليم"],
    steps: [
      { title: "التربة ومنسوب التأسيس", body: "يُؤخذ منسوب التأسيس من تقرير التربة؛ ويؤكد اختبار التحميل أن قدرة التحمل والهبوط المسموح به ضمن حدود التصميم الآمنة." },
      { title: "تصنيف الردم", body: "تُصنَّف عينة الردم بالاختبار، ويُفضَّل ردم حبيبي خشن متدرج من النوع (a-1-a)، ويوضع على طبقات بسمك 30 سم وفق الكود." },
      { title: "التحقق من الدمك", body: "يُتحقق من دمك بنسبة 95% لكل طبقة لمنع حدوث هبوط يكسر صبة نظافة الدور الأرضي ويؤدي إلى هبوط البلاط." },
      { title: "فحص الشدة الخشبية", body: "يجب أن تكون الشدة الخشبية جديدة؛ ومقوّاة بالتايروت والقمط والمرابع الجيدة لمنع فشلها أثناء الصب." },
      { title: "التوزين والاستقامة", body: "تُوزَّن الأعمدة من جميع الجوانب قبل الصب، ويُعاد فحصها بعد فك الشدة الخشبية." },
      { title: "ضبط الصب", body: "الالتزام بإجهاد الخرسانة المطلوب، ورش القوالب جيدًا قبل الصب، واستخدام الهزاز طوال عملية الصب." },
      { title: "الالتزام بالتخطيط", body: "اتباع المخطط الإنشائي في التخطيط وأبعاد وارتفاعات الأعمدة؛ وتربيع الغرف والحمامات والمطابخ وفق المخطط المعماري." },
      { title: "العزل المائي", body: "تُعزل الميدات لمنع انتقال الرطوبة إلى جدران الدور الأرضي وتسبب تقشير الدهانات." },
    ],
  },
} as const;

const rings = [
  { r: 130, opacity: 0.16 },
  { r: 100, opacity: 0.26 },
  { r: 70, opacity: 0.4 },
  { r: 40, opacity: 0.7 },
];

function InspectionDiagram({ phases }: { phases: readonly string[] }) {
  return (
    <svg viewBox="0 0 360 320" className="h-auto w-full" role="img" aria-label="Inspection stages diagram">
      {rings.map((ring, index) => (
        <g key={ring.r}>
          <circle
            cx={180}
            cy={160}
            r={ring.r}
            fill="var(--color-azure)"
            fillOpacity={0.18 * ring.opacity}
            stroke="var(--color-azure-glow)"
            strokeOpacity={ring.opacity}
            strokeWidth="1"
          />
          <text
            x={180}
            y={160 - ring.r + 15}
            textAnchor="middle"
            fontSize={7.5}
            letterSpacing={2}
            fill="var(--color-dust)"
            fontFamily="var(--font-mono)"
          >
            {phases[index]}
          </text>
        </g>
      ))}
      <circle cx={180} cy={160} r={4} fill="var(--color-azure-glow)" />
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={180 + 42 * Math.cos(rad)}
            y1={160 + 42 * Math.sin(rad)}
            x2={180 + 132 * Math.cos(rad)}
            y2={160 + 132 * Math.sin(rad)}
            stroke="var(--color-steel)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
        );
      })}
    </svg>
  );
}

export default function InspectionProcess({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section className="border-b border-steel py-20 sm:py-28 bg-void">
      <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20 lg:px-12">
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
            className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
          >
            {t.title}
          </Reveal>

          <Reveal tag="p" delay={140} className="max-w-xl text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
            {t.lede}
          </Reveal>

          <ul className="grid gap-px bg-steel sm:grid-cols-2">
            {t.steps.map((step, index) => (
              <Reveal
                key={step.title}
                tag="li"
                delay={index * 60}
                className="flex flex-col gap-2.5 bg-void p-6"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-bone">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ash">{step.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal clip className="relative border border-steel bg-ink p-8">
          <div
            className="blueprint-grid pointer-events-none absolute inset-0 opacity-20"
            aria-hidden="true"
          />
          <div className="relative">
            <InspectionDiagram phases={t.phases} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
