import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveApplicationSettings } from "./actions";

const legendClasses = "mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow";

export default async function CareersApplicationSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("careers_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Careers page — Application</h1>
        <p className="text-sm text-dust">
          Extra form fields (Phone, Experience, or anything you add) are managed under{" "}
          <Link href="/admin/careers/application-fields" className="text-azure-glow hover:underline">
            Application form fields
          </Link>
          , and trust badges under{" "}
          <Link href="/admin/careers/trust-items" className="text-azure-glow hover:underline">
            Application trust badges
          </Link>
          . Phone and email in the Call button and messages come from Contact page settings — use{" "}
          <code>{"{email}"}</code> where you want that email inserted.
        </p>
      </div>

      <form action={saveApplicationSettings} className="flex max-w-4xl flex-col gap-10">
        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Section header</legend>
          <FieldPair name="application_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
          <FieldPair name="application_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />
          <FieldPair
            name="application_note"
            label="Note above the form (English)"
            labelAr="ملاحظة أعلى النموذج (عربي)"
            row={s}
            multiline
            rows={2}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Form fields</legend>
          <FieldPair name="form_name_label" label="Name field label (English)" labelAr="تسمية حقل الاسم (عربي)" row={s} />
          <FieldPair name="form_email_label" label="Email field label (English)" labelAr="تسمية حقل البريد (عربي)" row={s} />
          <FieldPair name="form_position_label" label="Position field label (English)" labelAr="تسمية حقل الوظيفة (عربي)" row={s} />
          <FieldPair name="form_cv_label" label="CV field label (English)" labelAr="تسمية حقل السيرة الذاتية (عربي)" row={s} />
          <FieldPair name="form_cv_hint" label="CV hint (English)" labelAr="ملاحظة السيرة الذاتية (عربي)" row={s} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Buttons & messages</legend>
          <FieldPair name="form_send_label" label="Submit button (English)" labelAr="زر الإرسال (عربي)" row={s} />
          <FieldPair name="form_sending_label" label="Submit button while sending (English)" labelAr="أثناء الإرسال (عربي)" row={s} />
          <FieldPair
            name="form_call_label"
            label="Call button prefix, before the phone number (English)"
            labelAr="بادئة زر الاتصال، قبل رقم الهاتف (عربي)"
            row={s}
          />
          <FieldPair
            name="form_footer_note"
            label="Footer note below the form (English)"
            labelAr="ملاحظة أسفل النموذج (عربي)"
            row={s}
            multiline
            rows={2}
          />
          <FieldPair
            name="form_validation_error"
            label="Validation error (English)"
            labelAr="رسالة خطأ التحقق (عربي)"
            row={s}
            multiline
            rows={2}
          />
          <FieldPair
            name="form_send_error"
            label="Send-failed error (English)"
            labelAr="رسالة فشل الإرسال (عربي)"
            row={s}
            multiline
            rows={2}
          />
          <FieldPair
            name="form_network_error"
            label="Network error (English)"
            labelAr="رسالة خطأ الشبكة (عربي)"
            row={s}
            multiline
            rows={2}
          />
          <FieldPair name="form_success_heading" label="Success heading (English)" labelAr="عنوان النجاح (عربي)" row={s} />
          <FieldPair
            name="form_success_body"
            label="Success body (English)"
            labelAr="نص النجاح (عربي)"
            row={s}
            multiline
            rows={2}
          />
        </fieldset>

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save application settings
        </button>
      </form>
    </div>
  );
}
