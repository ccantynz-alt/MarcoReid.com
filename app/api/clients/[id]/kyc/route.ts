import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify the client belongs to this user
    const existing = await prisma.client.findFirst({ where: { id, userId } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      kycStatus,
      kycRiskLevel,
      identityDocType,
      identityDocRef,
      sourceOfFunds,
      isPEP,
      kycNotes,
    } = body ?? {};

    // Build update payload
    const data: Record<string, unknown> = {};

    if (kycStatus !== undefined) data.kycStatus = kycStatus;
    if (kycRiskLevel !== undefined) data.kycRiskLevel = kycRiskLevel;
    if (identityDocType !== undefined) data.identityDocType = identityDocType;
    if (identityDocRef !== undefined) data.identityDocRef = identityDocRef;
    if (sourceOfFunds !== undefined) data.sourceOfFunds = sourceOfFunds;
    if (isPEP !== undefined) data.isPEP = isPEP;
    if (kycNotes !== undefined) data.kycNotes = kycNotes;

    // If marking as verified, record who and when
    if (kycStatus === "verified") {
      data.kycVerifiedAt = new Date();
      data.kycVerifiedBy = userId;
    }

    const client = await prisma.client.update({
      where: { id },
      data,
    });

    return NextResponse.json({ client });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
