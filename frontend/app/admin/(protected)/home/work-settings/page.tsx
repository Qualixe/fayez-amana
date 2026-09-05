import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveWorkSectionSettings } from "./actions";

export default async function WorkSectionSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("home_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Home page — Work section</h1>

      <form action={saveWorkSectionSettings} className="flex max-w-4xl flex-col gap-4">
        <FieldPair name="work_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="work_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={s} />
        <FieldPair name="work_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={s} />
        <FieldPair name="work_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={2} />
        <FieldPair name="work_all_projects" label="'All projects' link (English)" labelAr="رابط 'كل المشاريع' (عربي)" row={s} />
        <FieldPair name="work_view_project" label="'View project' label (English)" labelAr="تسمية 'عرض المشروع' (عربي)" row={s} />

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save work section settings
        </button>
      </form>
    </div>
  );
}
