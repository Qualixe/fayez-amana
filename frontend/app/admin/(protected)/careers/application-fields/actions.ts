"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    field_key: String(formData.get("field_key") ?? "").trim().toLowerCase(),
    field_type: String(formData.get("field_type") ?? "text").trim(),
    label: String(formData.get("label") ?? "").trim(),
    label_ar: String(formData.get("label_ar") ?? "").trim(),
    placeholder: String(formData.get("placeholder") ?? "").trim(),
    placeholder_ar: String(formData.get("placeholder_ar") ?? "").trim(),
    options: String(formData.get("options") ?? "").trim(),
    options_ar: String(formData.get("options_ar") ?? "").trim(),
    required: formData.get("required") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/admin/careers/application-fields");
  revalidatePath("/careers");
}

export async function createApplicationField(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_application_fields").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/careers/application-fields");
}

export async function updateApplicationField(id: string, formData: FormData) {
  const supabase = await createClient();
  // field_key stays immutable after creation — it's the storage key for
  // already-submitted applications' extra_fields, so renaming it would
  // silently orphan historical answers.
  const { field_type, label, label_ar, placeholder, placeholder_ar, options, options_ar, required, sort_order } =
    payload(formData);
  const { error } = await supabase
    .from("career_application_fields")
    .update({ field_type, label, label_ar, placeholder, placeholder_ar, options, options_ar, required, sort_order })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/careers/application-fields");
}

export async function deleteApplicationField(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_application_fields").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
