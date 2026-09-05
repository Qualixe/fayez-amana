import Reveal from "@/components/reveal";
import type { AboutPageSettings } from "@/lib/db/about";

export default function AboutHero({ settings }: { settings: AboutPageSettings["hero"] }) {
    const t = settings;
    return (
        <header className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-steel">
            <div className="absolute inset-[-8%] overflow-hidden" aria-hidden="true">
                <img
                    src={t.image}
                    alt=""
                    className="hero-settle h-full w-full object-cover"
                    style={{ animationDelay: "2.9s" }}
                />
            </div>
            <div className="absolute inset-0" aria-hidden="true">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(11,15,20,0.97) 0%, rgba(11,15,20,0.86) 26%, rgba(11,15,20,0.5) 58%, rgba(11,15,20,0.34) 100%)",
                    }}
                />
            </div>

            <div className="relative mx-auto w-full max-w-full px-6 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12">
                <div className="flex flex-col">
                    <Reveal
                        tag="p"
                        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
                    >
                        <span aria-hidden="true" className="h-px w-8 bg-azure" />
                        {t.eyebrow}
                    </Reveal>

                    <Reveal
                        tag="h1"
                        delay={80}
                        className="mt-7 text-[clamp(2.75rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone"
                    >
                        {t.title.map((line, index) => (
                            <span key={index} className="block">
                                {line}
                            </span>
                        ))}
                    </Reveal>

                    <Reveal
                        tag="p"
                        delay={220}
                        className="mt-8 max-w-2xl text-[clamp(1.0625rem,1.45vw,1.375rem)] leading-[1.55] text-bone/80"
                    >
                        {t.body}
                    </Reveal>

                    <dl className="mt-12 grid w-full gap-px border border-steel/70 bg-steel/70 sm:grid-cols-2 lg:grid-cols-4">
                        {t.stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="group flex flex-col gap-2.5 bg-void/92 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-void"
                            >
                                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-dust/85 transition-colors duration-500 group-hover:text-azure-glow">
                                    {stat.label}
                                </dt>
                                <dd className="text-lg font-semibold text-bone">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </header>
    );
}
