import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StatForm from "../stat-form";
import { updateStat } from "../actions";

export default async function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("home_stats").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit stat</h1>
      <StatForm action={updateStat.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
