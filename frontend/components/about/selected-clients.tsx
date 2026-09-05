import Reveal from "@/components/reveal";
import type { Client } from "@/lib/db/about";
import type { Locale } from "@/lib/locale";

const content = {
    en: {
        eyebrow: "Selected Clients",
        title: "Who we build for.",
        lede: "Trusted relationships built through construction delivery, across real-estate development, hospitality, healthcare and Saudi retail.",
    },
    ar: {
        eyebrow: "عملاء مختارون",
        title: "لمن نبني.",
        lede: "علاقات موثوقة بُنيت عبر تنفيذ مشاريع إنشائية، في قطاعات التطوير العقاري والضيافة والرعاية الصحية والتجزئة السعودية.",
    },
} as const;

export default function SelectedClients({ locale, clients }: { locale: Locale; clients: Client[] }) {
    const t = content[locale];
    return (
        <section className="border-t border-steel bg-ink py-20 sm:py-28">
            <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-6">
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
                        className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
                    >
                        {t.title}
                    </Reveal>

                    <Reveal tag="p" delay={160} className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust">
                        {t.lede}
                    </Reveal>
                </div>

                <ul className="mt-14 flex flex-wrap justify-center gap-px bg-steel">
                    {clients.map((client, index) => (
                        <Reveal
                            key={client.id}
                            tag="li"
                            delay={(index % 4) * 70}
                            className="group relative flex basis-[calc(50%-0.5px)] items-center justify-center bg-void p-5 sm:basis-[calc(33.333%-0.667px)] sm:p-7 lg:basis-[calc(25%-0.75px)]"
                        >
                            <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-sm bg-paper p-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 sm:p-7">
                                <img src={client.image} alt={client.name} className="h-full w-full object-contain" />
                            </span>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
