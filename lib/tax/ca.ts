// Canada Tax & Payroll Module
// Isolated per-country module — no imports from other country files.
// Federal brackets, CPP, EI, provincial GST/HST/PST rates.

export const LAST_UPDATED = "2025-01-01";
export const TAX_YEAR = "2024-2025";
export const JURISDICTION = "CA";
export const CURRENCY = { code: "CAD", symbol: "$" };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CAPayrollResult {
  grossPay: number;
  incomeTax: number;
  employeeDeductions: { name: string; amount: number }[];
  employerCosts: { name: string; amount: number }[];
  netPay: number;
  totalEmployerCost: number;
}

export type PayFrequency = "weekly" | "fortnightly" | "monthly";

// ---------------------------------------------------------------------------
// Rate Constants
// ---------------------------------------------------------------------------

export const FEDERAL_BRACKETS = [
  { min: 0, max: 55_867, rate: 0.15 },
  { min: 55_867, max: 111_733, rate: 0.205 },
  { min: 111_733, max: 154_906, rate: 0.26 },
  { min: 154_906, max: 220_000, rate: 0.29 },
  { min: 220_000, max: Infinity, rate: 0.33 },
] as const;

export const BASIC_PERSONAL_AMOUNT = 15_705; // 2024 federal BPA
export const CPP_RATE = 0.0595;
export const CPP_BASIC_EXEMPTION = 3_500;
export const CPP_MAX_PENSIONABLE = 68_500;
export const EI_EMPLOYEE_RATE = 0.0166;
export const EI_MAX_INSURABLE = 63_200;
export const EI_EMPLOYER_MULTIPLIER = 1.4;

export const FEDERAL_GST_RATE = 0.05;

// Corporate tax
export const CORPORATE_TAX_FEDERAL_GENERAL = 0.15;
export const CORPORATE_TAX_FEDERAL_SMALL_BUSINESS = 0.09;
export const CORPORATE_TAX_AVG_PROVINCIAL_GENERAL = 0.115;
export const CORPORATE_TAX_AVG_PROVINCIAL_SMALL = 0.025;

export const INCOME_TAX_BRACKETS = [
  { min: 0, max: 55_867, rate: 0.15, label: "$0 - $55,867" },
  { min: 55_867, max: 111_733, rate: 0.205, label: "$55,868 - $111,733" },
  { min: 111_733, max: 154_906, rate: 0.26, label: "$111,734 - $154,906" },
  { min: 154_906, max: 220_000, rate: 0.29, label: "$154,907 - $220,000" },
  { min: 220_000, max: Infinity, rate: 0.33, label: "$220,001+" },
] as const;

// Provincial tax table (GST/HST/PST)
export const PROVINCIAL_TAX: Record<
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
// Helpers (self-contained — no shared imports)
// ---------------------------------------------------------------------------

function periodsPerYear(freq: PayFrequency): number {
  switch (freq) {
    case "weekly":
      return 52;
    case "fortnightly":
      return 26;
    case "monthly":
      return 12;
  }
}

function applyBrackets(
  annual: number,
  brackets: ReadonlyArray<{ min: number; max: number; rate: number }>,
): number {
  let tax = 0;
  for (const b of brackets) {
    if (annual <= b.min) break;
    const taxable = Math.min(annual, b.max) - b.min;
    tax += taxable * b.rate;
  }
  return tax;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ---------------------------------------------------------------------------
// Payroll Calculator
// ---------------------------------------------------------------------------

export function calculatePayroll(
  annualSalary: number,
  frequency: PayFrequency,
): CAPayrollResult {
  const periods = periodsPerYear(frequency);

  // Federal income tax (with basic personal amount credit)
  const annualFederalTax = Math.max(
    0,
    applyBrackets(annualSalary, FEDERAL_BRACKETS) - BASIC_PERSONAL_AMOUNT * 0.15,
  );

  // CPP (employee)
  const cppEarnings = Math.min(annualSalary, CPP_MAX_PENSIONABLE) - CPP_BASIC_EXEMPTION;
  const annualCPPEmployee = Math.max(0, cppEarnings) * CPP_RATE;

  // CPP (employer) - same rate
  const annualCPPEmployer = annualCPPEmployee;

  // EI (employee)
  const eiEarnings = Math.min(annualSalary, EI_MAX_INSURABLE);
  const annualEIEmployee = eiEarnings * EI_EMPLOYEE_RATE;

  // EI (employer) = 1.4x employee
  const annualEIEmployer = annualEIEmployee * EI_EMPLOYER_MULTIPLIER;

  const grossPay = round2(annualSalary / periods);
  const incomeTax = round2(annualFederalTax / periods);

  const employeeDeductions = [
    { name: "Federal income tax", amount: round2(annualFederalTax / periods) },
    { name: "CPP (5.95%)", amount: round2(annualCPPEmployee / periods) },
    { name: "EI (1.66%)", amount: round2(annualEIEmployee / periods) },
  ];

  const employerCosts = [
    { name: "CPP employer (5.95%)", amount: round2(annualCPPEmployer / periods) },
    { name: "EI employer (2.324%)", amount: round2(annualEIEmployer / periods) },
  ];

  const totalDeductions = employeeDeductions.reduce((s, d) => s + d.amount, 0);
  const netPay = round2(grossPay - totalDeductions);
  const totalEmployerCost = round2(grossPay + employerCosts.reduce((s, c) => s + c.amount, 0));

  return { grossPay, incomeTax, employeeDeductions, employerCosts, netPay, totalEmployerCost };
}

// ---------------------------------------------------------------------------
// GST Calculator (federal GST or provincial combined rate)
// ---------------------------------------------------------------------------

export function calculateGST(
  amount: number,
  inclusive: boolean,
  provinceCode?: string,
): { gross: number; tax: number; net: number; rate: number } {
  const rate = provinceCode
    ? (PROVINCIAL_TAX[provinceCode.toUpperCase()]?.combinedRate ?? FEDERAL_GST_RATE * 100) / 100
    : FEDERAL_GST_RATE;

  if (inclusive) {
    const gross = round2(amount);
    const tax = round2(amount - amount / (1 + rate));
    const net = round2(amount - tax);
    return { gross, tax, net, rate };
  }
  const net = round2(amount);
  const tax = round2(amount * rate);
  const gross = round2(amount + tax);
  return { gross, tax, net, rate };
}

// ---------------------------------------------------------------------------
// Income Tax Calculator
// ---------------------------------------------------------------------------

export function calculateIncomeTax(
  income: number,
): { tax: number; effectiveRate: number; breakdown: { bracket: string; rate: number; tax: number }[] } {
  const breakdown: { bracket: string; rate: number; tax: number }[] = [];
  let totalTax = 0;

  for (const b of INCOME_TAX_BRACKETS) {
    if (income <= b.min) break;
    const taxable = Math.min(income, b.max) - b.min;
    const tax = round2(taxable * b.rate);
    totalTax += tax;
    if (tax > 0) {
      breakdown.push({ bracket: b.label, rate: b.rate, tax });
    }
  }

  // Basic Personal Amount credit
  const bpaCredit = round2(BASIC_PERSONAL_AMOUNT * 0.15);
  totalTax = round2(Math.max(0, totalTax - bpaCredit));
  breakdown.push({
    bracket: `Basic Personal Amount credit (-$${bpaCredit.toLocaleString()})`,
    rate: -0.15,
    tax: -bpaCredit,
  });

  const effectiveRate = income > 0 ? round2((totalTax / income) * 10000) / 10000 : 0;

  return { tax: totalTax, effectiveRate, breakdown };
}
