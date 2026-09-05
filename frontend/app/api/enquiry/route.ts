import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.body ?? "").trim();

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Please add your name, a valid email, and a note about the work." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert({
    name,
    email,
    phone: body.phone ? String(body.phone) : null,
    scope: body.scope ? String(body.scope) : null,
    location: body.location ? String(body.location) : null,
    budget: body.budget ? String(body.budget) : null,
    sector: body.sector ? String(body.sector) : null,
    message,
    locale: body.locale === "ar" ? "ar" : "en",
  });

  if (error) {
    console.error("[contact enquiry] insert failed", error);
    return NextResponse.json(
      { ok: false, message: "We couldn't send that just now. Please try again, or email us at info@fayezamana.com.sa." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
