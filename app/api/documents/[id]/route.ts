import { NextRequest, NextResponse } from "next/server";
import { DocumentKind } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

const VALID_KINDS = new Set<string>([
  "CONTRACT",
  "LETTER",
  "COURT_FILING",
  "EVIDENCE",
  "INVOICE",
  "RECEIPT",
  "OTHER",
]);

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const document = await prisma.document.findFirst({
      where: { id, userId },
      include: { matter: true, client: true },
    });
    if (!document) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ document });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const existing = await prisma.document.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json().catch(() => ({}));
    const { title, fileName, fileUrl, fileSize, mimeType, kind } = body ?? {};

    const data: Record<string, unknown> = {};
    if (typeof title === "string" && title.trim()) data.title = title.trim();
    if (typeof fileName === "string" && fileName.trim()) data.fileName = fileName.trim();
    if (typeof fileUrl === "string") data.fileUrl = fileUrl;
    if (typeof fileSize === "number" && !Number.isNaN(fileSize)) data.fileSize = fileSize;
    if (typeof mimeType === "string" && mimeType.trim()) data.mimeType = mimeType.trim();
    if (typeof kind === "string" && VALID_KINDS.has(kind)) data.kind = kind as DocumentKind;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const document = await prisma.document.update({ where: { id }, data });
    return NextResponse.json({ document });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const existing = await prisma.document.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await prisma.document.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
