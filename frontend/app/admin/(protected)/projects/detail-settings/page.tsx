import { createClient } from "@/lib/supabase/server";
import { saveProjectDetailSettings } from "./actions";

const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export default async function ProjectDetailSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("project_detail_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string>);

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Project detail page settings</h1>
        <p className="text-sm text-dust">
          The "Method & Materials" section heading, shown identically on every individual project's page. See also{" "}
          <a href="/admin/projects/method-articles" className="text-azure-glow hover:underline">
            method articles
          </a>
          .
        </p>
      </div>

      <form action={saveProjectDetailSettings} className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Eyebrow (English)
            <input name="method_eyebrow" defaultValue={s.method_eyebrow} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            الشعار (عربي)
            <input name="method_eyebrow_ar" dir="rtl" defaultValue={s.method_eyebrow_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Heading line 1 (English)
            <input name="method_heading1" defaultValue={s.method_heading1} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            العنوان سطر 1 (عربي)
            <input name="method_heading1_ar" dir="rtl" defaultValue={s.method_heading1_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Heading line 2 (English)
            <input name="method_heading2" defaultValue={s.method_heading2} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            العنوان سطر 2 (عربي)
            <input name="method_heading2_ar" dir="rtl" defaultValue={s.method_heading2_ar} className={fieldClasses} />
          </label>
        </div>
        <label className={labelClasses}>
          Lede (English)
          <textarea name="method_lede" rows={2} defaultValue={s.method_lede} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          المقدمة (عربي)
          <textarea name="method_lede_ar" dir="rtl" rows={2} defaultValue={s.method_lede_ar} className={fieldClasses} />
        </label>

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
