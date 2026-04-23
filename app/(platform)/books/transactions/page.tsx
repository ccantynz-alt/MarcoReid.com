/**
 * /books/transactions — bank transaction queue.
 *
 * Defaults to UNCATEGORISED, with a status filter for the other states.
 * The categorise action lives in the client component so the dropdown +
 * confirm flow can be inline per row without a full page reload.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { BankTransactionStatus, Prisma } from "@prisma/client";
import TransactionsTable from "./TransactionsTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bank transactions · Marco Reid",
};

interface SearchParams {
  status?: string;
}

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const params = await searchParams;
  const statusParam = (params.status as BankTransactionStatus | undefined) ?? BankTransactionStatus.UNCATEGORISED;
  const status = Object.values(BankTransactionStatus).includes(statusParam)
    ? statusParam
    : BankTransactionStatus.UNCATEGORISED;

  const where: Prisma.BankTransactionWhereInput = {
    bankAccount: { firmId: userId },
    status,
  };

  const [transactions, accounts, counts] = await Promise.all([
    prisma.bankTransaction.findMany({
      where,
      include: { bankAccount: true },
      orderBy: { occurredAt: "desc" },
      take: 100,
    }),
    prisma.chartOfAccounts.findMany({
      where: { firmId: userId, isActive: true },
      select: { id: true, code: true, name: true, type: true },
      orderBy: { code: "asc" },
    }),
    prisma.bankTransaction.groupBy({
      by: ["status"],
      where: { bankAccount: { firmId: userId } },
      _count: { _all: true },
    }),
  ]);

  const countByStatus = new Map(counts.map((c) => [c.status, c._count._all]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Accounting</p>
          <h1 className="mt-2 font-serif text-4xl text-navy-700 dark:text-navy-100">Bank transactions</h1>
          <p className="mt-2 text-navy-500 dark:text-navy-300">
            Pulled direct from your bank via open-banking infrastructure. Categorise to post.
          </p>
        </div>
        <Link href="/books" className="text-sm font-semibold text-navy-500 hover:text-navy-700 dark:text-navy-300">
          ← Overview
        </Link>
      </div>

      <nav className="mb-6 flex flex-wrap gap-2">
        {Object.values(BankTransactionStatus).map((s) => {
          const count = countByStatus.get(s) ?? 0;
          const active = s === status;
          return (
            <Link
              key={s}
              href={`/books/transactions?status=${s}`}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                active
                  ? "bg-navy-500 text-white"
                  : "border border-navy-200 text-navy-500 hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
              }`}
            >
              {s} <span className="ml-1 opacity-60">({count})</span>
            </Link>
          );
        })}
      </nav>

      <TransactionsTable
        transactions={transactions.map((t) => ({
          id: t.id,
          description: t.description,
          merchantName: t.merchantName,
          category: t.category,
          amount: t.amount.toString(),
          currency: t.currency,
          occurredAt: t.occurredAt.toISOString(),
          status: t.status,
          suggestedAccountId: t.suggestedAccountId,
          bankAccountName: t.bankAccount.name,
        }))}
        accounts={accounts}
      />
    </div>
  );
}
