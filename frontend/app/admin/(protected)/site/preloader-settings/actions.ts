"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function savePreloaderSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {
    arabic_name: str(formData, "arabic_name"),
    english_name: str(formData, "english_name"),
    est_line: str(formData, "est_line"),
  };

  const uploadedLogo = await uploadImage(supabase, formData.get("logo_file"), "site");
  payload.logo = uploadedLogo ?? str(formData, "logo");

  const { error } = await supabase.from("preloader_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/site/preloader-settings");
  revalidatePath("/", "layout");
}
