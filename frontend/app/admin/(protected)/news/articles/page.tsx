import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteArticle } from "./actions";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("news_articles")
    .select("id, slug, title, category, published_at, featured")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">News articles</h1>
          <p className="text-sm text-dust">Create an article, then fill in its body, FAQs and related content.</p>
        </div>
        <Link
          href="/admin/news/articles/new"
          className="bg-azure px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          New article
        </Link>
      </div>

      <table className="w-full border-collapse text-start text-sm">
        <thead>
          <tr className="border-b border-steel font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
            <th className="py-2 pe-4 text-start font-medium">Title</th>
            <th className="py-2 pe-4 text-start font-medium">Category</th>
            <th className="py-2 pe-4 text-start font-medium">Published</th>
            <th className="py-2 pe-4 text-start font-medium">Featured</th>
            <th className="py-2 text-start font-medium" />
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((row) => (
            <tr key={row.id} className="border-b border-steel/60">
              <td className="py-3 pe-4">
                <Link href={`/admin/news/articles/${row.id}`} className="text-azure-glow hover:underline">
                  {row.title}
                </Link>
              </td>
              <td className="py-3 pe-4 text-dust">{row.category}</td>
              <td className="py-3 pe-4 text-dust">{row.published_at}</td>
              <td className="py-3 pe-4 text-dust">{row.featured ? "Yes" : "—"}</td>
              <td className="py-3 text-end">
                <form action={async () => { "use server"; await deleteArticle(row.id, row.slug); }}>
                  <button type="submit" className="text-amber-soft hover:underline">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
