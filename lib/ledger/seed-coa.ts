/**
 * lib/ledger/seed-coa.ts — Default chart of accounts seeder.
 *
 * Real account names per jurisdiction. We seed once per firm; subsequent
 * runs are idempotent — `(firmId, code)` is unique, so existing accounts
 * are skipped, not overwritten. Firms can rename, deactivate, and add
 * sub-accounts after the seed without conflict.
 *
 * Jurisdictions follow the Marco Reid soft-launch order:
 *   NZ — primary, GST + PAYE Payable
 *   AU — primary, GST + PAYG Payable
 *   UK — VAT + PAYE Payable
 *   US — Sales Tax Payable + Federal Withholding Payable
 */

import { AccountType, AccountSubType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type Jurisdiction = "NZ" | "AU" | "UK" | "US";

interface SeedAccount {
  code: string;
  name: string;
  type: AccountType;
  subType: AccountSubType;
  description?: string;
}

const COMMON_ASSETS: SeedAccount[] = [
  { code: "1000", name: "Cash on Hand", type: AccountType.ASSET, subType: AccountSubType.CASH },
  { code: "1100", name: "Bank — Operating", type: AccountType.ASSET, subType: AccountSubType.BANK },
  { code: "1110", name: "Bank — Savings", type: AccountType.ASSET, subType: AccountSubType.BANK },
  { code: "1200", name: "Accounts Receivable", type: AccountType.ASSET, subType: AccountSubType.ACCOUNTS_RECEIVABLE },
  { code: "1300", name: "Inventory", type: AccountType.ASSET, subType: AccountSubType.INVENTORY },
  { code: "1400", name: "Prepaid Expenses", type: AccountType.ASSET, subType: AccountSubType.PREPAID },
  { code: "1500", name: "Office Equipment", type: AccountType.ASSET, subType: AccountSubType.FIXED_ASSET },
  { code: "1510", name: "Accumulated Depreciation — Equipment", type: AccountType.CONTRA_ASSET, subType: AccountSubType.FIXED_ASSET },
];

const COMMON_LIABILITIES: SeedAccount[] = [
  { code: "2000", name: "Accounts Payable", type: AccountType.LIABILITY, subType: AccountSubType.ACCOUNTS_PAYABLE },
  { code: "2300", name: "Credit Card", type: AccountType.LIABILITY, subType: AccountSubType.OTHER_LIABILITY },
  { code: "2400", name: "Accrued Expenses", type: AccountType.LIABILITY, subType: AccountSubType.OTHER_LIABILITY },
  { code: "2500", name: "Loan Payable", type: AccountType.LIABILITY, subType: AccountSubType.LOAN_PAYABLE },
];

const COMMON_EQUITY: SeedAccount[] = [
  { code: "3000", name: "Owner's Equity", type: AccountType.EQUITY, subType: AccountSubType.OWNER_EQUITY },
  { code: "3100", name: "Owner's Drawings", type: AccountType.EQUITY, subType: AccountSubType.OWNER_EQUITY },
  { code: "3200", name: "Retained Earnings", type: AccountType.EQUITY, subType: AccountSubType.RETAINED_EARNINGS },
];

const COMMON_REVENUE: SeedAccount[] = [
  { code: "4000", name: "Service Revenue", type: AccountType.REVENUE, subType: AccountSubType.SERVICE_REVENUE },
  { code: "4100", name: "Product Sales", type: AccountType.REVENUE, subType: AccountSubType.PRODUCT_REVENUE },
  { code: "4900", name: "Other Income", type: AccountType.REVENUE, subType: AccountSubType.OTHER_INCOME },
];

const COMMON_EXPENSE: SeedAccount[] = [
  { code: "5000", name: "Cost of Sales", type: AccountType.EXPENSE, subType: AccountSubType.COST_OF_SALES },
  { code: "6000", name: "Wages and Salaries", type: AccountType.EXPENSE, subType: AccountSubType.PAYROLL_EXPENSE },
  { code: "6100", name: "Rent", type: AccountType.EXPENSE, subType: AccountSubType.OPERATING_EXPENSE },
  { code: "6200", name: "Utilities", type: AccountType.EXPENSE, subType: AccountSubType.OPERATING_EXPENSE },
  { code: "6300", name: "Software Subscriptions", type: AccountType.EXPENSE, subType: AccountSubType.OPERATING_EXPENSE },
  { code: "6400", name: "Professional Fees", type: AccountType.EXPENSE, subType: AccountSubType.OPERATING_EXPENSE },
  { code: "6500", name: "Travel and Entertainment", type: AccountType.EXPENSE, subType: AccountSubType.OPERATING_EXPENSE },
  { code: "6600", name: "Bank Fees", type: AccountType.EXPENSE, subType: AccountSubType.OPERATING_EXPENSE },
  { code: "6700", name: "Depreciation Expense", type: AccountType.EXPENSE, subType: AccountSubType.OPERATING_EXPENSE },
  { code: "7000", name: "Interest Expense", type: AccountType.EXPENSE, subType: AccountSubType.INTEREST_EXPENSE },
];

const NZ_TAX: SeedAccount[] = [
  { code: "2100", name: "GST Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE, description: "GST collected, payable to Inland Revenue (IR)." },
  { code: "2110", name: "GST Receivable", type: AccountType.ASSET, subType: AccountSubType.TAX_PAYABLE, description: "Input tax credits — GST paid on purchases." },
  { code: "2200", name: "PAYE Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE, description: "PAYE withheld from employees, payable to IR." },
  { code: "2210", name: "KiwiSaver Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "2220", name: "ACC Levies Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "2900", name: "Income Tax Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "8000", name: "Income Tax Expense", type: AccountType.EXPENSE, subType: AccountSubType.TAX_EXPENSE },
];

const AU_TAX: SeedAccount[] = [
  { code: "2100", name: "GST Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE, description: "GST collected, payable to the ATO." },
  { code: "2110", name: "GST Receivable", type: AccountType.ASSET, subType: AccountSubType.TAX_PAYABLE },
  { code: "2200", name: "PAYG Withholding Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE, description: "PAYG withheld from employees, payable to the ATO." },
  { code: "2210", name: "Superannuation Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "2900", name: "Income Tax Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "8000", name: "Income Tax Expense", type: AccountType.EXPENSE, subType: AccountSubType.TAX_EXPENSE },
];

const UK_TAX: SeedAccount[] = [
  { code: "2100", name: "VAT Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE, description: "VAT collected, payable to HMRC." },
  { code: "2110", name: "VAT Receivable", type: AccountType.ASSET, subType: AccountSubType.TAX_PAYABLE },
  { code: "2200", name: "PAYE Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE, description: "PAYE withheld from employees, payable to HMRC." },
  { code: "2210", name: "National Insurance Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "2900", name: "Corporation Tax Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "8000", name: "Corporation Tax Expense", type: AccountType.EXPENSE, subType: AccountSubType.TAX_EXPENSE },
];

const US_TAX: SeedAccount[] = [
  { code: "2100", name: "Sales Tax Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE, description: "State sales tax collected, payable to the relevant state revenue department." },
  { code: "2200", name: "Federal Withholding Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE, description: "Federal income tax withheld from employees, payable to the IRS." },
  { code: "2210", name: "Social Security Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "2220", name: "Medicare Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "2230", name: "State Withholding Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "2900", name: "Federal Income Tax Payable", type: AccountType.LIABILITY, subType: AccountSubType.TAX_PAYABLE },
  { code: "8000", name: "Federal Income Tax Expense", type: AccountType.EXPENSE, subType: AccountSubType.TAX_EXPENSE },
];

function taxAccountsFor(jurisdiction: Jurisdiction): SeedAccount[] {
  switch (jurisdiction) {
    case "NZ":
      return NZ_TAX;
    case "AU":
      return AU_TAX;
    case "UK":
      return UK_TAX;
    case "US":
      return US_TAX;
  }
}

export async function seedDefaultChartOfAccounts(
  firmId: string,
  jurisdiction: Jurisdiction,
): Promise<{ created: number; skipped: number }> {
  const accounts: SeedAccount[] = [
    ...COMMON_ASSETS,
    ...COMMON_LIABILITIES,
    ...COMMON_EQUITY,
    ...COMMON_REVENUE,
    ...COMMON_EXPENSE,
    ...taxAccountsFor(jurisdiction),
  ];

  let created = 0;
  let skipped = 0;

  for (const a of accounts) {
    const existing = await prisma.chartOfAccounts.findUnique({
      where: { firmId_code: { firmId, code: a.code } },
      select: { id: true },
    });
    if (existing) {
      skipped += 1;
      continue;
    }
    await prisma.chartOfAccounts.create({
      data: {
        firmId,
        code: a.code,
        name: a.name,
        type: a.type,
        subType: a.subType,
        description: a.description,
      },
    });
    created += 1;
  }

  return { created, skipped };
}
