import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ApplicationFieldForm from "../application-field-form";
import { updateApplicationField } from "../actions";

export default async function EditApplicationFieldPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("career_application_fields").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit application form field</h1>
      <ApplicationFieldForm action={updateApplicationField.bind(null, id)} defaultValues={row} submitLabel="Save changes" lockKey />
    </div>
  );
}
