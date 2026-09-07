import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadCv } from "@/lib/supabase/storage";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const get = (key: string) => String(formData.get(key) ?? "").trim();
  const name = get("name");
  const email = get("email");
  const position = get("position");

  const cvFile = formData.get("cv");
  if (name.length < 2 || !EMAIL_RE.test(email) || position.length < 1 || !(cvFile instanceof File) || cvFile.size === 0) {
    return NextResponse.json(
      { ok: false, message: "Please add your name, a valid email, the position you're applying for, and attach your CV." },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  let cvPath: string | null = null;
  try {
    cvPath = await uploadCv(supabase, cvFile);
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: err instanceof Error ? err.message : "CV upload failed." },
      { status: 400 },
    );
  }

  const extraFields: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("field_") && typeof value === "string" && value.trim()) {
      extraFields[key.slice("field_".length)] = value.trim();
    }
  }

  const { error } = await supabase.from("career_applications").insert({
    name,
    email,
    phone: extraFields.phone ?? null,
    position,
    experience: extraFields.experience ?? null,
    cv_url: cvPath,
    extra_fields: extraFields,
    locale: get("locale") === "ar" ? "ar" : "en",
  });

  if (error) {
    console.error("[career application] insert failed", error);
    return NextResponse.json(
      { ok: false, message: "We couldn't send that just now. Please try again, or email us at info@fayezamana.com.sa." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
