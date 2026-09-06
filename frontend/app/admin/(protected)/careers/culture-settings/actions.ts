"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

const bilingualFields = ["culture_eyebrow", "culture_title"] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveCultureSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }

  const uploadedImage = await uploadImage(supabase, formData.get("culture_image_file"), "careers");
  payload.culture_image = uploadedImage ?? str(formData, "culture_image");

  const { error } = await supabase.from("careers_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/careers/culture-settings");
  revalidatePath("/careers");
}
