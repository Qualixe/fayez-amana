import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ValueForm from "../value-form";
import { updateValue } from "../actions";

export default async function EditValuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("core_values").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit core value</h1>
      <ValueForm action={updateValue.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
