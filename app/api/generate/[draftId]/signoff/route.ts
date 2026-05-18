import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { writeAuditLog } from "@/lib/audit";
import { rateLimit, rateLimitResponse, LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ draftId: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { draftId } = await params;

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const limit = await rateLimit({
      key: `signoff-request:${ip}`,
      ...LIMITS.authRegister,
    });
    if (!limit.ok) return rateLimitResponse(limit);

    const draft = await prisma.documentDraft.findUnique({
      where: { id: draftId },
    });
    if (!draft) {
      return NextResponse.json({ error: "Draft not found." }, { status: 404 });
    }
    if (draft.status === "SIGNED") {
      return NextResponse.json(
        { error: "This draft has already been signed." },
        { status: 409 },
      );
    }

    const body = await request.json();
    const requesterEmail = String(body.requesterEmail || "")
      .trim()
      .toLowerCase();
    const requesterNotes = String(body.requesterNotes || "").trim() || null;

    if (!requesterEmail || !requesterEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 },
      );
    }
    if (requesterNotes && requesterNotes.length > 2000) {
      return NextResponse.json(
        { error: "Notes are limited to 2000 characters." },
        { status: 400 },
      );
    }

    const userAgent =
      request.headers.get("user-agent")?.slice(0, 512) ?? null;
    const outputSha256 = createHash("sha256")
      .update(draft.body ?? "")
      .digest("hex");

    const signoff = await prisma.signoffRequest.create({
      data: {
        draftId: draft.id,
        kind: "public-document-draft",
        aiOutput: draft.body,
        outputSha256,
        jurisdiction: draft.jurisdiction,
        requesterEmail,
        requesterNotes,
        status: "PENDING",
      },
    });

    // Transition the draft into AWAITING_SIGNOFF and stamp the contact email
    // (handy if the user originally drafted anonymously and is now revealing
    // contact for the sign-off step).
    await prisma.documentDraft.update({
      where: { id: draft.id },
      data: {
        status: "AWAITING_SIGNOFF",
        contactEmail: draft.contactEmail ?? requesterEmail,
        signoffRequestId: signoff.id,
      },
    });

    await writeAuditLog({
      actorEmail: requesterEmail,
      action: "SIGNOFF_REQUEST",
      resourceType: "DocumentDraft",
      resourceId: draft.id,
      after: {
        signoffRequestId: signoff.id,
        jurisdiction: draft.jurisdiction,
      },
      ipAddress: ip === "unknown" ? null : ip,
      userAgent,
    });

    return NextResponse.json({
      ok: true,
      signoffRequestId: signoff.id,
      draftId: draft.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not submit your request." },
      { status: 500 },
    );
  }
}
