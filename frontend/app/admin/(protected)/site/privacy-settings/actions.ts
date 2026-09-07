"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function savePrivacySettings(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("privacy_page_settings").upsert({
    id: 1,
    eyebrow: str(formData, "eyebrow"),
    eyebrow_ar: str(formData, "eyebrow_ar"),
    heading: str(formData, "heading"),
    heading_ar: str(formData, "heading_ar"),
    intro: str(formData, "intro"),
    intro_ar: str(formData, "intro_ar"),
    last_updated: str(formData, "last_updated"),
    last_updated_ar: str(formData, "last_updated_ar"),
    last_updated_label: str(formData, "last_updated_label"),
    last_updated_label_ar: str(formData, "last_updated_label_ar"),
    footer_note: str(formData, "footer_note"),
    footer_note_ar: str(formData, "footer_note_ar"),
    toc_label: str(formData, "toc_label"),
    toc_label_ar: str(formData, "toc_label_ar"),
    contact_heading: str(formData, "contact_heading"),
    contact_heading_ar: str(formData, "contact_heading_ar"),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/site/privacy-settings");
  revalidatePath("/privacy");
}
