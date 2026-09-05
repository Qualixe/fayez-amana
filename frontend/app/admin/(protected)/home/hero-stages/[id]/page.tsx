import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import HeroStageForm from "../hero-stage-form";
import { updateHeroStage } from "../actions";

export default async function EditHeroStagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("home_hero_stages").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit hero stage</h1>
      <HeroStageForm action={updateHeroStage.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
