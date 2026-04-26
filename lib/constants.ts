import { Product, PricingTier, TimeSaving } from "./types";

export const BRAND = {
  name: "Marco Reid",
  tagline: "Professional intelligence \u2014 law and accounting",
  description:
    "The operating system for legal and accounting professionals. Every tool your firm needs, in one platform.",
  url: "https://marcoreid.com",
  company: "Reid & Associates",
} as const;

// Top-nav kept tight so it scales as practice-area modules multiply.
// Catch-Up Centre, Courtroom, and Voice are surfaced via product pages,
// the homepage, and the footer rather than competing for header real estate.
export const NAV_LINKS = [
  { label: "Legal", href: "/law" },
  { label: "Accounting", href: "/accounting" },
  { label: "Marco", href: "/marco" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const PRODUCTS: Record<string, Product> = {
  law: {
    name: "Marco Reid Legal",
    slug: "/law",
    tagline: "The operating system for your legal practice",
    description:
      "Full-stack legal practice management powered by AI. Case management, billing, trust accounting, document drafting, court-rules calendaring, and legal research \u2014 in one platform.",
    features: [
      "Case and matter management",
      "Trust accounting (IOLTA-compliant)",
      "Court-rules calendaring with automatic deadline calculation",
      "Document AI \u2014 drafting, review, and word processing",
      "Billing and time tracking",
      "Legal forms library with AI pre-population",
      "E-signature built in",
      "Client portal with secure messaging",
    ],
  },
  accounting: {
    name: "Marco Reid Accounting",
    slug: "/accounting",
    tagline: "The most advanced accounting platform on earth",
    description:
      "Autonomous bookkeeping, payroll across five jurisdictions, GST / VAT / sales-tax filing, provisional and income tax, and a Catch-Up Centre that cleans up years of unfiled returns \u2014 all driven by AI that works while you sleep.",
    features: [
      "Autonomous bookkeeping \u2014 AI posts, reconciles, and closes the books",
      "Bank feed integration via Plaid and Akahu (NZ) with zero missed transactions",
      "Payroll \u2014 PAYE, PAYG, US federal + 50-state withholding, UK PAYE, CA CPP/EI",
      "GST filing \u2014 NZ GST, AU GST, UK VAT, and US sales tax across all 50 states",
      "Provisional tax, estimated tax, and year-end income tax \u2014 fully automated",
      "Catch-Up Centre \u2014 AI-driven cleanup of years of unfiled returns",
      "Receipt, invoice, and statement capture \u2014 photo in, journal entry out",
      "Inland Revenue (IR), IRS, ATO, HMRC, and CRA e-filing built in",
      "AI spreadsheets, financial modelling, and cash-flow forecasting",
      "Voice journal entries \u2014 dictate debits and credits in plain English",
      "Client portal, engagement letters, e-signature, and billing",
      "Marco for accounting \u2014 verified tax and regulatory research in seconds",
    ],
  },
  catchup: {
    name: "Catch-Up Centre",
    slug: "/catch-up-centre",
    tagline: "Years behind on your taxes? We catch you up. Automatically.",
    description:
      "Upload what you have. Marco Reid reconstructs the missing years \u2014 bank feeds, invoices, GST, provisional tax, income tax, payroll \u2014 then files everything with Inland Revenue, the IRS, the ATO, HMRC, or the CRA. AI does the work. You sign off.",
    features: [
      "AI reconstructs missing books from bank statements, invoices, and receipts",
      "Back-files GST / VAT returns for every missed period",
      "Back-files income tax returns across multiple years and jurisdictions",
      "Provisional tax recalculated and lodged for every open year",
      "Payroll back-filing \u2014 PAYE, PAYG, and payroll tax arrears",
      "Penalty and interest calculator \u2014 and AI-drafted remission letters",
      "Direct e-filing to IR, IRS, ATO, HMRC, and CRA",
      "Fixed-fee engagements with live progress dashboard",
      "White-glove review by a qualified accountant before every filing",
    ],
  },
  marco: {
    name: "Marco",
    slug: "/marco",
    tagline: "Your AI partner for law and accounting",
    description:
      "Cross-domain legal and accounting AI research. Ask Marco questions that span both disciplines simultaneously. Every citation verified against authoritative public domain sources.",
    features: [
      "Legal research across all public domain case law and statutes",
      "Accounting research across tax codes and regulations",
      "Cross-domain queries \u2014 legal and accounting in one search",
      "Citation verification with source links",
      "Verification badges: Verified, Unverified, Not Found",
      "Insert citations directly into documents and emails",
      "Available inline everywhere via \u2318K command palette",
      "Hallucination prevention with mandatory source checking",
    ],
  },
  voice: {
    name: "Marco Reid Voice",
    slug: "/dictation",
    tagline: "Speak. It is done.",
    description:
      "The universal input layer for the entire platform. Everywhere you can type, you can speak. Legal and accounting vocabulary intelligence in 9 languages from day one.",
    features: [
      "Legal vocabulary \u2014 Latin terms, citations, drafting conventions",
      "Accounting vocabulary \u2014 double-entry, GAAP, tax codes",
      "9 languages at launch including English, Spanish, Mandarin",
      "Context-aware grammar switching by surface",
      "Voice commands for billing, scheduling, messaging, research",
      "Professional name learning and auto-correction",
      "Available in every input field across the platform",
      "Built on OpenAI Whisper with professional language layer",
    ],
  },
};

export const LAW_PRICING: PricingTier[] = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "For solo attorneys getting started",
    features: [
      "Marco Reid Voice",
      "Basic case management",
      "Time tracking and invoicing",
      "Document storage",
      "Client portal",
    ],
  },
  {
    name: "Professional",
    price: "$199",
    period: "/month",
    description: "Full platform for small firms",
    features: [
      "Everything in Starter",
      "Document AI drafting and review",
      "Court-rules calendaring",
      "Legal forms library",
      "E-signature",
      "Trust accounting (IOLTA)",
    ],
    highlighted: true,
  },
  {
    name: "Firm",
    price: "$399",
    period: "/seat/month",
    description: "Full platform with Marco for growing firms",
    features: [
      "Everything in Professional",
      "Marco \u2014 Law",
      "Citation verification system",
      "Firm analytics and reporting",
      "Priority support",
      "Custom integrations",
    ],
  },
];

