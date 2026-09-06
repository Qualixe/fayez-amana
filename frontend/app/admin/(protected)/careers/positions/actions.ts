"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    discipline: String(formData.get("discipline") ?? "").trim(),
    discipline_ar: String(formData.get("discipline_ar") ?? "").trim(),
    employment_type: String(formData.get("employment_type") ?? "").trim() || "Full-time",
    employment_type_ar: String(formData.get("employment_type_ar") ?? "").trim() || "دوام كامل",
    location: String(formData.get("location") ?? "").trim() || "Jeddah, KSA",
    location_ar: String(formData.get("location_ar") ?? "").trim() || "جدة، السعودية",
    team_size: Number(formData.get("team_size") ?? 1) || 1,
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/admin/careers/positions");
  revalidatePath("/careers");
}

export async function createPosition(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_positions").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/careers/positions");
}

export async function updatePosition(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_positions").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/careers/positions");
}

export async function deletePosition(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_positions").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
