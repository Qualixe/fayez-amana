import Reveal from "@/components/reveal";

const tags = ["Residential", "Commercial", "Hospitality", "Public Works", "Government"];

export default function Expertise() {
    return (
        <section className="border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12">
                <div className="flex flex-col gap-7">
                    <Reveal
                        tag="p"
                        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
                    >
                        <span aria-hidden="true" className="h-px w-8 bg-azure" />
                        Our Expertise
                    </Reveal>

                    <Reveal tag="p" className="text-[1.0625rem] leading-[1.72] tracking-[-0.004em] text-dust">
                        Founded in the year 2000, BRU (Building Reference United Company) was established with a bold
                        vision: to integrate architecture, construction, and engineering expertise into one unified
                        entity. From a modest beginning driven by great ambition, BRU has grown into an integrated
                        construction and engineering company, and one of the most trusted contracting firms in Saudi
                        Arabia.
                    </Reveal>

                    <Reveal tag="p" delay={120} className="text-[1.0625rem] leading-[1.72] tracking-[-0.004em] text-dust">
                        Our team of engineers, architects, project managers, and skilled site personnel work in
                        seamless collaboration, turning ideas into reality, whether executing complex structural
                        projects, delivering precise finishes, or implementing advanced MEP systems. Aligned with
                        Saudi Vision 2030, we remain committed to innovation and the advancement of the nation&apos;s
                        built environment, proud partners to developers, government entities, and private clients
                        across the Kingdom.
                    </Reveal>

                    <Reveal tag="ul" delay={220} className="mt-3 flex flex-wrap gap-2.5">
                        {tags.map((tag) => (
                            <li
                                key={tag}
                                className="border border-steel px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-dust"
                            >
                                {tag}
                            </li>
                        ))}
                    </Reveal>
                </div>

                <Reveal clip className="relative aspect-[16/11] self-center overflow-hidden bg-slab">
                    <img
                        src="/images/about-img1.avif"
                        alt="BRU CO. RB Villa, a modern residential villa façade at night in Jeddah, Saudi Arabia"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </Reveal>
            </div>
        </section>
    );
}
