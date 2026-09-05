import Reveal from "@/components/reveal";
import type { AboutPageSettings } from "@/lib/db/about";

export default function Expertise({
    settings,
    image,
}: {
    settings: AboutPageSettings["expertise"];
    image: string;
}) {
    const t = settings;
    return (
        <section className="border-t border-steel bg-void py-20 sm:py-28">
            <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12">
                <div className="flex flex-col gap-7">
                    <Reveal
                        tag="p"
                        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
                    >
                        <span aria-hidden="true" className="h-px w-8 bg-azure" />
                        {t.eyebrow}
                    </Reveal>

                    <Reveal tag="p" className="text-[1.0625rem] leading-[1.72] tracking-[-0.004em] text-dust">
                        {t.p1}
                    </Reveal>

                    <Reveal tag="p" delay={120} className="text-[1.0625rem] leading-[1.72] tracking-[-0.004em] text-dust">
                        {t.p2}
                    </Reveal>

                    <Reveal tag="ul" delay={220} className="mt-3 flex flex-wrap gap-2.5">
                        {t.tags.map((tag) => (
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
                        src={image}
                        alt="BRU CO. RB Villa, a modern residential villa façade at night in Jeddah, Saudi Arabia"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </Reveal>
            </div>
        </section>
    );
}
