import { Project, categoryLabel, localize } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

const content = {
  en: { completed: "Completed" },
  ar: { completed: "مكتمل" },
} as const;

export default function ProjectDetailCompletedFigure({ project, locale }: { project: Project; locale: Locale }) {
  const t = content[locale];
  const p = localize(project, locale);

  return (
    <section className="relative border-b border-steel bg-ink">
      <figure className="relative m-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slab lg:aspect-[21/9]">
          <img
            src={project.image}
            alt={`${p.title}, a ${p.category.toLowerCase()} project by BRU CO. in ${p.location}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(4,6,9,0.92) 0%, rgba(4,6,9,0.35) 38%, rgba(4,6,9,0) 72%)",
            }}
          />
        </div>
        <figcaption className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-full px-6 pb-10 sm:px-8 sm:pb-14 lg:px-12">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
              {t.completed}
            </span>
            <p className="mt-4 max-w-3xl text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
              {p.subtitle}
            </p>
            <p className="mt-4 max-w-xl font-mono text-[0.625rem] uppercase tracking-[0.18em] text-dust">
              {categoryLabel(p.category, locale)} &middot; {p.location}
            </p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
