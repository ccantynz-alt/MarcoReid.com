// United States Tax & Payroll Module
// Isolated per-country module — no imports from other country files.
// Federal brackets, Social Security, Medicare, FUTA, state sales tax table.

export const LAST_UPDATED = "2025-01-01";
export const TAX_YEAR = "2024-2025";
export const JURISDICTION = "US";
export const CURRENCY = { code: "USD", symbol: "$" };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface USPayrollResult {
  grossPay: number;
  incomeTax: number;
  employeeDeductions: { name: string; amount: number }[];
  employerCosts: { name: string; amount: number }[];
  netPay: number;
  totalEmployerCost: number;
}

export type PayFrequency = "weekly" | "fortnightly" | "monthly";

export interface USPayrollOptions {
  filingStatus?: "single" | "married";
}

// ---------------------------------------------------------------------------
// Rate Constants
// ---------------------------------------------------------------------------

export const FEDERAL_BRACKETS_SINGLE = [
  { min: 0, max: 11_600, rate: 0.10 },
  { min: 11_600, max: 47_150, rate: 0.12 },
  { min: 47_150, max: 100_525, rate: 0.22 },
  { min: 100_525, max: 191_950, rate: 0.24 },
  { min: 191_950, max: 243_725, rate: 0.32 },
  { min: 243_725, max: 609_350, rate: 0.35 },
  { min: 609_350, max: Infinity, rate: 0.37 },
] as const;

export const FEDERAL_BRACKETS_MARRIED = [
  { min: 0, max: 23_200, rate: 0.10 },
  { min: 23_200, max: 94_300, rate: 0.12 },
  { min: 94_300, max: 201_050, rate: 0.22 },
  { min: 201_050, max: 383_900, rate: 0.24 },
  { min: 383_900, max: 487_450, rate: 0.32 },
  { min: 487_450, max: 731_200, rate: 0.35 },
  { min: 731_200, max: Infinity, rate: 0.37 },
] as const;

export const STANDARD_DEDUCTION_SINGLE = 14_600;
export const STANDARD_DEDUCTION_MARRIED = 29_200;

export const SS_RATE = 0.062;
export const SS_WAGE_CAP = 168_600;
export const MEDICARE_RATE = 0.0145;
export const MEDICARE_ADDITIONAL_THRESHOLD = 200_000;
export const MEDICARE_ADDITIONAL_RATE = 0.009;
export const FUTA_RATE = 0.006; // Effective rate after state credit
export const FUTA_WAGE_CAP = 7_000;

export const CORPORATE_TAX_RATE = 0.21; // Federal flat rate

export const INCOME_TAX_BRACKETS_SINGLE = [
  { min: 0, max: 11_600, rate: 0.10, label: "$0 - $11,600" },
  { min: 11_600, max: 47_150, rate: 0.12, label: "$11,601 - $47,150" },
  { min: 47_150, max: 100_525, rate: 0.22, label: "$47,151 - $100,525" },
  { min: 100_525, max: 191_950, rate: 0.24, label: "$100,526 - $191,950" },
  { min: 191_950, max: 243_725, rate: 0.32, label: "$191,951 - $243,725" },
  { min: 243_725, max: 609_350, rate: 0.35, label: "$243,726 - $609,350" },
  { min: 609_350, max: Infinity, rate: 0.37, label: "$609,351+" },
] as const;

export const INCOME_TAX_BRACKETS_MARRIED = [
  { min: 0, max: 23_200, rate: 0.10, label: "$0 - $23,200" },
  { min: 23_200, max: 94_300, rate: 0.12, label: "$23,201 - $94,300" },
  { min: 94_300, max: 201_050, rate: 0.22, label: "$94,301 - $201,050" },
  { min: 201_050, max: 383_900, rate: 0.24, label: "$201,051 - $383,900" },
  { min: 383_900, max: 487_450, rate: 0.32, label: "$383,901 - $487,450" },
  { min: 487_450, max: 731_200, rate: 0.35, label: "$487,451 - $731,200" },
  { min: 731_200, max: Infinity, rate: 0.37, label: "$731,201+" },
] as const;

// State sales tax table (all 50 states + DC)
export const STATE_SALES_TAX: Record<
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

