import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InspectionStepForm from "../inspection-step-form";
import { updateInspectionStep } from "../actions";

export default async function EditInspectionStepPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("services_inspection_steps").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit inspection step</h1>
      <InspectionStepForm action={updateInspectionStep.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
