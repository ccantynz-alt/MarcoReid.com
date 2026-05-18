import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const userId = (session.user as { id?: string } | undefined)?.id;
  const userEmail = (session.user as { email?: string | null } | undefined)
    ?.email;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent =
    request.headers.get("user-agent")?.slice(0, 512) ?? null;

  try {
    const body = await request.json();
    const credential = String(body.credential || "").trim();
    const registrationNumber = String(body.registrationNumber || "").trim();
    const jurisdiction = String(body.jurisdiction || "").trim();
    const reviewerNotes =
      typeof body.reviewerNotes === "string" && body.reviewerNotes.trim()
        ? body.reviewerNotes.trim()
        : null;

    if (!credential || !registrationNumber || !jurisdiction) {
      return NextResponse.json(
        {
          error:
            "Credential, registration number, and jurisdiction are all required for an approval.",
        },
        { status: 400 },
      );
    }

    const signoff = await prisma.signoffRequest.findUnique({
      where: { id },
      include: { draft: true },
    });
    if (!signoff) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (signoff.status !== "PENDING") {
      return NextResponse.json(
        { error: `This sign-off is already ${signoff.status}.` },
        { status: 409 },
      );
    }

    const now = new Date();
    // Compose the credential stamp string for the document attribution.
    const credentialStamp = `${credential} (${registrationNumber})`;

    const updated = await prisma.signoffRequest.update({
      where: { id },
      data: {
        status: "APPROVED",
        adminReviewerId: userId ?? null,
        reviewerNotes,
        reviewedAt: now,
        releasedAt: now,
      },
    });

    if (signoff.draft) {
      await prisma.documentDraft.update({
        where: { id: signoff.draft.id },
        data: {
          status: "SIGNED",
          signedByUserId: userId ?? null,
          signedByCredential: credentialStamp,
          signedByJurisdiction: jurisdiction,
          signedAt: now,
        },
      });
    }

    // Two audit rows: one for the sign-off approval, one for the draft
    // transition. Both flow through the same hash chain so a regulator
    // export can verify each step end-to-end.
    await writeAuditLog({
      actorId: userId ?? null,
      actorEmail: userEmail ?? null,
      action: "SIGNOFF_APPROVE",
      resourceType: "SignoffRequest",
      resourceId: updated.id,
      before: { status: "PENDING" },
      after: {
        status: "APPROVED",
        credential: credentialStamp,
        jurisdiction,
        reviewerNotes,
      },
      ipAddress: ip === "unknown" ? undefined : ip,
      userAgent,
    });

    if (signoff.draft) {
      await writeAuditLog({
        actorId: userId ?? null,
        actorEmail: userEmail ?? null,
        action: "UPDATE",
        resourceType: "DocumentDraft",
        resourceId: signoff.draft.id,
        before: { status: signoff.draft.status },
        after: {
          status: "SIGNED",
          signedByCredential: credentialStamp,
          signedByJurisdiction: jurisdiction,
          signedAt: now.toISOString(),
        },
        ipAddress: ip === "unknown" ? undefined : ip,
        userAgent,
      });
    }

    return NextResponse.json({ ok: true, signoffId: updated.id });
  } catch {
    return NextResponse.json(
      { error: "Could not complete the approval." },
      { status: 500 },
    );
  }
}
