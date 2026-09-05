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

export type TeamCategory = { id: string; role: string; count: number };

export type AboutSettings = {
  eyebrow: string;
  title: string;
  lede: string;
  totalCount: number;
  totalLabel: string;
  managementTitle: string;
  managementBody: string;
  adminTitle: string;
  adminBody: string;
};

export type Founder = {
  eyebrow: string;
  title: string;
  name: string;
  role: string;
  quote: string;
  p1: string;
  p2: string;
  photo: string;
};

export type Certification = { id: string; number: string; title: string; description: string };
export type Client = { id: string; name: string; image: string };

export const getTeamCategories = cache(async function getTeamCategories(locale: Locale): Promise<TeamCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    role: locale === "ar" ? row.role_ar : row.role,
    count: row.count,
  }));
});

export const getAboutSettings = cache(async function getAboutSettings(locale: Locale): Promise<AboutSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("about_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  return {
    eyebrow: (ar ? s.eyebrow_ar : s.eyebrow) ?? "",
    title: (ar ? s.title_ar : s.title) ?? "",
    lede: (ar ? s.lede_ar : s.lede) ?? "",
    totalCount: s.total_count ?? 0,
    totalLabel: (ar ? s.total_label_ar : s.total_label) ?? "",
    managementTitle: (ar ? s.management_title_ar : s.management_title) ?? "",
    managementBody: (ar ? s.management_body_ar : s.management_body) ?? "",
    adminTitle: (ar ? s.admin_title_ar : s.admin_title) ?? "",
    adminBody: (ar ? s.admin_body_ar : s.admin_body) ?? "",
  };
});

export const getFounder = cache(async function getFounder(locale: Locale): Promise<Founder> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("founder").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const f = row ?? {};
  const ar = locale === "ar";
  return {
    eyebrow: (ar ? f.eyebrow_ar : f.eyebrow) ?? "",
    title: (ar ? f.title_ar : f.title) ?? "",
    name: (ar ? f.name_ar : f.name) ?? "",
    role: (ar ? f.role_ar : f.role) ?? "",
    quote: (ar ? f.quote_ar : f.quote) ?? "",
    p1: (ar ? f.p1_ar : f.p1) ?? "",
    p2: (ar ? f.p2_ar : f.p2) ?? "",
    photo: f.photo ?? "/images/work-img1.avif",
  };
});

export const getCertifications = cache(async function getCertifications(locale: Locale): Promise<Certification[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    number: row.number,
    title: locale === "ar" ? row.title_ar : row.title,
    description: locale === "ar" ? row.description_ar : row.description,
  }));
});

export const getClients = cache(async function getClients(): Promise<Client[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("clients").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({ id: row.id, name: row.name, image: row.image }));
});

export type AboutPageSettings = {
  hero: {
    eyebrow: string;
    title: string[];
    body: string;
    image: string;
    stats: { label: string; value: string }[];
  };
  expertise: { eyebrow: string; p1: string; p2: string; tags: string[] };
  journey: {
    eyebrow: string;
    title1: string;
    title2: string;
    lede: string;
    counterValue: number;
    counterLabel: string;
    cta: string;
  };
  why: { eyebrow: string; tagline: string; title: string; image: string };
  vision: { eyebrow: string; title: string; closing: string };
};

export const getAboutPageSettings = cache(async function getAboutPageSettings(
  locale: Locale,
): Promise<AboutPageSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("about_page_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);

  return {
    hero: {
      eyebrow: p("hero_eyebrow"),
      title: [p("hero_title1"), p("hero_title2"), p("hero_title3")],
      body: p("hero_body"),
      image: (s.hero_image as string) ?? "",
      stats: [1, 2, 3, 4].map((n) => ({ label: p(`hero_stat${n}_label`), value: p(`hero_stat${n}_value`) })),
    },
    expertise: {
      eyebrow: p("expertise_eyebrow"),
      p1: p("expertise_p1"),
      p2: p("expertise_p2"),
      tags: lines(p("expertise_tags")),
    },
    journey: {
      eyebrow: p("journey_eyebrow"),
      title1: p("journey_title1"),
      title2: p("journey_title2"),
      lede: p("journey_lede"),
      counterValue: (s.journey_counter_value as number) ?? 0,
      counterLabel: p("journey_counter_label"),
      cta: p("journey_cta"),
    },
    why: {
      eyebrow: p("why_eyebrow"),
      tagline: p("why_tagline"),
      title: p("why_title"),
      image: (s.why_image as string) ?? "",
    },
    vision: {
      eyebrow: p("vision_eyebrow"),
      title: p("vision_title"),
      closing: p("vision_closing"),
    },
  };
});

export type AboutMilestone = { year: string; title: string; description: string };

export const getAboutMilestones = cache(async function getAboutMilestones(locale: Locale): Promise<AboutMilestone[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("about_milestones").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    year: ar ? row.year_ar : row.year,
    title: ar ? row.title_ar : row.title,
    description: ar ? row.description_ar : row.description,
  }));
});

export type AboutVisionItem = { number: string; title: string; description: string };

export const getAboutVisionItems = cache(async function getAboutVisionItems(
  locale: Locale,
): Promise<AboutVisionItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("about_vision_items").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    number: row.number,
    title: ar ? row.title_ar : row.title,
    description: ar ? row.description_ar : row.description,
  }));
});
