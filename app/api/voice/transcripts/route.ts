import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const userId = (session.user as unknown as { id: string }).id;

    const transcripts = await prisma.voiceTranscript.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ transcripts });
  } catch (error) {
    console.error("Voice transcripts list error:", error);
    return NextResponse.json(
      { error: "Failed to load transcripts." },
      { status: 500 }
    );
  }
}
