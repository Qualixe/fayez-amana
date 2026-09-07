"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    label: String(formData.get("label") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/admin/site/preloader-stages");
  revalidatePath("/", "layout");
}

export async function createPreloaderStage(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("preloader_stages").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/site/preloader-stages");
}

export async function updatePreloaderStage(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("preloader_stages").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/site/preloader-stages");
}

export async function deletePreloaderStage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("preloader_stages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
