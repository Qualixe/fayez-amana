"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

const bilingualFields = ["footer_quote", "footer_est_line", "footer_marquee"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveSiteSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const uploadedHeaderLogo = await uploadImage(supabase, formData.get("header_logo_file"), "site");
  payload.header_logo = uploadedHeaderLogo ?? str(formData, "header_logo");
  const uploadedFooterLogo = await uploadImage(supabase, formData.get("footer_logo_file"), "site");
  payload.footer_logo = uploadedFooterLogo ?? str(formData, "footer_logo");

  const { error } = await supabase.from("site_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/site/settings");
  revalidatePath("/", "layout");
}
