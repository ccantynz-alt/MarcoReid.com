import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

// Basic admin impersonation. The full NextAuth JWT remains the admin's —
// we set a separate signed-ish cookie carrying the impersonated user id
// and the admin's id. Server code that wants to honour impersonation
// reads IMPERSONATION_COOKIE; the admin can always end the session via
// /api/admin/impersonate/end. The impersonation banner in the platform
// shell uses the same cookie to render.

export const IMPERSONATION_COOKIE = "marco_impersonation";
const COOKIE_MAX_AGE_SECONDS = 60 * 60; // 1 hour cap

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  let body: { userId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!body.userId || typeof body.userId !== "string") {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const target = await prisma.user.findUnique({
    where: { id: body.userId },
    select: { id: true, name: true, email: true },
  });
  if (!target) {
    return NextResponse.json(
      { error: "Target user not found" },
      { status: 404 },
    );
  }

  const store = await cookies();
  const payload = JSON.stringify({
    impersonatingUserId: target.id,
    name: target.name,
    email: target.email,
    startedAt: new Date().toISOString(),
  });
  store.set(IMPERSONATION_COOKIE, payload, {
    httpOnly: false, // banner reads this in the browser shell
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ ok: true, impersonating: target });
}
