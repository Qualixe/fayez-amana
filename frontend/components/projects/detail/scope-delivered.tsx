import Reveal from "@/components/reveal";
import { Project, scopeDisciplines } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Scope Delivered",
    heading: ["Services on", "this project."],
    jeddahCta: "Our Construction Work in Jeddah",
    allProjectsCta: "All Projects",
  },
  ar: {
    eyebrow: "النطاق المنجز",
    heading: ["الخدمات في", "هذا المشروع."],
    jeddahCta: "أعمالنا الإنشائية في جدة",
    allProjectsCta: "جميع المشاريع",
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

export default function ProjectDetailScopeDelivered({ project, locale }: { project: Project; locale: Locale }) {
  const t = content[locale];
  const disciplines = scopeDisciplines(project);

  return (
    <section className="border-b border-steel bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
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
          className="mt-6 max-w-2xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
        >
          {t.heading[0]}
          <br />
          {t.heading[1]}
        </Reveal>

        <Reveal tag="ul" delay={140} className="mt-12 grid gap-px bg-steel sm:grid-cols-2">
          {disciplines.map((discipline, index) => (
            <li key={discipline.slug}>
              <a
                href={`/services#${discipline.slug}`}
                className="group flex h-full flex-col gap-4 bg-ink p-8 transition-colors duration-500 hover:bg-slab lg:p-10"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                  {discipline.number}
                </span>
                <span className="text-xl font-semibold leading-snug tracking-[-0.02em] text-bone transition-colors duration-500 group-hover:text-azure-glow">
                  {discipline.label[locale]}
                </span>
              </a>
            </li>
          ))}
        </Reveal>

        <Reveal tag="div" delay={220} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="/construction-company-jeddah"
            className="btn-premium btn-premium-outline group inline-flex min-h-[52px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-7 py-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone hover:bg-white/[0.08]"
          >
            {t.jeddahCta}
            <ArrowIcon />
          </a>
          <a
            href="/projects"
            className="btn-premium btn-premium-outline group inline-flex min-h-[52px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-7 py-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone hover:bg-white/[0.08]"
          >
            {t.allProjectsCta}
            <ArrowIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