export const ACCOUNTING_PRICING: PricingTier[] = [
  {
    name: "Starter",
    price: "$79",
    period: "/month",
    description: "For solo CPAs getting started",
    features: [
      "Marco Reid Voice",
      "Basic accounting tools",
      "Bank feed integration",
      "Receipt scanning",
      "Client management",
    ],
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "Full platform for small firms",
    features: [
      "Everything in Starter",
      "Automated reconciliation",
      "Tax compliance tools",
      "Financial reporting",
      "AI spreadsheets",
      "E-signature",
    ],
    highlighted: true,
  },
  {
    name: "Firm",
    price: "$299",
    period: "/seat/month",
    description: "Full platform with Marco for growing firms",
    features: [
      "Everything in Professional",
      "Marco \u2014 Accounting",
      "Regulatory verification system",
      "Firm analytics and reporting",
      "Priority support",
      "Custom integrations",
    ],
  },
];

export const MARCO_PRICING: PricingTier[] = [
  {
    name: "Cross-Domain",
    price: "$499",
    period: "/month",
    description: "Marco for Law + Accounting combined",
    features: [
      "Legal research with citation verification",
      "Accounting and tax research",
      "Cross-domain queries",
      "Inline access across the platform",
      "Unlimited queries",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$999",
    period: "/month",
    description: "Marco + API access + white-label",
    features: [
      "Everything in Cross-Domain",
      "API access",
      "White-label options",
      "Priority support",
      "Custom data integrations",
      "Dedicated account manager",
    ],
  },
];

export const TIME_SAVINGS: TimeSaving[] = [
  {
    task: "Legal research (standard matter)",
    without: "4\u20136 hours",
    with: "20\u201340 minutes",
    saved: "4+ hours",
  },
  {
    task: "Document drafting (contract)",
    without: "3\u20134 hours",
    with: "30\u201360 minutes",
    saved: "3+ hours",
  },
  {
    task: "Trust account reconciliation",
    without: "2\u20133 hours/week",
    with: "Automated",
    saved: "2+ hours",
  },
  {
    task: "Court deadline calculation",
    without: "30\u201345 min per filing",
    with: "Instant",
    saved: "30+ min",
  },
  {
    task: "Tax research (complex matter)",
    without: "2\u20133 hours",
    with: "15\u201330 minutes",
    saved: "2+ hours",
  },
  {
    task: "Bank reconciliation (monthly)",
    without: "4\u20136 hours",
    with: "Automated",
    saved: "4+ hours",
  },
  {
    task: "Client status update calls",
    without: "30 min \u00d7 10 clients",
    with: "Portal self-serve",
    saved: "5 hours/week",
  },
  {
    task: "Invoice preparation",
    without: "1\u20132 hours/week",
    with: "Automated from time entries",
    saved: "1+ hour",
  },
];

export const AI_DISCLAIMER =
  "This content is generated by AI for research and informational purposes only. It does not constitute legal advice, tax advice, or professional advice of any kind. It does not create an attorney-client or accountant-client relationship. Always verify AI-generated content with a qualified professional before reliance. Marco Reid is a tool for professionals, not a substitute for professional judgment.";
