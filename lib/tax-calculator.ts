// Tax Calculation Engines
// GST/VAT/Sales Tax, Income Tax, and Corporate Tax calculators
// for NZ, AU, UK, US, CA using 2024/2025 rates.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TaxResult {
  jurisdiction: string;
  taxType: string;
  grossAmount: number;
  taxAmount: number;
  netAmount: number;
  effectiveRate: number;
  breakdown: { bracket: string; rate: number; tax: number }[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function applyBrackets(
  amount: number,
  brackets: { min: number; max: number; rate: number; label: string }[],
): { total: number; breakdown: { bracket: string; rate: number; tax: number }[] } {
  let total = 0;
  const breakdown: { bracket: string; rate: number; tax: number }[] = [];
  for (const b of brackets) {
    if (amount <= b.min) break;
    const taxable = Math.min(amount, b.max) - b.min;
    const tax = round2(taxable * b.rate);
    total += tax;
    if (tax > 0 || b.rate === 0) {
      breakdown.push({ bracket: b.label, rate: b.rate, tax });
    }
  }
  return { total: round2(total), breakdown };
}

// ============================================================================
// GST / VAT / SALES TAX
// ============================================================================

// ---------------------------------------------------------------------------
// US State Sales Tax Table (all 50 states + DC)
// ---------------------------------------------------------------------------

export const US_STATE_SALES_TAX: Record<
  string,
  { state: string; rate: number; avgLocalRate: number; combinedRate: number }
> = {
  AL: { state: "Alabama", rate: 4.0, avgLocalRate: 5.24, combinedRate: 9.24 },
  AK: { state: "Alaska", rate: 0, avgLocalRate: 1.76, combinedRate: 1.76 },
  AZ: { state: "Arizona", rate: 5.6, avgLocalRate: 2.8, combinedRate: 8.4 },
  AR: { state: "Arkansas", rate: 6.5, avgLocalRate: 2.97, combinedRate: 9.47 },
  CA: { state: "California", rate: 7.25, avgLocalRate: 1.57, combinedRate: 8.82 },
  CO: { state: "Colorado", rate: 2.9, avgLocalRate: 4.89, combinedRate: 7.79 },
  CT: { state: "Connecticut", rate: 6.35, avgLocalRate: 0, combinedRate: 6.35 },
  DE: { state: "Delaware", rate: 0, avgLocalRate: 0, combinedRate: 0 },
  FL: { state: "Florida", rate: 6.0, avgLocalRate: 1.02, combinedRate: 7.02 },
  GA: { state: "Georgia", rate: 4.0, avgLocalRate: 3.38, combinedRate: 7.38 },
  HI: { state: "Hawaii", rate: 4.0, avgLocalRate: 0.44, combinedRate: 4.44 },
  ID: { state: "Idaho", rate: 6.0, avgLocalRate: 0.02, combinedRate: 6.02 },
  IL: { state: "Illinois", rate: 6.25, avgLocalRate: 2.58, combinedRate: 8.83 },
  IN: { state: "Indiana", rate: 7.0, avgLocalRate: 0, combinedRate: 7.0 },
  IA: { state: "Iowa", rate: 6.0, avgLocalRate: 0.94, combinedRate: 6.94 },
  KS: { state: "Kansas", rate: 6.5, avgLocalRate: 2.19, combinedRate: 8.69 },
  KY: { state: "Kentucky", rate: 6.0, avgLocalRate: 0, combinedRate: 6.0 },
  LA: { state: "Louisiana", rate: 4.45, avgLocalRate: 5.1, combinedRate: 9.55 },
  ME: { state: "Maine", rate: 5.5, avgLocalRate: 0, combinedRate: 5.5 },
  MD: { state: "Maryland", rate: 6.0, avgLocalRate: 0, combinedRate: 6.0 },
  MA: { state: "Massachusetts", rate: 6.25, avgLocalRate: 0, combinedRate: 6.25 },
  MI: { state: "Michigan", rate: 6.0, avgLocalRate: 0, combinedRate: 6.0 },
  MN: { state: "Minnesota", rate: 6.875, avgLocalRate: 0.66, combinedRate: 7.535 },
  MS: { state: "Mississippi", rate: 7.0, avgLocalRate: 0.07, combinedRate: 7.07 },
  MO: { state: "Missouri", rate: 4.225, avgLocalRate: 4.06, combinedRate: 8.285 },
  MT: { state: "Montana", rate: 0, avgLocalRate: 0, combinedRate: 0 },
  NE: { state: "Nebraska", rate: 5.5, avgLocalRate: 1.44, combinedRate: 6.94 },
  NV: { state: "Nevada", rate: 6.85, avgLocalRate: 1.38, combinedRate: 8.23 },
  NH: { state: "New Hampshire", rate: 0, avgLocalRate: 0, combinedRate: 0 },
  NJ: { state: "New Jersey", rate: 6.625, avgLocalRate: -0.03, combinedRate: 6.6 },
  NM: { state: "New Mexico", rate: 4.875, avgLocalRate: 2.72, combinedRate: 7.595 },
  NY: { state: "New York", rate: 4.0, avgLocalRate: 4.53, combinedRate: 8.53 },
  NC: { state: "North Carolina", rate: 4.75, avgLocalRate: 2.23, combinedRate: 6.98 },
  ND: { state: "North Dakota", rate: 5.0, avgLocalRate: 1.96, combinedRate: 6.96 },
  OH: { state: "Ohio", rate: 5.75, avgLocalRate: 1.49, combinedRate: 7.24 },
  OK: { state: "Oklahoma", rate: 4.5, avgLocalRate: 4.47, combinedRate: 8.97 },
  OR: { state: "Oregon", rate: 0, avgLocalRate: 0, combinedRate: 0 },
  PA: { state: "Pennsylvania", rate: 6.0, avgLocalRate: 0.34, combinedRate: 6.34 },
  RI: { state: "Rhode Island", rate: 7.0, avgLocalRate: 0, combinedRate: 7.0 },
  SC: { state: "South Carolina", rate: 6.0, avgLocalRate: 1.44, combinedRate: 7.44 },
  SD: { state: "South Dakota", rate: 4.2, avgLocalRate: 1.9, combinedRate: 6.1 },
  TN: { state: "Tennessee", rate: 7.0, avgLocalRate: 2.55, combinedRate: 9.55 },
  TX: { state: "Texas", rate: 6.25, avgLocalRate: 1.95, combinedRate: 8.2 },
  UT: { state: "Utah", rate: 6.1, avgLocalRate: 1.09, combinedRate: 7.19 },
  VT: { state: "Vermont", rate: 6.0, avgLocalRate: 0.24, combinedRate: 6.24 },
  VA: { state: "Virginia", rate: 5.3, avgLocalRate: 0.45, combinedRate: 5.75 },
  WA: { state: "Washington", rate: 6.5, avgLocalRate: 3.83, combinedRate: 10.33 },
  WV: { state: "West Virginia", rate: 6.0, avgLocalRate: 0.56, combinedRate: 6.56 },
  WI: { state: "Wisconsin", rate: 5.0, avgLocalRate: 0.44, combinedRate: 5.44 },
  WY: { state: "Wyoming", rate: 4.0, avgLocalRate: 1.36, combinedRate: 5.36 },
  DC: { state: "District of Columbia", rate: 6.0, avgLocalRate: 0, combinedRate: 6.0 },
};

// ---------------------------------------------------------------------------
// Canadian Provincial Tax Table
// ---------------------------------------------------------------------------

export const CA_PROVINCIAL_TAX: Record<
  string,
  { province: string; gstRate: number; pstRate: number; combinedRate: number; type: "HST" | "GST+PST" | "GST+QST" | "GST only" }
> = {
  AB: { province: "Alberta", gstRate: 5, pstRate: 0, combinedRate: 5, type: "GST only" },
  BC: { province: "British Columbia", gstRate: 5, pstRate: 7, combinedRate: 12, type: "GST+PST" },
  MB: { province: "Manitoba", gstRate: 5, pstRate: 7, combinedRate: 12, type: "GST+PST" },
  NB: { province: "New Brunswick", gstRate: 5, pstRate: 10, combinedRate: 15, type: "HST" },
  NL: { province: "Newfoundland and Labrador", gstRate: 5, pstRate: 10, combinedRate: 15, type: "HST" },
  NS: { province: "Nova Scotia", gstRate: 5, pstRate: 10, combinedRate: 15, type: "HST" },
  NT: { province: "Northwest Territories", gstRate: 5, pstRate: 0, combinedRate: 5, type: "GST only" },
  NU: { province: "Nunavut", gstRate: 5, pstRate: 0, combinedRate: 5, type: "GST only" },
  ON: { province: "Ontario", gstRate: 5, pstRate: 8, combinedRate: 13, type: "HST" },
  PE: { province: "Prince Edward Island", gstRate: 5, pstRate: 10, combinedRate: 15, type: "HST" },
  QC: { province: "Quebec", gstRate: 5, pstRate: 9.975, combinedRate: 14.975, type: "GST+QST" },
  SK: { province: "Saskatchewan", gstRate: 5, pstRate: 6, combinedRate: 11, type: "GST+PST" },
  YT: { province: "Yukon", gstRate: 5, pstRate: 0, combinedRate: 5, type: "GST only" },
};

// ---------------------------------------------------------------------------
// GST/VAT Rates by Jurisdiction
// ---------------------------------------------------------------------------

const GST_RATES: Record<string, Record<string, number>> = {
  NZ: { standard: 0.15, reduced: 0.15, zero: 0 },
  AU: { standard: 0.10, reduced: 0.10, zero: 0 },
  UK: { standard: 0.20, reduced: 0.05, zero: 0 },
  US: { standard: 0.085, reduced: 0.085, zero: 0 }, // Average combined rate
  CA: { standard: 0.05, reduced: 0.05, zero: 0 },   // Federal GST only
};

const GST_LABELS: Record<string, string> = {
  NZ: "GST",
  AU: "GST",
  UK: "VAT",
  US: "Sales Tax",
  CA: "GST",
};

const GST_RATE_DESCRIPTIONS: Record<string, Record<string, string>> = {
  NZ: {
    standard: "Standard rate (15%)",
    zero: "Exempt (financial services, residential rent, some food)",
  },
  AU: {
    standard: "Standard rate (10%)",
    zero: "GST-free (fresh food, health, education)",
  },
  UK: {
    standard: "Standard rate (20%)",
    reduced: "Reduced rate (5% - home energy, children's car seats)",
    zero: "Zero-rated (food, books, children's clothing)",
  },
  US: {
    standard: "Average combined state+local (~8.5%)",
    zero: "Exempt",
  },
  CA: {
    standard: "Federal GST (5%)",
    zero: "Exempt",
  },
};

export function calculateGST(params: {
  jurisdiction: string;
  amount: number;
  inclusive: boolean;
  rate?: "standard" | "reduced" | "zero";
}): TaxResult {
  const { jurisdiction, amount, inclusive, rate = "standard" } = params;
  const code = jurisdiction.toUpperCase();

  const rates = GST_RATES[code];
  if (!rates) {
    throw new Error(`Unsupported jurisdiction: "${jurisdiction}". Supported: NZ, AU, UK, US, CA`);
  }

  const taxRate = rates[rate] ?? rates.standard;
  const taxLabel = GST_LABELS[code] ?? "Tax";
  const rateDesc = GST_RATE_DESCRIPTIONS[code]?.[rate] ?? `${rate} rate`;

  let grossAmount: number;
  let taxAmount: number;
  let netAmount: number;

  if (inclusive) {
    // Amount includes tax
    grossAmount = round2(amount);
    taxAmount = round2(amount - amount / (1 + taxRate));
    netAmount = round2(amount - taxAmount);
  } else {
    // Amount excludes tax
    netAmount = round2(amount);
    taxAmount = round2(amount * taxRate);
    grossAmount = round2(amount + taxAmount);
  }

  return {
    jurisdiction: code,
    taxType: taxLabel,
    grossAmount,
    taxAmount,
    netAmount,
    effectiveRate: grossAmount > 0 ? round2((taxAmount / netAmount) * 100) / 100 : 0,
    breakdown: [
      { bracket: rateDesc, rate: taxRate, tax: taxAmount },
    ],
  };
}

// ============================================================================
// INCOME TAX
// ============================================================================

// ---------------------------------------------------------------------------
// NZ Individual Income Tax
// ---------------------------------------------------------------------------

const NZ_INCOME_BRACKETS = [
  { min: 0, max: 14_000, rate: 0.105, label: "$0 - $14,000" },
  { min: 14_000, max: 48_000, rate: 0.175, label: "$14,001 - $48,000" },
  { min: 48_000, max: 70_000, rate: 0.30, label: "$48,001 - $70,000" },
  { min: 70_000, max: 180_000, rate: 0.33, label: "$70,001 - $180,000" },
  { min: 180_000, max: Infinity, rate: 0.39, label: "$180,001+" },
];

// ---------------------------------------------------------------------------
// AU Individual Income Tax
// ---------------------------------------------------------------------------

const AU_INCOME_BRACKETS = [
  { min: 0, max: 18_200, rate: 0, label: "$0 - $18,200 (tax-free)" },
  { min: 18_200, max: 45_000, rate: 0.16, label: "$18,201 - $45,000" },
  { min: 45_000, max: 135_000, rate: 0.30, label: "$45,001 - $135,000" },
  { min: 135_000, max: 190_000, rate: 0.37, label: "$135,001 - $190,000" },
  { min: 190_000, max: Infinity, rate: 0.45, label: "$190,001+" },
];

const AU_MEDICARE_LEVY = 0.02;

// ---------------------------------------------------------------------------
// UK Individual Income Tax
// ---------------------------------------------------------------------------

const UK_INCOME_BRACKETS = [
  { min: 0, max: 12_570, rate: 0, label: "Personal allowance (0 - 12,570)" },
  { min: 12_570, max: 50_270, rate: 0.20, label: "Basic rate (12,571 - 50,270)" },
  { min: 50_270, max: 125_140, rate: 0.40, label: "Higher rate (50,271 - 125,140)" },
  { min: 125_140, max: Infinity, rate: 0.45, label: "Additional rate (125,141+)" },
];

// ---------------------------------------------------------------------------
// US Individual Income Tax (2024, federal only)
// ---------------------------------------------------------------------------

const US_INCOME_BRACKETS_SINGLE = [
  { min: 0, max: 11_600, rate: 0.10, label: "$0 - $11,600" },
  { min: 11_600, max: 47_150, rate: 0.12, label: "$11,601 - $47,150" },
  { min: 47_150, max: 100_525, rate: 0.22, label: "$47,151 - $100,525" },
  { min: 100_525, max: 191_950, rate: 0.24, label: "$100,526 - $191,950" },
  { min: 191_950, max: 243_725, rate: 0.32, label: "$191,951 - $243,725" },
  { min: 243_725, max: 609_350, rate: 0.35, label: "$243,726 - $609,350" },
  { min: 609_350, max: Infinity, rate: 0.37, label: "$609,351+" },
];

const US_INCOME_BRACKETS_MARRIED = [
  { min: 0, max: 23_200, rate: 0.10, label: "$0 - $23,200" },
  { min: 23_200, max: 94_300, rate: 0.12, label: "$23,201 - $94,300" },
  { min: 94_300, max: 201_050, rate: 0.22, label: "$94,301 - $201,050" },
  { min: 201_050, max: 383_900, rate: 0.24, label: "$201,051 - $383,900" },
  { min: 383_900, max: 487_450, rate: 0.32, label: "$383,901 - $487,450" },
  { min: 487_450, max: 731_200, rate: 0.35, label: "$487,451 - $731,200" },
  { min: 731_200, max: Infinity, rate: 0.37, label: "$731,201+" },
];

const US_STANDARD_DEDUCTION_SINGLE = 14_600;
const US_STANDARD_DEDUCTION_MARRIED = 29_200;

// ---------------------------------------------------------------------------
// CA Individual Income Tax (2024, federal only)
// ---------------------------------------------------------------------------

const CA_INCOME_BRACKETS = [
  { min: 0, max: 55_867, rate: 0.15, label: "$0 - $55,867" },
  { min: 55_867, max: 111_733, rate: 0.205, label: "$55,868 - $111,733" },
  { min: 111_733, max: 154_906, rate: 0.26, label: "$111,734 - $154,906" },
  { min: 154_906, max: 220_000, rate: 0.29, label: "$154,907 - $220,000" },
  { min: 220_000, max: Infinity, rate: 0.33, label: "$220,001+" },
];

const CA_BASIC_PERSONAL_AMOUNT = 15_705;

export function calculateIncomeTax(params: {
  jurisdiction: string;
  annualIncome: number;
  filingStatus?: "single" | "married";
}): TaxResult {
  const { jurisdiction, annualIncome, filingStatus = "single" } = params;
  const code = jurisdiction.toUpperCase();

  let result: { total: number; breakdown: { bracket: string; rate: number; tax: number }[] };
  let extraBreakdown: { bracket: string; rate: number; tax: number }[] = [];
  let taxType = "Income Tax";

  switch (code) {
    case "NZ": {
      result = applyBrackets(annualIncome, NZ_INCOME_BRACKETS);
      taxType = "PAYE Income Tax";
      break;
    }
    case "AU": {
      result = applyBrackets(annualIncome, AU_INCOME_BRACKETS);
      const medicareTax = round2(annualIncome * AU_MEDICARE_LEVY);
      extraBreakdown = [{ bracket: "Medicare levy (2%)", rate: AU_MEDICARE_LEVY, tax: medicareTax }];
      result.total = round2(result.total + medicareTax);
      taxType = "Income Tax + Medicare";
      break;
    }
    case "UK": {
      result = applyBrackets(annualIncome, UK_INCOME_BRACKETS);
      taxType = "Income Tax";
      break;
    }
    case "US": {
      const stdDed = filingStatus === "married" ? US_STANDARD_DEDUCTION_MARRIED : US_STANDARD_DEDUCTION_SINGLE;
      const taxableIncome = Math.max(0, annualIncome - stdDed);
      const brackets = filingStatus === "married" ? US_INCOME_BRACKETS_MARRIED : US_INCOME_BRACKETS_SINGLE;
      result = applyBrackets(taxableIncome, brackets);
      const dedLabel = `Standard deduction: -$${stdDed.toLocaleString()} (${filingStatus})`;
      result.breakdown.unshift({ bracket: dedLabel, rate: 0, tax: 0 });
      taxType = `Federal Income Tax (${filingStatus})`;
      break;
    }
    case "CA": {
      result = applyBrackets(annualIncome, CA_INCOME_BRACKETS);
      const bpaCredit = round2(CA_BASIC_PERSONAL_AMOUNT * 0.15);
      result.total = round2(Math.max(0, result.total - bpaCredit));
      extraBreakdown = [{ bracket: `Basic Personal Amount credit (-$${bpaCredit.toLocaleString()})`, rate: -0.15, tax: -bpaCredit }];
      taxType = "Federal Income Tax";
      break;
    }
    default:
      throw new Error(`Unsupported jurisdiction: "${jurisdiction}". Supported: NZ, AU, UK, US, CA`);
  }

  const allBreakdown = [...result.breakdown, ...extraBreakdown];
  const taxAmount = result.total;

  return {
    jurisdiction: code,
    taxType,
    grossAmount: round2(annualIncome),
    taxAmount,
    netAmount: round2(annualIncome - taxAmount),
    effectiveRate: annualIncome > 0 ? round2((taxAmount / annualIncome) * 10000) / 10000 : 0,
    breakdown: allBreakdown,
  };
}

// ============================================================================
// CORPORATE TAX
// ============================================================================

export function calculateCorporateTax(params: {
  jurisdiction: string;
  taxableProfit: number;
  isSmallBusiness?: boolean;
}): TaxResult {
  const { jurisdiction, taxableProfit, isSmallBusiness = false } = params;
  const code = jurisdiction.toUpperCase();

  let taxAmount: number;
  let breakdown: { bracket: string; rate: number; tax: number }[] = [];
  let taxType = "Corporate Tax";

  switch (code) {
    case "NZ": {
      const rate = 0.28;
      taxAmount = round2(taxableProfit * rate);
      breakdown = [{ bracket: "Standard rate (28%)", rate, tax: taxAmount }];
      taxType = "Corporate Income Tax";
      break;
    }
    case "AU": {
      if (isSmallBusiness) {
        // Base rate entity: turnover < $50M
        const rate = 0.25;
        taxAmount = round2(taxableProfit * rate);
        breakdown = [{ bracket: "Base rate entity (25%)", rate, tax: taxAmount }];
      } else {
        const rate = 0.30;
        taxAmount = round2(taxableProfit * rate);
        breakdown = [{ bracket: "Standard rate (30%)", rate, tax: taxAmount }];
      }
      taxType = "Company Tax";
      break;
    }
    case "UK": {
      if (taxableProfit <= 50_000) {
        // Small profits rate
        const rate = 0.19;
        taxAmount = round2(taxableProfit * rate);
        breakdown = [{ bracket: "Small profits rate (19%)", rate, tax: taxAmount }];
      } else if (taxableProfit <= 250_000) {
        // Marginal relief
        const mainTax = round2(taxableProfit * 0.25);
        const marginalRelief = round2((250_000 - taxableProfit) * (3 / 200));
        taxAmount = round2(mainTax - marginalRelief);
        breakdown = [
          { bracket: "Main rate (25%)", rate: 0.25, tax: mainTax },
          { bracket: "Marginal relief", rate: -0.015, tax: -marginalRelief },
        ];
      } else {
        const rate = 0.25;
        taxAmount = round2(taxableProfit * rate);
        breakdown = [{ bracket: "Main rate (25%)", rate, tax: taxAmount }];
      }
      taxType = "Corporation Tax";
      break;
    }
    case "US": {
      const rate = 0.21;
      taxAmount = round2(taxableProfit * rate);
      breakdown = [{ bracket: "Federal flat rate (21%)", rate, tax: taxAmount }];
      taxType = "Federal Corporate Income Tax";
      break;
    }
    case "CA": {
      if (isSmallBusiness) {
        // Small business deduction: federal 9% + avg provincial ~2.5% = ~11.5%
        const fedRate = 0.09;
        const provRate = 0.025;
        const fedTax = round2(taxableProfit * fedRate);
        const provTax = round2(taxableProfit * provRate);
        taxAmount = round2(fedTax + provTax);
        breakdown = [
          { bracket: "Federal small business rate (9%)", rate: fedRate, tax: fedTax },
          { bracket: "Average provincial (~2.5%)", rate: provRate, tax: provTax },
        ];
      } else {
        const fedRate = 0.15;
        const provRate = 0.115; // Average provincial ~11.5% for general rate
        const fedTax = round2(taxableProfit * fedRate);
        const provTax = round2(taxableProfit * provRate);
        taxAmount = round2(fedTax + provTax);
        breakdown = [
          { bracket: "Federal general rate (15%)", rate: fedRate, tax: fedTax },
          { bracket: "Average provincial (~11.5%)", rate: provRate, tax: provTax },
        ];
      }
      taxType = "Corporate Income Tax (Federal + Provincial avg)";
      break;
    }
    default:
      throw new Error(`Unsupported jurisdiction: "${jurisdiction}". Supported: NZ, AU, UK, US, CA`);
  }

  return {
    jurisdiction: code,
    taxType,
    grossAmount: round2(taxableProfit),
    taxAmount,
    netAmount: round2(taxableProfit - taxAmount),
    effectiveRate: taxableProfit > 0 ? round2((taxAmount / taxableProfit) * 10000) / 10000 : 0,
    breakdown,
  };
}

// ---------------------------------------------------------------------------
// Jurisdiction display info (reusable)
// ---------------------------------------------------------------------------

export const TAX_JURISDICTIONS = [
  { code: "NZ", name: "New Zealand", currency: "NZD", symbol: "$", flag: "\u{1F1F3}\u{1F1FF}" },
  { code: "AU", name: "Australia", currency: "AUD", symbol: "$", flag: "\u{1F1E6}\u{1F1FA}" },
  { code: "UK", name: "United Kingdom", currency: "GBP", symbol: "£", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "US", name: "United States", currency: "USD", symbol: "$", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "$", flag: "\u{1F1E8}\u{1F1E6}" },
] as const;
