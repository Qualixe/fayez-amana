import { Project, localize } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

const content = {
  en: { prev: "Previous Project", next: "Next Project" },
  ar: { prev: "المشروع السابق", next: "المشروع التالي" },
} as const;

export default function ProjectDetailPrevNext({
  prev,
  next,
  locale,
}: {
  prev: Project;
  next: Project;
  locale: Locale;
}) {
  const t = content[locale];
  const prevP = localize(prev, locale);
  const nextP = localize(next, locale);

  return (
    <section className="border-b border-steel">
      <div className="grid md:grid-cols-2">
        <a
          href={`/projects/${prev.slug}`}
          className="group relative flex min-h-[36vh] items-end overflow-hidden border-steel p-8 md:min-h-[44vh] md:not-last:border-r"
        >
          <img
            src={prev.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-50"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent"
          />
          <div className="relative flex w-full flex-col gap-3">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
              {t.prev}
            </span>
            <span className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone transition-colors duration-500 group-hover:text-azure-glow">
              {prevP.title}
            </span>
          </div>
        </a>

        <a
          href={`/projects/${next.slug}`}
          className="group relative flex min-h-[36vh] items-end overflow-hidden border-steel p-8 md:min-h-[44vh]"
        >
          <img
            src={next.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-50"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent"
          />
          <div className="relative flex w-full flex-col gap-3 md:items-end md:text-right">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
              {t.next}
            </span>
            <span className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone transition-colors duration-500 group-hover:text-azure-glow">
              {nextP.title}
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
