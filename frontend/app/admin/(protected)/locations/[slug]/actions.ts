"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

const bilingualFields = [
  "hero_eyebrow",
  "hero_title1",
  "hero_title2",
  "hero_lede",
  "meta1_label",
  "meta1_value",
  "meta2_label",
  "meta2_value",
  "meta3_label",
  "meta3_value",
  "body_eyebrow",
  "body_title",
  "body_p1",
  "body_p2",
  "projects_eyebrow",
  "projects_title",
  "seo_title",
  "seo_description",
] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveLocationPage(slug: string, formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const uploadedImage = await uploadImage(supabase, formData.get("hero_image_file"), "locations");
  payload.hero_image = uploadedImage ?? str(formData, "hero_image");

  const { error } = await supabase.from("location_pages").update(payload).eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/locations/${slug}`);
  revalidatePath(`/construction-company-${slug}`);
}
