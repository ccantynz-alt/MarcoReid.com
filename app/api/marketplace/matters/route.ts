import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";

// GET /api/marketplace/matters — list the current citizen's matters
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const matters = await prisma.proMatter.findMany({
    where: { citizenUserId: userId },
    include: {
      practiceArea: { select: { slug: true, name: true, domain: true, jurisdiction: true } },
      acceptedBy: { select: { displayName: true, professionalBody: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ matters });
}

// POST /api/marketplace/matters — citizen posts a new matter.
// Body: { practiceAreaSlug, summary, details, ackVersion, post }
//   - If `post` is true, status goes straight to AWAITING_PRO and postedAt stamps now.
//   - Otherwise status stays DRAFT so the citizen can come back to edit.
// The per-area ack snapshot is recorded on the ProMatter for evidentiary purposes.
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { practiceAreaSlug, summary, details, ackVersion, post } = (body ?? {}) as {
    practiceAreaSlug?: string;
    summary?: string;
    details?: string;
    ackVersion?: string;
    post?: boolean;
  };

  if (!practiceAreaSlug || !summary || !details) {
    return NextResponse.json(
      { error: "practiceAreaSlug, summary, and details are required" },
      { status: 400 },
    );
  }
  if (summary.length > 200) {
    return NextResponse.json({ error: "Summary must be 200 characters or fewer" }, { status: 400 });
  }
  if (details.length < 40) {
    return NextResponse.json({ error: "Details must be at least 40 characters" }, { status: 400 });
  }
  if (details.length > 8000) {
    return NextResponse.json({ error: "Details must be 8000 characters or fewer" }, { status: 400 });
  }

  const area = await prisma.practiceArea.findUnique({ where: { slug: practiceAreaSlug } });
  if (!area || !area.active) {
    return NextResponse.json({ error: "Practice area not available" }, { status: 400 });
  }

  if (post && !ackVersion) {
    return NextResponse.json(
      { error: "Per-area acknowledgment is required before posting" },
      { status: 400 },
    );
  }
  if (post && ackVersion !== area.ackVersion) {
    return NextResponse.json(
      { error: "Acknowledgment version is out of date — please re-read and re-acknowledge" },
      { status: 409 },
    );
  }

  const now = new Date();
  const status = post ? ProMatterStatus.AWAITING_PRO : ProMatterStatus.DRAFT;

  const matter = await prisma.proMatter.create({
    data: {
      citizenUserId: userId,
      practiceAreaId: area.id,
      jurisdiction: area.jurisdiction,
      summary,
      details,
      status,
      leadFeeInCents: area.leadFeeInCents,
      currency: area.currency,
      ackVersion: post ? area.ackVersion : null,
      ackAt: post ? now : null,
      postedAt: post ? now : null,
    },
  });

  return NextResponse.json({ matter }, { status: 201 });
}
