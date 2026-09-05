import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import VisionItemForm from "../vision-item-form";
import { updateVisionItem } from "../actions";

export default async function EditVisionItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("about_vision_items").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit vision/mission item</h1>
      <VisionItemForm action={updateVisionItem.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
