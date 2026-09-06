import Reveal from "@/components/reveal";
import type { CareersPageSettings, Position } from "@/lib/db/careers";
import type { Locale } from "@/lib/locale";

const UI = { en: { team: (n: number) => `Team of ${n}` }, ar: { team: (n: number) => `فريق من ${n}` } };

export default function CareersPositions({
  settings,
  items,
  locale,
}: {
  settings: CareersPageSettings["positions"];
  items: Position[];
  locale: Locale;
}) {
  const t = settings;
  const ui = UI[locale];
  return (
    <section className="border-b border-steel py-20 sm:py-28" id="positions">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
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
            className="mt-6 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
          >
            {t.title}
          </Reveal>
          <Reveal tag="p" delay={160} className="mt-6 text-[1.0625rem] leading-relaxed text-dust">
            {t.lede}
          </Reveal>
        </div>

        <ul className="mt-14 flex flex-col">
          {items.map((position, index) => (
            <Reveal
              key={position.id}
              tag="li"
              delay={index * 60}
              className="group grid gap-4 border-t border-steel py-7 last:border-b md:grid-cols-[1.4fr_1.4fr_0.8fr_0.8fr_0.7fr] md:items-center md:gap-8"
            >
              <h3 className="text-xl font-semibold text-bone transition-colors duration-500 group-hover:text-azure-glow">
                {position.title}
              </h3>
              <span className="text-sm text-dust">{position.discipline}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">{position.employmentType}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">{position.location}</span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-azure-glow">
                {ui.team(position.teamSize)}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
