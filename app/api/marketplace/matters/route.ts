import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProMatterStatus } from "@prisma/client";

/**
 * POST /api/marketplace/matters
 *
 * Public citizen intake. Creates a ProMatter from the for-citizens
 * landing form. The intake is the *posted* state — `AWAITING_PRO` in
 * the existing enum, which is semantically equivalent to the chunk's
 * "INTAKE" wording. Using existing enum values to avoid touching the
 * marketplace enum until a behaviour genuinely needs a new state.
 *
 * If the submitter already has a User row, link to it. Otherwise we
 * upsert a placeholder shell user keyed by email — they can claim it
 * later via the standard register / verify-email flow.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email as string | undefined)?.trim().toLowerCase();
  const summary = (body.summary as string | undefined)?.trim();
  const details = (body.details as string | undefined)?.trim();
  const practiceAreaId = (body.practiceAreaId as string | undefined)?.trim();
  const jurisdictionRaw = (body.jurisdiction as string | undefined)?.trim();
  const budgetHint = (body.budgetHint as string | undefined)?.trim() || null;
  const consumerFeeInCents =
    typeof body.consumerFeeInCents === "number"
      ? body.consumerFeeInCents
      : null;

  if (!email || !summary || !practiceAreaId) {
    return NextResponse.json(
      { error: "email, summary and practiceAreaId are required" },
      { status: 400 },
    );
  }

  const practiceArea = await prisma.practiceArea.findUnique({
    where: { id: practiceAreaId },
  });
  if (!practiceArea || !practiceArea.active) {
    return NextResponse.json(
      { error: "practiceArea not available" },
      { status: 400 },
    );
  }

  const jurisdiction = jurisdictionRaw || practiceArea.jurisdiction;

  // Resolve / create the citizen user.
  let citizen = await prisma.user.findUnique({ where: { email } });
  if (!citizen) {
    // Placeholder unguessable hash — the citizen claims this account via
    // the standard email-verification + reset flow before they can sign in.
    const placeholder = await hash(
      `claim-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      12,
    );
    citizen = await prisma.user.create({
      data: {
        email,
        name: (body.name as string | undefined)?.trim() || null,
        passwordHash: placeholder,
      },
    });
  }

  const detailsBody = [
    details || "",
    budgetHint ? `\n\nBudget hint: ${budgetHint}` : "",
  ]
    .join("")
    .trim();

  const matter = await prisma.proMatter.create({
    data: {
      citizenUserId: citizen.id,
      practiceAreaId: practiceArea.id,
      jurisdiction,
      summary,
      details: detailsBody || summary,
      // AWAITING_PRO is the posted-and-waiting state in the existing
      // enum — used here as the chunk's "INTAKE" label.
      status: ProMatterStatus.AWAITING_PRO,
      leadFeeInCents: practiceArea.leadFeeInCents,
      consumerFeeInCents,
      currency: practiceArea.currency,
      ackVersion: practiceArea.ackVersion,
      ackAt: new Date(),
      postedAt: new Date(),
    },
  });

  return NextResponse.json({ matter, status: "posted" }, { status: 201 });
}

/**
 * GET /api/marketplace/matters
 *
 * Admin-only. Lists matters for the assignment queue.
 * ?status=AWAITING_PRO (default) | ACCEPTED | all
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const statusParam = req.nextUrl.searchParams.get("status");
  const where =
    statusParam === "all"
      ? {}
      : statusParam &&
          (Object.values(ProMatterStatus) as string[]).includes(statusParam)
        ? { status: statusParam as ProMatterStatus }
        : { status: ProMatterStatus.AWAITING_PRO };

  const matters = await prisma.proMatter.findMany({
    where,
    include: {
      citizen: { select: { id: true, name: true, email: true } },
      practiceArea: {
        select: { id: true, slug: true, name: true, jurisdiction: true },
      },
      acceptedBy: { select: { id: true, displayName: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ matters });
}
