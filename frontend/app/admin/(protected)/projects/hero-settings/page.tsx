import { createClient } from "@/lib/supabase/server";
import { FieldPair, ImageField } from "../../_components/settings-fields";
import { saveProjectsHeroSettings } from "./actions";

export default async function ProjectsHeroSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("projects_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Projects page — Hero</h1>

      <form action={saveProjectsHeroSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="hero_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={s} />
        <FieldPair name="hero_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={s} />
        <FieldPair name="hero_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={3} />
        <ImageField name="hero_image" label="Hero background image" row={s} />
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid gap-3 sm:grid-cols-2">
            <FieldPair name={`hero_meta${n}_label`} label={`Meta ${n} label (English)`} labelAr={`تسمية ${n} (عربي)`} row={s} />
            <FieldPair name={`hero_meta${n}_value`} label={`Meta ${n} value (English)`} labelAr={`قيمة ${n} (عربي)`} row={s} />
          </div>
        ))}

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
