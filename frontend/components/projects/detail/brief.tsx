import Reveal from "@/components/reveal";
import { Project, categoryLabel, localize } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Project Brief",
    client: "Client",
    location: "Location",
    scope: "Scope of Work",
    size: "Project Size",
    sector: "Sector",
    contractor: "Contractor",
    contractorValue: "Fayez Amana, Fayez Amana Construction Company",
    fallbackClient: "Fayez Amana",
    cta: "Enquire About Similar Work",
    timelineLabel: "Construction Timeline",
    timeline: ["Planning", "Design", "Engineering", "Construction", "Quality Control", "Completion"],
  },
  ar: {
    eyebrow: "موجز المشروع",
    client: "العميل",
    location: "الموقع",
    scope: "نطاق العمل",
    size: "مساحة المشروع",
    sector: "القطاع",
    contractor: "المقاول",
    contractorValue: "Fayez Amana، فايز أمانة للمقاولات",
    fallbackClient: "Fayez Amana",
    cta: "استفسر عن عمل مشابه",
    timelineLabel: "الجدول الزمني للإنشاء",
    timeline: ["التخطيط", "التصميم", "الهندسة", "التنفيذ", "ضبط الجودة", "التسليم"],
  },
} as const;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180"
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

export default function ProjectDetailBrief({ project, locale }: { project: Project; locale: Locale }) {
  const t = content[locale];
  const p = localize(project, locale);

  const fields = [
    { label: t.client, value: p.client ?? t.fallbackClient },
    { label: t.location, value: p.location },
    { label: t.scope, value: p.scope },
    { label: t.size, value: p.size ?? "—" },
    { label: t.sector, value: categoryLabel(p.category, locale) },
    { label: t.contractor, value: t.contractorValue },
  ];

  return (
    <section className="border-b border-steel py-20 sm:py-28">
      <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:px-12">
        <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:h-fit">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {t.eyebrow}
          </Reveal>

          <dl className="flex flex-col">
            {fields.map((field) => (
              <div key={field.label} className="flex flex-col gap-2.5 border-t border-steel py-6 last:border-b">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-dust/85">
                  {field.label}
                </dt>
                <dd className="text-base font-medium leading-[1.5] tracking-[-0.012em] text-bone">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="/contact"
            className="btn-premium btn-premium-fill group inline-flex min-h-[56px] items-center justify-center gap-3 px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white hover:brightness-110"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
            }}
          >
            {t.cta}
            <ArrowIcon />
          </a>
        </div>

        <div className="flex flex-col gap-10">
          <Reveal tag="p" className="max-w-[24ch] font-serif text-[clamp(1.5rem,3.4vw,3rem)] italic leading-[1.18] tracking-[-0.02em] text-bone/90">
            {p.subtitle}
          </Reveal>

          <Reveal
            tag="p"
            delay={120}
            className="max-w-[68ch] text-[1.0625rem] leading-[1.72] tracking-[-0.004em] text-dust"
          >
            {p.description}
          </Reveal>

          <div className="mt-4">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dust">
              <span aria-hidden="true" className="h-px w-8 bg-rebar" />
              {t.timelineLabel}
            </p>

            <ol className="mt-8 grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-3">
              {t.timeline.map((stage, index) => (
                <Reveal
                  key={stage}
                  tag="li"
                  delay={index * 70}
                  className="flex flex-col gap-3 bg-void p-7"
                >
                  <span className="font-mono text-[0.75rem] tabular-nums tracking-[0.2em] text-azure-glow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold leading-snug tracking-[-0.015em] text-bone">
                    {stage}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
