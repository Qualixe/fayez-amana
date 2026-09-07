import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveAboutExpertiseSettings } from "./actions";

export default async function AboutExpertiseSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("about_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">About page — Expertise</h1>

      <form action={saveAboutExpertiseSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="expertise_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="expertise_p1" label="Paragraph 1 (English)" labelAr="الفقرة 1 (عربي)" row={s} multiline rows={4} />
        <FieldPair name="expertise_p2" label="Paragraph 2 (English)" labelAr="الفقرة 2 (عربي)" row={s} multiline rows={4} />
        <FieldPair
          name="expertise_tags"
          label="Tags (one per line, English)"
          labelAr="الوسوم (سطر لكل عنصر، عربي)"
          row={s}
          multiline
          rows={4}
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
