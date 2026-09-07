import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveProjectsSpotlightSettings } from "./actions";

export default async function ProjectsSpotlightSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("projects_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Projects page — Spotlight</h1>

      <form action={saveProjectsSpotlightSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="spotlight_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="spotlight_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />
        <FieldPair name="spotlight_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={2} />

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save
        </button>
      </form>
    </div>
  );
}
