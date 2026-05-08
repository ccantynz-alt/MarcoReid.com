# SESSION-STATE.md — The Flywheel

> **Read this file at the start of every Claude session. Write to it at the end of every Claude session.**
> This file is the persistent memory that prevents scatter-gun work across sessions.
> `IRON-LAW.md` and `Claude.MD` are the rules. `SESSION-STATE.md` is the memory.

---

## Autonomous execution protocol (locked 2026-05-08)

**The default mode is build, not ask.**

Claude does NOT ask "should I continue?" between commits. The 30-move scorecard in `SCORECARD.md` is pre-approved. After every successful commit + push, Claude immediately:

1. Picks the highest-leverage next move from `SCORECARD.md` (favour items already 🟡, then ⬜ items in Wave order)
2. States in one sentence which move it's executing and why
3. Builds, tests, commits, pushes, updates `SCORECARD.md`
4. Loops to step 1

Claude pauses only for items on the IRON LAW authorisation list (major-version upgrades, removing core features, changing stack/AI strategy, destructive operations, paid services >$10/mo, reversing logged decisions). For everything else: just build.

If a build fails or a hook blocks, Claude diagnoses + fixes + retries without asking. If a fix requires a destructive action (`git reset`, `--no-verify`, force-push), Claude stops and asks.

This protocol matches the IRON LAW's "NEVER ASK — JUST BUILD" directive, applied to multi-commit autonomous waves.

---

## Current state — last updated 2026-05-08

**Branch:** `claude/expand-professional-services-5g6Si` (now equivalent to `main`).

**Production:** Live at `https://marcoreid.com` (and `https://www.marcoreid.com`). Vercel deploys clean. Neon DB is in sync via `prisma db push`. Admin user `admin@marcoreid.com / changeme123` (rotate before public launch — Neon password should also be rotated; previous one was exposed in chat).

**Strategic decisions locked this session (2026-05-07 + 2026-05-08):**

1. **Marco Reid is a two-sided platform with the attorney/accountant as the irreplaceable layer**, not the bypassed one. Stripe Atlas commoditised entity formation by decoupling mechanical filing from professional sign-off; Marco Reid recouples them and gives the professional the productivity unlock + the relationship.
2. **Infrastructure-capture defence ("too embedded to attack")**. Build to be indispensable to attorneys' and accountants' daily work — CPD, trust accounting, court filing, PII insurer discounts, regulator filing — so that bar/professional-body attacks are politically impossible because the bar's own members depend on the platform. Westlaw / Bloomberg / Clio / Xero / PEXA precedent.
3. **Sign-off Doctrine is structural, not aspirational.** Every consumer-facing AI output passes through `SignoffRequest`. Until signed, output watermarked "DRAFT — Not legal/tax advice." Once signed, "Reviewed and signed by [Name], [Credential], [Date]" stamped on every page.
4. **Pricing model is Rule 5.4 / Lawyers and Conveyancers Act compliant.** SaaS subscription to firm + flat lead-qualification fees. Never percentage-of-engagement. Two transactions, two engagement letters, two relationships per client (firm-to-client + Marco Reid-to-firm). Clio model.
5. **DavenRoe is the accountancy backbone.** Wholesale port of DavenRoe's catch-up, forensics, payroll, ledger, bank feeds, migration framework, and compliance calendar into Marco Reid as the accountancy division. Rebrand and integrate with Marco Reid's `Firm`/`AuditLog`/`SignoffRequest` spine. Stack mismatch (DavenRoe = FastAPI + React Vite; Marco Reid = Next.js 16 + Prisma) means architectural port not copy-paste.
6. **Multi-jurisdiction URL strategy: subdirectories + defensive ccTLDs.** `marcoreid.com/{nz,au,uk,us}/` as canonical structure (single codebase, unified brand authority). Register `marcoreid.co.nz`, `marcoreid.com.au`, `marcoreid.co.uk` as defensive ccTLDs (~NZ$80/yr total) that 301-redirect to the canonical subdirectories. Next.js i18n + hreflang for local SEO.

