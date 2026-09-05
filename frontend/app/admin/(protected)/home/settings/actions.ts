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
  "services_eyebrow",
  "services_title1",
  "services_title2",
  "services_lede",
  "services_note",
  "services_explore",
  "work_eyebrow",
  "work_title1",
  "work_title2",
  "work_lede",
  "work_all_projects",
  "work_view_project",
  "clients_eyebrow",
  "clients_title1",
  "clients_title2",
  "clients_lede",
  "clients_marquee",
  "process_eyebrow",
  "process_title1",
  "process_title2",
  "process_lede",
  "process_cta",
] as const;

const soloFields = ["about_stat1_value", "about_stat2_value"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveHomeSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = { };
  for (const key of soloFields) payload[key] = str(formData, key);
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const uploadedAboutImage = await uploadImage(supabase, formData.get("about_image_file"), "home");
  payload.about_image = uploadedAboutImage ?? str(formData, "about_image");

  const uploadedVideo = await uploadImage(supabase, formData.get("hero_video_file"), "home");
  payload.hero_video = uploadedVideo ?? str(formData, "hero_video");

  const { error } = await supabase.from("home_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/home/settings");
  revalidatePath("/");
  revalidatePath("/about");
}
