import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveProcessSectionSettings } from "./actions";

export default async function ProcessSectionSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("home_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Home page — Process section</h1>

      <form action={saveProcessSectionSettings} className="flex max-w-4xl flex-col gap-4">
        <FieldPair name="process_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="process_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={s} />
        <FieldPair name="process_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={s} />
        <FieldPair name="process_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={4} />
        <FieldPair name="process_cta" label="CTA button (English)" labelAr="زر الدعوة للعمل (عربي)" row={s} />

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save process section settings
        </button>
      </form>
    </div>
  );
}
