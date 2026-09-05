import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TeamCategoryForm from "../team-form";
import { updateTeamCategory } from "../actions";

export default async function EditTeamCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("team_categories").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit team row</h1>
      <TeamCategoryForm action={updateTeamCategory.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
