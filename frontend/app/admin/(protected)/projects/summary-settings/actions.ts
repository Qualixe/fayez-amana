"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const bilingualFields = [
  "summary_eyebrow",
  "summary_body",
  "summary_link1_label",
  "summary_link2_label",
  "summary_link3_label",
  "summary_link4_label",
  "summary_stat1_label",
  "summary_stat1_value",
  "summary_stat2_label",
  "summary_stat2_value",
  "summary_stat3_label",
  "summary_stat3_value",
  "summary_stat4_label",
  "summary_stat4_value",
] as const;

const hrefFields = ["summary_link1_href", "summary_link2_href", "summary_link3_href", "summary_link4_href"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveProjectsSummarySettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of hrefFields) payload[key] = str(formData, key);
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const { error } = await supabase.from("projects_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects/summary-settings");
  revalidatePath("/projects");
}
