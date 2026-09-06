import Reveal from "@/components/reveal";
import Counter from "@/components/counter";
import type { CareersPageSettings, CultureItem } from "@/lib/db/careers";
import type { TeamCategory } from "@/lib/db/about";

export default function CareersCulture({
  settings,
  items,
  breakdown,
}: {
  settings: CareersPageSettings["culture"];
  items: CultureItem[];
  breakdown: TeamCategory[];
}) {
  const t = settings;
  return (
    <section className="border-b border-steel py-20 sm:py-28">
      <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-8">
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

          <div className="flex flex-col">
            {items.map((item, index) => (
              <Reveal
                key={item.id}
                tag="article"
                delay={index * 90}
                className="flex flex-col gap-3 border-t border-steel py-7 last:border-b"
              >
                <h3 className="text-xl font-semibold text-bone">{item.title}</h3>
                <p className="text-sm leading-relaxed text-dust">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative aspect-[4/5] overflow-hidden bg-slab">
            <img src={t.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(11,15,20,0.8), transparent)" }}
            />
          </div>
          <ul className="grid gap-px bg-steel sm:grid-cols-4">
            {breakdown.map((item, index) => (
              <Reveal key={item.id} tag="li" delay={index * 70} className="flex flex-col gap-2 bg-void p-5">
                <span className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-none text-azure-glow">
                  <Counter value={item.count} />
                </span>
                <span className="text-xs leading-snug text-ash">{item.role}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
