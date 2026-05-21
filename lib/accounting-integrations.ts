export interface AccountingIntegration {
  slug: string;
  name: string;
  category: "accounting-software" | "tax-filing" | "payroll" | "bank-feeds" | "receipt-capture" | "practice-management" | "document-management" | "client-portal" | "time-tracking" | "reporting" | "compliance" | "payments";
  description: string;
  competitors: string[]; // What it replaces
  status: "built-in" | "integrates" | "replaces" | "coming-soon";
  countries: string[];
  monthlyPrice?: string; // What competitors charge
  marcoReidIncluded: boolean; // Is this included in Marco Reid's price?
}

export const ACCOUNTING_INTEGRATIONS: AccountingIntegration[] = [
  // ACCOUNTING SOFTWARE — WE REPLACE THESE
  { slug: "general-ledger", name: "General Ledger & Chart of Accounts", category: "accounting-software", description: "Full double-entry accounting with jurisdiction-aware chart of accounts templates for NZ, AU, UK, US, CA, IE, SG.", competitors: ["Xero", "QuickBooks", "MYOB", "Sage", "FreshBooks", "Wave"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$25-75/mo each", marcoReidIncluded: true },
  { slug: "accounts-receivable", name: "Accounts Receivable & Invoicing", category: "accounting-software", description: "Professional invoicing, payment tracking, aged debtors, automatic reminders, and online payment acceptance.", competitors: ["Xero Invoicing", "QuickBooks Invoicing", "FreshBooks", "Harvest"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$15-50/mo each", marcoReidIncluded: true },
  { slug: "accounts-payable", name: "Accounts Payable & Bill Management", category: "accounting-software", description: "Track supplier invoices, approve payments, manage cash flow, and automate bill payments.", competitors: ["Xero Bills", "QuickBooks Bills", "Plooto", "Melio"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$15-40/mo each", marcoReidIncluded: true },
  { slug: "bank-reconciliation", name: "AI Bank Reconciliation", category: "bank-feeds", description: "Automatic bank feed import, AI-powered transaction matching, and one-click reconciliation. Learns your patterns.", competitors: ["Xero Bank Feeds", "QuickBooks Bank Feeds", "Yodlee", "MX"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "Included in Xero/QB", marcoReidIncluded: true },
  { slug: "fixed-assets", name: "Fixed Asset Register & Depreciation", category: "accounting-software", description: "Track fixed assets, calculate depreciation using jurisdiction-correct methods (DV, SL, pooling), and generate schedules.", competitors: ["Xero Assets", "MYOB Assets", "Asset Panda"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], marcoReidIncluded: true },

  // TAX FILING — WE REPLACE THESE
  { slug: "gst-vat-filing", name: "GST / VAT / Sales Tax Filing", category: "tax-filing", description: "Prepare, review, and e-file GST/VAT/sales tax returns directly to IR, ATO, HMRC, IRAS, CRA, Revenue.", competitors: ["Xero Tax", "TaxCalc", "Avalara", "Vertex", "TaxJar"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$20-200/mo each", marcoReidIncluded: true },
  { slug: "income-tax-filing", name: "Income Tax Return Preparation", category: "tax-filing", description: "Individual and corporate tax return preparation with jurisdiction-specific forms, calculations, and e-filing.", competitors: ["Lacerte", "ProConnect", "TaxCalc", "Xero Tax", "Drake", "CCH iFirm", "Thomson Reuters UltraTax"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$50-500/mo each", marcoReidIncluded: true },
  { slug: "provisional-tax", name: "Provisional & Estimated Tax Management", category: "tax-filing", description: "Calculate, track, and optimise provisional tax (NZ), estimated tax (US), PAYG instalments (AU), and payments on account (UK).", competitors: ["Manual spreadsheets"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE"], marcoReidIncluded: true },

  // PAYROLL — WE REPLACE THESE
  { slug: "payroll-processing", name: "Multi-Jurisdiction Payroll", category: "payroll", description: "Process payroll across NZ, AU, UK, US, CA with automatic tax calculation, leave tracking, and direct filing to tax authorities.", competitors: ["iPayroll (NZ)", "PaySauce (NZ)", "KeyPay (AU)", "Gusto (US)", "ADP", "Paychex", "BrightPay (UK)", "Sage Payroll"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$40-200/mo each", marcoReidIncluded: true },
  { slug: "leave-management", name: "Leave & Holiday Tracking", category: "payroll", description: "Track annual leave, sick leave, public holidays by jurisdiction, and calculate entitlements automatically.", competitors: ["Employment Hero", "BambooHR", "Deputy", "Tanda"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], marcoReidIncluded: true },

  // RECEIPT & EXPENSE — WE REPLACE THESE
  { slug: "receipt-capture", name: "AI Receipt & Expense Capture", category: "receipt-capture", description: "Photo a receipt, AI extracts the data, creates the journal entry, and files it to the correct expense account. 3 seconds.", competitors: ["Dext (Receipt Bank)", "Hubdoc", "AutoEntry", "Expensify"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$20-60/mo each", marcoReidIncluded: true },

  // PRACTICE MANAGEMENT — WE REPLACE THESE
  { slug: "client-management", name: "Accounting Client Management (CRM)", category: "practice-management", description: "Full client database, engagement tracking, AML/KYC verification, and client health scoring.", competitors: ["Karbon", "Canopy", "TaxDome", "Jetpack Workflow", "Financial Cents"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$30-70/mo/user each", marcoReidIncluded: true },
  { slug: "workflow-management", name: "Accounting Workflow Automation", category: "practice-management", description: "Automate recurring workflows: month-end close, tax season, BAS lodgement, annual accounts. Template library included.", competitors: ["Karbon", "Jetpack Workflow", "Financial Cents", "Ignition"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$30-60/mo/user each", marcoReidIncluded: true },
  { slug: "engagement-letters", name: "Engagement Letters & Proposals", category: "practice-management", description: "Generate jurisdiction-compliant engagement letters, fee proposals, and service agreements with e-signature.", competitors: ["Ignition (Practice Ignition)", "GoProposal", "Proposify"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$60-120/mo each", marcoReidIncluded: true },

  // CLIENT PORTAL — WE REPLACE THESE
  { slug: "client-portal", name: "Secure Client Portal", category: "client-portal", description: "Clients upload documents, view their accounts, communicate securely, and approve filings — all in one place.", competitors: ["TaxDome", "Canopy", "SmartVault", "Liscio"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$30-80/mo each", marcoReidIncluded: true },

  // TIME TRACKING — WE REPLACE THESE
  { slug: "time-billing", name: "Time Tracking & Billing", category: "time-tracking", description: "Track time by client and task, generate invoices from time entries, and analyse team utilisation.", competitors: ["TSheets", "Clockify", "Harvest", "Toggl", "Practice Ignition"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$10-30/mo/user each", marcoReidIncluded: true },

  // REPORTING — WE REPLACE THESE
  { slug: "financial-reporting", name: "Financial Reporting & Dashboards", category: "reporting", description: "Real-time P&L, balance sheet, cash flow, aged debtors/creditors, and custom KPI dashboards.", competitors: ["Fathom", "Spotlight Reporting", "Futrli", "LivePlan", "Syft Analytics"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$30-80/mo each", marcoReidIncluded: true },
  { slug: "management-reporting", name: "Management Reporting Packs", category: "reporting", description: "Automated monthly management report packs with commentary, variance analysis, and board-ready formatting.", competitors: ["Spotlight Reporting", "Fathom", "Reach Reporting"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$40-100/mo each", marcoReidIncluded: true },

  // COMPLIANCE — WE REPLACE THESE
  { slug: "aml-compliance", name: "AML/KYC Compliance", category: "compliance", description: "Automated client verification, risk assessment, PEP screening, and ongoing monitoring.", competitors: ["First AML", "ComplyAdvantage", "Onfido", "Sumsub"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], monthlyPrice: "$50-200/mo each", marcoReidIncluded: true },
  { slug: "audit-trail", name: "Immutable Audit Trail", category: "compliance", description: "SHA-256 hash-chained audit log of every action. Court-admissible. Per-client isolation.", competitors: ["Nobody has this"], status: "built-in", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], marcoReidIncluded: true },

  // PAYMENTS — WE INTEGRATE THESE
  { slug: "payment-processing", name: "Payment Processing", category: "payments", description: "Accept client payments online via credit card, bank transfer, and digital wallets.", competitors: ["Stripe", "GoCardless", "Pinch Payments", "Square"], status: "integrates", countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], marcoReidIncluded: true },
];

export function getIntegrationsByCategory(category: AccountingIntegration["category"]): AccountingIntegration[] {
  return ACCOUNTING_INTEGRATIONS.filter(i => i.category === category);
}

export function getReplacedProducts(): string[] {
  const all = new Set<string>();
  ACCOUNTING_INTEGRATIONS.forEach(i => i.competitors.forEach(c => all.add(c)));
  return Array.from(all).sort();
}

export function calculateSavings(): { toolsReplaced: number; estimatedMonthlySaving: string; products: string[] } {
  const products = getReplacedProducts();
  return {
    toolsReplaced: products.length,
    estimatedMonthlySaving: "$500-$2,000+",
    products,
  };
}

export const INTEGRATION_CATEGORIES = [
  { slug: "accounting-software", name: "Core Accounting", description: "General ledger, AR, AP, fixed assets" },
  { slug: "tax-filing", name: "Tax Filing", description: "GST/VAT, income tax, provisional tax" },
  { slug: "payroll", name: "Payroll & Leave", description: "Multi-jurisdiction payroll processing" },
  { slug: "bank-feeds", name: "Bank Feeds", description: "Automatic bank transaction import" },
  { slug: "receipt-capture", name: "Receipt Capture", description: "AI-powered expense management" },
  { slug: "practice-management", name: "Practice Management", description: "CRM, workflows, engagement letters" },
  { slug: "client-portal", name: "Client Portal", description: "Secure client communication" },
  { slug: "time-tracking", name: "Time & Billing", description: "Time tracking and invoicing" },
  { slug: "reporting", name: "Reporting & Analytics", description: "Financial dashboards and management packs" },
  { slug: "compliance", name: "Compliance", description: "AML/KYC and audit trail" },
  { slug: "payments", name: "Payments", description: "Online payment processing" },
] as const;
