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

function revalidateAll() {
  revalidatePath("/admin/careers/trust-items");
  revalidatePath("/careers");
}

export async function createTrustItem(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_trust_items").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/careers/trust-items");
}

export async function updateTrustItem(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_trust_items").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/careers/trust-items");
}

export async function deleteTrustItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_trust_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
