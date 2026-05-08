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
    const reviewerNotes = String(body.reviewerNotes || "").trim();
    if (!reviewerNotes) {
      return NextResponse.json(
        { error: "Reviewer notes are required when rejecting." },
        { status: 400 },
      );
    }

    const signoff = await prisma.signoffRequest.findUnique({
      where: { id },
      include: { documentDraft: true },
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

    await prisma.signoffRequest.update({
      where: { id },
      data: {
        status: "REJECTED",
        adminReviewerId: userId ?? null,
        reviewerNotes,
        reviewedAt: now,
      },
    });

    if (signoff.documentDraft) {
      await prisma.documentDraft.update({
        where: { id: signoff.documentDraft.id },
        data: { status: "READY_FOR_REVIEW" },
      });
    }

    await writeAuditLog({
      actorId: userId ?? null,
      actorEmail: userEmail ?? null,
      action: "SIGNOFF_REJECT",
      resourceType: "SignoffRequest",
      resourceId: id,
      before: { status: "PENDING" },
      after: { status: "REJECTED", reviewerNotes },
      ipAddress: ip === "unknown" ? null : ip,
      userAgent,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not complete the rejection." },
      { status: 500 },
    );
  }
}
