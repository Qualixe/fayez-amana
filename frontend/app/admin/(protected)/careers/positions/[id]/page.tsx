import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PositionForm from "../position-form";
import { updatePosition } from "../actions";

export default async function EditPositionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("career_positions").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit position</h1>
      <PositionForm action={updatePosition.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
