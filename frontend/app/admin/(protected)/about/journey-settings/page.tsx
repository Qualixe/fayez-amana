import { createClient } from "@/lib/supabase/server";
import { FieldPair, TextField } from "../../_components/settings-fields";
import { saveAboutJourneySettings } from "./actions";

export default async function AboutJourneySettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("about_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">About page — Journey</h1>
        <p className="text-sm text-dust">Milestones themselves are managed under &quot;Journey milestones&quot;.</p>
      </div>

      <form action={saveAboutJourneySettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="journey_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="journey_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={s} />
        <FieldPair name="journey_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={s} />
        <FieldPair name="journey_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={2} />
        <TextField name="journey_counter_value" label="Counter value (number)" type="number" defaultValue={s.journey_counter_value as number} />
        <FieldPair name="journey_counter_label" label="Counter label (English)" labelAr="تسمية العداد (عربي)" row={s} multiline rows={2} />
        <FieldPair name="journey_cta" label="CTA button (English)" labelAr="زر الدعوة للعمل (عربي)" row={s} />

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
