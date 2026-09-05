"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    group_name: String(formData.get("group_name") ?? "scope"),
    value: String(formData.get("value") ?? "").trim(),
    label: String(formData.get("label") ?? "").trim(),
    label_ar: String(formData.get("label_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createOption(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_options").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contact/options");
  revalidatePath("/contact");
  redirect("/admin/contact/options");
}

export async function updateOption(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_options").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contact/options");
  revalidatePath("/contact");
  redirect("/admin/contact/options");
}

export async function deleteOption(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_options").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contact/options");
  revalidatePath("/contact");
}
