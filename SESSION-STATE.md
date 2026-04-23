# SESSION-STATE.md — The Flywheel

> **Read this file at the start of every Claude session. Write to it at the end of every Claude session.**
> This file is the persistent memory that prevents scatter-gun work across sessions.
> `IRON-LAW.md` and `Claude.MD` are the rules. `SESSION-STATE.md` is the memory.

---

## How the flywheel works

1. **Open a session** → the opening ritual reads `IRON-LAW.md`, `Claude.MD`, and then `SESSION-STATE.md` so Claude picks up exactly where the last session left off.
2. **Do the work** → commit changes to the designated feature branch.
3. **Close the session** → update `## Current state`, `## Next action`, and `## Decisions this session` below before pushing. Every session ends with this file updated.
4. **Next session** → Claude reads this file first. No more starting from scratch. No more scatter-gun.

This is the same flywheel pattern that `OracleQuery`, `OracleFeedback`, and `QueryPattern` use in the platform database — every query, every rating, every pattern logged so the next query is smarter than the last. We apply it to our own engineering sessions too.

---

## Current state — last updated 2026-04-23

**Branch:** `claude/infrastructure-catchup-bxUfH`

**Family alignment locked this session.** Marco Reid is one of four products Craig owns. The family:

- **Crontech** (crontech.ai) — platform, hosting, orchestrator, AI Builder
- **Gluecron** (gluecron.com) — git hosting
- **Gatetest** (gatetest.io) — automated E2E + visual QA
- **AlecRae** — transactional email

Marco Reid will onboard to Crontech as a deployed project (no rewrite — stays Next.js 16). The repo dogfoods the family end-to-end: AlecRae for email, Gatetest for E2E, Gluecron for git (migration to follow), Crontech orchestrator for hosting (cutover from Vercel during onboarding). Stealth-fortress doctrine in force: no competitor names anywhere in crawl-visible content; positive framing only; no "replaces X" attack lines until Phase 3-B unlocks.

**Wave 1 Stream 1 shipped:**

- Playwright removed entirely (`@playwright/test`, config, scripts, `*.spec.ts` → `*.scenario.ts`)
- Resend removed entirely (was never installed but references stripped)
- Gatetest scaffold landed (`gatetest.config.ts`, `scripts/gatetest-run.mjs`, env vars)
- `lib/email.ts` rewritten: AlecRae sole provider with 3-attempt jittered backoff, dev-mode console logger when `ALECRAE_API_KEY` unset
- New Prisma `EmailOutbox` model (PENDING / SENT / DEAD_LETTER) for persistent-failure queue
- `drainEmailOutbox()` retries persistent failures, dead-letters at 24h
- `app/api/alecrae/webhook/route.ts` — HMAC-SHA256 verified delivery webhook receiver
- `app/api/documents/route.ts` — dev writes to `./.dev-uploads/`, prod 501 message updated to "pending Crontech R2 tenant provisioning"
- Oracle "Verified" badge softened to "Source extracted" pending real verification wiring
- Marketing competitor names scrubbed from 13 files; two unsalvageable comparison pages (`compare/clio`, `compare/quickbooks`) deleted
- README rewritten — Marco Reid-specific, family-aligned, no template boilerplate
- `.env.example` reorganised with AlecRae, Gatetest, R2, bank-feed (Akahu/Basiq/Plaid/TrueLayer) blocks

**Wave 1 Streams 2-6 firing in parallel via worktree-isolated agents:**

- Stream 2: trust-account engine (jurisdiction-aware schema, three-way reconciliation, statements, UI + API)
- Stream 3: AUSTRAC Tranche 2 / AML-CDD module (program templates, CDD subjects, checks, BO/SOF, SAR drafts, immutable audit log)
- Stream 4: marketplace end-to-end (professional onboarding + admin verification, citizen intake, sign-off review queue with tamper-evidence)
- Stream 5: admin panel v2 + `/api/platform-status` shared family contract + sibling-products widget
- Stream 6: own general ledger + direct bank-feed adapters (Akahu/Basiq primary; Plaid/TrueLayer scaffolds) + AI categorisation

