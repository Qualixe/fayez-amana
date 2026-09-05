import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "site-images";

/**
 * Uploads an admin-submitted image file to Supabase Storage and returns its
 * public URL. Returns null if no file was submitted (input left empty),
 * so callers can fall back to the existing/typed-URL value.
 */
export async function uploadImage(
  supabase: SupabaseClient,
  file: FormDataEntryValue | null,
  folder: string,
): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
