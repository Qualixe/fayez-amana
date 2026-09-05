"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    number: String(formData.get("number") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    body_ar: String(formData.get("body_ar") ?? "").trim(),
    href: String(formData.get("href") ?? "").trim(),
    label: String(formData.get("label") ?? "").trim(),
    label_ar: String(formData.get("label_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createMethodArticle(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_detail_method_articles").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects/method-articles");
  revalidatePath("/projects");
  redirect("/admin/projects/method-articles");
}

export async function updateMethodArticle(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_detail_method_articles").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects/method-articles");
  revalidatePath("/projects");
  redirect("/admin/projects/method-articles");
}

export async function deleteMethodArticle(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_detail_method_articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects/method-articles");
  revalidatePath("/projects");
}
