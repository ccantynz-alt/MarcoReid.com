import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { DocumentKind } from "@prisma/client";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const documents = await prisma.document.findMany({
      where: { userId },
      include: {
        matter: { select: { id: true, title: true } },
        client: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ documents });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, fileName, fileUrl, fileSize, mimeType, kind, matterId, clientId } = body ?? {};
    if (!title || !fileName || !fileUrl || typeof fileSize !== "number" || !mimeType) {
      return NextResponse.json(
        { error: "title, fileName, fileUrl, fileSize, mimeType required" },
        { status: 400 }
      );
    }

    if (matterId) {
      const m = await prisma.matter.findFirst({ where: { id: matterId, userId } });
      if (!m) return NextResponse.json({ error: "Invalid matter" }, { status: 400 });
    }
    if (clientId) {
      const c = await prisma.client.findFirst({ where: { id: clientId, userId } });
      if (!c) return NextResponse.json({ error: "Invalid client" }, { status: 400 });
    }

    const document = await prisma.document.create({
      data: {
        userId,
        title,
        fileName,
        fileUrl,
        fileSize,
        mimeType,
        kind: (kind as DocumentKind) || DocumentKind.OTHER,
        matterId: matterId || null,
        clientId: clientId || null,
      },
    });
    return NextResponse.json({ document }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
