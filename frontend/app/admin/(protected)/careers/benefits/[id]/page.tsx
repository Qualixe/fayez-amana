import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BenefitForm from "../benefit-form";
import { updateBenefit } from "../actions";

export default async function EditBenefitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("career_benefits").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit benefit</h1>
      <BenefitForm action={updateBenefit.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
