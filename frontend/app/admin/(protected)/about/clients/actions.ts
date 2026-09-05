"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

async function payload(supabase: Awaited<ReturnType<typeof createClient>>, formData: FormData) {
  const uploadedUrl = await uploadImage(supabase, formData.get("image_file"), "clients");
  return {
    name: String(formData.get("name") ?? "").trim(),
    image: uploadedUrl ?? String(formData.get("image") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createClientLogo(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("clients").insert(await payload(supabase, formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/clients");
  revalidatePath("/about");
  redirect("/admin/about/clients");
}

export async function updateClientLogo(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("clients").update(await payload(supabase, formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/clients");
  revalidatePath("/about");
  redirect("/admin/about/clients");
}

export async function deleteClientLogo(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about/clients");
  revalidatePath("/about");
}
