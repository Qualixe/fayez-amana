import { Project, projectCity, localize, categoryLabel } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3 w-3 shrink-0"
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

export default function EditorialProjectCard({
  project,
  rank,
  locale,
}: {
  project: Project;
  rank: number;
  locale: Locale;
}) {
  const p = localize(project, locale);
  const viewProject = locale === "ar" ? "عرض المشروع" : "View Project";

  return (
    <a
      href={`/projects/${p.slug}`}
      aria-label={`${p.title}, ${categoryLabel(p.category, locale)}, ${projectCity(p)}`}
      className="group flex h-full flex-col"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-slab transition-transform duration-[750ms] ease-out will-change-transform group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 group-hover:shadow-[0_36px_68px_-34px_rgba(0,0,0,0.9)] group-focus-visible:shadow-[0_36px_68px_-34px_rgba(0,0,0,0.9)]">
        <img
          src={p.image}
          alt={p.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-90 transition-opacity duration-700 group-hover:opacity-60"
          style={{
            background:
              "linear-gradient(to top, rgba(11,15,20,0.62) 0%, rgba(11,15,20,0.12) 34%, rgba(11,15,20,0.28) 100%)",
          }}
        />
        <span className="absolute start-5 top-5 border border-bone/15 bg-void/55 px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow backdrop-blur-md">
          {categoryLabel(p.category, locale)}
        </span>
        <span className="absolute end-5 top-5 font-mono text-[10px] tabular-nums tracking-[0.2em] text-dust">
          {String(rank + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="text-[1.375rem] font-semibold leading-[1.16] tracking-[-0.02em] text-bone transition-colors duration-500 group-hover:text-azure-glow sm:text-[1.5rem]">
          {p.title}
        </h3>
        <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-dust">
          {p.teaser}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-steel/70 pt-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-dust">
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
    </a>
  );
}
