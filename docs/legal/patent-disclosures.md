# PROVISIONAL PATENT APPLICATION — TECHNICAL DISCLOSURES

**⚠ DRAFT — FOR PATENT ATTORNEY REVIEW BEFORE FILING ⚠**

**Applicant:** AlecRae IP Holdings Limited (NZ)
**Inventor:** Craig Cantyn

These are outline disclosures for five provisional patent applications.
Each disclosure describes the invention in sufficient detail to establish
a priority date. A patent attorney should expand these into full provisional
specifications before filing.

**CRITICAL:** Do not publish, blog about, demo, or publicly disclose any
of these inventions before the provisional applications are filed. Public
disclosure before filing can destroy patent rights in most jurisdictions.

---

## INVENTION 1: Cross-Domain Legal and Accounting AI Query Resolution

### Title
System and Method for Simultaneous Cross-Domain Artificial Intelligence
Query Resolution Across Legal and Accounting Knowledge Domains

### Field of the Invention
The invention relates to artificial intelligence systems for professional
research, and more particularly to a system and method for simultaneously
processing queries that span both legal and accounting knowledge domains,
with integrated citation verification across both domains.

### Background
Existing AI research tools operate in single domains. A legal research
tool (e.g., Westlaw, LexisNexis) processes legal queries. An accounting
research tool processes tax/accounting queries. No existing system
simultaneously analyses a query across both legal and accounting domains
to produce a unified response that addresses both the legal and financial
implications of a professional question.

Professional questions frequently span both domains. For example:
"What are the tax implications of this corporate restructuring?" requires
both legal analysis (corporate law, regulatory compliance) and accounting
analysis (tax code, financial reporting). Currently, a professional must
use two separate tools and manually synthesise the results.

### Summary of the Invention
A computer-implemented method and system comprising:

1. **Domain detection module** — analyses an incoming natural language query
   and classifies it as LEGAL, ACCOUNTING, IP, or CROSS_DOMAIN based on
   keyword analysis, entity recognition, and contextual classification.

2. **Multi-domain prompt construction** — when a query is classified as
   CROSS_DOMAIN, the system constructs a composite prompt that includes:
   (a) legal domain system instructions, including jurisdiction-specific
   rules, legal citation formats, and legal reasoning frameworks;
   (b) accounting domain system instructions, including tax code references,
   financial reporting standards, and accounting principles;
   (c) cross-domain synthesis instructions that require the AI model to
   address both legal and accounting implications in a unified response.

3. **Unified response generation** — a large language model processes the
   composite prompt and generates a response that addresses both the legal
   and accounting dimensions of the query in a single, coherent output.

4. **Dual-domain citation extraction** — the system parses the response
   and extracts citations from both domains (case law, statutes, tax codes,
   regulations, accounting standards) using domain-specific pattern matching.

5. **Cross-domain citation verification** — each extracted citation is
   verified against authoritative sources from its respective domain
   (e.g., CourtListener for case law, IRS.gov for tax code, FASB for
   accounting standards), and assigned a verification status
   (VERIFIED, UNVERIFIED, NOT_FOUND).

6. **Tiered confidence badges** — the verification status is displayed to
   the user as a visual badge, providing a graduated trust signal that
   informs the professional's independent verification obligation.

### Claims (Outline)
1. A computer-implemented method for processing a professional research
   query, comprising: receiving a natural language query; classifying the
   query across multiple professional knowledge domains; constructing a
   composite prompt incorporating instructions from each identified domain;
   generating a unified response using a language model; extracting citations
   from the response; verifying each citation against domain-specific
   authoritative sources; and presenting the response with verification
   status indicators.

2. The method of claim 1, wherein the professional knowledge domains
   include at least a legal domain and an accounting domain.

3. The method of claim 1, wherein the verification status indicators
   comprise at least three tiers: verified, unverified, and not found.

### Technical Implementation
- Domain detection: keyword-based classification with weighted scoring
  across legal, accounting, and IP vocabularies
- LLM: Claude (Anthropic) with domain-specific system prompts
- Citation extraction: regex-based pattern matching for case citations
  (e.g., "Smith v. Jones, 123 F.3d 456"), statutory references
  (e.g., "26 U.S.C. § 1001"), and accounting standards
- Verification: API calls to CourtListener, IRS.gov, Cornell LII,
  GovInfo, and equivalent international sources
- Database: PostgreSQL with query logging, citation tracking, and
  feedback collection

---

## INVENTION 2: AI Voice Transcription with Domain-Specific Professional Vocabulary Intelligence

