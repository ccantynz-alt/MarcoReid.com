import { Product, PricingTier, TimeSaving } from "./types";

export const BRAND = {
  name: "Marco Reid",
  tagline: "Professional intelligence \u2014 law and accounting",
  description:
    "The operating system for legal and accounting professionals. Every tool your firm needs, in one platform.",
  url: "https://marcoreid.com",
} as const;

export const NAV_LINKS = [
  { label: "Legal", href: "/law" },
  { label: "Accounting", href: "/accounting" },
  { label: "Courtroom", href: "/courtroom" },
  { label: "Marco", href: "/oracle" },
  { label: "Voice", href: "/dictation" },
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
    tagline: "AI-powered accounting for modern firms",
    description:
      "Automated bookkeeping, bank feed integration, tax compliance, and financial reporting \u2014 built for CPAs who demand precision and speed.",
    features: [
      "Automated bookkeeping and reconciliation",
      "Bank feed integration via Plaid",
      "Tax compliance \u2014 US federal and state",
      "Receipt and expense scanning",
      "AI-aware spreadsheets and financial modelling",
      "Engagement letters and document editor",
      "E-signature built in",
      "Client management and billing",
    ],
  },
  oracle: {
    name: "Marco",
    slug: "/oracle",
    tagline: "The greatest AI-generated mind for law and accountancy",
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

export const ORACLE_PRICING: PricingTier[] = [
  {
    name: "Cross-Domain",
    price: "$499",
    period: "/month",
    description: "Marco Law + Marco Accounting combined",
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
