import { createClient } from "@/lib/supabase/server";
import { saveValuesSettings } from "./actions";

const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export default async function ValuesSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("core_values_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Core values section settings</h1>
        <p className="text-sm text-dust">Shared by the Home page and the About page.</p>
      </div>

      <form action={saveValuesSettings} className="flex flex-col gap-6">
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
          المقدمة (عربي)
          <textarea name="lede_ar" dir="rtl" rows={2} defaultValue={s.lede_ar} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Closing line (English)
          <textarea name="closing" rows={2} defaultValue={s.closing} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          الخاتمة (عربي)
          <textarea name="closing_ar" dir="rtl" rows={2} defaultValue={s.closing_ar} className={fieldClasses} />
        </label>

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save settings
        </button>
      </form>
    </div>
  );
}
