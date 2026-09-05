"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

const bilingualFields = [
  "about_eyebrow",
  "about_title",
  "about_body",
  "about_stat1_label",
  "about_stat2_label",
  "about_our_story",
  "about_expertise_eyebrow",
  "about_expertise_p1",
  "about_expertise_p2",
  "about_expertise_tags",
] as const;

const soloFields = ["about_stat1_value", "about_stat2_value"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveAboutSectionSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of soloFields) payload[key] = str(formData, key);
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const uploadedImage = await uploadImage(supabase, formData.get("about_image_file"), "home");
  payload.about_image = uploadedImage ?? str(formData, "about_image");

  const { error } = await supabase.from("home_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/home/about-settings");
  revalidatePath("/");
  revalidatePath("/about");
}
