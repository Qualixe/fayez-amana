import { createClient } from "@/lib/supabase/server";
import { FieldPair, TextField, ImageField } from "../../_components/settings-fields";
import { saveAboutSectionSettings } from "./actions";

export default async function AboutSectionSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("home_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Home page — About section</h1>
        <p className="text-sm text-dust">The image here is also shown on the About page's Expertise section.</p>
      </div>

      <form action={saveAboutSectionSettings} className="flex max-w-4xl flex-col gap-4">
        <FieldPair name="about_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair
          name="about_title"
          label="Title (one line per fragment, English)"
          labelAr="العنوان (سطر لكل جزء، عربي)"
          row={s}
          multiline
          rows={3}
        />
        <FieldPair name="about_body" label="Body (English)" labelAr="النص (عربي)" row={s} multiline rows={5} />
        <ImageField name="about_image" label="Image (also shown on the About page)" row={s} />
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField name="about_stat1_value" label="Stat 1 value (e.g. 300+)" defaultValue={s.about_stat1_value} />
          <TextField name="about_stat2_value" label="Stat 2 value (e.g. 25+)" defaultValue={s.about_stat2_value} />
        </div>
        <FieldPair name="about_stat1_label" label="Stat 1 label (English)" labelAr="تسمية الإحصائية 1 (عربي)" row={s} />
        <FieldPair name="about_stat2_label" label="Stat 2 label (English)" labelAr="تسمية الإحصائية 2 (عربي)" row={s} />
        <FieldPair name="about_our_story" label="'Our story' button (English)" labelAr="زر 'قصتنا' (عربي)" row={s} />
        <FieldPair name="about_expertise_eyebrow" label="Expertise eyebrow (English)" labelAr="شعار الخبرات (عربي)" row={s} />
        <FieldPair name="about_expertise_p1" label="Expertise paragraph 1 (English)" labelAr="فقرة الخبرات 1 (عربي)" row={s} multiline rows={4} />
        <FieldPair name="about_expertise_p2" label="Expertise paragraph 2 (English)" labelAr="فقرة الخبرات 2 (عربي)" row={s} multiline rows={4} />
        <FieldPair
          name="about_expertise_tags"
          label="Expertise tags (one per line, English)"
          labelAr="وسوم الخبرات (سطر لكل عنصر، عربي)"
          row={s}
          multiline
          rows={4}
        />

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save about section settings
        </button>
      </form>
    </div>
  );
}