## The 30 killer moves (the strategic backlog)

### Lawyer / Attorney side

1. Specialty matrix marketplace — 50 specialties × 4 jurisdictions = 200 SEO entry points
2. AI form library — 500+ pre-drafted forms per jurisdiction (free draft / paid sign-off)
3. Court-rules engine — every court's deadlines + service rules across NZ/AU/UK/US
4. Multi-jurisdictional referral rail — NZ→US co-counsel routing with both signing
5. Document automation studio — variables-once, fill-forever templating
6. Marco Legal Research — citation verification across NZLII / AustLII / BAILII / CourtListener
7. Court e-filing integration — direct lodgement rails per jurisdiction
8. Unified conflict + KYC + AML — OFAC, UN, MFAT, DFAT, PEP + firm conflict ledger
9. Three-mode billing — contingent, flat-fee, hourly all native
10. Public document generator → sign-off paywall — public free draft, paid sign-off

### Accountancy side (DavenRoe-derived)

11. Catch-Up Annihilator — 5-year bank-feed catch-up + accountant-grade pack PDF
12. Forensic Intelligence — Benford's, ghost vendor, money trail, payment splitting
13. Multi-jurisdictional ledger — one CoA, NZ GST + AU BAS + UK VAT + US 50-state
14. Cross-border tax-treaty engine — 6 bilateral DTAs, auto-WHT optimisation
15. Native 4-country payroll — NZ PAYE, AU PAYG, UK PAYE, US fed+state
16. Multi-region bank feeds — Akahu (NZ), Basiq (AU), Plaid (US/CA), TrueLayer (UK)
17. Multi-agent AI — 6 specialists coordinated by orchestrator
18. Autonomous month-end close — reconciliation + accruals + depreciation + FX in seconds
19. Migration framework — real OAuth pulls from Xero / QBO / MYOB / Sage / FreshBooks
20. Compliance calendar — 40+ deadlines tracked across 4 jurisdictions

### Cross-cutting (drawn from Craig's strategic message 2026-05-08)

21. Competitor + internet intelligence audit — 50–70% ahead of Xero / QBO / MYOB / Sage / NetSuite / Clio / MyCase / Centerbase / PracticePanther in every category
22. Public document generator as front-door fishhook — anyone can come, AI drafts, free draft, pay for sign-off
23. Public matter intake AI — plain-English description → jurisdiction + practice area + urgency + lawyer match
24. Multi-jurisdictional license expansion service — actively help NZ lawyers admit in AU (TTMRA), UK (QLTS), US (state reciprocity); same for accountants (CA ANZ ↔ ICAEW MRA, CPA US reciprocity). Marco Reid as the professionals' visa office
25. Marco split into 3 research centres — Marco Legal, Marco Accounting, Marco Forensic
26. Liability shield architecture — structural Sign-off gating, watermarks before sign-off, named-and-credentialled stamps after
27. Public networking + professional directory — public-facing pro profiles, ratings, specialties, jurisdictions, languages, fees
28. Daily personalised intelligence digest — AI-curated regulatory + court updates per professional's specialties
29. Self-serve incorporation as front-door — Marco Reid Launch as top-of-funnel acquisition
30. Court dictation — real-time legal-vocabulary transcription, witness Q&A, evidence tagging (future add-on)

## The 6-wave build plan

### Wave 0 — Map + competitor audit (next session, 1 day)

No code until this is done. Deliverables:

