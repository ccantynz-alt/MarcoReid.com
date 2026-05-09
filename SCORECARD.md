# SCORECARD.md — Live build tracker

> The single source of truth for what's shipped and what's still in queue.
> Update this file on every commit. ✅ = shipped, 🟡 = in flight, ⬜ = queued, ❌ = blocked.
> If you're trying to figure out "have we built X?" — this file answers it.

Last updated: 2026-05-08 (specialty matrix + 6 deep pages)

---

## Foundation (the spine the 30 moves plug into)

| Item | Status | Commit |
|---|---|---|
| `Firm` + `FirmMembership` schema | ✅ | f4ac314 |
| 30+ `PractitionerCredential` enum values (NZ/AU/UK/US/CA legal + accounting) | ✅ | f4ac314 |
| `FirmType` enum (LAW_FIRM, ACCOUNTING_FIRM, MULTI_DISCIPLINARY, INSOLVENCY, IMMIGRATION_ADVISORY, TAX_PRACTICE, BARRISTER_CHAMBERS, IN_HOUSE_LEGAL, GOVERNMENT_LEGAL, COMMUNITY_LAW) | ✅ | f4ac314 |
| `LegalDocumentTemplate` (firm-overridable) + 21-doc `LegalDocumentKind` enum | ✅ | f4ac314 |
| `EntityFormation` + state machine | ✅ | f4ac314 |
| `AuditLog` (hash-chained) schema | ✅ | f1a10bd |
| `lib/audit.ts` writeAuditLog + verifyAuditChain | ✅ | cdc86b6 |
| First wired endpoint (`/api/auth/register` writes 2 audit rows) | ✅ | cdc86b6 |
| `DocumentVersion` (supersede-not-delete) schema | ✅ | f1a10bd |
| `CommunicationRecord` (file notes ledger) schema | ✅ | f1a10bd |
| `RegulatorFiling` (every regulator submission) schema | ✅ | f1a10bd |
| `AccessGrant` (permission change log) schema | ✅ | f1a10bd |
| `PrivacyBreachIncident` (Privacy Act / NDB / GDPR register) schema | ✅ | f1a10bd |
| `ComplaintRecord` (IAA / OMARA / NZLS / TPB / ARITA) schema | ✅ | f1a10bd |
| `RetentionPolicy` + `LegalHold` schema | ✅ | f1a10bd |
| `SubprocessorChange` (DPA Schedule 2) schema | ✅ | f1a10bd |
| `DocumentDraft` (public draft anchor) schema | ✅ | this commit |
| `SignoffRequest` model | ✅ | (earlier session) |
| Consent audit fields on User (ToS + platform ack + IP + UA) | ✅ | (earlier session) |
| Stripe API version pinned to 2026-04-22.dahlia | ✅ | f1a10bd |
| Prisma 7 PrismaPg adapter migration | ✅ | ae9ce1f |
| `prisma.config.ts` datasource + seed wired | ✅ | 5f9b711, 874f840 |
| Production deployment live (https://marcoreid.com) | ✅ | f72da9d |

---

## The 30 killer moves

### Lawyer / Attorney side

| # | Move | Status | Notes |
|---|---|---|---|
| 1 | Specialty matrix marketplace (50 × 4 jurisdictions = 200 SEO entry points) | 🟡 | `/specialties` index live with 56 specialties, profession + jurisdiction filters, search. 6 flagship deep pages live (family, employment, commercial-corporate, IP, audit-assurance, SMSF). Remaining 50 deep pages queued |
| 2 | AI form library (500+ pre-drafted forms per jurisdiction) | 🟡 | `/generate` front-door + template engine + 8 templates × 4 jurisdictions = 32 substantive drafts: NDA, Employment Agreement, Will, Shareholders Agreement, Lease, Power of Attorney, Sale of Goods Contract, and Directors' Resolution by Written Consent (NZ s 167 / AU s 248A / UK Model Articles Reg 8 / US DGCL § 141(f)). Engine reads from `lib/templates/*`. ~468 templates queued |
| 3 | Court-rules engine (every court's deadlines + service rules across NZ/AU/UK/US) | 🟡 | `lib/court-rules.ts` shipped with 28 rules across NZ/AU/UK/US. `/tools/court-rules` interactive calculator live (pick rule + trigger date → cited deadline). Public-holiday calendars + service-of-process variations + fuller rule catalogue queued |
| 4 | Multi-jurisdictional referral rail | ⬜ | Wave 4 |
| 5 | Document automation studio (variables-once-fill-forever) | 🟡 | Template engine live (`lib/templates/engine.ts`): variable contracts, substitution, watermark wrapper, registry. NDA template authored across 4 jurisdictions as canonical first template. Firm-side template-override UI (Wave 4) still queued |
| 6 | Marco Legal Research (citations across NZLII / AustLII / BAILII / CourtListener) | 🟡 | `/marco/legal` live with research box + 12-source catalogue (NZLII / AustLII / BAILII / CourtListener / CAP / Cornell LII / SCOTUS / legislation portals). `/api/marco/research` endpoint serves demo-mode responses with VERIFIED / UNVERIFIED / NOT_FOUND citations. Real Anthropic-driven research swaps in once `ANTHROPIC_API_KEY` is set in Vercel |
| 7 | Court e-filing integration | ⬜ | Wave 5 |
| 8 | Unified conflict + KYC + AML | 🟡 | `/tools/conflict-check` interactive intake live: party name, type, jurisdiction, country of operation. Runs four checks (firm matter ledger, sanctions, PEP, adverse media) and outputs a Low/Medium/High risk rating + jurisdiction-specific recommendation. Demo-mode heuristics client-side; real engine swaps in once UN / OFAC / EU / MFAT / DFAT / OFSI feeds are wired. Schema: `AmlAssessment` already in place |
| 9 | Three-mode billing (contingent / flat-fee / hourly) | ⬜ | Wave 3 |
| 10 | Public document generator → sign-off paywall | 🟡 | `/generate` flow live (intake → watermarked draft → sign-off CTA). Sign-off payment + routing is Wave 4 |

### Accountancy side (DavenRoe-derived)

| # | Move | Status | Notes |
|---|---|---|---|
| 11 | Catch-Up Annihilator (5-year bank-feed catch-up + accountant-grade pack) | ⬜ | Wave 3 — DavenRoe port |
| 12 | Forensic Intelligence (Benford's, ghost vendor, money trail, payment splitting) | ⬜ | Wave 3 — DavenRoe port |
| 13 | Multi-jurisdictional ledger (NZ GST + AU BAS + UK VAT + US 50-state) | ⬜ | Wave 3 — DavenRoe port |
| 14 | Cross-border tax-treaty engine (6 bilateral DTAs) | ⬜ | Wave 3 — DavenRoe port |
| 15 | Native 4-country payroll | ⬜ | Wave 3 — DavenRoe port |
| 16 | Multi-region bank feeds (Akahu / Basiq / Plaid / TrueLayer) | ⬜ | Wave 3 — DavenRoe port |
| 17 | Multi-agent AI (6 specialists) | ⬜ | Wave 3 — DavenRoe port |
| 18 | Autonomous month-end close | ⬜ | Wave 3 — DavenRoe port |
| 19 | Migration framework (Xero / QBO / MYOB / Sage / FreshBooks) | ⬜ | Wave 3 — DavenRoe port |
| 20 | Compliance calendar (40+ deadlines, 4 jurisdictions) | ⬜ | Wave 3 — DavenRoe port |

### Cross-cutting

| # | Move | Status | Notes |
|---|---|---|---|
| 21 | Competitor + internet intelligence audit | 🟡 | `/research/competitor-audit` shipped: scorecard against Clio + LEAP (legal PMS), Xero + QBO (accounting), Westlaw + LexisNexis (research), Stripe Atlas + Termly (founder tooling). Each row labelled Ahead / Parity / Behind / Behind (blocked) with Marco Reid notes + competitor positioning. Honest reading section flags structural Aheads, parity caveats, real Behinds, and blocked-on-partner items |
| 22 | Public document generator as front-door fishhook | 🟡 | Front-door page + intake + watermarked draft live this commit |
| 23 | Public matter intake AI | 🟡 | Heuristic classifier shipped; Claude-based extraction is Wave 2 |
| 24 | Multi-jurisdictional license expansion service (TTMRA / QLTS / MRA pathways) | 🟡 | `/cross-border-admission` live with 8 high-volume pathways: NZ↔AU TTMRA, NZ/AU→UK SQE, NZ/AU→US bar reciprocity + LL.M. + UBE, CA ANZ→ICAEW MRA, CA ANZ→AICPA via IQEX, CA ANZ→CPA Canada via CRE, AU TPB→NZ IRD agent. Each pathway carries authority + steps + timeline + fees. Eligibility checker + document-pack assembly + mentor matching queued |
| 25 | Marco split into 3 research centres (Legal / Accounting / Forensic) | 🟢 | `/marco/legal`, `/marco/accounting`, `/marco/forensic` all live with shared `MarcoCentrePage` template, `MarcoResearchBox` interactive component, and a per-domain source catalogue (Legal: 12 sources, Accounting: 6, Forensic: 5). `MarcoResearchBox` posts to `/api/marco/research` and renders Verified / Unverified / Not Found citation pills |
| 26 | Liability shield architecture (structural sign-off + watermarks) | 🟢 | End-to-end live: public draft → /generate/[draftId]/signoff intake → SignoffRequest queue → /admin/signoffs review → approve transitions DocumentDraft to SIGNED with credentialled stamp. Two AuditLog rows per approval. Marketplace Professional supply side (Wave 4) replaces admin-as-reviewer stand-in |
| 27 | Public networking + professional directory | 🟡 | `/directory` index live + `/directory/[slug]` profile pages live. Filtered to publishedToDirectory + verifiedAt. Empty state surfaces /for-attorneys + /for-accountants. Schema extended: Professional gains slug, photoUrl, headline, firmDisplayName, languages, hourlyRate, flatSignoff, publishedToDirectory. Search/filter UI + claim flow queued |
| 28 | Daily personalised intelligence digest | 🟡 | `/digest` landing + interactive subscribe form live. `DigestSubscription` schema added (email, jurisdictions, specialties, frequency: DAILY/WEEKDAYS/WEEKLY, unsubscribeToken). `/api/digest/subscribe` endpoint upserts on (email, frequency). Cron worker + email template + RegulatoryUpdate matcher queued (Wave 4 follow-up — needs cron infrastructure) |
| 29 | Self-serve incorporation as front-door (Marco Reid Launch) | 🟡 | `/launch` flagship product page live: 8-stage pipeline (intake + structure design → DE filing → EIN → US bank → founder pack → SaaS legal pack → cross-border tax → annual compliance autopilot), 3-tier pricing (Solo Founder $1,499, Funded Startup $3,499, Enterprise custom), full Stripe Atlas comparison table. Schema: EntityFormation already in place. Workflow API + partner integrations (Harvard / Northwest / Mercury) queued |
| 30 | Court dictation (real-time legal vocabulary transcription) | ⬜ | Wave 5+ |

---

## Wave progress

| Wave | Focus | % shipped |
|---|---|---|
| 0 | Map + competitor audit | 0% — pending |
| 1 | Foundations + public front door | ~30% — DocumentDraft + /generate front door + audit chain live |
| 2 | AI forms + court rules + Marco × 3 | 0% |
| 3 | DavenRoe accountancy port | 0% — awaiting repo access |
| 4 | Marketplace + networking + license expansion | 0% |
| 5 | Court e-filing, ID capture, dictation | 0% |
| 6 | Continuous post-launch | n/a |

---

## Marketing / public surface

| Page | Status |
|---|---|
| `/` (homepage with bento + sticky product navigator) | ✅ |
| `/law` (legal product) | ✅ |
| `/accounting` (accounting product) | ✅ |
| `/marco` (research) | ✅ |
| `/dictation` (voice) | ✅ |
| `/courtroom` (litigation tooling) | ✅ |
| `/catch-up-centre` (years-behind tax catchup) | ✅ |
| `/aml-cft` | ✅ |
| `/conveyancing` | ✅ |
| `/wills` (wills register) | ✅ |
| `/cpd` | ✅ |
| `/engagement-letters` | ✅ |
| `/insolvency` (IP practitioners NZ + AU) | ✅ |
| `/tax-advisors` (tax agents NZ + AU + US + UK) | ✅ |
| `/immigration-advisers` (LIA + RMA) | ✅ |
| `/immigration` (US immigration attorneys) | ✅ |
| `/migration` (firm-side data migration) | ✅ |
| `/compliance-records` (audit posture) | ✅ |
| `/for-attorneys` (supply-side moat) | ✅ |
| `/for-accountants` (supply-side moat) | ✅ |
| `/generate` (public document generator) | ✅ |
| `/generate/[draftId]` (watermarked draft view + sign-off CTA) | ✅ |
| `/specialties` (filterable matrix of 56 specialties) | ✅ |
| `/specialties/family` (deep page, NZ + AU + UK + US) | ✅ |
| `/specialties/employment` (deep page, NZ + AU + UK + US) | ✅ |
| `/specialties/commercial-corporate` (deep page, NZ + AU + UK + US) | ✅ |
| `/specialties/intellectual-property` (deep page, NZ + AU + UK + US) | ✅ |
| `/specialties/audit-assurance` (deep page, NZ + AU + UK + US) | ✅ |
| `/specialties/smsf` (deep page, AU wedge) | ✅ |
| `/specialties/litigation` (deep page) | ✅ |
| `/tools/court-rules` (deadline calculator) | ✅ |
| `/marco/legal` (legal research centre) | ✅ |
| `/marco/accounting` (accounting research centre) | ✅ |
| `/marco/forensic` (forensic research centre) | ✅ |
| `/directory` (professional directory index) | ✅ |
| `/directory/[slug]` (verified-pro profile pages) | ✅ |
| `/cross-border-admission` (multi-jurisdictional pathway service) | ✅ |
| `/launch` (Marco Reid Launch — flagship incorporation product) | ✅ |
| `/tools/conflict-check` (unified conflict + KYC + AML intake) | ✅ |
| `/digest` (daily intelligence digest subscribe) | ✅ |
| `/specialties/te-tiriti-maori` (NZ-native specialty deep page) | ✅ |
| `/specialties/forensic-accounting` (deep page, NZ + AU + UK + US) | ✅ |
| `/research/competitor-audit` (live competitive scorecard) | ✅ |
| `/specialties/business-advisory` (deep page, NZ + AU + UK + US) | ✅ |
| `/specialties/te-tiriti-maori` (deep page) | ⬜ |
| `/specialties/business-advisory` (deep page) | ⬜ |
| `/specialties/forensic-accounting` (deep page) | ⬜ |
| `/specialties/transfer-pricing` (deep page) | ⬜ |
| `/specialties/international-tax` (deep page) | ⬜ |
| `/specialties/rd-tax-credits` (deep page) | ⬜ |
| `/specialties/crypto-accounting` (deep page) | ⬜ |
| `/specialties/[other 41]` deep pages | ⬜ |

---

## Platform / logged-in surface (the bit that needs Wave 0 mapping)

| Surface | Status | Notes |
|---|---|---|
| `/dashboard` (smart router) | ⬜ | Currently single-page for all roles |
| `/admin` (Marco Reid platform admin) | 🟡 | Stub exists, no real surfaces |
| `/firm/*` (firm/practitioner workspace) | ⬜ | Wave 1 |
| `/portal/*` (citizen/client view) | ⬜ | Wave 1 |
| Light theme on platform | ⬜ | Wave 1 — visible quality issue |
| Specialty matrix in firm UI | ⬜ | Wave 1 |
| Sign-off queue UI | ⬜ | Wave 1 |
| Audit ledger viewer | ⬜ | Wave 2 |
| Regulator-filing log viewer | ⬜ | Wave 2 |

---

## Operational / production health

| Item | Status |
|---|---|
| Vercel build green | ✅ |
| Neon database in sync (`prisma db push` succeeded) | ✅ |
| Admin user seeded | ✅ |
| `NEXTAUTH_SECRET` in Vercel | ✅ |
| `NEXTAUTH_URL` in Vercel | ✅ |
| `DATABASE_URL` in Vercel + .env.local | ✅ |
| Custom domain `marcoreid.com` connected | ✅ |
| ccTLD defensive registration (`.co.nz`, `.com.au`, `.co.uk`) | ⬜ |
| Vercel→GitHub auto-deploy fully working | 🟡 — was broken; reconnected |
| Stripe live keys for production billing | ⬜ |
| ANTHROPIC_API_KEY for Marco research | ⬜ |
| Bank-feed credentials (Akahu, Basiq, Plaid, TrueLayer) | ⬜ |
| Migration credentials (Xero / QBO / MYOB / Sage / FreshBooks OAuth) | ⬜ |

---

## Decisions logged (do not reverse without written approval)

1. Sign-off Doctrine is structural, not aspirational
2. NZ + AU are the soft-launch beachhead
3. Top-nav is tight on purpose (4 items)
4. Fee-splitting rules are real — SaaS subscription + flat lead-qualification fees only
5. AI speed ≠ legal speed — sign-off rails not shortcut-able
6. Catch-Up Centre is a top-level product, not a sub-page of /accounting
7. Accounting is positioned multi-jurisdiction from day one
8. "Autonomous" replaces "automated" as the lead adjective for bookkeeping
9. Every filing claims a qualified accountant sign-off
10. Session flywheel lives in SESSION-STATE.md
11. Audit posture is published, not assumed
12. AuditLog is hash-chained
13. Default retention floor is 7 years
14. Right-to-erasure honoured with statutory carve-out
15. NZ/AU immigration adviser practitioner class is distinct from US immigration attorney work
16. Audit ledger is the spine for every vertical
17. Subdirectory URL strategy locked (`marcoreid.com/{nz,au,uk,us}/`)
18. DavenRoe → Marco Reid accountancy division (architectural port)
19. Wave 0 mapping is mandatory before Wave 1+ code
20. The 30-move scorecard IS the canonical strategic backlog
21. Audit writes are synchronous (not fire-and-forget) before response returns
22. **Internationalisation deferred until NZ/AU/UK/US mature** (locked 2026-05-08). Adding Japanese / French / German / Spanish / Chinese UI before the four anchor jurisdictions are mature would split focus. One country at a time, mature first, then expand. Reconsider when all four anchor jurisdictions are 🟢 across the scorecard.
