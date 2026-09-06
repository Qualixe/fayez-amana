"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const bilingualFields = ["positions_eyebrow", "positions_title", "positions_lede"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function savePositionsSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const { error } = await supabase.from("careers_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/careers/positions-settings");
  revalidatePath("/careers");
}
