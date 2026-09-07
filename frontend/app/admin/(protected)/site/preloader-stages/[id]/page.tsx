import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PreloaderStageForm from "../preloader-stage-form";
import { updatePreloaderStage } from "../actions";

export default async function EditPreloaderStagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("preloader_stages").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit preloader stage</h1>
      <PreloaderStageForm action={updatePreloaderStage.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
