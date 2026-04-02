# CLAUDE.md — AlecRae Master Blueprint
### The definitive rules, strategy, legal protection framework, and build plan
### Version 1.0 | Created: March 2026 | Status: PRE-LAUNCH

---

> **CLAUDE DIRECTIVE — READ THIS FIRST, EVERY SESSION**
>
> This file is the single source of truth for the AlecRae platform.
> Before providing any advice, writing any code, or making any architectural
> decision, Claude must re-read and honour every rule in this document.
> No suggestion may contradict the legal protection rules, the data sourcing
> rules, or the compliance requirements below. When in doubt, the conservative
> path wins. This platform is built to last decades, not to ship fast and fix later.

---

## 0. Active Build Focus — Read This Every Session

**Current build status as of March 2026:**

| Item | Status |
|---|---|
| alecrae.com | PURCHASED — mothership, building starts here |
| alecrae.accountant | PURCHASED — accounting wing domain secured |
| alecrae.legal | PENDING — purchase when funds available |
| AlecRae Accounting (Astra) | BUILT — rename and migrate to alecrae.accountant |
| AlecRae Law platform | NOT STARTED — alecrae-com repo created, ready to build |
| The Oracle | NOT STARTED |
| AI Dictation | NOT STARTED |
| Legal entities | NOT STARTED |
| Trademarks | NOT STARTED |

**What we are building right now:**
The mothership — alecrae.com — is the first thing to build.
This is the unified platform that houses AlecRae Law, AlecRae Accounting,
AI Dictation, and The Oracle under one roof with one login.

**The build sequence for alecrae.com:**
1. Homepage and marketing shell — the front door of the brand
2. Authentication — firm signup, user login, role-based access
3. Dashboard — the unified command centre for lawyers and accountants
4. AlecRae Voice — THE FIRST FEATURE BUILT. Not a later addition.
   The universal input layer across the entire platform.
   Built on OpenAI Whisper + Claude API post-processing layer.
   Legal and accounting professional language intelligence.
   Multi-language from day one (9 languages).
   Present in: email composer, document editor, Oracle query,
   matter notes, billing entries, messages, AIM adjustments,
   calendar, and Oracle support queries.
   Also powers the Oracle support agent — speak your support
   question, get your answer, no ticket, no bot, no hold music.
   AlecRae Voice IS the platform's intelligence layer.
   Speak. It is done.
5. The Oracle (Law) — legal research, citation verification layer
6. The Oracle (Accounting) — tax and regulatory research
7. The Oracle as Support — same engine, account context added,
   95% of all support queries resolved without human involvement
8. Case management — matters, tasks, deadlines
9. Billing and time tracking
10. Trust accounting (after IOLTA legal clearance)
11. AlecRae Accounting wing — migrate and integrate Astra codebase
12. Email platform — AlecRae Mail with Oracle in the composer

**Claude must confirm the active build item at the start of every session.**
Do not jump ahead. Do not suggest Phase 2 features while Phase 1 is incomplete.
Build each item to faultless standard before moving to the next.

---

## 1. Project Identity

| Field | Value |
|---|---|
| Platform name | AlecRae |
| Tagline | Professional intelligence — law and accounting |
| Founder | Craig Cantyn (Auckland, New Zealand) |
| Legal entity (NZ) | TBD — NZ Ltd Company (to be formed before launch) |
| Legal entity (US) | TBD — Delaware C-Corp (to be formed before launch) |
| IP holding entity | TBD — separate from operating company |
| Target markets | United States (primary), Australia, NZ, UK (secondary) |
| Revenue model | SaaS subscriptions + transaction clips + Oracle premium tier |
| Exit horizon | Acquisition or passive income within 10 years |
| Target acquirers | Thomson Reuters, Wolters Kluwer, Clio, Bloomberg Industry Group |
| Build status | Pre-launch. No customers, no revenue. Domain purchase pending. |

---

## 2. Platform Architecture

### 2.1 The Three Wings

```
AlecRae (parent brand)
├── AlecRae Law          — full-stack legal practice platform
├── AlecRae Accounting   — AI-powered accounting and compliance
└── The Oracle           — cross-domain legal + accounting AI (premium tier)
```

### 2.2 AlecRae Law — full product suite

Every lawyer on earth dictates. **AI Dictation is the universal entry hook.**
A lawyer who does not do immigration, corporate, or any specific practice area
still needs dictation. They come in for dictation. They discover everything else.

### Dictation domain strategy — DECIDED

Dictation lives INSIDE AlecRae. It does NOT get its own separate domain.
Giving it a separate domain turns the best acquisition tool into a standalone
product with no clear path back into the AlecRae ecosystem.

- Primary access: `alecrae.com/dictation` or subdomain `dictate.alecrae.com`
- Both carry the AlecRae brand — the subdomain is cleaner for ads and business cards
- AlecRae Dictation is tuned specifically for legal and accounting vocabulary

### Relationship to 48co.nz

48co.nz (AI voice assistant, already in development) operates as a separate
consumer-facing general dictation product. The split:

| Product | Audience | Domain | Vocabulary |
|---|---|---|---|
| AlecRae Voice | Lawyers and accountants | voice.alecrae.com | Legal + accounting language |
| 48co.nz | General consumer/business | 48co.nz | General purpose |

Same engine underneath. Different vocabulary training and positioning on top.

### Future white-label (Phase 3 only)

If the dictation engine is ever white-labelled to other industries (medical,
engineering, real estate), a neutral standalone domain can be considered then.
This is NOT a now decision. Do not purchase additional dictation domains
until Phase 3 is active and white-labelling is confirmed.

| Module | What it does | Priority |
|---|---|---|
| AlecRae Voice | Speak. It is done. Universal input layer for the platform | Phase 1 — THE HOOK |
| The Oracle — Law | Legal research AI across all public domain case law | Phase 1 |
| Case management | Full matter lifecycle, deadlines, tasks, documents | Phase 1 |
| Document AI + editor | Drafting, review, full word-processing — replaces Word | Phase 1 |
| Spreadsheets | AI-aware spreadsheet tool — replaces Excel | Phase 1 |
| E-signature | Built-in document signing — replaces DocuSign | Phase 1 |
| Legal forms library | Every official court form, AI pre-populated from matter data | Phase 1 |
| Court-rules calendaring | Auto-calculates all downstream deadlines on filing | Phase 1 |
| Billing + time tracking | Hours, rates, invoices, payment collection | Phase 1 |
| Trust accounting | IOLTA-compliant client trust account management | Phase 1 |
| Client CRM | Intake forms, pipeline, communications | Phase 2 |
| Court filing | e-filing integration where APIs are available | Phase 2 |
| Conflict checking | Automated conflict of interest detection | Phase 2 |
| Client portal | Secure document sharing and messaging | Phase 2 |
| Expense scanning | Mobile photo to auto-categorised expense entry | Phase 2 |
| Practice modules | Immigration / Corporate / Family / IP / Criminal / Real estate | Phase 2 |
| Depositions | Video recording, real-time Voice transcription, exhibit management, AI summaries — see Section 2.2c | Phase 2 |
| Courtroom technology | e-filing, real-time transcription, exhibit management, judge analytics — see Section 2.2d | Phase 2 |
| IP law module | Patent search (USPTO), trademark search (TESS), copyright, trade secret, prior art analysis — Oracle IP domain | Phase 2 |
| Company incorporation | Intelligent multi-jurisdiction entity formation — see Section 2.2b below | Phase 2 |
| Secure messaging | Encrypted attorney-client communication | Phase 3 |
| Analytics | Firm performance, matter profitability, judge analytics | Phase 3 |

### 2.2b Company incorporation — intelligent multi-jurisdiction formation

This is one of the most aggressive features in the entire platform.
A client tells their lawyer they want to set up a company. On every
other platform, the lawyer does it manually — researching entity types,
drafting formation documents, filing with state agencies, coordinating
with a CPA on tax structure. Hours of work. Multiple tools. Multiple
professionals working in silos.

**The AlecRae version:**
The lawyer opens a new incorporation workflow. The client specifies:
- What countries or states the company will operate in
- What the business does
- Who the directors/members/shareholders are

The Oracle (both Legal and Accounting simultaneously) then:
1. Recommends the optimal entity type per jurisdiction (LLC in the US,
   Ltd in NZ, Pty Ltd in Australia, etc.)
2. Analyses the tax implications across all jurisdictions involved
3. Recommends an asset protection structure that shields the client
   from liability — holding companies, IP entities, operating entities
4. Identifies potential legal vulnerabilities and recommends protections
5. Generates all formation documents pre-populated with client data
6. Routes documents for e-signature inside the platform
7. E-files with the relevant government agencies where APIs are available
8. Creates the matter record with all documents, deadlines, and compliance
   requirements automatically tracked

**Why this is uniquely possible on AlecRae:**
No other platform has both AI legal AND AI accounting research on the
same platform. When AlecRae recommends a corporate structure, it
simultaneously considers:
- Legal liability protection (Oracle Legal)
- Tax optimisation across jurisdictions (Oracle Accounting)
- Compliance requirements in every jurisdiction (both Oracles)
- Ongoing filing deadlines and regulatory obligations (calendaring)

A lawyer using Clio + Westlaw + QuickBooks cannot do this. The tools
do not talk to each other. The legal analysis lives in one system,
the tax analysis in another, the documents in a third. AlecRae does
it all in one workflow.

**The liability protection angle:**
Every corporate structure recommended by AlecRae must include:
- Separation of personal and business assets
- Appropriate holding company structures where relevant
- IP protection entities where applicable
- Insurance recommendations (D&O, professional liability, general)
- Clear documentation of corporate formalities (minutes, resolutions)
  to prevent piercing of the corporate veil

**The recurring revenue angle:**
Company incorporation is not a one-time event. Every company has
ongoing compliance: annual returns, tax filings, registered agent
requirements, director changes, share transfers, regulatory reporting.
AlecRae tracks all of this automatically after incorporation.
The client stays on the platform permanently. The dependency is total.

**The standard disclaimer applies:**
AlecRae assists professionals in structuring and forming entities.
It does not itself provide legal or tax advice. The professional
reviews and approves every recommendation before it is executed.
The Section 6.4 disclaimer must appear on every AI-generated
incorporation recommendation.

### 2.2c Depositions — AI-powered pre-trial testimony management

Depositions are a massive part of legal practice and a pain point
nightmare. Scheduling across multiple attorneys, witnesses, and court
reporters. Video on separate systems. Transcription by expensive court
reporters at $300-500/day. Exhibits in binders. Notes scattered. Nothing
connected to the case management system.

**What AlecRae builds for depositions:**

1. **Scheduling** — book depositions inside the platform with matter-tagging,
   calendar sync, and automated reminders to all parties
2. **Video recording** — built-in video or Zoom integration, recorded and
   stored inside the matter record
3. **Real-time transcription** — AlecRae Voice transcribes the entire
   deposition live, with legal vocabulary intelligence, speaker
   identification, and timestamps. Replaces the $300-500/day court reporter
4. **Exhibit management** — pull up any exhibit from the matter files
   instantly during the deposition. Tag exhibits as they are referenced
5. **Oracle access during deposition** — check a citation or statute the
   witness mentions in real time. The attorney never loses the thread
6. **AI deposition summary** — after the session, AI generates a structured
   summary with key testimony, objections, exhibits referenced, and
   action items
7. **Searchable transcript** — every word searchable, linked to the matter
   record, timestamped to the video recording
8. **Opposing counsel access** — the other side gets access to the
   transcript and exhibits through the platform. Another hook that brings
   new users onto AlecRae

**The competitive advantage:**
No practice management tool offers integrated real-time transcription
with legal vocabulary intelligence. Court reporters charge $300-500/day.
AlecRae Voice does it in real time, with better legal vocabulary
understanding, for a fraction of the cost. The transcript is immediately
searchable and linked to the matter — no waiting days for delivery.

### 2.2d Courtroom technology — the institutional hook

This is the feature that turns AlecRae from a tool for individual
lawyers into infrastructure that courts themselves depend on.

**What AlecRae builds for courtrooms:**

1. **e-Filing** — electronic filing with courts where APIs are available.
   The attorney files from inside AlecRae, the court receives it
   electronically, and the filing is automatically logged in the matter
2. **Real-time courtroom transcription** — AlecRae Voice transcribes
   proceedings live, replacing or supplementing court stenographers
3. **Exhibit management** — digital exhibit books accessible on iPad or
   laptop during trial. Tag, annotate, and present exhibits
4. **Court-rules calendaring** — already planned. File once, every
   downstream deadline auto-calculated per jurisdiction
5. **Judge analytics** — Phase 3. Which judges rule which way on which
   issues. Sentencing patterns. Motion grant rates. Win/loss ratios by
   judge and case type
6. **Real-time Oracle access** — a lawyer queries The Oracle on their iPad
   mid-hearing to check a citation opposing counsel just raised. 3 seconds
   to verify. That is a superpower in a courtroom

**The institutional hook:**
If a court itself uses AlecRae for filing and document management, then
every attorney who appears in that court needs AlecRae to file. That is
not a sales conversation — it is a requirement. The court becomes the
hook. This is the most aggressive distribution strategy in the entire
platform.

### 2.2e IP law — The Oracle for Intellectual Property

IP attorneys are among the highest-billing lawyers in the profession
($500-800/hour at major firms). They do enormous amounts of research.
The Oracle for IP is a dedicated domain that understands patents,
trademarks, copyright, and trade secrets.

**Data sources for Oracle IP:**
- USPTO patent records (public domain, free API) — patent search,
  prior art analysis, claim interpretation, expiry tracking
- USPTO TESS trademark database — trademark search, likelihood of
  confusion analysis, monitoring for conflicting new filings
- US Copyright Office records — registration search, fair use precedents
- WIPO (World Intellectual Property Organization) — international
  patent and trademark records via Madrid Protocol
- IP case law via CourtListener — infringement cases, licensing disputes,
  trade secret misappropriation

**Unique cross-domain advantage for IP:**
IP work ALWAYS has tax implications. Patent licensing revenue, trademark
valuation for corporate structures, IP holding entity tax strategy,
R&D tax credits for patent development. The Oracle for IP + The Oracle
for Accounting answering IP questions simultaneously is something no
other tool on the planet can do.

**Critical note on AI Dictation grammar:**
The grammar engine must be trained on legal and accounting writing conventions
specifically — NOT general English grammar rules. Legal terms like "whereas,"
"notwithstanding," "hereinafter," and "the plaintiff hereinafter referred to as"
are not errors. They are terms of art with specific legal meaning. A grammar tool
that corrects legal drafting style into plain English will be rejected immediately
by every attorney who tries it. The legal vocabulary and grammar training is what
makes this a professional tool rather than a glorified spell-checker. This must
be documented in the AI Dictation build spec and tested against real legal
documents before launch.

### 2.3 Existing accounting platform — rename required

The AlecRae Accounting platform is already built and deployed at:
https://ledger-ai-seven.vercel.app/

Current branding: **"Astra"** — THIS MUST BE RENAMED BEFORE ANY PUBLIC ACTIVITY.
"Astra" conflicts directly with Google's Project Astra (announced 2024).
Google has the resources and brand recognition to cause serious confusion
and potentially pursue trademark opposition.

Rename to: **AlecRae Accounting** (or a unique sub-brand under AlecRae)
Actions required:
- [ ] Rename platform from Astra to AlecRae Accounting in all UI, code, and assets
- [ ] Update Vercel project name and custom domain to alecrae.accountant
- [ ] Update GitHub repo name to match
- [ ] Confirm no other "Astra" references remain in codebase or marketing copy

### 2.4 AlecRae Accounting — full product suite

| Module | What it does | Priority |
|---|---|---|
| AlecRae Voice | Shared across Law and Accounting — understands both | Phase 1 |
| The Oracle — Accounting | Tax law, compliance, regulatory AI research | Phase 1 |
| Accounting automation | Bookkeeping, reconciliation, journal entries | Phase 1 |
| Bank feed integration | Direct bank connection — auto-pulls and categorises transactions | Phase 1 |
| Spreadsheets | AI-aware financial modelling — dictate to populate | Phase 1 |
| Document editor | Engagement letters, financial reports, official docs with AI | Phase 1 |
| E-signature | Built-in signing for engagement letters and client documents | Phase 1 |
| Tax compliance | US federal + state tax calculation and filing | Phase 1 |
| Receipt + expense scanning | Mobile photo to auto-coded expense entry | Phase 1 |
| Client management | CRM, engagement letters, billing | Phase 2 |
| Reports + filings | Automated financial statements, IRS/HMRC/ATO filings | Phase 2 |
| Payroll | AI-assisted payroll processing | Phase 3 |

**Critical note on bank feed integration:**
Bank feed quality is the feature Xero, QuickBooks, and MYOB are most known for.
AlecRae Accounting must match or exceed their feed reliability from day one.
A bank feed that misses transactions or miscategorises entries will destroy
accountant trust faster than any other single failure. Use Plaid or Salt Edge
as the banking connectivity layer — do not build this from scratch.

### 2.4 The Oracle — premium cross-domain tier

The Oracle is the product nobody else can build because nobody else owns both sides.
It answers questions that cross the legal and accounting boundary simultaneously.
Example: "What are the immigration tax implications of this corporate structure
for a Tier-1 visa applicant?" — that query requires both law and accounting AI.
Only AlecRae can answer it.

Pricing: $499–$999/month per firm. This is the true moat.

---

## 3. Domain Strategy

### 3.1 Domains to purchase (in order of priority)

| Domain | Purpose | Status |
|---|---|---|
| alecrae.com | Primary parent brand | PURCHASED — March 2026 |
| alecrae.legal | AlecRae Law platform | Purchase when funds available |
| alecrae.accountant | AlecRae Accounting platform | PURCHASED — March 2026 |
| oracle.alecrae.com | Subdomain — do not buy separate domain | Subdomain only |
| dictate.alecrae.com | AI Dictation entry point | Subdomain only |

### 3.2 Domain rules

**Why alecrae.legal and not alecrae.law:**
The `.law` TLD is restricted to verified practising lawyers and authorised
legal institutions only. AlecRae is a platform that SERVES lawyers — it is
not a law firm. We cannot register `.law` and should not try to.
`alecrae.legal` has no eligibility restrictions and is arguably stronger
positioning — it signals legal technology platform, not law firm. This
distinction also protects us from any bar association concern that a
non-lawyer entity is holding a `.law` domain. `alecrae.attorney` carries
the same restriction as `.law` — do not attempt that either.

- **DO** purchase all three domains before any public announcement or outreach
- **DO** park domains on Cloudflare immediately after purchase (DDoS protection)
- **DO** set up DMARC, DKIM, SPF email authentication records from day one
- **DO NOT** purchase domains on public registrars that expose WHOIS data — use
  privacy protection or register through your NZ Ltd entity once formed
- **DO NOT** announce domain ownership on social media before trademark filing
- **DO NOT** use any domain that could be confused with Thomson Reuters, Westlaw,
  LexisNexis, Clio, or any existing legal tech brand

---

## 4. Legal Structure — CRITICAL

### 4.1 Required entities (establish before launch, in this order)

**Step 1 — NZ Ltd Company**
- Operating company for NZ/Pacific/Australian market
- **AlecRae Accounting is used internally for all bookkeeping from day one**
  — we do not use Xero, QuickBooks, or any competitor. We use our own platform.
  This is both a cost saving and a live proof point for marketing.
- GST registration — exported digital services are zero-rated (0% GST)
- NZ R&D tax credit applies to AI development costs — document everything

**Step 2 — Delaware C-Corp (US)**
- Required for US market professional services contracts
- Required for eventual US institutional investment or acquisition
- Stripe Connect and US bank account under this entity
- All US attorney and accountant SaaS contracts under this entity

**Step 3 — IP Holding Entity (separate from both above)**
- All intellectual property — code, trademarks, patents, brand — held here
- Operating companies license IP from the holding entity
- If an operating company is ever sued, the IP itself is protected
- Engage a dual-qualified NZ/US corporate attorney to structure this correctly

### 4.2 Professional advisors required before launch

| Advisor | What they must cover | When needed |
|---|---|---|
| NZ/US dual-qualified corporate attorney | Entity structure, IP assignment, Delaware C-Corp | Before any public activity |
| US telecom/legal tech compliance attorney | IOLTA rules by state, bar software approval | Before trust accounting module |
| IP/patent attorney | Provisional patents on AI research layer, Madrid Protocol trademarks | Before domain purchase announcement |
| NZ/US dual-qualified accountant | GST zero-rating, USD/Wise strategy, R&D credits | Before first revenue |
| Privacy attorney | GDPR, NZ Privacy Act 2020, CCPA compliance review | Before beta launch |

---

## 5. Intellectual Property Protection

### 5.1 Trademark filing — DO THIS BEFORE DOMAIN ANNOUNCEMENT

- File "AlecRae" as a trademark in the US (USPTO) under Class 42 (software/SaaS)
  and Class 45 (legal services technology) simultaneously
- File "The Oracle" as a trademark — check for conflicts first, it is a common name
- Use the Madrid Protocol to extend trademark filings internationally:
  NZ, Australia, UK, EU in a single application
- File before any press release, LinkedIn post, or public announcement
- A trademark pending status (™) is sufficient protection during the filing period
- Do NOT use ® until registration is confirmed

### 5.2 Provisional patent applications

File provisional patents (12-month placeholder, inexpensive) on:
- The AI research methodology used by The Oracle (cross-domain legal+accounting query resolution)
- The AI dictation legal vocabulary training methodology
- The multi-jurisdiction company incorporation workflow (Section 2.2b)
  — the specific methodology of simultaneous legal+accounting AI analysis
  for entity formation, asset protection structuring, and automated
  ongoing compliance tracking across multiple jurisdictions
- The email extraction workflow (conversation thread → formatted email)
- The cross-professional matter invitation flow with shared workspace
- The matter-centric notification hook system
- The biometric eSIM activation method (if applicable from 0047 crossover)

Provisional patents cost approximately $1,500–3,000 each with an attorney.
They give you 12 months to develop the full patent application while establishing
the priority date. File before any technical blog posts or public demos.

### 5.3 IP assignment agreements

Every contractor, developer, or freelancer who touches AlecRae code must sign
an IP assignment agreement before they start work. This agreement must state
that all work product, code, designs, and inventions created for AlecRae are
assigned to the IP holding entity. Without this, a contractor could claim
ownership of code they wrote. This is non-negotiable.

---

## 6. Legal Data — THE MOST CRITICAL SECTION

This section is the difference between building a legitimate platform and
getting sued into oblivion. Read it carefully. Follow it absolutely.

### 6.1 What you CAN use freely

The following are public domain in the United States. You may index, search,
summarise, and surface them in The Oracle without any licensing fees:

- All US federal and state court decisions (published opinions)
- All US federal statutes (US Code)
- All US state statutes
- All US federal regulations (Code of Federal Regulations)
- All IRS publications, revenue rulings, and guidance documents
- All SEC filings and public disclosures
- All USPTO patent records
- Congressional records and legislative history
- All equivalent public domain materials for NZ, Australia, and UK

### 6.2 What you CANNOT use — ever

- **Westlaw's Key Number System** — their proprietary legal taxonomy. Do not copy
  their topic/subtopic classification structure. Build your own taxonomy.
- **Westlaw's KeyCite annotations** — their editorial treatment notes on whether
  a case is good law. Build your own citation verification using public domain sources.
- **LexisNexis's Shepard's Citations** — same issue. Your own system only.
- **Any editorial headnotes, summaries, or annotations** from Westlaw, LexisNexis,
  Bloomberg Law, or any commercial publisher. These are proprietary even though
  they describe public domain law.
- **Any content scraped directly from Westlaw.com or Lexis.com** — even if the
  underlying law is public domain, their presentation layer is copyrighted.
- **Matthew Bender publications, treatises, or practice guides** (LexisNexis owned)
- **West's Annotated Codes** (Thomson Reuters owned) — the annotations, not the statutes
- Any content behind a paywall, regardless of whether the underlying subject matter
  is public domain

### 6.3 Where to source legal data legitimately

| Source | What it provides | URL |
|---|---|---|
| CourtListener (Free Law Project) | Millions of US court opinions, free API | courtlistener.com |
| PACER | US federal court filings | pacer.gov |
| Congress.gov API | Federal statutes and legislative history | api.congress.gov |
| Cornell LII (Legal Information Institute) | US Code, CFR, state law | law.cornell.edu |
| GovInfo (GPO) | Official federal documents | govinfo.gov |
| Casetext (now Thomson Reuters) | Was open — check current licensing status |  |
| Fastcase | Licensing available — approach carefully given recent lawsuit | |
| State court websites | Each state publishes its own opinions | varies |

**IMPORTANT:** Before signing any data licensing agreement, have your attorney
review it. The Fastcase vs Alexi lawsuit (2025) was specifically about data
licensing terms. Understand exactly what you are and are not allowed to do
with licensed data before building features on top of it.

### 6.4 The safe harbour statement for every AI output

Every single AI-generated legal or accounting output on AlecRae must display:

> "This content is generated by AI for research and informational purposes only.
> It does not constitute legal advice, tax advice, or professional advice of any kind.
> It does not create an attorney-client or accountant-client relationship.
> Always verify AI-generated content with a qualified professional before reliance.
> AlecRae is a tool for professionals, not a substitute for professional judgment."

This statement must appear:
- On every Oracle research result
- On every AI-generated document draft
- In the platform terms of service (prominently, not buried)
- In the onboarding flow (with explicit acknowledgement checkbox)
- In every API response if you expose an API

---

## 7. Bar and Professional Compliance

### 7.1 Trust accounting (IOLTA) — do not build without legal clearance

Client trust accounts (IOLTA accounts) are governed by state bar rules in every
US state. Attorneys who mishandle trust funds face disbarment. Any software that
touches trust account money must comply with each state's specific requirements.

