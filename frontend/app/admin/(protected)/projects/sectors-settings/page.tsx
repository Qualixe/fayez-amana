import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveProjectsSectorsSettings } from "./actions";

export default async function ProjectsSectorsSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("projects_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Projects page — Sectors</h1>

      <form action={saveProjectsSectorsSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="sectors_heading" label="Heading (English)" labelAr="العنوان (عربي)" row={s} />
        <FieldPair
          name="sectors_list"
          label="Sectors (one per line, English)"
          labelAr="القطاعات (سطر لكل عنصر، عربي)"
          row={s}
          multiline
          rows={6}
        />

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
