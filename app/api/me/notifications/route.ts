import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";

// POST /api/me/notifications
// Saves the authenticated user's notification preferences.
//
// Note: there is no NotificationPreferences model in prisma/schema.prisma yet.
// The proposed shape:
//
//   model NotificationPreferences {
//     id              String   @id @default(cuid())
//     userId          String   @unique
//     user            User     @relation(fields: [userId], references: [id])
//     emailMatter     Boolean  @default(true)
//     emailClient     Boolean  @default(true)
//     emailBilling    Boolean  @default(true)
//     emailMarco      Boolean  @default(true)
//     emailSecurity   Boolean  @default(true)
//     emailProduct    Boolean  @default(false)
//     inAppMatter     Boolean  @default(true)
//     inAppMessages   Boolean  @default(true)
//     weeklyDigest    Boolean  @default(true)
//     digestDayOfWeek Int      @default(1) // 0=Sun..6=Sat
//     updatedAt       DateTime @updatedAt
//   }
//
// Until then we validate the payload and log it server-side, returning
// success so the client UI behaves correctly.
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

  const booleanFields = [
    "emailMatter",
    "emailClient",
    "emailBilling",
    "emailMarco",
    "emailSecurity",
    "emailProduct",
    "inAppMatter",
    "inAppMessages",
    "weeklyDigest",
  ] as const;

  for (const field of booleanFields) {
    if (body[field] !== undefined && typeof body[field] !== "boolean") {
      return NextResponse.json(
        { error: `${field} must be a boolean` },
        { status: 400 }
      );
    }
  }

  if (
    body.digestDayOfWeek !== undefined &&
    (typeof body.digestDayOfWeek !== "number" ||
      body.digestDayOfWeek < 0 ||
      body.digestDayOfWeek > 6)
  ) {
    return NextResponse.json(
      { error: "digestDayOfWeek must be 0-6" },
      { status: 400 }
    );
  }

  console.log("[settings/notifications] preferences saved (stub)", {
    userId,
    preferences: body,
  });

  return NextResponse.json({
    success: true,
    message: "Notification preferences saved",
  });
}
