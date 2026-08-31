"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/reveal";
import EditorialProjectCard from "@/components/projects/editorial-project-card";
import { projectCategories, projects } from "@/components/projects/data";

export default function ProjectsFilterableGrid() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const tablistRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  const updatePill = () => {
    const list = tablistRef.current;
    const button = buttonRefs.current[active];
    if (!list || !button) return;
    const listRect = list.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setPillStyle({ left: buttonRect.left - listRect.left, width: buttonRect.width });
  };

  useLayoutEffect(() => {
    updatePill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-20 sm:py-24 lg:py-28" aria-label="All projects">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col gap-5">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            The Archive
          </Reveal>

          <Reveal
            tag="h2"
            delay={80}
            className="max-w-3xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
          >
            Every project documented here.
          </Reveal>

          <Reveal tag="p" delay={140} className="max-w-2xl text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
            Filter by sector to browse completed construction projects in
            Jeddah and Makkah, from villa and residential complexes to
            commercial buildings and hospitality work. Each card opens a full
            case study with the scope, the site, the construction method, and
            photography of the delivered building.
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 border-b border-steel pb-9 sm:flex-row sm:items-end sm:justify-between">
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Filter projects by sector"
            className="relative -mx-1 flex flex-wrap gap-1.5 px-1"
          >
            {pillStyle ? (
              <span
                aria-hidden="true"
                className="absolute top-0 h-full rounded-full bg-azure transition-[left,width] duration-400 ease-out"
                style={{ left: pillStyle.left, width: pillStyle.width }}
              />
            ) : null}
            {projectCategories.map((category) => {
              const isActive = active === category;
              return (
                <button
                  key={category}
                  ref={(el) => {
                    buttonRefs.current[category] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(category)}
                  className={`group relative flex min-h-11 items-center gap-2.5 rounded-full border px-5 py-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                    isActive
                      ? "border-transparent text-white"
                      : "border-steel/80 text-dust hover:border-rebar hover:bg-slab/40 hover:text-bone"
                  }`}
                >
                  <span className="relative">{category}</span>
                  <span
                    className={`relative font-mono text-[9px] tabular-nums ${
                      isActive ? "text-white/75" : "text-dust/70"
                    }`}
                  >
                    {counts[category] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-dust">
            {filtered.length} of {projects.length} projects
          </p>
        </div>

        {filtered.length ? (
          <div key={active} className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project, index) => (
              <div
                key={project.slug}
                className="fade-up-in"
                style={{ animationDelay: `${(index % 3) * 70}ms` }}
              >
                <EditorialProjectCard project={project} rank={index} />
              </div>
            ))}
          </div>
        ) : (
          <p key={active} className="fade-up-in py-24 text-center font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-ash">
            No projects in this sector.
          </p>
        )}
      </div>
    </section>
  );
}
