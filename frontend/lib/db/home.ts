import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";

function pick(row: Record<string, unknown>, key: string, ar: boolean): string {
  const value = row[ar ? `${key}_ar` : key];
  return typeof value === "string" ? value : "";
}

function lines(value: string): string[] {
  return value.split("\n").map((l) => l.trim()).filter(Boolean);
}

export type HomeSettings = {
  hero: {
    brandLine1: string;
    brandLine2: string;
    video: string;
    eyebrow: string;
    quote: string;
    services: string[];
    startProject: string;
    viewPortfolio: string;
    handoverLabel: string;
    handoverTitle1: string;
    handoverTitle2: string;
    handoverBody: string;
    scrollHint: string;
  };
  about: {
    eyebrow: string;
    title: string[];
    body: string;
    image: string;
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    ourStory: string;
    expertiseEyebrow: string;
    expertiseP1: string;
    expertiseP2: string;
    expertiseTags: string[];
  };
  services: {
    eyebrow: string;
    title1: string;
    title2: string;
    lede: string;
    note: string;
    explore: string;
  };
  work: {
    eyebrow: string;
    title1: string;
    title2: string;
    lede: string;
    allProjects: string;
    viewProject: string;
  };
  clients: {
    eyebrow: string;
    title1: string;
    title2: string;
    lede: string;
    marquee: string[];
  };
  process: {
    eyebrow: string;
    title1: string;
    title2: string;
    lede: string;
    cta: string;
  };
};

export const getHomeSettings = cache(async function getHomeSettings(locale: Locale): Promise<HomeSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("home_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);

  return {
    hero: {
      brandLine1: p("hero_brand_line1"),
      brandLine2: p("hero_brand_line2"),
      video: (s.hero_video as string) ?? "",
      eyebrow: p("hero_eyebrow"),
      quote: p("hero_quote"),
      services: lines(p("hero_services")),
      startProject: p("hero_start_project"),
      viewPortfolio: p("hero_view_portfolio"),
      handoverLabel: p("hero_handover_label"),
      handoverTitle1: p("hero_handover_title1"),
      handoverTitle2: p("hero_handover_title2"),
      handoverBody: p("hero_handover_body"),
      scrollHint: p("hero_scroll_hint"),
    },
    about: {
      eyebrow: p("about_eyebrow"),
      title: lines(p("about_title")),
      body: p("about_body"),
      image: (s.about_image as string) ?? "",
      stat1: { value: (s.about_stat1_value as string) ?? "", label: p("about_stat1_label") },
      stat2: { value: (s.about_stat2_value as string) ?? "", label: p("about_stat2_label") },
      ourStory: p("about_our_story"),
      expertiseEyebrow: p("about_expertise_eyebrow"),
      expertiseP1: p("about_expertise_p1"),
      expertiseP2: p("about_expertise_p2"),
      expertiseTags: lines(p("about_expertise_tags")),
    },
    services: {
      eyebrow: p("services_eyebrow"),
      title1: p("services_title1"),
      title2: p("services_title2"),
      lede: p("services_lede"),
      note: p("services_note"),
      explore: p("services_explore"),
    },
    work: {
      eyebrow: p("work_eyebrow"),
      title1: p("work_title1"),
      title2: p("work_title2"),
      lede: p("work_lede"),
      allProjects: p("work_all_projects"),
      viewProject: p("work_view_project"),
    },
    clients: {
      eyebrow: p("clients_eyebrow"),
      title1: p("clients_title1"),
      title2: p("clients_title2"),
      lede: p("clients_lede"),
      marquee: lines(p("clients_marquee")),
    },
    process: {
      eyebrow: p("process_eyebrow"),
      title1: p("process_title1"),
      title2: p("process_title2"),
      lede: p("process_lede"),
      cta: p("process_cta"),
    },
  };
});

export type HeroStage = { code: string; title: string; detail: string; period: string };

export const getHeroStages = cache(async function getHeroStages(locale: Locale): Promise<HeroStage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("home_hero_stages")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    code: row.code,
    title: ar ? row.title_ar : row.title,
    detail: ar ? row.detail_ar : row.detail,
    period: ar ? row.period_ar : row.period,
  }));
});

export type HomeStat = { value: number; suffix: string; label: string; description: string };

export const getHomeStats = cache(async function getHomeStats(locale: Locale): Promise<HomeStat[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("home_stats").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    value: row.value,
    suffix: row.suffix,
    label: ar ? row.label_ar : row.label,
    description: ar ? row.description_ar : row.description,
  }));
});

export type Highlight = { title: string; description: string };

export const getHomeHighlights = cache(async function getHomeHighlights(locale: Locale): Promise<Highlight[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("home_highlights").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    title: ar ? row.title_ar : row.title,
    description: ar ? row.description_ar : row.description,
  }));
});

export type CoreValue = { id: string; letter: string; title: string; description: string };

export const getCoreValues = cache(async function getCoreValues(locale: Locale): Promise<CoreValue[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("core_values").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    id: row.id,
    letter: row.letter,
    title: ar ? row.title_ar : row.title,
    description: ar ? row.description_ar : row.description,
  }));
});

export type CoreValuesSettings = { eyebrow: string; title: string; lede: string; closing: string };

export const getCoreValuesSettings = cache(async function getCoreValuesSettings(
  locale: Locale,
): Promise<CoreValuesSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("core_values_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  return {
    eyebrow: pick(s, "eyebrow", ar),
    title: pick(s, "title", ar),
    lede: pick(s, "lede", ar),
    closing: pick(s, "closing", ar),
  };
});
