import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail, emailLayout } from "@/lib/email";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

// 24 hour token validity
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export async function POST() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit — 3 resends per hour per user.
  const limit = await rateLimit({
    key: `verify-resend:${userId}`,
    limit: 3,
    windowSeconds: 60 * 60,
  });
  if (!limit.ok) return rateLimitResponse(limit);

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerifiedAt) {
      return NextResponse.json({
        message: "Your email is already verified.",
        alreadyVerified: true,
      });
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

    await prisma.emailVerificationToken.create({
      data: { token, userId: user.id, expiresAt },
    });

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const verifyUrl = `${baseUrl}/verify-email?token=${token}`;

    const { html, text } = emailLayout({
      preheader: "Verify your Marco Reid email",
      heading: "Verify your email",
      body: `
        <p>Thanks for joining Marco Reid. Please confirm this is your email address so we can deliver security alerts, billing receipts, and important account notices.</p>
        <p>This link will expire in 24 hours.</p>
      `,
      cta: { href: verifyUrl, label: "Verify email" },
      footer:
        "If you didn&rsquo;t create a Marco Reid account, you can safely ignore this email.<br><br>" +
        "Reid &amp; Associates Ltd · Auckland, New Zealand",
    });

    await sendEmail({
      to: user.email,
      subject: "Verify your Marco Reid email",
      html,
      text,
    });

    return NextResponse.json({ message: "Verification email sent." });
  } catch {
    return NextResponse.json(
      { error: "Could not send verification email." },
      { status: 500 },
    );
  }
}
