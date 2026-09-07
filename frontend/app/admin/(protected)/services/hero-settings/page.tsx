import { createClient } from "@/lib/supabase/server";
import { FieldPair, ImageField } from "../../_components/settings-fields";
import { saveServicesHeroSettings } from "./actions";

export default async function ServicesHeroSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("services_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Services page — Hero</h1>
        <p className="text-sm text-dust">The &quot;4 disciplines&quot; list is shared with Home page → Hero settings → Hero services.</p>
      </div>

      <form action={saveServicesHeroSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="hero_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={s} />
        <FieldPair name="hero_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={s} />
        <FieldPair name="hero_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={2} />
        <ImageField name="hero_image" label="Hero background image" row={s} />

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
