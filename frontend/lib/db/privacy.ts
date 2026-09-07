import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";

function pick(row: Record<string, unknown>, key: string, ar: boolean): string {
  const value = row[ar ? `${key}_ar` : key];
  return typeof value === "string" ? value : "";
}

export type PrivacyPageSettings = {
  eyebrow: string;
  heading: string;
  intro: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  footerNote: string;
  tocLabel: string;
  contactHeading: string;
};

export const getPrivacyPageSettings = cache(async function getPrivacyPageSettings(
  locale: Locale,
): Promise<PrivacyPageSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("privacy_page_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);

  return {
    eyebrow: p("eyebrow"),
    heading: p("heading"),
    intro: p("intro"),
    lastUpdated: p("last_updated"),
    lastUpdatedLabel: p("last_updated_label"),
    footerNote: p("footer_note"),
    tocLabel: p("toc_label"),
    contactHeading: p("contact_heading"),
  };
});

export type PrivacySection = {
  id: string;
  title: string;
  body: string;
};

export const getPrivacySections = cache(async function getPrivacySections(locale: Locale): Promise<PrivacySection[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("privacy_page_sections").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    id: row.id as string,
    title: ar ? (row.title_ar as string) : (row.title as string),
    body: ar ? (row.body_ar as string) : (row.body as string),
  }));
});
