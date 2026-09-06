import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fieldClasses, labelClasses, legendClasses, TextField, FieldPair, type Row } from "../../../_components/settings-fields";
import { NEWS_CATEGORIES } from "@/lib/db/news";
import { saveArticle } from "../actions";

const BLOCK_TYPES = ["heading", "paragraph", "bullets", "steps", "callout", "table", "process_stages"] as const;

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: article }, { data: blocks }, { data: faqs }, { data: relatedServiceRows }, { data: relatedProjectRows }, { data: allServices }, { data: allProjects }] =
    await Promise.all([
      supabase.from("news_articles").select("*").eq("id", id).maybeSingle(),
      supabase.from("news_article_blocks").select("*").eq("article_id", id).order("sort_order", { ascending: true }),
      supabase.from("news_article_faqs").select("*").eq("article_id", id).order("sort_order", { ascending: true }),
      supabase.from("news_article_related_services").select("service_id").eq("article_id", id),
      supabase.from("news_article_related_projects").select("projects(slug)").eq("article_id", id),
      supabase.from("services").select("id, title, number").order("sort_order", { ascending: true }),
      supabase.from("projects").select("slug, title").order("sort_order", { ascending: true }),
    ]);

  if (!article) notFound();

  const selectedServiceIds = new Set((relatedServiceRows ?? []).map((r) => r.service_id as string));
  const selectedProjectSlugs = new Set(
    (relatedProjectRows ?? []).map((r) => (r.projects as unknown as { slug: string } | null)?.slug).filter(Boolean),
  );

  const blockRows: Row = {};
  (blocks ?? []).forEach((b, i) => {
    const n = i + 1;
    blockRows[`block${n}_type`] = b.block_type;
    blockRows[`block${n}_heading`] = b.heading;
    blockRows[`block${n}_heading_ar`] = b.heading_ar;
    blockRows[`block${n}_body`] = b.body;
    blockRows[`block${n}_body_ar`] = b.body_ar;
    blockRows[`block${n}_callout_title`] = b.callout_title;
    blockRows[`block${n}_callout_title_ar`] = b.callout_title_ar;
    blockRows[`block${n}_table_headers`] = b.table_headers;
    blockRows[`block${n}_table_headers_ar`] = b.table_headers_ar;
    blockRows[`block${n}_table_rows`] = b.table_rows;
    blockRows[`block${n}_table_rows_ar`] = b.table_rows_ar;
  });
  const blockSlots = Math.min(24, Math.max((blocks ?? []).length + 3, 6));

  const faqRows: Row = {};
  (faqs ?? []).forEach((f, i) => {
    const n = i + 1;
    faqRows[`faq${n}_question`] = f.question;
    faqRows[`faq${n}_question_ar`] = f.question_ar;
    faqRows[`faq${n}_answer`] = f.answer;
    faqRows[`faq${n}_answer_ar`] = f.answer_ar;
  });
  const faqSlots = Math.min(8, Math.max((faqs ?? []).length + 2, 3));

  const action = saveArticle.bind(null, id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit article</h1>

      <form action={action} className="flex max-w-5xl flex-col gap-10">
        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Core</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className={labelClasses}>
              Slug
              <input name="slug" required defaultValue={article.slug} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Category
              <select name="category" required defaultValue={article.category} className={fieldClasses}>
                {NEWS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <FieldPair name="title" label="Title (English)" labelAr="العنوان (عربي)" row={article} />
          <FieldPair name="excerpt" label="Excerpt (English)" labelAr="المقتطف (عربي)" row={article} multiline rows={2} />
          <FieldPair name="author" label="Author (English)" labelAr="الكاتب (عربي)" row={article} />
          <div className="grid gap-3 sm:grid-cols-3">
            <label className={labelClasses}>
              Read minutes
              <input name="read_minutes" type="number" min={1} defaultValue={article.read_minutes} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Published date
              <input name="published_at" type="date" defaultValue={article.published_at} className={fieldClasses} />
            </label>
            <label className="flex flex-col justify-end gap-1.5 text-sm text-dust">
              <span className="flex items-center gap-2">
                <input type="checkbox" name="featured" defaultChecked={article.featured} className="h-4 w-4" />
                Featured (shown at top of the News listing)
              </span>
            </label>
          </div>
          <TextField name="image" label="Thumbnail image path/URL (optional)" defaultValue={article.image} />
        </fieldset>

        <fieldset className="flex flex-col gap-6">
          <legend className={legendClasses}>Body blocks</legend>
          <p className="text-xs text-ash">
            Leave a slot&apos;s type empty to skip it. Bullets: one item per line. Steps: one per line as{" "}
            <code>Title|||Body</code>. Table headers: pipe-separated column names. Table rows: one row per line, cells
            pipe-separated. &quot;Process stages&quot; needs no fields — it embeds the full 21-stage breakdown from the Process page.
          </p>
          {Array.from({ length: blockSlots }, (_, i) => i + 1).map((n) => (
            <div key={n} className="flex flex-col gap-3 border border-steel p-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-dust">Block {n}</span>
                <select
                  name={`block${n}_type`}
                  defaultValue={(blockRows[`block${n}_type`] as string) ?? ""}
                  className={`${fieldClasses} max-w-xs`}
                >
                  <option value="">— none —</option>
                  {BLOCK_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <FieldPair
                name={`block${n}_heading`}
                label="Heading (used by: heading)"
                labelAr="العنوان (عربي)"
                row={blockRows}
              />
              <FieldPair
                name={`block${n}_body`}
                label="Body (used by: paragraph / bullets / steps / callout)"
                labelAr="النص (عربي)"
                row={blockRows}
                multiline
                rows={3}
              />
              <FieldPair
                name={`block${n}_callout_title`}
                label="Callout title (used by: callout)"
                labelAr="عنوان الملاحظة (عربي)"
                row={blockRows}
              />
              <FieldPair
                name={`block${n}_table_headers`}
                label="Table headers, pipe-separated (used by: table)"
                labelAr="رؤوس الجدول (عربي)"
                row={blockRows}
              />
              <FieldPair
                name={`block${n}_table_rows`}
                label="Table rows, one per line (used by: table)"
                labelAr="صفوف الجدول (عربي)"
                row={blockRows}
                multiline
                rows={3}
              />
            </div>
          ))}
        </fieldset>

        <fieldset className="flex flex-col gap-6">
          <legend className={legendClasses}>FAQs</legend>
          {Array.from({ length: faqSlots }, (_, i) => i + 1).map((n) => (
            <div key={n} className="flex flex-col gap-3 border border-steel p-4">
              <span className="font-mono text-xs text-dust">FAQ {n}</span>
              <FieldPair name={`faq${n}_question`} label="Question (English)" labelAr="السؤال (عربي)" row={faqRows} />
              <FieldPair
                name={`faq${n}_answer`}
                label="Answer (English)"
                labelAr="الإجابة (عربي)"
                row={faqRows}
                multiline
                rows={3}
              />
            </div>
          ))}
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className={legendClasses}>Related services</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(allServices ?? []).map((service) => (
              <label key={service.id} className="flex items-center gap-2 text-sm text-dust">
                <input
                  type="checkbox"
                  name="related_services"
                  value={service.id}
                  defaultChecked={selectedServiceIds.has(service.id)}
                  className="h-4 w-4"
                />
                {service.number} {service.title}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className={legendClasses}>Related projects</legend>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {(allProjects ?? []).map((project) => (
              <label key={project.slug} className="flex items-center gap-2 text-sm text-dust">
                <input
                  type="checkbox"
                  name="related_projects"
                  value={project.slug}
                  defaultChecked={selectedProjectSlugs.has(project.slug)}
                  className="h-4 w-4"
                />
                {project.title}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save article
        </button>
      </form>
    </div>
  );
}
