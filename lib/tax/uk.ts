// United Kingdom Tax & Payroll Module
// Isolated per-country module — no imports from other country files.
// Income tax + personal allowance, Employee NI, Employer NI, pension, VAT 20%.

export const LAST_UPDATED = "2025-01-01";
export const TAX_YEAR = "2024-2025";
export const JURISDICTION = "UK";
export const CURRENCY = { code: "GBP", symbol: "£" };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UKPayrollResult {
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

export const INCOME_TAX_BRACKETS = [
  { min: 0, max: 12_570, rate: 0, label: "Personal allowance (0 - 12,570)" },
  { min: 12_570, max: 50_270, rate: 0.20, label: "Basic rate (12,571 - 50,270)" },
  { min: 50_270, max: 125_140, rate: 0.40, label: "Higher rate (50,271 - 125,140)" },
  { min: 125_140, max: Infinity, rate: 0.45, label: "Additional rate (125,141+)" },
] as const;

// Employee NI thresholds (Class 1)
export const NI_PRIMARY_THRESHOLD = 12_570;
export const NI_UPPER_EARNINGS_LIMIT = 50_270;
export const NI_MAIN_RATE = 0.08;
export const NI_UPPER_RATE = 0.02;

// Employer NI
export const NI_SECONDARY_THRESHOLD = 9_100;
export const EMPLOYER_NI_RATE = 0.138;

// Auto-enrolment pension
export const PENSION_EMPLOYEE_RATE = 0.05;
export const PENSION_EMPLOYER_RATE = 0.03;

// VAT
export const VAT_STANDARD_RATE = 0.20;
export const VAT_REDUCED_RATE = 0.05;

// Corporation Tax
export const CORPORATE_TAX_SMALL_PROFITS_RATE = 0.19; // profits <= 50,000
export const CORPORATE_TAX_MAIN_RATE = 0.25; // profits > 250,000

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
): UKPayrollResult {
  const periods = periodsPerYear(frequency);

  // Income tax (note: personal allowance tapers above 100k but simplified here)
  const annualIncomeTax = applyBrackets(annualSalary, INCOME_TAX_BRACKETS);

  // Employee NI
  let annualEmployeeNI = 0;
  if (annualSalary > NI_PRIMARY_THRESHOLD) {
    const mainBand = Math.min(annualSalary, NI_UPPER_EARNINGS_LIMIT) - NI_PRIMARY_THRESHOLD;
    annualEmployeeNI += Math.max(0, mainBand) * NI_MAIN_RATE;
    if (annualSalary > NI_UPPER_EARNINGS_LIMIT) {
      annualEmployeeNI += (annualSalary - NI_UPPER_EARNINGS_LIMIT) * NI_UPPER_RATE;
    }
  }

  // Employer NI
  let annualEmployerNI = 0;
  if (annualSalary > NI_SECONDARY_THRESHOLD) {
    annualEmployerNI = (annualSalary - NI_SECONDARY_THRESHOLD) * EMPLOYER_NI_RATE;
  }

  // Pension
  const annualPensionEmployee = annualSalary * PENSION_EMPLOYEE_RATE;
  const annualPensionEmployer = annualSalary * PENSION_EMPLOYER_RATE;

  const grossPay = round2(annualSalary / periods);
  const incomeTax = round2(annualIncomeTax / periods);

  const employeeDeductions = [
    { name: "Income tax", amount: round2(annualIncomeTax / periods) },
    { name: "Employee NI", amount: round2(annualEmployeeNI / periods) },
    { name: "Pension (5%)", amount: round2(annualPensionEmployee / periods) },
  ];

  const employerCosts = [
    { name: "Employer NI (13.8%)", amount: round2(annualEmployerNI / periods) },
    { name: "Employer pension (3%)", amount: round2(annualPensionEmployer / periods) },
  ];

  const totalDeductions = employeeDeductions.reduce((s, d) => s + d.amount, 0);
  const netPay = round2(grossPay - totalDeductions);
  const totalEmployerCost = round2(grossPay + employerCosts.reduce((s, c) => s + c.amount, 0));

  return { grossPay, incomeTax, employeeDeductions, employerCosts, netPay, totalEmployerCost };
}

// ---------------------------------------------------------------------------
// VAT Calculator
// ---------------------------------------------------------------------------

export function calculateGST(
  amount: number,
  inclusive: boolean,
): { gross: number; tax: number; net: number; rate: number } {
  const rate = VAT_STANDARD_RATE;
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
    if (tax > 0 || b.rate === 0) {
      breakdown.push({ bracket: b.label, rate: b.rate, tax });
    }
  }

  totalTax = round2(totalTax);
  const effectiveRate = income > 0 ? round2((totalTax / income) * 10000) / 10000 : 0;

  return { tax: totalTax, effectiveRate, breakdown };
}
