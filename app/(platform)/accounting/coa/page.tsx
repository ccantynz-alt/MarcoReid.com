/**
 * /accounting/coa — Chart of accounts.
 *
 * Server-renders a tree (parent + children) grouped by `AccountType`.
 * Includes a "seed default chart" form action so a fresh firm can pick
 * a jurisdiction and get a starter COA in one click.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { AccountType, ChartOfAccounts } from "@prisma/client";
import { seedDefaultChartOfAccounts, Jurisdiction } from "@/lib/ledger/seed-coa";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Chart of accounts · Marco Reid",
};

const TYPE_LABEL: Record<AccountType, string> = {
  ASSET: "Assets",
  CONTRA_ASSET: "Contra assets",
  LIABILITY: "Liabilities",
  CONTRA_LIABILITY: "Contra liabilities",
  EQUITY: "Equity",
  REVENUE: "Revenue",
  EXPENSE: "Expenses",
};

const TYPE_ORDER: AccountType[] = [
  AccountType.ASSET,
  AccountType.CONTRA_ASSET,
  AccountType.LIABILITY,
  AccountType.CONTRA_LIABILITY,
  AccountType.EQUITY,
  AccountType.REVENUE,
  AccountType.EXPENSE,
];

async function seedAction(formData: FormData) {
  "use server";
  const userId = await getUserId();
  if (!userId) return;
  const jurisdiction = formData.get("jurisdiction") as Jurisdiction | null;
  if (!jurisdiction || !["NZ", "AU", "UK", "US"].includes(jurisdiction)) return;
  await seedDefaultChartOfAccounts(userId, jurisdiction);
  revalidatePath("/accounting/coa");
  revalidatePath("/accounting");
}

export default async function ChartOfAccountsPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const accounts = await prisma.chartOfAccounts.findMany({
    where: { firmId: userId },
    orderBy: { code: "asc" },
  });

  const grouped = new Map<AccountType, ChartOfAccounts[]>();
  for (const a of accounts) {
    const list = grouped.get(a.type) ?? [];
    list.push(a);
    grouped.set(a.type, list);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Accounting</p>
          <h1 className="mt-2 font-serif text-4xl text-navy-700 dark:text-navy-100">Chart of accounts</h1>
          <p className="mt-2 text-navy-500 dark:text-navy-300">
            {accounts.length} active account{accounts.length === 1 ? "" : "s"}.
          </p>
        </div>
        <Link
          href="/accounting"
          className="text-sm font-semibold text-navy-500 hover:text-navy-700 dark:text-navy-300"
        >
          ← Overview
        </Link>
      </div>

      {accounts.length === 0 ? (
        <section className="rounded-2xl border border-gold-300 bg-gold-50 p-8 dark:border-gold-700 dark:bg-gold-900/20">
          <h2 className="font-serif text-2xl text-navy-700 dark:text-navy-100">
            Seed a starter chart of accounts
          </h2>
          <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">
            Marco Reid ships sensible defaults for each jurisdiction with the right tax accounts pre-wired.
          </p>
          <form action={seedAction} className="mt-4 flex flex-wrap items-center gap-3">
            <label className="text-sm font-semibold text-navy-700 dark:text-navy-100">Jurisdiction</label>
            <select
              name="jurisdiction"
              defaultValue="NZ"
              className="rounded-lg border border-navy-300 bg-white px-3 py-2 text-sm dark:border-navy-600 dark:bg-navy-800 dark:text-navy-100"
            >
              <option value="NZ">New Zealand (GST + PAYE)</option>
              <option value="AU">Australia (GST + PAYG)</option>
              <option value="UK">United Kingdom (VAT + PAYE)</option>
              <option value="US">United States (Sales Tax + Federal Withholding)</option>
            </select>
            <button
              type="submit"
              className="rounded-lg bg-navy-500 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-600"
            >
              Seed default accounts
            </button>
          </form>
        </section>
      ) : (
        <div className="space-y-8">
          {TYPE_ORDER.map((type) => {
            const list = grouped.get(type);
            if (!list || list.length === 0) return null;
            return (
              <section key={type} className="rounded-2xl border border-navy-200 bg-white dark:border-navy-700 dark:bg-navy-900">
                <header className="border-b border-navy-100 px-6 py-4 dark:border-navy-700">
                  <h2 className="font-serif text-xl text-navy-700 dark:text-navy-100">{TYPE_LABEL[type]}</h2>
                </header>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wider text-navy-400 dark:border-navy-700">
                      <th className="px-6 py-2">Code</th>
                      <th className="px-6 py-2">Name</th>
                      <th className="px-6 py-2">Sub-type</th>
                      <th className="px-6 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((a) => (
                      <tr key={a.id} className="border-b border-navy-50 dark:border-navy-800">
                        <td className="px-6 py-2 font-mono text-navy-500">{a.code}</td>
                        <td className="px-6 py-2 text-navy-700 dark:text-navy-200">{a.name}</td>
                        <td className="px-6 py-2 text-xs text-navy-400">{a.subType}</td>
                        <td className="px-6 py-2 text-xs text-navy-400">{a.description ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
