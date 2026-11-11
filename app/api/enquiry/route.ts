import { NextResponse } from "next/server";

// Simple in-memory rate limit (per server instance). Phase 3 moves this to the
// database and adds email notifications to the client.
const hits = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }

  if (body.website) return NextResponse.json({ ok: true }); // honeypot filled: drop silently

  const str = (k: string, max = 200) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");
  const enquiry = {
    name: str("name"), nationality: str("nationality"), whatsapp: str("whatsapp", 30), email: str("email"),
    school: str("school"), arrival: str("arrival", 20), message: str("message", 3000),
    services: Array.isArray(body.services) ? (body.services as unknown[]).filter((s) => typeof s === "string").slice(0, 10) : [],
    receivedAt: new Date().toISOString(),
  };
  if (!enquiry.name || !enquiry.email.includes("@") || !enquiry.whatsapp) {
    return NextResponse.json({ error: "Missing fields" }, { status: 422 });
  }

  console.log("[enquiry]", JSON.stringify(enquiry));
  return NextResponse.json({ ok: true });
}
