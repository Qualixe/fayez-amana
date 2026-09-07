"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveNotFoundSettings(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("site_not_found_settings").upsert({
    id: 1,
    eyebrow: str(formData, "eyebrow"),
    eyebrow_ar: str(formData, "eyebrow_ar"),
    message: str(formData, "message"),
    message_ar: str(formData, "message_ar"),
    primary_label: str(formData, "primary_label"),
    primary_label_ar: str(formData, "primary_label_ar"),
    secondary_label: str(formData, "secondary_label"),
    secondary_label_ar: str(formData, "secondary_label_ar"),
    call_prefix: str(formData, "call_prefix"),
    call_prefix_ar: str(formData, "call_prefix_ar"),
    email_prefix: str(formData, "email_prefix"),
    email_prefix_ar: str(formData, "email_prefix_ar"),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/site/not-found-settings");
}
