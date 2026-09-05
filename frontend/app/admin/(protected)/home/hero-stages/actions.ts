"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    code: String(formData.get("code") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    detail: String(formData.get("detail") ?? "").trim(),
    detail_ar: String(formData.get("detail_ar") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    period_ar: String(formData.get("period_ar") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createHeroStage(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("home_hero_stages").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home/hero-stages");
  revalidatePath("/");
  redirect("/admin/home/hero-stages");
}

export async function updateHeroStage(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("home_hero_stages").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home/hero-stages");
  revalidatePath("/");
  redirect("/admin/home/hero-stages");
}

export async function deleteHeroStage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("home_hero_stages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home/hero-stages");
  revalidatePath("/");
}
