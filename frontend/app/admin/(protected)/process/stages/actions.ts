"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function payload(formData: FormData) {
  return {
    no: Number(formData.get("no") ?? 0) || 0,
    title: String(formData.get("title") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    body_ar: String(formData.get("body_ar") ?? "").trim(),
  };
}

export async function createStage(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("process_stages").insert(payload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/process/stages");
  revalidatePath("/process");
  redirect("/admin/process/stages");
}

export async function updateStage(no: number, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("process_stages").update(payload(formData)).eq("no", no);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/process/stages");
  revalidatePath("/process");
  redirect("/admin/process/stages");
}

export async function deleteStage(no: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("process_stages").delete().eq("no", no);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/process/stages");
  revalidatePath("/process");
}
