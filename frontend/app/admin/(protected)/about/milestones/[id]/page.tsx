import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MilestoneForm from "../milestone-form";
import { updateMilestone } from "../actions";

export default async function EditMilestonePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("about_milestones").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit milestone</h1>
      <MilestoneForm action={updateMilestone.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
