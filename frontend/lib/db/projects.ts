import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectCategory } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

function pick(row: Record<string, unknown>, key: string, ar: boolean): string {
  const value = row[ar ? `${key}_ar` : key];
  return typeof value === "string" ? value : "";
}

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  display_title: string[];
  category: ProjectCategory;
  subtitle: string;
  teaser: string;
  description: string;
  client: string | null;
  location: string;
  scope: string;
  size: string | null;
  image: string;
  featured: boolean;
  title_ar: string | null;
  display_title_ar: string[] | null;
  subtitle_ar: string | null;
  teaser_ar: string | null;
  description_ar: string | null;
  client_ar: string | null;
  location_ar: string | null;
  scope_ar: string | null;
  size_ar: string | null;
};

function rowToProject(row: ProjectRow, gallery?: string[]): Project {
  return {
    slug: row.slug,
    title: row.title,
    displayTitle: row.display_title,
    category: row.category,
    subtitle: row.subtitle,
    teaser: row.teaser,
    description: row.description,
    client: row.client ?? undefined,
    location: row.location,
    scope: row.scope,
    size: row.size ?? undefined,
    image: row.image,
    featured: row.featured,
    gallery,
    ar: {
      title: row.title_ar ?? row.title,
      displayTitle: row.display_title_ar ?? row.display_title,
      subtitle: row.subtitle_ar ?? row.subtitle,
      teaser: row.teaser_ar ?? row.teaser,
      description: row.description_ar ?? row.description,
      client: row.client_ar ?? undefined,
      location: row.location_ar ?? row.location,
      scope: row.scope_ar ?? row.scope,
      size: row.size_ar ?? undefined,
    },
  };
}

export const getAllProjects = cache(async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => rowToProject(row as ProjectRow));
});

export async function getProject(slug: string): Promise<Project | undefined> {
  const supabase = await createClient();
  const { data: row, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!row) return undefined;

  const { data: images } = await supabase
    .from("project_images")
    .select("url")
    .eq("project_id", row.id)
    .order("sort_order", { ascending: true });

  return rowToProject(row as ProjectRow, images?.map((i) => i.url));
}

export async function adjacentProjects(slug: string) {
  const all = await getAllProjects();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];
  return { prev, next };
}

export async function spotlightProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.featured);
  const seen = new Set<string>();
  const distinct = featured.filter((p) => {
    if (seen.has(p.category)) return false;
    seen.add(p.category);
    return true;
  });
  const rest = featured.filter((p) => !distinct.includes(p));
  return [...distinct, ...rest].slice(0, 3);
}

export type ProjectsPageSettings = {
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    lede: string;
    image: string;
    meta: { label: string; value: string }[];
  };
  summary: {
    eyebrow: string;
    body: string;
    quickLinks: { label: string; href: string }[];
    stats: { label: string; value: string }[];
  };
  sectors: { heading: string; list: string[] };
  spotlight: { eyebrow: string; title: string; lede: string };
};

export const getProjectsPageSettings = cache(async function getProjectsPageSettings(
  locale: Locale,
): Promise<ProjectsPageSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("projects_page_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);
  const lines = (value: string) => value.split("\n").map((l) => l.trim()).filter(Boolean);

  return {
    hero: {
      eyebrow: p("hero_eyebrow"),
      title1: p("hero_title1"),
      title2: p("hero_title2"),
      lede: p("hero_lede"),
      image: (s.hero_image as string) ?? "",
      meta: [1, 2, 3, 4].map((n) => ({ label: p(`hero_meta${n}_label`), value: p(`hero_meta${n}_value`) })),
    },
    summary: {
      eyebrow: p("summary_eyebrow"),
      body: p("summary_body"),
      quickLinks: [1, 2, 3, 4]
        .map((n) => ({ label: p(`summary_link${n}_label`), href: (s[`summary_link${n}_href`] as string) ?? "" }))
        .filter((link) => link.label && link.href),
      stats: [1, 2, 3, 4].map((n) => ({
        label: p(`summary_stat${n}_label`),
        value: p(`summary_stat${n}_value`),
      })),
    },
    sectors: {
      heading: p("sectors_heading"),
      list: lines(p("sectors_list")),
    },
    spotlight: {
      eyebrow: p("spotlight_eyebrow"),
      title: p("spotlight_title"),
      lede: p("spotlight_lede"),
    },
  };
});

export type ProjectDetailSettings = {
  method: { eyebrow: string; heading: string[]; lede: string };
};

export const getProjectDetailSettings = cache(async function getProjectDetailSettings(
  locale: Locale,
): Promise<ProjectDetailSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("project_detail_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);

  return {
    method: {
      eyebrow: p("method_eyebrow"),
      heading: [p("method_heading1"), p("method_heading2")],
      lede: p("method_lede"),
    },
  };
});

export type MethodArticle = { number: string; title: string; body: string; href: string; label: string };

export const getMethodArticles = cache(async function getMethodArticles(locale: Locale): Promise<MethodArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_detail_method_articles")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    number: row.number,
    title: ar ? row.title_ar : row.title,
    body: ar ? row.body_ar : row.body,
    href: row.href,
    label: ar ? row.label_ar : row.label,
  }));
});
