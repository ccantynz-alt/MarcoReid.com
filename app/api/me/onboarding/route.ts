import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { firmName, jurisdiction, practiceArea, complete } = body ?? {};

    const data: {
      firmName?: string | null;
      jurisdiction?: string | null;
      practiceArea?: string | null;
      onboardedAt?: Date;
    } = {};

    if (typeof firmName === "string") data.firmName = firmName.trim() || null;
    if (typeof jurisdiction === "string")
      data.jurisdiction = jurisdiction.trim() || null;
    if (typeof practiceArea === "string")
      data.practiceArea = practiceArea.trim() || null;
    if (complete === true) data.onboardedAt = new Date();

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        firmName: true,
        jurisdiction: true,
        practiceArea: true,
        onboardedAt: true,
      },
    });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json(
      { error: "Could not update profile." },
      { status: 500 },
    );
  }
}
