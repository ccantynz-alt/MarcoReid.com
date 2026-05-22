// New Zealand Tax & Payroll Module
// Isolated per-country module — no imports from other country files.
// PAYE, ACC levy, KiwiSaver, GST 15%.

export const LAST_UPDATED = "2025-01-01";
export const TAX_YEAR = "2024-2025";
export const JURISDICTION = "NZ";
export const CURRENCY = { code: "NZD", symbol: "$" };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NZPayrollResult {
  grossPay: number;
  incomeTax: number;
  employeeDeductions: { name: string; amount: number }[];
  employerCosts: { name: string; amount: number }[];
  netPay: number;
  totalEmployerCost: number;
}

export type PayFrequency = "weekly" | "fortnightly" | "monthly";

export interface NZPayrollOptions {
  kiwiSaverRate?: number; // 3 | 4 | 6 | 8 | 10
}

// ---------------------------------------------------------------------------
// Rate Constants
// ---------------------------------------------------------------------------

export const PAYE_BRACKETS = [
  { min: 0, max: 14_000, rate: 0.105 },
  { min: 14_000, max: 48_000, rate: 0.175 },
  { min: 48_000, max: 70_000, rate: 0.30 },
  { min: 70_000, max: 180_000, rate: 0.33 },
  { min: 180_000, max: Infinity, rate: 0.39 },
] as const;

export const ACC_LEVY_RATE = 0.016;
export const ACC_LEVY_CAP = 142_283;
export const KIWISAVER_EMPLOYER_MIN = 0.03;
export const KIWISAVER_RATES = [3, 4, 6, 8, 10] as const;
export const GST_RATE = 0.15;
export const CORPORATE_TAX_RATE = 0.28;

export const INCOME_TAX_BRACKETS = [
  { min: 0, max: 14_000, rate: 0.105, label: "$0 - $14,000" },
  { min: 14_000, max: 48_000, rate: 0.175, label: "$14,001 - $48,000" },
  { min: 48_000, max: 70_000, rate: 0.30, label: "$48,001 - $70,000" },
  { min: 70_000, max: 180_000, rate: 0.33, label: "$70,001 - $180,000" },
  { min: 180_000, max: Infinity, rate: 0.39, label: "$180,001+" },
] as const;

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
// ESCT rate (Employer Superannuation Contribution Tax)
// ---------------------------------------------------------------------------

function esctRate(annualSalary: number): number {
  if (annualSalary <= 16_800) return 0.105;
  if (annualSalary <= 57_600) return 0.175;
  if (annualSalary <= 84_000) return 0.30;
  if (annualSalary <= 216_000) return 0.33;
  return 0.39;
}

// ---------------------------------------------------------------------------
// Payroll Calculator
// ---------------------------------------------------------------------------

export function calculatePayroll(
  annualSalary: number,
  frequency: PayFrequency,
  options?: NZPayrollOptions,
): NZPayrollResult {
  const periods = periodsPerYear(frequency);
  const kiwiSaverRate = ((options?.kiwiSaverRate ?? 3) / 100);

  // PAYE
  const annualPAYE = applyBrackets(annualSalary, PAYE_BRACKETS);

  // ACC earner levy
  const accEarnings = Math.min(annualSalary, ACC_LEVY_CAP);
  const annualACC = accEarnings * ACC_LEVY_RATE;

  // KiwiSaver employee
  const annualKSEmployee = annualSalary * kiwiSaverRate;

  // KiwiSaver employer
  const annualKSEmployer = annualSalary * KIWISAVER_EMPLOYER_MIN;

  // ESCT on employer KiwiSaver contribution
  const esct = esctRate(annualSalary);
  const annualESCT = annualKSEmployer * esct;

  const grossPay = round2(annualSalary / periods);
  const incomeTax = round2(annualPAYE / periods);

  const employeeDeductions = [
    { name: "PAYE", amount: round2(annualPAYE / periods) },
    { name: "ACC earner levy", amount: round2(annualACC / periods) },
    { name: `KiwiSaver (${options?.kiwiSaverRate ?? 3}%)`, amount: round2(annualKSEmployee / periods) },
  ];

  const employerCosts = [
    { name: "KiwiSaver employer (3%)", amount: round2(annualKSEmployer / periods) },
    { name: `ESCT (${(esct * 100).toFixed(1)}%)`, amount: round2(annualESCT / periods) },
  ];

  const totalDeductions = employeeDeductions.reduce((s, d) => s + d.amount, 0);
  const netPay = round2(grossPay - totalDeductions);
  const totalEmployerCost = round2(grossPay + employerCosts.reduce((s, c) => s + c.amount, 0));

  return { grossPay, incomeTax, employeeDeductions, employerCosts, netPay, totalEmployerCost };
}

// ---------------------------------------------------------------------------
// GST Calculator
// ---------------------------------------------------------------------------

export function calculateGST(
  amount: number,
  inclusive: boolean,
): { gross: number; tax: number; net: number; rate: number } {
  if (inclusive) {
    const gross = round2(amount);
    const tax = round2(amount - amount / (1 + GST_RATE));
    const net = round2(amount - tax);
    return { gross, tax, net, rate: GST_RATE };
  }
  const net = round2(amount);
  const tax = round2(amount * GST_RATE);
  const gross = round2(amount + tax);
  return { gross, tax, net, rate: GST_RATE };
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

  totalTax = round2(totalTax);
  const effectiveRate = income > 0 ? round2((totalTax / income) * 10000) / 10000 : 0;

  return { tax: totalTax, effectiveRate, breakdown };
}
