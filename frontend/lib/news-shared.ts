// Pure types/helpers for the News feature, with NO server-only imports
// (no next/headers, no Supabase client) — safe to import from Client
// Components. The actual data-fetching lives in lib/db/news.ts.
import type { Locale } from "@/lib/locale";
import type { Service } from "@/lib/db/services";
import type { Project } from "@/components/projects/data";

export const NEWS_CATEGORIES = ["Construction Guides", "Industry Insights", "Case Studies", "Company News"] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

const CATEGORY_LABELS_AR: Record<NewsCategory, string> = {
  "Construction Guides": "أدلة إنشائية",
  "Industry Insights": "رؤى القطاع",
  "Case Studies": "دراسات حالة",
  "Company News": "أخبار الشركة",
};

export function categoryLabel(category: string, locale: Locale): string {
  if (locale === "ar") return CATEGORY_LABELS_AR[category as NewsCategory] ?? category;
  return category;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type NewsPageSettings = {
  hero: { eyebrow: string; title1: string; title2: string; lede: string; image: string };
  meta: { author: string; languages: string };
  seo: { title: string; description: string };
};

export type ArticleSummary = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
  featured: boolean;
  image: string;
};

export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "callout"; title: string; body: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "process_stages" };

export type ArticleFaq = { id: string; question: string; answer: string };

export type ArticleDetail = ArticleSummary & {
  blocks: ArticleBlock[];
  faqs: ArticleFaq[];
  relatedServices: Service[];
  relatedProjects: Project[];
};
