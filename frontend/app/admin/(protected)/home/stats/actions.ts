"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    value: Number(formData.get("value") ?? 0) || 0,
    suffix: String(formData.get("suffix") ?? "").trim(),
    label: String(formData.get("label") ?? "").trim(),
    label_ar: String(formData.get("label_ar") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    description_ar: String(formData.get("description_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/admin/home/stats");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function createStat(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("home_stats").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/home/stats");
}

export async function updateStat(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("home_stats").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/home/stats");
}

export async function deleteStat(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("home_stats").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
