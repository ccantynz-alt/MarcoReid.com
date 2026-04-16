import { MetadataRoute } from "next";

const BASE = "https://marcoreid.com";

interface Entry {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}

const entries: Entry[] = [
  // Primary
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },

  // Products
  { path: "/law", changeFrequency: "weekly", priority: 0.9 },
  { path: "/accounting", changeFrequency: "weekly", priority: 0.9 },
  { path: "/marco", changeFrequency: "weekly", priority: 0.9 },
  { path: "/dictation", changeFrequency: "weekly", priority: 0.9 },
  { path: "/courtroom", changeFrequency: "weekly", priority: 0.9 },
  { path: "/oracle", changeFrequency: "monthly", priority: 0.7 },

  // Audience pages
  { path: "/for-small-business", changeFrequency: "monthly", priority: 0.7 },
  { path: "/for-startups", changeFrequency: "monthly", priority: 0.7 },
  { path: "/immigration", changeFrequency: "monthly", priority: 0.7 },

  // Compare
  { path: "/compare/westlaw", changeFrequency: "monthly", priority: 0.7 },
  { path: "/compare/clio", changeFrequency: "monthly", priority: 0.7 },
  { path: "/compare/quickbooks", changeFrequency: "monthly", priority: 0.7 },
  { path: "/compare/lexisnexis", changeFrequency: "monthly", priority: 0.7 },

  // Resources
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-studies/immigration-firm", changeFrequency: "yearly", priority: 0.6 },
  { path: "/case-studies/tax-practice", changeFrequency: "yearly", priority: 0.6 },
  { path: "/case-studies/solo-litigator", changeFrequency: "yearly", priority: 0.6 },
  { path: "/changelog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/status", changeFrequency: "daily", priority: 0.5 },

  // Help
  { path: "/help", changeFrequency: "monthly", priority: 0.7 },
  { path: "/help/getting-started", changeFrequency: "monthly", priority: 0.6 },
  { path: "/help/marco-research", changeFrequency: "monthly", priority: 0.6 },
  { path: "/help/trust-accounts", changeFrequency: "monthly", priority: 0.6 },
  { path: "/help/billing", changeFrequency: "monthly", priority: 0.6 },
  { path: "/help/faq", changeFrequency: "monthly", priority: 0.7 },

  // Trust & security
  { path: "/security", changeFrequency: "monthly", priority: 0.8 },
  { path: "/trust-center", changeFrequency: "monthly", priority: 0.8 },

  // Legal
  { path: "/terms", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/acceptable-use", changeFrequency: "monthly", priority: 0.4 },
  { path: "/cookies", changeFrequency: "monthly", priority: 0.4 },
  { path: "/dmca", changeFrequency: "monthly", priority: 0.4 },
  { path: "/dpa", changeFrequency: "monthly", priority: 0.4 },
  { path: "/refunds", changeFrequency: "monthly", priority: 0.4 },

  // Courts (niche SEO)
  { path: "/courts", changeFrequency: "monthly", priority: 0.6 },
  { path: "/courts/bench", changeFrequency: "monthly", priority: 0.5 },
  { path: "/courts/docket", changeFrequency: "monthly", priority: 0.5 },
  { path: "/courts/filings", changeFrequency: "monthly", priority: 0.5 },
  { path: "/courts/pilot", changeFrequency: "monthly", priority: 0.5 },
  { path: "/courts/public", changeFrequency: "monthly", priority: 0.5 },
  { path: "/courts/reporter", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return entries.map((e) => ({
    url: `${BASE}${e.path}`,
    lastModified: now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
