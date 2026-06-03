import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Immigration Singapore — EP, S Pass, EntrePass, GIP Management",
  description:
    "AI-powered Singapore immigration management for Employment Pass, S Pass, Dependent Pass, Long-Term Visit Pass, EntrePass, and Global Investor Programme. MOM and ICA integration. Built for Singapore immigration lawyers and advisers globally.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Immigration — Singapore",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  description:
    "AI-powered Singapore immigration platform with Employment Pass, S Pass, Dependent Pass, EntrePass, and Global Investor Programme management. MOM integration, ICA PR and citizenship workflows, multilingual support (English, Mandarin, Tamil, Malay).",
  url: `${BRAND.url}/immigration/sg`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Marco Reid", item: BRAND.url },
    { "@type": "ListItem", position: 2, name: "Immigration", item: `${BRAND.url}/immigration` },
    { "@type": "ListItem", position: 3, name: "Singapore", item: `${BRAND.url}/immigration/sg` },
  ],
};

const VISA_CATEGORIES = [
  {
    code: "EP",
    name: "Employment Pass",
    description:
      "For foreign professionals, managers, and executives earning SGD 5,000+ per month (higher thresholds for Financial Services). Managed via MOM's Employment Pass Online (EP Online) portal. COMPASS points framework since September 2023.",
    authority: "MOM",
    authorityFull: "Ministry of Manpower",
    renewal: "1–2 years",
  },
  {
    code: "S Pass",
    name: "S Pass",
    description:
      "For mid-level skilled workers earning SGD 3,150+ per month. Subject to sub-dependency ratio ceilings by sector. S Pass levy applies to employers. Quota management tools included.",
    authority: "MOM",
    authorityFull: "Ministry of Manpower",
    renewal: "2 years",
  },
  {
    code: "DP",
    name: "Dependent Pass",
    description:
      "For legally married spouses and unmarried children under 21 of EP and S Pass holders earning SGD 6,000+ per month. Managed via MOM's EP Online portal. Work authorisation Letter of Consent (LOC) support.",
    authority: "MOM",
    authorityFull: "Ministry of Manpower",
    renewal: "Linked to main pass",
  },
  {
    code: "LTVP",
    name: "Long-Term Visit Pass",
    description:
      "For common-law spouses, stepchildren, handicapped children, and parents of EP/S Pass holders. Issued by ICA. Not tied to employment. LTVP+ for higher-earning sponsors. Enhanced benefits pathways.",
    authority: "ICA",
    authorityFull: "Immigration and Checkpoints Authority",
    renewal: "1–5 years",
  },
  {
    code: "EntrePass",
    name: "Entrepreneur Pass",
    description:
      "For entrepreneurs starting or operating a venture-capital funded, IDA-approved, or high-tech business in Singapore. Must hold or be applying for registration with ACRA. Rigorous criteria review and business plan assessment support.",
    authority: "MOM",
    authorityFull: "Ministry of Manpower",
    renewal: "1–2 years",
  },
  {
    code: "GIP",
    name: "Global Investor Programme",
    description:
      "For high-net-worth investors committing SGD 10M+ to Singapore businesses or GIP funds. Administered by EDB/MAS jointly. Leads to Permanent Residency. Complex multi-agency workflow with due diligence requirements.",
    authority: "EDB / MAS",
    authorityFull: "Economic Development Board / Monetary Authority of Singapore",
    renewal: "PR pathway",
  },
];

