import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MethodArticleForm from "../method-article-form";
import { updateMethodArticle } from "../actions";

export default async function EditMethodArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("project_detail_method_articles").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit method article</h1>
      <MethodArticleForm action={updateMethodArticle.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
