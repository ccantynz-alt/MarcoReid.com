import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const signatureRequest = await prisma.signatureRequest.findFirst({
      where: { id, userId },
      include: {
        document: { select: { id: true, title: true } },
        matter: { select: { id: true, title: true } },
      },
    });
    if (!signatureRequest) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ signatureRequest });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const existing = await prisma.signatureRequest.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const { action } = body ?? {};

    const now = new Date();

    // Status transition actions
    const updates: Record<string, unknown> = {};

    switch (action) {
      case "send":
        if (existing.status !== "draft") {
          return NextResponse.json(
            { error: "Only draft requests can be sent" },
            { status: 400 },
          );
        }
        updates.status = "sent";
        updates.sentAt = now;
        break;

      case "mark_viewed":
        if (existing.status !== "sent") {
          return NextResponse.json(
            { error: "Only sent requests can be marked as viewed" },
            { status: 400 },
          );
        }
        updates.status = "viewed";
        updates.viewedAt = now;
        break;

      case "mark_signed":
        if (existing.status !== "sent" && existing.status !== "viewed") {
          return NextResponse.json(
            { error: "Only sent or viewed requests can be marked as signed" },
            { status: 400 },
          );
        }
        updates.status = "signed";
        updates.signedAt = now;
        break;

      case "mark_declined":
        if (existing.status !== "sent" && existing.status !== "viewed") {
          return NextResponse.json(
            { error: "Only sent or viewed requests can be marked as declined" },
            { status: 400 },
          );
        }
        updates.status = "declined";
        updates.declinedAt = now;
        break;

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const signatureRequest = await prisma.signatureRequest.update({
      where: { id },
      data: updates,
      include: {
        document: { select: { id: true, title: true } },
        matter: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json({ signatureRequest });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const existing = await prisma.signatureRequest.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (existing.status !== "draft") {
      return NextResponse.json(
        { error: "Only draft signature requests can be deleted" },
        { status: 400 },
      );
    }

    await prisma.signatureRequest.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
