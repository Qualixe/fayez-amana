"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

const bilingualFields = [
  "hero_brand_line1",
  "hero_brand_line2",
  "hero_eyebrow",
  "hero_quote",
  "hero_services",
  "hero_start_project",
  "hero_view_portfolio",
  "hero_handover_label",
  "hero_handover_title1",
  "hero_handover_title2",
  "hero_handover_body",
  "hero_scroll_hint",
] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveHeroSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const uploadedVideo = await uploadImage(supabase, formData.get("hero_video_file"), "home");
  payload.hero_video = uploadedVideo ?? str(formData, "hero_video");

  const { error } = await supabase.from("home_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/home/hero-settings");
  revalidatePath("/", "layout");
  revalidatePath("/services");
}
