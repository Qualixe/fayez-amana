import { NextResponse } from "next/server";

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

  // No email service is configured yet. Log the enquiry server-side so it
  // isn't silently dropped; wire this up to a real provider (e.g. Resend,
  // SMTP) before relying on this endpoint in production.
  console.log("[contact enquiry]", {
    name,
    email,
    phone: body.phone,
    scope: body.scope,
    location: body.location,
    budget: body.budget,
    sector: body.sector,
    body: message,
  });

  return NextResponse.json({ ok: true });
}
