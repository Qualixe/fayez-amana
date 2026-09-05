"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveAboutSettings(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("about_settings").upsert({
    id: 1,
    eyebrow: str(formData, "eyebrow"),
    eyebrow_ar: str(formData, "eyebrow_ar"),
    title: str(formData, "title"),
    title_ar: str(formData, "title_ar"),
    lede: str(formData, "lede"),
    lede_ar: str(formData, "lede_ar"),
    total_count: Number(formData.get("total_count") ?? 0) || 0,
    total_label: str(formData, "total_label"),
    total_label_ar: str(formData, "total_label_ar"),
    management_title: str(formData, "management_title"),
    management_title_ar: str(formData, "management_title_ar"),
    management_body: str(formData, "management_body"),
    management_body_ar: str(formData, "management_body_ar"),
    admin_title: str(formData, "admin_title"),
    admin_title_ar: str(formData, "admin_title_ar"),
    admin_body: str(formData, "admin_body"),
    admin_body_ar: str(formData, "admin_body_ar"),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/settings");
  revalidatePath("/about");
}

export async function saveFounder(formData: FormData) {
  const supabase = await createClient();
  const uploadedUrl = await uploadImage(supabase, formData.get("photo_file"), "founder");
  const { error } = await supabase.from("founder").upsert({
    id: 1,
    eyebrow: str(formData, "eyebrow"),
    eyebrow_ar: str(formData, "eyebrow_ar"),
    title: str(formData, "title"),
    title_ar: str(formData, "title_ar"),
    name: str(formData, "name"),
    name_ar: str(formData, "name_ar"),
    role: str(formData, "role"),
    role_ar: str(formData, "role_ar"),
    quote: str(formData, "quote"),
    quote_ar: str(formData, "quote_ar"),
    p1: str(formData, "p1"),
    p1_ar: str(formData, "p1_ar"),
    p2: str(formData, "p2"),
    p2_ar: str(formData, "p2_ar"),
    photo: uploadedUrl ?? str(formData, "photo"),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/settings");
  revalidatePath("/about");
}