### Title
System and Method for Context-Aware Voice-to-Text Transcription with
Dynamically Switchable Professional Vocabulary Models

### Field of the Invention
The invention relates to speech recognition and voice-to-text
transcription, and more particularly to a system that dynamically
switches between specialised professional vocabulary models based on
the context of the input field and the professional domain.

### Background
General-purpose voice transcription systems (e.g., Google Speech-to-Text,
Apple Dictation) perform poorly on professional vocabulary. Legal terms
(Latin phrases, case citation formats, legal drafting conventions) and
accounting terms (GAAP terminology, tax code references, financial
calculations) are frequently misrecognised or incorrectly transcribed.

Existing professional dictation tools (e.g., Dragon Legal, Dragon Medical)
use static vocabulary models trained for a single domain. No existing
system dynamically switches vocabulary models based on the context of
where the user is typing.

### Summary of the Invention
A system comprising:

1. **Context detection** — determines which input field the user is
   currently focused on (e.g., case notes, invoice description, legal
   brief, tax memo, Oracle research query, email) and the current
   working domain.

2. **Dynamic vocabulary switching** — based on the detected context,
   loads the appropriate professional vocabulary model:
   (a) legal vocabulary (Latin terms, case citations, court names,
   legal phrases, drafting conventions);
   (b) accounting vocabulary (double-entry terms, tax code references,
   GAAP/IFRS standards, financial calculations);
   (c) general professional vocabulary;
   (d) cross-domain vocabulary (when context spans both domains).

3. **Post-processing intelligence** — after initial transcription (via
   a base model such as OpenAI Whisper), applies domain-specific
   post-processing to correct vocabulary, format citations, apply
   proper capitalisation, and insert domain-appropriate punctuation.

4. **Professional name learning** — learns and correctly recognises
   names of clients, opposing counsel, judges, partners, and other
   frequently referenced proper nouns specific to the user's practice.

5. **Multi-surface availability** — the voice input layer is available
   in every text input field across the platform, not as a standalone
   application.

---

## INVENTION 3: Multi-Jurisdiction Entity Formation with Simultaneous Legal and Accounting AI Analysis

### Title
System and Method for Automated Multi-Jurisdiction Business Entity
Formation with Concurrent Legal Liability and Tax Optimisation Analysis

### Field of the Invention
The invention relates to business entity formation systems, and more
particularly to a system that simultaneously analyses legal liability
and tax implications across multiple jurisdictions to recommend optimal
corporate structures with automated document generation.

### Background
Business entity formation currently requires multiple professionals
(corporate attorney, tax advisor, accountant) working in separate systems.
The legal analysis (liability protection, corporate structure, regulatory
compliance) is performed independently from the tax analysis (entity
selection for tax optimisation, transfer pricing, multi-jurisdiction
tax implications). This results in suboptimal structures, duplicated
effort, and higher costs.

No existing system simultaneously analyses both legal and tax implications
of a proposed corporate structure across multiple jurisdictions in a
single workflow.

### Summary of the Invention
A system comprising:

1. **Multi-jurisdiction intake** — collects: countries/states of operation,
   business activities, directors/shareholders, capital structure, revenue
   projections, IP ownership, and specific legal/tax concerns.

2. **Concurrent dual-domain analysis:**
   (a) legal AI engine analyses liability protection, corporate veil
   considerations, regulatory requirements, and compliance obligations
   for each proposed entity in each jurisdiction;
   (b) accounting AI engine analyses tax implications, transfer pricing
   requirements, withholding tax, double tax agreements, and ongoing
   tax compliance obligations for the proposed structure.

3. **Structure recommendation** — synthesises both analyses to recommend
   an optimal corporate structure that balances legal protection and tax
   efficiency, including holding companies, IP entities, and operating
   entities.

4. **Automated document generation** — generates pre-populated formation
   documents for each entity in each jurisdiction (articles of incorporation,
   constitutions, shareholder agreements, IP assignment agreements,
   intercompany licence agreements).

5. **Ongoing compliance tracking** — after formation, automatically tracks
   filing deadlines, annual returns, tax returns, and regulatory obligations
   across all jurisdictions, with automated reminders and calendar integration.

---

## INVENTION 4: AI-Powered Citation Verification with Tiered Confidence Badges

### Title
System and Method for Automated Verification of AI-Generated Citations
Against Authoritative Sources with Graduated Trust Signal Presentation

