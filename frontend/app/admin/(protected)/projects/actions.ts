"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function str(value: FormDataEntryValue | null): string {
  return String(value ?? "").trim();
}

function optionalStr(value: FormDataEntryValue | null): string | null {
  const trimmed = str(value);
  return trimmed.length ? trimmed : null;
}

async function projectPayload(supabase: Awaited<ReturnType<typeof createClient>>, formData: FormData) {
  const uploadedUrl = await uploadImage(supabase, formData.get("image_file"), "projects");

  return {
    slug: str(formData.get("slug")),
    title: str(formData.get("title")),
    display_title: lines(formData.get("display_title")),
    category: str(formData.get("category")),
    subtitle: str(formData.get("subtitle")),
    teaser: str(formData.get("teaser")),
    description: str(formData.get("description")),
    client: optionalStr(formData.get("client")),
    location: str(formData.get("location")),
    scope: str(formData.get("scope")),
    size: optionalStr(formData.get("size")),
    image: uploadedUrl ?? str(formData.get("image")),
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    title_ar: optionalStr(formData.get("title_ar")),
    display_title_ar: lines(formData.get("display_title_ar")),
    subtitle_ar: optionalStr(formData.get("subtitle_ar")),
    teaser_ar: optionalStr(formData.get("teaser_ar")),
    description_ar: optionalStr(formData.get("description_ar")),
    client_ar: optionalStr(formData.get("client_ar")),
    location_ar: optionalStr(formData.get("location_ar")),
    scope_ar: optionalStr(formData.get("scope_ar")),
    size_ar: optionalStr(formData.get("size_ar")),
  };
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const payload = await projectPayload(supabase, formData);
  const { error } = await supabase.from("projects").insert(payload);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  const payload = await projectPayload(supabase, formData);
  const { data: existing } = await supabase.from("projects").select("slug").eq("id", id).single();

  const { error } = await supabase
    .from("projects")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  if (existing?.slug) revalidatePath(`/projects/${existing.slug}`);
  if (payload.slug !== existing?.slug) revalidatePath(`/projects/${payload.slug}`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
