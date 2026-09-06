import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";
import type { Service } from "@/lib/db/services";
import type { Project } from "@/components/projects/data";
import type { NewsPageSettings, ArticleSummary, ArticleBlock, ArticleFaq, ArticleDetail } from "@/lib/news-shared";

export { NEWS_CATEGORIES, categoryLabel, type NewsCategory } from "@/lib/news-shared";
export type { NewsPageSettings, ArticleSummary, ArticleBlock, ArticleFaq, ArticleDetail } from "@/lib/news-shared";

function pick(row: Record<string, unknown>, key: string, ar: boolean): string {
  const value = row[ar ? `${key}_ar` : key];
  return typeof value === "string" ? value : "";
}

function lines(value: string): string[] {
  return value.split("\n").map((l) => l.trim()).filter(Boolean);
}

export const getNewsPageSettings = cache(async function getNewsPageSettings(locale: Locale): Promise<NewsPageSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("news_page_settings").select("*").eq("id", 1).maybeSingle();
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
    },
    meta: { author: p("meta_author"), languages: p("meta_languages") },
    seo: { title: p("seo_title"), description: p("seo_description") },
  };
});

type ArticleRow = {
  id: string;
  slug: string;
  category: string;
  title: string;
  title_ar: string;
  excerpt: string;
  excerpt_ar: string;
  author: string;
  author_ar: string;
  read_minutes: number;
  published_at: string;
  featured: boolean;
  image: string;
};

function rowToSummary(row: ArticleRow, locale: Locale): ArticleSummary {
  const ar = locale === "ar";
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: ar ? row.title_ar : row.title,
    excerpt: ar ? row.excerpt_ar : row.excerpt,
    author: ar ? row.author_ar : row.author,
    readMinutes: row.read_minutes,
    publishedAt: row.published_at,
    featured: row.featured,
    image: row.image,
  };
}

export const getAllArticles = cache(async function getAllArticles(locale: Locale): Promise<ArticleSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .order("published_at", { ascending: false })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => rowToSummary(row as ArticleRow, locale));
});

function rowToBlock(row: Record<string, unknown>, ar: boolean): ArticleBlock | null {
  const p = (key: string) => pick(row, key, ar);
  switch (row.block_type as string) {
    case "heading":
      return { type: "heading", text: p("heading") };
    case "paragraph":
      return { type: "paragraph", text: p("body") };
    case "bullets":
      return { type: "bullets", items: lines(p("body")) };
    case "steps":
      return {
        type: "steps",
        items: lines(p("body")).map((line) => {
          const [title, ...rest] = line.split("|||");
          return { title: title.trim(), body: rest.join("|||").trim() };
        }),
      };
    case "callout":
      return { type: "callout", title: p("callout_title"), body: p("body") };
    case "table": {
      const headers = p("table_headers").split("|").map((h) => h.trim()).filter(Boolean);
      const rows = lines(p("table_rows")).map((line) => line.split("|").map((c) => c.trim()));
      return { type: "table", headers, rows };
    }
    case "process_stages":
      return { type: "process_stages" };
    default:
      return null;
  }
}

export const getArticle = cache(async function getArticle(slug: string, locale: Locale): Promise<ArticleDetail | undefined> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("news_articles").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  if (!row) return undefined;

  const ar = locale === "ar";

  const [blocksRes, faqsRes, relatedServicesRes, relatedProjectsRes] = await Promise.all([
    supabase.from("news_article_blocks").select("*").eq("article_id", row.id).order("sort_order", { ascending: true }),
    supabase.from("news_article_faqs").select("*").eq("article_id", row.id).order("sort_order", { ascending: true }),
    supabase
      .from("news_article_related_services")
      .select("sort_order, services(*, service_gallery(sort_order, projects(slug, title, title_ar, image)))")
      .eq("article_id", row.id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("news_article_related_projects")
      .select("sort_order, projects(*)")
      .eq("article_id", row.id)
      .order("sort_order", { ascending: true }),
  ]);

  const blocks = (blocksRes.data ?? [])
    .map((b) => rowToBlock(b as Record<string, unknown>, ar))
    .filter((b): b is ArticleBlock => b !== null);

  const faqs: ArticleFaq[] = (faqsRes.data ?? []).map((f) => ({
    id: f.id,
    question: ar ? f.question_ar : f.question,
    answer: ar ? f.answer_ar : f.answer,
  }));

  const relatedServices: Service[] = (relatedServicesRes.data ?? [])
    .map((r) => r.services as unknown)
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => {
      const svc = s as {
        id: string;
        slug: string;
        number: string;
        title: string;
        title_ar: string;
        description: string;
        description_ar: string;
        capabilities: string[];
        capabilities_ar: string[];
        image: string;
      };
      return {
        id: svc.id,
        slug: svc.slug,
        number: svc.number,
        title: ar ? svc.title_ar : svc.title,
        description: ar ? svc.description_ar : svc.description,
        capabilities: ar ? svc.capabilities_ar : svc.capabilities,
        image: svc.image,
        gallery: [],
      };
    });

  const relatedProjects: Project[] = (relatedProjectsRes.data ?? [])
    .map((r) => r.projects as unknown)
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => {
      const proj = p as {
        slug: string;
        title: string;
        display_title: string[];
        category: Project["category"];
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
      return {
        slug: proj.slug,
        title: proj.title,
        displayTitle: proj.display_title,
        category: proj.category,
        subtitle: proj.subtitle,
        teaser: proj.teaser,
        description: proj.description,
        client: proj.client ?? undefined,
        location: proj.location,
        scope: proj.scope,
        size: proj.size ?? undefined,
        image: proj.image,
        featured: proj.featured,
        ar: {
          title: proj.title_ar ?? proj.title,
          displayTitle: proj.display_title_ar ?? proj.display_title,
          subtitle: proj.subtitle_ar ?? proj.subtitle,
          teaser: proj.teaser_ar ?? proj.teaser,
          description: proj.description_ar ?? proj.description,
          client: proj.client_ar ?? undefined,
          location: proj.location_ar ?? proj.location,
          scope: proj.scope_ar ?? proj.scope,
          size: proj.size_ar ?? undefined,
        },
      };
    });

  return {
    ...rowToSummary(row as ArticleRow, locale),
    blocks,
    faqs,
    relatedServices,
    relatedProjects,
  };
});

export async function adjacentArticles(slug: string, locale: Locale) {
  const all = await getAllArticles(locale);
  const index = all.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined, more: [] as ArticleSummary[] };
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];
  const more = all.filter((_, i) => i !== index).slice(0, 2);
  return { prev, next, more };
}
