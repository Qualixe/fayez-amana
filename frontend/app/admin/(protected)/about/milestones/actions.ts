"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    year: String(formData.get("year") ?? "").trim(),
    year_ar: String(formData.get("year_ar") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    description_ar: String(formData.get("description_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createMilestone(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("about_milestones").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/milestones");
  revalidatePath("/about");
  redirect("/admin/about/milestones");
}

export async function updateMilestone(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("about_milestones").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/milestones");
  revalidatePath("/about");
  redirect("/admin/about/milestones");
}

export async function deleteMilestone(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("about_milestones").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/milestones");
  revalidatePath("/about");
}
