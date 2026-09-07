"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const soloFields = ["intro_kicker", "intro_arabic_lede", "intro_english_lede"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveProcessIntroSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of soloFields) payload[key] = str(formData, key);

  const { error } = await supabase.from("process_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/process/intro-settings");
  revalidatePath("/process");
}
