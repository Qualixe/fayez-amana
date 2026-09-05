import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";

function pick(row: Record<string, unknown>, key: string, ar: boolean): string {
  const value = row[ar ? `${key}_ar` : key];
  return typeof value === "string" ? value : "";
}

export type SiteCtaSettings = {
  eyebrow: string;
  title1: string;
  title2: string;
  lede: string;
  startProject: string;
  backgroundImage: string;
};

export const getSiteCtaSettings = cache(async function getSiteCtaSettings(locale: Locale): Promise<SiteCtaSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("site_cta_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);

  return {
    eyebrow: p("eyebrow"),
    title1: p("title1"),
    title2: p("title2"),
    lede: p("lede"),
    startProject: p("start_project"),
    backgroundImage: (s.background_image as string) ?? "",
  };
});
