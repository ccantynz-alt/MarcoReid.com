import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

// POST /api/me/profile
// Updates the authenticated user's personal profile fields.
//
// Note: timeZone, practiceArea, and jurisdiction are not yet on the User
// model in prisma/schema.prisma. Once added (e.g. as String? fields), they
// will persist automatically. For now we accept them, log them server-side,
// and only persist `name`. Email is intentionally read-only here — change
// flow will live behind a verification endpoint.
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
        // TODO: add `practiceArea`, `jurisdiction`, `timeZone` to User model
        // and persist here.
      },
      select: {
        id: true,
        email: true,
        name: true,
        firmName: true,
      },
    });

    if (practiceArea || jurisdiction || timeZone) {
      console.log("[settings/profile] pending-schema fields", {
        userId,
        practiceArea,
        jurisdiction,
        timeZone,
      });
    }

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