## Next action

Merge the five worktree branches back to `claude/infrastructure-catchup-bxUfH` as each agent completes, resolve any `prisma/schema.prisma` section overlaps, run `npm run build` on the consolidated state, push, then plan Wave 2.

## Decisions this session (IMPORTANT — do not reverse without written approval)

1. **Marco Reid onboards to Crontech as a deployed project. No rewrite.** Stack stays Next.js 16 / Prisma / Postgres. The four-product family shares one platform, one billing, one identity. The previously-considered Vultr / Hetzner sovereign infra build is cancelled — Crontech IS the sovereign infra.
2. **Playwright and Resend are competitors. Never reintroduce.** They are on the family's replaces-list. Same applies to GitHub, GitLab, Bitbucket, Cypress, Percy, Chromatic, Mailgun, SendGrid, Postmark, Cloudflare-as-named-competitor, Vercel long-term, Render, Netlify, Heroku, v0.dev, Webflow, Squarespace, Wix, Framer, Xero, MYOB, QuickBooks, Intuit, Sage, FreeAgent, Clio, LEAP, Actionstep, Smokeball, MyCase, PracticePanther, Harvey, CoCounsel, Ironclad, Spellbook, Robin AI, Pilot.com, Digits, Puzzle, Karbon, Ignition, TaxDome, Canopy, Hnry, LegalZoom, Rocket Lawyer, DoNotPay.
3. **Stealth-fortress doctrine in force.** Crawl-visible content uses positive framing only — no "replaces X", no "smoke them out", no "most advanced platform on earth", no SOC 2 claim (only "in progress"). Phase 3-B reinstates competitive marketing once the legal/compliance/infrastructure fortress is real.
4. **AlecRae is the sole transactional email provider.** Resilience comes from internal retry + `EmailOutbox` queue, not a second vendor. "Fall back to AlecRae itself."
5. **Bank feeds go DIRECT via open-banking infrastructure (Akahu, Basiq, Plaid, TrueLayer).** Marco Reid never depends on a competitor's API for the backbone. Xero/MYOB/QBO/Sage/FreeAgent are migration import lanes only — never a runtime dependency.
6. **AUSTRAC Tranche 2 (1 July 2026) is the AU wedge.** Wave 1 Stream 3 ships the AML-CDD module to hit this window.
7. **Marketplace fee model: flat referral or SaaS seat — never % take-rate on the pro's work.** ABA Rule 5.4 blocks % in 48 US states; NZ LCA and SRA ABS are more permissive. Build marketplace lock-in in NZ + AU first; US enters via Arizona ABS or pure SaaS-seat structure.

## Open questions for Craig

- **Crontech tenant provisioning for Marco Reid** — when to request the AlecRae tenant, R2 bucket, and orchestrator slot. Until then, dev mode handles it.
- **Bank-feed sandbox keys** — Akahu, Basiq, Plaid, TrueLayer all have free sandbox tiers. Drop keys into `.env.example` to wire real connections.
- **Hetzner / OVH / Vultr spend** — cancelled. Zero infra spend needed; Crontech inherits.

---

## Prior state below (kept for history)

## Current state — last updated 2026-04-20

**Branch:** `claude/investigate-refund-usage-97xly`

**Vision aligned this session:** Marco Reid is not a legal/accounting SaaS — it is a **two-sided platform** connecting citizens with licensed professionals, with AI-drafted work and qualified human sign-off on every consumer-facing output. NZ + AU chosen as the soft-launch beachhead (law + accounting), with Catch-Up Centre as a critical wedge product. Target: weeks to a working marketplace MVP, not years.

**Signup consent upgrade shipped this session:**

