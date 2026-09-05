"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    number: String(formData.get("number") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    description_ar: String(formData.get("description_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createVisionItem(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("about_vision_items").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/vision-items");
  revalidatePath("/about");
  redirect("/admin/about/vision-items");
}

export async function updateVisionItem(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("about_vision_items").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/vision-items");
  revalidatePath("/about");
  redirect("/admin/about/vision-items");
}

export async function deleteVisionItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("about_vision_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/vision-items");
  revalidatePath("/about");
}
