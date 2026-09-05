import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import HighlightForm from "../highlight-form";
import { updateHighlight } from "../actions";

export default async function EditHighlightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("home_highlights").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit highlight</h1>
      <HighlightForm action={updateHighlight.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
