import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveProcessFinishingSettings } from "./actions";

export default async function ProcessFinishingSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("process_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Process page — Finishing</h1>

      <form action={saveProcessFinishingSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="finishing_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="finishing_heading" label="Heading (English)" labelAr="العنوان (عربي)" row={s} />
        <FieldPair name="finishing_body" label="Body (English)" labelAr="النص (عربي)" row={s} multiline rows={4} />
        <FieldPair name="finishing_cta" label="CTA button (English)" labelAr="زر الدعوة للعمل (عربي)" row={s} />
        <FieldPair name="finishing_image_alt" label="Gallery image alt text (English)" labelAr="نص بديل للصور (عربي)" row={s} />

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
