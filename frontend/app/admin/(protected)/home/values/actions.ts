"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    letter: String(formData.get("letter") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    description_ar: String(formData.get("description_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/admin/home/values");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function createValue(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("core_values").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/home/values");
}

export async function updateValue(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("core_values").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/home/values");
}

export async function deleteValue(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("core_values").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
