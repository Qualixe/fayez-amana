"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NEWS_CATEGORIES } from "@/lib/db/news";

function revalidateAll(slug?: string) {
  revalidatePath("/admin/news/articles");
  revalidatePath("/news");
  if (slug) revalidatePath(`/news/${slug}`);
}

export async function createArticle(formData: FormData) {
  const supabase = await createClient();
  const slug = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? NEWS_CATEGORIES[0]);

  const { data, error } = await supabase
    .from("news_articles")
    .insert({
      slug,
      category,
      title: slug,
      title_ar: slug,
      excerpt: "",
      excerpt_ar: "",
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  revalidateAll();
  redirect(`/admin/news/articles/${data.id}`);
}

export async function deleteArticle(id: string, slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("news_articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll(slug);
}

const MAX_BLOCKS = 24;
const MAX_FAQS = 8;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveArticle(id: string, formData: FormData) {
  const supabase = await createClient();

  const core = {
    slug: str(formData, "slug"),
    category: str(formData, "category"),
    title: str(formData, "title"),
    title_ar: str(formData, "title_ar"),
    excerpt: str(formData, "excerpt"),
    excerpt_ar: str(formData, "excerpt_ar"),
    author: str(formData, "author"),
    author_ar: str(formData, "author_ar"),
    read_minutes: Number(formData.get("read_minutes") ?? 5) || 5,
    published_at: str(formData, "published_at") || new Date().toISOString().slice(0, 10),
    featured: formData.get("featured") === "on",
    image: str(formData, "image"),
  };

  const { error: articleError } = await supabase.from("news_articles").update(core).eq("id", id);
  if (articleError) throw new Error(articleError.message);

  const blocks: Record<string, unknown>[] = [];
  for (let n = 1; n <= MAX_BLOCKS; n += 1) {
    const blockType = str(formData, `block${n}_type`);
    if (!blockType) continue;
    const heading = str(formData, `block${n}_heading`);
    const body = str(formData, `block${n}_body`);
    const calloutTitle = str(formData, `block${n}_callout_title`);
    const tableHeaders = str(formData, `block${n}_table_headers`);
    const tableRows = str(formData, `block${n}_table_rows`);
    if (!heading && !body && !calloutTitle && !tableHeaders && !tableRows) continue;

    blocks.push({
      article_id: id,
      block_type: blockType,
      heading,
      heading_ar: str(formData, `block${n}_heading_ar`),
      body,
      body_ar: str(formData, `block${n}_body_ar`),
      callout_title: calloutTitle,
      callout_title_ar: str(formData, `block${n}_callout_title_ar`),
      table_headers: tableHeaders,
      table_headers_ar: str(formData, `block${n}_table_headers_ar`),
      table_rows: tableRows,
      table_rows_ar: str(formData, `block${n}_table_rows_ar`),
      sort_order: n,
    });
  }

  await supabase.from("news_article_blocks").delete().eq("article_id", id);
  if (blocks.length) {
    const { error } = await supabase.from("news_article_blocks").insert(blocks);
    if (error) throw new Error(error.message);
  }

  const faqs: Record<string, unknown>[] = [];
  for (let n = 1; n <= MAX_FAQS; n += 1) {
    const question = str(formData, `faq${n}_question`);
    const answer = str(formData, `faq${n}_answer`);
    if (!question || !answer) continue;
    faqs.push({
      article_id: id,
      question,
      question_ar: str(formData, `faq${n}_question_ar`),
      answer,
      answer_ar: str(formData, `faq${n}_answer_ar`),
      sort_order: n,
    });
  }

  await supabase.from("news_article_faqs").delete().eq("article_id", id);
  if (faqs.length) {
    const { error } = await supabase.from("news_article_faqs").insert(faqs);
    if (error) throw new Error(error.message);
  }

  const serviceIds = formData.getAll("related_services") as string[];
  await supabase.from("news_article_related_services").delete().eq("article_id", id);
  if (serviceIds.length) {
    const { error } = await supabase.from("news_article_related_services").insert(
      serviceIds.map((serviceId, i) => ({ article_id: id, service_id: serviceId, sort_order: i })),
    );
    if (error) throw new Error(error.message);
  }

  const projectSlugsSelected = formData.getAll("related_projects") as string[];
  await supabase.from("news_article_related_projects").delete().eq("article_id", id);
  if (projectSlugsSelected.length) {
    const { data: projectRows, error: projectLookupError } = await supabase
      .from("projects")
      .select("id, slug")
      .in("slug", projectSlugsSelected);
    if (projectLookupError) throw new Error(projectLookupError.message);
    const bySlug = new Map((projectRows ?? []).map((p) => [p.slug, p.id]));
    const rows = projectSlugsSelected
      .map((slug, i) => ({ article_id: id, project_id: bySlug.get(slug), sort_order: i }))
      .filter((r) => r.project_id);
    if (rows.length) {
      const { error } = await supabase.from("news_article_related_projects").insert(rows);
      if (error) throw new Error(error.message);
    }
  }

  revalidateAll(core.slug);
  redirect(`/admin/news/articles/${id}`);
}
