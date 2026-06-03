import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const userEmail = (session?.user as { email?: string | null } | undefined)?.email;
  if (!session || !userId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = request.headers.get("user-agent")?.slice(0, 512) ?? null;

  let body: { action?: string; notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { action, notes } = body;

  if (!action || !["approve", "amend", "decline"].includes(action)) {
    return NextResponse.json(
      { error: "action must be one of: approve, amend, decline" },
      { status: 400 },
    );
  }

  if ((action === "amend" || action === "decline") && !notes?.trim()) {
    return NextResponse.json(
      { error: "notes are required when amending or declining" },
      { status: 400 },
    );
  }

  // Verify the professional owns this sign-off request
  const professional = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!professional) {
    return NextResponse.json(
      { error: "You do not have a professional profile." },
      { status: 403 },
    );
  }

  const signoff = await prisma.signoffRequest.findUnique({
    where: { id },
    include: { draft: true },
  });
  if (!signoff) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (signoff.professionalId !== professional.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!["PENDING", "AMENDED", "IN_REVIEW"].includes(signoff.status)) {
    return NextResponse.json(
      { error: `This request is already ${signoff.status} and cannot be updated.` },
      { status: 409 },
    );
  }

  const now = new Date();

  let newStatus: string;
  switch (action) {
    case "approve":
      newStatus = "APPROVED";
      break;
    case "amend":
      newStatus = "AMENDED";
      break;
    case "decline":
      newStatus = "REJECTED";
      break;
    default:
      newStatus = "PENDING";
  }

  const updated = await prisma.signoffRequest.update({
    where: { id },
    data: {
      status: newStatus,
      reviewerNotes: notes?.trim() ?? null,
      reviewedAt: now,
    },
  });

  // Update the linked draft if approving
  if (action === "approve" && signoff.draft) {
    await prisma.documentDraft.update({
      where: { id: signoff.draft.id },
      data: { status: "SIGNED", signedAt: now },
    });
  }

  await writeAuditLog({
    actorId: userId,
    actorEmail: userEmail ?? null,
    action: `SIGNOFF_${newStatus}`,
    resourceType: "SignoffRequest",
    resourceId: id,
    before: { status: signoff.status },
    after: { status: newStatus, reviewerNotes: notes?.trim() ?? null },
    ipAddress: ip === "unknown" ? null : ip,
    userAgent,
  });

  return NextResponse.json({ ok: true, status: updated.status });
}

// Support simple POST for native form submissions (no-JS fallback)
export async function POST(request: Request, context: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Read form body
  let action = "approve";
  let notes: string | undefined;
  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
    const formData = await request.formData();
    action = String(formData.get("action") ?? "approve");
    const rawNotes = formData.get("notes");
    if (rawNotes) notes = String(rawNotes);
  } else {
    try {
      const json = await request.json();
      action = json.action ?? "approve";
      notes = json.notes;
    } catch {
      action = "approve";
    }
  }

  // Delegate to PATCH logic by reconstructing a synthetic PATCH request
  const syntheticRequest = new Request(request.url, {
    method: "PATCH",
    headers: { "content-type": "application/json", ...Object.fromEntries(request.headers.entries()) },
    body: JSON.stringify({ action, notes }),
  });
  return PATCH(syntheticRequest, context);
}
