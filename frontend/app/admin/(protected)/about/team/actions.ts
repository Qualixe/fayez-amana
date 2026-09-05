"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    role: String(formData.get("role") ?? "").trim(),
    role_ar: String(formData.get("role_ar") ?? "").trim(),
    count: Number(formData.get("count") ?? 0) || 0,
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createTeamCategory(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_categories").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/team");
  revalidatePath("/about");
  redirect("/admin/about/team");
}

export async function updateTeamCategory(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_categories").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/team");
  revalidatePath("/about");
  redirect("/admin/about/team");
}

export async function deleteTeamCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/team");
  revalidatePath("/about");
}
