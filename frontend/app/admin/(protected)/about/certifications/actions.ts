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

export async function createCertification(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("certifications").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/certifications");
  revalidatePath("/about");
  redirect("/admin/about/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("certifications").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/certifications");
  revalidatePath("/about");
  redirect("/admin/about/certifications");
}

export async function deleteCertification(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("certifications").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/certifications");
  revalidatePath("/about");
}
