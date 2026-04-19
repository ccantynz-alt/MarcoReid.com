import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const userId = (session.user as unknown as { id: string }).id;

    // Verify transcript belongs to the user
    const transcript = await prisma.voiceTranscript.findFirst({
      where: { id, userId },
    });

    if (!transcript) {
      return NextResponse.json(
        { error: "Transcript not found." },
        { status: 404 }
      );
    }

    await prisma.voiceTranscript.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Voice transcript delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete transcript." },
      { status: 500 }
    );
  }
}
