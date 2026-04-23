import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { runCheck } from "@/lib/aml/cdd";
import {
  screenForAdverseMedia,
  screenForPep,
  screenForSanctions,
} from "@/lib/aml/screening-stub";
import type { CddCheckResult, CddCheckType } from "@prisma/client";

const TYPES: CddCheckType[] = [
  "IDENTITY",
  "ADDRESS",
  "PEP",
  "SANCTIONS",
  "ADVERSE_MEDIA",
  "SOURCE_OF_FUNDS",
  "BENEFICIAL_OWNERSHIP",
];

const RESULTS: CddCheckResult[] = [
  "CLEAR",
  "HIT",
  "REVIEW_REQUIRED",
  "PENDING",
  "ERROR",
];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const subject = await prisma.cddSubject.findUnique({ where: { id } });
    if (!subject || subject.firmId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      type,
      result: overrideResult,
      vendorRef,
      notes,
    }: {
      type?: CddCheckType;
      result?: CddCheckResult;
      vendorRef?: string;
      notes?: string;
    } = body ?? {};

    if (!type || !TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    // For PEP / SANCTIONS / ADVERSE_MEDIA we route through the screening
    // stub by default. Caller may still override the result for cases
    // such as manual review outcomes.
    let result: CddCheckResult;
    if (overrideResult && RESULTS.includes(overrideResult)) {
      result = overrideResult;
    } else if (type === "PEP") {
      result = (await screenForPep(subject.legalName, subject.dateOfBirth))
        .result;
    } else if (type === "SANCTIONS") {
      result = (
        await screenForSanctions(
          subject.legalName,
          subject.countryOfResidence,
        )
      ).result;
    } else if (type === "ADVERSE_MEDIA") {
      result = (await screenForAdverseMedia(subject.legalName)).result;
    } else {
      result = "CLEAR";
    }

    const check = await runCheck({
      subjectId: subject.id,
      type,
      result,
      vendorRef: vendorRef ?? null,
      notes: notes ?? null,
      performedById: userId,
    });

    return NextResponse.json({ check }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
