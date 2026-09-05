import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CertificationForm from "../certification-form";
import { updateCertification } from "../actions";

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("certifications").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit certification</h1>
      <CertificationForm action={updateCertification.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
