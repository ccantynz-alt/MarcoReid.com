import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  let signoffs: Array<{
    id: string;
    kind: string;
    status: string;
    requestedAt: Date;
    proMatter: { id: string; summary: string; jurisdiction: string } | null;
    reviewer: { id: string; displayName: string } | null;
  }> = [];

  try {
    signoffs = await prisma.signoffRequest.findMany({
      where: { status: "PENDING" },
      orderBy: { requestedAt: "asc" },
      take: 200,
      select: {
        id: true,
        kind: true,
        status: true,
        requestedAt: true,
        proMatter: {
          select: { id: true, summary: true, jurisdiction: true },
        },
        reviewer: {
          select: { id: true, displayName: true },
        },
      },
    });
  } catch {
    signoffs = [];
  }

  return NextResponse.json({ signoffs });
}
