import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail, emailLayout } from "@/lib/email";

interface RouteCtx {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, ctx: RouteCtx) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const { id } = await ctx.params;
  const professional = await prisma.professional.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, createdAt: true } },
      practiceAreas: {
        include: {
          practiceArea: {
            select: {
              id: true,
              slug: true,
              name: true,
              jurisdiction: true,
              domain: true,
            },
          },
        },
      },
    },
  });
  if (!professional) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ professional });
}

/**
 * POST /api/admin/professionals/[id]
 *
 * Body: { action: "approve" | "reject", reason?: string }
 *
 * Approve sets verifiedAt = now and stamps verifiedBy.
 * Reject deletes the Professional row entirely (so the user can re-apply
 * cleanly) and emails them. Email is stubbed to console in dev mode per
 * lib/email.ts.
 */
export async function POST(req: NextRequest, ctx: RouteCtx) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const adminId = (session.user as { id?: string })?.id;
  const { id } = await ctx.params;

  const body = (await req.json().catch(() => ({}))) as {
    action?: string;
    reason?: string;
  };
  const action = body.action;

  const pro = await prisma.professional.findUnique({
    where: { id },
    include: { user: { select: { email: true, name: true } } },
  });
  if (!pro) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (action === "approve") {
    const updated = await prisma.professional.update({
      where: { id },
      data: { verifiedAt: new Date(), verifiedBy: adminId },
    });

    const layout = emailLayout({
      preheader: "Your professional verification is complete.",
      heading: "You are verified.",
      body: `<p>Hi ${pro.user.name || "there"},</p><p>Your verification with Marco Reid has been approved. You can now accept matters from citizens on the platform.</p>`,
      cta: { href: "/professional/matters", label: "Open your matters" },
    });
    await sendEmail({
      to: pro.user.email,
      subject: "Verification approved",
      html: layout.html,
      text: layout.text,
    });

    return NextResponse.json({ professional: updated, action: "approved" });
  }

  if (action === "reject") {
    const reason = body.reason?.trim() || "Verification could not be completed.";
    // Delete the Professional row so the user can re-onboard cleanly.
    // Cascade deletes the M:N rows.
    await prisma.professionalPracticeArea.deleteMany({
      where: { professionalId: id },
    });
    await prisma.professional.delete({ where: { id } });

    const layout = emailLayout({
      preheader: "An update on your application.",
      heading: "Application not approved",
      body: `<p>Hi ${pro.user.name || "there"},</p><p>We were not able to approve your application at this time.</p><p><strong>Reason:</strong> ${reason}</p><p>You are welcome to submit again once the matter above is resolved.</p>`,
      cta: { href: "/professional/onboard", label: "Submit again" },
    });
    await sendEmail({
      to: pro.user.email,
      subject: "Verification update",
      html: layout.html,
      text: layout.text,
    });

    return NextResponse.json({ action: "rejected" });
  }

  return NextResponse.json(
    { error: "action must be 'approve' or 'reject'" },
    { status: 400 },
  );
}
