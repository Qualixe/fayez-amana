"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

const bilingualFields = [
  "hero_eyebrow",
  "hero_heading1",
  "hero_heading2",
  "hero_heading3",
  "hero_lede",
  "hero_meta1_label",
  "hero_meta1_value",
  "hero_meta2_label",
  "hero_meta2_value",
  "hero_meta3_label",
  "hero_meta3_value",
  "hero_meta4_label",
  "hero_meta4_value",
  "finishing_eyebrow",
  "finishing_heading",
  "finishing_body",
  "finishing_cta",
  "finishing_image_alt",
] as const;

const soloFields = ["intro_kicker", "intro_arabic_lede", "intro_english_lede"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveProcessPageSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of soloFields) payload[key] = str(formData, key);
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const uploadedHeroImage = await uploadImage(supabase, formData.get("hero_image_file"), "process");
  payload.hero_image = uploadedHeroImage ?? str(formData, "hero_image");

  const { error } = await supabase.from("process_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/process/page-settings");
  revalidatePath("/process");
}
