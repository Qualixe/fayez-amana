import Reveal from "@/components/reveal";
import type { CareersPageSettings, Benefit } from "@/lib/db/careers";

export default function CareersBenefits({
  settings,
  items,
}: {
  settings: CareersPageSettings["benefits"];
  items: Benefit[];
}) {
  const t = settings;
  return (
    <section className="border-b border-steel bg-ink py-20 sm:py-28">
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
          className="mt-6 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
        >
          {t.title}
        </Reveal>

        <ul className="mt-14 grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} tag="li" delay={index * 70} className="flex items-start gap-4 bg-ink p-8">
              <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-azure-glow">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-dust">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
