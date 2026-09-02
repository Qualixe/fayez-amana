"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/reveal";
import { Project, galleryImages, localize } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Gallery",
    heading: ["The delivered", "project."],
    lede: (count: number, category: string) =>
      `${count} frames of the completed ${category.toLowerCase()} project. Select any image to view it full screen.`,
    close: "Close",
    prevImage: "Previous image",
    nextImage: "Next image",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    image: (index: number) => `Image ${index}`,
  },
  ar: {
    eyebrow: "معرض الصور",
    heading: ["المشروع", "بعد التسليم."],
    lede: (count: number, category: string) =>
      `${count} صورة من المشروع المكتمل في قطاع ${category}. اختر أي صورة لعرضها بملء الشاشة.`,
    close: "إغلاق",
    prevImage: "الصورة السابقة",
    nextImage: "الصورة التالية",
    zoomOut: "تصغير",
    zoomIn: "تكبير",
    image: (index: number) => `صورة ${index}`,
  },
} as const;

const TILE_PATTERN = [
  "col-span-2 row-span-2",
  "",
  "row-span-2",
  "",
  "col-span-2",
  "",
  "row-span-2",
  "",
  "col-span-2 row-span-2",
  "",
];

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const ZOOM_STEP = 0.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ProjectDetailGallery({ project, locale }: { project: Project; locale: Locale }) {
  const t = content[locale];
  const p = localize(project, locale);
  const images = galleryImages(project, 10);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ moved: false, startX: 0, startY: 0, panX: 0, panY: 0 });

  const openAt = (index: number) => {
    setOpenIndex(index);
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const resetZoom = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const zoomBy = (delta: number) => {
    setScale((s) => {
      const next = clamp(Math.round((s + delta) * 100) / 100, MIN_SCALE, MAX_SCALE);
      if (next === MIN_SCALE) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      if (e.key === "+" || e.key === "=") zoomBy(ZOOM_STEP);
      if (e.key === "-") zoomBy(-ZOOM_STEP);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length]);

  const onImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dragState.current.moved) return;
    if (scale === MIN_SCALE) {
      setScale(2);
    } else {
      resetZoom();
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    zoomBy(e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (scale === MIN_SCALE) return;
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = { moved: false, startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragState.current.moved = true;
    setPan({ x: dragState.current.panX + dx, y: dragState.current.panY + dy });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!isDragging) return;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
    // Defer clearing "moved" so the trailing click event (fired right after pointerup) still sees it.
    setTimeout(() => {
      dragState.current.moved = false;
    }, 0);
  };

  return (
    <section className="border-b border-steel py-20 sm:py-28">
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
          className="mt-6 max-w-2xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
        >
          {t.heading[0]}
          <br />
          {t.heading[1]}
        </Reveal>

        <Reveal tag="p" delay={140} className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
          {t.lede(images.length, p.category)}
        </Reveal>

        <div className="mt-12 grid grid-flow-row-dense grid-cols-2 auto-rows-[140px] gap-3 sm:grid-cols-3 sm:auto-rows-[160px] lg:grid-cols-4 lg:auto-rows-[180px]">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => openAt(index)}
              className={`group relative overflow-hidden bg-slab ${TILE_PATTERN[index % TILE_PATTERN.length]}`}
            >
              <img
                src={image}
                alt={`${p.title}, ${t.image(index + 1)}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-void/0 transition-colors duration-500 group-hover:bg-void/20"
              />
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-200 flex items-center justify-center overflow-hidden bg-void/95 p-6 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
          onWheel={onWheel}
        >
          <button
            type="button"
            aria-label={t.close}
            onClick={() => setOpenIndex(null)}
            className="absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center border border-steel text-bone transition-colors duration-300 hover:border-azure hover:text-azure-glow"
          >
            <span className="relative block h-4 w-4">
              <span className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>

          {scale === MIN_SCALE ? (
            <button
              type="button"
              aria-label={t.prevImage}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
              }}
              className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-steel text-bone transition-colors duration-300 hover:border-azure hover:text-azure-glow sm:left-8"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          ) : null}

          <img
            src={images[openIndex]}
            alt={`${p.title}, ${t.image(openIndex + 1)}`}
            onClick={onImageClick}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onDoubleClick={(e) => e.stopPropagation()}
            draggable={false}
            className={`max-h-[85vh] max-w-[90vw] touch-none select-none object-contain transition-transform duration-200 ease-out ${
              scale === MIN_SCALE ? "cursor-zoom-in" : isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
          />

          {scale === MIN_SCALE ? (
            <button
              type="button"
              aria-label={t.nextImage}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
              }}
              className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-steel text-bone transition-colors duration-300 hover:border-azure hover:text-azure-glow sm:right-8"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          ) : null}

          <div
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-dust">
              {String(openIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>

            <span aria-hidden="true" className="h-3 w-px bg-steel" />

            <button
              type="button"
              aria-label={t.zoomOut}
              onClick={() => zoomBy(-ZOOM_STEP)}
              disabled={scale <= MIN_SCALE}
              className="grid h-8 w-8 place-items-center border border-steel text-bone transition-colors duration-300 hover:border-azure hover:text-azure-glow disabled:opacity-30 disabled:hover:border-steel disabled:hover:text-bone"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14" />
              </svg>
            </button>

            <button
              type="button"
              onClick={resetZoom}
              disabled={scale === MIN_SCALE}
              className="min-w-[3.5ch] font-mono text-[0.6875rem] tabular-nums text-dust transition-colors duration-300 hover:text-azure-glow disabled:cursor-default disabled:hover:text-dust"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              type="button"
              aria-label={t.zoomIn}
              onClick={() => zoomBy(ZOOM_STEP)}
              disabled={scale >= MAX_SCALE}
              className="grid h-8 w-8 place-items-center border border-steel text-bone transition-colors duration-300 hover:border-azure hover:text-azure-glow disabled:opacity-30 disabled:hover:border-steel disabled:hover:text-bone"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
