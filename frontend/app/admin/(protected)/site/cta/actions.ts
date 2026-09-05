"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveSiteCtaSettings(formData: FormData) {
  const supabase = await createClient();
  const uploadedImage = await uploadImage(supabase, formData.get("background_image_file"), "site");

  const { error } = await supabase.from("site_cta_settings").upsert({
    id: 1,
    eyebrow: str(formData, "eyebrow"),
    eyebrow_ar: str(formData, "eyebrow_ar"),
    title1: str(formData, "title1"),
    title1_ar: str(formData, "title1_ar"),
    title2: str(formData, "title2"),
    title2_ar: str(formData, "title2_ar"),
    lede: str(formData, "lede"),
    lede_ar: str(formData, "lede_ar"),
    start_project: str(formData, "start_project"),
    start_project_ar: str(formData, "start_project_ar"),
    background_image: uploadedImage ?? str(formData, "background_image"),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/site/cta");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/process");
  revalidatePath("/projects", "layout");
}
