// Runner-agnostic navigation scenarios. Consumed by the Gatetest runner
// once the Marco Reid tenant is provisioned. No tooling SDK imports.

import type { Scenario } from "./types";

export const homepageLoads: Scenario = {
  name: "homepage loads with correct title",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.title", matches: /Marco Reid/ },
  ],
};

export const homepageHasHero: Scenario = {
  name: "homepage has a hero heading",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.visible", selector: "h1" },
  ],
};

export const headerNavVisible: Scenario = {
  name: "header navigation shows primary links",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.visible", role: "link", name: "Legal" },
    { type: "expect.visible", role: "link", name: "Pricing" },
  ],
};

export const footerLegalLinksVisible: Scenario = {
  name: "footer shows privacy and terms links",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.visible", role: "link", name: "Privacy Policy" },
    { type: "expect.visible", role: "link", name: "Terms of Service" },
  ],
};

// Top-level marketing routes — every one must respond 200 and match its title.
export const marketingRoutes: Scenario[] = [
  { path: "/law", title: /Legal/ },
  { path: "/accounting", title: /Accounting/ },
  { path: "/marco", title: /Marco/ },
  { path: "/dictation", title: /Voice/ },
  { path: "/courtroom", title: /Courtroom/ },
  { path: "/pricing", title: /Pricing/ },
  { path: "/about", title: /About/ },
  { path: "/contact", title: /Contact/ },
  { path: "/security", title: /Security/ },
  { path: "/privacy", title: /Privacy/ },
  { path: "/terms", title: /Terms/ },
  { path: "/for-small-business", title: /Small Business/ },
  { path: "/for-startups", title: /Startup/ },
].map((r) => ({
  name: `${r.path} loads successfully`,
  steps: [
    { type: "navigate", to: r.path },
    { type: "expect.status", status: 200 },
    { type: "expect.title", matches: r.title },
  ],
}));
