import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/matters",
          "/clients",
          "/documents",
          "/voice",
          "/trust",
          "/billing",
          "/settings",
          "/admin",
          "/onboarding",
          "/build-status",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/verify-email",
        ],
      },
    ],
    sitemap: "https://marcoreid.com/sitemap.xml",
    host: "https://marcoreid.com",
  };
}
