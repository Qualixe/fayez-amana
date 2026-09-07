import { createClient } from "@/lib/supabase/server";
import { TextField } from "../../_components/settings-fields";
import { saveServicesQualityMetricsSettings } from "./actions";

export default async function ServicesQualityMetricsSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("services_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string | number | null | undefined>);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Services page — Quality metrics</h1>

      <form action={saveServicesQualityMetricsSettings} className="flex max-w-4xl flex-col gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid gap-3 border border-steel p-4 sm:grid-cols-2">
            <TextField name={`quality_metric${n}_value`} label={`Metric ${n} value (number)`} type="number" defaultValue={s[`quality_metric${n}_value`]} />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField name={`quality_metric${n}_suffix`} label="Suffix (English)" defaultValue={s[`quality_metric${n}_suffix`]} />
              <TextField name={`quality_metric${n}_suffix_ar`} label="اللاحقة (عربي)" defaultValue={s[`quality_metric${n}_suffix_ar`]} />
            </div>
            <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
              <TextField name={`quality_metric${n}_label`} label="Label (English)" defaultValue={s[`quality_metric${n}_label`]} />
              <TextField name={`quality_metric${n}_label_ar`} label="التسمية (عربي)" defaultValue={s[`quality_metric${n}_label_ar`]} />
            </div>
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
