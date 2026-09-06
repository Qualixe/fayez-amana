import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CultureForm from "../culture-form";
import { updateCultureItem } from "../actions";

export default async function EditCultureItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("career_culture_items").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit culture item</h1>
      <CultureForm action={updateCultureItem.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
