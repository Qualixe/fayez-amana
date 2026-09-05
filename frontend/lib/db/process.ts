import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Stage, StageCategory, WorkflowPhase } from "@/lib/process-shared";
import type { Locale } from "@/lib/locale";

export {
  stageTitle,
  stageBody,
  categoryLabelText,
  categoryForStage,
  stageImages,
  type Stage,
  type StageCategory,
  type WorkflowPhase,
} from "@/lib/process-shared";

export const getStages = cache(async function getStages(): Promise<Stage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("process_stages").select("*").order("no", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    no: row.no,
    title: row.title,
    body: row.body,
    titleAr: row.title_ar,
    bodyAr: row.body_ar,
  }));
});

export const getStageCategories = cache(async function getStageCategories(): Promise<StageCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("process_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    key: row.key,
    label: row.label,
    labelAr: row.label_ar,
    from: row.from_stage,
    to: row.to_stage,
  }));
});

export const getWorkflowPhases = cache(async function getWorkflowPhases(): Promise<WorkflowPhase[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("process_phases")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    title: row.title,
    body: row.body,
    titleAr: row.title_ar,
    bodyAr: row.body_ar,
  }));
});

function pick(row: Record<string, unknown>, key: string, ar: boolean): string {
  const value = row[ar ? `${key}_ar` : key];
  return typeof value === "string" ? value : "";
}

export type ProcessPageSettings = {
  hero: {
    eyebrow: string;
    heading: string[];
    lede: string;
    image: string;
    meta: { label: string; value: string }[];
  };
  intro: { kicker: string; arabicLede: string; englishLede: string };
  finishing: { eyebrow: string; heading: string; body: string; cta: string; imageAlt: string };
};

export const getProcessPageSettings = cache(async function getProcessPageSettings(
  locale: Locale,
): Promise<ProcessPageSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("process_page_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);

  return {
    hero: {
      eyebrow: p("hero_eyebrow"),
      heading: [p("hero_heading1"), p("hero_heading2"), p("hero_heading3")],
      lede: p("hero_lede"),
      image: (s.hero_image as string) ?? "",
      meta: [1, 2, 3, 4].map((n) => ({ label: p(`hero_meta${n}_label`), value: p(`hero_meta${n}_value`) })),
    },
    intro: {
      kicker: (s.intro_kicker as string) ?? "",
      arabicLede: (s.intro_arabic_lede as string) ?? "",
      englishLede: (s.intro_english_lede as string) ?? "",
    },
    finishing: {
      eyebrow: p("finishing_eyebrow"),
      heading: p("finishing_heading"),
      body: p("finishing_body"),
      cta: p("finishing_cta"),
      imageAlt: p("finishing_image_alt"),
    },
  };
});
