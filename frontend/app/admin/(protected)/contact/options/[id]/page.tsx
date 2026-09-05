import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OptionForm from "../option-form";
import { updateOption } from "../actions";

export default async function EditOptionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("contact_options").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit option</h1>
      <OptionForm action={updateOption.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