**Before building the trust accounting module:**
- Commission a 50-state IOLTA compliance analysis from a legal tech attorney
- Identify which states have software approval or notification requirements
- Build the trust accounting module to the strictest state standard
- Have the module reviewed by a legal tech compliance attorney before launch
- Consider partnering with an established IOLTA banking partner (LawPay, Nota)
  rather than building trust accounting from scratch

### 7.2 State bar rules on attorney software

Some state bars have rules about what software attorneys can use for client data.
California, New York, and Texas are the highest-priority states given attorney
population. Research the technology/software provisions in each state's Rules of
Professional Conduct before launching.

### 7.3 Accounting professional regulations

- CPAs in the US are licensed at the state level. Software used by CPAs to
  prepare tax returns or financial statements must not hold itself out as
  providing professional accounting services.
- The IRS has specific rules about who can prepare tax returns (Circular 230).
  AlecRae Accounting is a tool for licensed CPAs — it does not prepare returns,
  it assists CPAs in preparing returns. This distinction must be clear in all
  marketing and terms of service.
- AICPA (American Institute of CPAs) membership rules may affect how CPAs
  can use and promote third-party software. Understand this before AICPA outreach.

---

## 8. Privacy and Data Compliance

### 8.1 Privacy framework — build to GDPR standard, satisfy everything else

GDPR (EU) is the strictest major privacy regulation. If you build to GDPR standard
from day one, you automatically satisfy:
- NZ Privacy Act 2020
- Australian Privacy Act 1988
- CCPA (California Consumer Privacy Act) — with minor additions
- UK GDPR (post-Brexit equivalent)

**GDPR requirements that must be built in from the start:**
- Explicit consent before any data collection
- Right to erasure ("right to be forgotten") — users can delete their data
- Data portability — users can export their data in a standard format
- Privacy by design — collect the minimum data necessary, nothing more
- Data processing agreements with all third-party processors (Anthropic, Neon,
  Vercel, Stripe, Mailgun, etc.)
- A clear, plain-English privacy policy (not legal jargon)
- Breach notification procedures (72-hour notification window under GDPR)

### 8.2 Attorney-client privilege considerations

Legal data is among the most sensitive data in existence. Attorney-client
communications are privileged. Any platform handling this data must:
- Use end-to-end encryption for attorney-client communications
- Never train AI models on individual client data without explicit consent
- Have a zero-data-retention option for the most sensitive use cases
- Be clear in the DPA (Data Processing Agreement) about what Anthropic
  does and does not do with data sent through the Claude API
- Store all client matter data in US-based servers for US customers
  (check state bar rules — some require in-state or US-only data storage)

### 8.3 Data processing agreements required

Before launch, execute DPAs with:
- Anthropic (Claude API)
- Neon (database)
- Vercel (hosting)
- Stripe (payments)
- Mailgun or equivalent (transactional email)
- Any other third-party that processes user data

---

## 9. Competitive Protection — What They Can and Cannot Do to Us

### 9.1 What competitors CANNOT sue us for

- Building legal research software — competition is legal
- Indexing public domain court opinions and statutes
- Building practice management, billing, or CRM software
- Offering AI dictation
- Pricing below them
- Being better than them

### 9.2 What competitors CAN legitimately pursue

- Copying their proprietary editorial content (headnotes, annotations, KeyCite)
- Using their brand names in ways that imply affiliation ("Westlaw alternative"
  is acceptable; "Powered by Westlaw data" is not unless you are licensed)
- Trade dress infringement — making our UI look deliberately identical to theirs
- Scraping data from their platforms in violation of their terms of service
- False advertising claims if we make claims we cannot substantiate

### 9.3 What they might try even if it is not legitimate

Large incumbents sometimes file nuisance suits to drain resources from
competitors. Protection strategies:
- IP holding structure (section 5 above) — the IP is shielded even if the
  operating company is targeted
- Provisional patents establish priority dates and create defensive leverage
- Madrid Protocol trademarks create international brand protection
- Keep clear paper trails of all original development (git commits with dates,
  design documents with creation dates, this CLAUDE.md itself with creation date)
- Never communicate anything in writing that could be misread as an intent to
  copy competitor content
- Maintain D&O (Directors and Officers) insurance once the US entity is formed

---

## 10. The Ultimate Moat — User Dependency as Protection

This section captures a foundational business philosophy that shapes every
product decision. Read it at the start of every build session.

### 10.1 The dependency principle

The most powerful protection AlecRae will ever have is not a trademark,
not a patent, not a legal structure — it is a lawyer or accountant who
cannot imagine running their practice without it.

When AlecRae handles a firm's dictation, case management, billing, trust
accounting, client CRM, legal research, and document drafting simultaneously,
the switching cost is no longer "find a different tool." It becomes
"rebuild your entire practice from scratch." Nobody does that.

A platform that is genuinely irreplaceable to the people using it does not
get sued into oblivion — because the people with the power to pressure
for its removal are the same people whose daily lives depend on it running.

### 10.2 Historical precedents

- **Microsoft (DOJ antitrust, 2001)** — the US government tried to break up
  Microsoft. By that point every law firm, every court, every judge's clerk
  ran Windows and Word. The practical disruption outweighed the legal theory.
  Microsoft walked away largely intact.

- **Westlaw and LexisNexis** — attorneys have complained about their pricing
  for 40 years. Nobody leaves en masse because the alternative is returning
  to physical law libraries. The dependency is the defence.

- **Clio** — became one of only three companies with the depth of legal data
  to compete with Thomson Reuters and LexisNexis. They got there by being
  the practice management system first. The research layer came later because
  firms were already fully inside the platform.

### 10.3 The product decision filter

Every feature must answer this question before it gets built:
**"Does this make a lawyer or accountant more dependent on AlecRae, or less?"**

Features that create the deepest dependency (build first, build best):
- Trust accounting — most regulated, hardest to migrate, most embedded
- Billing history and time tracking — years of financial records nobody moves
- Client matter history — the complete record of every case ever handled
- AI Dictation — daily muscle memory, impossible to retrain once established
- The Oracle — used 20 times a day, becomes the way lawyers think

Features that create shallow dependency (build later):
- Marketing pages and intake forms
- Analytics and reporting dashboards
- Third-party integrations

### 10.4 The network effect layer

Dependency compounds into a true network effect when:
- Attorneys refer clients to other attorneys through the platform
- CPAs and lawyers share client matters across the two wings
- Immigration escrow is processing case fees
- Law firms are inviting clients into the secure client portal

At that point AlecRae is not software anymore. It is infrastructure.
Infrastructure does not get replaced. It gets acquired.

### 10.5 The acquisition inevitability

The target acquirers — Thomson Reuters, Clio, Wolters Kluwer, Bloomberg —
are not going to sue a platform their own customers depend on daily.
They are going to buy it. Every product decision should be made with
that outcome in mind. Build something so embedded, so trusted, and so
irreplaceable that acquisition becomes the only rational response.

---

## 11. Audience Strategy — Every Hook, One Brand

### 11.1 The core philosophy

AlecRae is a five-star hotel. The brand never changes. The elegance never
drops. But the platform casts hooks in every direction simultaneously —
consumers, small businesses, professionals — and pulls everyone into
the same platform through different doors.

The name AlecRae signals professional, ethical, results-driven excellence.
That signal must be consistent across every page, every audience, every
search term we target. The hook looks different. The line is always the same.

### 11.2 The five audiences AlecRae serves

| Audience | What they need | How AlecRae reaches them |
|---|---|---|
| Attorneys and law firms | Practice management, research, billing, dictation | Professional platform pages + AILA/ABA outreach |
| CPAs and accounting firms | Accounting automation, tax, Oracle, dictation | Professional platform pages + AICPA outreach |
| Small businesses | Tax advice, legal compliance, find a professional | Consumer landing pages + SEO content |
| General public | Find a lawyer, find an accountant, understand their rights | Consumer landing pages + educational content |
| Corporates and enterprises | Multi-seat platform, Oracle API, white-label | Enterprise pages + direct sales outreach |

### 11.3 The SEO keyword territories — cast every hook

**Territory 1 — Professional software (high intent, converts to subscriptions)**
- "legal practice management software"
- "AI accounting software for CPA firms"
- "Westlaw alternative" / "Clio alternative" / "QuickBooks alternative"
- "AI legal research tool"
- "IOLTA trust accounting software"
- "AI dictation for lawyers"
- "legal voice to text software"

**Territory 2 — Consumer finding professionals (high volume, feeds marketplace)**
- "find an immigration lawyer"
- "small business accountant near me"
- "corporate lawyer for startup"
- "how to find a CPA"
- "tax accountant for small business"
- "immigration lawyer [city]"
- "divorce attorney [state]"
- "business attorney near me"

**Territory 3 — Tax and accounting advice searches (enormous volume)**
- "how to reduce small business tax"
- "section 199A deduction explained"
- "what expenses can I claim as a business"
- "do I need an accountant for my LLC"
- "GST registration small business"
- "quarterly estimated taxes how to calculate"
- "accountant vs bookkeeper difference"

**Territory 4 — Legal advice and education searches (enormous volume)**
- "what is adverse possession"
- "how does immigration visa work"
- "what does a corporate attorney do"
- "do I need a lawyer for a contract"
- "how to protect my business legally"
- "what is a non-disclosure agreement"
- "employment contract legal requirements"

**Territory 5 — AI and technology searches (growing fast)**
- "AI for lawyers"
- "artificial intelligence legal research"
- "AI accounting software 2026"
- "best AI tools for law firms"
- "ChatGPT for lawyers alternative"

### 11.4 The URL architecture for maximum SEO coverage

Every URL below is a separate page, separately SEO-optimised,
separately indexed by Google. Each one is a hook aimed at a different fish.

```
alecrae.com/                          — Professional homepage (existing)
alecrae.com/law/                      — AlecRae Law platform page
alecrae.com/accounting/               — AlecRae Accounting platform page
alecrae.com/oracle/                   — The Oracle product page
alecrae.com/dictation/                — AI Dictation product page
alecrae.com/pricing/                  — Pricing page

alecrae.com/find-a-lawyer/            — Consumer: find an attorney
alecrae.com/find-an-accountant/       — Consumer: find a CPA
alecrae.com/for-small-business/       — Consumer: small business hub
alecrae.com/for-startups/             — Consumer: startup legal + accounting
alecrae.com/immigration-help/         — Consumer: immigration legal help

alecrae.com/resources/                — Educational content hub (blog)
alecrae.com/resources/[slug]          — Individual educational articles
alecrae.com/guides/                   — In-depth professional guides

alecrae.com/compare/westlaw/          — Comparison: AlecRae vs Westlaw
alecrae.com/compare/clio/             — Comparison: AlecRae vs Clio
alecrae.com/compare/quickbooks/       — Comparison: AlecRae vs QuickBooks
alecrae.com/compare/lexisnexis/       — Comparison: AlecRae vs LexisNexis
```

### 11.5 The brand rule for every audience

No matter which page a visitor lands on — whether they are a senior
partner at a 50-person law firm or a first-generation immigrant looking
for visa help — they experience the same AlecRae:

- Same typography (Instrument Serif + Plus Jakarta Sans)
- Same colour system (navy, forest, plum accents on clean white)
- Same tone of voice: calm, authoritative, results-driven, never salesy
- Same promise: professional, ethical, transformational

The consumer pages speak to a different problem. They never speak
differently. AlecRae does not have a "cheap version" for the public.
It has an accessible version that respects the intelligence of every
person who lands on it.

### 11.6 The content machine — SEO at scale

The Oracle generates content-quality legal and accounting explanations.
AlecRae should publish 3–5 educational articles per week targeting
Territory 3 and Territory 4 keyword searches above. Each article:

- Written to genuinely educate — not thin SEO filler
- Ends with a natural pathway into the platform or the find-a-professional service
- Carries the standard AI disclaimer if any legal/tax content is included
- Structured with proper H1/H2/H3 hierarchy, schema markup, meta description
- Targets one primary keyword and 2–3 secondary keywords

Over 12 months this content library becomes the single most powerful
SEO asset AlecRae owns — compounding traffic that no advertising budget can buy.

### 11.7 Schema markup — tell Google exactly what AlecRae is

Every page must implement the correct structured data schema:

- Homepage: Organization schema + SoftwareApplication schema
- Law platform page: SoftwareApplication schema (legal category)
- Accounting platform page: SoftwareApplication schema (accounting category)
- Find-a-lawyer page: ProfessionalService schema + LegalService schema
- Find-an-accountant page: ProfessionalService schema + AccountingService schema
- Educational articles: Article schema + FAQPage schema (for featured snippets)
- Pricing page: SoftwareApplication schema with offers

Schema markup is invisible to users but tells Google precisely what type
of content and service is on each page. It dramatically improves the chance
of appearing in rich results, featured snippets, and the People Also Ask box.

---

## 12. Marketing and Positioning Strategy

### 11.1 The positioning statement

AlecRae is not a legal research tool. It is not accounting software.
It is the operating system for legal and accounting professionals.

Westlaw sells access to law. LexisNexis sells access to law.
AlecRae sells the ability to practise law and accounting — entirely,
from first client contact to final invoice, powered by AI throughout.

### 11.2 What we never say in marketing

- **Never say "legal advice"** — we provide legal research tools, not advice
- **Never say "tax advice"** — we assist CPAs, we do not advise clients
- **Never say "better than Westlaw"** — say "built for the AI era" instead
- **Never use competitor brand names** in ads or headlines (search ads are fine
  as keyword targeting, but not in ad copy itself)
- **Never claim accuracy guarantees** on AI outputs — always pair with the
  standard disclaimer from Section 6.4
- **Never imply the platform replaces a lawyer or accountant** — it makes
  them dramatically more effective, it does not replace them

### 11.3 What we always say

- "The operating system for your legal practice"
- "Every tool your firm needs, in one platform"
- "Built by professionals, powered by AI"
- "The Oracle — research that crosses every boundary"
- "AlecRae Dictation — the only dictation tool that speaks law"

### 11.4 Early adopter strategy

The single most powerful marketing asset in professional services is a
named case study from a respected firm. One well-known immigration attorney
or CPA publicly stating "this replaced three tools and saved us 15 hours a
week" is worth more than $100,000 in advertising.

Target for early access programme:
- 10 solo immigration attorneys (easiest to onboard, fastest to see value)
- 10 small CPA firms (2–5 staff)
- 2–3 mid-size law firms willing to pilot the full platform

Offer them 12 months free in exchange for a documented case study and
permission to use their firm name in marketing. This is the AILA and
AICPA strategy — the professional community trusts peers, not ads.

---

## 13. Financial and Revenue Structure

### 10.1 Payment infrastructure

| Layer | Provider | Purpose |
|---|---|---|
| Payment processing | Stripe | Subscriptions and one-time payments |
| Attorney payments + trust | Stripe Connect + IOLTA partner | Trust-compliant attorney billing |
| Escrow (immigration marketplace) | Stripe Connect or Escrow.com | Immigration case fee escrow |
| USD holding (NZ entity) | Wise Business | Hold USD without conversion friction |
| NZ banking | BNZ or ANZ business account | NZ operations |
| US banking | Mercury or Relay | US entity operations |

### 10.2 Pricing tiers (initial — to be validated with early users)

**AlecRae Law**
- Starter: $99/month — AI Dictation + basic case management (solo attorney)
- Professional: $199/month — full platform except Oracle (small firm)
- Firm: $399/month per seat — full platform including Oracle Law

**AlecRae Accounting**
- Starter: $79/month — AI Dictation + basic accounting tools (solo CPA)
- Professional: $149/month — full platform except Oracle
- Firm: $299/month per seat — full platform including Oracle Accounting

**The Oracle**
- Cross-domain: $499/month — Oracle Law + Oracle Accounting combined
- Enterprise: $999/month — Oracle + white-label + API access + priority support

**Immigration Marketplace (within AlecRae Law)**
- 5% clip on all escrow transactions — passive recurring revenue

### 10.3 Tax and GST

- Exported digital services from NZ are GST zero-rated (0%)
- US SaaS sales create state tax nexus obligations — use Stripe Tax from launch
- USD revenue held in Wise Business before conversion to NZD
- Engage dual-qualified NZ/US accountant before first US revenue is earned

---

## 14. Pre-Launch Checklist — Nothing Goes Live Until This Is Done

### Legal (non-negotiable)
- [ ] NZ Ltd Company formed
- [ ] Delaware C-Corp formed
- [ ] IP holding entity formed
- [ ] All IP assigned from personal ownership to IP holding entity
- [ ] IP licensing agreements between holding entity and operating companies
- [ ] Trademark applications filed — AlecRae, The Oracle (US + Madrid Protocol)
- [ ] Provisional patent applications filed
- [ ] IOLTA compliance analysis completed by legal tech attorney
- [ ] Privacy policy drafted and reviewed by privacy attorney
- [ ] Terms of service drafted and reviewed by attorney
- [ ] Data processing agreements executed with all third-party processors
- [ ] IP assignment agreements ready for all contractors

### Domain and brand
- [ ] alecrae.com purchased
- [ ] alecrae.legal purchased
- [ ] alecrae.accountant purchased
- [ ] All domains pointed to Cloudflare
- [ ] Email authentication (DMARC, DKIM, SPF) configured
- [ ] No public announcement made before trademark filing

### Technical (pre-launch)
- [ ] CLAUDE.md committed to every relevant GitHub repo
- [ ] AI disclaimer text implemented on every AI output
- [ ] User consent flow implemented (privacy, terms, AI disclaimer acknowledgement)
- [ ] GDPR right-to-erasure and data export functionality built
- [ ] End-to-end encryption on all attorney-client communications
- [ ] Data stored in US-based infrastructure for US customers
- [ ] robots.txt blocking all crawlers
- [ ] Security audit completed before beta invite

### Financial
- [ ] Wise Business account opened
- [ ] Stripe account under US entity
- [ ] Stripe Tax enabled from first transaction
- [ ] Xero NZ configured for NZ Ltd
- [ ] US accounting software configured for Delaware C-Corp

---

## 15. Build Phases

### Phase 1 — The Hook (build first, launch when faultless)
1. AI Dictation — legal and accounting vocabulary, available to both wings
2. The Oracle (Law) — public domain case law and statute research
3. The Oracle (Accounting) — public domain tax and regulatory research
4. Basic case management — matters, tasks, deadlines, document storage
5. Basic billing — time tracking, invoices, Stripe payment collection
6. Trust accounting — IOLTA compliant (after legal clearance)
7. User authentication, firm management, role-based access

### Phase 2 — The Platform
1. Document AI — drafting and review
2. Client CRM and intake
3. The Oracle cross-domain — the premium tier
4. AlecRae Immigration module (from Verom.ai, rebranded)
5. Corporate law, family law, IP practice modules
6. AlecRae Accounting full suite
7. Client portal with secure messaging

### Phase 3 — The Moat
1. Judge analytics and litigation pattern recognition
2. Firm performance analytics
3. White-label The Oracle for law schools and bar associations
4. Public API for The Oracle
5. International expansion (AU, NZ, UK content layers)
6. Mobile apps (iOS and Android)

---

## 16. Distribution Strategy

### Attorney acquisition
- AILA (American Immigration Lawyers Association) — conference presence and
  case studies from immigration attorneys using the platform
- ABA (American Bar Association) — TechShow conference is the single most
  important annual event in legal technology
- State bar continuing legal education (CLE) sponsorships
- Law school partnerships — provide free access to students who become
  paying attorneys (Westlaw and LexisNexis both do this)
- Attorney referral programme — attorneys who refer other attorneys receive
  a revenue share

### Accountant acquisition
- AICPA conference presence
- State CPA society partnerships
- Referral programme mirroring the attorney programme
- Cross-referral between law and accounting wings — the network effect

### The Oracle as a loss leader
- Offer The Oracle at a deeply discounted rate or free trial to
  established law firms and accounting firms
- Once a firm's attorneys and CPAs are using The Oracle daily,
  switching cost becomes enormous
- Upsell to full platform once Oracle dependency is established

---

## 17. Claude Behaviour Rules for This Project

These rules govern how Claude assists with AlecRae in every session.

1. **Always read this file first.** Before providing any advice, Claude must
   acknowledge the constraints in this document. If a suggestion would violate
   any rule here, Claude must say so explicitly and offer a compliant alternative.

2. **Legal protection is non-negotiable.** Claude must never suggest sourcing
   data from Westlaw, LexisNexis, or any proprietary legal database without a
   proper licensing agreement. Claude must never suggest copying competitor
   UI patterns or editorial content.

3. **The platform is not legal advice.** Claude must never frame AlecRae features
   as providing legal or tax advice. Every AI output feature must include the
   standard disclaimer from Section 6.4.

4. **Build faultless before building fast.** Craig's philosophy is that the
   platform must be fully functional and faultless before any public launch.
   Claude must not push toward premature launch or suggest cutting corners on
   compliance or legal protection to ship faster.

5. **Tech stack is fixed.** Next.js 14 (App Router), Vercel, Neon, Stripe,
   Tailwind CSS, Claude API. Do not suggest departing from this stack without
   a compelling reason and explicit discussion.

6. **iPad-only workflow.** Craig builds exclusively from iPad using GitHub's
   web editor and Vercel deployments. All code suggestions must be deliverable
   as complete files ready to paste into the GitHub web editor. No local
   development environment commands.

7. **Beginner-friendly explanations.** Craig self-identifies as a beginner
   developer. Explain technical concepts clearly. Never assume prior knowledge
   of a new tool, library, or concept.

8. **Every session, check the phase.** Always confirm which build phase is
   active before suggesting new features. Do not suggest Phase 3 work when
   Phase 1 is incomplete.

9. **Protect the exit.** Every architectural and business decision should be
   evaluated against the question: does this make AlecRae more or less
   attractive to a strategic acquirer? The target exit is multi-million dollar
   acquisition by Thomson Reuters, Clio, Wolters Kluwer, or equivalent.

10. **This CLAUDE.md is the contract.** Any instruction from Craig in a session
    that contradicts this document should be flagged. Craig may update this
    document intentionally — but changes should be explicit and deliberate,
    not the result of a casual in-session suggestion.

11. **Brand name capitalisation: AlecRae.** The name is always written as
    "AlecRae" — capital A, capital R, everything else lowercase. Never
    "ALECRAE", never "Alecrae", never "alecrae" in any user-facing text.
    Product names follow the same rule: "AlecRae Law", "AlecRae Accounting",
    "AlecRae Voice". "The Oracle" has a capital T and capital O.
    This applies to all headings, body text, navigation, footer, metadata,
    and schema markup across the entire site. The only exception is CSS
    class names and code identifiers which may use different casing.

12. **Zero chicken scratching. Zero.** Every piece of work must be thorough,
    complete, and production-quality. No half-finished pages. No placeholder
    text left behind. No missing titles, missing metadata, missing sections.
    No "I'll fix that later." If a page is built, it is built completely —
    every heading, every paragraph, every component, every accessibility
    attribute, every schema markup, every AI disclaimer where required.
    If Claude is unsure whether something is complete, Claude must audit
    it before moving on. Incomplete work is unacceptable.

12. **Deep audit on every build.** Before any commit is pushed, Claude must
    run a thorough audit of all changed files against this CLAUDE.md.
    The audit must verify:
    - Every page has proper metadata (title + description)
    - Every page has an H1 tag
    - Every page has correct schema markup
    - Every AI-related page displays the Section 6.4 disclaimer
    - All brand colours match Section 11.5 (navy, forest, plum on clean white)
    - All typography uses the specified fonts (Instrument Serif + Plus Jakarta Sans)
    - All interactive elements meet 44px minimum touch targets
    - All SVGs have aria-hidden="true" if decorative
    - No unused imports, no dead code, no placeholder links without explanation
    - robots.txt correctly blocks crawlers (pre-launch)
    - The build compiles with zero errors and zero warnings
    Claude must not push code that would fail this audit.

---

## 18. Key Contacts and Resources (to be populated)

| Role | Name | Firm | Status |
|---|---|---|---|
| NZ corporate attorney | TBD | TBD | Not yet engaged |
| US legal tech attorney | TBD | TBD | Not yet engaged |
| NZ/US accountant | TBD | TBD | Not yet engaged |
| IP/patent attorney | TBD | TBD | Not yet engaged |
| Privacy attorney | TBD | TBD | Not yet engaged |

---

## 19. Tech Stack — Fixed Unless Explicitly Changed

This stack is not up for debate session to session. Any suggestion to
depart from it requires explicit discussion and a documented decision.

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | Fixed |
| Hosting | Vercel | Fixed |
| Database | Neon (PostgreSQL) | Fixed — founder already experienced with Neon |
| ORM | Prisma | Fixed — type-safe database access, already used in VoiceTyper Pro |
| Payments | Stripe + Stripe Connect | Fixed |
| Styling | Tailwind CSS | Fixed |
| AI engine | Claude API (Anthropic) | Fixed |
| Email (transactional) | Mailgun | Fixed |
| DNS + CDN | Cloudflare | Fixed |
| Storage | Cloudflare R2 | For documents and media |
| Auth | Neon (PostgreSQL) + NextAuth.js | Fixed |

**Developer workflow (iPad-only):**
- All code produced by Claude as complete, ready-to-paste files
- Files added to GitHub via the browser web editor
- Vercel auto-deploys on every commit to main
- No local development environment — ever
- No terminal commands that require a local machine

---

## 20. Competitive Intelligence — Know the Enemy

### 19.1 The incumbents and their weaknesses

