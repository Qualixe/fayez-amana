"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    label: String(formData.get("label") ?? "").trim(),
    label_ar: String(formData.get("label_ar") ?? "").trim(),
    href: String(formData.get("href") ?? "").trim(),
    show_in_primary_nav: formData.get("show_in_primary_nav") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/admin/site/nav-links");
  revalidatePath("/", "layout");
}

export async function createNavLink(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("site_nav_links").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/site/nav-links");
}

export async function updateNavLink(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("site_nav_links").update(payload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/site/nav-links");
}

export async function deleteNavLink(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("site_nav_links").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
