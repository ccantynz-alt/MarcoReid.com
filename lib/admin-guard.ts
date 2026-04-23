import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Server-side ADMIN gate for API routes. Returns null if the caller is
// authorised, or a NextResponse to short-circuit the route handler if not.
//
// Usage:
//   const guard = await requireAdmin();
//   if (guard) return guard;
//   // ...do admin work
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if ((session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  if ((session.user as { role?: string })?.role !== "ADMIN") return null;
  return session;
}
