import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { approveCdd } from "@/lib/aml/cdd";

export async function POST(
  _req: NextRequest,
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

    if (subject.riskLevel === "UNACCEPTABLE") {
      return NextResponse.json(
        {
          error:
            "Subject is UNACCEPTABLE risk and cannot be approved. Decline the relationship.",
        },
        { status: 409 },
      );
    }

    const updated = await approveCdd({
      subjectId: subject.id,
      approverUserId: userId,
    });
    return NextResponse.json({ subject: updated });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
