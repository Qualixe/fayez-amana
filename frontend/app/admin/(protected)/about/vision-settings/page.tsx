import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveAboutVisionSettings } from "./actions";

export default async function AboutVisionSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("about_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">About page — Vision &amp; mission heading</h1>
        <p className="text-sm text-dust">The vision/mission items themselves are managed under &quot;Vision &amp; mission&quot;.</p>
      </div>

      <form action={saveAboutVisionSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="vision_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="vision_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />
        <FieldPair name="vision_closing" label="Closing line (English)" labelAr="الخاتمة (عربي)" row={s} multiline rows={2} />

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
