import { createClient } from "@/lib/supabase/server";
import { saveSiteCtaSettings } from "./actions";

const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export default async function SiteCtaSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("site_cta_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string>);

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Bottom "Start a Project" CTA</h1>
        <p className="text-sm text-dust">
          Shown at the bottom of Home, About, Services, Projects, Project detail and Process pages. The phone and
          email shown in it come from Contact page → Settings → Business details.
        </p>
      </div>

      <form action={saveSiteCtaSettings} className="flex flex-col gap-6">
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
            Title line 1 (English)
            <input name="title1" defaultValue={s.title1} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            العنوان سطر 1 (عربي)
            <input name="title1_ar" dir="rtl" defaultValue={s.title1_ar} className={fieldClasses} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Title line 2 (English)
            <input name="title2" defaultValue={s.title2} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            العنوان سطر 2 (عربي)
            <input name="title2_ar" dir="rtl" defaultValue={s.title2_ar} className={fieldClasses} />
          </label>
        </div>
        <label className={labelClasses}>
          Lede (English)
          <input name="lede" defaultValue={s.lede} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          المقدمة (عربي)
          <input name="lede_ar" dir="rtl" defaultValue={s.lede_ar} className={fieldClasses} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClasses}>
            Button text (English)
            <input name="start_project" defaultValue={s.start_project} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            نص الزر (عربي)
            <input name="start_project_ar" dir="rtl" defaultValue={s.start_project_ar} className={fieldClasses} />
          </label>
        </div>
        <label className={labelClasses}>
          Background image
          {s.background_image ? (
            <img src={s.background_image} alt="" className="h-32 w-auto border border-steel object-cover" />
          ) : null}
          <input type="file" name="background_image_file" accept="image/*" className={fieldClasses} />
          <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
          <input name="background_image" defaultValue={s.background_image} className={fieldClasses} />
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
