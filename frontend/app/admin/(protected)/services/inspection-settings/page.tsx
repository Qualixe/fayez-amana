import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveServicesInspectionSettings } from "./actions";

export default async function ServicesInspectionSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("services_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Services page — Inspection process</h1>
        <p className="text-sm text-dust">The steps themselves are managed under &quot;Inspection steps&quot;.</p>
      </div>

      <form action={saveServicesInspectionSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="inspection_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="inspection_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />
        <FieldPair name="inspection_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={2} />
        <FieldPair
          name="inspection_phases"
          label="Diagram phase labels (one per line, 4 items, English)"
          labelAr="تسميات المراحل بالرسم (سطر لكل عنصر، 4 عناصر، عربي)"
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
