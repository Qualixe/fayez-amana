import { createClient } from "@/lib/supabase/server";
import { TextField } from "../../_components/settings-fields";
import { saveNewsSeoSettings } from "./actions";

export default async function NewsSeoSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("news_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string | null | undefined>);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">News page — SEO</h1>

      <form action={saveNewsSeoSettings} className="flex max-w-4xl flex-col gap-6">
        <TextField name="seo_title" label="Page title (English)" defaultValue={s.seo_title} />
        <TextField name="seo_title_ar" label="عنوان الصفحة (عربي)" defaultValue={s.seo_title_ar} />
        <TextField name="seo_description" label="Meta description (English)" defaultValue={s.seo_description} multiline rows={2} />
        <TextField name="seo_description_ar" label="الوصف التعريفي (عربي)" defaultValue={s.seo_description_ar} multiline rows={2} />

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
