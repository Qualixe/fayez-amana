"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    body_ar: String(formData.get("body_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/admin/site/privacy-sections");
  revalidatePath("/privacy");
}

export async function createPrivacySection(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("privacy_page_sections").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/site/privacy-sections");
}

export async function updatePrivacySection(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("privacy_page_sections").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/site/privacy-sections");
}

export async function deletePrivacySection(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("privacy_page_sections").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
