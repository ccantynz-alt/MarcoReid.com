// Build status data. Update this file as phases progress.
// Status values: "done" | "in_progress" | "queued" | "blocked"

export type BuildStatus = "done" | "in_progress" | "queued" | "blocked";

export interface BuildItem {
  title: string;
  description: string;
  status: BuildStatus;
}

export interface BuildPhase {
  title: string;
  description: string;
  items: BuildItem[];
}

export const stats: { label: string; value: string; note: string }[] = [
  {
    label: "Audit rating",
    value: "6.5 / 10",
    note: "Marketing 9/10 · Platform 4/10",
  },
  {
    label: "Target readiness",
    value: "Private beta",
    note: "Invite-only launch to first 20 firms",
  },
  {
    label: "Quality bar",
    value: "Stripe-grade",
    note: "Must feel premium to attorneys and CPAs",
  },
];

export const phases: BuildPhase[] = [
  {
    title: "Foundation — Infrastructure & Legal",
    description:
      "The base you cannot ship without. Build pipeline, auth, database, legal wrapping.",
    items: [
      {
        title: "Next.js 16 app with Turbopack",
        description:
          "Modern React framework with app router and streaming rendering.",
        status: "done",
      },
      {
        title: "PostgreSQL database via Prisma 7",
        description:
          "Full schema for users, clients, matters, documents, trust, oracle, voice.",
        status: "done",
      },
      {
        title: "NextAuth authentication",
        description:
          "Credentials-based login with bcrypt password hashing (cost 12).",
        status: "done",
      },
      {
        title: "Stripe billing integration",
        description:
          "Subscription, billing portal, and Stripe Connect marketplace wired up.",
        status: "done",
      },
      {
        title: "OpenAI Whisper for voice",
        description:
          "Voice dictation via Whisper API, transcription stored per matter.",
        status: "done",
      },
      {
        title: "Anthropic Claude for Marco",
        description:
          "Research engine backed by Claude with citation verification.",
        status: "done",
      },
      {
        title: "Vercel deployment pipeline",
        description: "Builds passing on Vercel with all required env vars.",
        status: "done",
      },
      {
        title: "Terms of Service (20 sections)",
        description:
          "Arbitration, class action waiver, AI disclaimer, liability cap.",
        status: "done",
      },
      {
        title: "Privacy Policy (GDPR/CCPA/NZ)",
        description:
          "Legal bases, data subject rights, international transfers, retention schedule.",
        status: "done",
      },
      {
        title: "Acceptable Use Policy",
        description:
          "Professional responsibility rules, AI-specific prohibitions, enforcement.",
        status: "done",
      },
      {
        title: "Cookie Policy",
        description: "Essential-only approach with DNT support.",
        status: "done",
      },
      {
        title: "DMCA & Copyright Policy",
        description: "Takedown procedure with designated agent.",
        status: "done",
      },
      {
        title: "Data Processing Agreement",
        description: "GDPR-compliant processor terms and sub-processor list.",
        status: "done",
      },
      {
        title: "Refund & Cancellation Policy",
        description:
          "14-day guarantee, service credits, consumer law carve-outs.",
        status: "done",
      },
    ],
  },
  {
    title: "Marketing Site — Already Strong",
    description:
      "The audit rates the marketing surface 9/10. Shipping-quality. A few specific additions remain.",
    items: [
      {
        title: "Homepage hero",
        description:
          "Cinematic navy hero with animated gradient orbs, clear pain-point headline, dual CTAs.",
        status: "done",
      },
      {
        title: "Homepage feature showcase",
        description:
          "Five product sections (Legal, Marco, Voice, Courtroom, Accounting) with mockups.",
        status: "done",
      },
      {
        title: "About page with leadership team",
        description:
          "Six real bios with heavyweight credentials. Needs headshots added.",
        status: "done",
      },
      {
        title: "Pricing page",
        description:
          "Three-tier pricing for Legal, Accounting, and Marco. Transparent, no gotchas.",
        status: "done",
      },
      {
        title: "Product pages (Law, Accounting, Marco, Voice, Courtroom)",
        description:
          "All five product pages built with consistent template and compelling copy.",
        status: "done",
      },
      {
        title: "Compare pages (Clio, Westlaw, LexisNexis, QuickBooks)",
        description:
          "Honest head-to-head comparison tables with clear differentiators.",
        status: "done",
      },
      {
        title: "Security page",
        description:
          "FIPS 140-3, immutable audit trails, data residency, compliance matrix.",
        status: "done",
      },
      {
        title: "Contact page with form",
        description: "Functional contact form with success/error states.",
        status: "done",
      },
      {
        title: "404 error page",
        description: "Branded 404 with helpful recovery links.",
        status: "done",
      },
      {
        title: "Testimonials on homepage",
        description:
          "Six testimonials from attorneys, CPAs, judges with names and firms.",
        status: "done",
      },
      {
        title: "Customer logos section",
        description:
          "No customer logos currently on site. Need 5–10 with permission, or anonymised labels.",
        status: "queued",
      },
      {
        title: "Case studies (3 minimum)",
        description:
          "Real or composite stories with time/cost/ROI metrics. Currently missing.",
        status: "queued",
      },
      {
        title: "Testimonial headshots",
        description:
          "Add real photos to testimonials — missing currently, hurts credibility.",
        status: "queued",
      },
      {
        title: "Cite sources on statistics",
        description:
          "Statistics like '45% of lawyers use 5–10 tools' need citation links to build credibility.",
        status: "queued",
      },
      {
        title: "Changelog page",
        description: "Public changelog showing product velocity and transparency.",
        status: "queued",
      },
      {
        title: "Trust center page",
        description:
          "Single page surfacing security, compliance, data residency, sub-processors.",
        status: "queued",
      },
      {
        title: "Status page (uptime)",
        description:
          "Third-party or self-hosted status page showing system health.",
        status: "queued",
      },
      {
        title: "500 error page",
        description: "Branded 500 page matching design system. Currently generic.",
        status: "queued",
      },
      {
        title: "Careers page",
        description:
          "Open roles, culture, hiring process — even if no roles open yet.",
        status: "queued",
      },
      {
        title: "Resources / blog infrastructure",
        description:
          "MDX-based blog for SEO thought leadership. Not yet built.",
        status: "queued",
      },
    ],
  },
  {
    title: "Launch Blockers — Cannot Go Live Without These",
    description:
      "These items block the first paying customer. Fix these before anything else.",
    items: [
      {
        title: "Signup / register page",
        description:
          "No /register or /signup page exists today — only /login. This blocks the entire funnel.",
        status: "blocked",
      },
      {
        title: "Email verification flow",
        description:
          "Send verification email on signup, require click-through before full access.",
        status: "blocked",
      },
      {
        title: "Password reset flow",
        description:
          "Forgot password, reset token via email, new password entry.",
        status: "blocked",
      },
      {
        title: "Onboarding flow for new users",
        description:
          "Five-step guided setup: profile, firm, first client, first matter, explore Marco.",
        status: "blocked",
      },
      {
        title: "Transactional email system",
        description:
          "Branded welcome email, receipts, verification, password reset via Resend or Postmark.",
        status: "blocked",
      },
      {
        title: "Rate limiting on AI endpoints",
        description:
          "Marco and Voice endpoints need per-user rate limits to control costs and abuse.",
        status: "blocked",
      },
    ],
  },
  {
    title: "Platform — Dashboard Experience",
    description:
      "What paying customers use daily. Audit rated this 4/10 — feels like 2015 software. Must reach Stripe-grade.",
    items: [
      {
        title: "Dashboard redesign",
        description:
          "Command-centre style home with widgets, recent activity, quick actions, dashboard stats.",
        status: "queued",
      },
      {
        title: "Empty states for all list pages",
        description:
          "Beautiful illustrated empty states with sample data and CTAs.",
        status: "queued",
      },
      {
        title: "Loading skeletons",
        description:
          "Skeleton loaders on every page that fetches data — no blank screens.",
        status: "queued",
      },
      {
        title: "Toast notification system",
        description:
          "Consistent toast system for success, error, info messages app-wide. Currently missing entirely.",
        status: "queued",
      },
      {
        title: "Inline form validation",
        description:
          "Field-level error messages, real-time feedback, confirmation dialogs.",
        status: "queued",
      },
      {
        title: "Matters list — search, sort, filter, bulk actions",
        description:
          "Current table is basic. Needs power-user features expected of Stripe/Linear-tier SaaS.",
        status: "queued",
      },
      {
        title: "Matter detail view with timeline",
        description:
          "Full matter view with timeline, documents, time entries, trust balance, billing.",
        status: "queued",
      },
      {
        title: "Clients — search, sort, filter, engagement status",
        description:
          "Client directory with contact cards, matters, trust balance, billing history.",
        status: "queued",
      },
      {
        title: "Documents — upload, preview, versioning",
        description:
          "File upload with drag-drop, preview, versioning, matter linking.",
        status: "queued",
      },
      {
        title: "Time tracking widget",
        description:
          "Timer widget, manual entry, batch entry, conversion to invoice.",
        status: "queued",
      },
      {
        title: "Trust ledger with reconciliation view",
        description:
          "Deposit, withdrawal, transfer UX with three-way reconciliation view.",
        status: "queued",
      },
      {
        title: "Billing — invoice generator, payment tracking",
        description:
          "Generate branded invoices, track payments, manage subscriptions.",
        status: "queued",
      },
      {
        title: "Marco chat interface",
        description:
          "ChatGPT-quality research UX with citations, follow-ups, export to document.",
        status: "queued",
      },
      {
        title: "Marco ⌘K command palette",
        description:
          "Global Cmd+K to invoke Marco from anywhere, insert citations inline.",
        status: "queued",
      },
      {
        title: "Voice dictation UI polish",
        description:
          "Push-to-talk interface with live transcription, edit, insert into matter.",
        status: "queued",
      },
      {
        title: "Settings pages",
        description:
          "Profile, firm, team, billing, integrations, security, data export.",
        status: "queued",
      },
      {
        title: "Keyboard shortcuts + ? modal",
        description:
          "Power-user shortcuts for nav, actions, Marco — shown in a ? help modal.",
        status: "queued",
      },
      {
        title: "Admin page polish",
        description:
          "Current admin is minimal. Needs user management, usage analytics, feature flags.",
        status: "queued",
      },
    ],
  },
  {
    title: "Growth — Conversion & Acquisition",
    description:
      "How people find and sign up for Marco Reid without burning cash on ads.",
    items: [
      {
        title: "Help centre / docs site",
        description:
          "FAQ, getting-started guides (Legal + Accounting), video walkthroughs, support search.",
        status: "queued",
      },
      {
        title: "Free trial flow (14-day, no card)",
        description:
          "Let attorneys try before buying. Auto-convert with reminder emails.",
        status: "queued",
      },
      {
        title: "Demo booking (Calendly or in-app)",
        description:
          "Enterprise lead capture with calendar booking for 30-min demos.",
        status: "queued",
      },
      {
        title: "Newsletter signup",
        description:
          "Capture emails for product updates, legal tech insights, launch invites.",
        status: "queued",
      },
      {
        title: "Referral program (give-a-month, get-a-month)",
        description: "Stripe-based referral credits. High ROI for SaaS.",
        status: "queued",
      },
      {
        title: "SEO — metadata, schema, dynamic sitemap",
        description:
          "Per-page metadata, JSON-LD schema, dynamic sitemap, robots.txt.",
        status: "queued",
      },
      {
        title: "Open Graph dynamic images",
        description:
          "Dynamic OG images for every page. Twitter card support.",
        status: "queued",
      },
      {
        title: "Intercom / help widget",
        description:
          "In-app help chat for customer support during trial and paid.",
        status: "queued",
      },
      {
        title: "In-app notifications centre",
        description:
          "Bell icon, notification inbox, mark-as-read, link to relevant page.",
        status: "queued",
      },
    ],
  },
  {
    title: "Design System — Quality Floor",
    description:
      "Already strong (8.5/10 per audit). A few refinements to hit top of class.",
    items: [
      {
        title: "Design tokens — colour, type, spacing",
        description:
          "Navy / forest / plum / gold tokens with clamp() typography.",
        status: "done",
      },
      {
        title: "Reveal animation system",
        description:
          "Intersection Observer scroll reveals with staggered delays.",
        status: "done",
      },
      {
        title: "Button, card, container components",
        description: "Core components consistent across marketing and platform.",
        status: "done",
      },
      {
        title: "Mobile responsive audit",
        description:
          "All breakpoints (mobile, tablet, desktop, 4K) reviewed and polished.",
        status: "done",
      },
      {
        title: "Illustration library",
        description:
          "Custom SVG illustrations for empty states, heroes, feature sections.",
        status: "queued",
      },
      {
        title: "Icon library lock-in",
        description:
          "Pick one icon set (Lucide or Phosphor) and use consistently.",
        status: "queued",
      },
      {
        title: "Dark mode",
        description:
          "Full dark mode across platform (marketing can stay light).",
        status: "queued",
      },
      {
        title: "Accessibility audit (WCAG 2.1 AA)",
        description:
          "Focus traps, skip links, ARIA review, keyboard nav, contrast audit.",
        status: "queued",
      },
      {
        title: "Reduced-motion support",
        description:
          "Honour prefers-reduced-motion on all scroll animations.",
        status: "queued",
      },
    ],
  },
  {
    title: "Launch Readiness — Pre-Flight Checklist",
    description:
      "The final gate before first paying customer. Nothing here can be skipped.",
    items: [
      {
        title: "End-to-end Playwright tests",
        description:
          "Signup, subscribe, create matter, dictate, query Marco, generate invoice.",
        status: "queued",
      },
      {
        title: "Sentry error tracking",
        description: "Capture frontend and backend errors with source maps.",
        status: "queued",
      },
      {
        title: "Vercel Analytics or Plausible",
        description:
          "Privacy-respecting analytics for traffic and conversion funnels.",
        status: "queued",
      },
      {
        title: "Database backups with tested restore",
        description:
          "Automated daily backups with 30-day retention. Practice restore.",
        status: "queued",
      },
      {
        title: "Incident response runbook",
        description:
          "Written playbook for outages, breaches, payment disputes, data requests.",
        status: "queued",
      },
      {
        title: "First 20 design partners onboarded",
        description:
          "Hand-picked firms using the platform, giving feedback, willing to reference.",
        status: "queued",
      },
      {
        title: "Pricing validation",
        description:
          "Real customers confirming the price points before public launch.",
        status: "queued",
      },
      {
        title: "Attorney review of legal documents",
        description:
          "Once funded, get Terms, Privacy, DPA reviewed by a NZ/US attorney.",
        status: "queued",
      },
    ],
  },
];
