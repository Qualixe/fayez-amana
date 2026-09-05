import Reveal from "@/components/reveal";
import Counter from "@/components/counter";
import type { HomeStat } from "@/lib/db/home";

export default function Stats({ stats }: { stats: HomeStat[] }) {
  return (
    <section className="relative border-t border-steel bg-void">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <div className="grid auto-rows-fr sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              tag="div"
              delay={index * 90}
              className="group relative flex flex-col gap-4 border-t-[0.5px] border-steel bg-void px-6 py-14 transition-colors duration-500 first:border-t-0 hover:bg-ink sm:px-8 sm:nth-[-n+2]:border-t-0 sm:even:border-s-[0.5px] sm:border-s-steel lg:nth-[-n+4]:border-t-0 lg:not-nth-[4n+1]:border-s-[0.5px] lg:border-s-steel"
            >
              <div className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone transition-colors duration-500 group-hover:text-azure-glow">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                {stat.label}
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ash">
                {stat.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
