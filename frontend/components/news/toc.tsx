"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { ArticleBlock } from "@/lib/db/news";
import { slugify } from "@/lib/news-shared";

const TOC_LABEL = { en: "On this page", ar: "في هذه الصفحة" };

export default function TableOfContents({ blocks, locale }: { blocks: ArticleBlock[]; locale: "en" | "ar" }) {
  const headings = blocks.filter((b): b is Extract<ArticleBlock, { type: "heading" }> => b.type === "heading");
  const ids = headings.map((h) => slugify(h.text));
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0, ready: false });
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    if (!ids.length) return;
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  useEffect(() => {
    function measure() {
      if (!activeId) return;
      const el = itemRefs.current[activeId];
      if (el) setIndicator({ top: el.offsetTop, height: el.offsetHeight, ready: true });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeId]);

  if (headings.length < 3) return null;

  function handleClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <nav aria-label={TOC_LABEL[locale]} className="flex flex-col gap-4">
      <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-azure-glow">{TOC_LABEL[locale]}</h2>
      <ul ref={listRef} className="relative flex flex-col gap-1 border-s border-steel">
        <span
          aria-hidden="true"
          className={`absolute start-0 w-0.5 bg-azure transition-[transform,height] duration-300 ease-out ${
            indicator.ready ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `translateY(${indicator.top}px)`, height: `${indicator.height}px` }}
        />
        {headings.map((h) => {
          const id = slugify(h.text);
          const isActive = activeId === id;
          return (
            <li key={id} ref={(el) => { itemRefs.current[id] = el; }}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block py-2 pe-2 ps-5 text-[0.9375rem] leading-snug transition-colors duration-300 ${
                  isActive ? "text-bone" : "text-dust hover:text-bone"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
