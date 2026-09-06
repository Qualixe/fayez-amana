import { createClient } from "@/lib/supabase/server";
import { FieldPair, ImageField } from "../../_components/settings-fields";
import { saveHeroSettings } from "./actions";

export default async function CareersHeroSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("careers_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Careers page — Hero</h1>
      </div>

      <form action={saveHeroSettings} className="flex max-w-4xl flex-col gap-4">
        <ImageField name="hero_image" label="Hero background image" row={s} />
        <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="hero_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={s} />
        <FieldPair name="hero_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={s} />
        <FieldPair name="hero_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={3} />

        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid gap-3 border border-steel p-4 sm:grid-cols-2">
            <FieldPair name={`meta${n}_label`} label={`Stat ${n} label (English)`} labelAr="التسمية (عربي)" row={s} />
            <FieldPair name={`meta${n}_value`} label={`Stat ${n} value (English)`} labelAr="القيمة (عربي)" row={s} />
          </div>
        ))}

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save hero settings
        </button>
      </form>
    </div>
  );
}
