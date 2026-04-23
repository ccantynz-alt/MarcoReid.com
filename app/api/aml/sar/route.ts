import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import type { AmlJurisdiction } from "@prisma/client";

const ALLOWED: AmlJurisdiction[] = [
  "NZ_DIA",
  "AU_AUSTRAC",
  "UK_HMRC",
  "US_FINCEN",
];

export async function GET() {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reports = await prisma.sarReport.findMany({
    where: { firmId: userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ reports });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const {
      jurisdiction,
      narrative,
      subjectId,
      matterId,
    }: {
      jurisdiction?: AmlJurisdiction;
      narrative?: string;
      subjectId?: string;
      matterId?: string;
    } = body ?? {};

    if (!jurisdiction || !ALLOWED.includes(jurisdiction)) {
      return NextResponse.json(
        { error: "Invalid jurisdiction" },
        { status: 400 },
      );
    }
    if (!narrative || narrative.trim().length < 20) {
      return NextResponse.json(
        { error: "narrative is required (min 20 chars)" },
        { status: 400 },
      );
    }

    if (subjectId) {
      const s = await prisma.cddSubject.findUnique({
        where: { id: subjectId },
      });
      if (!s || s.firmId !== userId) {
        return NextResponse.json(
          { error: "subjectId not found" },
          { status: 400 },
        );
      }
    }

    const report = await prisma.sarReport.create({
      data: {
        firmId: userId,
        jurisdiction,
        narrative,
        subjectId: subjectId ?? null,
        matterId: matterId ?? null,
        status: "DRAFT",
      },
    });

    await prisma.amlAuditEntry.create({
      data: {
        firmId: userId,
        actorUserId: userId,
        action: "SAR_DRAFTED",
        subjectRef: report.id,
        payloadSha256: createHash("sha256").update(narrative).digest("hex"),
      },
    });

    return NextResponse.json({ report }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
