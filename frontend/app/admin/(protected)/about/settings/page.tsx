import { createClient } from "@/lib/supabase/server";
import { saveAboutSettings, saveFounder } from "./actions";

const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export default async function AboutSettingsPage() {
  const supabase = await createClient();
  const [{ data: settings }, { data: founder }] = await Promise.all([
    supabase.from("about_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("founder").select("*").eq("id", 1).maybeSingle(),
  ]);
  const s = settings ?? {};
  const f = founder ?? {};

  return (
    <div className="flex max-w-4xl flex-col gap-16">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Team page settings</h1>
        <form action={saveAboutSettings} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Eyebrow (English)
              <input name="eyebrow" defaultValue={s.eyebrow} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Eyebrow (عربي)
              <input name="eyebrow_ar" dir="rtl" defaultValue={s.eyebrow_ar} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Title (English)
              <input name="title" defaultValue={s.title} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              العنوان (عربي)
              <input name="title_ar" dir="rtl" defaultValue={s.title_ar} className={fieldClasses} />
            </label>
          </div>
          <label className={labelClasses}>
            Lede (English)
            <textarea name="lede" rows={2} defaultValue={s.lede} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            الوصف (عربي)
            <textarea name="lede_ar" dir="rtl" rows={2} defaultValue={s.lede_ar} className={fieldClasses} />
          </label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className={labelClasses}>
              Total team count
              <input name="total_count" type="number" defaultValue={s.total_count ?? 0} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Total label (English)
              <input name="total_label" defaultValue={s.total_label} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              التسمية (عربي)
              <input name="total_label_ar" dir="rtl" defaultValue={s.total_label_ar} className={fieldClasses} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Management title (English)
              <input name="management_title" defaultValue={s.management_title} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              عنوان الإدارة (عربي)
              <input name="management_title_ar" dir="rtl" defaultValue={s.management_title_ar} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Management body (English)
              <textarea name="management_body" rows={2} defaultValue={s.management_body} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              وصف الإدارة (عربي)
              <textarea name="management_body_ar" dir="rtl" rows={2} defaultValue={s.management_body_ar} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Admin title (English)
              <input name="admin_title" defaultValue={s.admin_title} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              عنوان الكادر الإداري (عربي)
              <input name="admin_title_ar" dir="rtl" defaultValue={s.admin_title_ar} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Admin body (English)
              <textarea name="admin_body" rows={2} defaultValue={s.admin_body} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              وصف الكادر الإداري (عربي)
              <textarea name="admin_body_ar" dir="rtl" rows={2} defaultValue={s.admin_body_ar} className={fieldClasses} />
            </label>
          </div>
          <button
            type="submit"
            className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
          >
            Save team settings
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-6 border-t border-steel pt-16">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Founder</h2>
        <form action={saveFounder} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Eyebrow (English)
              <input name="eyebrow" defaultValue={f.eyebrow} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Eyebrow (عربي)
              <input name="eyebrow_ar" dir="rtl" defaultValue={f.eyebrow_ar} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Title (English)
              <input name="title" defaultValue={f.title} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              العنوان (عربي)
              <input name="title_ar" dir="rtl" defaultValue={f.title_ar} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Name (English)
              <input name="name" defaultValue={f.name} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              الاسم (عربي)
              <input name="name_ar" dir="rtl" defaultValue={f.name_ar} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Role (English)
              <input name="role" defaultValue={f.role} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              المنصب (عربي)
              <input name="role_ar" dir="rtl" defaultValue={f.role_ar} className={fieldClasses} />
            </label>
          </div>
          <label className={labelClasses}>
            Quote (English)
            <textarea name="quote" rows={3} defaultValue={f.quote} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            الاقتباس (عربي)
            <textarea name="quote_ar" dir="rtl" rows={3} defaultValue={f.quote_ar} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            Paragraph 1 (English)
            <textarea name="p1" rows={2} defaultValue={f.p1} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            الفقرة الأولى (عربي)
            <textarea name="p1_ar" dir="rtl" rows={2} defaultValue={f.p1_ar} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            Paragraph 2 (English)
            <textarea name="p2" rows={2} defaultValue={f.p2} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            الفقرة الثانية (عربي)
            <textarea name="p2_ar" dir="rtl" rows={2} defaultValue={f.p2_ar} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            Photo
            {f.photo ? (
              <img src={f.photo} alt="" className="h-32 w-auto border border-steel object-cover" />
            ) : null}
            <input type="file" name="photo_file" accept="image/*" className={fieldClasses} />
            <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
            <input name="photo" defaultValue={f.photo} className={fieldClasses} />
          </label>
          <button
            type="submit"
            className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
          >
            Save founder
          </button>
        </form>
      </div>
    </div>
  );
}
