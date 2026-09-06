import Reveal from "@/components/reveal";
import ProjectCard from "@/components/projects/project-card";
import type { LocationPage } from "@/lib/db/locations";
import type { Project } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

export default function LocationPageContent({
  data,
  projects,
  locale,
}: {
  data: LocationPage;
  projects: Project[];
  locale: Locale;
}) {
  const { hero, body, projects: projectsCopy } = data;

  return (
    <>
      <header className="relative flex min-h-[80svh] items-end overflow-hidden border-b border-steel">
        <div className="absolute inset-[-8%] overflow-hidden" aria-hidden="true">
          <img src={hero.image} alt="" className="hero-settle h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(11,15,20,0.97) 0%, rgba(11,15,20,0.86) 26%, rgba(11,15,20,0.5) 58%, rgba(11,15,20,0.34) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(120% 90% at 50% 0%, rgba(11,15,20,0) 35%, rgba(11,15,20,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-full px-6 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {hero.eyebrow}
          </Reveal>

          <Reveal
            tag="h1"
            delay={80}
            className="mt-7 text-[clamp(2.5rem,7.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-bone [text-shadow:0_2px_30px_rgba(11,15,20,0.45)]"
          >
            {hero.title1}
            <br />
            <span className="text-azure-glow">{hero.title2}</span>
          </Reveal>

          <Reveal
            tag="p"
            delay={220}
            className="mt-8 max-w-2xl text-[clamp(1.0625rem,1.45vw,1.375rem)] leading-[1.55] tracking-[-0.011em] text-bone/80"
          >
            {hero.lede}
          </Reveal>

          <dl className="mt-12 grid w-full gap-px border border-steel/70 bg-steel/70 sm:grid-cols-3">
            {hero.meta.map((item) => (
              <div
                key={item.label}
                className="group flex flex-col gap-2.5 bg-void/92 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-void"
              >
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-dust/85">{item.label}</dt>
                <dd className="text-base font-medium leading-[1.5] tracking-[-0.012em] text-bone">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="border-b border-steel bg-void py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {body.eyebrow}
          </Reveal>
          <Reveal
            tag="h2"
            delay={80}
            className="mt-6 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-bone"
          >
            {body.title}
          </Reveal>
          <Reveal tag="p" delay={160} className="mt-6 text-[1.0625rem] leading-relaxed text-dust">
            {body.p1}
          </Reveal>
          <Reveal tag="p" delay={220} className="mt-4 text-[1.0625rem] leading-relaxed text-dust">
            {body.p2}
          </Reveal>
        </div>
      </section>

      <section className="border-b border-steel bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {projectsCopy.eyebrow}
          </Reveal>
          <Reveal
            tag="h2"
            delay={80}
            className="mt-6 max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-bone"
          >
            {projectsCopy.title}
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 110} className="block">
                <ProjectCard project={project} rank={index} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
