import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/marco/:path*",
    "/voice/:path*",
    "/matters/:path*",
    "/clients/:path*",
    "/documents/:path*",
    "/trust/:path*",
    "/billing/:path*",
  ],
};
