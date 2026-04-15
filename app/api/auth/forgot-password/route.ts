import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { sendEmail, emailLayout } from "@/lib/email";

export const runtime = "nodejs";

// 1 hour token validity
const TOKEN_TTL_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    // Always return success to prevent email enumeration. Only actually send
    // the email if the account exists.
    if (user) {
      const token = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

      await prisma.passwordResetToken.create({
        data: { token, userId: user.id, expiresAt },
      });

      const baseUrl =
        process.env.NEXTAUTH_URL || "http://localhost:3000";
      const resetUrl = `${baseUrl}/reset-password?token=${token}`;

      const { html, text } = emailLayout({
        preheader: "Reset your Marco Reid password",
        heading: "Reset your password",
        body: `
          <p>We received a request to reset the password for your Marco Reid account.</p>
          <p>This link will expire in one hour. If you did not request a reset, you can safely ignore this email — your password will not change.</p>
        `,
        cta: { href: resetUrl, label: "Reset password" },
        footer:
          "If the button does not work, copy and paste this link into your browser:<br>" +
          `<span style="color:#4a5568;word-break:break-all;">${resetUrl}</span><br><br>` +
          "Reid &amp; Associates Ltd · Auckland, New Zealand",
      });

      await sendEmail({
        to: user.email,
        subject: "Reset your Marco Reid password",
        html,
        text,
      });
    }

    return NextResponse.json({
      message:
        "If an account exists for that email, a reset link has been sent.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
