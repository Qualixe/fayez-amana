import type { Locale } from "@/lib/locale";

export type Stage = { no: number; title: string; body: string; titleAr: string; bodyAr: string };

export function stageTitle(stage: Stage, locale: Locale) {
  return locale === "ar" ? stage.titleAr : stage.title;
}

export function stageBody(stage: Stage, locale: Locale) {
  return locale === "ar" ? stage.bodyAr : stage.body;
}

export type StageCategory = { key: string; label: string; labelAr: string; from: number; to: number };

export function categoryLabelText(category: StageCategory, locale: Locale) {
  return locale === "ar" ? category.labelAr : category.label;
}

export function categoryForStage(categories: StageCategory[], no: number) {
  return categories.find((c) => no >= c.from && no <= c.to);
}

export type WorkflowPhase = { title: string; body: string; titleAr: string; bodyAr: string };

export const stageImages = [
  "/images/work-img1.avif",
  "/images/work-img2.avif",
  "/images/work-img3.avif",
  "/images/work-img4.avif",
  "/images/work-img5.avif",
  "/images/work-img6.avif",
  "/images/work-img7.avif",
  "/images/work-img8.avif",
];
