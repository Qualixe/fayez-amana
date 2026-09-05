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

function lines(value: string): string[] {
  return value.split("\n").map((l) => l.trim()).filter(Boolean);
}

export type SiteSettings = {
  headerLogo: string;
  footerLogo: string;
  footerQuote: string;
  footerEstLine: string;
  footerMarquee: string[];
};

export const getSiteSettings = cache(async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);

  return {
    headerLogo: (s.header_logo as string) ?? "",
    footerLogo: (s.footer_logo as string) ?? "",
    footerQuote: p("footer_quote"),
    footerEstLine: p("footer_est_line"),
    footerMarquee: lines(p("footer_marquee")),
  };
});

export type NavLink = { label: string; href: string; showInPrimaryNav: boolean };

export const getNavLinks = cache(async function getNavLinks(locale: Locale): Promise<NavLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_nav_links").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    label: ar ? row.label_ar : row.label,
    href: row.href,
    showInPrimaryNav: row.show_in_primary_nav,
  }));
});
