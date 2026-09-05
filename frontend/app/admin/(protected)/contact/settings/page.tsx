import { createClient } from "@/lib/supabase/server";
import { saveContactSettings } from "./actions";

const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

type TrustItem = { title: { en: string; ar: string }; body: { en: string; ar: string } };
type Discipline = { en: string; ar: string };

export default async function ContactSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("contact_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};
  const trustItems: TrustItem[] = s.trust_items ?? [];
  const disciplines: Discipline[] = s.disciplines ?? [];

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Contact page settings</h1>

      <form action={saveContactSettings} className="flex flex-col gap-10">
        <fieldset className="flex flex-col gap-4">
          <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">Hero</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Eyebrow (English)
              <input name="hero_eyebrow" defaultValue={s.hero_eyebrow} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              الشعار (عربي)
              <input name="hero_eyebrow_ar" dir="rtl" defaultValue={s.hero_eyebrow_ar} className={fieldClasses} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Heading line 1 (English)
              <input name="hero_heading1" defaultValue={s.hero_heading1} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              العنوان سطر 1 (عربي)
              <input name="hero_heading1_ar" dir="rtl" defaultValue={s.hero_heading1_ar} className={fieldClasses} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Heading line 2 (English)
              <input name="hero_heading2" defaultValue={s.hero_heading2} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              العنوان سطر 2 (عربي)
              <input name="hero_heading2_ar" dir="rtl" defaultValue={s.hero_heading2_ar} className={fieldClasses} />
            </label>
          </div>
          <label className={labelClasses}>
            Lede (English)
            <input name="hero_lede" defaultValue={s.hero_lede} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            المقدمة (عربي)
            <input name="hero_lede_ar" dir="rtl" defaultValue={s.hero_lede_ar} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            Hero background image
            {s.hero_image ? (
              <img src={s.hero_image} alt="" className="h-32 w-auto border border-steel object-cover" />
            ) : null}
            <input type="file" name="hero_image_file" accept="image/*" className={fieldClasses} />
            <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
            <input name="hero_image" defaultValue={s.hero_image} className={fieldClasses} />
          </label>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">
            Business details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Phone
              <input name="phone" dir="ltr" defaultValue={s.phone} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Email
              <input name="email" dir="ltr" defaultValue={s.email} className={fieldClasses} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Location (English)
              <input name="location" defaultValue={s.location} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              الموقع (عربي)
              <input name="location_ar" dir="rtl" defaultValue={s.location_ar} className={fieldClasses} />
            </label>
          </div>
          <label className={labelClasses}>
            Established year
            <input name="established_year" defaultValue={s.established_year} className={fieldClasses} />
          </label>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">
            Social links
          </legend>
          <div className="grid gap-3 border border-steel p-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Website URL
              <input name="website_url" dir="ltr" defaultValue={s.website_url} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Website display text
              <input name="website_display" dir="ltr" defaultValue={s.website_display} className={fieldClasses} />
            </label>
          </div>
          <div className="grid gap-3 border border-steel p-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Instagram URL
              <input name="instagram_url" dir="ltr" defaultValue={s.instagram_url} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Instagram display text
              <input name="instagram_display" dir="ltr" defaultValue={s.instagram_display} className={fieldClasses} />
            </label>
          </div>
          <div className="grid gap-3 border border-steel p-4 sm:grid-cols-2">
            <label className={labelClasses}>
              X (Twitter) URL
              <input name="x_url" dir="ltr" defaultValue={s.x_url} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              X display text
              <input name="x_display" dir="ltr" defaultValue={s.x_display} className={fieldClasses} />
            </label>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">
            Office map
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Eyebrow (English)
              <input name="map_eyebrow" defaultValue={s.map_eyebrow} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              الشعار (عربي)
              <input name="map_eyebrow_ar" dir="rtl" defaultValue={s.map_eyebrow_ar} className={fieldClasses} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Heading line 1 (English)
              <input name="map_heading1" defaultValue={s.map_heading1} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              العنوان سطر 1 (عربي)
              <input name="map_heading1_ar" dir="rtl" defaultValue={s.map_heading1_ar} className={fieldClasses} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Heading line 2 (English)
              <input name="map_heading2" defaultValue={s.map_heading2} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              العنوان سطر 2 (عربي)
              <input name="map_heading2_ar" dir="rtl" defaultValue={s.map_heading2_ar} className={fieldClasses} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Caption (English)
              <input name="map_caption" defaultValue={s.map_caption} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              الوصف (عربي)
              <input name="map_caption_ar" dir="rtl" defaultValue={s.map_caption_ar} className={fieldClasses} />
            </label>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">
            Bottom marquee (one item per line, same order both sides)
          </legend>
          <label className={labelClasses}>
            English
            <textarea name="marquee_items" rows={3} defaultValue={s.marquee_items} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            عربي
            <textarea name="marquee_items_ar" dir="rtl" rows={3} defaultValue={s.marquee_items_ar} className={fieldClasses} />
          </label>
        </fieldset>

        <fieldset className="flex flex-col gap-6">
          <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">
            Trust badges (fixed 3 items)
          </legend>
          {[1, 2, 3].map((n) => {
            const item = trustItems[n - 1];
            return (
              <div key={n} className="grid gap-3 border border-steel p-4 sm:grid-cols-2">
                <label className={labelClasses}>
                  Title {n} (English)
                  <input name={`trust${n}_title_en`} defaultValue={item?.title.en} className={fieldClasses} />
                </label>
                <label className={labelClasses}>
                  العنوان {n} (عربي)
                  <input name={`trust${n}_title_ar`} dir="rtl" defaultValue={item?.title.ar} className={fieldClasses} />
                </label>
                <label className={labelClasses}>
                  Body {n} (English)
                  <input name={`trust${n}_body_en`} defaultValue={item?.body.en} className={fieldClasses} />
                </label>
                <label className={labelClasses}>
                  الوصف {n} (عربي)
                  <input name={`trust${n}_body_ar`} dir="rtl" defaultValue={item?.body.ar} className={fieldClasses} />
                </label>
              </div>
            );
          })}
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">
            Disciplines list (one per line, same order both sides)
          </legend>
          <label className={labelClasses}>
            English
            <textarea
              name="disciplines_en"
              rows={4}
              defaultValue={disciplines.map((d) => d.en).join("\n")}
              className={fieldClasses}
            />
          </label>
          <label className={labelClasses}>
            عربي
            <textarea
              name="disciplines_ar"
              dir="rtl"
              rows={4}
              defaultValue={disciplines.map((d) => d.ar).join("\n")}
              className={fieldClasses}
            />
          </label>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">FAQ intro</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Kicker (English)
              <input name="faq_kicker" defaultValue={s.faq_kicker} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              الشعار (عربي)
              <input name="faq_kicker_ar" dir="rtl" defaultValue={s.faq_kicker_ar} className={fieldClasses} />
            </label>
          </div>
          <label className={labelClasses}>
            Headline (English, one line per fragment — usually 2 lines)
            <textarea name="faq_headline" rows={2} defaultValue={s.faq_headline} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            العنوان (عربي)
            <textarea name="faq_headline_ar" dir="rtl" rows={2} defaultValue={s.faq_headline_ar} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            Lede (English)
            <textarea name="faq_lede" rows={2} defaultValue={s.faq_lede} className={fieldClasses} />
          </label>
          <label className={labelClasses}>
            المقدمة (عربي)
            <textarea name="faq_lede_ar" dir="rtl" rows={2} defaultValue={s.faq_lede_ar} className={fieldClasses} />
          </label>
        </fieldset>

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save contact settings
        </button>
      </form>
    </div>
  );
}
