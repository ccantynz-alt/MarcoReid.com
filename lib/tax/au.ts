// Australia Tax & Payroll Module
// Isolated per-country module — no imports from other country files.
// Income tax brackets, Medicare levy, Superannuation 11.5%, GST 10%.

export const LAST_UPDATED = "2025-01-01";
export const TAX_YEAR = "2024-2025";
export const JURISDICTION = "AU";
export const CURRENCY = { code: "AUD", symbol: "$" };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AUPayrollResult {
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

export const TAX_BRACKETS = [
  { min: 0, max: 18_200, rate: 0 },
  { min: 18_200, max: 45_000, rate: 0.16 },
  { min: 45_000, max: 135_000, rate: 0.30 },
  { min: 135_000, max: 190_000, rate: 0.37 },
  { min: 190_000, max: Infinity, rate: 0.45 },
] as const;

export const MEDICARE_LEVY = 0.02;
export const SUPER_RATE = 0.115; // 11.5% for 2024-25
export const GST_RATE = 0.10;

export const CORPORATE_TAX_RATE = 0.30;
export const CORPORATE_TAX_RATE_SMALL_BUSINESS = 0.25; // Base rate entity: turnover < $50M

export const INCOME_TAX_BRACKETS = [
  { min: 0, max: 18_200, rate: 0, label: "$0 - $18,200 (tax-free)" },
  { min: 18_200, max: 45_000, rate: 0.16, label: "$18,201 - $45,000" },
  { min: 45_000, max: 135_000, rate: 0.30, label: "$45,001 - $135,000" },
  { min: 135_000, max: 190_000, rate: 0.37, label: "$135,001 - $190,000" },
  { min: 190_000, max: Infinity, rate: 0.45, label: "$190,001+" },
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
// Payroll Calculator
// ---------------------------------------------------------------------------

export function calculatePayroll(
  annualSalary: number,
  frequency: PayFrequency,
): AUPayrollResult {
  const periods = periodsPerYear(frequency);

  const annualIncomeTax = applyBrackets(annualSalary, TAX_BRACKETS);
  const annualMedicare = annualSalary * MEDICARE_LEVY;
  const annualSuper = annualSalary * SUPER_RATE;

  const grossPay = round2(annualSalary / periods);
  const incomeTax = round2(annualIncomeTax / periods);

  const employeeDeductions = [
    { name: "Income tax", amount: round2(annualIncomeTax / periods) },
    { name: "Medicare levy (2%)", amount: round2(annualMedicare / periods) },
  ];

  const employerCosts = [
    { name: "Superannuation (11.5%)", amount: round2(annualSuper / periods) },
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
    if (tax > 0 || b.rate === 0) {
      breakdown.push({ bracket: b.label, rate: b.rate, tax });
    }
  }

  // Medicare levy on top
  const medicareTax = round2(income * MEDICARE_LEVY);
  totalTax = round2(totalTax + medicareTax);
  breakdown.push({ bracket: "Medicare levy (2%)", rate: MEDICARE_LEVY, tax: medicareTax });

  const effectiveRate = income > 0 ? round2((totalTax / income) * 10000) / 10000 : 0;

  return { tax: totalTax, effectiveRate, breakdown };
}
