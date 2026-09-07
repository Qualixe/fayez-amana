import { createClient } from "@/lib/supabase/server";
import { FieldPair, ImageField } from "../../_components/settings-fields";
import { saveAboutWhySettings } from "./actions";

export default async function AboutWhySettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("about_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">About page — Why choose us</h1>
        <p className="text-sm text-dust">
          The reasons list itself is managed under Home page → Highlights.
        </p>
      </div>

      <form action={saveAboutWhySettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="why_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="why_tagline" label="Tagline (English)" labelAr="الشعار الفرعي (عربي)" row={s} />
        <FieldPair name="why_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />
        <ImageField name="why_image" label="Background image" row={s} />

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