- New `lib/consent.ts` holds `CURRENT_TOS_VERSION`, `CURRENT_PLATFORM_ACK_VERSION`, and the five-bullet platform acknowledgment. Plain-language by design — plain language carries more evidentiary weight and is harder to set aside as unconscionable.
- `/register` now shows the five bullets in a highlighted card and requires a second checkbox before the submit button unlocks. The two acknowledgments are distinct: one for ToS/Privacy/AUP, one for the platform statement.
- `/api/auth/register` rejects unless both flags are `true`, and stamps the user with `tosVersion`, `tosAcceptedAt`, `platformAckVersion`, `platformAckAt`, `signupIp`, `signupUserAgent` for the evidentiary record.
- Prisma `User` model gained the six consent-audit fields above. Craig to run `prisma migrate dev --name add_consent_audit` when ready.
- Acknowledgment explicitly preserves non-waivable CGA 1993 (NZ) and ACL (AU) consumer rights. We own the carve-out instead of pretending it doesn't exist — that is what makes the rest enforceable.

**Header refactor shipped this session:**

- Trimmed `NAV_LINKS` from 7 → 4 (Legal · Accounting · Marco · Pricing). Catch-Up Centre, Courtroom, and Voice now live on product pages, homepage sections, and the footer instead of competing for header real estate — the header needs to scale to dozens of practice-area modules without breaking.
- Fixed the "goes completely blue" scroll bug: nav text is now `white/80 → white` on the dark hero and `navy-500 → navy-800` when scrolled onto the white background. Logo and Book-a-Demo CTA follow the same rule (white on hero, navy-filled on scroll).
- Mobile menu toggle adapts colour too.
- Killed the "two Voice buttons" duplication — Voice is a capability of Marco, not a separate top-nav destination.

**Open items / in flight:**

- Next session needs the `/marketplace` and `/for-citizens` shell, the `PracticeArea` + `ProMatter` Prisma models, and the sign-off workflow scaffold.
- Practice-area modules to scaffold next: 15 legal branches + 12 accounting branches (NZ + AU first, then US/UK/CA).
- News personalisation, multi-jurisdiction feeds (NZ/AU/UK/CA), and the daily email digest are queued on `/build-status`.
- Regulatory memo still to commission (NZ lawyer + US lawyer + CPA). Non-negotiable before marketplace go-live.

## Next action

Design the marketplace data model and sign-off workflow. Start with: `PracticeArea`, `ProMatter` (citizen-to-pro matter), `SignoffRequest` (every AI output passes through here before release), `Professional` (verified pro profile with jurisdiction + practice areas + PI insurance ref).

## Decisions this session (IMPORTANT — do not reverse without written approval)

1. **Sign-off doctrine is now architecture, not fine print.** Every consumer-facing AI output passes through a `SignoffRequest` queue and is approved by a licensed professional before release. This is the shield against Unauthorised Practice of Law, FTC §5 claims, and consumer reliance suits. "We're just a platform" does not defend this — the act of providing advice is what's regulated, not the actor. DoNotPay proved this the hard way.
2. **NZ + AU are the soft-launch beachhead.** Law + accounting, Catch-Up Centre as the critical wedge. Tenancy disputes and SME catch-up filings are the first transactional surfaces. US/UK/CA follow once the NZ/AU regulatory posture is proven.
3. **The top-nav is tight on purpose.** 4 items + Sign in + Book a Demo. Niche products get product pages, homepage slots, and footer links — not header slots. This is so the IA survives 20+ practice-area modules without collapsing.
4. **Fee-splitting rules are real** (ABA Model Rule 5.4, Lawyers and Conveyancers Act NZ). Pricing model is SaaS subscription + flat lead-qualification fees + direct consumer fees — never a % take-rate on the pro's work.
5. **AI speed ≠ legal speed.** The build can be weeks; the regulatory memo and professional sign-off rails are not shortcut-able. Build fast, sign off every release.


