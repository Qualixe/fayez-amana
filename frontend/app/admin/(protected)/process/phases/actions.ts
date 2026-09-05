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

export async function createPhase(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("process_phases").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/process/phases");
  revalidatePath("/process");
  redirect("/admin/process/phases");
}

export async function updatePhase(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("process_phases").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/process/phases");
  revalidatePath("/process");
  redirect("/admin/process/phases");
}

export async function deletePhase(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("process_phases").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/process/phases");
  revalidatePath("/process");
}
