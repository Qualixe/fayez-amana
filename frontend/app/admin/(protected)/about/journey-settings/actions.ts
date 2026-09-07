"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const bilingualFields = ["journey_eyebrow", "journey_title1", "journey_title2", "journey_lede", "journey_counter_label", "journey_cta"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveAboutJourneySettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string | number> = {
    journey_counter_value: Number(formData.get("journey_counter_value") ?? 0) || 0,
  };
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const { error } = await supabase.from("about_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/about/journey-settings");
  revalidatePath("/about");
}
