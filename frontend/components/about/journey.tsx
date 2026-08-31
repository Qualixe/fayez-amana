import Reveal from "@/components/reveal";
import Counter from "@/components/counter";

const milestones = [
    {
        year: "2000",
        title: "The Launch, Building Foundations",
        description:
            "BRU was founded with a bold vision to integrate architecture, construction, and engineering into one unified entity. The company entered the Saudi market with a focus on residential and commercial projects, quickly earning a reputation for blending modern methods with local identity.",
    },
    {
        year: "2005 to 2017",
        title: "Expanding Horizons",
        description:
            "BRU successfully delivered over 250 projects, ranging from residential and commercial developments to administrative and entertainment facilities. This period marked BRU's transformation into a trusted partner in diverse sectors of the Saudi construction industry.",
    },
    {
        year: "2017 to 2019",
        title: "Recognition & Growth",
        description:
            "BRU evolved into a multidisciplinary company, adding engineering construction, project management, and supervision services to its portfolio. ISO certification was achieved, cementing the company's commitment to international quality standards.",
    },
    {
        year: "2019 to 2025",
        title: "Driving Innovation",
        description:
            "Focus on enhancing internal systems, upgrading construction methods, and investing in professional development, building a more resilient, agile organization.",
    },
    {
        year: "2026",
        title: "Future Outlook, Vision 2030",
        description:
            "BRU continues to innovate, expand its portfolio, and contribute to Saudi Arabia's development in alignment with Vision 2030, ensuring sustainable growth and excellence in every project.",
    },
];

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

export default function Journey() {
    return (
        <section className="border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
                    <div className="flex flex-col gap-6">
                        <Reveal
                            tag="p"
                            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
                        >
                            <span aria-hidden="true" className="h-px w-8 bg-azure" />
                            Our Journey
                        </Reveal>

                        <Reveal
                            tag="h2"
                            delay={80}
                            className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
                        >
                            25 Years
                            <br />
                            of Building
                        </Reveal>

                        <Reveal tag="p" delay={160} className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust">
                            From a modest founding in 2000 to one of Jeddah&apos;s most trusted contractors, a story
                            of dedication, growth, and excellence.
                        </Reveal>
                    </div>

                    <Reveal tag="div" delay={220} className="flex shrink-0 flex-col gap-2">
                        <span className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-none text-azure-glow">
                            <Counter value={300} suffix="+" />
                        </span>
                        <span className="max-w-xs text-sm text-ash">
                            Projects completed across residential, commercial, hospitality and public sectors
                        </span>
                    </Reveal>
                </div>

                <ol className="relative mt-20">
                    <span aria-hidden="true" className="absolute left-0 top-0 hidden h-full w-px bg-steel md:block" />
                    {milestones.map((milestone, index) => (
                        <Reveal
                            key={milestone.year}
                            tag="li"
                            delay={index * 100}
                            className="group relative grid gap-5 border-b border-edge pb-16 last:border-b-0 md:grid-cols-[220px_1fr] md:gap-14 md:border-b-0 md:pl-12"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute -left-[5px] top-2 hidden h-2.5 w-2.5 rotate-45 bg-rebar transition-colors duration-500 group-hover:bg-azure md:block"
                            />
                            <div className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-azure-glow">
                                {milestone.year}
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                                    {milestone.title}
                                </h3>
                                <p className="max-w-2xl text-[0.9875rem] leading-[1.72] text-dust">
                                    {milestone.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </ol>

                <Reveal tag="div">
                    <a
                        href="/process"
                        className="group inline-flex min-h-[56px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08]"
                    >
                        How we build: our process
                        <ArrowIcon />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
