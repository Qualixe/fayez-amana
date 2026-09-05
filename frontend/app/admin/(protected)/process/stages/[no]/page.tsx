import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StageForm from "../stage-form";
import { updateStage } from "../actions";

export default async function EditStagePage({ params }: { params: Promise<{ no: string }> }) {
  const { no } = await params;
  const stageNo = Number(no);
  const supabase = await createClient();
  const { data: row } = await supabase.from("process_stages").select("*").eq("no", stageNo).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit stage {stageNo}</h1>
      <StageForm action={updateStage.bind(null, stageNo)} defaultValues={row} submitLabel="Save changes" lockNo />
    </div>
  );
}
