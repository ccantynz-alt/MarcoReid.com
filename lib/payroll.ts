// Payroll Calculation Engines
// Working calculators for NZ, AU, UK, US, CA using 2024/2025 tax rates.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PayrollResult {
  grossPay: number;
  incomeTax: number;
  employeeDeductions: { name: string; amount: number }[];
  employerCosts: { name: string; amount: number }[];
  netPay: number;
  totalEmployerCost: number;
}

export type PayFrequency = "weekly" | "fortnightly" | "monthly";

export interface PayrollParams {
  jurisdiction: string;
  annualSalary: number;
  payFrequency: PayFrequency;
  kiwiSaverRate?: number; // NZ only: 3 | 4 | 6 | 8 | 10
}

// ---------------------------------------------------------------------------
// Helpers
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

/** Apply progressive tax brackets to an annual amount and return annual tax. */
function applyBrackets(
  annual: number,
  brackets: { min: number; max: number; rate: number }[],
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
// NEW ZEALAND
// ---------------------------------------------------------------------------

const NZ_PAYE_BRACKETS = [
  { min: 0, max: 14_000, rate: 0.105 },
  { min: 14_000, max: 48_000, rate: 0.175 },
  { min: 48_000, max: 70_000, rate: 0.30 },
  { min: 70_000, max: 180_000, rate: 0.33 },
  { min: 180_000, max: Infinity, rate: 0.39 },
];

const NZ_ACC_LEVY_RATE = 0.016;
const NZ_ACC_LEVY_CAP = 142_283;
const NZ_KIWISAVER_EMPLOYER_MIN = 0.03;

/** ESCT rate based on employee's total PAYE income + ESCT. */
function nzEsctRate(annualSalary: number): number {
  if (annualSalary <= 16_800) return 0.105;
  if (annualSalary <= 57_600) return 0.175;
  if (annualSalary <= 84_000) return 0.30;
  if (annualSalary <= 216_000) return 0.33;
  return 0.39;
}

function calculateNZ(params: PayrollParams): PayrollResult {
  const { annualSalary, payFrequency } = params;
  const periods = periodsPerYear(payFrequency);
  const kiwiSaverRate = (params.kiwiSaverRate ?? 3) / 100;

  // PAYE
  const annualPAYE = applyBrackets(annualSalary, NZ_PAYE_BRACKETS);

  // ACC earner levy
  const accEarnings = Math.min(annualSalary, NZ_ACC_LEVY_CAP);
  const annualACC = accEarnings * NZ_ACC_LEVY_RATE;

  // KiwiSaver employee
  const annualKSEmployee = annualSalary * kiwiSaverRate;

  // KiwiSaver employer
  const annualKSEmployer = annualSalary * NZ_KIWISAVER_EMPLOYER_MIN;

  // ESCT on employer KiwiSaver contribution
  const esctRate = nzEsctRate(annualSalary);
  const annualESCT = annualKSEmployer * esctRate;

  const grossPay = round2(annualSalary / periods);
  const incomeTax = round2(annualPAYE / periods);

  const employeeDeductions = [
    { name: "PAYE", amount: round2(annualPAYE / periods) },
    { name: "ACC earner levy", amount: round2(annualACC / periods) },
    { name: `KiwiSaver (${params.kiwiSaverRate ?? 3}%)`, amount: round2(annualKSEmployee / periods) },
  ];

  const employerCosts = [
    { name: "KiwiSaver employer (3%)", amount: round2(annualKSEmployer / periods) },
    { name: `ESCT (${(esctRate * 100).toFixed(1)}%)`, amount: round2(annualESCT / periods) },
  ];

  const totalDeductions = employeeDeductions.reduce((s, d) => s + d.amount, 0);
  const netPay = round2(grossPay - totalDeductions);
  const totalEmployerCost = round2(grossPay + employerCosts.reduce((s, c) => s + c.amount, 0));

  return { grossPay, incomeTax, employeeDeductions, employerCosts, netPay, totalEmployerCost };
}

// ---------------------------------------------------------------------------
// AUSTRALIA
// ---------------------------------------------------------------------------

const AU_TAX_BRACKETS = [
  { min: 0, max: 18_200, rate: 0 },
  { min: 18_200, max: 45_000, rate: 0.16 },
  { min: 45_000, max: 135_000, rate: 0.30 },
  { min: 135_000, max: 190_000, rate: 0.37 },
  { min: 190_000, max: Infinity, rate: 0.45 },
];

const AU_MEDICARE_LEVY = 0.02;
const AU_SUPER_RATE = 0.115; // 11.5% for 2024-25

function calculateAU(params: PayrollParams): PayrollResult {
  const { annualSalary, payFrequency } = params;
  const periods = periodsPerYear(payFrequency);

  const annualIncomeTax = applyBrackets(annualSalary, AU_TAX_BRACKETS);
  const annualMedicare = annualSalary * AU_MEDICARE_LEVY;
  const annualSuper = annualSalary * AU_SUPER_RATE;

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
// UNITED KINGDOM
// ---------------------------------------------------------------------------

const UK_INCOME_TAX_BRACKETS = [
  { min: 0, max: 12_570, rate: 0 },         // Personal allowance
  { min: 12_570, max: 50_270, rate: 0.20 },  // Basic rate
  { min: 50_270, max: 125_140, rate: 0.40 }, // Higher rate
  { min: 125_140, max: Infinity, rate: 0.45 }, // Additional rate
];

// Employee NI thresholds (Class 1)
const UK_NI_PRIMARY_THRESHOLD = 12_570;
const UK_NI_UPPER_EARNINGS_LIMIT = 50_270;
const UK_NI_MAIN_RATE = 0.08;
const UK_NI_UPPER_RATE = 0.02;

// Employer NI
const UK_NI_SECONDARY_THRESHOLD = 9_100;
const UK_EMPLOYER_NI_RATE = 0.138;

// Auto-enrolment pension
const UK_PENSION_EMPLOYEE_RATE = 0.05;
const UK_PENSION_EMPLOYER_RATE = 0.03;

function calculateUK(params: PayrollParams): PayrollResult {
  const { annualSalary, payFrequency } = params;
  const periods = periodsPerYear(payFrequency);

  // Income tax (note: personal allowance tapers above 100k but simplified here)
  const annualIncomeTax = applyBrackets(annualSalary, UK_INCOME_TAX_BRACKETS);

  // Employee NI
  let annualEmployeeNI = 0;
  if (annualSalary > UK_NI_PRIMARY_THRESHOLD) {
    const mainBand = Math.min(annualSalary, UK_NI_UPPER_EARNINGS_LIMIT) - UK_NI_PRIMARY_THRESHOLD;
    annualEmployeeNI += Math.max(0, mainBand) * UK_NI_MAIN_RATE;
    if (annualSalary > UK_NI_UPPER_EARNINGS_LIMIT) {
      annualEmployeeNI += (annualSalary - UK_NI_UPPER_EARNINGS_LIMIT) * UK_NI_UPPER_RATE;
    }
  }

  // Employer NI
  let annualEmployerNI = 0;
  if (annualSalary > UK_NI_SECONDARY_THRESHOLD) {
    annualEmployerNI = (annualSalary - UK_NI_SECONDARY_THRESHOLD) * UK_EMPLOYER_NI_RATE;
  }

  // Pension
  const annualPensionEmployee = annualSalary * UK_PENSION_EMPLOYEE_RATE;
  const annualPensionEmployer = annualSalary * UK_PENSION_EMPLOYER_RATE;

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
// UNITED STATES
// ---------------------------------------------------------------------------

const US_FEDERAL_BRACKETS_SINGLE = [
  { min: 0, max: 11_600, rate: 0.10 },
  { min: 11_600, max: 47_150, rate: 0.12 },
  { min: 47_150, max: 100_525, rate: 0.22 },
  { min: 100_525, max: 191_950, rate: 0.24 },
  { min: 191_950, max: 243_725, rate: 0.32 },
  { min: 243_725, max: 609_350, rate: 0.35 },
  { min: 609_350, max: Infinity, rate: 0.37 },
];

const US_SS_RATE = 0.062;
const US_SS_WAGE_CAP = 168_600;
const US_MEDICARE_RATE = 0.0145;
const US_MEDICARE_ADDITIONAL_THRESHOLD = 200_000;
const US_MEDICARE_ADDITIONAL_RATE = 0.009;
const US_FUTA_RATE = 0.006; // Effective rate after state credit
const US_FUTA_WAGE_CAP = 7_000;

function calculateUS(params: PayrollParams): PayrollResult {
  const { annualSalary, payFrequency } = params;
  const periods = periodsPerYear(payFrequency);

  // Federal income tax (single filer, standard deduction applied)
  const standardDeduction = 14_600; // 2024 single
  const taxableIncome = Math.max(0, annualSalary - standardDeduction);
  const annualFederalTax = applyBrackets(taxableIncome, US_FEDERAL_BRACKETS_SINGLE);

  // Social Security (employee)
  const ssWages = Math.min(annualSalary, US_SS_WAGE_CAP);
  const annualSSEmployee = ssWages * US_SS_RATE;

  // Medicare (employee)
  let annualMedicareEmployee = annualSalary * US_MEDICARE_RATE;
  if (annualSalary > US_MEDICARE_ADDITIONAL_THRESHOLD) {
    annualMedicareEmployee += (annualSalary - US_MEDICARE_ADDITIONAL_THRESHOLD) * US_MEDICARE_ADDITIONAL_RATE;
  }

  // Social Security (employer) - same as employee
  const annualSSEmployer = ssWages * US_SS_RATE;

  // Medicare (employer) - no additional surtax
  const annualMedicareEmployer = annualSalary * US_MEDICARE_RATE;

  // FUTA (employer only)
  const futaWages = Math.min(annualSalary, US_FUTA_WAGE_CAP);
  const annualFUTA = futaWages * US_FUTA_RATE;

  const grossPay = round2(annualSalary / periods);
  const incomeTax = round2(annualFederalTax / periods);

  const employeeDeductions = [
    { name: "Federal income tax", amount: round2(annualFederalTax / periods) },
    { name: "Social Security (6.2%)", amount: round2(annualSSEmployee / periods) },
    { name: "Medicare (1.45%)", amount: round2(annualMedicareEmployee / periods) },
  ];

  // Add additional Medicare line if applicable
  if (annualSalary > US_MEDICARE_ADDITIONAL_THRESHOLD) {
    const additionalMedicare = (annualSalary - US_MEDICARE_ADDITIONAL_THRESHOLD) * US_MEDICARE_ADDITIONAL_RATE;
    // The additional Medicare is already included in the Medicare deduction above,
    // but we label it separately for clarity. Adjust the Medicare line.
    const baseMedicare = annualSalary * US_MEDICARE_RATE;
    employeeDeductions[2] = { name: "Medicare (1.45%)", amount: round2(baseMedicare / periods) };
    employeeDeductions.push({
      name: "Additional Medicare (0.9%)",
      amount: round2(additionalMedicare / periods),
    });
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
// CANADA
// ---------------------------------------------------------------------------

const CA_FEDERAL_BRACKETS = [
  { min: 0, max: 55_867, rate: 0.15 },
  { min: 55_867, max: 111_733, rate: 0.205 },
  { min: 111_733, max: 154_906, rate: 0.26 },
  { min: 154_906, max: 220_000, rate: 0.29 },
  { min: 220_000, max: Infinity, rate: 0.33 },
];

const CA_BASIC_PERSONAL_AMOUNT = 15_705; // 2024 federal BPA
const CA_CPP_RATE = 0.0595;
const CA_CPP_BASIC_EXEMPTION = 3_500;
const CA_CPP_MAX_PENSIONABLE = 68_500;
const CA_EI_EMPLOYEE_RATE = 0.0166;
const CA_EI_MAX_INSURABLE = 63_200;
const CA_EI_EMPLOYER_MULTIPLIER = 1.4;

function calculateCA(params: PayrollParams): PayrollResult {
  const { annualSalary, payFrequency } = params;
  const periods = periodsPerYear(payFrequency);

  // Federal income tax (with basic personal amount credit)
  const annualFederalTax = Math.max(
    0,
    applyBrackets(annualSalary, CA_FEDERAL_BRACKETS) - CA_BASIC_PERSONAL_AMOUNT * 0.15,
  );

  // CPP (employee)
  const cppEarnings = Math.min(annualSalary, CA_CPP_MAX_PENSIONABLE) - CA_CPP_BASIC_EXEMPTION;
  const annualCPPEmployee = Math.max(0, cppEarnings) * CA_CPP_RATE;

  // CPP (employer) - same rate
  const annualCPPEmployer = annualCPPEmployee;

  // EI (employee)
  const eiEarnings = Math.min(annualSalary, CA_EI_MAX_INSURABLE);
  const annualEIEmployee = eiEarnings * CA_EI_EMPLOYEE_RATE;

  // EI (employer) = 1.4x employee
  const annualEIEmployer = annualEIEmployee * CA_EI_EMPLOYER_MULTIPLIER;

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
// Main entry point
// ---------------------------------------------------------------------------

const CALCULATORS: Record<string, (params: PayrollParams) => PayrollResult> = {
  NZ: calculateNZ,
  AU: calculateAU,
  UK: calculateUK,
  US: calculateUS,
  CA: calculateCA,
};

export function calculatePayroll(params: PayrollParams): PayrollResult {
  const code = params.jurisdiction.toUpperCase();
  const calculator = CALCULATORS[code];
  if (!calculator) {
    throw new Error(
      `Unsupported jurisdiction: "${params.jurisdiction}". Supported: ${Object.keys(CALCULATORS).join(", ")}`,
    );
  }
  return calculator(params);
}

/** All supported payroll jurisdictions with display info. */
export const PAYROLL_JURISDICTIONS = [
  { code: "NZ", name: "New Zealand", currency: "NZD", symbol: "$", flag: "\u{1F1F3}\u{1F1FF}" },
  { code: "AU", name: "Australia", currency: "AUD", symbol: "$", flag: "\u{1F1E6}\u{1F1FA}" },
  { code: "UK", name: "United Kingdom", currency: "GBP", symbol: "£", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "US", name: "United States", currency: "USD", symbol: "$", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "$", flag: "\u{1F1E8}\u{1F1E6}" },
] as const;

export const KIWISAVER_RATES = [3, 4, 6, 8, 10] as const;
