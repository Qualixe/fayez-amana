"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const bilingualFields = [
  "application_eyebrow",
  "application_title",
  "application_note",
  "form_name_label",
  "form_email_label",
  "form_position_label",
  "form_cv_label",
  "form_cv_hint",
  "form_send_label",
  "form_sending_label",
  "form_call_label",
  "form_footer_note",
  "form_validation_error",
  "form_send_error",
  "form_network_error",
  "form_success_heading",
  "form_success_body",
] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveApplicationSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const { error } = await supabase.from("careers_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/careers/application-settings");
  revalidatePath("/careers");
}
