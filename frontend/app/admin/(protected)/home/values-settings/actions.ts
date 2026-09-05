"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveValuesSettings(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("core_values_settings").upsert({
    id: 1,
    eyebrow: str(formData, "eyebrow"),
    eyebrow_ar: str(formData, "eyebrow_ar"),
    title: str(formData, "title"),
    title_ar: str(formData, "title_ar"),
    lede: str(formData, "lede"),
    lede_ar: str(formData, "lede_ar"),
    closing: str(formData, "closing"),
    closing_ar: str(formData, "closing_ar"),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/home/values-settings");
  revalidatePath("/");
  revalidatePath("/about");
}