| Competitor | Strength | Critical weakness | Our angle |
|---|---|---|---|
| Westlaw (Thomson Reuters) | Deepest case law database | Expensive, UI stuck in 2010, no practice management | We do everything in one platform |
| LexisNexis (RELX) | Research + risk data combined | Same pricing problem, same UI problem | Same |
| Clio | Best practice management | No Oracle-equivalent research AI | We have both |
| Bloomberg Law | Financial/securities depth | Weak for solo and small firm attorneys | We price for solo and SMB |
| Wolters Kluwer | Tax and accounting depth | Fragmented products, no unified platform | AlecRae is one login for everything |

### 19.2 The new threat — Harvey AI

Harvey raised $300M at a $5B valuation in 2025. LexisNexis invested in them
and formed a strategic partnership. Harvey is AI-native and well-funded.

What Harvey does not have: practice management, billing, trust accounting,
dictation, or the accounting wing. Harvey is a research and drafting tool.
AlecRae is the entire operating system. These are different products.

Watch Harvey closely. If they move into practice management, that changes
the competitive picture significantly.

### 19.3 Monitoring rule

Before building any major new feature, search for whether Harvey, Clio,
Thomson Reuters, or LexisNexis has announced or shipped something similar
in the last 90 days. Build what they have not built yet, or build it
dramatically better than what they just shipped.

---

## 21. Crisis Response Protocols

### 20.1 If we receive a cease and desist letter

1. Do not respond. Do not panic. Do not take anything offline immediately.
2. Forward to our US legal tech attorney within 24 hours.
3. The attorney assesses whether the claim has merit before any action is taken.
4. Most C&D letters from large incumbents are designed to intimidate, not litigate.
5. Our clean data sourcing and original IP mean most claims will lack merit.

### 20.2 If a data breach occurs

1. Isolate the affected system immediately.
2. Notify our privacy attorney within 2 hours.
3. Under GDPR we have 72 hours to notify the relevant supervisory authority.
4. Under NZ Privacy Act 2020 we must notify the Privacy Commissioner of serious breaches.
5. Affected users must be notified promptly and honestly.
6. Do not attempt to conceal a breach. Concealment creates far greater liability
   than the breach itself.

### 20.3 If a bar complaint is filed against the platform

A bar complaint could arise if an attorney claims our software caused them
to mishandle client funds (trust accounting) or miss a filing deadline.
1. Notify our US legal tech attorney immediately.
2. Pull complete logs for the affected matter — our audit trail is our defence.
3. This is why the trust accounting module must be built with full audit logging
   of every transaction, every user action, and every system event.
4. This is why we carry professional liability insurance once the US entity is formed.

### 20.4 If a competitor acquires a direct competitor to us

(e.g. Thomson Reuters acquires a practice management startup that overlaps with us)
1. This is not a threat. It is a signal that the market is validating our thesis.
2. Accelerate outreach to the other target acquirers immediately.
3. A competitive acquisition by one player often triggers defensive acquisitions
   by others. Be ready to engage.

---

## 22. AI Hallucination Risk — Legal Context Protocol

This section is non-negotiable. It exists because a single hallucinated
court citation submitted to a judge can destroy a law firm's reputation,
result in attorney sanctions, and attach AlecRae's name to a national
news story. This has already happened to other platforms. It will not
happen to us.

### 21.1 The Mata v. Avianca precedent (2023)

In 2023, a New York attorney submitted a legal brief to a US federal court
citing multiple cases that did not exist. ChatGPT had fabricated them.
The attorney was sanctioned, fined, and publicly humiliated. The case
became known internationally as the defining cautionary tale of AI in law.

This is the specific failure mode AlecRae must be engineered to prevent.
It is not hypothetical. It has already happened. It will happen again
on other platforms. It must never happen on ours.

### 21.2 What we build to prevent this

Every single case citation produced by The Oracle must go through a
mandatory verification layer before it is displayed to the user:

1. **Citation existence check** — before displaying any case citation,
   the system must verify the case exists in the CourtListener database
   or equivalent authoritative public domain source. If the case cannot
   be verified, it must NOT be displayed. Period.

2. **Dead link prevention** — every citation must include a direct link
   to the verified source document. A citation without a verifiable
   source link is treated as unverified and flagged accordingly.

3. **Verification badge system** — every citation displayed to the user
   must carry one of three visible status badges:
   - ✓ VERIFIED — case confirmed in authoritative source, link provided
   - ⚠ UNVERIFIED — case could not be confirmed, do not rely on this citation
   - ✗ NOT FOUND — case does not appear to exist, do not use

4. **No unverified citations in drafts** — the Document AI drafting tool
   must never auto-insert an unverified citation into a document. Verified
   citations only. Unverified suggestions must require explicit manual
   attorney review and insertion.

5. **Hallucination warning on every research result** — in addition to
   the standard AI disclaimer, every Oracle research result must display:

   > "Always verify every case citation before relying on it in any
   > court filing or legal document. AlecRae's citation verification
   > system reduces hallucination risk but does not eliminate it.
   > The professional responsibility for verifying citations rests
   > with the attorney of record."

### 21.3 Why this protects AlecRae legally

An attorney who ignores a clearly displayed ⚠ UNVERIFIED badge and submits
that citation to court has made a professional decision. The liability is
theirs. The badge is our documented warning, our terms of service is our
contract, and our logs show exactly what verification status was displayed
at the time of use. This is the paper trail that keeps AlecRae out of the
sanctions order.

An attorney who submits a citation that our system incorrectly marked
✓ VERIFIED is a different situation. This is why the citation verification
layer must be rock solid — it is both a professional service feature and
our primary legal defence.

### 21.4 The accounting equivalent

Hallucination in an accounting context is equally dangerous. An AI that
invents a tax code provision, cites a non-existent IRS ruling, or
fabricates a regulatory threshold could cause a CPA to file an incorrect
return, resulting in client penalties and professional sanctions.

The same verification principle applies to The Oracle — Accounting:
- Every IRS code section cited must link to the official IRS source
- Every regulatory citation must link to the official CFR or equivalent
- Unverified regulatory citations must carry the same warning badge system

---

## 23. Security Certification Roadmap

### 22.1 Why this matters

Mid-size and large law firms — the highest-value customers — have IT
security requirements that must be met before they will allow a
third-party platform to handle client data. The most common requirement
is SOC 2 Type II certification. Without it, enterprise sales stall
at the IT security review stage regardless of how good the product is.

This is not a day-one requirement. It is a pre-enterprise-sales requirement.
Build it into the roadmap so it does not get forgotten.

### 22.2 The certification roadmap

**Phase 1 (pre-launch) — security foundations**
These must be in place before any customer data is handled:
- [ ] All data encrypted at rest (Supabase encryption enabled)
- [ ] All data encrypted in transit (TLS 1.3 minimum)
- [ ] End-to-end encryption on attorney-client communications
- [ ] Role-based access control (RBAC) — no user sees data outside their firm
- [ ] Multi-factor authentication (MFA) mandatory for all accounts
- [ ] Audit logging — every user action, every data access, timestamped
- [ ] Automated backups with tested restore procedures
- [ ] Dependency scanning (GitHub Dependabot or equivalent)
- [ ] Environment variables never in code — always in Vercel environment config
- [ ] robots.txt blocking all crawlers on all platforms

**Phase 2 (first 50 paying firms) — security hardening**
- [ ] Penetration testing by an independent security firm
- [ ] Formal incident response plan documented
- [ ] Employee/contractor security training and NDAs
- [ ] Vendor security review for all third-party processors
- [ ] Data retention and deletion policy enforced programmatically

**Phase 3 (pre-enterprise sales) — SOC 2 Type II**
- [ ] Engage a SOC 2 readiness consultant (typically $15,000–40,000 NZD)
- [ ] 6-month observation period with auditor monitoring controls
- [ ] SOC 2 Type II report issued — this is what enterprise IT requires
- [ ] Estimated timeline: 9–12 months from engagement to certification
- [ ] Estimated cost: $30,000–80,000 NZD total including consultant and audit

**Why SOC 2 Type II and not Type I:**
Type I is a point-in-time snapshot. Type II covers a 6-month period and
demonstrates sustained security controls over time. Enterprise legal and
accounting firms require Type II. Do not waste money on Type I.

### 22.3 In the meantime — the security trust page

Before SOC 2 is achieved, publish a detailed Security page on alecrae.com
that explains every security measure in plain English. This does not replace
certification but it demonstrates seriousness and answers the question before
it is asked. Clio, Harvey, and every serious legal SaaS has one.

### 22.4 Legal-grade security — courtroom admissibility standard

AlecRae handles the most sensitive data in the professional world:
attorney-client privileged communications, client trust fund records,
deposition testimony, court filings, and corporate formation documents.
The security architecture must meet courtroom admissibility standards —
not just "good enough for SaaS."

**Immutable audit trails (cryptographically signed, append-only):**
Every action on the platform — every document edit, every message sent,
every billing entry, every deposition recording — is logged in an
append-only audit trail that is cryptographically signed. No record
can be modified or deleted after creation. This creates a legally
defensible chain of evidence that can be presented in court.

**FIPS 140-3 encryption:**
All data encrypted at rest and in transit using FIPS 140-3 validated
cryptographic modules. This is the federal government standard and
the standard required by courts for electronic evidence. No exceptions.

**Chain of custody tracking:**
Every document and recording has a complete chain of custody record:
who created it, who accessed it, who modified it, when, and from where.
If opposing counsel challenges the authenticity of a document, the chain
of custody record proves its integrity.

**Tamper-evident architecture:**
If any data is modified outside the normal application flow — by a
database administrator, by a compromised system, or by any other means —
the cryptographic signatures break and the system flags the tampering
immediately. Evidence integrity is mathematically provable.

**Court-admissible metadata preservation:**
All documents and recordings preserve their original metadata: creation
date, author, modification history, GPS location (if available), device
information. This metadata is itself immutable and cryptographically
signed. It meets the Federal Rules of Evidence requirements for
electronically stored information (ESI).

**Zero-knowledge architecture (Phase 3):**
The ultimate security goal: even AlecRae as a company cannot access
client data. Encryption keys held exclusively by the firm. AlecRae
infrastructure processes encrypted data without ever decrypting it.
This is the gold standard for attorney-client privilege protection
and the feature that makes enterprise law firms say yes.

### 22.5 Universal device and integration architecture

AlecRae must work on every device a professional uses, and integrate
with every system they cannot immediately replace.

