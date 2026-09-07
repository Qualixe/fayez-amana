"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveServicesQualityMetricsSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string | number> = {};
  for (const n of [1, 2, 3, 4]) {
    payload[`quality_metric${n}_value`] = Number(formData.get(`quality_metric${n}_value`) ?? 0) || 0;
    payload[`quality_metric${n}_suffix`] = str(formData, `quality_metric${n}_suffix`);
    payload[`quality_metric${n}_suffix_ar`] = str(formData, `quality_metric${n}_suffix_ar`);
    payload[`quality_metric${n}_label`] = str(formData, `quality_metric${n}_label`);
    payload[`quality_metric${n}_label_ar`] = str(formData, `quality_metric${n}_label_ar`);
  }

  const { error } = await supabase.from("services_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/services/quality-metrics-settings");
  revalidatePath("/services");
}
