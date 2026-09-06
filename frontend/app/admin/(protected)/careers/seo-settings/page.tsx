import { createClient } from "@/lib/supabase/server";
import { TextField } from "../../_components/settings-fields";
import { saveSeoSettings } from "./actions";

export default async function CareersSeoSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("careers_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Careers page — SEO</h1>
      </div>

      <form action={saveSeoSettings} className="flex max-w-4xl flex-col gap-4">
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

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save SEO settings
        </button>
      </form>
    </div>
  );
}
