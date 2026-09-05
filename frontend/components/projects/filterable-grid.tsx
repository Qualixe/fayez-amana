"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/reveal";
import EditorialProjectCard from "@/components/projects/editorial-project-card";
import { projectCategories, categoryLabel, type Project } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "The Archive",
    title: "Every project documented here.",
    lede: "Filter by sector to browse completed construction projects in Jeddah and Makkah, from villa and residential complexes to commercial buildings and hospitality work. Each card opens a full case study with the scope, the site, the construction method, and photography of the delivered building.",
    filterAria: "Filter projects by sector",
    ofProjects: (count: number, total: number) => `${count} of ${total} projects`,
    empty: "No projects in this sector.",
  },
  ar: {
    eyebrow: "الأرشيف",
    title: "كل مشروع موثّق هنا.",
    lede: "صفِّ حسب القطاع لتصفح المشاريع الإنشائية المنجزة في جدة ومكة، من المجمعات السكنية والفلل إلى المباني التجارية وأعمال الضيافة. كل بطاقة تفتح دراسة حالة كاملة بالنطاق والموقع وطريقة التنفيذ وصور المبنى المُسلَّم.",
    filterAria: "تصفية المشاريع حسب القطاع",
    ofProjects: (count: number, total: number) => `${count} من ${total} مشروعًا`,
    empty: "لا توجد مشاريع في هذا القطاع.",
  },
} as const;

export default function ProjectsFilterableGrid({ locale, projects }: { locale: Locale; projects: Project[] }) {
  const t = content[locale];
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const tablistRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; top: number; width: number; height: number } | null>(
    null,
  );

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [projects]);

  const updatePill = () => {
    const list = tablistRef.current;
    const button = buttonRefs.current[active];
    if (!list || !button) return;
    const listRect = list.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setPillStyle({
      left: buttonRect.left - listRect.left,
      top: buttonRect.top - listRect.top,
      width: buttonRect.width,
      height: buttonRect.height,
    });
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
            {t.eyebrow}
          </Reveal>

          <Reveal
            tag="h2"
            delay={80}
            className="max-w-3xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
          >
            {t.title}
          </Reveal>

          <Reveal tag="p" delay={140} className="max-w-2xl text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
            {t.lede}
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 border-b border-steel pb-9 sm:flex-row sm:items-end sm:justify-between">
          <div
            ref={tablistRef}
            role="tablist"
            aria-label={t.filterAria}
            className="relative -mx-1 flex flex-wrap gap-1.5 px-1"
          >
            {pillStyle ? (
              <span
                aria-hidden="true"
                className="absolute rounded-full bg-azure transition-[left,top,width,height] duration-400 ease-out"
                style={{
                  left: pillStyle.left,
                  top: pillStyle.top,
                  width: pillStyle.width,
                  height: pillStyle.height,
                }}
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
                  <span className="relative">{categoryLabel(category, locale)}</span>
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
            {t.ofProjects(filtered.length, projects.length)}
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
                <EditorialProjectCard project={project} rank={index} locale={locale} />
              </div>
            ))}
          </div>
        ) : (
          <p key={active} className="fade-up-in py-24 text-center font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-ash">
            {t.empty}
          </p>
        )}
      </div>
    </section>
  );
}
