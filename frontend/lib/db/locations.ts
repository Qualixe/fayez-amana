import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";

export type LocationSlug = "jeddah" | "makkah";

export const LOCATION_SLUGS: LocationSlug[] = ["jeddah", "makkah"];

function pick(row: Record<string, unknown>, key: string, ar: boolean): string {
  const value = row[ar ? `${key}_ar` : key];
  return typeof value === "string" ? value : "";
}

export type LocationPage = {
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    lede: string;
    image: string;
    meta: { label: string; value: string }[];
  };
  body: { eyebrow: string; title: string; p1: string; p2: string };
  projects: { eyebrow: string; title: string };
  seo: { title: string; description: string };
};

export const getLocationPage = cache(async function getLocationPage(
  slug: LocationSlug,
  locale: Locale,
): Promise<LocationPage> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("location_pages").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);

  return {
    hero: {
      eyebrow: p("hero_eyebrow"),
      title1: p("hero_title1"),
      title2: p("hero_title2"),
      lede: p("hero_lede"),
      image: (s.hero_image as string) ?? "",
      meta: [1, 2, 3].map((n) => ({ label: p(`meta${n}_label`), value: p(`meta${n}_value`) })),
    },
    body: {
      eyebrow: p("body_eyebrow"),
      title: p("body_title"),
      p1: p("body_p1"),
      p2: p("body_p2"),
    },
    projects: {
      eyebrow: p("projects_eyebrow"),
      title: p("projects_title"),
    },
    seo: {
      title: p("seo_title"),
      description: p("seo_description"),
    },
  };
});