// Average combined sales tax rate used for generic calculations
export const AVG_SALES_TAX_RATE = 0.085;

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
  options?: USPayrollOptions,
): USPayrollResult {
  const periods = periodsPerYear(frequency);
  const filingStatus = options?.filingStatus ?? "single";

  // Federal income tax (standard deduction applied)
  const standardDeduction = filingStatus === "married"
    ? STANDARD_DEDUCTION_MARRIED
    : STANDARD_DEDUCTION_SINGLE;
  const taxableIncome = Math.max(0, annualSalary - standardDeduction);
  const brackets = filingStatus === "married"
    ? FEDERAL_BRACKETS_MARRIED
    : FEDERAL_BRACKETS_SINGLE;
  const annualFederalTax = applyBrackets(taxableIncome, brackets);

  // Social Security (employee)
  const ssWages = Math.min(annualSalary, SS_WAGE_CAP);
  const annualSSEmployee = ssWages * SS_RATE;

  // Medicare (employee)
  let annualMedicareEmployee = annualSalary * MEDICARE_RATE;
  if (annualSalary > MEDICARE_ADDITIONAL_THRESHOLD) {
    annualMedicareEmployee += (annualSalary - MEDICARE_ADDITIONAL_THRESHOLD) * MEDICARE_ADDITIONAL_RATE;
  }

  // Social Security (employer) - same as employee
  const annualSSEmployer = ssWages * SS_RATE;

  // Medicare (employer) - no additional surtax
  const annualMedicareEmployer = annualSalary * MEDICARE_RATE;

  // FUTA (employer only)
  const futaWages = Math.min(annualSalary, FUTA_WAGE_CAP);
  const annualFUTA = futaWages * FUTA_RATE;

  const grossPay = round2(annualSalary / periods);
  const incomeTax = round2(annualFederalTax / periods);

  const employeeDeductions: { name: string; amount: number }[] = [
    { name: "Federal income tax", amount: round2(annualFederalTax / periods) },
    { name: "Social Security (6.2%)", amount: round2(annualSSEmployee / periods) },
  ];

  // Split Medicare line if additional Medicare applies
  if (annualSalary > MEDICARE_ADDITIONAL_THRESHOLD) {
    const baseMedicare = annualSalary * MEDICARE_RATE;
    const additionalMedicare = (annualSalary - MEDICARE_ADDITIONAL_THRESHOLD) * MEDICARE_ADDITIONAL_RATE;
    employeeDeductions.push(
      { name: "Medicare (1.45%)", amount: round2(baseMedicare / periods) },
      { name: "Additional Medicare (0.9%)", amount: round2(additionalMedicare / periods) },
    );
  } else {
    employeeDeductions.push(
      { name: "Medicare (1.45%)", amount: round2(annualMedicareEmployee / periods) },
    );
  }

  const employerCosts = [
    { name: "Social Security (6.2%)", amount: round2(annualSSEmployer / periods) },
    { name: "Medicare (1.45%)", amount: round2(annualMedicareEmployer / periods) },
    { name: "FUTA (0.6%)", amount: round2(annualFUTA / periods) },
  ];

  const totalDeductions = employeeDeductions.reduce((s, d) => s + d.amount, 0);
  const netPay = round2(grossPay - totalDeductions);
  const totalEmployerCost = round2(grossPay + employerCosts.reduce((s, c) => s + c.amount, 0));

  return { grossPay, incomeTax, employeeDeductions, employerCosts, netPay, totalEmployerCost };
}

// ---------------------------------------------------------------------------
// Sales Tax Calculator (equivalent to GST/VAT in other countries)
// ---------------------------------------------------------------------------

export function calculateGST(
  amount: number,
  inclusive: boolean,
  stateCode?: string,
): { gross: number; tax: number; net: number; rate: number } {
  const rate = stateCode
    ? (STATE_SALES_TAX[stateCode.toUpperCase()]?.combinedRate ?? AVG_SALES_TAX_RATE * 100) / 100
    : AVG_SALES_TAX_RATE;

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
  filingStatus: "single" | "married" = "single",
): { tax: number; effectiveRate: number; breakdown: { bracket: string; rate: number; tax: number }[] } {
  const breakdown: { bracket: string; rate: number; tax: number }[] = [];

  const stdDed = filingStatus === "married" ? STANDARD_DEDUCTION_MARRIED : STANDARD_DEDUCTION_SINGLE;
  const taxableIncome = Math.max(0, income - stdDed);
  const brackets = filingStatus === "married" ? INCOME_TAX_BRACKETS_MARRIED : INCOME_TAX_BRACKETS_SINGLE;

  breakdown.push({
    bracket: `Standard deduction: -$${stdDed.toLocaleString()} (${filingStatus})`,
    rate: 0,
    tax: 0,
  });

  let totalTax = 0;
  for (const b of brackets) {
    if (taxableIncome <= b.min) break;
    const taxable = Math.min(taxableIncome, b.max) - b.min;
    const tax = round2(taxable * b.rate);
    totalTax += tax;
    if (tax > 0) {
      breakdown.push({ bracket: b.label, rate: b.rate, tax });
    }
  }

  totalTax = round2(totalTax);
  const effectiveRate = income > 0 ? round2((totalTax / income) * 10000) / 10000 : 0;

  return { tax: totalTax, effectiveRate, breakdown };
}
