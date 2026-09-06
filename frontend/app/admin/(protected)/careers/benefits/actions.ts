"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    body: String(formData.get("body") ?? "").trim(),
    body_ar: String(formData.get("body_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/admin/careers/benefits");
  revalidatePath("/careers");
}

export async function createBenefit(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_benefits").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/careers/benefits");
}

export async function updateBenefit(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_benefits").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/careers/benefits");
}

export async function deleteBenefit(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_benefits").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
