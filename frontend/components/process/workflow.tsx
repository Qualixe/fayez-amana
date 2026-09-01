import Reveal from "@/components/reveal";
import { workflowPhases } from "@/components/process/data";

export default function ProcessWorkflow() {
  return (
    <section className="border-b border-steel bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <Reveal
          tag="p"
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
        >
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          Workflow
        </Reveal>

        <Reveal
          tag="h2"
          delay={80}
          className="mt-6 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
        >
          Planning to
          <br />
          completion.
        </Reveal>

        <Reveal tag="p" delay={140} className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
          Six phases wrap the technical programme, every project moves
          through them in sequence, with continuous follow-up between
          execution and supervision teams.
        </Reveal>

        <ol className="mt-16 flex flex-col lg:flex-row">
          {workflowPhases.map((phase, index) => (
            <Reveal
              key={phase.title}
              tag="li"
              delay={index * 90}
              className="group relative flex min-w-0 flex-1 flex-col gap-4 border-t border-steel py-9 lg:border-t-0 lg:border-s lg:px-5 lg:py-0 lg:first:ps-0 lg:last:pe-0 xl:px-7"
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(1.15rem,1.6vw,1.75rem)] font-semibold leading-tight text-bone">
                {phase.title}
              </h3>
              <p className="text-sm leading-relaxed text-ash">{phase.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