**Device support (all platforms from Phase 1):**
- Desktop: Chrome, Firefox, Safari, Edge (web application)
- iPad: Safari, Chrome (founder's primary device — first-class support)
- iPhone / Android: Responsive web, native app in Phase 3
- Apple Watch: Notifications and quick actions (Phase 3)

**Legal-specific integrations:**
- PACER (Public Access to Court Electronic Records) — federal court
  docket access and filing
- State court e-filing systems — jurisdiction-specific APIs
- Court calendar sync — pull court hearing dates into AlecRae calendar
- Bar association member verification — verify attorney credentials

**Accounting-specific integrations:**
- Plaid (bank feeds) — already specified, Phase 1
- Stripe (payments and billing) — already specified, Phase 1
- IRS e-filing (when available) — direct electronic tax filing
- State tax authority portals — electronic filing per state

**Productivity integrations:**
- Gmail + Google Workspace (OAuth) — email inside AlecRae
- Microsoft 365 + Outlook (OAuth) — email inside AlecRae
- Zoom — video meetings and depositions
- Google Calendar + Outlook Calendar (two-way sync)
- Dropbox / Google Drive / OneDrive — document import/export
- Slack — notifications and quick actions

**The integration principle:**
Every integration must PULL the user deeper into AlecRae, not push
them out. Gmail integration means the lawyer does email inside AlecRae.
Zoom integration means the meeting is tagged to a matter. Calendar sync
means deadlines appear in AlecRae first. The integration always serves
the platform, never the external tool.

### 22.6 Advanced legal components — courtroom-ready technology

**Deposition video + transcript synchronisation:**
The deposition video recording is synchronised frame-by-frame with
the AlecRae Voice transcript. Click any line in the transcript and the
video jumps to that exact moment. Click any moment in the video and
the transcript highlights the corresponding text. Attorneys can search
the transcript and instantly jump to the video moment. This is how
professional litigation support tools work — AlecRae includes it
natively.

**Evidence viewer with annotation:**
View any document, image, or recording as evidence. Add annotations,
highlights, and redactions. Every annotation is timestamped, attributed,
and part of the immutable audit trail. Annotations can be shown or
hidden for different audiences (internal vs. opposing counsel vs. court).

**Redaction tools:**
Redact sensitive information from documents before sharing. The redaction
is permanent and irreversible — the underlying text is destroyed, not
just hidden. Metadata is also scrubbed. Meets Federal Rules of Civil
Procedure requirements for document production.

**Exhibit management system:**
Organise documents as numbered exhibits for deposition, trial, or
arbitration. Tag, reorder, annotate, and present exhibits from iPad or
laptop. Exhibit lists generated automatically. Opposing counsel can
access shared exhibits through the platform (hook).

**Digital signature with legal weight:**
E-signatures that meet the requirements of the US ESIGN Act, the
NZ Electronic Transactions Act 2002, the Australian Electronic
Transactions Act 1999, and the UK Electronic Communications Act 2000.
Multi-factor authentication before signing. Tamper-evident signature
certificates. Complete audit trail of the signing ceremony.

---

## 24. Launch Sequence — The Linear Timeline

This is the single most important operational section of this document.
Every task has a dependency. Do them out of order and something breaks.
A new Claude session should read this section first to orient to where
in the build we currently are.

**Current status: PRE-LAUNCH — no domains purchased, no entities formed**

---

### STAGE 1 — Legal foundations (before anything else)
*Nothing public. Nothing purchased. No announcements.*

- [ ] 1.1 Engage NZ/US dual-qualified corporate attorney
- [ ] 1.2 Form NZ Ltd Company
- [ ] 1.3 Form Delaware C-Corp
- [ ] 1.4 Form IP holding entity
- [ ] 1.5 Transfer all existing IP (Astra/AlecRae Accounting codebase,
       AlecRae concept, all designs) from personal ownership to IP holding entity
- [ ] 1.6 Execute IP licensing agreements between holding entity and
       operating companies
- [ ] 1.7 Engage IP/patent attorney
- [ ] 1.8 File provisional patent applications (Oracle AI methodology,
       Dictation legal vocabulary methodology)
- [ ] 1.9 File trademark applications — "AlecRae" (USPTO + Madrid Protocol)
- [ ] 1.10 Confirm "The Oracle" trademark availability and file if clear

**Stage 1 gate: ALL boxes checked before proceeding to Stage 2**

---

### STAGE 2 — Domains and infrastructure (after trademark filing)
*Trademark must be filed before any public domain announcement*

- [x] 2.1 Purchase alecrae.com — DONE March 2026
- [ ] 2.2 Purchase alecrae.legal — purchase when funds available
- [x] 2.3 Purchase alecrae.accountant — DONE March 2026
- [ ] 2.4 Point alecrae.com to Cloudflare — DO THIS TODAY
- [ ] 2.4a Point alecrae.legal to Cloudflare immediately after purchase
- [ ] 2.4b Point alecrae.accountant to Cloudflare immediately after purchase
- [ ] 2.5 Configure DMARC, DKIM, SPF on all domains
- [ ] 2.5a Set up Cloudflare Email Routing on alecrae.com (craig@alecrae.com)
- [x] 2.6 Create alecrae-com GitHub repository — DONE March 2026
- [ ] 2.7 Create the following remaining repositories:
       - alecrae-accounting (AlecRae Accounting wing, migrated from Astra)
       - alecrae-oracle (The Oracle AI engine — shared across both wings)
       - alecrae-dictation (AI Dictation tool — shared across both wings)
- [ ] 2.8 Commit this CLAUDE.md to the root of EVERY repository
       IMPORTANT: The CLAUDE.md is a document only — it does not auto-create
       repos or configure anything. Every repo must be created manually in
       GitHub and this file committed to each repo root individually.
- [ ] 2.8 Set up Vercel projects linked to GitHub repos
- [ ] 2.9 Configure Neon projects (one per platform wing)
- [ ] 2.10 Open Wise Business account (USD holding)
- [ ] 2.11 Open Mercury or Relay account (US entity banking)
- [ ] 2.12 Set up Stripe under Delaware C-Corp entity
- [ ] 2.13 Enable Stripe Tax from configuration — before first transaction

**Stage 2 gate: ALL boxes checked before proceeding to Stage 3**

---

### STAGE 3 — Rename and consolidate existing platforms
*Clean the house before building the new one*

- [ ] 3.1 Rename "Astra" to "AlecRae Accounting" across all UI and code
- [ ] 3.2 Update Vercel project name and point to alecrae.accountant domain
- [ ] 3.3 Update GitHub repo name to match
- [ ] 3.4 Audit entire Astra codebase — confirm zero remaining "Astra" references
- [ ] 3.5 Review Astra feature set against the AlecRae Accounting Phase 1
       product requirements — document what is built vs what needs building
- [ ] 3.6 Confirm Verom.ai immigration compliance codebase is ready to
       migrate into AlecRae Law as the Immigration module

**Stage 3 gate: ALL boxes checked before proceeding to Stage 4**

---

### STAGE 4 — Privacy and compliance documentation
*Must be in place before any user touches the platform*

- [ ] 4.1 Engage privacy attorney for GDPR/NZ Privacy Act review
- [ ] 4.2 Draft and finalise Privacy Policy
- [ ] 4.3 Draft and finalise Terms of Service
- [ ] 4.4 Draft and finalise Data Processing Agreement (template for users)
- [ ] 4.5 Execute DPAs with: Anthropic, Neon, Vercel, Stripe, Mailgun
- [ ] 4.6 Commission IOLTA compliance analysis (50-state, US legal tech attorney)
- [ ] 4.7 Build user consent flow — privacy, terms, AI disclaimer acknowledgement
       checkbox — into onboarding before any account can be created
- [ ] 4.8 Implement AI hallucination disclaimer and citation verification
       system (Section 21) into The Oracle before any legal research is shown

**Stage 4 gate: ALL boxes checked before proceeding to Stage 5**

---

### STAGE 5 — Phase 1 build (the hook products)
*Build faultless. Do not rush to launch.*

- [ ] 5.1 AI Dictation — legal and accounting vocabulary, shared across both wings
- [ ] 5.2 The Oracle (Law) — public domain case law and statute research
       with citation verification layer
- [ ] 5.3 The Oracle (Accounting) — public domain tax and regulatory research
- [ ] 5.4 Basic case management — matters, tasks, deadlines, document storage
- [ ] 5.5 Basic billing — time tracking, invoices, Stripe payment collection
- [ ] 5.6 Trust accounting — IOLTA compliant (only after Stage 4.6 clearance)
- [ ] 5.7 User authentication, firm management, role-based access control
- [ ] 5.8 Audit logging on every user action
- [ ] 5.9 Security foundations checklist from Section 22.2 fully implemented
- [ ] 5.10 Full QA pass — every feature tested to faultless standard

**Stage 5 gate: Craig personally signs off every feature as faultless**

---

### STAGE 6 — Closed beta (10 attorneys, 10 accountants, 0 press)
*No public announcement. Invite only. Named case study agreements signed.*

- [ ] 6.1 Identify 10 solo immigration attorneys for early access
- [ ] 6.2 Identify 10 small CPA firms for early access
- [ ] 6.3 Execute early access agreements — 12 months free in exchange
       for documented case study and permission to use firm name
- [ ] 6.4 IP assignment agreements signed by any contractors involved
- [ ] 6.5 Onboard beta users one at a time — white-glove support
- [ ] 6.6 Collect structured feedback against specific feature hypotheses
- [ ] 6.7 Fix every issue raised before expanding beta cohort
- [ ] 6.8 Gather minimum 3 documented case studies with named firms

**Stage 6 gate: 3 signed case studies, no critical bugs outstanding**

---

### STAGE 7 — Public launch
*Only when Stage 6 is complete and the product is genuinely faultless*

- [ ] 7.1 Security page published on alecrae.com
- [ ] 7.2 Case studies live on website
- [ ] 7.3 Pricing pages live
- [ ] 7.4 AILA conference outreach strategy activated
- [ ] 7.5 AICPA outreach strategy activated
- [ ] 7.6 Attorney referral programme live
- [ ] 7.7 Press release issued — after trademark registration confirmed
- [ ] 7.8 LinkedIn and professional social presence activated
- [ ] 7.9 D&O insurance in place for Delaware C-Corp

**Stage 7 gate: This is the day the world finds out AlecRae exists**

---

### Current stage tracker

**UPDATE THIS EVERY SESSION:**

| Stage | Status | Last updated |
|---|---|---|
| Stage 1 — Legal foundations | NOT STARTED | March 2026 |
| Stage 2 — Domains and infrastructure | IN PROGRESS — alecrae.com, alecrae.accountant, alecrae.app, alecrae.ai purchased. alecrae.co.nz + alecrae.com.au next. | March 2026 |
| Stage 3 — Rename and consolidate | NOT STARTED | March 2026 |
| Stage 4 — Privacy and compliance | NOT STARTED | March 2026 |
| Stage 5 — Phase 1 build | NOT STARTED | March 2026 |
| Stage 6 — Closed beta | NOT STARTED | March 2026 |
| Stage 7 — Public launch | NOT STARTED | March 2026 |

---


---


---


---


---

## 25. Collaboration Architecture — Every Interaction is a Hook

This section documents the most important viral growth mechanism in the
entire platform. Read it before building any communication or scheduling
feature. Every design decision must reinforce the hook principle.

### 26.1 The hook principle

Every time two people come together through AlecRae — a lawyer contacting
a client, an accountant messaging a lawyer, a professional inviting someone
to a meeting — that interaction is simultaneously a piece of work AND a
marketing event. The client who receives a meeting invite through AlecRae
sees the platform. The accountant who gets a message from a lawyer through
AlecRae sees the platform. The person who had never heard of AlecRae now
has a reason to want it.

This is engineered virality. The platform markets itself through every
single professional interaction. No advertising budget can replicate it.

**The rule:** Every touchpoint between any two people — professional to
professional, professional to client, client to client — must carry the
AlecRae brand and create a natural desire in the recipient to be inside
the platform themselves.

---

### 26.1b The time and money value proposition — core professional messaging

This is the message that converts every professional who sees AlecRae.
It must appear on the professional homepage, the Law platform page,
the Accounting platform page, and in every outreach email.

**The core equation:**
Time saved × billable rate = money made
AlecRae saves professionals hours every day.
Those hours can be billed to more clients, or simply lived.

**Specific time savings to quantify and market:**

| Task | Without AlecRae | With AlecRae | Time saved |
|---|---|---|---|
| Legal research (standard matter) | 4–6 hours | 20–40 minutes | 4+ hours |
| Document drafting (contract) | 3–4 hours | 30–60 minutes | 3+ hours |
| Trust account reconciliation | 2–3 hours/week | Automated | 2+ hours |
| Court deadline calculation | 30–45 min per filing | Instant | 30+ min |
| Tax research (complex matter) | 2–3 hours | 15–30 minutes | 2+ hours |
| Bank reconciliation (monthly) | 4–6 hours | Automated | 4+ hours |
| Client status update calls | 30 min × 10 clients | Portal self-serve | 5 hours/week |
| Invoice preparation | 1–2 hours/week | Automated from time entries | 1+ hour |

**The marketing headline that converts:**
"AlecRae saves the average attorney 15–20 hours per week.
At $350/hour, that is $5,250–7,000 of additional billing capacity.
Every week. Every year."

"AlecRae saves the average CPA firm 12–18 hours per week per accountant.
Hours that can be billed, or simply given back to the people who matter."

**The emotional hook beneath the numbers:**
Lawyers and accountants became professionals to practise their craft —
not to spend their days on admin, research grunt work, and chasing
clients for information. AlecRae gives them their profession back.
The platform handles the machine work. The professional handles
the judgment work. That is the promise. That is the transformation.

**Use this messaging on:**
- Professional homepage hero section
- AlecRae Law platform page
- AlecRae Accounting platform page
- Email subject lines: "What would you do with 15 extra hours this week?"
- AILA and AICPA conference materials
- Paid search ad copy
- Case study headlines: "How [Firm] recovered 18 hours per week with AlecRae"

---

### 26.2 The four collaboration relationships

```
Lawyer ↔ Accountant          (cross-professional — the Oracle bridge)
Lawyer ↔ Client              (attorney-client — privileged, encrypted)
Accountant ↔ Client          (CPA-client — confidential, encrypted)
Client ↔ Client              (referral — rare but powerful)
```

Each relationship has different privacy requirements, different
communication tools, and different hook mechanics. All four are
built into the single AlecRae platform.

---

### 26.3 Instant messaging — the backbone of all communication

**Why instant messaging, not email:**
Lawyers and accountants lose hours every day to email chains that could
be resolved in three messages. A lawyer who needs a quick answer from
their client's CPA should not have to compose an email, wait, follow up,
and wade through a thread. They should be able to send a message and get
a reply in minutes.

**The AlecRae messaging system:**
- Instant messaging between all parties inside the platform
- Threaded conversations organised by matter/client, not by sender
- Every message timestamped and permanently archived (legal requirement)
- One-click export of any conversation thread to a formatted email or PDF
- Full audit trail — every message is part of the matter record
- End-to-end encrypted for all attorney-client and CPA-client conversations
- Read receipts so professionals know when clients have seen important messages
- File attachments inline — documents, invoices, contracts shared in chat

**The email extraction feature:**
Any conversation thread can be extracted into a professionally formatted
email at any time. The professional clicks "Export to email," selects
the messages to include, and a clean email draft is generated that they
can send from their own address or through AlecRae. This is unique.
No other platform does this. It is a patentable workflow — add to
provisional patent list.

---

### 26.4 Scheduling and meetings

**What gets built:**
- Native appointment booking inside the platform
- Calendar sync with Google Calendar and Outlook (two-way)
- Automated meeting reminders to all parties via email and in-app
- One-click Zoom link generation attached to every meeting
- Video meeting option natively within AlecRae (Phase 3 — evaluate
  Daily.co or Whereby API for embedded video)
- Post-meeting summary auto-generated by AI from any notes dictated
  during or after the meeting

**The hook mechanics of a meeting invite:**
When a lawyer books a meeting with their client through AlecRae,
the client receives an email invitation that looks like this:

> "Your attorney [Name] has scheduled a meeting with you through
> AlecRae. Join at alecrae.com/meeting/[unique-code]
> Date: [Date] · Time: [Time] · Zoom: [Link]
> Track your matter, view documents, and message your attorney
> at any time at alecrae.com"

The client visits alecrae.com to join the meeting. They see the platform.
They see a professional interface. They see their matter being managed
with sophistication they have never experienced from a lawyer before.
The hook is set. When their lawyer asks "would you like to use the
client portal?" the answer is always yes.

**Appointment types to support:**
- Initial consultation (attorney ↔ new client)
- Matter review (attorney/accountant ↔ existing client)
- Cross-professional meeting (lawyer ↔ accountant, shared client)
- Team meeting (firm internal — multiple attorneys or CPAs)
- Client sign-off (document signing appointment)

---

### 26.5 The cross-professional bridge (Lawyer ↔ Accountant)

This is the feature that no other platform has and cannot replicate
without owning both sides of the law-accounting relationship.

**The scenario:**
A corporate attorney is working on a business acquisition for a client.
They need a quick tax opinion from the client's CPA on the deal structure.
On every other platform, this requires: finding the CPA's email, composing
a message, attaching the relevant documents, waiting, following up.

**The AlecRae version:**
The attorney opens the client matter in AlecRae, clicks "Involve
accounting professional," searches for the CPA by name or firm, and
sends them a shared matter view with a message. The CPA receives an
invitation to view the relevant portion of the matter and respond.
If the CPA is already on AlecRae, this takes 30 seconds. If they are
not, the invitation is the hook that brings them onto the platform.

**What the CPA sees when they receive the invitation:**
A professionally formatted notification that includes:
- The matter context (what the lawyer needs)
- The specific documents or questions relevant to them
- A link to view the shared matter inside AlecRae
- A prompt to create their own AlecRae account to respond

Every cross-professional invitation is a warm referral from a trusted
colleague. This is the highest-conversion acquisition channel possible.

**The shared matter workspace:**
When a lawyer and accountant are collaborating on the same client:
- Both can see the shared documents and correspondence
- Both can message each other and the client in the same thread
- The Oracle cross-domain tier is automatically activated for that matter
- Billing is handled separately — each professional bills their client
  independently through their own AlecRae billing system

---

### 26.6 The client portal — the consumer hook

Every client of every AlecRae professional gets access to a client
portal at no cost to them. The portal is intentionally excellent.
It is not a token feature. It is a full, beautiful interface that
makes the client feel like their professional is running
the most sophisticated practice they have ever encountered.

**What the client portal shows:**
- Matter status in plain English ("Your visa application was filed on
  March 15. The USCIS processing time is currently 8–14 months.")
- All documents — filed, pending, completed — in one place
- Invoice history and payment status
- Secure message thread with their attorney or accountant
- Upcoming meetings and appointment booking
- Document signing for any outstanding e-signatures

**The portal as a hook:**
When a client uses a portal this good, they tell other people about it.
"My lawyer uses this incredible system — I can see everything, message
them instantly, and sign documents on my phone." That word-of-mouth is
the consumer marketing campaign that money cannot buy.

When that client later needs an accountant, they ask their lawyer:
"Is there an accountant on AlecRae I can use?" The referral is built
into the architecture.

---

### 26.7 Notification architecture — the hook delivery system

Every notification sent from AlecRae is a marketing touchpoint.
Every email, every SMS, every push notification carries the AlecRae
brand and a reason to return to the platform.

**Notification types and their hook value:**

| Notification | Recipient | Hook |
|---|---|---|
| Meeting invite | Client | First view of platform |
| Document ready to sign | Client | Portal login, sees full interface |
| Message received | Client/Professional | Instant return to platform |
| Invoice sent | Client | Portal login, payment, sees features |
| Matter status update | Client | "Your application moved to next stage" |
| Regulatory alert | Professional | "New ruling affects 3 of your matters" |
| Cross-professional invite | Accountant/Lawyer | Platform discovery |
| Payment received | Professional | Positive reinforcement loop |

**The email footer rule:**
Every notification email must end with:

> "Powered by AlecRae — The most advanced legal and accounting platform
> ever built. alecrae.com"

This is one line. It is not advertising copy. It is a quiet signal of
quality on every single email that goes through the system.

---

### 26.8 Consumer page marketing copy — AI professionals positioning

The find-a-lawyer and find-an-accountant pages must communicate one
message above all others to consumers:

**"The professionals on AlecRae use the most advanced AI legal and
accounting technology ever built. When you work with an AlecRae
professional, you get the benefit of that intelligence."**

Specific copy directions for consumer pages:

- "AlecRae attorneys use The Oracle — the most advanced legal research
  AI ever built. That means faster answers, more thorough research,
  and better outcomes for your matter."

- "AlecRae accountants work with AI that reads every tax code change
  in real time. Your CPA never misses a deduction that affects you."

- "The professionals on this platform use tools that 80–90% of their
  competitors have never seen. Align yourself with the best."

- "When your lawyer uses AlecRae, your matter benefits from AI research
  that used to require a team of associates. You get that for the same
  hourly rate."

These are the lines that make a consumer choose an AlecRae professional
over one found on a competitor directory. Not just a professional.
The most technologically advanced professional available.

---

### 26.9 Trade dress and IP protection — can anyone copy this?

**The direct answer: No. Not legally. Not without consequences.**

Here is the full picture of what protects AlecRae's collaboration design.

**Layer 1 — Trade dress (protects the look and feel)**
Trade dress protects the overall visual appearance and user experience
of a product when it has become distinctive and identifies the source.
The specific combination of:
- Matter-centric messaging threads (organised by client matter, not sender)
- Email extraction from chat (conversation → formatted email, one click)
- Cross-professional matter bridge (lawyer invites accountant into shared matter)
- Meeting-invite-as-hook (external invite = first platform exposure)
- Unified law + accounting collaboration under one login

...constitutes a unique, non-functional design that identifies AlecRae.
Once we have sufficient market presence, this combination is protectable
as trade dress under the Lanham Act (US) and equivalent laws globally.

Document everything with dated screenshots and design files.
Git commits with timestamps are evidence of prior creation.

**Layer 2 — Provisional patents (protects the mechanisms)**
File provisional patents immediately on:
- Email extraction workflow (chat thread → formatted email draft)
- Cross-professional matter invitation flow with shared workspace
- Matter-centric notification hook system (interaction = marketing event)
- Unified law + accounting collaboration workspace with Oracle integration

Provisional patents are inexpensive ($1,500–3,000 each with an attorney)
and establish priority date for 12 months. File before any public demo.
Once filed, you can label the feature "Patent Pending" — which legally
warns competitors that copying it creates liability.

**Layer 3 — Copyright (protects the code)**
Every line of code in the AlecRae collaboration system is automatically
copyrighted to the IP holding entity the moment it is written.
Ensure IP assignment agreements are signed by all contributors.

**Layer 4 — Trademark (protects the brand)**
"AlecRae," "The Oracle," and any unique product names within the
collaboration system (e.g. if "Matter Bridge" or "AlecRae Connect"
becomes a named feature) should be trademarked before public launch.

**What a competitor can legally do:**
- Build messaging software (not protectable)
- Build meeting scheduling (not protectable)
- Build a client portal (not protectable)

**What a competitor CANNOT do without infringement:**
- Copy the specific matter-centric thread → email extraction workflow
  once the provisional patent is filed
- Use the same visual design, layout, and interaction patterns
  once trade dress is established
- Use the AlecRae name or The Oracle name after trademark registration
- Copy code directly from the AlecRae codebase (copyright infringement)

**The honest truth:**
A well-funded competitor can build similar individual features.
What they cannot do is replicate the COMBINATION — the specific
integration of law + accounting + collaboration + Oracle + consumer
marketplace + dictation under one brand, with the data flywheel
that AlecRae builds from day one. That combination is the moat.
The IP protection layers are the legal expression of that moat.
Together they make copying AlecRae expensive, slow, and risky.

**Keeping everything within the platform is deliberate genius.**
Every chat, every video call, every document signed, every meeting
held inside AlecRae generates data that feeds the Oracle flywheel,
creates an audit trail that protects professionals legally, deepens
the switching cost for every user, and keeps the AlecRae brand
in the interaction. Using Zoom directly, or WhatsApp, or email —
none of that happens. The moment the interaction leaves the platform,
the hook is lost, the data is lost, and the stickiness is lost.
Keeping everything inside is not a convenience feature.
It is a strategic architecture decision that compounds over time.

### 26.10 Trade dress and IP protection for the collaboration design

The specific combination of features described in this section —
the matter-centric messaging with email extraction, the cross-professional
bridge with shared matter workspaces, the meeting-invite-as-hook flow,
and the consumer portal design — constitutes a unique and protectable
user experience design.

**Add to provisional patent applications:**
- The email extraction feature (conversation thread → formatted email)
- The cross-professional matter invitation flow
- The matter-centric notification hook system

**Trade dress protection:**
The specific visual design, workflow sequence, and interaction patterns
of the AlecRae collaboration interface should be documented with
screenshots and dated design files at each major version. Trade dress
protects the visual appearance and user experience when it has become
distinctive. Document everything. Date everything. Commit everything
to GitHub with timestamps.

**The rule nobody can copy:**
A competitor can build messaging. A competitor can build scheduling.
A competitor can build a client portal. What a competitor CANNOT do
is replicate the specific combination of: matter-centric organisation,
cross-professional Oracle bridge, email extraction, meeting-as-hook
notification design, and consumer portal quality — all inside a single
unified platform that owns both law and accounting simultaneously.
That combination, in its entirety, is AlecRae. That is the trade dress.
That is the moat.

---

## 26. UX Philosophy — The Platform Professionals Love

### 27.1 The core UX law

**If a professional has to think about how to find something,
we have already failed.**

Every feature must be reachable in two clicks or fewer from wherever
the professional currently is. Every workflow must feel like the
platform anticipated what they needed next. Every interaction must
leave them feeling more capable, not more frustrated.

This is the single standard against which every UI decision is measured.
Not "does it work." Not "is it technically correct."
Does it feel effortless.

### 27.2 The three UX sins we never commit

**Sin 1 — Making professionals leave their flow.**
A lawyer drafting a contract should never have to open a new tab,
navigate to a different section, or interrupt what they are doing
to access the Oracle, check a deadline, or find a client detail.
Everything they might need is available in context, inline, instantly.

**Sin 2 — Hiding features behind menus.**
If a professional cannot see a feature, it does not exist for them.
Navigation must be flat, labelled clearly, and consistent everywhere.
No buried settings. No features that require a tutorial to discover.

**Sin 3 — Making them wait.**
Every Oracle query must return in under 3 seconds. Every page must
load in under 1 second. Every action must have instant visual feedback.
A professional who clicks a button and sees nothing happen for two
seconds has already lost trust in the platform.

### 27.3 The Oracle draw-down — the killer workflow

This is the feature that makes AlecRae feel like a superpower.

**The scenario:**
A lawyer is drafting a contract clause about non-compete enforceability.
They are not sure about the California standard. Without AlecRae, they
open a new tab, go to Westlaw, log in, search, find the case, copy the
citation, switch back, paste it in. Five minutes. Flow completely broken.

**The AlecRae version:**
The lawyer is drafting. They hit ⌘K (or tap the Oracle icon in the
toolbar). A drawer slides in from the right — they never leave the
document. They type "California non-compete enforceability standard."
The Oracle returns three verified cases in under 3 seconds. They click
"Insert citation" on the one they want. It drops directly into the
document at the cursor position, formatted correctly, citation verified.
Total time: 25 seconds. Flow never broken.

**Where the Oracle draw-down appears:**
- Inside the Document Editor (drafting contracts, motions, briefs)
- Inside the Message Composer (responding to client questions)
- Inside Case Management (adding research notes to a matter)
- Inside the Tax filing workflow (checking a regulation mid-entry)
- Inside the Billing notes (referencing a matter precedent)
- As a floating global command: ⌘K from anywhere opens the Oracle

**The insert modes:**
- Insert citation — drops the formatted case/statute citation at cursor
- Insert summary — drops a plain-English summary of the ruling
- Insert full analysis — drops a structured analysis paragraph
- Copy to clipboard — for manual placement anywhere

**The verification badge on every insert:**
Every Oracle result inserted into a document carries a small ✓ badge
showing it was verified against the authoritative public source.
This is both a quality signal and a legal protection — the attorney
can prove the citation was verified at the time of insertion.

### 27.4 Navigation architecture — two clicks to anything

**Top-level navigation (always visible, left sidebar):**
```
◎ Dashboard          — unified command centre
⚖ Matters            — all active cases/engagements
◈ Clients            — CRM and client profiles
◎ The Oracle         — research (also accessible inline everywhere)
⊕ Documents          — all files, drafts, templates
⏱ Billing            — time tracking and invoices
✦ Calendar           — meetings and deadlines
✉ Messages           — matter-centric conversations
⊞ Reports            — analytics and financials
⚙ Settings           — firm and account settings
```

**The rule:** Everything is reachable from the sidebar in one click.
Everything within a section is reachable in one more click.
Maximum depth: two clicks from the sidebar to any specific record.

**The command palette (⌘K — available everywhere):**
Type anything. Find anything. Do anything.
- "New matter" → creates a new matter
- "Rodriguez visa" → opens the Rodriguez matter
- "Non-compete California" → opens Oracle with that query
- "Invoice #1047" → opens that invoice
- "Schedule meeting" → opens meeting scheduler
- "Trust account balance" → shows trust balance inline
This is the escape hatch that makes the two-click rule feel infinite.

### 27.5 The dashboard — the professional's morning briefing

The dashboard is the first thing a professional sees every morning.
It must answer five questions instantly without any clicking:

1. What needs my attention today? (Deadlines, unread messages, tasks)
2. What meetings do I have? (Today's calendar, next 3 days)
3. What has changed overnight? (New regulatory alerts, matter updates)
4. How is my firm performing? (Revenue this month, hours billed)
5. Who is waiting for me? (Unanswered client messages, pending docs)

The dashboard is personalised by role:
- Attorney dashboard emphasises matters, deadlines, court calendar
- Accountant dashboard emphasises client filings, tax deadlines, bank feeds
- Firm owner dashboard adds team performance and revenue overview

### 27.6 Mobile-first inside the platform

Every screen must work perfectly on an iPad. This is non-negotiable
given the founder's own workflow. Test every component on iPad
before considering it complete. Touch targets minimum 44px.
No hover-dependent interactions. Swipe gestures for common actions.

### 27.7 The empty state philosophy

Every empty state — a new matter with no documents, a new client
with no history — must tell the professional exactly what to do next
in plain language. No blank screens. No generic "No items found."

Example: A new matter with no documents shows:
"No documents yet. Start by uploading the client agreement,
or use Document AI to draft one from scratch."

The empty state is a teaching moment and a conversion moment.
It shows the professional what the platform can do, exactly when
they are most receptive to learning it.

---


---

## 27. Technology Architecture — Components, Layers, and Standards

### 28.1 No HTML files — React components only

Every single piece of UI in AlecRae is a React component.
No .html files anywhere in the codebase. Ever.
Next.js 14 App Router with TypeScript (.tsx) throughout.

This is not a preference. It is a hard rule.
The reasons: type safety, reusability, testability,
server/client component optimisation, and future-proofing.

**File extension rules:**
- UI: .tsx (React components with TypeScript)
- Logic/utilities: .ts (pure TypeScript)
- Styles: Tailwind CSS utility classes inside components
- No: .html, .css (standalone), .js (use .ts or .tsx)

**Component architecture:**
```
app/
  components/
    oracle/          — Oracle draw-down, results, insert system
    collaboration/   — Messaging, meetings, scheduling
    email/           — Email dashboard, composer, inbox
    editor/          — Document editor, rich text
    billing/         — Invoicing, time tracking
    shared/          — Buttons, inputs, cards, modals
  (platform)/        — All authenticated platform routes
  (marketing)/       — Public-facing pages
  api/               — All API routes
lib/                 — Utilities, types, constants
```

### 28.2 The two-layer system — the promise of a faultless product

This is the architecture that keeps the promise to every professional
that they will never encounter a broken link, a bug, or an error
while using a product they are paying for.

**Layer 1 — Internal development layer (Vercel preview deployments)**
- Every feature branch deploys to a unique Vercel preview URL
- All testing, QA, and bug hunting happens here
- Claude builds features here first
- Every component is tested against real data scenarios
- No feature graduates to Layer 2 until it is faultless
- This layer is password-protected, never customer-accessible
- Broken things live here. Only finished things leave here.

**Layer 2 — Customer-facing production layer (alecrae.com)**
- Only receives code that has passed Layer 1 completely
- Zero broken features. Zero dead links. Zero console errors.
- Performance monitored continuously (Vercel Analytics + Sentry)
- Any regression caught in production triggers immediate rollback
- The customer never sees a bug. This is a non-negotiable promise.

**The deployment rule:**
```
Feature branch → Vercel preview (Layer 1 — test here)
                      ↓ faultless
main branch → alecrae.com production (Layer 2 — customers here)
```

Never merge to main until Layer 1 is perfect.
Never skip Layer 1 to ship faster.
Speed is not the goal. Faultless is the goal.

### 28.3 Intellectual crawlers — staying 80-90% ahead

AlecRae deploys automated intelligence monitoring to ensure
the platform always uses the most advanced technologies available
and is never caught using deprecated or superseded approaches.

**What the crawlers monitor:**
- Next.js release notes and breaking changes
- React release notes and new patterns
- Tailwind CSS updates
- Anthropic API updates and new models
- Supabase feature releases
- Vercel platform updates and new capabilities
- Legal tech competitor feature releases (Clio, Harvey, Thomson Reuters)
- Accounting software competitor releases (Xero, QuickBooks, Sage)
- New AI capabilities relevant to legal and accounting workflows

**How this is implemented:**
- GitHub Dependabot for all dependency updates
- Weekly automated scan of competitor changelog pages
- Monthly technology review session — Claude reads current docs
  before any major feature is built and confirms latest patterns
- Any feature built on a deprecated pattern must be flagged

**The rule:** Before building any feature, Claude confirms the
approach uses current best practices. If a better approach has
been released since the last session, use the better approach.

### 28.4 Automated protection systems — 24/7, no session required

AlecRae deploys multiple automated systems that run continuously
regardless of whether a Claude session is active. These are the
platform's immune system. They never sleep.

**GitHub Dependabot (active 24/7):**
- Monitors ALL npm dependencies for security vulnerabilities daily
- Monitors GitHub Actions for updates weekly
- Opens pull requests automatically when updates are available
- Grouped minor/patch updates to reduce noise
- Configuration: .github/dependabot.yml

**GitHub Actions CI/CD (active 24/7):**
- Security & Quality Gate runs on every push, every PR, and daily at 5am NZST
- Build verification — catches compilation errors before they reach production
- Lint & type check — catches code quality issues automatically
- Security audit — npm audit for known vulnerabilities
- Dependency review — blocks PRs that introduce high-severity vulnerabilities
- Configuration: .github/workflows/security-quality.yml

**The competitive doctrine:**
AlecRae does not merely monitor competitors. AlecRae assumes every
competitor is building the same features right now and acts accordingly.

- If Harvey AI announces a new feature, AlecRae must have built it
  better before Harvey ships it, or build a superior version within
  30 days of their announcement.
- If Clio, Thomson Reuters, or Wolters Kluwer acquires a startup in
  our space, treat it as a validation signal and accelerate outreach
  to the other acquirers.
- If a new AI model is released that is faster or more capable, AlecRae
  must evaluate and integrate it within 14 days.
- If a new open-source legal dataset becomes available, AlecRae must
  index it within 7 days.

**The 80-90% rule:**
At any given moment, AlecRae must be 80-90% ahead of any competitor
in at least three of these dimensions: features, AI capability,
user experience, data coverage, platform integration depth.
No competitor can lead AlecRae in more than one dimension at a time.
If they do, it is an emergency that requires immediate action.

---

## 28. Email Platform — The Final Hook

### 29.1 Why email changes everything

Email is where lawyers and accountants spend 40–60% of their day.
Right now that time lives in Gmail or Outlook — outside AlecRae,
untagged to matters, unsearchable by client, disconnected from
the Oracle, and generating zero data for the platform.

Bringing email inside AlecRae is the single most powerful
remaining hook in the entire platform. The moment a professional
does their email inside AlecRae, they are inside the platform
for the majority of their working day. Every other feature —
the Oracle, the matter view, the billing, the calendar — becomes
instantly reachable from the thing they are already doing.

### 29.2 What AlecRae Email provides

**For every firm:**
- Custom email domain: @theirfirm.com (their own domain via Cloudflare DNS)
  OR @firmname.alecrae.com (AlecRae-hosted subdomain)
- Every attorney and accountant gets their own professional inbox
- Shared inboxes for the firm (hello@, admin@, billing@)
- Unified inbox across all firm email addresses

**Inside the email composer:**
- Oracle draw-down button — research and insert at any point while writing
- Meeting scheduler — converts any email into a meeting invite in one click
- Matter tagging — tag the email to a client matter before sending
- Document attachment from matter files — no more hunting in folders
- E-signature request — send a document for signature directly from email
- Template library — professional email templates for common matter types
- AI draft assist — "draft a response to this client question about..."

**Inside the inbox:**
- Every email auto-suggested for matter assignment by AI
- Unread emails surfaced on the dashboard morning briefing
- Thread view with full matter context in the right sidebar
- One-click "Add to matter record" for any email or thread
- Smart filters — by matter, by client, by urgency, by follow-up needed
- Oracle sidebar — research any question raised in an email instantly

**Email as a hook for non-platform users:**
When a professional sends an email from AlecRae to a client who is
not on the platform, the email footer reads:
> "Sent via AlecRae — the professional platform your attorney uses.
> Track your matter and communicate securely at alecrae.com"
Every outbound email is a warm invitation.

### 29.3 Email infrastructure stack

**Phase 1 — Integration approach (launch with this):**
Connect existing email accounts (Gmail, Outlook) via OAuth.
Professionals keep their existing email address but work through
the AlecRae email interface. All AlecRae features available.
Matter tagging and Oracle draw-down work on top of their
existing email. This is fastest to market and lowest friction.

Technical: Gmail API + Microsoft Graph API + Nylas API (unified)

**Phase 2 — Hosted email (premium tier):**
AlecRae hosts the firm's email domain entirely.
Professionals get @theirfirm.alecrae.com or bring their own domain.
Full email hosting, storage, and delivery through AlecRae.
More control, more data, deeper Oracle integration.

Technical: Cloudflare Email Routing + Resend for outbound +
custom IMAP server or Postmark Inbound for received mail.

**Phase 3 — Enterprise email (white-label):**
Large firms bring their own @theirfirm.com domain fully hosted
on AlecRae infrastructure with custom retention policies,
eDiscovery integration, and full matter-email linkage.
Additional revenue: $50–200/month per firm on top of platform fee.

### 29.4 The email dashboard layout

```
┌─────────────────────────────────────────────────────────┐
│  AlecRae Email  │  Inbox  Sent  Matters  Calendar  Compose │
├──────────┬──────────────────────────────┬───────────────┤
│          │  ● Sarah Chen <sarah@...>     │ Matter context │
│ Inbox    │  Rodriguez — H-1B update     │               │
│ 24       │  3 minutes ago               │ Rodriguez H-1B │
│          │                              │ Filed: Mar 15 │
│ Sent     │  ● Marcus Rodriguez          │ Status: Active│
│          │  Re: Meeting Thursday        │               │
│ Drafts   │  1 hour ago                  │ [Oracle]      │
│ 3        │                              │ Ask about this│
│          │  Patricia Thornton           │ matter...     │
│ Matters  │  Contract review complete    │               │
│          │  Yesterday                   │ [Schedule]    │
│ Calendar │                              │ + Meeting     │
│          │                              │               │
└──────────┴──────────────────────────────┴───────────────┘
```

### 29.5 Oracle draw-down inside email — the genius moment

A lawyer is writing an email to a client explaining why their
non-compete clause is unenforceable in California. They hit
the Oracle button inside the email composer. The Oracle drawer
slides in. They search, get the Edwards case, hit Insert Citation.
The citation drops into the email body, formatted correctly.
They send a professional, verified, authoritative email response
in the time it would have taken them to find the login page for
Westlaw.

The client receives an email so thorough and well-cited that
they forward it to their business partner and say:
"Look how good my lawyer is."

The lawyer looks exceptional. The client is delighted.
AlecRae gets the credit for both.

**That is the product.**

### 29.6 Team meetings and client meetings from email

Any email thread can be converted to a meeting in one click.
The meeting scheduler reads the email thread for context,
suggests an agenda based on the topics discussed, generates
the Zoom link, and sends calendar invites to all participants.
The meeting is automatically tagged to the same matter as the email.

Post-meeting, the AI generates a summary and adds it to the
matter record. The entire lifecycle — email → meeting → summary
→ matter record — happens inside AlecRae without switching tools.

### 29.7 Revenue from email

Email adds two revenue streams:

**Stream 1 — Email as a premium platform feature:**
Email integration (Phase 1 Gmail/Outlook connection) is included
in the Professional tier subscription. It is a retention feature —
professionals who do their email through AlecRae never leave.

**Stream 2 — Hosted email as a separate add-on:**
Phase 2 hosted email (AlecRae-managed domain) is an additional
$15–30/user/month on top of the platform subscription.
A 10-attorney firm paying $199/month per seat is already spending
$1,990/month. Adding email hosting at $20/user/seat adds
$200/month — a trivial upsell that significantly deepens lock-in.

---

## 29. AlecRae Voice — The Universal Input Layer

### 30.1 Competitive landscape — where AlecRae Voice sits

**Current market leaders (as of March 2026):**

| Product | Strength | Fatal weakness |
|---|---|---|
| WisprFlow | Best general AI dictation, cross-platform, 100+ languages | Standalone tool — no platform integration |
| Dragon Legal | Deep legal vocabulary, Windows-dominant, $699 | Expensive, standalone, no AI research integration |
| Philips SpeechLive | Legal-specific, practice management hooks | Closed ecosystem, no accounting, no Oracle |
| SuperWhisper | Offline, privacy-first, Mac/iOS | Mac only, no collaboration, no platform |
| BlabbyAI | Custom modes, legal Latin terms | Standalone Windows app, no ecosystem |
| Otter.ai | Meeting transcription, Zoom integration | Not for drafting, not legal/accounting specific |

**The gap every single competitor has:**
Every dictation tool on the market is a standalone product.
It sits outside the professional's workflow. The attorney
dictates, then switches to Westlaw, then switches to email,
then switches to billing. The dictation tool never touches
any of those systems. It is an island.

**Where AlecRae Voice wins:**
AlecRae Voice is not a dictation tool that integrates with a platform.
It IS the platform's input layer. The difference is everything.

### 30.1b The fundamental principle

**Product name: AlecRae Voice**
**Tagline: "Speak. It is done."**
**Never call it:** AI Grammar, grammar correction, or autocorrect

The attorneys and accountants using this product spent years
at university becoming highly intelligent professionals.
They do not have a grammar problem. They have a time problem.
AlecRae Voice solves the time problem. It never implies
the professional needs correction. It understands them perfectly
and executes precisely. That is the positioning. Always.

### 30.1b The fundamental principle

AlecRae Voice is NOT a standalone feature.
It is the INPUT LAYER for the entire AlecRae platform.

Everywhere a professional can type, they can also speak.
The microphone and the AI grammar engine are always available —
not in a separate section, not behind a menu, not as an add-on.
Built into every input surface across the entire platform.

This is the distinction that makes AlecRae Dictation different
from every other dictation product on the market. It is not
"dictation software that lawyers use." It is the way professionals
interact with the entire AlecRae operating system.

### 30.1c Multi-language capability — the global edge

Every competitor listed above is primarily English-first.
AlecRae Voice launches with full multi-language support
from day one. This is not a future feature. It is a launch
requirement given the NZ, Australian, and US markets
including significant non-English speaking professional
communities.

**Languages at launch (Phase 1):**
- English (legal and accounting vocabulary — all jurisdictions)
- Mandarin Chinese (large professional community in AU, NZ, US)
- Spanish (critical for US immigration attorneys — largest
  non-English speaking client community by volume)
- Hindi (significant in US H-1B immigration practice)
- Japanese (significant in AU and NZ professional markets)
- French (Canada Phase 3 requirement — Quebec civil law)
- Arabic (growing professional community across all markets)
- Portuguese (Brazil-US immigration corridor)
- Korean (significant in US and AU professional markets)

**What multi-language means for AlecRae Voice:**
Not just transcription in multiple languages. Legal and
accounting vocabulary intelligence in each language.
A Spanish-speaking immigration attorney dictating in Spanish
gets the same professional language understanding as an
English-speaking attorney. "Demandante" is not corrected
to "plaintiff." "Debe" in an accounting context is understood
as a debit entry. The intelligence is language-aware.

**The competitive moat this creates:**
No current competitor offers multi-language legal and
accounting vocabulary intelligence. WisprFlow supports
100+ languages for transcription but has no legal vocabulary
layer in any non-English language. Dragon Legal is
English-only. This is an entirely unoccupied competitive
position that AlecRae Voice can own completely.

**Technical implementation:**
Built on OpenAI Whisper (multilingual base model) with
a custom post-processing layer that applies language-specific
legal and accounting vocabulary correction and formatting.
The Whisper model handles transcription accuracy.
The AlecRae layer handles professional intelligence.
Two separate concerns, two separate systems, working together.

### 30.2 Every surface where AlecRae Voice is present

**Email composer**
- Microphone icon in the compose toolbar
- Dictate the entire email or any portion of it
- Grammar engine understands professional email conventions
- Legal and accounting terminology preserved exactly as spoken
- Punctuation inserted intelligently based on speech rhythm

**Document editor**
- Dictate contracts, motions, briefs, financial reports
- Legal drafting grammar — "whereas," "hereinafter,"
  "notwithstanding," "the party of the first part" never corrected
- Accounting conventions — "debit," "credit," "contra account,"
  "accumulated depreciation" understood perfectly
- Dictate section headings, clause numbers, formatted lists

**Instant messaging (matter threads)**
- Quick voice messages converted to text instantly
- Professional grammar maintained even in casual internal messages
- Names and firm names spelled correctly after first use

**Oracle query input**
- Dictate research questions naturally
- "What are the California non-compete enforceability standards
  for a technology company employee earning over two hundred
  thousand dollars" — spoken naturally, searched precisely

**Case/matter notes**
- Dictate matter updates, call notes, and progress summaries
- Time entries — "Two hours reviewing Rodriguez acquisition
  agreement, three point five hours drafting counter-proposal"
- The platform extracts billable time from dictated notes
  automatically where possible

**Billing and time entries**
- "Six point five hours, Rodriguez H-1B, preparation and filing
  of I-129, rate three hundred and fifty dollars" → logged entry
- Voice-to-invoice workflow reduces admin time dramatically

**Client portal messages**
- Attorneys and accountants dictate client updates
- Professional tone maintained automatically

**Meeting notes and summaries**
- Record a meeting, dictation runs throughout
- AI generates structured summary from dictated notes
- Action items extracted and added to matter tasks automatically

**Tax forms and accounting entries**
- Accountants dictate journal entries
- "Debit accounts receivable twelve thousand four hundred dollars,
  credit revenue twelve thousand four hundred dollars, date
  March 31st, client Johnson and Associates" → posted entry

### 30.2b What no competitor can match — platform integration

This is the section that documents AlecRae Voice's
insurmountable advantage over every standalone dictation tool.

**Voice commands that only work inside AlecRae:**

Inside email composer:
"Send this to Marcus Rodriguez, subject H-1B update,
mark urgent, attach the I-129 receipt notice from the matter"
→ Recipient filled, subject filled, priority flag set,
  document attached from matter files. One voice command.
  No clicking. No switching apps.

Inside document editor:
"Ask the Oracle — what is the California standard for
adverse possession, insert the controlling case as a citation"
→ Oracle queried, top verified case returned, citation
  inserted at cursor. Attorney never stopped dictating.

Inside billing:
"Log four point five hours on the Rodriguez H-1B matter,
preparation and filing of I-129, today's date, standard rate"
→ Time entry created, matter tagged, date set, rate applied.
  Billing admin by voice in ten seconds.

Inside calendar:
"Schedule a call with Patricia Thornton, Thursday at two pm,
thirty minutes, tag it to the Thornton acquisition matter,
send her a Zoom link"
→ Meeting created, matter tagged, Zoom generated, invite sent.

Inside instant messaging:
"Message David Kim, re: Rodriguez tax implications,
ask him if the H-1B status creates dual-status year"
→ Message sent to the right person, in the right thread,
  tagged to the right matter.

**What this means for a professional's day:**
A lawyer who uses AlecRae Voice never has to stop what
they are doing to perform an administrative action.
Every action the platform can take is available by voice,
from wherever they are in the platform, at any time.

No competitor can build this. WisprFlow can inject text
into any app — but it cannot create a billing entry, query
a legal research database, schedule a meeting, or send a
matter-tagged message. Those actions require platform access.
AlecRae Voice has platform access because it IS the platform.

### 30.3 The language intelligence layer — understanding professionals

This is what separates AlecRae Voice from every other
dictation product on the market and must never be compromised.

**Legal language — understood exactly as intended:**
- "Whereas" at the start of a clause
- "Notwithstanding the foregoing"
- "Hereinafter referred to as"
- "The party of the first part"
- "In witness whereof"
- "Pursuant to" / "In accordance with"
- "Subject to the provisions of"
- Latin legal terms: "inter alia," "prima facie," "mens rea,"
  "habeas corpus," "voir dire," "certiorari," "res judicata"
- All US court citation formats
- All statute and regulation citation formats

**Accounting language — understood exactly as intended:**
- Double-entry bookkeeping terminology
- "Debit" and "credit" as accounting terms (not general English)
- GAAP and IFRS terminology
- Tax code references (IRC §, Treas. Reg., Rev. Rul.)
- Financial statement line items
- Depreciation and amortisation methods

**Professional name handling:**
After a name is spoken and confirmed once (e.g. "Rodriguez"),
the platform remembers it and spells it correctly every time.
Matter names, client names, opposing counsel names — all learned
and auto-corrected to the correct spelling on every dictation.

**Context-aware grammar switching:**
The grammar engine detects the surface it is operating in and
adjusts rules accordingly:
- In document editor: formal legal/accounting grammar mode
- In email composer: professional email mode
- In messages: professional conversational mode
- In matter notes: note-taking mode (abbreviations allowed)
- In billing entries: time-entry format mode

### 30.4 The Voice trigger

AlecRae Voice is available in every input field via:
- A visible microphone icon in every toolbar and input
- A keyboard shortcut (⌘D or long-press on mobile/iPad)
- A floating microphone button that follows the user's scroll
  position on longer pages

On iPad (the founder's primary device), the microphone icon
is larger and positioned for thumb access. Touch-and-hold
to record, release to stop — the most natural iPad interaction.

### 30.5 AlecRae Voice — the time-saving proof point

The most powerful marketing claim AlecRae can make is not
about features. It is about time.

"AlecRae Voice gives attorneys back 3–4 hours every day.
At $350/hour, that is $1,050–1,400 of additional billing
capacity recovered — from speaking instead of typing."

Every professional who uses AlecRae Dictation for one week
and then has to go back to typing feels the loss immediately.
That experience is the most powerful retention mechanism
the platform has.

### 30.6 Where AlecRae Voice appears in the build sequence

AlecRae Voice is Phase 1. It is the hook. It ships before
The Oracle, before case management, before billing.

The reason: a professional whose first interaction with AlecRae
is speaking an email instead of typing it has already felt the
platform's value. Before they explore the Oracle, before they
set up a matter, AlecRae Voice has already transformed their day.

That first 30-second experience of speaking an email and
watching it appear on screen in perfect professional language
is the moment AlecRae becomes irreplaceable.

**AlecRae Voice is in every Phase 1 component:**
- Homepage — AlecRae Voice demo in the hero section
- Email composer — microphone in toolbar
- Document editor — microphone in toolbar
- Message composer — microphone icon in input
- Oracle query input — microphone icon in search bar
- Matter notes — microphone in note editor

---


---

## 30. Geographic Markets — Launch Sequence and Architecture

### 31.1 Market priority and rationale

| Launch phase | Market | Attorneys | CPAs | Strategy |
|---|---|---|---|---|
| Phase 1 | New Zealand | 12,000 | 35,000 | Home market — validate and build case studies first |
| Phase 1 | Australia | 80,000 | 160,000 | Home region — fast word of mouth, familiar regulation |
| Phase 2 | United States | 1.3 million | 660,000 | Main event — largest revenue, deepest Oracle data |
| Phase 3 | United Kingdom | 200,000 | 350,000 | Post-Brexit complexity drives Oracle demand |
| Phase 3 | Canada | 130,000 | 200,000 | Close to US law, bilingual Quebec moat |
| Phase 4 | Pacific Islands | Growing | Growing | 0047 strategic synergy — zero competition |
| Phase 5 | Singapore + Malaysia | 25,000 | 80,000 | SE Asia gateway, long-term exit value |
| **All** | **Global goal** | **1.9M+** | **1.5M+** | **Every market. No exceptions.** |

### 31.2 Launch sequence — DECIDED

**Strategic rationale:**
Launch in home markets first. Validate the product with familiar
professional communities. Build case studies. Eliminate every rough
edge. Arrive in the US market with a proven, faultless platform
rather than a prototype. Then take all remaining markets.

**Phase 1 — Home market launch: NZ + Australia**
New Zealand and Australia are the validation ground.
Smaller professional communities mean word travels fast —
one respected Auckland attorney recommending AlecRae reaches
hundreds of colleagues within weeks. The NZ Law Society and
CAANZ accounting body are accessible and relationship-driven.
Oracle built on NZ + Australian public domain law from day one.
AustLII and NZLII provide comprehensive free data sources.
GST zero-rating on exported digital services = revenue advantage.

**Phase 2 — The big move: United States**
After NZ + AU validation, the US is the main event.
1.3 million attorneys. 660,000 CPAs. The legal tech market
alone is worth $1.2 billion annually. The Oracle is extended
with US public domain case law and IRS tax data.
IOLTA compliance cleared before US launch (Section 7).
AILA and AICPA conference strategy activated.
Delaware C-Corp entity operational for US contracts.

**Phase 3 — English-speaking common law expansion: UK + Canada**
United Kingdom: 200,000 solicitors, post-Brexit complexity,
enormous Oracle demand for cross-border law and tax intelligence.
Canada: 130,000 lawyers, close to US law, bilingual Quebec moat.
Both share the same common law architecture as NZ, AU, and US —
Oracle data extensions are the primary work, not architectural changes.

**Phase 4 — Pacific Islands**
Strategic play tied directly to the 0047 MVNO connectivity platform.
AlecRae and 0047 together serve the same underserved Pacific markets —
Fiji, Samoa, Tonga — where legal and accounting infrastructure is thin
and a modern cloud platform has zero real competition.
The combined AlecRae + 0047 story in the Pacific is a unique
market narrative no other platform can replicate.

**Phase 5 — Southeast Asia**
Singapore (English common law) and Malaysia (hybrid system).
Gateway to the broader SE Asian professional market.
Long-term acquisition value — adds significant geographic
footprint to any exit story.

**The goal: all markets. No exceptions. No market left behind.**
The platform is architected from day one to support every
jurisdiction listed above. The data layers, compliance frameworks,
and Oracle sources are all documented. The only variable is timing.

### 31.3 Data residency architecture — build this right from day one

Different countries require customer data to be stored within
their borders or within specific regions. This is not optional —
it is a legal requirement that affects Supabase configuration,
Vercel region settings, and the entire data architecture.

**Data residency requirements by market:**

| Market | Requirement | Supabase region | Vercel region |
|---|---|---|---|
| United States | US data on US servers | us-east-2 (AWS, Neon default) | iad1 (Washington DC) |
| Australia | Australian Privacy Act — AU preferred | ap-southeast-1 (Singapore, closest Neon region to AU/NZ) | syd1 (Sydney) |
| New Zealand | NZ Privacy Act 2020 — NZ or AU acceptable | ap-southeast-1 (Singapore, closest Neon region to AU/NZ) | syd1 (Sydney) |
| United Kingdom | UK GDPR — UK or EEA servers | eu-west-2 (Frankfurt, Neon EU region) | fra1 (Frankfurt) |
| European Union | GDPR — EEA servers required | eu-central-1 (Frankfurt) | fra1 (Frankfurt) |

**How this works in the codebase:**
Each firm is assigned a data region at signup based on their
country of operation. All their data — matters, clients,
documents, emails, messages — is stored exclusively in that
region's Neon project. Cross-region data transfer only
occurs where explicitly consented to and legally permitted.

This is not a Phase 3 consideration. This is a day-one
architecture decision. Retrofitting data residency onto a
platform that stored everything in one region is expensive,
legally risky, and potentially impossible without violating
existing data processing agreements.

**Neon multi-region setup:**
One Neon project per region. Shared schema, separate data.
A US attorney's data never touches the Sydney server.
An Australian CPA's data never touches the Virginia server.
The application layer routes each user to their correct
regional Neon project transparently — they never notice.

### 31.4 Compliance requirements by market

**United States:**
- IOLTA trust accounting rules (50-state analysis — Section 7)
- State bar professional conduct rules for legal software
- IRS Circular 230 for tax preparation assistance
- CCPA for California users
- SOC 2 Type II for enterprise sales (Section 22)

**Australia:**
- Australian Privacy Act 1988 + Privacy Amendment 2022
- Legal Profession Uniform Law (NSW, VIC, QLD, WA)
- ASIC regulations for accounting software
- Tax Practitioners Board (TPB) registration awareness

**New Zealand:**
- NZ Privacy Act 2020
- Law Society practising certificate requirements
- Chartered Accountants Australia and New Zealand (CAANZ) standards
- GST zero-rating for exported digital services (revenue benefit)

**United Kingdom:**
- UK GDPR + Data Protection Act 2018
- Solicitors Regulation Authority (SRA) technology guidance
- Financial Conduct Authority (FCA) for financial services accounting
- ICO registration for data processing

**European Union (future):**
- Full GDPR compliance already built (our baseline)
- ePrivacy Directive for cookies and communications
- AI Act compliance — AlecRae likely falls under high-risk AI
  given legal and financial advice context — monitor closely

### 31.5 Multi-currency and tax handling by market

| Market | Currency | Tax | Platform handling |
|---|---|---|---|
| United States | USD | State sales tax (Stripe Tax) | Stripe Tax enabled from day one |
| Australia | AUD | GST 10% | Stripe Tax — NZ entity exports zero-rated |
| New Zealand | NZD | GST 15% | Zero-rated for digital service exports |
| United Kingdom | GBP | VAT 20% | Stripe Tax |
| Canada | CAD | GST/HST varies by province | Stripe Tax |

All revenue collected in local currency. Conversion to USD
via Wise Business before repatriation to NZ entity.
Dual-qualified NZ/US accountant manages transfer pricing
between NZ Ltd and Delaware C-Corp from day one.

### 31.6 Oracle data sources by market

The Oracle is only as good as its data. Each market requires
its own verified public domain data sources.

**United States (Phase 1):**
- CourtListener (Free Law Project) — millions of court opinions
- Congress.gov API — federal statutes
- Cornell LII — US Code and CFR
- GovInfo — official federal documents
- IRS.gov — all tax publications and rulings

**Australia (Phase 1):**
- AustLII (Australasian Legal Information Institute) — free, comprehensive
- Federal Register of Legislation — Commonwealth statutes
- ATO (Australian Tax Office) — tax rulings and guidance

**New Zealand (Phase 1):**
- NZLII (NZ Legal Information Institute) — case law
- legislation.govt.nz — official NZ statutes
- IRD (Inland Revenue) — tax technical guidance

**United Kingdom (Phase 2):**
- BAILII (British and Irish Legal Information Institute)
- legislation.gov.uk — official UK statutes
- HMRC — tax guidance and manuals

**Canada (Phase 3):**
- CanLII (Canadian Legal Information Institute)
- Justice Laws Website — federal statutes
- CRA (Canada Revenue Agency) — tax guidance

---


---

## 31. Legal and Operational Compliance — All Markets

This section is the country-by-country legal operating guide.
It covers what entity structures are needed, what professional
body relationships matter, what tax obligations apply, and what
must be in place before AlecRae operates in each jurisdiction.

No market is launched until its checklist in this section is complete.
This is the legal protection layer for the entire global operation.

---

### 32.1 New Zealand — Phase 1 (home market)

**Entity:** NZ Ltd Company (already planned — Section 4)

**Professional body relationships:**
- New Zealand Law Society (NZLS) — notify before marketing to
  NZ attorneys. NZLS has technology guidance for practitioners.
  Seek endorsement or at minimum non-objection before launch.
- Chartered Accountants Australia and New Zealand (CAANZ) —
  same approach. A CAANZ-endorsed platform carries enormous
  credibility in the NZ accounting community.
- NZ Institute of Chartered Accountants (NZICA) — now merged
  into CAANZ. One relationship covers both.

**Legal requirements:**
- NZ Privacy Act 2020 — compliance built into platform baseline
- Companies Act 1993 — NZ Ltd Company obligations
- Contract and Commercial Law Act 2017 — governs our user agreements
- Consumer Guarantees Act 1993 — applies to services sold to consumers
- Fair Trading Act 1986 — marketing claims must be accurate
  ("most advanced platform ever built" requires substantiation)
- Electronic Transactions Act 2002 — e-signature validity (covered)

**Tax:**
- GST registration required once revenue exceeds NZD $60,000/year
- Digital services exported to non-NZ customers: GST zero-rated
- NZ R&D tax credit: 15% credit on eligible AI development costs
  Document all R&D activity from day one — this is real money
- Inland Revenue — register for income tax, PAYE if staff hired

**AlecRae Voice specific:**
- No specific voice recording laws beyond Privacy Act consent rules
- Inform users their voice is processed and not stored beyond session
- GDPR-equivalent consent for any voice data used for model training

**Pre-launch checklist NZ:**
- [ ] NZ Ltd Company formed and GST registered
- [ ] Privacy Policy reviewed by NZ privacy lawyer
- [ ] Terms of Service comply with Consumer Guarantees Act
- [ ] NZLS notification letter sent
- [ ] CAANZ outreach initiated
- [ ] R&D activity documentation system in place
- [ ] NZ data stored on AU/NZ Supabase region (ap-southeast-2)

---

### 32.2 Australia — Phase 1

**Entity:** No separate Australian entity required initially.
NZ Ltd Company can supply digital services into Australia.
GST registration with the ATO required once AU revenue exceeds
AUD $75,000/year (low-value imported services threshold).

**When to form an Australian entity:**
When AU revenue exceeds AUD $500,000/year OR when seeking
Australian institutional investment OR when AU enterprise
contracts require an Australian counterparty. Until then,
NZ Ltd operating into Australia is clean and simple.

**Professional body relationships:**
- Law Council of Australia (LCA) — federal peak body
  for the legal profession. Notification before marketing nationally.
- Law societies by state (highest priority states):
  - Law Society of NSW — largest, 37,000 members
  - Law Institute of Victoria — 22,000 members
  - Queensland Law Society — 12,000 members
- CPA Australia — 170,000 members, largest accounting body
- Chartered Accountants Australia and New Zealand (CAANZ) —
  shared with NZ, one relationship covers both markets

**Legal requirements:**
- Australian Privacy Act 1988 + Privacy Amendment (Enhancing
  Privacy Protection) Act 2012 + 2022 reforms
  The 2022 reforms significantly strengthened enforcement —
  penalties up to AUD $50M for serious breaches
- Australian Consumer Law (ACL) — Part of Competition and
  Consumer Act 2010. Governs marketing claims, warranties,
  unfair contract terms. "Most advanced platform" claims
  need substantiation or risk ACCC attention.
- Electronic Transactions Act 1999 (Cth) — e-signature validity
- Legal Profession Uniform Law — applies in NSW, VIC, QLD, WA.
  Software used by attorneys for client matters must not
  breach professional conduct rules in these states.
- Tax Practitioners Board (TPB) — accounting software must not
  hold itself out as providing tax agent services.
  AlecRae Accounting assists registered tax agents — it is
  not itself a tax agent. This distinction must be clear.

**Tax:**
- GST: Register with ATO for GST on AU sales once threshold met
- Withholding tax: No withholding on software licence payments
  from AU to NZ under the AU-NZ Double Tax Agreement (DTA)
- Transfer pricing: If inter-company transactions exist between
  NZ Ltd and any future AU entity, document arm's length pricing

**Trust accounting — Australian equivalent:**
Each state has its own trust accounting rules for attorneys.
NSW: Legal Profession Uniform General Rules 2015
VIC: Legal Profession Uniform General Rules 2015
QLD: Legal Profession Act 2007
These are as strict as US IOLTA rules. The same legal tech
attorney analysis required for US trust accounting (Section 7)
must be replicated for Australian state requirements before
the trust accounting module launches in Australia.

**Pre-launch checklist Australia:**
- [ ] ATO GST registration when threshold approached
- [ ] Privacy Policy updated to cover Australian Privacy Act
- [ ] Australian Consumer Law marketing compliance review
- [ ] LCA and state law society notification letters sent
- [ ] CPA Australia and CAANZ outreach initiated
- [ ] TPB compliance statement added to accounting product pages
- [ ] State-by-state trust accounting analysis commissioned
- [ ] AU user data stored on ap-southeast-2 Supabase region
- [ ] Australian-specific Oracle data (AustLII) integrated

---

### 32.3 United States — Phase 2

**Entity:** Delaware C-Corp (already planned — Section 4)
**IP Holding Entity:** Separate from operating companies

**Professional body relationships:**
- American Bar Association (ABA) — ABA TechShow is the single
  most important annual legal tech event. Presence required.
- American Immigration Lawyers Association (AILA) — primary
  target for AlecRae Law immigration module launch
- American Institute of CPAs (AICPA) — primary target for
  AlecRae Accounting launch
- State bars — 50 states each have their own bar association.
  Priority states: California (190,000 attorneys),
  New York (170,000), Texas (100,000), Florida (80,000)
- National Association of Tax Professionals (NATP)
- National Society of Accountants (NSA)

**Legal requirements:**
(All fully detailed in Section 7 — summarised here)
- 50-state IOLTA trust accounting analysis before trust module
- State bar technology/software guidance per jurisdiction
- IRS Circular 230 — AlecRae Accounting assists CPAs,
  does not itself prepare returns or provide tax advice
- CCPA (California) — additional privacy rights for CA users
- SOC 2 Type II — required for enterprise sales (Section 22)
- HIPAA — not initially applicable but monitor if any health
  law practice areas are added to the platform
- ADA (Americans with Disabilities Act) — website accessibility
  WCAG 2.1 AA compliance required for US public-facing pages

**Tax:**
- Federal corporate income tax (Delaware C-Corp)
- State income tax in states where economic nexus exists
- Sales tax: Stripe Tax handles US state tax nexus automatically
- Payroll tax if US employees hired — use Gusto or Rippling
- Transfer pricing between NZ Ltd and Delaware C-Corp —
  document all inter-company transactions from day one

**Pre-launch checklist United States:**
- [ ] Delaware C-Corp formed and registered
- [ ] IP holding entity formed, all IP assigned
- [ ] Trademark applications filed (USPTO) before launch
- [ ] Provisional patents filed before any public demo
- [ ] IOLTA 50-state analysis complete
- [ ] US legal tech attorney engaged and briefed
- [ ] CCPA privacy rights implemented for CA users
- [ ] ADA / WCAG 2.1 AA accessibility audit complete
- [ ] D&O insurance in place for Delaware C-Corp
- [ ] Stripe Tax enabled for all US transactions
- [ ] US user data stored on us-east-1 Supabase region
- [ ] US Oracle data (CourtListener, Congress.gov, IRS) integrated

---

### 32.4 United Kingdom — Phase 3

**Entity:** UK Limited Company recommended before meaningful
UK revenue. UK Ltd provides: local contracting party for UK firms,
UK VAT registration, local bank account, UK employer status.
Formed when UK revenue approaches GBP £50,000/year.

**Professional body relationships:**
- Solicitors Regulation Authority (SRA) — primary regulator for
  England and Wales solicitors. SRA has published technology
  guidance. AlecRae must comply with SRA Practice Framework Rules.
- Bar Council of England and Wales — barristers specifically
- Law Society of England and Wales — solicitors' representative body
- Institute of Chartered Accountants in England and Wales (ICAEW)
  — 150,000 members, primary UK accounting body
- Association of Chartered Certified Accountants (ACCA)
  — global but strong UK presence, 200,000 UK members
- Chartered Institute of Taxation (CIOT) — tax professionals

**Legal requirements:**
- UK GDPR + Data Protection Act 2018 — essentially identical
  to EU GDPR post-Brexit. ICO (Information Commissioner's Office)
  is the supervisory authority. Register with ICO on launch.
- UK AI Liability Framework — emerging regulation, monitor closely
- SRA Accounts Rules 2019 — UK equivalent of IOLTA. Client money
  rules are strict. Same trust accounting analysis required as US/AU.
- Electronic Communications Act 2000 — e-signature validity
- Consumer Rights Act 2015 — governs B2C contracts in the UK
- Unfair Contract Terms Act 1977 — unreasonable contract terms void
- Companies Act 2006 — UK Ltd Company obligations
- UK Modern Slavery Act 2015 — statement required once turnover
  exceeds GBP £36M (plan ahead, do not be caught unprepared)

**Tax:**
- UK VAT: Register when UK turnover exceeds GBP £85,000/year
  Digital services to UK consumers: VAT applies at 20%
  B2B services to VAT-registered UK firms: reverse charge mechanism
- UK Corporation Tax: 25% on profits above GBP £250,000
  (19% for profits under GBP £50,000 — small companies rate)
- UK-NZ Double Tax Agreement: prevents double taxation
- R&D tax relief: UK offers generous R&D credits —
  explore eligibility once UK entity is formed

**Post-Brexit considerations:**
- UK and EU are now separate jurisdictions for data and legal purposes
- UK GDPR covers UK. EU GDPR covers EU separately.
- Cross-border data transfers UK→EU: adequacy decision in place
- UK legal and regulatory divergence from EU is ongoing —
  monitor annually for changes affecting AlecRae

**Pre-launch checklist United Kingdom:**
- [ ] ICO registration completed
- [ ] UK GDPR data processing addendum in Terms of Service
- [ ] SRA technology guidance compliance review
- [ ] SRA Accounts Rules analysis for trust/client money module
- [ ] ICAEW and ACCA outreach initiated
- [ ] UK VAT registration when threshold approached
- [ ] UK Ltd Company formed when revenue warrants
- [ ] UK user data stored on eu-west-2 (London) Supabase region
- [ ] UK Oracle data (BAILII, legislation.gov.uk, HMRC) integrated
- [ ] WCAG 2.1 AA accessibility compliance (UK Equality Act 2010)

---

### 32.5 Canada — Phase 3

**Entity:** No separate Canadian entity required initially.
Digital services can be supplied from NZ Ltd into Canada.
GST/HST registration with CRA required once Canadian revenue
exceeds CAD $30,000/year (federal threshold).

**Professional body relationships:**
- Federation of Law Societies of Canada — national coordinating body
- Law Society of Ontario — largest, 55,000 members
- Barreau du Québec — French-language bar, Quebec civil law system
- Law Society of British Columbia — tech-forward, 14,000 members
- Chartered Professional Accountants Canada (CPA Canada)
  — unified accounting body covering all provinces

**Legal requirements:**
- PIPEDA (Personal Information Protection and Electronic
  Documents Act) — Canada's federal privacy law, similar to GDPR
  Quebec has its own Law 25 (modernised 2023) which is stricter
- Canada Anti-Spam Legislation (CASL) — strict rules on
  commercial email. All marketing emails to Canadian professionals
  require express or implied consent. Unsubscribe mandatory.
  Penalties up to CAD $10M per violation. Take this seriously.
- Electronic Commerce Act — e-signature validity varies by province
- Quebec Civil Code — Quebec uses civil law, not common law.
  The Oracle requires a separate Quebec civil law data layer.
  This is a meaningful technical project — plan for it.
- Law society trust accounting rules vary by province —
  same analysis required as US and AU before trust module launches

**Tax:**
- GST/HST: Federal 5% GST + provincial HST where applicable
  Ontario: 13% HST, BC: 12% HST, Alberta: 5% GST only
  Stripe Tax handles Canadian provincial tax complexity
- Quebec QST: 9.975% — separate registration with Revenu Québec
- Withholding tax: NZ-Canada DTA reduces withholding on royalties

**The Quebec opportunity:**
Quebec is the only Canadian province using French civil law.
English-language legal tech almost universally ignores Quebec.
An Oracle that covers both Canadian common law AND Quebec
civil law — in both English and French — is a unique moat
that no competitor has built. Consider bilingual Oracle
capability as a Phase 3 premium feature.

**Pre-launch checklist Canada:**
- [ ] CASL compliance — all Canadian marketing email workflows audited
- [ ] PIPEDA and Quebec Law 25 privacy compliance reviewed
- [ ] CRA GST registration when threshold approached
- [ ] Revenu Québec QST registration if marketing to Quebec firms
- [ ] Law Society of Ontario and CPA Canada outreach initiated
- [ ] Province-by-province trust accounting analysis commissioned
- [ ] Canadian Oracle data (CanLII, Justice Laws) integrated
- [ ] Quebec civil law Oracle layer planned (Phase 3 premium)
- [ ] Canadian user data stored on us-east-1 or dedicated CA region

---

### 32.6 Pacific Islands — Phase 4

**Markets:** Fiji, Samoa, Tonga (primary)
Papua New Guinea, Vanuatu (secondary)

**Entity:** No separate Pacific entity required initially.
NZ Ltd supplies digital services into Pacific markets.
These markets have minimal digital services tax infrastructure.
Monitor as regulations develop.

**Strategic context:**
These markets are served in direct partnership with the 0047
MVNO connectivity platform. AlecRae provides the professional
tools. 0047 provides the connectivity infrastructure.
Together they represent the complete professional technology
stack for Pacific Island legal and accounting firms.

**Professional body relationships:**
- Fiji Law Society — small community (~500 practitioners),
  relationship-driven. One respected endorsement covers the market.
- Samoa Law Society — similar size and dynamics
- Tonga Law Society
- Fiji Institute of Accountants (FIA)
- Institute of Accountants Samoa (IAS)
Pacific accounting bodies are generally affiliated with CAANZ —
the NZ relationship carries weight across the Pacific.

**Legal requirements:**
Each Pacific Island nation has its own legal system derived
primarily from British common law (Fiji, Samoa, Tonga).
Key considerations:
- Data protection laws are minimal or absent in most Pacific
  Island nations currently. Apply NZ Privacy Act standards anyway —
  this is ethical and positions AlecRae well as regulations develop.
- Currency: USD and local currencies. Stripe supports limited
  Pacific currency processing. USD billing recommended.
- English is the professional language in all target markets.

**The Pacific Oracle:**
Pacific Island case law is sparse and largely unpublished.
The Oracle value in Pacific markets is primarily:
- NZ and Australian case law (highly persuasive in Pacific courts)
- UK Privy Council decisions (final court of appeal for some)
- Local statutes (limited but available from official sources)
This is not a weakness — it is a realistic product that serves
a market with almost no existing legal research infrastructure.

**Pre-launch checklist Pacific Islands:**
- [ ] 0047 partnership formalised and Pacific connectivity live
- [ ] Fiji Law Society and FIA outreach via NZ contacts
- [ ] USD billing configured for Pacific Island clients
- [ ] Pacific Oracle data sources identified and integrated
- [ ] CAANZ relationship leveraged for Pacific accounting bodies

---

### 32.7 Singapore and Malaysia — Phase 5

**Singapore:**
- English common law system — Oracle extension is straightforward
- Personal Data Protection Act 2012 (PDPA) — Singapore's privacy law,
  similar to GDPR in structure
- Law Society of Singapore — 6,000 members
- Institute of Singapore Chartered Accountants (ISCA)
- Singapore Legal Services Regulatory Authority (LSRA)
- GST: 9% — register when Singapore revenue exceeds SGD $1M
- Singapore has no capital gains tax — favourable for any
  Singapore holding entity structure considered in future

**Malaysia:**
- Hybrid legal system: common law for commercial matters,
  Islamic law (Syariah) for personal/family matters
- Syariah law dimension requires careful Oracle scoping —
  the Oracle covers Malaysian commercial common law only
  unless a specific Syariah module is built (Phase 5+)
- Personal Data Protection Act 2010 (PDPA Malaysia)
- Malaysian Bar Council — 20,000 members
- Malaysian Institute of Accountants (MIA)
- GST equivalent: Sales and Service Tax (SST) at 8%

**Pre-launch checklist SE Asia:**
- [ ] Singapore PDPA compliance review
- [ ] Malaysian PDPA compliance review
- [ ] Singapore LegalTech roadmap reviewed (MAS and Law Society)
- [ ] Oracle scoped for Malaysian commercial law only (not Syariah)
- [ ] Regional legal counsel engaged for Singapore entry

---

### 32.8 Universal compliance requirements — all markets

Regardless of which market is active, these apply everywhere:

**Privacy:** GDPR-standard privacy by design (our baseline)
satisfies NZ, AU, UK, Canada, Singapore, and Malaysia
with only minor additions per jurisdiction. This was the
right baseline to choose.

**Accessibility:** WCAG 2.1 AA minimum across all markets.
Required by law in US (ADA), UK (Equality Act), AU (Disability
Discrimination Act), and best practice everywhere else.
Build accessible from day one — retrofitting is expensive.

**AI transparency:** Every market is developing AI regulation.
The EU AI Act is the most advanced. AlecRae likely falls under
"high-risk AI" due to its legal and financial advice context.
The disclaimer system (Section 6.4) and citation verification
(Section 21) are the primary compliance mechanisms. Monitor
AI regulation developments quarterly in every active market.

**The AlecRae voice note on marketing claims:**
Every market has consumer protection laws that govern
advertising claims. "Most advanced platform ever built" and
"80–90% ahead of competition" are claims that must be
substantiated or modified to "among the most advanced" in
markets with strict advertising standards (UK ASA, AU ACCC,
NZ Commerce Commission). Legal review of marketing copy
required before launch in each new market.

---


---

## 32. Verom.ai — AlecRae Immigration (Migration Asset)

### 33.1 What Verom.ai is

Verom.ai is a fully built, advanced AI-powered immigration
compliance platform. It is one of the most advanced immigration
compliance tools on the market and represents a significant
existing asset that migrates directly into AlecRae Law as the
AlecRae Immigration module.

This is not a future build. This is existing work that gets
a better home inside the most advanced legal platform ever built.

**Current status:** Live platform, standalone deployment
**Future status:** Migrated into alecrae.com under /law/immigration
**Brand after migration:** AlecRae Immigration
**Verom.ai domain:** Redirect to alecrae.com/immigration after migration

### 33.2 What Verom.ai contains — the migration inventory

Before migration, conduct a full audit of the Verom.ai codebase
and document every feature, every database table, every API
integration, and every AI capability. The following is the
known feature set to be preserved and enhanced:

**Core platform features:**
- Three-sided marketplace: attorneys, clients, and employers
- Immigration compliance workflow management
- AI-powered case assessment and recommendations
- Document generation for immigration filings
- Status tracking for visa applications
- Compliance deadline management
- ICE audit simulator (unique competitive moat — preserve this)
- USCIS form library with AI pre-population

**The three-sided marketplace:**
Side 1 — Immigration attorneys (supply side)
Side 2 — Individuals needing immigration help (demand side)
Side 3 — Employers sponsoring foreign workers (B2B demand)
This marketplace structure is the feature that makes AlecRae
Immigration the most commercially powerful immigration module
available. The escrow transaction clip on case fees is the
toll road revenue model (Section 10).

**AI capabilities from Verom.ai:**
- Case type classification from intake information
- Document completeness checking
- Timeline prediction for visa processing
- Compliance risk flagging
- Auto-population of USCIS forms from client data

### 33.3 How migration works

**What moves:**
All business logic, AI capabilities, database schema,
USCIS form library, marketplace infrastructure, escrow flow,
and ICE audit simulator move into the AlecRae codebase.

**What gets rebuilt:**
The UI is rebuilt in the AlecRae design system
(Instrument Serif + Plus Jakarta Sans, navy/white palette).
The authentication system is replaced by AlecRae's unified auth.
The standalone database is migrated into the AlecRae Neon project.

**The route structure after migration:**
```
alecrae.com/law/immigration/          — module home
alecrae.com/law/immigration/matters   — case management
alecrae.com/law/immigration/forms     — USCIS form library
alecrae.com/law/immigration/clients   — three-sided marketplace
alecrae.com/law/immigration/audit     — ICE audit simulator
alecrae.com/law/immigration/oracle    — Oracle Immigration research
```

**What Verom.ai gains from being inside AlecRae:**
- AlecRae Voice — attorneys dictate case notes and client updates
- The Oracle — instant immigration law research inline
- AlecRae Email — matter-centric email with Oracle in the composer
- Collaboration tools — lawyer/accountant bridge for visa+tax matters
- Billing and trust accounting — integrated fee collection
- Client portal — clients track their own case status
- The AlecRae brand — immediately more credible than a standalone tool

### 33.4 The immigration + accounting cross-domain opportunity

Immigration is one of the most powerful use cases for The Oracle
cross-domain tier. Every immigration matter has accounting implications:

- H-1B visa holders: dual-status tax year, FICA implications
- EB-5 investor visas: substantial investment requirements,
  source of funds documentation, tax treaty considerations
- L-1 intracompany transfers: transfer pricing, PE risk
- O-1 extraordinary ability: self-employment tax, Schedule C
- Spouse work authorisation: dual income tax planning
- Green card through employment: multi-year tax planning

An immigration attorney and their client's CPA need to talk
constantly. AlecRae is the only platform that puts both of them
in the same workspace with the Oracle answering cross-domain
queries that require both legal and accounting intelligence.
This is the AlecRae Immigration module's most powerful
differentiator over every standalone immigration tool.

### 33.5 ICE audit simulator — the feature nobody else has

The ICE audit simulator built into Verom.ai is a genuine
competitive moat. No other immigration compliance platform
provides an employer-facing tool that simulates an ICE
I-9 audit, identifies compliance gaps, and generates a
remediation plan before a real audit occurs.

This feature must be preserved exactly, enhanced with Oracle
intelligence, and marketed aggressively to:
- HR departments of companies sponsoring foreign workers
- Corporate attorneys managing employer immigration compliance
- PEOs (Professional Employer Organisations)

This is a B2B revenue stream that exists independently of the
attorney marketplace. Employers pay for the audit simulator
as a standalone compliance tool — then discover the full
AlecRae Immigration platform through it.

### 33.6 Verom.ai domain strategy after migration

Once the migration is complete and AlecRae Immigration is live:
- verom.ai → permanent 301 redirect to alecrae.com/immigration
- All Verom.ai SEO equity transfers to AlecRae via the redirect
- Any existing Verom.ai users are migrated to AlecRae accounts
  with a personal onboarding email explaining the upgrade
- The Verom.ai brand is retired — AlecRae Immigration is the name

**Important:** Do not retire the Verom.ai domain immediately.
Keep it redirecting for at least 12 months after migration
to preserve any inbound links and search rankings built on it.

### 33.7 Migration checklist

- [ ] Full Verom.ai feature and database audit completed
- [ ] All Verom.ai GitHub code reviewed and mapped to AlecRae routes
- [ ] USCIS form library extracted and documented
- [ ] ICE audit simulator logic isolated for migration
- [ ] Marketplace and escrow infrastructure mapped to Stripe Connect
- [ ] Existing user data migration plan documented
- [ ] AlecRae Immigration UI built in AlecRae design system
- [ ] Oracle Immigration research layer integrated
- [ ] AlecRae Voice added to all immigration input fields
- [ ] Cross-professional bridge connected (attorney ↔ accountant)
- [ ] verom.ai redirect configured in Cloudflare
- [ ] Existing Verom.ai users notified and migrated
- [ ] SEO redirect audit confirms equity transfer complete

### 33.8 Where AlecRae Immigration sits in the build sequence

AlecRae Immigration is a Phase 2 module — it follows the Phase 1
core platform (authentication, dashboard, AlecRae Voice, Oracle,
basic case management, billing). The reason it is Phase 2 rather
than Phase 1 is that the migration requires the core platform
to exist first. You cannot build a room before you build the house.

However, the Verom.ai platform continues to operate independently
during Phase 1. Existing users and any new Verom.ai users are
served by the standalone platform until migration is complete.
The two platforms run in parallel during this period.

**Phase 1:** Core AlecRae platform built and launched
**Phase 2 start:** Verom.ai migration begins
**Phase 2 complete:** AlecRae Immigration live, verom.ai redirects

---


---

## 33. AlecRae App — Cross-Platform Desktop and Mobile

### 34.1 Why the app changes everything

The web platform at alecrae.com serves professionals
when they are inside the browser. The AlecRae app serves
professionals everywhere — on their desktop, on their phone,
at their desk, in court, in a client meeting, on a plane.

The app is how AlecRae Voice becomes a system-level tool
that works in every application on every device, exactly
like WisprFlow — but connected to the full AlecRae platform.

A lawyer using the AlecRae app can dictate into Word,
into Outlook, into any application on their computer —
and every dictation is matter-aware, Oracle-connected,
and logged to their AlecRae account automatically.

**Domain to purchase immediately: `alecrae.app`**
This TLD is purpose-built for app products. It signals
to every professional that this is a native application
experience, not just a website. Purchase before announcement.

### 34.2 The technology — Tauri v2 (already in the AlecRae stack)

The founder already built 48co.nz using Tauri v2 — this is
the exact technology for the AlecRae desktop app.

Tauri v2 advantages over Electron (the old way):
- 10-20x smaller binary size (2-3MB vs 100MB+)
- Dramatically lower memory usage
- Faster startup time
- Native OS integration — accesses system microphone,
  notifications, clipboard, and file system natively
- Rust backend = bulletproof performance and security
- Single codebase builds Windows, Mac, and Linux simultaneously

**The AlecRae app architecture:**
```
AlecRae App (Tauri v2)
├── Desktop shell          — Rust, native OS APIs
├── Web frontend           — Same Next.js/React components
│                            as alecrae.com (shared codebase)
├── System microphone      — Global hotkey triggers Voice
├── Clipboard integration  — Dictated text to any app
├── Native notifications   — Matter alerts, messages, deadlines
└── AlecRae Voice engine   — Whisper API + AlecRae layer
```

**The key insight:** The same React components built for
alecrae.com are rendered inside the Tauri shell. One codebase.
The web app and desktop app share 95% of their code.
Building the web platform builds the desktop app simultaneously.

### 34.3 Mobile apps — iOS and Android

**Technology:** React Native (or Expo — built on React Native)

Same React component logic, adapted for mobile screens.
The AlecRae mobile app gives professionals:

- AlecRae Voice on their phone — dictate anywhere
- Full matter access — review any case from any location
- Secure client messaging — respond instantly from mobile
- Document signing on the go — e-sign from a phone
- Calendar and meeting management
- Oracle on mobile — research from a phone in court
- Push notifications for urgent matters and deadlines

**The microphone advantage on mobile:**
The phone is always in a professional's hand.
AlecRae Voice on mobile means a lawyer leaving a client
meeting can dictate their notes, tag them to the matter,
and have them logged before they reach their car.
That is a behaviour change that generates daily engagement.

### 34.4 System-wide Voice on desktop

On Mac: AlecRae Voice registers a global keyboard shortcut
(⌘⇧Space by default, customisable). Press it anywhere —
in Word, in Outlook, in Chrome, in any application —
and AlecRae Voice activates. Speak. The text appears
at your cursor position, with full professional language
intelligence applied, tagged to the last active matter
in the AlecRae app if one is open.

On Windows: Same global shortcut mechanism via Tauri's
Windows API integration. Works across all Windows applications.

This is the system-level capability that makes AlecRae Voice
function like WisprFlow — but connected to a full professional
platform rather than operating as a standalone tool.

### 34.5 Competitive advantage of the app

| Capability | WisprFlow | Grammarly | Dragon Legal | AlecRae App |
|---|---|---|---|---|
| System-wide dictation | ✓ | ✗ | ✓ | ✓ |
| Cross-platform W/M/iOS/Android | ✓ | ✓ | Windows only | ✓ |
| Legal vocabulary intelligence | ✗ | ✗ | ✓ | ✓ |
| Accounting vocabulary | ✗ | ✗ | ✗ | ✓ |
| Multi-language professional | ✓ basic | ✓ basic | ✗ | ✓ deep |
| Oracle integration | ✗ | ✗ | ✗ | ✓ |
| Matter-aware dictation | ✗ | ✗ | ✗ | ✓ |
| Voice commands to platform | ✗ | ✗ | ✗ | ✓ |
| Instant messaging | ✗ | ✗ | ✗ | ✓ |
| Email with Oracle | ✗ | ✗ | ✗ | ✓ |
| Calendar + meetings | ✗ | ✗ | ✗ | ✓ |
| Offline capability | Limited | ✗ | ✓ | ✓ (Tauri) |
| SOC 2 Type II | ✗ | ✓ | ✓ | Phase 3 |

AlecRae App wins every single category that matters to
a legal or accounting professional. The only gap is SOC 2
which is on the roadmap in Section 22.

---

## 34. Advanced Technology Stack — Dominating the Market

### 35.1 The full technology picture

This section documents every advanced technology used
in the AlecRae platform and why each one is chosen.
Before building any feature, Claude reads this section
and confirms current best practices for each technology.

**Core stack (locked — Section 28):**
```
Next.js 15          — App Router, Server Components, streaming UI
React 19            — Concurrent features, useOptimistic
TypeScript          — Strict mode, zero any types
Tailwind CSS v4     — Latest utility-first CSS
Neon (PostgreSQL)   — Serverless, branching, multi-region
Prisma v6           — Type-safe ORM, migrations
Stripe              — Payments, Connect, Tax
Claude API          — The Oracle, document AI, Voice processing
Vercel              — Hosting, Edge Functions, Analytics
Cloudflare          — DNS, CDN, DDoS, Email Routing
NextAuth.js v5      — Authentication, session management
Tauri v2            — Desktop app (Mac, Windows, Linux)
React Native/Expo   — Mobile app (iOS, Android)
```

**Real-time collaboration stack:**
```
Yjs                 — CRDT-based real-time document sync
                      (same technology as Google Docs)
Hocuspocus          — Yjs server for collaborative editing
PartyKit / Ably     — WebSocket infrastructure for messaging
                      and real-time presence indicators
```

**Voice and audio stack:**
```
OpenAI Whisper API  — Multilingual speech-to-text base layer
Claude API          — Post-processing, professional language layer
Web Speech API      — Browser-native fallback for web
Tauri audio API     — Native microphone access on desktop
react-native-voice  — Mobile microphone access
```

**Performance stack:**
```
Vercel Edge Functions  — <50ms response globally
React Server Components — Zero JavaScript for static content
Streaming SSR          — Instant perceived performance
ISR (Incremental Static Regeneration) — Fast static pages
Service Workers        — Offline capability and caching
```

**Monitoring and quality stack:**
```
Sentry              — Error tracking, Layer 2 never breaks
Vercel Analytics    — Performance monitoring
PostHog             — Product analytics, session replay
Uptime Robot        — 24/7 uptime monitoring with alerts
```

**Email infrastructure stack:**
```
Resend              — Transactional email (built for Next.js)
React Email         — Email templates as React components
                      (no HTML — same philosophy as the platform)
Cloudflare Email    — Email routing and hosting
Nylas API           — Gmail/Outlook OAuth integration (Phase 1)
```

**Document and file stack:**
```
Tiptap              — Rich text editor (built on ProseMirror)
                      The most advanced open-source editor available
                      Used by Notion, Linear, and thousands of apps
PDF-lib             — PDF generation (legal documents)
Uploadthing         — File uploads (built for Next.js/Vercel)
```

**Security stack:**
```
Clerk (or NextAuth) — Authentication with MFA enforcement
Row Level Security  — Neon/PostgreSQL — firm data isolation
AES-256             — Document and message encryption
TLS 1.3             — All data in transit
bcrypt              — Password hashing
CSRF protection     — Built into Next.js App Router
Rate limiting       — Upstash Redis + Vercel middleware
```

### 35.2 The Tiptap editor — why this specifically

Tiptap is the most important single technology choice in
the document editing layer and deserves specific explanation.

Tiptap is a headless rich text editor built on ProseMirror.
"Headless" means it has no default UI — the UI is built
entirely in AlecRae's design system. It is used by:
- Notion (their entire editor)
- Linear (issue descriptions and comments)
- Substack (article editor)
- Thousands of production applications

For AlecRae specifically:
- Real-time collaborative editing (multiple attorneys in one doc)
  via Tiptap's Collaboration extension + Yjs CRDT
- Oracle citations inserted as custom Tiptap nodes
  (they render with the ✓ verification badge, cannot be
  accidentally deleted without confirmation)
- AlecRae Voice dictation inserts at cursor via Tiptap commands
- Legal formatting: automatic paragraph numbering,
  defined terms highlighting, clause cross-referencing
- Version history: every document version stored,
  any version restorable (critical for legal documents)

This is the document editor that makes attorneys stop
using Word. The moment a lawyer edits a contract in
AlecRae and sees Oracle citations appearing with
verification badges, real-time collaboration, version
history, and voice input — they never open Word again.

### 35.3 Real-time collaboration — the Google Docs moment

When multiple attorneys at a firm are working on the same
contract, they should be able to edit it simultaneously.
This requires Conflict-free Replicated Data Types (CRDTs) —
the same technology that powers Google Docs.

Yjs is the open-source CRDT implementation used across
the industry. Combined with Tiptap's collaboration extension
and Hocuspocus as the sync server, AlecRae documents become
fully real-time collaborative from day one.

What this enables:
- Two attorneys editing the same contract simultaneously
- Changes appear in real-time with user presence indicators
- No conflicts, no version clashes, no "who has the latest copy"
- Attorney A dictates a clause via AlecRae Voice while
  Attorney B edits a different section — both see each other live

No current legal practice management platform offers this.
Clio does not. MyCase does not. Smokeball does not.
AlecRae ships it at launch.

### 35.4 Performance philosophy — sub-second everything

The two-layer system in Section 28 handles bug prevention.
This section handles speed. A platform that is slow is
a platform professionals abandon regardless of features.

**The targets:**
- Page load (first contentful paint): under 1 second
- Oracle query response: under 3 seconds
- AlecRae Voice transcription: under 500ms for short utterances
- Message delivery: under 100ms (WebSocket)
- Document sync: under 50ms between collaborators

**How we hit them:**
Vercel Edge Functions run at the edge, close to the user.
A NZ attorney queries the Oracle — the edge function runs
in Sydney, not Virginia. Response is 150ms not 350ms.

React Server Components stream content immediately.
The page is not blank while JavaScript loads. Content
appears progressively as it is ready.

Service Workers cache static assets. The second time
a professional opens AlecRae, it is instant.

React 19's concurrent features prioritise user interactions
over background processing. The UI never freezes.

### 35.5 Offline capability

Professionals are not always online. A lawyer in a rural
courthouse may have poor connectivity. An accountant on
a plane needs to review a client file.

AlecRae's Service Worker caches:
- The last 50 matters accessed
- All documents opened in the last 7 days
- The professional's calendar for the next 30 days
- Their client list and contact details

When connectivity returns, all offline actions sync
automatically. This is built into Tauri for the desktop
app natively, and via Service Workers for the web app.

No legal or accounting platform offers offline capability
with automatic sync. This is another unoccupied position.

### 35.6 The zero-HTML, components-only mandate

Every UI element in AlecRae is a React component.
No .html files. No inline styles (Tailwind classes only).
No JavaScript files (TypeScript only).

Why this matters technically:
- TypeScript catches errors at build time, not runtime.
  A type error in the billing component is found before
  it reaches a customer, not after.
- React components are testable in isolation.
  Every component has a test before it goes to production.
- Server Components eliminate unnecessary JavaScript.
  A static page sends zero JS to the browser.
  Faster. More secure. Better SEO.

Why this matters for the product promise:
The faultless product promise in Section 28 is enforced
technically, not just philosophically. TypeScript, component
isolation, and test coverage are the mechanisms.
A bug that TypeScript catches never reaches the customer.
A bug that a component test catches never reaches production.
A bug that Sentry catches in production is fixed before
the next customer encounters it.

---


---

## 35. Government Authority Strategy — IRD, ATO, and Beyond

### 36.1 The strategic opportunity

Government tax authority accreditation is the single most
powerful trust signal a professional accounting platform can
carry. When an accountant sees "IRD-accredited software" they
do not need to evaluate the platform — the government has
already evaluated it for them. This is credibility that
cannot be purchased with advertising.

More importantly: IRD and the ATO want more accountants
using approved digital software. They have active programmes
designed to encourage adoption. AlecRae is not asking them
to do something new — it is helping them achieve goals they
have already publicly committed to.

The positioning is never "please adopt us."
The positioning is "we help you achieve what you have already said you want."
That is the framing that gets meetings and gets approved.

---

### 36.2 New Zealand — IRD Digital Service Provider

**The programme:**
IRD operates a formal Digital Service Providers programme
with gateway services that software providers integrate with.
The gateway is available 24/7 and covers all major NZ tax types.
Registration requires submitting a product request after
registering interest. This is a structured, documented pathway.
URL: ird.govt.nz/digital-service-providers

**The AIM opportunity — the single most compelling angle:**
The Accounting Income Method (AIM) allows businesses to
calculate provisional tax based on actual income using
approved accounting software, paying with each GST return.
IRD actively promotes AIM adoption. The problem: many
accountants and their clients are not using it because
their software is not AIM-approved.

AlecRae Accounting becoming AIM-approved means:
- Every NZ client on AlecRae gets automatic provisional
  tax alignment — no more lump sum provisional tax surprises
- Accountants can offer a genuinely better client outcome
  that competitors without AIM approval cannot match
- IRD benefits from more businesses using AIM, which is
  their stated policy goal

This is not a feature. This is a structural advantage that
makes AlecRae the most financially intelligent accounting
platform for NZ businesses and their accountants.

**IRD gateway services to integrate (priority order):**

| Service | What it enables | Priority |
|---|---|---|
| GST | File GST returns directly from AlecRae | Phase 1 — AIM integration |
| Payday filing | File PAYE/payroll directly | Phase 1 |
| Income tax | File IR3, IR4, IR6, IR7 returns | Phase 1 |
| AIM | Provisional tax via accounting software | Phase 1 — flagship |
| KiwiSaver | KiwiSaver contribution filing | Phase 2 |
| Student loans | Employer deduction filing | Phase 2 |
| Investment income | PIE, RWT, NRWT reporting | Phase 2 |

**What AlecRae looks like to IRD:**
IRD evaluates software providers on:
1. Technical compliance — does the software correctly
   implement IRD's gateway service specifications?
2. Security — is customer tax data handled securely?
   (Our SOC 2 roadmap and GDPR-standard privacy baseline
   directly address this)
3. Reliability — is the software available when taxpayers
   need to file? (Vercel's 99.99% uptime SLA covers this)
4. User experience — does the software make compliance
   easier for NZ taxpayers and their agents?
   (This is where AlecRae dominates completely)
5. Support — can users get help when they need it?
   (AlecRae's client portal and secure messaging built in)

**The application package — what to submit:**

When AlecRae applies to IRD as a Digital Service Provider,
the application must include:

- Executive summary: who AlecRae is, what it does, and
  specifically how it advances IRD's digital strategy goals
- Technical architecture document: how the gateway
  integration works, data security measures, uptime guarantees
- Privacy and security certification: NZ Privacy Act 2020
  compliance statement, encryption standards, data residency
  (NZ/AU Neon region)
- AIM implementation specification: exactly how AlecRae
  calculates provisional tax under the AIM method
- User experience demonstration: screenshots and video
  showing how NZ accountants and their clients use AlecRae
  to file returns and pay provisional tax
- Company information: NZ Ltd Company registration,
  directors, financial standing
- Reference accountants: 3-5 NZ chartered accountants
  who have used the platform and can speak to its quality

**The presentation positioning:**
Lead with how AlecRae helps IRD achieve its goals:
"AlecRae increases AIM adoption by making provisional tax
calculation automatic for every client on the platform.
We remove the barrier to AIM for the 60,000+ NZ businesses
whose accountants are not currently using approved software."

That is IRD's problem. AlecRae solves it. That is why they
should approve us.

**Pre-application checklist NZ IRD:**
- [ ] NZ Ltd Company formed
- [ ] Register interest at ird.govt.nz/digital-service-providers
- [ ] Create developer portal account at gws.ird.govt.nz
- [ ] Review IRD gateway services architecture documentation
- [ ] Review services catalogue for all target integrations
- [ ] Build and test GST filing integration in IRD sandbox
- [ ] Build and test payday filing integration in IRD sandbox
- [ ] Build and test AIM provisional tax calculation
- [ ] Complete IRD product request submission
- [ ] Engage CAANZ for endorsement letter to include
  in application
- [ ] Prepare 3-5 NZ accountant reference contacts

---

### 36.3 Australia — ATO Digital Service Provider

**The programme:**
The Australian Tax Office operates an equivalent programme
called the Digital Service Provider (DSP) programme.
Software providers integrate with the ATO's Standard Business
Reporting (SBR) platform via APIs.
URL: ato.gov.au/businesses-and-organisations/
        doing-business-online/digital-service-providers

**Key ATO integrations to pursue:**

| Service | What it enables | Priority |
|---|---|---|
| Single Touch Payroll (STP) | Real-time payroll reporting | Phase 1 |
| Business Activity Statement (BAS) | GST and PAYG filing | Phase 1 |
| Tax File Number declarations | Employee onboarding | Phase 1 |
| Tax return lodgement | Individual and company returns | Phase 2 |
| Super stream | Superannuation contribution filing | Phase 2 |

**The STP opportunity — Australia's equivalent of AIM:**
Single Touch Payroll (STP) is mandatory for all Australian
employers. Every payroll event must be reported to the ATO
in real time. Software that is not STP-compliant cannot be
used by Australian businesses with employees.

AlecRae Accounting being STP-compliant from day one is
not optional for the Australian market — it is the entry
ticket. But it is also a significant moat: STP integration
is technically complex and many smaller accounting tools
have not built it well.

**ATO Digital Service Provider requirements:**
The ATO evaluates providers on the same dimensions as IRD:
technical compliance, security, reliability, and user experience.
Additional ATO-specific requirements:
- ISO 27001 certification or equivalent (our SOC 2 roadmap
  covers this — mention it in the application)
- Australian Privacy Act 2022 compliance
- SBR (Standard Business Reporting) conformance testing
- ATO sandbox testing completion before production approval

**The ATO application positioning:**
"AlecRae brings STP, BAS, and superannuation compliance
into the same platform where Australian accountants already
manage their legal matters, client communications, and
professional research. No switching between systems.
One platform. Complete compliance."

**Pre-application checklist Australia ATO:**
- [ ] Australian Privacy Act 2022 compliance documented
- [ ] Register at developer.ato.gov.au
- [ ] Complete ATO DSP sandbox environment setup
- [ ] Build and test STP Phase 2 integration
- [ ] Build and test BAS/GST filing integration
- [ ] Complete ATO conformance testing
- [ ] Submit DSP application with security documentation
- [ ] Engage CPA Australia for endorsement letter
- [ ] Engage Law Council of Australia for legal platform credibility

---

### 36.4 UK — HMRC Making Tax Digital

**The programme:**
HMRC's Making Tax Digital (MTD) initiative requires all
VAT-registered businesses to keep digital records and
submit VAT returns through MTD-compatible software.
MTD for Income Tax Self Assessment (MTD ITSA) is being
progressively rolled out from April 2026.

This is the largest mandatory digital tax transformation
in the UK's history. Every UK accountant with business
clients is scrambling for MTD-compliant software.
AlecRae entering the UK market as a certified MTD provider
positions it at the centre of the most significant regulatory
change UK accountants have faced in a decade.

**HMRC MTD software certification:**
Software must be recognised by HMRC as MTD-compatible.
The process involves technical testing against HMRC's API
sandbox and registration on HMRC's approved software list.
Being on that list is discoverable by every UK accountant
searching for MTD software — it is free organic marketing
worth thousands of pounds per month.

**The MTD opportunity statement:**
"AlecRae makes MTD compliance automatic. VAT returns,
income tax submissions, and digital record-keeping are
built into the platform. Your clients are MTD-compliant
the moment they are on AlecRae."

**Pre-application checklist UK HMRC:**
- [ ] UK Ltd Company formed (or UK entity planned)
- [ ] ICO registration completed
- [ ] HMRC developer portal registration
  (developer.service.hmrc.gov.uk)
- [ ] MTD VAT API integration built and tested
- [ ] MTD ITSA API integration planned (Phase 3)
- [ ] HMRC recognised software list application submitted
- [ ] ICAEW and ACCA endorsement letters prepared

---

### 36.5 Canada — CRA My Business Account Integration

**The programme:**
Canada Revenue Agency (CRA) offers API integrations for
approved software providers through the CRA Business
Registration Online and My Business Account systems.

Key integrations:
- T4 payroll slip filing
- GST/HST return filing
- Corporate income tax (T2) filing
- Individual income tax (T1) preparation (with CRA EFILE)

**EFILE — the critical Canadian accreditation:**
EFILE is CRA's electronic tax filing system. Tax preparers
and software providers must be EFILE-certified to file
returns electronically on behalf of clients. This is the
Canadian equivalent of IRD digital service provider status.

EFILE certification is the entry ticket for any accounting
software operating in Canada. Without it, the software
cannot file Canadian tax returns — making it unusable for
Canadian CPAs.

---

### 36.6 The government authority timeline

| Authority | Programme | Target | Status |
|---|---|---|---|
| NZ IRD | Digital Service Provider + AIM | Phase 1 launch | Apply 6 months before NZ launch |
| AU ATO | Digital Service Provider + STP | Phase 1 launch | Apply 6 months before AU launch |
| UK HMRC | Making Tax Digital recognition | Phase 3 launch | Apply 9 months before UK launch |
| CA CRA | EFILE certification | Phase 3 launch | Apply 6 months before CA launch |

**The lead time reality:**
Government authority approvals take time. IRD and ATO
typically take 3-6 months from application to approval.
HMRC's MTD recognition process can take 6-12 months.
Applications must be submitted well before the target
launch date in each market.

This means the IRD and ATO applications need to be
in progress during Phase 1 build — not after launch.

---

### 36.7 What immaculate looks like to a government authority

This section defines exactly what AlecRae must look like
when it presents itself to any government tax authority.

**The platform attributes that impress government evaluators:**

1. **Compliance architecture** — every tax calculation must
   be auditable. Every GST computation, every AIM provisional
   tax figure, every PAYE deduction must trace back to the
   exact rule in the tax code. The Oracle provides the
   research layer. The calculation engine applies it.
   Government evaluators want to see the calculation logic,
   not just the output.

2. **Data security that exceeds requirements** — do not just
   meet the minimum. Present encryption at rest, encryption
   in transit, role-based access control, audit logging,
   and the SOC 2 roadmap. Government evaluators are risk
   managers. Remove every risk they can see.

3. **Uptime and reliability** — Vercel's 99.99% uptime SLA
   is the answer here. Tax filing has deadlines. Software
   that is down on filing day is software the government
   will not approve. Document the SLA explicitly.

4. **Support for professionals** — government authorities
   care that their taxpayers and agents are supported.
   AlecRae's built-in secure messaging, client portal,
   and the professional network within the platform all
   demonstrate that professionals using AlecRae have
   support structures around them.

5. **The professional endorsement** — a letter from CAANZ
   (for IRD/ATO) or ICAEW (for HMRC) saying "we have
   reviewed AlecRae and support its application for digital
   service provider status" is worth more than any technical
   document in the application file. Pursue these
   endorsements before submitting any government application.

6. **New Zealand identity** — IRD responds positively to
   NZ-founded platforms. AlecRae is a NZ Ltd Company,
   founded in Auckland, serving NZ professionals first.
   That story is genuine and it matters to a NZ government
   authority evaluating a domestic versus foreign software
   provider.

**The sentence that wins the room:**
"AlecRae is the only platform that combines tax compliance,
legal practice management, AI research, and professional
communication in a single NZ-built system. Every
accountant on AlecRae is better equipped to serve their
clients and to meet their IRD obligations. We are not
asking IRD to change what they do. We are making it
easier for every NZ accountant to do what IRD asks."

That is not a pitch. That is a partnership offer.
Government authorities respond to partners, not vendors.

---


---

## 36. AlecRae AIM — The Flagship IRD Partnership Product

### 37.1 What AIM is and why it matters

The Accounting Income Method (AIM) is IRD's most progressive
provisional tax initiative. It solves the single biggest
financial pain point for NZ small businesses — the cash flow
shock of large, unpredictable provisional tax bills.

AIM is available to individuals and companies with yearly
turnover under $5 million. Under AIM, businesses only pay
provisional tax when they make a profit — and if the business
makes a loss, they get a refund immediately.

When using AIM through approved accounting software,
provisional tax is calculated and paid with each GST return,
aligning payments with actual income.

This is transformational for small business cash flow.
Instead of being hit with three large provisional tax
instalments calculated on last year's income (which may
bear no resemblance to this year's reality), a business
on AIM pays exactly what they owe, exactly when they owe it,
based on what they actually earned.

The problem: most NZ small businesses are not on AIM because
their accountant's software is not AIM-capable. AlecRae
changes that entirely.

### 37.2 The technical requirements — what IRD needs to see

A software system must meet the definition of an AIM-capable
accounting system in section RC 7B of the Income Tax Act 2007
to gain approval from the Commissioner. Software must be able
to work out all financial accounts and liabilities
retrospectively and produce reports, allowing errors to be
corrected easily. It must incorporate end of year adjustments
throughout the year to more accurately reflect taxable income.

Specifically, AIM-capable software must:

1. Generate comprehensive financial accounts including
   accounting income and expenditure, ledger accounts,
   trial balances, bank account reconciliations and journals
   — all on demand, in accordance with good accounting practice

2. Calculate tax liabilities using tax adjustments per
   IRD's technical determination

3. Recalculate all financial accounts and liabilities
   retrospectively — errors can be corrected in the next
   statement rather than requiring an amended return

4. Electronically communicate with IRD via gateway services
   and provide the right level of help and assistance to users

5. Send a Statement of Activity with each payment showing
   how the AIM profit figure was calculated

The gateway service used for AIM is the return service,
providing capabilities through defined service operations
including Retrieve Status, Retrieve Return, and Retrieve
Filing Obligation.

### 37.3 AlecRae AIM — the product design

AlecRae AIM is not a compliance module hidden in a settings menu.
It is a flagship product that gets its own prominent section
in the AlecRae Accounting dashboard — the first thing an
accountant and their client see when they open the platform.

**The AlecRae AIM dashboard shows at a glance:**

- Current AIM period profit/loss (live, updating as
  transactions are recorded)
- Provisional tax due this period (calculated automatically)
- Next payment date and amount
- Year-to-date provisional tax paid vs estimated liability
- Use-of-money interest exposure (always zero when using AIM correctly)
- Comparison: what they would have paid under standard uplift
  vs what they are paying under AIM (the saving, displayed prominently)

**The AIM calculation engine:**

Every transaction entered into AlecRae Accounting —
whether by bank feed, manual entry, or AlecRae Voice dictation
— instantly updates the AIM profit calculation. The accountant
and their client can see the provisional tax position changing
in real time as the business performs throughout the year.

When a GST return is due, AlecRae automatically:
1. Calculates the AIM profit for the period
2. Applies all required tax adjustments (depreciation,
   deductible expenditure, timing differences)
3. Calculates the provisional tax due
4. Prepares the Statement of Activity for IRD submission
5. Files via IRD gateway with one click
6. Confirms receipt and updates the client's IRD account

The accountant reviews, approves, and submits.
The entire process takes minutes, not hours.

**The loss refund feature — immediately visible:**

AIM payments are based on a year-to-date calculation.
If a business makes a loss, they can get a refund straightaway
and will not need to wait until the end of the year.

When AlecRae AIM detects a loss period, it automatically:
- Notifies the accountant with a clear dashboard alert
- Calculates the refund amount
- Prepares the Statement of Activity claiming the refund
- Files with IRD for immediate processing

A business that had a bad quarter gets their money back
within days, not months. That is a cash flow benefit that
makes AIM genuinely life-changing for small businesses —
and AlecRae is the platform that makes it effortless.

### 37.4 AlecRae Voice inside AIM

AlecRae Voice integrates directly into the AIM workflow.
An accountant reviewing a client's AIM position can dictate:

"Add a depreciation adjustment for the new vehicle,
cost forty-two thousand dollars, effective from
first of February, using IRD diminishing value rates"

AlecRae processes the voice instruction, calculates the
depreciation using the correct IRD rates, applies it to the
AIM profit calculation, and updates the provisional tax
figure immediately. The accountant confirms with one tap.

This is the moment an IRD evaluator realises AlecRae
is not just another accounting platform.

### 37.5 The AIM client portal experience

Every AlecRae client whose accountant uses AIM gets
a dedicated AIM view in their client portal. In plain English:

- "Your provisional tax this period: $2,340"
- "Based on your actual profit of $18,700 for the period"
- "Payment due: 28 April"
- "Under the old standard method you would have paid $4,100.
   AlecRae AIM is saving you $1,760 this period."
- "Your business had no exposure to use-of-money interest."

No financial jargon. No confusion. Just clear numbers,
clear dates, and a clear demonstration of the value
their accountant is delivering through AlecRae.

This client portal view is what accountants show prospective
clients to demonstrate why they use AlecRae. It is a
marketing tool for every accountant on the platform.

### 37.6 The AIM tax adjustment library

Software must incorporate end of year adjustments throughout
the year to more accurately reflect taxable income.
IRD determinations set out the minimum adjustments required.

AlecRae AIM includes a complete library of every required
and optional tax adjustment, maintained in real time as
IRD updates its determinations:

**Mandatory AIM adjustments (always applied):**
- Depreciation (using current IRD depreciation rates)
- Trading stock adjustments
- Debtors and bad debt provisions
- Prepayments and accruals
- Private use adjustments

**Optional adjustments (accountant-controlled):**
- Research and development expenditure
- Film production expenditure
- Environmental expenditure
- Specified lease payments
- Employee share scheme deductions

The Oracle — Accounting is available inside every
adjustment entry. An accountant unsure whether a specific
expenditure qualifies for a particular AIM adjustment
can query the Oracle directly from the adjustment form
and get a verified answer in seconds.

This combination — AIM compliance automation plus Oracle
research intelligence — is something no current AIM
provider offers. It makes AlecRae AIM the most
sophisticated AIM implementation in the NZ market.

### 37.7 Multi-client AIM management — the accountant view

An accountant with 50 clients on AIM does not manage
them one at a time. AlecRae provides an AIM command centre
— a single dashboard view showing every client's AIM status:

| Client | Period profit | Tax due | Due date | Status |
|---|---|---|---|---|
| Smith Plumbing Ltd | $34,200 | $8,292 | 28 Apr | Ready to file |
| Johnson Consulting | $12,100 | $2,930 | 28 Apr | Needs review |
| Williams Retail Ltd | -$4,500 | Refund $1,089 | 28 Apr | Refund queued |
| Chen Architecture | $67,800 | $16,421 | 28 Apr | Filed ✓ |

One screen. Every client. Every AIM obligation visible.
Bulk filing capability — approve and file multiple clients
in a single session. Deadline alerts sent via AlecRae Voice
to the accountant's phone if any client's AIM filing
is approaching and has not been submitted.

This is what an IRD evaluator needs to see. Not a feature
in a menu. A purpose-built professional workflow that
treats AIM as the serious compliance obligation it is —
and makes fulfilling it the easiest part of an accountant's day.

### 37.8 How AlecRae presents AIM to IRD

When AlecRae applies for AIM-capable software approval,
the presentation to the Commissioner includes:

**The commitment statement:**
"AlecRae has built AIM as the centrepiece of our
accounting platform — not as a compliance checkbox.
We believe AIM represents the most equitable provisional
tax system available to NZ small businesses and we have
invested significant resources in making it the best
possible experience for both accountants and their clients.
We are not seeking approval to say we support AIM.
We are seeking approval because AIM is our flagship
product and we want to help IRD make it the default
choice for every eligible NZ business."

**The technical submission package:**
- Complete Section RC 7B compliance documentation
- IRD determination compliance mapping
- Gateway services integration architecture
- Statement of Activity generation specification
- Retrospective recalculation methodology
- Tax adjustment library with determination references
- Security and data handling documentation
- Uptime and reliability commitments
- Sandbox testing results

**The market impact statement:**
"There are approximately 600,000 NZ businesses eligible
for AIM based on the $5 million turnover threshold.
Current AIM adoption is a fraction of that eligible pool.
AlecRae's goal is to make AIM the default choice for every
eligible business whose accountant uses our platform.
We estimate AlecRae could bring an additional 10,000-50,000
NZ businesses onto AIM within three years of launch."

That is a number IRD cares about. That is a policy
outcome they have been trying to achieve since 2018.
AlecRae delivers it.

### 37.9 The AIM section on alecrae.com

AlecRae.com has a dedicated AIM page at alecrae.com/aim
that is designed to be as impressive to IRD as it is
to NZ accountants and small businesses.

The page opens with:

**"AlecRae AIM — provisional tax the way it should work."**

"New Zealand's most advanced implementation of the
Accounting Income Method. Built in partnership with
IRD's digital vision. Your clients pay exactly what they
owe. Never a dollar more. Never a surprise."

The page demonstrates:
- Live AIM dashboard preview
- The cash flow saving calculator (enter your turnover,
  see what you save vs standard uplift)
- The loss refund flow — how quickly clients get money back
- The multi-client management view
- A statement from CAANZ or a respected NZ CA on the value
  of AlecRae's AIM implementation
- A link to ird.govt.nz confirming AlecRae's approved status

This page does two things simultaneously. It converts
NZ accountants who are not yet using AIM. And it shows
IRD that AlecRae is the partner they have been looking for.

---


---

## 37. Onboarding — The First 10 Minutes That Define Everything

### 38.1 The competitive onboarding landscape — what not to do

Every major competitor has the same onboarding failure:
they onboard professionals into the software's architecture
rather than into the professional's workflow.

Clio requires significant setup time, multiple integrations
at extra cost, and real users report never getting proper
onboarding before cancelling. QuickBooks has UI usability
quirks, frustrating bugs, and prices that keep rising.
Xero has syncing errors, slow fixes, and support that
some users describe as non-existent when things go wrong.

The single most common reason professionals abandon
practice management and accounting software is not
missing features — it is that the onboarding experience
was so painful they never got far enough to discover
the features they needed.

AlecRae's onboarding is the complete opposite of
everything described above. It is designed around
one principle: the professional must feel the value
of AlecRae within the first 10 minutes.

### 38.2 The 10-minute value principle

**The rule:**
A professional who does not experience a genuine
"this is incredible" moment within their first 10 minutes
on the platform will not return. Every onboarding decision
is measured against this rule.

**What creates the moment for each professional type:**

For an attorney:
The moment AlecRae Voice dictates their first message
in perfect legal language — "notwithstanding," "hereinafter,"
all of it preserved exactly — without a single correction.
That 30-second experience is worth more than any feature
tour or explainer video. They have never had a tool
that understood their language. AlecRae does. Immediately.

For an accountant:
The moment the bank feed connects and six months of
transactions appear, categorised, reconciled, and ready
for review — in under two minutes. No manual entry.
No import file. It just appears. That is the moment
an accountant realises AlecRae replaced the most
tedious part of their week before they finished signing up.

For a small business owner:
The moment the AIM dashboard shows them exactly how much
provisional tax they owe right now based on what they
actually earned — and shows them how much less that is
compared to what they would have paid under standard uplift.
The savings number is the moment. Real money. Visible immediately.

### 38.3 The AlecRae onboarding flow — step by step

**Step 1 — The welcome screen (60 seconds)**
One question. No paragraph of text. No product tour.
Just this:

"Welcome to AlecRae. What brings you here today?"

Three options:
→ I am a lawyer or law firm
→ I am an accountant or CPA
→ I am a small business looking for professional help

That single choice routes them into a completely
personalised experience. A lawyer never sees accounting
setup screens. An accountant never sees trust accounting
disclaimers before they have entered a single client.

**Step 2 — The hook feature first (2 minutes)**
Before asking for firm details, billing information,
or any setup — AlecRae demonstrates the single most
impressive feature for that professional type.

For lawyers: AlecRae Voice demo
A text field appears with a microphone button.
"Try dictating something. Anything."
They speak. It appears. Perfectly formatted.
Legal vocabulary intact.
Below the result: "AlecRae Voice is available
everywhere you type on this platform."
One button: "Continue setting up →"

For accountants: Bank feed connection
"Connect your bank to see AlecRae in action."
OAuth connection to their bank. Takes 90 seconds.
Transactions appear. Categories suggested by AI.
Below the result: "This is what every month looks like
on AlecRae — without the manual work."
One button: "Continue setting up →"

**Step 3 — The essential setup (5 minutes)**
Only the absolutely essential information:
- Firm or practice name
- Location (country — routes to correct tax/legal jurisdiction)
- Number of professionals (determines tier recommendation)
- One email address to invite a colleague (optional but encouraged)

Nothing else. No custom fields. No chart of accounts.
No billing setup yet. No integrations menu.
Those come later. Right now the goal is getting the
professional inside the platform as fast as possible.

**Step 4 — The guided first action (2 minutes)**
Based on what they chose in Step 1, AlecRae suggests
exactly one first action tailored to their role:

For lawyers:
"Create your first matter. It takes 30 seconds."
→ Opens a pre-filled matter form with example data
→ They replace the example with a real client name
→ Matter created. Dashboard shows it live.
→ "Your first matter is live. Add a document, log time, or message a client."

For accountants:
"Add your first client. We'll set up their AIM profile."
→ One-screen client creation
→ AIM eligibility check runs automatically
→ If eligible: "Great news — [Client] is AIM-eligible.
   We'll calculate provisional tax automatically
   with every GST return."
→ "Your first client is set up. Connect their bank feed."

**Step 5 — The welcome message (automated, personal)**
Within 5 minutes of completing setup, the professional
receives an email from hello@alecrae.com that:
- Addresses them by name
- References exactly what they just set up
  (their first matter name, or their first client name)
- Contains exactly three links: their dashboard,
  a 3-minute video of the one feature most relevant
  to their role, and a direct calendar link to book
  a 15-minute onboarding call if they want one
- Is signed by a real person's name — not "The AlecRae Team"

No overwhelming feature list. No 47-item checklist.
No "getting started guide" PDF. Three links. Done.

### 38.4 Data migration — the moment that removes the last barrier

The single biggest reason professionals do not switch
from Clio, QuickBooks, or Xero is not that they prefer
those tools. It is that their data lives there and
moving it feels impossible.

AlecRae removes this barrier completely.

**What AlecRae imports:**
- From Clio: matters, clients, time entries, invoices,
  documents (via Clio's API or CSV export)
- From QuickBooks: chart of accounts, transactions,
  clients, invoices, tax history (via QBO API)
- From Xero: same as QuickBooks (via Xero API)
- From Excel/CSV: any structured data the professional
  can export from their current system

**How the import works:**
One screen. Upload or connect. AlecRae maps the fields
automatically using AI — it recognises client names,
matter numbers, transaction types, and date formats
without the professional having to define mappings.
They review, confirm, and import. Done.

The import is built before the platform launches publicly.
It is not a Phase 2 feature. It is a precondition for
any meaningful professional adoption because professionals
will not start from zero. They will only switch if their
history comes with them.

**The migration promise:**
"Your history is yours. AlecRae imports everything from
Clio, QuickBooks, or Xero. Your matters, clients,
transactions, and documents arrive intact before you
close your old account."

### 38.5 The onboarding support model

**No waiting. No tickets. No hold music.**

AlecRae's onboarding support is built around the
understanding that professionals have zero tolerance
for being stuck. Every minute they are stuck on
a setup problem is a minute they are questioning
whether the switch was worth it.

**The support stack:**

In-platform chat: Available from the moment of signup.
Not a bot. A real AlecRae team member during business
hours in NZ, AU, and US time zones. Outside those hours
an AI assistant handles tier-one questions with human
escalation for anything complex.

The Oracle as onboarding assistant: During the first
30 days, the Oracle is tuned to answer questions about
AlecRae itself — "how do I set up a trust account,"
"where do I find the AIM dashboard," "how do I add a
court deadline" — in addition to legal and accounting
research queries. The platform teaches itself.

Video library: Every feature has a 90-second video
accessible from a small play button next to the feature.
Not a 20-minute webinar. Not a help article requiring
reading. A 90-second video showing exactly what to do.

The onboarding call: Every professional who signs up
gets one free 15-minute onboarding call with an
AlecRae specialist. Not a sales call. A setup call.
The specialist's only goal is ensuring the professional
completes their first real task on the platform.

### 38.6 The 30-day success metric

AlecRae measures onboarding success by one metric only:
did the professional complete a meaningful action in
their first 30 days?

For lawyers: meaningful action = first matter created,
first document uploaded, first time entry logged, or
first Oracle query run.

For accountants: meaningful action = first client
added, first bank feed connected, first AIM filing
prepared, or first invoice sent.

A professional who completes any meaningful action
in 30 days has a 90%+ retention rate at 12 months.
A professional who does not has a 90%+ churn rate.

Every piece of onboarding is designed to get the
professional to that first meaningful action as fast
as possible. Nothing else matters in month one.

### 38.7 What this looks like compared to competitors

| Dimension | Clio | Xero/QuickBooks | AlecRae |
|---|---|---|---|
| Time to first value | Days to weeks | Hours to days | Under 10 minutes |
| Setup complexity | High — multiple integrations required | Medium — bank setup complex | Low — one question, then value |
| Data migration | Manual or paid service | CSV import, field mapping required | AI-powered automatic mapping |
| Support quality | Variable — some users report no onboarding | Email/chat only, variable quality | Real-time chat + free onboarding call |
| First feature shown | Feature tour of everything | Dashboard overview | Single most impressive feature for their role |
| Voice input | None | None | Built in from first screen |
| Role-specific flow | Generic for all users | Generic for all users | Completely personalised by professional type |
| Pricing transparency | Multiple tiers + add-on costs confuse users | Multiple tiers + add-on costs | All-inclusive per role, no surprise add-ons |

### 38.8 The onboarding promise — public and prominent

On the AlecRae pricing and signup pages:

**"Ten minutes to your first AlecRae moment.
No setup fees. No integration costs. No data held hostage.
If you are not genuinely impressed in your first session,
we will personally help you get there or refund your
first month. No questions asked."**

That promise costs almost nothing to honour if the
onboarding is built correctly. And it eliminates the
single biggest psychological barrier to switching —
the fear that the new platform will be as painful to
set up as the last one was.

---


---

## 38. The Oracle as Support — No Separate Support System

### 39.1 The insight that changes everything

The Oracle is Claude. Claude is the Oracle.
The support agent is the Oracle.
There is no separate system.

This is not a feature decision. It is an architectural
philosophy that eliminates the single most frustrating
experience in professional software — the support loop.

The support loop that every competitor inflicts:
1. Professional has a problem
2. Opens a chat window with a bot
3. Bot asks generic questions, provides generic answers
4. Professional asks to speak to a human
5. Human asks them to re-verify their account
6. Professional repeats everything they already said to the bot
7. Human has no context from the bot conversation
8. Professional is furious before the problem is even solved

AlecRae has none of this. Because there is no bot.
There is no separate support system. There is the Oracle —
which already knows everything about the professional,
their account, their matters, and their question —
and a human who sees the full Oracle conversation
if escalation is genuinely needed.

### 39.2 How Oracle support works

**The trigger:**
From anywhere in the platform, the professional says
or types their question. AlecRae Voice is the fastest
path — speak the question, get the answer, keep working.
No support window to open. No form to fill in.
No category to select. Just ask.

**What the Oracle knows when answering a support question:**
- The professional's full account status and tier
- Every matter currently active in their account
- Their billing history and current invoice status
- Their AIM position and last filing date
- Their trust account balance and recent transactions
- Their recent activity in the platform
- Their subscription tier and which features they have access to
- The exact screen they were on when they asked

This context transforms every support interaction.
Instead of "how do I view my trust account balance"
getting a generic answer about where to find trust accounts,
the Oracle says: "Your trust account balance is currently
$3,200. It is under Billing → Trust Accounts in your
left sidebar. Your last deposit was $1,500 on March 14."

That is not support. That is a colleague.

**The Oracle support system prompt:**
When the Oracle is operating in support mode it has
an additional layer of context: the full AlecRae
platform documentation, every feature, every workflow,
every known issue, and the professional's account data.
It answers questions about how to use the platform
with the same precision it answers questions about
California adverse possession law.

### 39.3 AlecRae Voice as the support interface

The most powerful support interaction on AlecRae
requires no typing at all.

A lawyer is in the middle of drafting a motion.
They say: "How do I add a filing deadline to this matter
that automatically calculates the response deadline?"

The Oracle responds — by voice if they prefer,
or in the sidebar if they are mid-document:
"I can add that now. The motion you are drafting
is tagged to the Rodriguez matter. Should I add
a filing deadline of today with the automatic
28-day response calculation? Say yes to confirm."

"Yes."

Done. The deadline is added. The calendar is updated.
The downstream deadlines are calculated. The professional
never stopped working.

This is the support experience that makes competitors
irrelevant. Not because AlecRae answered the question —
because AlecRae took the action.

### 39.4 When a human is needed — zero friction escalation

Sometimes the Oracle cannot resolve something.
A billing dispute. A data issue. A complex migration problem.
A professional who wants to talk to a person.

When escalation happens:
- The human support specialist sees the full Oracle
  conversation — every question asked, every answer given
- They see the professional's account in full context
- They know exactly what was tried and what failed
- The professional does not repeat a single word

The human greeting is:
"Hi [Name], I can see you were asking about [specific issue]
and the Oracle suggested [X]. I am looking at your account
now — can you confirm this is about the [matter name]
or is it a different matter?"

One confirmation. The human is already oriented.
The professional feels heard from the first sentence.
This is the opposite of every support experience they
have ever had with any software product.

### 39.5 Account verification — solved permanently

The credential re-verification loop that every professional
has experienced with other platforms is eliminated entirely
by design.

The Oracle knows who the professional is because they
are already authenticated and logged into AlecRae.
There is no verification step for support questions
because the Oracle is already inside their authenticated
session. It knows their account. It knows their data.
It does not need to ask them to prove who they are.

If a human support specialist takes over, they see
the authenticated session data directly. They do not
ask for an account number, email address, or password.
The professional's identity is already established.

The only exception is account security actions —
password reset, two-factor authentication changes,
billing method updates. These require explicit
re-authentication, but this is communicated clearly:
"For security, I will send a verification code to
your registered email for this change."
One step. Clear reason. No repetition.

### 39.6 The support quality promise

**On the platform, prominently:**

"AlecRae support is powered by The Oracle —
the same AI that answers your legal and accounting
research questions. It knows your account, your matters,
and your question before you finish asking it.
No bots. No tickets. No hold music.
If you need a human, you get one — and they already
know exactly what you need."

### 39.7 The 95% Oracle resolution target

**This is a formal product and business target, not a hope.**

95% of all AlecRae support queries are resolved by
the Oracle without human involvement. This is achievable
because of how AlecRae is designed — not because the
Oracle is unusually powerful, but because the combination
of full account context, platform knowledge, AlecRae Voice
as the zero-friction input method, and a product built
to be genuinely faultless means the vast majority of
questions have clear, immediate, accurate answers.

The 5% that reaches a human is the genuinely valuable 5%:
- Complex data migration issues
- Billing disputes requiring financial judgment
- Edge cases in trust accounting or AIM calculations
- Professionals going through an unusual situation
  that benefits from a specialist's eye
- Anything the Oracle flags as beyond its confidence level

The human specialists who handle that 5% are not a
cost centre. They are a quality signal. A small team
of deeply knowledgeable professionals who only handle
meaningful complexity, who always have full context,
and who never waste a second on questions the Oracle
already answered. That team stays small as AlecRae
scales to tens of thousands of professionals.

Higher Oracle query volume is a sign of health, not burden.
When finding an answer is instant and frictionless,
professionals ask small questions immediately rather
than letting confusion build into frustration.
Engaged professionals ask more questions and stay longer.
The Oracle answering 10,000 queries a day costs the
same as answering 100. That is the economics of AI
support done correctly.

### 39.8 What this means for support cost

The Oracle handling 80-90% of support queries is not
just a better experience — it is a better business.

Every professional platform's largest operational cost
after engineering is customer support. Clio has hundreds
of support staff. QuickBooks has thousands. Xero has
extensive support teams across multiple countries.

AlecRae's support cost structure is fundamentally
different. The Oracle handles the vast majority of
queries automatically, with full context, instantly,
at any hour, in any language. Human support specialists
handle the genuinely complex escalations — meaning
they spend their time on problems that actually need
human judgment, not resetting passwords or explaining
where to find the billing tab.

This creates a support operation that is simultaneously
better than every competitor and dramatically cheaper
to run. That cost advantage compounds as scale increases.
Every new professional who joins the platform adds
queries that the Oracle handles without adding
proportional support headcount.

### 39.8 Multi-language Oracle support

AlecRae Voice supports nine languages at launch.
Oracle support operates in every one of them.

A Spanish-speaking immigration attorney in Miami
asks their support question in Spanish.
The Oracle answers in Spanish — with perfect understanding
of the legal terminology they used, because AlecRae Voice's
professional language intelligence works in Spanish too.

No competitor offers multi-language professional
support with this level of contextual intelligence.
This is a day-one capability that opens markets that
every other legal and accounting platform effectively
ignores.

---

## 39. The Category Monopoly Plays — Making AlecRae Untouchable

These are the seven strategic plays that elevate AlecRae from a great
platform into a genuine category monopoly. They are executed in sequence
as the platform matures. Each one independently makes AlecRae stronger.
Together they create a platform so embedded in the legal and accounting
profession that displacement becomes practically impossible.

---

### 25.1 The Data Flywheel — the moat that compounds forever

Every research query an attorney runs, every document they draft, every
matter outcome they record — this is proprietary behavioural data that
no competitor can access without your user base.

Westlaw has 50 years of attorney behaviour data. You start building yours
from day one. In five years, The Oracle answers questions Westlaw cannot
answer — because those patterns lived exclusively inside AlecRae's walls.

**How to build it:**
- Onboarding consent must explicitly cover anonymised usage data being
  used to improve AI models
- Every query, document action, and matter resolution tagged and stored
  with full anonymisation
- Quarterly model improvement cycles — The Oracle gets measurably smarter
  every 90 days
- This data asset lives in the IP holding entity, not the operating company

**The rule:** Every feature that generates data is worth more than its
face value. Design every feature with the data it produces in mind.

---

### 25.2 The Law School Pipeline — Westlaw's oldest trick, made better

Westlaw and LexisNexis give free access to every law student in America.
Those students graduate, join firms, and push for the tool they already know.
AlecRae does the same — but with a genuinely better product.

**The programme:**
- Free AlecRae Law accounts for all enrolled law students
- Curriculum integration — professors assign AlecRae research tasks
- Student-to-attorney upgrade path — one click upon bar admission
- Sponsored moot court competitions at target law schools
- Target high-volume schools that produce solo and small firm practitioners:
  Georgetown, NYU, Fordham, Loyola, Hastings, DePaul, Suffolk

**Why it beats Westlaw:**
Westlaw gives students a stripped-down version. AlecRae gives the full
platform. By graduation, students have built workflows around it.
The switching cost is established before they earn their first dollar.

---

### 25.3 CLE Accreditation — professionally mandated engagement

Every US attorney must complete Continuing Legal Education credits
annually to maintain their licence. AlecRae becomes an accredited
CLE provider. Courses delivered through the platform:
- AI ethics and professional responsibility (ABA-required in most states)
- Technology competence
- Immigration law updates (feeds AlecRae Immigration module)
- Tax law changes (feeds AlecRae Accounting cross-referral)
- Trust accounting compliance (demonstrates the module live)

**Why this is a monopoly move:**
Attorneys have a professional obligation to complete CLE.
If that content lives in AlecRae, they have a legally mandated reason
to open the platform regularly. That is not marketing. That is law.

**Accreditation sequence:** California → New York → Texas first.
Once approved in those three, remaining states follow progressively.

---

### 25.4 Regulatory Change Monitoring — real-time matter impact alerts

When a statute changes, a new IRS ruling drops, or a landmark decision
lands — AlecRae automatically cross-references it against every active
matter in the system and alerts the attorney with an AI-generated
impact analysis. No attorney goes looking for it. It comes to them.

Example alert:
> "3 of your active matters may be affected by last Thursday's 9th Circuit
> ruling in Garcia v. DHS. The Rodriguez immigration matter is directly
> impacted. Here is the analysis. Here is what you should do next."

**Why this creates infinite switching cost:**
Once a firm relies on AlecRae to surface regulatory changes mapped to
their matters, they cannot leave without accepting that they might miss
something. The professional liability risk of leaving is greater than
the cost of staying. That is the definition of a product you cannot cancel.

---

### 25.5 The Consumer Side — client portal to marketplace

**Phase A — Client portal (launches with platform)**
Clients track their matter, sign documents, make payments, and message
their attorney through a secure portal. Attorneys love it because it
eliminates "where is my case?" phone calls. Included in attorney subscription.

**Phase B — Client marketplace (Phase 3 only)**
Clients without an attorney can find one through AlecRae, matched by
practice area, jurisdiction, and matter type. Revenue clip on first
engagement fee or monthly directory listing for attorneys.

This is the Avvo and LegalZoom market — with professional platform
credibility that consumer directories will never have.

---

### 25.6 International Common Law Expansion — four jurisdictions, one Oracle

Australia, United Kingdom, Canada, and New Zealand share common law
traditions descended from the same English legal system. The Oracle
can cover all four with jurisdiction-specific data layers on top of
the same architecture.

**Why this matters for exit:**
A platform covering US + UK + Australia + Canada + NZ is not a US
legal tech company. It is a global common law intelligence platform.
That repositioning multiplies acquisition valuation significantly.

**Expansion sequence:** NZ (home market, template) → Australia →
United Kingdom → Canada

What changes per jurisdiction: data sources, bar rules, trust accounting
equivalents, currency handling.
What does NOT change: The Oracle engine, practice management, dictation,
accounting wing.

---

### 25.7 The API Economy — become the infrastructure layer

The Oracle opens as a public API. Other legal tech products, court systems,
law school tools, and enterprise platforms pay per query to access
AlecRae's legal and accounting intelligence.

Building what The Oracle does from scratch costs $50–100M and 10 years.
Plugging into the API costs $499/month. Competitors will plug in.
That makes AlecRae infrastructure — and you cannot compete with
infrastructure. You can only plug into it or be left behind.

**Timing:** Phase 3 only — after query volume proves the intelligence
value. Do not open the API before The Oracle is demonstrably smarter
than what a developer could build independently.

---

### 25.8 The full monopoly picture

When all seven plays are active:

| Play | What it locks in |
|---|---|
| Data flywheel | The Oracle gets smarter than any competitor can replicate |
| Law school pipeline | Every new attorney already knows AlecRae |
| CLE accreditation | Attorneys are professionally obligated to engage |
| Regulatory monitoring | Leaving creates professional liability risk |
| Client marketplace | AlecRae owns both sides of the legal transaction |
| International expansion | The only common law platform with global coverage |
| API economy | Competitors are built on top of AlecRae |

At that point AlecRae is not competing with Westlaw, Clio, or LexisNexis.
It is the layer those platforms wish they had built first.


## 40. Revision History

| Version | Date | Changes |
|---|---|---|
| 1.0 | March 2026 | Initial blueprint created |
| 1.1 | March 2026 | Removed Xero — AlecRae Accounting used internally |
| 1.2 | March 2026 | Added Astra rename requirement |
| 1.3 | March 2026 | Added dictation domain strategy — lives inside AlecRae |
| 1.4 | March 2026 | Added user dependency moat, marketing strategy, tech stack, competitive intelligence, crisis protocols |
| 1.5 | March 2026 | Added AI hallucination protocol, security certification roadmap, linear launch sequence |
| 1.6 | March 2026 | Added seven category monopoly plays |
| 1.7 | March 2026 | Expanded product suites — e-signature, spreadsheets, document editor, legal forms library, bank feeds, expense scanning, AI dictation grammar spec |
| 1.8 | March 2026 | alecrae.com PURCHASED |
| 1.9 | March 2026 | alecrae.accountant PURCHASED |
| 2.0 | March 2026 | Final pre-build version. alecrae-com GitHub repo created. .law replaced with .legal |
| 2.1 | March 2026 | Clarified CLAUDE.md is a document only. Remaining repos documented |
| 2.2 | March 2026 | Platform integration architecture locked — ONE application on alecrae.com |
| 2.3 | March 2026 | Five-audience strategy and SEO keyword territory architecture added |
| 2.4 | March 2026 | Collaboration architecture — instant messaging, meetings, cross-professional bridge, client portal hooks |
| 2.5 | March 2026 | Time/money value proposition and trademark/IP protection strategy added |
| 2.6 | March 2026 | UX Philosophy — Oracle draw-down, two-click navigation, command palette, dashboard design |
| 2.7 | March 2026 | Technology Architecture — React components only, two-layer system, intellectual crawlers. Email Platform added |
| 2.8 | March 2026 | AlecRae Voice as Universal Input Layer. Product name locked. Tagline: "Speak. It is done." |
| 2.9 | March 2026 | Geographic Markets — NZ+AU Phase 1, US Phase 2, UK+Canada Phase 3, Pacific Phase 4, SE Asia Phase 5 |
| 3.0 | March 2026 | Market strategy decided — all markets, no exceptions |
| 3.1 | March 2026 | Country-by-country legal compliance guide — all 8 markets |
| 3.2 | March 2026 | Verom.ai migration plan — AlecRae Immigration module |
| 3.3 | March 2026 | Database changed — Neon replaces Supabase. Prisma ORM added |
| 3.4 | March 2026 | AlecRae Voice competitive landscape, multi-language, platform integration voice commands |
| 3.5 | March 2026 | AlecRae App (Tauri v2), Advanced Technology Stack, alecrae.app purchased |
| 3.6 | March 2026 | alecrae.ai purchased. Domain register updated |
| 3.7 | March 2026 | Government Authority Strategy — IRD, ATO, HMRC, CRA |
| 3.8 | March 2026 | AlecRae AIM flagship product — IRD partnership centrepiece |
| 3.9 | March 2026 | Onboarding — 10-minute value principle, competitive analysis, AI data migration, 30-day success metric |
| 4.0 | March 2026 | Oracle as Support — 95% resolution target, no separate bot, full account context, zero re-verification |
| 4.1 | March 2026 | CLEAN REBUILD — all 40 sections correctly ordered and numbered. Document is now the definitive version. |

---

*This document is confidential and proprietary to AlecRae and its founder.*
*It is not to be shared publicly or with any competitor.*
*Commit this file to the root of every AlecRae GitHub repository.*
