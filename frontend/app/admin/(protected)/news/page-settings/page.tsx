import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FieldPair, TextField, ImageField } from "../../_components/settings-fields";
import { saveNewsPageSettings } from "./actions";

const legendClasses = "mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow";

export default async function NewsPageSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("news_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">News page settings</h1>
        <p className="text-sm text-dust">
          Articles are managed under{" "}
          <Link href="/admin/news/articles" className="text-azure-glow hover:underline">
            Articles
          </Link>
          . &quot;Published&quot; count and category counts on the page are calculated automatically.
        </p>
      </div>

      <form action={saveNewsPageSettings} className="flex max-w-4xl flex-col gap-10">
        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Hero</legend>
          <ImageField name="hero_image" label="Hero background image" row={s} />
          <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
          <FieldPair name="hero_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={s} />
          <FieldPair name="hero_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={s} />
          <FieldPair name="hero_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={3} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Hero stats</legend>
          <FieldPair name="meta_author" label="Author (English)" labelAr="الكاتب (عربي)" row={s} />
          <FieldPair name="meta_languages" label="Languages (English)" labelAr="اللغات (عربي)" row={s} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>SEO</legend>
          <TextField name="seo_title" label="Page title (English)" defaultValue={s.seo_title as string} />
          <TextField name="seo_title_ar" label="عنوان الصفحة (عربي)" defaultValue={s.seo_title_ar as string} />
          <TextField
            name="seo_description"
            label="Meta description (English)"
            defaultValue={s.seo_description as string}
            multiline
            rows={2}
          />
          <TextField
            name="seo_description_ar"
            label="الوصف التعريفي (عربي)"
            defaultValue={s.seo_description_ar as string}
            multiline
            rows={2}
          />
        </fieldset>

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save news page settings
        </button>
      </form>
    </div>
  );
}
