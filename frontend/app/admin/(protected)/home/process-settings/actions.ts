"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const bilingualFields = [
  "process_eyebrow",
  "process_title1",
  "process_title2",
  "process_lede",
  "process_cta",
] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveProcessSectionSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const { error } = await supabase.from("home_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/home/process-settings");
  revalidatePath("/");
}
