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

export async function createInspectionStep(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("services_inspection_steps").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/services/inspection-steps");
  revalidatePath("/services");
  redirect("/admin/services/inspection-steps");
}

export async function updateInspectionStep(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("services_inspection_steps").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/services/inspection-steps");
  revalidatePath("/services");
  redirect("/admin/services/inspection-steps");
}

export async function deleteInspectionStep(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services_inspection_steps").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/services/inspection-steps");
  revalidatePath("/services");
}
