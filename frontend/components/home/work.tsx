import Reveal from "@/components/reveal";
import { localize, categoryLabel, type Project } from "@/components/projects/data";
import type { HomeSettings } from "@/lib/db/home";
import type { Locale } from "@/lib/locale";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 group-hover:translate-x-1"
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

export default function Work({
  locale,
  settings,
  projects,
}: {
  locale: Locale;
  settings: HomeSettings["work"];
  projects: Project[];
}) {
  const t = settings;
  return (
    <section
      id="work"
      className="relative border-t border-steel bg-void py-20 sm:py-28"
    >
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-6">
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
              className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
            >
              {t.title1}
              <br />
              {t.title2}
            </Reveal>

            <Reveal
              tag="p"
              delay={160}
              className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust"
            >
              {t.lede}
            </Reveal>
          </div>

          <Reveal tag="div" delay={220}>
            <a
              href="/projects"
              className="group inline-flex min-h-[56px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08]"
            >
              {t.allProjects}
              <ArrowIcon />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const p = localize(project, locale);
            return (
              <Reveal
                key={p.slug}
                delay={(index % 3) * 110}
                className="block"
              >
                <a href={`/projects/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-slab xl:aspect-[3/4]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-40"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(4,6,9,0.92) 0%, rgba(4,6,9,0.15) 55%, transparent 100%)",
                      }}
                    />
                    <span className="absolute start-5 top-5 bg-void/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-azure-glow backdrop-blur-md">
                      {categoryLabel(p.category, locale)}
                    </span>
                    <span className="absolute end-5 top-5 font-mono text-[10px] tabular-nums tracking-[0.2em] text-dust">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone transition-colors duration-500 group-hover:text-azure-glow">
                        {p.title}
                      </h3>
                      <p className="mt-2.5 max-w-md text-sm leading-relaxed text-dust">
                        {p.teaser}
                      </p>
                      <div className="mt-4 flex items-center gap-2 overflow-hidden">
                        <span className="translate-y-6 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow transition-transform duration-500 ease-out group-hover:translate-y-0">
                          {t.viewProject}
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-3 w-3 translate-y-6 text-azure-glow transition-transform duration-500 ease-out group-hover:translate-y-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
