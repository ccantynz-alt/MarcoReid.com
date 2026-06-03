import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest & { nextauth?: { token?: { isTrialAccount?: boolean; trialEndsAt?: string | null } } }) {
    const token = req.nextauth?.token;

    // Trial expiry guard — redirect expired trial users to the upgrade page.
    // Pricing and sign-out remain accessible so they can convert or leave.
    if (token?.isTrialAccount && token.trialEndsAt) {
      const expired = new Date(token.trialEndsAt) < new Date();
      if (expired) {
        const { pathname } = req.nextUrl;
        const allowed =
          pathname.startsWith("/trial-expired") ||
          pathname.startsWith("/pricing") ||
          pathname.startsWith("/api/auth");
        if (!allowed) {
          return NextResponse.redirect(new URL("/trial-expired", req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/voice/:path*",
    "/matters/:path*",
    "/clients/:path*",
    "/documents/:path*",
    "/trust/:path*",
    "/billing/:path*",
    "/academy/learn/:path*",
  ],
};
