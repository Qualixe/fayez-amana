import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveServicesComplianceSettings } from "./actions";

export default async function ServicesComplianceSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("services_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Services page — Compliance</h1>

      <form action={saveServicesComplianceSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="compliance_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="compliance_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />
        <FieldPair
          name="compliance_standards"
          label="Standards (one per line, English)"
          labelAr="المعايير (سطر لكل عنصر، عربي)"
          row={s}
          multiline
          rows={4}
        />
        <FieldPair name="compliance_request_docs" label="'Request documents' button (English)" labelAr="زر 'اطلب مستنداتنا' (عربي)" row={s} />
        <FieldPair name="compliance_certifications_label" label="Certifications label (English)" labelAr="تسمية الاعتمادات (عربي)" row={s} />
        <FieldPair name="compliance_cert_body" label="Certifications body (English)" labelAr="نص الاعتمادات (عربي)" row={s} multiline rows={3} />
        <FieldPair name="compliance_cert_cta" label="Certifications link (English)" labelAr="رابط الاعتمادات (عربي)" row={s} />

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
