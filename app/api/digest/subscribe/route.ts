import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { writeAuditLog } from "@/lib/audit";
import { rateLimit, rateLimitResponse, LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

const VALID_FREQUENCIES = ["DAILY", "WEEKDAYS", "WEEKLY"] as const;
type Frequency = (typeof VALID_FREQUENCIES)[number];

const VALID_JURISDICTIONS = ["NZ", "AU", "UK", "US"] as const;

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const limit = await rateLimit({
      key: `digest-subscribe:${ip}`,
      ...LIMITS.authRegister,
    });
    if (!limit.ok) return rateLimitResponse(limit);

    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const jurisdictionsRaw: unknown[] = Array.isArray(body.jurisdictions)
      ? body.jurisdictions
      : [];
    const specialtiesRaw: unknown[] = Array.isArray(body.specialties)
      ? body.specialties
      : [];
    const frequencyRaw = String(body.frequency || "DAILY").toUpperCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 },
      );
    }
    if (!VALID_FREQUENCIES.includes(frequencyRaw as Frequency)) {
      return NextResponse.json(
        { error: "Frequency must be DAILY, WEEKDAYS, or WEEKLY." },
        { status: 400 },
      );
    }
    const jurisdictions = jurisdictionsRaw
      .map((j) => String(j).toUpperCase())
      .filter((j) =>
        VALID_JURISDICTIONS.includes(j as (typeof VALID_JURISDICTIONS)[number]),
      );
    if (jurisdictions.length === 0) {
      return NextResponse.json(
        { error: "Pick at least one jurisdiction." },
        { status: 400 },
      );
    }
    const specialties = specialtiesRaw
      .map((s) => String(s).trim().toLowerCase())
      .filter((s) => s.length > 0 && s.length < 64);

    const unsubscribeToken = randomBytes(24).toString("hex");

    // Upsert: re-subscribing with the same (email, frequency) updates the
    // existing row so users can refine specialties without polluting the
    // table.
    const sub = await prisma.digestSubscription.upsert({
      where: {
        email_frequency: {
          email,
          frequency: frequencyRaw as Frequency,
        },
      },
      create: {
        email,
        jurisdictions,
        specialties,
        frequency: frequencyRaw as Frequency,
        unsubscribeToken,
        active: true,
      },
      update: {
        jurisdictions,
        specialties,
        active: true,
      },
    });

    await writeAuditLog({
      actorEmail: email,
      action: "CONSENT_GRANT",
      resourceType: "DigestSubscription",
      resourceId: sub.id,
      after: {
        jurisdictions,
        specialties,
        frequency: frequencyRaw,
      },
      ipAddress: ip === "unknown" ? null : ip,
      userAgent: request.headers.get("user-agent")?.slice(0, 512) ?? null,
    });

    return NextResponse.json({
      ok: true,
      subscriptionId: sub.id,
      message: "Subscription saved. We'll send a confirmation email when the digest goes live.",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not save your subscription." },
      { status: 500 },
    );
  }
}
