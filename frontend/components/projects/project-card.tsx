import { Project, projectCity, localize, categoryLabel } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3 w-3 shrink-0 transition-transform duration-500 group-hover:translate-x-1"
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

export default function ProjectCard({
  project,
  rank,
  lead = false,
  locale,
}: {
  project: Project;
  rank: number;
  lead?: boolean;
  locale: Locale;
}) {
  const p = localize(project, locale);
  const viewProject = locale === "ar" ? "عرض المشروع" : "View Project";

  return (
    <a
      href={`/projects/${p.slug}`}
      aria-label={`${p.title}, ${categoryLabel(p.category, locale)}, ${projectCity(p)}`}
      className="group relative block overflow-hidden"
    >
      <div
        className={`relative overflow-hidden bg-slab ${
          lead ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3] lg:aspect-[3/2]"
        }`}
      >
        <img
          src={p.image}
          alt={p.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-85"
          style={{
            background:
              "linear-gradient(to top, rgba(11,15,20,0.95) 0%, rgba(11,15,20,0.7) 30%, rgba(11,15,20,0.18) 62%, rgba(11,15,20,0.28) 100%)",
          }}
        />
        <span className="absolute start-6 top-6 border border-bone/15 bg-void/50 px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow backdrop-blur-md">
          {categoryLabel(p.category, locale)}
        </span>
        <span className="absolute end-6 top-6 font-mono text-[10px] tabular-nums tracking-[0.22em] text-bone/55">
          {String(rank + 1).padStart(2, "0")}
        </span>

        <div className={`absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-8 ${lead ? "lg:p-12" : ""}`}>
          <h3
            className={`font-semibold leading-[1.14] tracking-[-0.03em] text-bone transition-colors duration-500 group-hover:text-azure-glow ${
              lead
                ? "max-w-3xl text-[1.75rem] leading-[1.1] sm:text-[2.25rem] lg:text-[3rem]"
                : "max-w-xl text-[1.375rem] sm:text-[1.75rem]"
            }`}
          >
            {p.title}
          </h3>
          <p className={`max-w-[52ch] leading-relaxed text-dust ${lead ? "text-[0.9375rem] sm:text-base" : "text-[0.9375rem]"}`}>
            {p.teaser}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-dust">
            <span className="text-bone">{projectCity(p)}</span>
            {p.size ? (
              <>
                <span aria-hidden="true" className="h-3 w-px bg-steel" />
                <span className="normal-case tracking-[0.1em]">{p.size}</span>
              </>
            ) : null}
            <span className="ms-auto flex translate-y-[10px] items-center gap-2 whitespace-nowrap text-azure-glow opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {viewProject}
              <ArrowIcon />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
