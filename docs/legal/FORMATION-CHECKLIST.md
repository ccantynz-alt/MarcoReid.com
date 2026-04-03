# AlecRae — Master Entity Formation & IP Protection Checklist

**Owner:** Craig Cantyn (Auckland, New Zealand)
**Date created:** 3 April 2026
**Status:** PRE-FORMATION — All entities pending

---

## FORMATION ORDER — DO NOT SKIP STEPS

Everything must be done in this exact sequence. Each step depends on the
previous step being completed.

---

## STEP 1 — AlecRae IP Holdings Ltd (New Zealand)

**FORM THIS FIRST. Before any other entity.**

This is the entity that owns everything — all code, all trademarks, all
patents, all brand assets, all domains. It never faces a customer. It never
signs a service contract. It exists solely to hold and licence intellectual
property.

### Filing Details

| Item | Detail |
|---|---|
| Entity type | New Zealand Limited Company |
| Filing portal | https://companies-office.govt.nz/ |
| Online incorporation | https://www.companiesoffice.govt.nz/companies/learn-about/starting-a-company/how-to-incorporate-a-company/ |
| Filing fee | ~$10-20 NZD (online) |
| Time to incorporate | Same day (online) |
| Director | Craig Cantyn |
| Shareholder | Craig Cantyn (100%) |
| Registered office | Your Auckland address (or a registered office service) |
| Address for service | Same as registered office |
| Company name | AlecRae IP Holdings Limited |
| Constitution | Custom constitution (see /docs/legal/nz-constitution-holdings.md) |
| NZBN | Assigned automatically on incorporation |

### Immediately After Formation

- [ ] Obtain Certificate of Incorporation
- [ ] Record company number
- [ ] Open a NZ bank account for Holdings (BNZ or ANZ business account)
- [ ] Execute the **IP Assignment Agreement** (Craig Cantyn → AlecRae IP Holdings Ltd)
  - This transfers ALL existing IP from you personally to the company
  - Code, designs, brand concepts, domain rights, everything
  - See /docs/legal/ip-assignment-agreement.md
- [ ] Transfer domain registrations to Holdings (alecrae.com, alecrae.accountant)
- [ ] File trademark applications under this entity (see Step 6)
- [ ] File provisional patent applications under this entity (see Step 7)
- [ ] Set up Xero or AlecRae Accounting for bookkeeping (minimal — mostly IP licence income)
- [ ] Register for IRD (Inland Revenue) — income tax
- [ ] Do NOT register for GST unless turnover exceeds $60,000/year (unlikely for a holding entity)

### Annual Obligations

- Annual return filing (Companies Office) — ~$50 NZD
- Financial statements (may be exempt if qualifies as small company)
- Income tax return (IRD)
- Maintain company records (minutes, resolutions, share register)

---

## STEP 2 — AlecRae Ltd (New Zealand Operating Company)

**Form after Holdings is established and IP Assignment is executed.**

This is the operating company for New Zealand, Pacific Islands, and
initial Australian operations.

### Filing Details

| Item | Detail |
|---|---|
| Entity type | New Zealand Limited Company |
| Filing portal | https://companies-office.govt.nz/ |
| Filing fee | ~$10-20 NZD (online) |
| Time to incorporate | Same day (online) |
| Director | Craig Cantyn |
| Shareholder | Craig Cantyn (100%) — or AlecRae IP Holdings Ltd (100%) for full separation |
| Registered office | Your Auckland address |
| Company name | AlecRae Limited |
| Constitution | Custom constitution (see /docs/legal/nz-constitution-operating.md) |

### Immediately After Formation

- [ ] Obtain Certificate of Incorporation
- [ ] Record company number
- [ ] Open a NZ bank account (BNZ or ANZ business — separate from Holdings)
- [ ] Open a Wise Business account (for holding USD revenue)
- [ ] Register for GST (mandatory once revenue exceeds $60,000/year; register early for zero-rated export benefit)
- [ ] Register as employer with IRD (if hiring staff)
- [ ] Execute **IP Licence Agreement** (AlecRae IP Holdings Ltd → AlecRae Ltd NZ)
  - See /docs/legal/ip-licence-agreement.md
  - Sets the royalty rate for IP usage
  - Must be at arm's length (transfer pricing compliance)