const HOW_MARCO_HELPS = [
  {
    title: "Document generation",
    description:
      "AI-drafted cover letters, statutory declarations, employment verification letters, and supporting documents formatted to MOM and ICA specifications. Jurisdiction-aware templates updated with each policy change.",
  },
  {
    title: "Application tracking",
    description:
      "Every application tracked from lodgement to decision. Automated deadline reminders for renewal windows, levy payments, and sub-dependency ratio checks. Calendar integration for critical dates.",
  },
  {
    title: "Client portal",
    description:
      "Branded client portal for applicants. Upload supporting documents, track application status in plain language, receive milestone notifications, and sign documents electronically — without calling your office.",
  },
  {
    title: "COMPASS framework",
    description:
      "Built-in COMPASS points calculator for EP applications. Score candidates across all criteria (salary, qualifications, diversity, local workforce support) before submission. Identify gaps and advise employers.",
  },
  {
    title: "MOM integration",
    description:
      "Direct integration with MOM Employment Pass Online (EP Online) portal. Pre-populate application fields from matter data. Real-time status synchronisation. Quota checks and levy calculations automated.",
  },
  {
    title: "Multilingual support",
    description:
      "Full platform support in English, Mandarin, Tamil, and Malay. Client communications, document requests, and status updates delivered in the applicant's preferred language. Singapore English conventions built into Voice.",
  },
];

const TARGET_USERS = [
  {
    segment: "Singapore immigration law firms",
    description:
      "Law firms practising Singapore immigration law managing high-volume EP and S Pass caseloads. COMPASS analysis, quota management, and MOM integration reduce per-application time dramatically.",
  },
  {
    segment: "NZ, AU, and UK immigration advisers",
    description:
      "Licensed practitioners in New Zealand, Australia, and the UK helping clients relocate to Singapore. Full Singapore visa framework built into the platform alongside local visa streams.",
  },
  {
    segment: "Global mobility and HR teams",
    description:
      "Corporate immigration teams managing intra-company transfers and international hires into Singapore offices. Employer levy tracking, quota dashboards, and renewal calendars built for corporate volume.",
  },
  {
    segment: "Singapore employers",
    description:
      "Companies sponsoring foreign workers in Singapore. Sub-dependency ratio monitoring, levy payment tracking, and EP holder renewal management without specialist legal knowledge required.",
  },
];