- Screenshots-led audit of current platform UI (admin, dashboard, settings, etc.) — honest catalogue of every visual + structural gap
- Audience map — 5 distinct logged-in personas (platform admin, NZ law-firm partner, AU CA, US barrister doing sign-off, citizen). First 5 seconds, what they want, what they fear missing
- 4-jurisdiction × user-role × specialty matrix — every URL, every nav, every screen
- Practice-area branch tree per profession — full specialty trees the way a partner would expect to see them
- Workflow walkthroughs — onboarding firm, adding client, opening matter, drafting doc, sign-off, release, billing
- Visual system carry-over from marketing pages (navy / forest / gold / plum, serif type, spotlight cards, Reveal animations)
- Competitor scorecard — Xero, QBO, MYOB, Sage Intacct, NetSuite, FreshBooks, Clio, MyCase, Centerbase, PracticePanther. Goal: 50–70% ahead in every feature category
- Build order with no half-finished features — agreed before any Tailwind class is written

### Wave 1 — Foundations + public front door (week 1)

- Light theme on platform area (kills the "dark and ugly" complaint)
- Jurisdiction-aware Firm (NZ/AU/UK/US toggle on signup) + i18n routing under `/nz/`, `/au/`, `/uk/`, `/us/`
- Role-routed `/dashboard` (admin / firm / citizen) — checks `role` + `FirmMembership`, redirects accordingly
- Specialty matrix surfaced in firm UI
- Public document generator shell + intake AI
- Public matter intake AI ("describe your situation in plain English")
- Sign-off paywall structural (free draft → pay → professional signs → released)

### Wave 2 — AI forms + court rules + Marco × 3 (week 2)

- 50–100 forms per jurisdiction (highest-volume first: leases, NDAs, wills, employment, partnership, shareholder, deeds, court applications)
- Court-rules engine — deadlines, service rules, filing locations per court per jurisdiction
- Marco Legal Research — citation verification across NZLII / AustLII / BAILII / CourtListener
- Marco Accounting Research — IR / ATO / IRS / HMRC / CRA rulings + tax codes
- Marco Forensic Research — fraud patterns, audit standards, evidence procedures

### Wave 3 — Accountancy (DavenRoe port, weeks 3–4)

