"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const bilingualFields = [
  "services_eyebrow",
  "services_title1",
  "services_title2",
  "services_lede",
  "services_note",
  "services_explore",
] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveServicesSectionSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const { error } = await supabase.from("home_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/home/services-settings");
  revalidatePath("/");
}
