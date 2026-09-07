import { createClient } from "@/lib/supabase/server";
import { saveNotFoundSettings } from "./actions";

const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export default async function NotFoundSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("site_not_found_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string>);

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">404 page</h1>
        <p className="text-sm text-dust">
          Shown whenever a visitor lands on a page that doesn&apos;t exist. The phone and email shown in it come from
          Contact page → Settings → Business details.
        </p>
      </div>

      <form action={saveNotFoundSettings} className="flex flex-col gap-6">
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
            Message (English)
            <textarea name="message" rows={3} defaultValue={s.message} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            الرسالة (عربي)
            <textarea name="message_ar" dir="rtl" rows={3} defaultValue={s.message_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Primary button — links to Home (English)
            <input name="primary_label" defaultValue={s.primary_label} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            الزر الأساسي (عربي)
            <input name="primary_label_ar" dir="rtl" defaultValue={s.primary_label_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Secondary button — links to Projects (English)
            <input name="secondary_label" defaultValue={s.secondary_label} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            الزر الثانوي (عربي)
            <input name="secondary_label_ar" dir="rtl" defaultValue={s.secondary_label_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            &quot;Or call&quot; prefix (English)
            <input name="call_prefix" defaultValue={s.call_prefix} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            بادئة الاتصال (عربي)
            <input name="call_prefix_ar" dir="rtl" defaultValue={s.call_prefix_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            &quot;Email&quot; prefix (English)
            <input name="email_prefix" defaultValue={s.email_prefix} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            بادئة البريد الإلكتروني (عربي)
            <input name="email_prefix_ar" dir="rtl" defaultValue={s.email_prefix_ar} className={fieldClasses} />
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
