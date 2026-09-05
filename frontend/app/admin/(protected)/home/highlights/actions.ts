"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    description_ar: String(formData.get("description_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createHighlight(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("home_highlights").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home/highlights");
  revalidatePath("/");
  redirect("/admin/home/highlights");
}

export async function updateHighlight(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("home_highlights").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home/highlights");
  revalidatePath("/");
  redirect("/admin/home/highlights");
}

export async function deleteHighlight(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("home_highlights").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home/highlights");
  revalidatePath("/");
}
