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
    label: "Soft launch",
    value: "NZ + AU",
    note: "Law and accounting · beachhead = tenancy + SME catch-up",
  },
  {
    label: "Shield doctrine",
    value: "Sign-off",
    note: "Every consumer-facing AI output approved by a licensed pro before release",
  },
  {
    label: "Target readiness",
    value: "Private beta",
    note: "Twenty founding firms in NZ + twenty in AU",
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
          "Six testimonials from lawyers, CPAs, judges with names and firms.",
        status: "done",
      },
      {
        title: "Case studies (3 detailed)",
        description:
          "Chen & Associates (immigration), Harper Tax Advisory, Katherine O'Brien Trial Law — each with metrics, pull quotes, timelines.",
        status: "done",
      },
      {
        title: "Changelog page",
        description:
          "Public changelog with 14 realistic Jan–Apr 2026 updates and category badges.",
        status: "done",
      },
      {
        title: "Trust centre page",
        description:
          "Compliance matrix, security summary, data residency, sub-processor list.",
        status: "done",
      },
      {
        title: "Status page (uptime)",
        description:
          "Six-service status grid with historical incidents and 90-day uptime.",
        status: "done",
      },
      {
        title: "Branded 500 error page",
        description:
          "On-brand 500 page with error digest reference and recovery links.",
        status: "done",
      },
      {
        title: "Branded 404 page",
        description:
          "Friendly 404 with Home / Dashboard / Support recovery links.",
        status: "done",
      },
      {
        title: "Customer logos section",
        description:
          "Need 5–10 logos (or anonymised labels like 'Law firms in 50 states').",
        status: "queued",
      },
      {
        title: "Testimonial headshots",
        description:
          "Add real photos to testimonials — currently initials only, hurts credibility.",
        status: "queued",
      },
      {
        title: "Cite sources on statistics",
        description:
          "Statistics like '45% of lawyers use 5–10 tools' need citation links.",
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
        description: "MDX-based blog for SEO thought leadership.",
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
          "/register page with name, firm, email, password, ToS/Privacy/AUP consent. Auto-login on success.",
        status: "done",
      },
      {
        title: "Password reset flow",
        description:
          "/forgot-password + /reset-password pages with cryptographic tokens, 1-hour TTL, single-use.",
        status: "done",
      },
      {
        title: "Transactional email system",
        description:
          "Branded email layout with Resend adapter. Welcome email on signup, reset email on request. Dev mode logs to console.",
        status: "done",
      },
      {
        title: "5-step onboarding wizard",
        description:
          "Welcome → firm profile (jurisdiction + practice area) → meet Marco → platform tour → ready. Skip at any step.",
        status: "done",
      },
      {
        title: "Toast notification system",
        description:
          "Success/error/info/warning toasts with auto-dismiss, screen-reader aria-live region, animated slide-in.",
        status: "done",
      },
      {
        title: "Skeleton loader primitives",
        description:
          "Skeleton, SkeletonText, SkeletonCard, SkeletonTable, SkeletonAvatar for consistent loading states.",
        status: "done",
      },
      {
        title: "Email verification flow",
        description:
          "Schema ready (EmailVerificationToken model). UI + API endpoints pending next wave.",
        status: "queued",
      },
      {
        title: "Rate limiting infrastructure",
        description:
          "Token-bucket limiter in lib/rate-limit.ts. Applied to register + forgot-password. Ready for Marco/Voice endpoints.",
        status: "done",
      },
      {
        title: "Rate limiting on Marco/Voice endpoints",
        description:
          "Infrastructure ready — needs wiring into /api/marco and /api/voice/transcribe.",
        status: "queued",
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
          "Command-centre style with 4 stat cards (active matters, hours, revenue, trust balance), Marco prompt, recent matters list, activity feed, module grid.",
        status: "done",
      },
      {
        title: "Toast notification system",
        description:
          "Success/error/info/warning toasts with auto-dismiss and aria-live. Ready for use across the platform.",
        status: "done",
      },
      {
        title: "Loading skeleton primitives",
        description:
          "Skeleton components ready — now need to be applied to every data-fetching page.",
        status: "done",
      },
      {
        title: "Apply skeletons to all list pages",
        description:
          "Matters, clients, documents, trust, billing need skeleton loaders on first paint.",
        status: "queued",
      },
      {
        title: "Beautiful empty states for all lists",
        description:
          "Illustrated empty states with CTAs and sample data suggestions.",
        status: "queued",
      },
      {
        title: "Inline form validation",
        description:
          "Field-level error messages, real-time feedback, confirmation dialogs.",
        status: "queued",
      },
      {
        title: "Matters list — search, sort, status tabs",
        description:
          "Debounced search, status tabs with live counts (All/Active/On hold/Closed), 5 sort modes, pending-state opacity, matter number subtitle, empty states.",
        status: "done",
      },
      {
        title: "Matter detail view with timeline",
        description:
          "4-metric bar (hours/billable/trust/docs), colour-coded timeline (5 event types), client card with avatar, documents and time entries split view, 'Ask Marco about this' link passes matterId.",
        status: "done",
      },
      {
        title: "Clients list — search, sort, avatars",
        description:
          "Debounced search across name/email/company/phone, sort by recent/name/company, avatar circles with initials, matter count badges, email mailto links.",
        status: "done",
      },
      {
        title: "Bulk actions on matters/clients",
        description:
          "Select multiple rows for bulk status change, export, delete. Not yet implemented.",
        status: "queued",
      },
      {
        title: "Documents — list, detail, upload modal",
        description:
          "/documents list with kind tabs (7 types) and debounced search; /documents/[id] with preview (image/PDF), download, delete; /documents/upload deep-linkable; drag-and-drop modal with focus trap and ARIA. Storage backend is stubbed (501 STORAGE_NOT_CONFIGURED for blobs, JSON fileUrl works); swap in S3/R2/Vercel Blob when ready.",
        status: "done",
      },
      {
        title: "Time tracking — timer, hub, entries",
        description:
          "/time hub with period tabs (Today/Week/Month/All), summary bar, filters, sort, search. TimerWidget with start/pause/stop, matter picker, localStorage persistence. FloatingTimer globally available. Quick-add form. Full table with inline edit, bulk actions (billable/non-billable/delete). /time/entry/[id]/edit page. API upgraded with q/matterId/billable/invoiced/from/to/sort + summary. DELETE blocked for invoiced entries.",
        status: "done",
      },
      {
        title: "Trust ledger with three-way reconciliation",
        description:
          "/trust command-centre (4 metrics, three-way reconciliation explainer, recent activity); /trust/[id] detail with live ledger, running balance, matter-linked transactions; /trust/new open-account form with opening deposit atomic. DEPOSIT/WITHDRAWAL/FEE_DRAW transaction form with overdraw prevention.",
        status: "done",
      },
      {
        title: "Invoice generator — full wizard",
        description:
          "/billing/invoices list with status tabs; /billing/invoices/new 4-step wizard (client → matter → time entries → tax/due); /billing/invoices/[id] print-ready invoice sheet with actions (print, PDF stub, mark sent/paid/void, email stub). Derived from invoiced TimeEntry rows; Invoice model drafted in prisma/schema.invoice.prisma for future merge.",
        status: "done",
      },
      {
        title: "Matter edit + delete",
        description:
          "/matters/[id]/edit with full form (title, number, practice area, client, status, description, closedAt) + inline delete confirmation.",
        status: "done",
      },
      {
        title: "Client edit + delete",
        description:
          "/clients/[id]/edit with contact fields, notes, inline delete confirmation warning about matter orphaning.",
        status: "done",
      },
      {
        title: "Marco chat interface",
        description:
          "Working baseline (MarcoChat component) with domain pills, jurisdiction, verification badges. /marco page wraps it with recent-queries sidebar (grouped Today/Yesterday/Last 7 days/Older) and 6 example prompts. Polish queued.",
        status: "in_progress",
      },
      {
        title: "Global ⌘K command palette",
        description:
          "CommandPaletteProvider with Cmd+K / Ctrl+K shortcut in platform layout. 20+ commands grouped by Navigate / Create / Settings / Help. Arrow-key nav, Enter to select, ESC to close, keyword matching. Trigger button in top bar.",
        status: "done",
      },
      {
        title: "Voice dictation — Voxlen engine port",
        description:
          "Full Voxlen port: Web Audio recording with AnalyserNode waveform (64-bar canvas at 60fps), 20+ voice commands (punctuation/delete/undo/caps/stop), 4 export formats (TXT/MD/JSON/SRT), 9 languages, grammar correction ready, session history with click-to-load.",
        status: "done",
      },
      {
        title: "Settings pages",
        description:
          "Full /settings area: profile, firm, team, billing, integrations, security, notifications, data. Left-rail nav on desktop, scrolling tabs on mobile. Auth-gated API endpoints for profile/firm/notifications.",
        status: "done",
      },
      {
        title: "Keyboard shortcuts",
        description:
          "⌘K palette, Space-to-start-timer on TimerWidget. ? help modal showing all shortcuts queued.",
        status: "in_progress",
      },
      {
        title: "Admin dashboard",
        description:
          "5-metric bar (users, verified, admins, firms, onboarded), user table with search + role filter, status chips (verified/onboarded/subscribed), quick links to build-status, system status, changelog.",
        status: "done",
      },
      {
        title: "Industry News hub (/news)",
        description:
          "Login-gated daily reading room aggregating 9 RSS feeds — ABA Journal, National Law Review, JD Supra, Reuters Legal, Courthouse News, Journal of Accountancy, Accounting Today, The Tax Adviser, IPWatchdog. Server-side fetch with 30-min cache, Promise.allSettled so one broken feed can't take the page down, category filter (legal/accounting/tax/ip/courts), grouped sections with source attribution and time-ago stamps.",
        status: "done",
      },
      {
        title: "Morning Briefing on dashboard",
        description:
          "Dashboard widget surfacing the day's top headlines with text-to-speech so lawyers and accountants can listen on the commute. Pulls from the same feed cache as /news.",
        status: "done",
      },
      {
        title: "News personalisation (practice area + jurisdiction)",
        description:
          "Per-user filter so a NZ property lawyer doesn't see US class-action headlines. Store preferences on User (practiceAreas[], jurisdictions[]) and filter feed results server-side. Defaults derived from onboarding answers.",
        status: "queued",
      },
      {
        title: "Save / bookmark / mark-read on news",
        description:
          "Per-user persistence — bookmark an article, mark as read, resume where you left off. Needs NewsBookmark + NewsRead models on Prisma, optimistic UI, and a 'Saved' tab on /news.",
        status: "queued",
      },
      {
        title: "Daily email digest",
        description:
          "Morning email with the user's top 10 headlines, segmented by practice area, delivered via Resend. Opt-in at onboarding with a one-click unsubscribe. Same feed cache, rendered through the branded email layout.",
        status: "queued",
      },
      {
        title: "Multi-jurisdiction news sources (NZ / AU / UK / CA)",
        description:
          "US-heavy today. Add LawNews NZ, Lawyers Weekly AU, Law Society Gazette UK, Canadian Lawyer, plus tax-authority release feeds (IRD, ATO, HMRC, CRA) so Marco Reid delivers on its five-jurisdiction positioning.",
        status: "queued",
      },
    ],
  },
  {
    title: "Marketplace — Two-sided platform",
    description:
      "The NZ + AU soft-launch target. Citizens post matters, verified professionals accept them, every AI output passes through a sign-off queue before release.",
    items: [
      {
        title: "Platform acknowledgment at signup",
        description:
          "Five plain-language bullets shown on /register in addition to the standard ToS/Privacy/AUP checkbox. Version + timestamp + IP + user-agent captured per user for the evidentiary record. Explicitly preserves non-waivable CGA 1993 (NZ) and ACL (AU) consumer rights — we own the carve-out instead of pretending it doesn't exist.",
        status: "done",
      },
      {
        title: "Marketplace Prisma spine",
        description:
          "PracticeArea, Professional, ProfessionalPracticeArea, ProMatter, SignoffRequest models with ProfessionDomain, ProMatterStatus, SignoffStatus enums. Fee model is flat lead fee + SaaS, never a % take-rate — respects ABA Model Rule 5.4 and NZ Lawyers and Conveyancers Act.",
        status: "done",
      },
      {
        title: "Beachhead practice areas seeded",
        description:
          "Fourteen practice areas across NZ + AU: tenancy, SME tax catch-up, employment, separation & parenting, wills, small claims (Disputes Tribunal / state tribunals), immigration, and sole-trader tax. Each seeded with its own versioned acknowledgment bullets for per-matter click-through.",
        status: "done",
      },
      {
        title: "/for-citizens marketing page",
        description:
          "Citizen-facing landing: hero, four-step explainer, beachhead practice-area cards, embedded platform statement, CTA to register. NZ + AU first.",
        status: "done",
      },
      {
        title: "/marketplace pro-signup page",
        description:
          "Lawyer/accountant-facing landing: qualified leads, flat fees, sign-off workflow, verification checklist, founding-firm programme for first 20 in NZ + AU.",
        status: "done",
      },
      {
        title: "Citizen intake flow",
        description:
          "Multi-step intake at /post-matter: jurisdiction → practice area → problem description → per-area acknowledgment → post. Creates ProMatter in DRAFT, transitions to AWAITING_PRO on post. Per-area ack version snapshotted on the matter row for evidentiary record. /my-matters lists status across the full lifecycle.",
        status: "done",
      },
      {
        title: "Professional acceptance flow",
        description:
          "/pro-dashboard lists AWAITING_PRO matters filtered by pro's verified practice areas AND admission jurisdiction. Verified + PI-current gate at API; optimistic updateMany on status prevents concurrent accepts winning the same matter.",
        status: "done",
      },
      {
        title: "Sign-off queue UI",
        description:
          "/pro-matter/[id] for the accepting pro to draft a sign-off request with SHA-256 tamper-evidence hash. /signoff queue with approve / amend / reject decisions. Amended release captures amendedSha256 alongside the original outputSha256 for audit.",
        status: "done",
      },
      {
        title: "Citizen-side signed-off output view",
        description:
          "/matter/[id] shows the citizen the released output once status = SIGNED_OFF, including the tamper-evidence hash and any reviewer notes. Closes the end-to-end loop.",
        status: "done",
      },
      {
        title: "Professional onboarding + verification workflow",
        description:
          "/pro-onboard captures admission details, PI insurance, and practice-area selection — jurisdiction gated. /admin/professionals verifies new applications with verifiedAt + verifiedBy (admin User.id) stamps.",
        status: "done",
      },
      {
        title: "Practice-area SEO landing pages",
        description:
          "/practice index + /practice/[slug] server-rendered from the DB seed. Schema.org Service markup per area with jurisdiction-aware offer price. Dynamic sitemap entries generated from active practice areas.",
        status: "done",
      },
      {
        title: "Email notifications on state transitions",
        description:
          "Fire-and-forget emails hook the three hot transitions: citizen posts → notify every matching verified PI-current pro; pro accepts → notify citizen with the pro's name + body; sign-off released → notify citizen the work is ready, flagged approved-as-is or amended. Dev mode logs to console; Resend adapter already wired for production.",
        status: "done",
      },
      {
        title: "Citizen cancel flow for unaccepted matters",
        description:
          "DELETE /api/marketplace/matters/[id] guarded on status — only DRAFT or AWAITING_PRO can be withdrawn. updateMany guard prevents a ghost cancellation racing a pro's accept. Surfaced on /matter/[id] with a confirm step.",
        status: "done",
      },
      {
        title: "Admin marketplace overview",
        description:
          "/admin/matters with total counts, a stalled-matters callout for AWAITING_PRO entries older than 48 hours, pending sign-off backlog, and a full active-matters table with citizen + pro columns. Links in from /admin.",
        status: "done",
      },
      {
        title: "Stripe Connect for lead fees + consumer fees",
        description:
          "Lead fee charged to citizen on post, platform keeps it. Consumer fees (for self-serve products) flow through Connect to the pro minus Marco Reid's flat facilitation fee.",
        status: "queued",
      },
      {
        title: "Regulatory memo (NZ + AU)",
        description:
          "Independent NZ lawyer + CA ANZ CPA review of ToS, sign-off architecture, and marketplace model. Non-negotiable before go-live.",
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
          "/help with category grid, /help/getting-started, /help/marco-research, /help/trust-accounts, /help/billing, /help/faq — 25 questions across 6 categories.",
        status: "done",
      },
      {
        title: "Free trial flow (14-day, no card)",
        description:
          "Let lawyers try before buying. Auto-convert with reminder emails.",
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
        title: "SEO — sitemap, robots, JSON-LD",
        description:
          "40+ URL sitemap, tightened robots (authenticated surfaces disallowed), Organization + SoftwareApplication schema, OG + Twitter metadata, keyword targeting for legal-tech.",
        status: "done",
      },
      {
        title: "Dynamic OG images",
        description:
          "Static og-image.png referenced in metadata. Dynamic per-page OG image generation pending (can use @vercel/og).",
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
          "Full dark mode across platform with toggle, settings page, and CSS tokens (marketing stays light).",
        status: "done",
      },
      {
        title: "Accessibility foundations",
        description:
          "Skip-to-content links on both marketing and platform shells. Global prefers-reduced-motion fallback. Consistent :focus-visible outline (navy-500, 2-3px offset). Toast has aria-live + role='status'. Deeper WCAG 2.1 AA audit still queued.",
        status: "done",
      },
      {
        title: "Deep WCAG 2.1 AA audit",
        description:
          "Focus traps in modals, ARIA landmark review, keyboard-only smoke test, axe-core CI check, colour contrast pass.",
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
        title: "Lawyer review of legal documents",
        description:
          "Once funded, get Terms, Privacy, DPA reviewed by a NZ/US lawyer.",
        status: "queued",
      },
    ],
  },
];
