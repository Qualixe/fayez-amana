import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PrivacySectionForm from "../privacy-section-form";
import { updatePrivacySection } from "../actions";

export default async function EditPrivacySectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("privacy_page_sections").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit privacy section</h1>
      <PrivacySectionForm action={updatePrivacySection.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
