import Reveal from "@/components/reveal";

const sectors = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Healthcare",
  "F&B",
  "Sports Facilities",
];

export default function ProjectsSectors() {
  return (
    <section className="border-b border-steel py-14 sm:py-16" aria-labelledby="sectors-heading">
      <div className="mx-auto flex max-w-full flex-col gap-8 px-6 sm:px-8 lg:flex-row lg:items-start lg:gap-20 lg:px-12">
        <Reveal
          tag="p"
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dust lg:w-48 lg:shrink-0 lg:pt-3"
        >
          <span aria-hidden="true" className="h-px w-8 bg-rebar" />
          <span id="sectors-heading">Sectors</span>
        </Reveal>

        <ul className="grid flex-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <Reveal
              key={sector}
              tag="li"
              delay={index * 60}
              className="group flex items-baseline gap-4 border-b border-steel/50 pb-3"
            >
              <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-dust/80 transition-colors duration-500 group-hover:text-azure-glow">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[1.375rem] font-semibold leading-tight tracking-[-0.025em] text-bone/55 transition-colors duration-500 group-hover:text-azure-glow sm:text-[1.625rem]">
                {sector}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