**What just shipped this session:**

- Marco Reid Accounting repositioned as "the most advanced accounting platform on earth" with explicit coverage of:
  - Autonomous bookkeeping (not just automated)
  - Payroll across five jurisdictions (NZ PAYE, AU PAYG, US federal + 50-state, UK PAYE, CA CPP/EI)
  - GST / VAT / sales tax filing (NZ GST, AU GST, UK VAT, CA GST/HST, US 50-state)
  - Provisional, estimated, and year-end income tax
  - Direct e-filing to IR, IRS, ATO, HMRC, CRA
  - Akahu (NZ), Basiq (AU), TrueLayer (UK) in addition to Plaid (US)
- New **Catch-Up Centre** product for clients who are years behind on their taxes. End-to-end AI reconstruction, back-filing, penalty-remission letters, tax-debt negotiation, with a qualified accountant signing off on every lodgement.
- New route: `/catch-up-centre` (marketing page)
- Nav, footer, and sitemap updated to surface Catch-Up Centre.
- Homepage Product-5 accounting section rewritten to match the new positioning.
- Header now has a visible **Sign in** link pointing at `/login` (desktop + mobile), so the admin dashboard is reachable without typing the URL. Craig's admin login is seeded via `prisma/seed.ts` (`ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars; defaults are `admin@marcoreid.com` / `changeme123` — change in production).

**Open items / in flight:**

- Final `npm run build` pass before the last push of the session.
- Stripe price IDs for accounting tiers still env-driven; values not set in this repo.
- Homepage hero copy is strong but could be prestige-tightened further in a future session (sub-headline is still two paragraphs; a single serif sentence would hit harder).

## Next action

Run `npm run build`. If it passes, commit and push the remaining polish to `claude/polish-accounting-website-2Xe7R`. Do NOT open a PR unless Craig asks.

## Decisions this session (IMPORTANT — do not reverse without written approval)

1. **Catch-Up Centre is a top-level product**, not a sub-page of `/accounting`. It lives in the main nav because it is a separate revenue line with a distinct audience (years-behind filers are emotionally and commercially distinct from compliant CPAs).
2. **Accounting is positioned multi-jurisdiction from day one.** Marco Reid is an Auckland firm; the US-only framing was a strategic mistake. The accounting page now leads with five jurisdictions.
3. **"Autonomous" replaces "automated"** as the lead adjective for bookkeeping. Automated is table-stakes in 2026; autonomous is the frontier.
4. **Every filing claims a qualified accountant sign-off.** AI does the work, a human signs. This is the trust line that separates Marco Reid from robo-filers.
5. **The session flywheel lives in `SESSION-STATE.md`**, not in `Claude.MD`. `Claude.MD` is 5,400+ lines of decisions and doctrine — it is too large to be a working memory. This file is the working memory.

## Open questions for Craig

- **Admin seed credentials for production.** `prisma/seed.ts` uses `admin@marcoreid.com` / `changeme123` by default. Before production, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars to real values and re-seed.
- **Catch-Up Centre pricing.** Currently positioned as "fixed-fee engagement" with no dollar figures. A future session should add a pricing table (recommend three tiers: Sole Trader catch-up, SME catch-up, Expat/Streamlined catch-up).
- **Catch-Up Centre intake form.** Currently CTAs point at `/contact`. A dedicated `/catch-up-centre/intake` form that captures years-behind, jurisdiction, and estimated revenue would qualify leads faster.

---

## Session log (append new entries at the top)

### 2026-04-15 — Accounting polish + Catch-Up Centre launch

- Shipped the changes listed under "Current state" above.
- Commits: `38362eb` (Catch-Up Centre + expanded accounting features in constants), and the polish commit pushed at end of session.
- Branch: `claude/polish-accounting-website-2Xe7R`.
- No PR opened (per IRON-LAW: PRs only on explicit request).
