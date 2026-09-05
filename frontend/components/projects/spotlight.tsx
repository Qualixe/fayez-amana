import Reveal from "@/components/reveal";
import ProjectCard from "@/components/projects/project-card";
import { spotlightProjects, type ProjectsPageSettings } from "@/lib/db/projects";
import type { Locale } from "@/lib/locale";

export default async function ProjectsSpotlight({
    locale,
    settings,
}: {
    locale: Locale;
    settings: ProjectsPageSettings["spotlight"];
}) {
    const t = settings;
    const [lead, ...rest] = await spotlightProjects();
    if (!lead) return null;

    return (
        <section className="border-b border-steel py-20 sm:py-24 lg:py-28">
            <div className="mx-auto flex max-w-full flex-col gap-12 px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-5">
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
                            className="max-w-2xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
                        >
                            {t.title}
                        </Reveal>
                    </div>

                    <Reveal
                        tag="p"
                        delay={140}
                        className="max-w-md text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust sm:text-end"
                    >
                        {t.lede}
                    </Reveal>
                </div>

                <div className="flex flex-col gap-8">
                    <Reveal tag="div">
                        <ProjectCard project={lead} rank={0} lead locale={locale} />
                    </Reveal>
                    <Reveal tag="div" delay={110} className="grid gap-8 lg:grid-cols-2">
                        {rest.map((project, index) => (
                            <ProjectCard key={project.slug} project={project} rank={index + 1} locale={locale} />
                        ))}
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
