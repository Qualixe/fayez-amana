import Reveal from "@/components/reveal";

const reasons = [
  {
    title: "25+ Years of Experience",
    description:
      "Over a quarter century shaping the construction landscape of Saudi Arabia with precision, quality, and continuous innovation.",
  },
  {
    title: "ISO-Certified Quality",
    description:
      "Certified in Quality, Safety, and Environmental Management, ensuring every project meets the highest international standards, without compromise.",
  },
  {
    title: "300+ Completed Projects",
    description:
      "A proven track record spanning residential, commercial, hospitality, and public developments, delivered on time and on budget.",
  },
  {
    title: "Trusted Across All Sectors",
    description:
      "A trusted partner to leading developers, government entities, and private clients, built on long-term relationships and consistent excellence.",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden border-t border-steel bg-ink py-20 sm:py-28">
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <img
          src="/images/why-choose-bg.avif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <Reveal
          tag="p"
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
        >
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          Why BRU CO.
        </Reveal>

        <Reveal
          tag="p"
          delay={60}
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-ash"
        >
          Building Reference, Your First Reference in Construction, Since 2000
        </Reveal>

        <Reveal
          tag="h2"
          delay={100}
          className="mt-7 text-[clamp(2.75rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone"
        >
          Why Choose BRU CO.?
        </Reveal>

        <div className="mt-16 grid gap-px bg-steel sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal
              key={reason.title}
              tag="div"
              delay={index * 90}
              className="flex flex-col gap-4 bg-ink p-9"
            >
              <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                {reason.title}
              </h3>
              <p className="text-[0.9875rem] leading-[1.72] text-dust">
                {reason.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
