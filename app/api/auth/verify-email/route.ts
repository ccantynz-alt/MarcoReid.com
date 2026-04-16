import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Verification token is required." },
        { status: 400 },
      );
    }

    const record = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.json(
        { error: "This verification link is invalid." },
        { status: 400 },
      );
    }

    if (record.verifiedAt) {
      return NextResponse.json({
        message: "Your email is already verified.",
        alreadyVerified: true,
      });
    }

    if (record.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "This verification link has expired. Please request a new one." },
        { status: 400 },
      );
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { emailVerifiedAt: new Date() },
      }),
      prisma.emailVerificationToken.update({
        where: { id: record.id },
        data: { verifiedAt: new Date() },
      }),
    ]);

    return NextResponse.json({
      message: "Email verified successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
