import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "site-images";

// Matches the bucket's allowed_mime_types in 0018_storage_mime_allowlist.sql —
// checked here too so a rejected upload fails fast with a clear message
// instead of a raw Storage API error.
const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

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

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(
      `Unsupported file type "${file.type || "unknown"}". Allowed: PNG, JPEG, WEBP, GIF, AVIF images or MP4, WEBM, MOV videos.`,
    );
  }

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

const CV_BUCKET = "career-cvs";
const CV_MAX_BYTES = 3 * 1024 * 1024;

/**
 * Uploads a job applicant's CV to the private career-cvs bucket. Unlike
 * uploadImage, this returns the storage PATH (not a public URL) since the
 * bucket is private — admins read it back via a signed URL (see
 * getCvSignedUrl). Returns null if no file was submitted.
 */
export async function uploadCv(supabase: SupabaseClient, file: FormDataEntryValue | null): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;

  if (file.type !== "application/pdf") {
    throw new Error(`Unsupported file type "${file.type || "unknown"}". CVs must be a PDF.`);
  }
  if (file.size > CV_MAX_BYTES) {
    throw new Error("CV file is too large. Maximum size is 3 MB.");
  }

  const path = `${crypto.randomUUID()}.pdf`;
  const { error } = await supabase.storage.from(CV_BUCKET).upload(path, file, {
    contentType: "application/pdf",
    upsert: false,
  });
  if (error) throw new Error(`CV upload failed: ${error.message}`);

  return path;
}

/** Signed, time-limited URL an authenticated admin can use to view/download an applicant's CV. */
export async function getCvSignedUrl(supabase: SupabaseClient, path: string): Promise<string | null> {
  const { data, error } = await supabase.storage.from(CV_BUCKET).createSignedUrl(path, 60 * 10);
  if (error) return null;
  return data.signedUrl;
}
