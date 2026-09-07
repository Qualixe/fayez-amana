import { createClient } from "@/lib/supabase/server";
import { FieldPair, TextField } from "../../_components/settings-fields";
import { saveProjectsSummarySettings } from "./actions";

export default async function ProjectsSummarySettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("projects_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string | number | null | undefined>);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Projects page — Summary</h1>

      <form action={saveProjectsSummarySettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="summary_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="summary_body" label="Body (English)" labelAr="النص (عربي)" row={s} multiline rows={4} />
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid gap-3 sm:grid-cols-3">
            <TextField name={`summary_link${n}_label`} label={`Quick link ${n} label (English)`} defaultValue={s[`summary_link${n}_label`]} />
            <TextField name={`summary_link${n}_label_ar`} label={`تسمية الرابط ${n} (عربي)`} defaultValue={s[`summary_link${n}_label_ar`]} />
            <TextField name={`summary_link${n}_href`} label={`Quick link ${n} URL`} defaultValue={s[`summary_link${n}_href`]} />
          </div>
        ))}
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid gap-3 sm:grid-cols-2">
            <FieldPair name={`summary_stat${n}_label`} label={`Stat ${n} label (English)`} labelAr={`تسمية الإحصائية ${n} (عربي)`} row={s} />
            <FieldPair name={`summary_stat${n}_value`} label={`Stat ${n} value (English)`} labelAr={`قيمة الإحصائية ${n} (عربي)`} row={s} />
          </div>
        ))}

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
