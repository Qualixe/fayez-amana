"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

const bilingualFields = [
  "hero_eyebrow",
  "hero_title1",
  "hero_title2",
  "hero_title3",
  "hero_body",
  "hero_stat1_label",
  "hero_stat1_value",
  "hero_stat2_label",
  "hero_stat2_value",
  "hero_stat3_label",
  "hero_stat3_value",
  "hero_stat4_label",
  "hero_stat4_value",
  "expertise_eyebrow",
  "expertise_p1",
  "expertise_p2",
  "expertise_tags",
  "journey_eyebrow",
  "journey_title1",
  "journey_title2",
  "journey_lede",
  "journey_counter_label",
  "journey_cta",
  "why_eyebrow",
  "why_tagline",
  "why_title",
  "vision_eyebrow",
  "vision_title",
  "vision_closing",
] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveAboutPageSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string | number> = {
    journey_counter_value: Number(formData.get("journey_counter_value") ?? 0) || 0,
  };
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const uploadedHeroImage = await uploadImage(supabase, formData.get("hero_image_file"), "about");
  payload.hero_image = uploadedHeroImage ?? str(formData, "hero_image");
  const uploadedWhyImage = await uploadImage(supabase, formData.get("why_image_file"), "about");
  payload.why_image = uploadedWhyImage ?? str(formData, "why_image");

  const { error } = await supabase.from("about_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/about/page-settings");
  revalidatePath("/about");
}
