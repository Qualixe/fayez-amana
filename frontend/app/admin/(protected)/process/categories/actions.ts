"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    key: String(formData.get("key") ?? "").trim(),
    label: String(formData.get("label") ?? "").trim(),
    label_ar: String(formData.get("label_ar") ?? "").trim(),
    from_stage: Number(formData.get("from_stage") ?? 0) || 0,
    to_stage: Number(formData.get("to_stage") ?? 0) || 0,
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("process_categories").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/process/categories");
  revalidatePath("/process");
  redirect("/admin/process/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("process_categories").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/process/categories");
  revalidatePath("/process");
  redirect("/admin/process/categories");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("process_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/process/categories");
  revalidatePath("/process");
}
