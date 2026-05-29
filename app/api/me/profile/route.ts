import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

// POST /api/me/profile
// Updates the authenticated user's personal profile fields.
// Email is intentionally read-only here — changes live behind a verification endpoint.
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, practiceArea, jurisdiction, timeZone } = body;

  if (name !== undefined && typeof name !== "string") {
    return NextResponse.json({ error: "name must be a string" }, { status: 400 });
  }
  if (practiceArea !== undefined && typeof practiceArea !== "string") {
    return NextResponse.json(
      { error: "practiceArea must be a string" },
      { status: 400 }
    );
  }
  if (jurisdiction !== undefined && typeof jurisdiction !== "string") {
    return NextResponse.json(
      { error: "jurisdiction must be a string" },
      { status: 400 }
    );
  }
  if (timeZone !== undefined && typeof timeZone !== "string") {
    return NextResponse.json(
      { error: "timeZone must be a string" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(typeof name === "string" ? { name: name.trim() || null } : {}),
        ...(typeof practiceArea === "string" ? { practiceArea: practiceArea.trim() || null } : {}),
        ...(typeof jurisdiction === "string" ? { jurisdiction: jurisdiction.trim() || null } : {}),
        ...(typeof timeZone === "string" ? { timeZone: timeZone.trim() || null } : {}),
      },
      select: {
        id: true,
        email: true,
        name: true,
        firmName: true,
        practiceArea: true,
        jurisdiction: true,
        timeZone: true,
      },
    });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
