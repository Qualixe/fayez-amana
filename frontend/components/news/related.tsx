import Link from "next/link";
import Reveal from "@/components/reveal";
import type { Service } from "@/lib/db/services";
import { localize, categoryLabel as projectCategoryLabel, projectCity, type Project } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

const UI = {
  en: {
    servicesEyebrow: "Related services",
    servicesTitle1: "What this looks",
    servicesTitle2: "like in practice.",
    projectsEyebrow: "Related work",
    projectsTitle1: "Projects where",
    projectsTitle2: "this applies.",
    viewProject: "View project",
  },
  ar: {
    servicesEyebrow: "خدمات ذات صلة",
    servicesTitle1: "كيف يبدو هذا",
    servicesTitle2: "في التطبيق.",
    projectsEyebrow: "أعمال ذات صلة",
    projectsTitle1: "مشاريع ينطبق",
    projectsTitle2: "عليها هذا.",
    viewProject: "عرض المشروع",
  },
};

export function RelatedServices({ services, locale }: { services: Service[]; locale: Locale }) {
  if (!services.length) return null;
  const t = UI[locale];

  return (
    <section className="border-b border-steel bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <Reveal tag="p" className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          {t.servicesEyebrow}
        </Reveal>
        <Reveal tag="h2" delay={80} className="mt-6 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone">
          {t.servicesTitle1}
          <br />
          {t.servicesTitle2}
        </Reveal>

        <ul className="mt-12 grid gap-px bg-steel sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.id} tag="li" delay={index * 80}>
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col gap-4 bg-ink p-8 transition-colors duration-500 hover:bg-slab lg:p-10"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-azure-glow">{service.number}</span>
                <span className="text-lg font-semibold text-bone transition-colors duration-500 group-hover:text-azure-glow">
                  {service.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RelatedProjects({ projects, locale }: { projects: Project[]; locale: Locale }) {
  if (!projects.length) return null;
  const t = UI[locale];

  return (
    <section className="border-b border-steel py-16 sm:py-20">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <Reveal tag="p" className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          {t.projectsEyebrow}
        </Reveal>
        <Reveal tag="h2" delay={80} className="mt-6 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone">
          {t.projectsTitle1}
          <br />
          {t.projectsTitle2}
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const p = localize(project, locale);
            return (
              <Reveal key={p.slug} delay={index * 70} className="flex">
                <Link href={`/projects/${p.slug}`} className="group flex h-full w-full flex-col">
                  <div className="relative aspect-[3/2] overflow-hidden bg-slab">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-6">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-azure-glow">
                      {projectCategoryLabel(p.category, locale)}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-bone transition-colors duration-500 group-hover:text-azure-glow">
                      {p.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-2 border-t border-steel/70 pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-dust">
                      <span className="text-bone">{projectCity(p)}</span>
                      <span className="ms-auto text-azure-glow">{t.viewProject}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