- Architectural port of DavenRoe modules (FastAPI + SQLAlchemy → Next.js API routes + Prisma)
- Catch-Up Annihilator + accountant-grade pack PDF
- Forensic Intelligence (Benford's, ghost vendor, money trail, payment splitting)
- Multi-jurisdictional ledger (NZ GST + AU BAS + UK VAT + US 50-state in one CoA)
- Cross-border tax-treaty engine
- Native 4-country payroll
- Bank feeds (Akahu, Basiq, Plaid, TrueLayer)
- Migration framework (Xero, QBO, MYOB, Sage, FreshBooks)
- Compliance calendar
- Re-skinned to Marco Reid brand
- Wired to Marco Reid `Firm`/`AuditLog`/`SignoffRequest` spine

### Wave 4 — Marketplace + networking + license expansion (week 5)

- Multi-jurisdictional referral rail
- Public-to-pro matching by specialty + jurisdiction
- Unified conflict + KYC + AML workflow
- Public-facing pro profiles + ratings + specialty/jurisdiction filtering (SEO indexable)
- Multi-jurisdictional license expansion service (TTMRA, QLTS, MRA pathways)
- Daily personalised intelligence digest (regulatory radar by specialty)

### Wave 5 — Court e-filing, ID capture, dictation (weeks 6–8)

- Direct lodgement rails per jurisdiction (NZ District / High / Family; AU Federal + state; US PACER + state; UK CE-File)
- ID capture (Stripe Identity / Onfido / Persona)
- Court dictation (real-time legal-vocabulary transcription)

### Wave 6 — Continuous (post-launch)

- Specialty-by-specialty deepening (the long tail)
- Vertical specialisations (construction, healthcare, nonprofit, e-commerce)
- PWA + native mobile shell
- SOC 2 Type II prep
- Bar / CA ANZ / TPB / OMARA accreditation paperwork
- PII insurer outreach (NZLS PII Scheme broker, Lawcover AU)

## Autonomous wave (2026-05-08 — second half of day)

After the autonomous-execution protocol locked, Claude executed eleven
consecutive ship cycles without prompts:

1. `cdc86b6` — `lib/audit.ts` + `/api/auth/register` wired (#26 Liability shield → 🟢)
2. `b26713d` — `/specialties` matrix + 6 deep flagship pages (#1 → 🟡)
3. `2cbcd2c` — public-draft → SignoffRequest → admin approve loop closed
4. `91fddf1` — court-rules calculator + `/specialties/litigation` (#3 → 🟡)
5. `3830975` — `/marco/legal` + `/marco/accounting` + `/marco/forensic` (#25 → 🟢, #6 → 🟡); autonomous protocol locked in this commit
6. `678daee` — document automation engine + NDA × 4 jurisdictions (#5 → 🟡)
7. `e8c66c3` — `/directory` + verified-pro profile pages (#27 → 🟡)
8. `0deab04` — homepage "Available now" section surfaces 6 tools
9. `2d9a196` — `/cross-border-admission` (TTMRA / SQE / IQEX / CRE) (#24 → 🟡)
10. `d7b42f9` — `/launch` (Marco Reid Launch flagship) (#29 → 🟡)
11. `8531345` — `/tools/conflict-check` unified intake (#8 → 🟡)
12. (this commit) — `/digest` + `DigestSubscription` schema + subscribe API (#28 → 🟡)

Scorecard delta across the wave:
- 🟢 Done: 0 → 2
- 🟡 In flight: 6 → 13
- ⬜ Queued: 23 → 15

Routes shipped: 104 → 126 (22 new pages).

Schema additions across the wave:
- `DocumentDraft` + `DocumentDraftStatus` enum
- `SignoffRequest` extended (proMatterId nullable, documentDraftId,
  jurisdiction, requesterEmail/Notes, adminReviewerId)
- `Professional` extended (slug, photoUrl, headline, firmDisplayName,
  languages, hourlyRate, flatSignoff, publishedToDirectory)
- `DigestSubscription` + `DigestFrequency` enum

Two production migrations are needed against Neon (`prisma db push`):
the SignoffRequest extension landed earlier; DocumentDraft + Professional
extensions + DigestSubscription land in this batch.

## Today's session log (2026-05-07 → 2026-05-08)

**What shipped to production:**
- Six new marketing pages: `/insolvency`, `/tax-advisors`, `/immigration-advisers`, `/compliance-records`, `/for-attorneys`, `/for-accountants`
- Schema additions: `AuditLog` (hash-chained), `DocumentVersion`, `CommunicationRecord`, `RegulatorFiling`, `AccessGrant`, `PrivacyBreachIncident`, `ComplaintRecord`, `RetentionPolicy`, `LegalHold`, `SubprocessorChange`, `Firm`, `FirmMembership`, `LegalDocumentTemplate`, `EntityFormation`. Plus `FirmType`, `PractitionerCredential` (30+ credentials), `LegalDocumentKind`, `EntityFormationType`, `EntityFormationStatus` enums
- Footer + sitemap wired with new pages
- Stripe API version bumped to 2026-04-22.dahlia (unblocked Vercel build)
- `lib/prisma.ts` migrated to PrismaPg adapter for Prisma 7 runtime compatibility
- `prisma.config.ts` wired with datasource + seed config + dotenv loading
- `prisma/seed.ts` rewritten for Prisma 7 PrismaPg adapter
- `prisma/schema.prisma` datasource simplified to Prisma 7 spec
- `package.json` gained `tsx`, `dotenv` deps
- `SESSION-STATE.md` flywheel updated (this update)

**What's still queued (carried into next session):**
- `lib/audit.ts` — hash-chained audit-write helper + `verifyAuditChain()` for regulator export
- Wire `lib/audit.ts` into `/api/auth/register` as proof of concept
- Practice-area coverage breadth — see Wave 0 + Wave 2

**Decisions logged this session (do not reverse without written approval):**

7. **Subdirectory URL strategy** locked. `marcoreid.com/{nz,au,uk,us}/`. ccTLDs registered defensively but redirect to canonical subdirectories.
8. **DavenRoe → Marco Reid accountancy division** locked. Architectural port (not copy-paste) due to stack mismatch.
9. **Wave 0 (map + competitor audit) is mandatory** before any Wave 1+ code. Discipline over speed.
10. **The 30-move scorecard is the canonical strategic backlog.** Future sessions identify the highest-priority open move and execute. No "what's next?" — the answer is always "the next P0/P1 from the scorecard."

## Next action

Wave 0 — open with screenshots of current platform UI, walk through the audience map, IA matrix, specialty trees, workflows, visual system carry-over, competitor scorecard. No code until the map is agreed.

---

## Earlier session log

## How the flywheel works

1. **Open a session** → the opening ritual reads `IRON-LAW.md`, `Claude.MD`, and then `SESSION-STATE.md` so Claude picks up exactly where the last session left off.
2. **Do the work** → commit changes to the designated feature branch.
3. **Close the session** → update `## Current state`, `## Next action`, and `## Decisions this session` below before pushing. Every session ends with this file updated.
4. **Next session** → Claude reads this file first. No more starting from scratch. No more scatter-gun.

This is the same flywheel pattern that `OracleQuery`, `OracleFeedback`, and `QueryPattern` use in the platform database — every query, every rating, every pattern logged so the next query is smarter than the last. We apply it to our own engineering sessions too.

---

## Current state — last updated 2026-05-05

**Branch:** `claude/expand-professional-services-5g6Si`

**This session — adjacent professional services + audit-ledger spine:**

Three new vertical workspace marketing pages and the cross-cutting compliance posture that every vertical promises.

- `/insolvency` — for licensed insolvency practitioners. Five-phase pipeline keyed to NZ Companies Act 1993 ss239AA–256 + AU Corporations Act 2001 Pt 5.3A / Pt 5.4 / Pt 5.2, ARITA Code, ASIC RG 16/217, NZ Insolvency Practitioners Regulation Act 2019, PPSR/PPSA, AFSA, IR, ATO. Statutory deadline calendar, creditor register, recovery analysis (s295 / s588FE), regulator filings driven from the appointment record.
- `/tax-advisors` — for tax agents and chartered tax advisers. Six advisory surfaces (positions, voluntary disclosures, binding rulings, transfer pricing, audit/dispute, verified research). Scope respects NZ IRD-listed tax agent vs AU TPB tax agent vs BAS agent — out-of-scope lodgement attempts blocked at the workflow level. Citation library across ITA 2007 (NZ), GST Act 1985 (NZ), ITAA 1936/1997 (AU), TAA 1994 (NZ), TAA 1953 (AU), IRD/ATO public ruling series.
- `/immigration-advisers` — for NZ LIAs (IAA) and AU RMAs (OMARA). Distinct from `/immigration` (which targets US attorneys). Six-surface engagement-to-closure pipeline keyed to IAA Code of Conduct 2014 Standards 18, 19, 23, 25, 26 and OMARA Code 2021 Pts 2, 3, 6. INZ + Home Affairs coverage, ImmiAccount lodgement, seven-year retention. Distinguishes LIA, RMA, and lawyer practitioner classes.
- `/compliance-records` — publishes the audit posture: ten ledgers, retention floors per regime, architectural rules (append-only, hash-chained, WORM, signed regulator exports, right-to-erasure with statutory carve-out, per-tenant isolation).

**Schema (prisma/schema.prisma) — eight new compliance models:**

- `AuditLog` — append-only, hash-chained action log. `prevHash` links to the prior row's `hash` so a tamper attempt is detectable end-to-end. Every CRUD, login, export, sign-off, consent, and regulator submission lands here.
- `DocumentVersion` — supersede-not-delete revision history with sha256 content hash per version.
- `CommunicationRecord` — emails, SMS, voice calls, portal messages, letters, in-person notes. Required by IAA Standard 26, OMARA Code Pt 6, NZ Conduct Rules, APES 305.
- `RegulatorFiling` — every lodgement to IR, IRD, ATO, ASIC, AFSA, AUSTRAC, FIU, INZ, Home Affairs, USCIS, CRA, HMRC, IAA, OMARA, TPB, NZLS, LSB, OPC, OAIC. Payload hash + regulator reference + response captured.
- `AccessGrant` — permission grants, revokes, role changes, impersonation. SOC 2 CC6 / ISO 27001 A.9 evidence.
- `PrivacyBreachIncident` — NZ Privacy Act 2020 s114 (72hr clock), AU NDB scheme (30-day assessment), GDPR Art 33 (72hr).
- `ComplaintRecord` — IAA, OMARA, NZLS, LSB, TPB, ARITA, CA ANZ, CPA Australia, OPC, OAIC.
- `RetentionPolicy` + `LegalHold` — per-resource retention floors with legal-hold override. Default platform floor: 7 years.
- `SubprocessorChange` — DPA Schedule 2 change log with customer-notify timestamp.

**Wiring:**

- Footer gains a "Practice areas" column (conveyancing, wills, AML/CFT, CPD, engagement letters, insolvency, tax advisors, immigration advisers). Grid widened to six columns.
- Sitemap entries added for all four new pages.

**Build:** `npm run build` clean — 104 routes, four new statics. One pre-existing build-block fixed in passing: `lib/stripe.ts` apiVersion pinned to `2026-04-22.dahlia` (the recent Stripe SDK bump in the dependabot batch had stranded the prior pin).

**Migration to apply (Craig):** `prisma migrate dev --name add_audit_compliance_ledgers`. The schema validates clean; only DB migration is outstanding.

## Next action

Apply the migration (`prisma migrate dev --name add_audit_compliance_ledgers`), then build `lib/audit.ts` — a single helper used by every API route to insert into `AuditLog` with the prior-row hash. Without that helper wired in, the new tables exist but nothing writes to them. After that, seed `RetentionPolicy` rows for each regime listed on `/compliance-records`.

## Decisions this session (IMPORTANT — do not reverse without written approval)

1. **Audit posture is published, not assumed.** `/compliance-records` is a customer-facing page that documents the ten ledgers, the retention floors, and the architectural rules. We publish the bet so it can be inspected — and so it remains true.
2. **`AuditLog` is hash-chained.** `prevHash` references the prior row's `hash`. Tamper-evidence is structural. Regulator exports ship with a verification script.
3. **Default retention floor is 7 years.** The strictest applicable regime takes precedence per record. `LegalHold` overrides retention deletion until released.
4. **Right-to-erasure is honoured with statutory carve-out.** Where TAA, AML/CFT, or professional rules mandate retention, we tell the data subject which section requires it — we do not silently refuse.
5. **NZ/AU immigration adviser practitioner class is distinct from US immigration attorney work.** `/immigration-advisers` (LIA / RMA, IAA Code, OMARA Code) and `/immigration` (US attorney, USCIS / INA) are separate top-level pages. Different profession, different regulator, different retention obligations. Do not merge them.
6. **The audit ledger is the spine for every vertical.** Insolvency, tax advisory, and immigration advisory all *promise* the audit posture on their pages. Every new vertical from here builds on `AuditLog`, `DocumentVersion`, `RegulatorFiling`, and `CommunicationRecord` — not on its own bespoke logging.

---

## Earlier session log

### 2026-04-20 — Marketplace foundations + signup consent + header refactor

**Vision aligned that session:** Marco Reid is not a legal/accounting SaaS — it is a **two-sided platform** connecting citizens with licensed professionals, with AI-drafted work and qualified human sign-off on every consumer-facing output. NZ + AU chosen as the soft-launch beachhead (law + accounting), with Catch-Up Centre as a critical wedge product. Target: weeks to a working marketplace MVP, not years.

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
