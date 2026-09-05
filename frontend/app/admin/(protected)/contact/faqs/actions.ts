"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    page: String(formData.get("page") ?? "contact"),
    question: String(formData.get("question") ?? "").trim(),
    question_ar: String(formData.get("question_ar") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    answer_ar: String(formData.get("answer_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createFaq(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contact/faqs");
  revalidatePath("/contact");
  revalidatePath("/projects");
  redirect("/admin/contact/faqs");
}

export async function updateFaq(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contact/faqs");
  revalidatePath("/contact");
  revalidatePath("/projects");
  redirect("/admin/contact/faqs");
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contact/faqs");
  revalidatePath("/contact");
  revalidatePath("/projects");
}
