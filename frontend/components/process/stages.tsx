"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/reveal";
import { stages, categoryForStage, stageImages } from "@/components/process/data";

export default function ProcessStages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.stageIndex);
          if (!Number.isNaN(index)) setActiveIndex(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const el of itemRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const activeStage = stages[activeIndex];
  const activeCategory = categoryForStage(activeStage.no);
  const activeImage = stageImages[activeIndex % stageImages.length];

  return (
    <section className="border-b border-steel py-20 sm:py-28">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <Reveal
          tag="p"
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
        >
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          Structural (Shell) Programme
        </Reveal>

        <Reveal
          tag="h2"
          delay={80}
          className="mt-6 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
        >
          Stage by
          <br />
          stage.
        </Reveal>

        <Reveal tag="p" delay={140} className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
          The original Arabic method statement from the company profile,
          set alongside its English rendering. Scroll to advance the
          sequence.
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="relative aspect-[4/5] overflow-hidden bg-slab">
              <img
                key={activeImage}
                src={activeImage}
                alt={`Stage ${activeStage.no}, ${activeStage.title}`}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent"
              />
              <div
                aria-hidden="true"
                className="blueprint-grid absolute inset-0 opacity-15"
              />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                  Stage {String(activeStage.no).padStart(2, "0")} / 21
                  {activeCategory ? (
                    <span className="text-dust"> &middot; {activeCategory.label}</span>
                  ) : null}
                </span>
                <h3 className="mt-3 text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                  {activeStage.title}
                </h3>
              </div>
              <div className="absolute inset-y-0 right-0 flex w-1 flex-col gap-px">
                {stages.map((stage, index) => (
                  <span
                    key={stage.no}
                    className={`flex-1 transition-colors duration-500 ${
                      index <= activeIndex ? "bg-azure" : "bg-steel/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
              <span>Structural method statement</span>
              <span className="tabular-nums text-bone">
                {String(activeIndex + 1).padStart(2, "0")} / 21
              </span>
            </div>
          </div>

          <ol className="flex flex-col">
            {stages.map((stage, index) => {
              const category = categoryForStage(stage.no);
              const showCategory = category?.from === stage.no;
              const isActive = index === activeIndex;

              return (
                <li
                  key={stage.no}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  data-stage-index={index}
                  className={`grid gap-5 border-t border-steel py-10 transition-opacity duration-700 last:border-b ${
                    isActive ? "opacity-100" : "opacity-45"
                  }`}
                >
                  {showCategory ? (
                    <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
                      <span aria-hidden="true" className="h-px w-6 bg-azure-glow/60" />
                      {category.label}
                      <span className="text-ash">
                        {String(category.from).padStart(2, "0")}
                        {category.to !== category.from ? `–${String(category.to).padStart(2, "0")}` : ""}
                      </span>
                    </p>
                  ) : null}

                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-[0.6875rem] uppercase tracking-[0.22em] transition-colors duration-500 ${
                        isActive ? "text-azure-glow" : "text-ash"
                      }`}
                    >
                      {String(stage.no).padStart(2, "0")}
                    </span>
                    <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
                      {stage.title}
                    </h3>
                  </div>

                  <p className="max-w-xl border-s border-steel ps-5 text-[0.9875rem] leading-[1.72] tracking-[-0.004em] text-dust">
                    {stage.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
