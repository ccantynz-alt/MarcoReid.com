// Runner-agnostic security-header and auth-guard scenarios.

import type { Scenario } from "./types";

export const securityHeadersPresent: Scenario = {
  name: "security headers present on homepage",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.header", name: "x-frame-options", equals: "DENY" },
    { type: "expect.header", name: "x-content-type-options", equals: "nosniff" },
    {
      type: "expect.header",
      name: "referrer-policy",
      equals: "strict-origin-when-cross-origin",
    },
    {
      type: "expect.header",
      name: "strict-transport-security",
      contains: "max-age=63072000",
    },
    {
      type: "expect.header",
      name: "content-security-policy",
      contains: "default-src 'self'",
    },
    { type: "expect.header", name: "permissions-policy", contains: "camera=()" },
  ],
};

export const dashboardRedirectsToLogin: Scenario = {
  name: "dashboard redirects to login when not authenticated",
  steps: [
    { type: "navigate", to: "/dashboard" },
    { type: "expect.url", matches: /login/ },
  ],
};

export const adminRedirectsToLogin: Scenario = {
  name: "admin redirects to login when not authenticated",
  steps: [
    { type: "navigate", to: "/admin" },
    { type: "expect.url", matches: /login/ },
  ],
};

export const loginPageLoads: Scenario = {
  name: "login page loads",
  steps: [
    { type: "navigate", to: "/login" },
    { type: "expect.status", status: 200 },
  ],
};

export const unknownRouteReturns404: Scenario = {
  name: "unknown route returns 404",
  steps: [
    { type: "navigate", to: "/nonexistent-page" },
    { type: "expect.status", status: 404 },
  ],
};