export default function ImmigrationSingaporePage() {
  return (
    <>
      <SchemaMarkup schema={schema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-48 -top-48 h-[520px] w-[520px] rounded-full bg-gold-500/10 blur-[140px]" />
          <div className="animate-drift-reverse absolute -left-48 -bottom-32 h-[440px] w-[440px] rounded-full bg-forest-500/8 blur-[120px]" />
        </div>

        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-6xl" aria-label="Singapore flag">🇸🇬</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Marco Reid Immigration &mdash; Singapore
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Singapore immigration. Every pass. Every pathway.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-navy-100">
              Employment Pass. S Pass. Dependent Pass. EntrePass. Global Investor Programme.
              MOM and ICA integration. AI-powered document generation. Built for immigration
              lawyers and advisers managing Singapore caseloads globally.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/trial" size="lg" variant="gold">
                Start free trial →
              </Button>
              <Button href="/contact" size="lg" variant="ghost" className="text-white hover:text-gold-300">
                Find an immigration specialist →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* VISA CATEGORIES                                                   */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Singapore visa framework
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-display text-navy-800">
              Every Singapore pass and pathway.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-500">
              Marco Reid covers the complete Singapore immigration framework —
              from Employment Pass COMPASS scoring to Global Investor Programme
              due diligence. Managed end-to-end in one platform.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VISA_CATEGORIES.map((visa, i) => (
              <Reveal key={visa.code} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-block rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy-700">
                      {visa.code}
                    </span>
                    <span className="inline-block rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-semibold text-forest-700">
                      {visa.authority}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl text-navy-800">{visa.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">
                    {visa.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 border-t border-navy-50 pt-4">
                    <div>
                      <p className="text-xs font-semibold text-navy-400">Authority</p>
                      <p className="text-xs text-navy-600">{visa.authorityFull}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xs font-semibold text-navy-400">Validity</p>
                      <p className="text-xs text-navy-600">{visa.renewal}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* HOW MARCO HELPS                                                   */}
      {/* ================================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Platform capabilities
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-display text-navy-800">
              How Marco Reid works for Singapore immigration.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_MARCO_HELPS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-50">
                    <span className="text-sm font-bold text-gold-600" aria-hidden="true">→</span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-navy-800">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* MULTILINGUAL CALLOUT                                              */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-forest-200 bg-forest-50 p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-forest-700">
                Multilingual — four languages from day one
              </p>
              <h3 className="mt-4 font-serif text-2xl text-navy-800">
                Singapore is multilingual. Marco Reid is too.
              </h3>
              <p className="mt-3 text-base leading-relaxed text-navy-600">
                Singapore&rsquo;s four official languages — English, Mandarin, Tamil, and Malay —
                are all supported across the platform. Client portals, status notifications,
                document requests, and Marco Reid Voice dictation all work in the client&rsquo;s
                preferred language. No translation overhead. No miscommunication.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["English", "Mandarin 中文", "Tamil தமிழ்", "Malay Bahasa Melayu"].map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full border border-forest-200 bg-white px-4 py-2 text-sm font-medium text-forest-800"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* WHO IT'S FOR                                                      */}
      {/* ================================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Who Marco Reid Singapore Immigration serves
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-display text-navy-800">
              Built for every professional managing Singapore immigration.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {TARGET_USERS.map((user, i) => (
              <Reveal key={user.segment} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{user.segment}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{user.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* MOM + ICA INTEGRATION CALLOUT                                     */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">
                  MOM Integration
                </p>
                <h3 className="mt-4 font-serif text-2xl text-navy-800">
                  Ministry of Manpower
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  Direct integration with MOM Employment Pass Online (EP Online) for
                  Employment Pass, S Pass, and Dependent Pass applications. Real-time
                  quota checks, COMPASS scoring, levy calculations, and renewal tracking.
                  Application data flows from your matter record to MOM without re-keying.
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "EP Online application pre-population",
                    "COMPASS points calculator",
                    "Sub-dependency ratio monitoring",
                    "Employer levy tracking and alerts",
                    "Renewal deadline calendar",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-navy-700">
                      <span className="mt-0.5 shrink-0 text-forest-600" aria-hidden="true">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">
                  ICA Integration
                </p>
                <h3 className="mt-4 font-serif text-2xl text-navy-800">
                  Immigration and Checkpoints Authority
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  Long-Term Visit Pass (LTVP) and LTVP+ workflows, Permanent Residency
                  applications, and Singapore citizenship applications managed through
                  ICA&rsquo;s e-Service portal. Full document checklists, supporting statement
                  drafting, and in-principle approval tracking.
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "LTVP and LTVP+ application management",
                    "Permanent Residency workflow",
                    "Citizenship application support",
                    "ICA e-Service integration",
                    "Document checklist and status tracking",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-navy-700">
                      <span className="mt-0.5 shrink-0 text-forest-600" aria-hidden="true">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                               */}
      {/* ================================================================ */}
      <section className="bg-navy-500 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-6xl" aria-label="Singapore flag">🇸🇬</p>
              <h2 className="mt-6 font-serif text-display text-white">
                Start managing Singapore immigration today.
              </h2>
              <p className="mt-4 text-lg text-navy-200">
                Free trial. No credit card required. Singapore SGD pricing.
                Full EP, S Pass, Dependent Pass, LTVP, EntrePass, and GIP support from day one.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/trial" size="lg" variant="gold">
                  Start free trial →
                </Button>
                <Button href="/find-a-lawyer" size="lg" variant="ghost" className="text-white hover:text-gold-300">
                  Find an immigration specialist →
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* AI DISCLAIMER                                                     */}
      {/* ================================================================ */}
      <section className="py-12">
        <Container narrow>
          <AiDisclaimer />
        </Container>
      </section>

      {/* ================================================================ */}
      {/* COMPLIANCE NOTE                                                   */}
      {/* ================================================================ */}
      <section className="pb-12">
        <Container narrow>
          <p className="text-center text-xs text-navy-400">
            Marco Reid is a technology platform, not an immigration law firm or registered
            migration agent. All Singapore immigration advice is provided by independently
            licensed immigration lawyers registered with the Law Society of Singapore or
            other relevant regulatory body. Immigration processes are subject to change by
            MOM and ICA without notice — always verify current requirements with a
            qualified professional.
          </p>
        </Container>
      </section>
    </>
  );
}