- [ ] Set up Stripe account under this entity (NZ operations)
- [ ] Configure AlecRae Accounting for internal bookkeeping
- [ ] Set up all NZ/AU/Pacific customer contracts under this entity

### Annual Obligations

- Annual return filing (Companies Office) — ~$50 NZD
- Financial statements
- GST returns (monthly, 2-monthly, or 6-monthly depending on revenue)
- Income tax return
- PAYE filing (if staff)
- IP licence royalty payments to Holdings

---

## STEP 3 — AlecRae Inc (Delaware C-Corp, USA)

**Form after NZ entities are established.**

This is the operating company for the United States and Canada. Required
for US institutional contracts, US payment processing, and eventual
US investment or acquisition.

### Formation Options (Choose One)

**Option A — Stripe Atlas ($500 USD)**
| Item | Detail |
|---|---|
| Portal | https://stripe.com/atlas |
| What you get | Delaware C-Corp, EIN, Stripe account, Mercury bank account, stock issuance, legal docs |
| Time | ~1-2 weeks |
| Recommended for | Speed and simplicity. Best option for a solo founder. |

**Option B — Firstbase.io ($399-599 USD)**
| Item | Detail |
|---|---|
| Portal | https://firstbase.io |
| What you get | Delaware C-Corp, EIN, registered agent (1 year), operating agreement |
| Time | ~1-3 weeks |

**Option C — Direct Filing + Registered Agent**
| Item | Detail |
|---|---|
| Filing portal | https://corp.delaware.gov/ (Division of Corporations) |
| Filing fee | ~$90 USD (Certificate of Incorporation) + registered agent (~$50-300/year) |
| Registered agents | Harvard Business Services, Cogency Global, Northwest Registered Agent |
| EIN application | https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online |
| Time | Filing: 1-2 days; EIN: immediate (online) or 4 weeks (international, Form SS-4 by fax) |

### Filing Details (All Options)

| Item | Detail |
|---|---|
| Entity type | Delaware C-Corporation |
| State | Delaware (Court of Chancery, investor-friendly) |
| Company name | AlecRae Inc |
| Incorporator | Craig Cantyn |
| Director | Craig Cantyn |
| Officers | Craig Cantyn (CEO, Secretary, Treasurer — can hold all three as sole founder) |
| Authorised shares | 10,000,000 shares common stock, $0.0001 par value (standard for startups) |
| Registered agent | Required in Delaware — use a service |

### Immediately After Formation

- [ ] Obtain Certificate of Incorporation from Delaware Secretary of State
- [ ] Apply for EIN (Employer Identification Number) with IRS
  - International applicants: Fax Form SS-4 to IRS or use Stripe Atlas / Firstbase
