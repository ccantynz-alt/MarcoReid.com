import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { IMPERSONATION_COOKIE } from "../route";

// Ending impersonation must NOT require ADMIN — an admin who has begun
// impersonating another user effectively presents that user's role to
// the app, so a strict ADMIN gate here would leave them stuck. The
// cookie is set by an authenticated admin in the first place, so simply
// clearing it is safe.
export async function POST() {
  const store = await cookies();
  store.set(IMPERSONATION_COOKIE, "", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return NextResponse.json({ ok: true });
}
