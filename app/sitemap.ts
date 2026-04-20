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
  { path: "/for-citizens", changeFrequency: "weekly", priority: 0.9 },
  { path: "/immigration", changeFrequency: "monthly", priority: 0.7 },

  // Marketplace
  { path: "/marketplace", changeFrequency: "weekly", priority: 0.9 },

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
  const baseUrl = "https://marcoreid.com";

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/law`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/accounting`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/catch-up-centre`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/marco`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/dictation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/courtroom`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/security`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/for-small-business`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/for-startups`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/for-citizens`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/marketplace`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/compare/westlaw`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/clio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/quickbooks`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare/lexisnexis`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
