import Reveal from "@/components/reveal";
import type { ProjectDetailSettings, MethodArticle } from "@/lib/db/projects";

export default function ProjectDetailMethod({
    settings,
    articles,
}: {
    settings: ProjectDetailSettings["method"];
    articles: MethodArticle[];
}) {
    const t = settings;

    return (
        <section className="border-b border-steel py-20 sm:py-28">
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

                <Reveal tag="p" delay={140} className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
                    {t.lede}
                </Reveal>

                <div className="mt-14 grid gap-px bg-steel md:grid-cols-2">
                    {articles.map((article, index) => (
                        <Reveal
                            key={article.title}
                            tag="article"
                            delay={index * 80}
                            className="flex flex-col gap-4 bg-void p-8 lg:p-10"
                        >
                            <span className="font-mono text-[0.75rem] tabular-nums tracking-[0.2em] text-azure-glow">
                                {article.number}
                            </span>
                            <h3 className="text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                                {article.title}
                            </h3>
                            <p className="max-w-xl text-[0.9875rem] leading-[1.72] tracking-[-0.004em] text-dust">
                                {article.body}
                            </p>
                            <a
                                href={article.href}
                                className="mt-auto pt-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow transition-colors duration-400 hover:text-bone"
                            >
                                {article.label}
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
