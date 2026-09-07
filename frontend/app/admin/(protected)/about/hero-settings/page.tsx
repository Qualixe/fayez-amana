import { createClient } from "@/lib/supabase/server";
import { FieldPair, ImageField } from "../../_components/settings-fields";
import { saveAboutHeroSettings } from "./actions";

export default async function AboutHeroSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("about_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">About page — Hero</h1>

      <form action={saveAboutHeroSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="hero_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={s} />
        <FieldPair name="hero_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={s} />
        <FieldPair name="hero_title3" label="Title line 3 (English)" labelAr="العنوان سطر 3 (عربي)" row={s} />
        <FieldPair name="hero_body" label="Body (English)" labelAr="النص (عربي)" row={s} multiline rows={4} />
        <ImageField name="hero_image" label="Hero background image" row={s} />
        {[1, 2, 3, 4].map((n) => (
          <FieldPair
            key={`label-${n}`}
            name={`hero_stat${n}_label`}
            label={`Stat ${n} label (English)`}
            labelAr={`تسمية الإحصائية ${n} (عربي)`}
            row={s}
          />
        ))}
        {[1, 2, 3, 4].map((n) => (
          <FieldPair
            key={`value-${n}`}
            name={`hero_stat${n}_value`}
            label={`Stat ${n} value (English)`}
            labelAr={`قيمة الإحصائية ${n} (عربي)`}
            row={s}
          />
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
