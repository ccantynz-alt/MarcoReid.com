import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import type { AmlJurisdiction } from "@prisma/client";

const ALLOWED_JURISDICTIONS: AmlJurisdiction[] = [
  "NZ_DIA",
  "AU_AUSTRAC",
  "UK_HMRC",
  "US_FINCEN",
];

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const jurisdictionParam = url.searchParams.get("jurisdiction");
  const where: { firmId: string; jurisdiction?: AmlJurisdiction } = {
    firmId: userId,
  };
  if (
    jurisdictionParam &&
    ALLOWED_JURISDICTIONS.includes(jurisdictionParam as AmlJurisdiction)
  ) {
    where.jurisdiction = jurisdictionParam as AmlJurisdiction;
  }

  const programs = await prisma.amlProgram.findMany({
    where,
    orderBy: [{ jurisdiction: "asc" }, { version: "desc" }],
  });
  return NextResponse.json({ programs });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const {
      jurisdiction,
      storedDocumentRef,
      documentBody,
    }: {
      jurisdiction?: AmlJurisdiction;
      storedDocumentRef?: string;
      documentBody?: string;
    } = body ?? {};

    if (
      !jurisdiction ||
      !ALLOWED_JURISDICTIONS.includes(jurisdiction)
    ) {
      return NextResponse.json(
        { error: "Invalid jurisdiction" },
        { status: 400 },
      );
    }
    if (!documentBody && !storedDocumentRef) {
      return NextResponse.json(
        {
          error:
            "documentBody (for hashing) or storedDocumentRef must be provided",
        },
        { status: 400 },
      );
    }

    const sha = documentBody
      ? createHash("sha256").update(documentBody).digest("hex")
      : createHash("sha256").update(storedDocumentRef!).digest("hex");

    // Roll the version: latest+1 per jurisdiction.
    const latest = await prisma.amlProgram.findFirst({
      where: { firmId: userId, jurisdiction },
      orderBy: { version: "desc" },
    });
    const version = (latest?.version ?? 0) + 1;

    const program = await prisma.amlProgram.create({
      data: {
        firmId: userId,
        jurisdiction,
        version,
        documentSha256: sha,
        storedDocumentRef: storedDocumentRef ?? `inline:v${version}`,
      },
    });

    await prisma.amlAuditEntry.create({
      data: {
        firmId: userId,
        actorUserId: userId,
        action: "PROGRAM_APPROVED",
        subjectRef: program.id,
        payloadSha256: sha,
      },
    });

    return NextResponse.json({ program }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
