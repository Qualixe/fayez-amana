"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveProjectDetailSettings(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("project_detail_settings").upsert({
    id: 1,
    method_eyebrow: str(formData, "method_eyebrow"),
    method_eyebrow_ar: str(formData, "method_eyebrow_ar"),
    method_heading1: str(formData, "method_heading1"),
    method_heading1_ar: str(formData, "method_heading1_ar"),
    method_heading2: str(formData, "method_heading2"),
    method_heading2_ar: str(formData, "method_heading2_ar"),
    method_lede: str(formData, "method_lede"),
    method_lede_ar: str(formData, "method_lede_ar"),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects/detail-settings");
  revalidatePath("/projects");
}
