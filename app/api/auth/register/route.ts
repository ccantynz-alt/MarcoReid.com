import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendEmail, emailLayout } from "@/lib/email";
import { rateLimit, rateLimitResponse, LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

const VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    // Per-IP rate limit — prevents signup abuse.
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const limit = await rateLimit({
      key: `register:${ip}`,
      ...LIMITS.authRegister,
    });
    if (!limit.ok) return rateLimitResponse(limit);

    const { email, password, name, firmName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Invalid input." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const normalisedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalisedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: normalisedEmail,
        name: typeof name === "string" ? name.trim() : null,
        firmName: typeof firmName === "string" ? firmName.trim() || null : null,
        passwordHash,
      },
    });

    // Create email verification token
    const verificationToken = randomBytes(32).toString("hex");
    await prisma.emailVerificationToken.create({
      data: {
        token: verificationToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + VERIFICATION_TTL_MS),
      },
    });

    // Send welcome + verification email (fire-and-forget; do not block signup)
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const verifyUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
    const { html, text } = emailLayout({
      preheader: "Welcome to Marco Reid — please verify your email",
      heading: `Welcome${user.name ? `, ${user.name.split(" ")[0]}` : ""}.`,
      body: `
        <p>You&rsquo;re in. Your Marco Reid account is ready.</p>
        <p>Please verify your email address so we can deliver security alerts, billing receipts, and important account notices. This link expires in 24 hours.</p>
      `,
      cta: { href: verifyUrl, label: "Verify email" },
      footer:
        "If the button does not work, copy and paste this link into your browser:<br>" +
        `<span style="color:#4a5568;word-break:break-all;">${verifyUrl}</span><br><br>` +
        "Reid &amp; Associates Ltd · Auckland, New Zealand",
    });

    sendEmail({
      to: user.email,
      subject: "Welcome to Marco Reid — verify your email",
      html,
      text,
    }).catch(() => {
      // Swallow email errors — account creation is the priority.
    });

    return NextResponse.json(
      { message: "Account created successfully.", userId: user.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
