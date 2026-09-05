"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

const bilingualFields = [
  "hero_eyebrow",
  "hero_title1",
  "hero_title2",
  "hero_lede",
  "hero_meta1_label",
  "hero_meta1_value",
  "hero_meta2_label",
  "hero_meta2_value",
  "hero_meta3_label",
  "hero_meta3_value",
  "hero_meta4_label",
  "hero_meta4_value",
  "summary_eyebrow",
  "summary_body",
  "summary_link1_label",
  "summary_link2_label",
  "summary_link3_label",
  "summary_link4_label",
  "summary_stat1_label",
  "summary_stat1_value",
  "summary_stat2_label",
  "summary_stat2_value",
  "summary_stat3_label",
  "summary_stat3_value",
  "summary_stat4_label",
  "summary_stat4_value",
  "sectors_heading",
  "sectors_list",
  "spotlight_eyebrow",
  "spotlight_title",
  "spotlight_lede",
] as const;

const hrefFields = ["summary_link1_href", "summary_link2_href", "summary_link3_href", "summary_link4_href"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveProjectsPageSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of hrefFields) payload[key] = str(formData, key);
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const uploadedHeroImage = await uploadImage(supabase, formData.get("hero_image_file"), "projects-page");
  payload.hero_image = uploadedHeroImage ?? str(formData, "hero_image");

  const { error } = await supabase.from("projects_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects/page-settings");
  revalidatePath("/projects");
}
