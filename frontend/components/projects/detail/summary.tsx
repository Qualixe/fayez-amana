import Reveal from "@/components/reveal";
import { Project, scopeDisciplines } from "@/components/projects/data";

export default function ProjectDetailSummary({ project }: { project: Project }) {
  const quickLinks = [
    { label: "Construction services", href: "/services" },
    { label: "The 21-stage process", href: "/process" },
    { label: "General contractor in Jeddah", href: "/construction-company-jeddah" },
  ];

  const stats = [
    { label: "Scope of work", value: project.scope },
    { label: "Delivered by", value: "BRU CO., general contractor, Jeddah" },
    { label: "Disciplines on site", value: String(scopeDisciplines(project).length || 1) },
    { label: "Certification", value: "ISO certified, Saudi Contractors Authority" },
  ];

  return (
    <section className="border-b border-steel bg-ink py-16 sm:py-20">
      <div className="mx-auto grid max-w-full gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:h-fit">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            Project summary
          </Reveal>

          <Reveal tag="p" delay={80} className="text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-bone/90">
            {project.title} is a {project.category.toLowerCase()} construction project in{" "}
            {project.location}, built by BRU CO. (Building Reference United) as general
            contractor. The scope covered {project.scope.toLowerCase()}. BRU CO. has worked
            across Jeddah, Makkah, the Western Region and the wider Kingdom of Saudi Arabia
            since 2000, with more than 300 completed projects.
          </Reveal>

          <Reveal tag="ul" delay={160} className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow transition-colors duration-400 hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </Reveal>
        </div>

        <div className="grid gap-px self-start bg-steel sm:grid-cols-2">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              tag="div"
              delay={index * 70}
              className="flex flex-col gap-2.5 bg-ink p-6"
            >
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-dust/85">
                {stat.label}
              </dt>
              <dd className="text-base font-medium leading-[1.5] tracking-[-0.012em] text-bone">
                {stat.value}
              </dd>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
