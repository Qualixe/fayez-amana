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

async function servicePayload(supabase: Awaited<ReturnType<typeof createClient>>, formData: FormData) {
  const uploadedUrl = await uploadImage(supabase, formData.get("image_file"), "services");

  return {
    slug: str(formData.get("slug")),
    number: str(formData.get("number")),
    title: str(formData.get("title")),
    title_ar: str(formData.get("title_ar")),
    description: str(formData.get("description")),
    description_ar: str(formData.get("description_ar")),
    capabilities: lines(formData.get("capabilities")),
    capabilities_ar: lines(formData.get("capabilities_ar")),
    image: uploadedUrl ?? str(formData.get("image")),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

async function syncGallery(serviceId: string, gallerySlugs: string[]) {
  const supabase = await createClient();
  await supabase.from("service_gallery").delete().eq("service_id", serviceId);
  if (!gallerySlugs.length) return;

  const { data: matchedProjects } = await supabase
    .from("projects")
    .select("id, slug")
    .in("slug", gallerySlugs);

  const bySlug = new Map((matchedProjects ?? []).map((p) => [p.slug, p.id]));
  const rows = gallerySlugs
    .map((slug, index) => {
      const projectId = bySlug.get(slug);
      return projectId ? { service_id: serviceId, project_id: projectId, sort_order: index } : null;
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  if (rows.length) {
    await supabase.from("service_gallery").insert(rows);
  }
}

export async function createService(formData: FormData) {
  const supabase = await createClient();
  const payload = await servicePayload(supabase, formData);
  const { data, error } = await supabase.from("services").insert(payload).select("id").single();
  if (error) throw new Error(error.message);

  await syncGallery(data.id, lines(formData.get("gallery")));

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const supabase = await createClient();
  const payload = await servicePayload(supabase, formData);
  const { error } = await supabase
    .from("services")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  await syncGallery(id, lines(formData.get("gallery")));

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/services");
  revalidatePath("/services");
}
