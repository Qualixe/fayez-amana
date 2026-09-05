import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PhaseForm from "../phase-form";
import { updatePhase } from "../actions";

export default async function EditPhasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("process_phases").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit workflow phase</h1>
      <PhaseForm action={updatePhase.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