### Field of the Invention
The invention relates to citation verification in AI-generated research
output, and more particularly to a system that automatically cross-references
AI-generated citations against authoritative public domain sources and
presents verification results as graduated trust signals.

### Background
Large language models used for legal and accounting research frequently
generate citations that are inaccurate or fabricated ("hallucinations").
Professional users cannot distinguish between accurate and fabricated
citations without manual verification, which is time-consuming and
error-prone.

No existing system automatically verifies AI-generated professional
citations against authoritative sources and presents the results as
actionable trust signals integrated into the research output.

### Summary of the Invention
1. **Citation extraction** — parses AI-generated output using domain-specific
   pattern matching to identify citations (case names, reporter references,
   statutory sections, regulatory citations, accounting standards).

2. **Multi-source verification** — queries authoritative public domain
   databases (CourtListener, Cornell LII, GovInfo, IRS.gov, FASB, IASB)
   via API to determine whether each citation exists and whether the
   reference details are accurate.

3. **Tiered confidence classification:**
   - VERIFIED: citation found in authoritative source with matching details
   - UNVERIFIED: citation could not be confirmed (may exist but not found)
   - NOT_FOUND: citation not found in any authoritative source (probable fabrication)

4. **Visual badge presentation** — each citation is displayed with a
   colour-coded badge indicating its verification status, providing an
   immediate visual trust signal.

5. **Verification audit trail** — the system logs every verification
   attempt, the sources queried, the results obtained, and the badge
   assigned, creating a defensible audit trail.

---

## INVENTION 5: Cross-Professional Matter Workspace with Shared AI Research

### Title
System and Method for Collaborative Multi-Professional Workspaces with
Unified Artificial Intelligence Research Access Across Professional Domains

### Field of the Invention
The invention relates to collaborative professional platforms, and more
particularly to a workspace system where professionals from different
domains (legal and accounting) can collaborate on a shared matter with
unified access to AI research spanning both domains.

### Background
Legal and accounting professionals frequently collaborate on matters
that require both legal and financial expertise (e.g., mergers and
acquisitions, tax disputes, estate planning, business formation).
Currently, attorneys and accountants use entirely separate systems
with no shared workspace, no shared AI research, and no unified
matter record.

### Summary of the Invention
1. **Cross-professional matter record** — a unified matter/engagement
   record that is accessible to both legal and accounting professionals,
   with role-based access controls that respect professional privilege
   boundaries.

2. **Privilege-aware sharing** — the system distinguishes between
   attorney-client privileged materials and non-privileged materials,
   and enforces appropriate access controls when sharing between
   professionals of different types.

3. **Unified AI research** — both professionals can query The Oracle
   from the shared workspace, with results that automatically consider
   both the legal and accounting dimensions of the shared matter.

4. **Cross-professional notifications** — when one professional takes
   an action that affects the other's work (e.g., a legal filing that
   has tax implications, or a financial calculation that affects legal
   strategy), the system automatically generates a notification.

5. **Integrated billing** — both professionals' time and activities on
   the shared matter are tracked in a unified billing record, with
   appropriate allocation between legal and accounting services.

---

## FILING NOTES FOR PATENT ATTORNEY

1. **Prior art search:** Conduct a thorough prior art search for each
   invention before filing. Key competitors to search: Westlaw/Thomson
   Reuters, LexisNexis/RELX, Clio, Bloomberg Law, Wolters Kluwer.

2. **Software patent eligibility:** Under Alice Corp. v. CLS Bank (US,
   2014), abstract ideas implemented on a computer are not patent-eligible.
   Each application must demonstrate that the invention provides a specific
   technical improvement, not merely an abstract idea. The cross-domain
   simultaneous analysis and tiered verification systems should qualify as
   technical improvements over existing methods.

3. **International filing:** Consider PCT (Patent Cooperation Treaty)
   filing within 12 months of provisional filing for international
   protection. Key jurisdictions: US, AU, NZ, UK/EP.

4. **Provisional vs. utility:** Not all five inventions may warrant
   conversion to full utility patents. After 12 months, assess which
   have genuine commercial value and defensibility before investing in
   full applications ($10,000-20,000+ each).

5. **Invention disclosure:** These outlines are starting points. The
   patent attorney should interview Craig to capture additional technical
   details, implementation specifics, and alternative embodiments for
   each invention.

6. **Trade secret alternative:** For some inventions (particularly the
   post-processing intelligence and domain detection methods), trade
   secret protection may be more appropriate than patent protection,
   as patents require public disclosure. Discuss with patent attorney.