- [ ] Open US bank account (Mercury: https://mercury.com or Relay: https://relayfi.com)
  - Note: Most US banks require EIN + articles of incorporation
  - Mercury and Relay are remote-friendly for international founders
- [ ] Set up Stripe Connect under this entity (US operations)
- [ ] Execute **IP Licence Agreement** (AlecRae IP Holdings Ltd → AlecRae Inc)
- [ ] File Form 2553 (S-Corp election) — ONLY if tax advisor recommends it
  - Most startup C-Corps do NOT elect S-Corp. Discuss with your NZ/US accountant.
- [ ] Register for state taxes in states where you have nexus
  - Initially: just Delaware (franchise tax) and any state where you have employees
  - Stripe Tax handles sales tax collection/remittance
- [ ] Qualify as foreign corporation in any state where you have physical presence
  - If no US employees/office, you may not need to qualify anywhere initially

### Annual Obligations

- Delaware Annual Franchise Tax — due March 1 each year
  - Minimum: $400/year (Authorised Shares method)
  - Use Assumed Par Value Capital method if it gives a lower amount
- Delaware Annual Report — filed with franchise tax
- Federal income tax return (Form 1120)
- State income tax returns (where required)
- IP licence royalty payments to Holdings (NZ)
- FinCEN Beneficial Ownership Information Report (BOI) — required within 90 days of formation
  - https://boiefiling.fincen.gov/

---

## STEP 4 — AlecRae Pty Ltd (Australia) — WHEN VOLUME JUSTIFIES

**Do not form until Australian customer revenue justifies the cost.**
Until then, serve AU customers from AlecRae Ltd (NZ).

### Filing Details

| Item | Detail |
|---|---|
| Entity type | Proprietary Limited Company (Pty Ltd) |
| Filing portal | https://asic.gov.au/ |
| Registration | https://connectonline.asic.gov.au/ |
| Filing fee | ~$538 AUD (standard registration) |
| ABN application | https://www.abr.gov.au/ |
| Time | 1-2 business days |
| Director requirement | At least one director must be an Australian resident (or use a resident director service) |
| Company name | AlecRae Pty Ltd |

### Immediately After Formation

- [ ] Obtain Certificate of Registration from ASIC
- [ ] Apply for ABN (Australian Business Number)
- [ ] Register for GST (mandatory if AU turnover exceeds $75,000 AUD)
- [ ] Open Australian bank account
- [ ] Execute IP Licence Agreement (Holdings → AlecRae Pty Ltd)
- [ ] Transfer AU customer contracts from AlecRae Ltd (NZ) to AlecRae Pty Ltd

### Annual Obligations

- ASIC Annual Review — ~$290 AUD/year
- BAS (Business Activity Statements) — quarterly or monthly
- Company income tax return
- IP licence royalty payments to Holdings (NZ)

---

## STEP 5 — AlecRae Ltd (United Kingdom) — WHEN VOLUME JUSTIFIES

**Do not form until UK/EU customer revenue justifies the cost.**
Until then, serve UK/EU customers from AlecRae Ltd (NZ) with appropriate DPAs.

### Filing Details

| Item | Detail |
|---|---|
| Entity type | Private Limited Company (Ltd) |
| Filing portal | https://www.gov.uk/set-up-limited-company |
| Companies House | https://find-and-update.company-information.service.gov.uk/ |
| Filing fee | £12 GBP (online) |
| Time | Usually within 24 hours (online) |
| Director | At least one director (no residency requirement) |
| Registered office | Must be a UK address (use a registered office service) |
| Company name | AlecRae Ltd |

### Immediately After Formation

- [ ] Obtain Certificate of Incorporation from Companies House
- [ ] Register for Corporation Tax with HMRC (automatic letter sent after incorporation)
- [ ] Register for VAT (mandatory if UK turnover exceeds £90,000)
- [ ] Open UK bank account (Tide, Starling, or traditional bank)
- [ ] Execute IP Licence Agreement (Holdings → AlecRae Ltd UK)
- [ ] Register with ICO (Information Commissioner's Office) for data protection — ~£40-60/year
- [ ] Appoint a Data Protection Officer if required

### Annual Obligations

- Companies House Annual Confirmation Statement — £13/year
- Corporation Tax return (CT600) — due 12 months after accounting period end
- VAT returns — quarterly (if registered)
- IP licence royalty payments to Holdings (NZ)

---

## STEP 6 — Trademark Applications

**File under AlecRae IP Holdings Ltd (NZ) — file BEFORE any public announcement.**

### Trademark 1: "AlecRae"

| Jurisdiction | Filing method | Classes | Est. cost | Portal |
|---|---|---|---|---|
| New Zealand | Direct filing at IPONZ | Class 42 (SaaS), Class 45 (legal tech) | ~$100 NZD per class | https://www.iponz.govt.nz/ |
| United States | Direct filing at USPTO | Class 42, Class 45 | ~$250-350 USD per class | https://www.uspto.gov/trademarks |
| International (AU, UK, EU) | Madrid Protocol via IPONZ | Class 42, Class 45 | ~653 CHF base + per-country fees | https://www.wipo.int/madrid/en/ |

### Trademark 2: "The Oracle"

**CAUTION:** "The Oracle" is a common term. Conduct a thorough conflict search before filing.

| Search tool | URL |
|---|---|
| USPTO TESS | https://tess2.uspto.gov/ |
| IPONZ search | https://www.iponz.govt.nz/manage-ip/trade-marks/ |
| WIPO Global Brand Database | https://branddb.wipo.int/ |
| EUIPO TMview | https://www.tmdn.org/tmview/ |

If "The Oracle" has conflicts, consider alternatives:
- "The AlecRae Oracle"
- "Oracle by AlecRae" (strengthens association with parent brand)

### Filing Sequence

1. File NZ trademark applications first (IPONZ) — establishes priority date
2. Within 6 months, file Madrid Protocol international application through IPONZ
   - Designate: Australia, United Kingdom, European Union
3. File US trademark applications directly at USPTO (can also be designated via Madrid)
4. Use ™ symbol immediately upon filing
5. Switch to ® ONLY after registration is confirmed in each jurisdiction

### Budget Estimate (Trademarks)

| Item | Est. cost |
|---|---|
| NZ filing (2 marks × 2 classes) | ~$400 NZD |
| USPTO filing (2 marks × 2 classes) | ~$1,000-1,400 USD |
| Madrid Protocol (2 marks, 3 designations) | ~$3,000-5,000 CHF |
| Trademark attorney review | ~$1,000-3,000 NZD |
| **Total estimate** | **~$5,000-8,000 NZD equivalent** |

---

## STEP 7 — Provisional Patent Applications

**File under AlecRae IP Holdings Ltd (NZ) — file BEFORE any public disclosure,
demo, blog post, or technical presentation.**

### Patents to File

| # | Invention | Why it's patentable |
|---|---|---|
| 1 | Cross-domain legal + accounting AI query resolution (The Oracle) | Novel methodology: simultaneous legal and accounting AI analysis from unified query input |
| 2 | AI dictation with legal/accounting vocabulary intelligence | Novel methodology: context-aware vocabulary switching between legal and accounting domains |
| 3 | Multi-jurisdiction company incorporation with simultaneous legal + accounting AI analysis | Novel workflow: automated entity formation with concurrent legal liability and tax optimisation analysis |
| 4 | AI-powered citation verification with tiered confidence badges | Novel methodology: automated cross-referencing against authoritative sources with graduated trust signals |
| 5 | Cross-professional matter workspace with shared AI research | Novel methodology: attorney + accountant collaborative workspace with unified AI research layer |

### Filing Details

| Item | Detail |
|---|---|
| Filing type | US Provisional Patent Application |
| Filing portal | https://www.uspto.gov/patents/apply |
| Filing fee | $320 USD (small entity) or $160 USD (micro entity) |
| Validity | 12 months from filing date — must file full application within 12 months |
| What's required | Specification (technical description), claims (optional for provisional), drawings (optional), cover sheet, filing fee |
| Attorney cost | ~$1,500-3,000 USD per provisional (recommended) |

### Filing Sequence

1. Prepare technical disclosure documents for each invention
   - See /docs/legal/patent-disclosures.md for outlines
2. Engage a patent attorney (ideally experienced in software/AI patents)
3. File US provisionals at USPTO
4. Within 12 months, decide which to convert to full utility patents
5. Use PCT (Patent Cooperation Treaty) for international filing if needed

### Budget Estimate (Patents)

| Item | Est. cost |
|---|---|
| USPTO provisional filing (5 × $160-320) | ~$800-1,600 USD |
| Patent attorney drafting (5 provisionals) | ~$7,500-15,000 USD |
| **Total estimate** | **~$8,300-16,600 USD** |

Note: Provisional patents are placeholders. They establish a priority date.
You have 12 months to decide which ones to convert to full utility patents
(which cost $10,000-20,000+ each with attorney fees). Not all need to be
converted — only the ones with genuine commercial value.

---

## STEP 8 — Insurance

**Obtain before launch — before any customer signs up.**

| Policy | What it covers | When needed | Est. cost |
|---|---|---|---|
| Professional Liability / E&O (Errors & Omissions) | Claims that the platform's output caused professional harm | Before first customer | $2,000-5,000/year |
| Directors & Officers (D&O) | Personal liability of directors for company decisions | At formation | $1,000-3,000/year |
| Cyber Liability | Data breaches, cyberattacks, ransomware | Before launch | $1,500-4,000/year |
| General Liability | Physical injury, property damage (unlikely for SaaS but standard) | Before launch | $500-1,500/year |
| **Total estimate** | | | **~$5,000-13,500/year** |

### NZ Insurance Providers

- Vero (professional indemnity)
- Crombie Lockwood (broker — can package all policies)
- Marsh (international, good for multi-jurisdiction)
- Delta Insurance (tech-specific, NZ-based)

### US Insurance Providers

- Embroker (tech-focused, online)
- Hiscox (small business, online)
- Hartford (general business)

---

## STEP 9 — Professional Advisors to Engage

| Role | What they must do | When | How to find |
|---|---|---|---|
| NZ/US dual-qualified corporate attorney | Review entity structure, execute IP assignment, draft intercompany agreements, review Terms of Service | BEFORE any entity is formed | NZ Law Society directory, LinkedIn, Chapman Tripp, Bell Gully, Russell McVeagh (NZ big firms) |
| IP/patent attorney | File provisionals, file trademarks, conduct conflict searches | BEFORE any public announcement | James & Wells (NZ), AJ Park (NZ), or US patent attorney |
| NZ/US dual-qualified accountant | GST zero-rating, transfer pricing, R&D tax credits, intercompany royalties | BEFORE first revenue | CA ANZ directory, Deloitte Private, Baker Tilly Staples Rodway |
| US legal tech compliance attorney | IOLTA rules by state, bar software approval requirements | BEFORE trust accounting module | Legal tech bar associations, Clio's legal counsel could recommend |
| Privacy attorney | Review Privacy Policy, DPA templates, GDPR compliance | BEFORE beta launch | Simpson Grierson (NZ), Buddle Findlay (NZ) |

---

## TOTAL ESTIMATED FORMATION COSTS

| Category | Low estimate | High estimate |
|---|---|---|
| NZ entities (2 × $20) | $40 NZD | $40 NZD |
| Delaware C-Corp (via Stripe Atlas) | $500 USD | $800 USD |
| Registered agent (Delaware, annual) | $50 USD | $300 USD |
| Trademark filings | $5,000 NZD | $8,000 NZD |
| Provisional patents | $8,300 USD | $16,600 USD |
| Insurance (first year) | $5,000 USD | $13,500 USD |
| Professional advisors (initial engagement) | $5,000 NZD | $20,000 NZD |
| **TOTAL (approximate NZD equivalent)** | **~$35,000 NZD** | **~$85,000 NZD** |

Note: AU and UK entities are deferred until volume justifies them.
The above covers what's needed before launch.

---

## CRITICAL REMINDERS

1. **IP Assignment FIRST** — Before anything else, all IP must be transferred from Craig Cantyn personally to AlecRae IP Holdings Ltd. Until this is done, the IP is personally owned and exposed to personal liability.

2. **Corporate formalities** — Keep minutes of all board resolutions, maintain separate bank accounts for each entity, never commingle funds. This prevents piercing of the corporate veil.

3. **Transfer pricing** — IP licence fees between entities must be at arm's length rates. Get your accountant to set these before any money flows.

4. **Trademark before announcement** — File trademarks before any LinkedIn post, press release, or public demo. Once you announce publicly, you've started the clock on potential challenges.

5. **Patents before disclosure** — File provisionals before any technical blog post, conference talk, or open-source contribution that describes the inventions. Public disclosure before filing can destroy patent rights.

6. **BOI Report (US)** — The FinCEN Beneficial Ownership Information report must be filed within 90 days of forming the Delaware C-Corp. Failure to file carries significant penalties.
