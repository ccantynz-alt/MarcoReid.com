import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(_req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const signatureRequests = await prisma.signatureRequest.findMany({
      where: { userId },
      include: {
        document: { select: { id: true, title: true } },
        matter: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ signatureRequests });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rl = await rateLimit({ key: `signatures:${userId}`, limit: 30, windowSeconds: 60 });
  if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  try {
    const body = await req.json();
    const { title, signerName, signerEmail, message, documentId, matterId, expiresAt, sendNow } =
      body ?? {};

    if (!title || !signerName || !signerEmail) {
      return NextResponse.json(
        { error: "title, signerName, and signerEmail are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signerEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Verify document belongs to user if provided
    if (documentId) {
      const doc = await prisma.document.findFirst({ where: { id: documentId, userId } });
      if (!doc) return NextResponse.json({ error: "Invalid document" }, { status: 400 });
    }

    // Verify matter belongs to user if provided
    if (matterId) {
      const matter = await prisma.matter.findFirst({ where: { id: matterId, userId } });
      if (!matter) return NextResponse.json({ error: "Invalid matter" }, { status: 400 });
    }

    const now = new Date();
    const signatureRequest = await prisma.signatureRequest.create({
      data: {
        userId,
        title: title.trim(),
        signerName: signerName.trim(),
        signerEmail: signerEmail.trim().toLowerCase(),
        message: message?.trim() || null,
        documentId: documentId || null,
        matterId: matterId || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        status: sendNow ? "sent" : "draft",
        sentAt: sendNow ? now : null,
      },
      include: {
        document: { select: { id: true, title: true } },
        matter: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json({ signatureRequest }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
