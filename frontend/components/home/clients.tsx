import type { CSSProperties } from "react";
import Reveal from "@/components/reveal";
import type { Client } from "@/lib/db/about";
import type { HomeSettings, Highlight } from "@/lib/db/home";

function MarqueeGroup({ items }: { items: readonly string[] }) {
  return (
    <span className="flex items-center gap-10 whitespace-nowrap">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-azure">·</span>
        </span>
      ))}
    </span>
  );
}

export default function Clients({
  settings,
  clients,
  highlights,
}: {
  settings: HomeSettings["clients"];
  clients: Client[];
  highlights: Highlight[];
}) {
  const t = settings;
  return (
    <section
      id="clients"
      className="relative overflow-hidden border-t border-steel bg-ink py-20 sm:py-28"
    >
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
            {t.title1}
            <br />
            {t.title2}
          </Reveal>

          <Reveal
            tag="p"
            delay={160}
            className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust"
          >
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
                <img
                  src={client.image}
                  alt={client.name}
                  className="h-full w-full object-contain"
                />
              </span>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-y border-steel py-10">
        <div
          className="relative overflow-hidden text-[clamp(1.5rem,3vw,2.75rem)] font-semibold text-azure/50"
          aria-hidden="true"
        >
          <div
            className="marquee-track flex w-max items-center gap-10"
            style={{ "--marquee-duration": "46s" } as CSSProperties}
          >
            <MarqueeGroup items={t.marquee} />
            <MarqueeGroup items={t.marquee} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-full px-6 sm:px-8 lg:px-12">
        <div className="grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <Reveal
              key={highlight.title}
              tag="div"
              delay={index * 80}
              className="flex flex-col gap-3 bg-ink p-8"
            >
              <h3 className="text-lg font-semibold text-bone">{highlight.title}</h3>
              <p className="text-sm leading-[1.72] tracking-[-0.004em] text-dust">{highlight.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
