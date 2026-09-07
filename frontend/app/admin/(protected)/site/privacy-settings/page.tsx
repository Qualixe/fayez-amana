import { createClient } from "@/lib/supabase/server";
import { savePrivacySettings } from "./actions";

const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export default async function PrivacySettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("privacy_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string>);

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Privacy policy page</h1>
        <p className="text-sm text-dust">
          The header of the /privacy page. The individual policy sections are managed separately under
          &quot;Privacy sections&quot;. The email and phone shown in its footer come from Contact page → Settings →
          Business details.
        </p>
      </div>

      <form action={savePrivacySettings} className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Eyebrow (English)
            <input name="eyebrow" defaultValue={s.eyebrow} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            الشعار (عربي)
            <input name="eyebrow_ar" dir="rtl" defaultValue={s.eyebrow_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Heading (English)
            <input name="heading" defaultValue={s.heading} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            العنوان (عربي)
            <input name="heading_ar" dir="rtl" defaultValue={s.heading_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Intro (English)
            <textarea name="intro" rows={3} defaultValue={s.intro} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            المقدمة (عربي)
            <textarea name="intro_ar" dir="rtl" rows={3} defaultValue={s.intro_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            &quot;Last updated&quot; label (English)
            <input name="last_updated_label" defaultValue={s.last_updated_label} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            تسمية &quot;آخر تحديث&quot; (عربي)
            <input name="last_updated_label_ar" dir="rtl" defaultValue={s.last_updated_label_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Last updated date (English)
            <input name="last_updated" defaultValue={s.last_updated} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            تاريخ آخر تحديث (عربي)
            <input name="last_updated_ar" dir="rtl" defaultValue={s.last_updated_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            &quot;On this page&quot; index label (English)
            <input name="toc_label" defaultValue={s.toc_label} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            تسمية فهرس الصفحة (عربي)
            <input name="toc_label_ar" dir="rtl" defaultValue={s.toc_label_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Closing &quot;Contact&quot; heading (English)
            <input name="contact_heading" defaultValue={s.contact_heading} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            عنوان &quot;تواصل معنا&quot; الختامي (عربي)
            <input name="contact_heading_ar" dir="rtl" defaultValue={s.contact_heading_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Footer note (English)
            <input name="footer_note" defaultValue={s.footer_note} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            ملاحظة التذييل (عربي)
            <input name="footer_note_ar" dir="rtl" defaultValue={s.footer_note_ar} className={fieldClasses} />
          </label>
        </div>

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
