"use client";

/**
 * TransactionsTable — inline categorise action per row.
 *
 * Selecting an account and clicking "Post" calls
 * /api/bankfeeds/transactions/[id]/categorise which creates the
 * balanced JournalEntry server-side and marks the row RECONCILED.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AccountOption {
  id: string;
  code: string;
  name: string;
  type: string;
}

interface Tx {
  id: string;
  description: string;
  merchantName: string | null;
  category: string | null;
  amount: string;
  currency: string;
  occurredAt: string;
  status: string;
  suggestedAccountId: string | null;
  bankAccountName: string;
}

function fmt(amount: string, currency: string): string {
  return new Intl.NumberFormat("en-NZ", { style: "currency", currency }).format(Number(amount));
}

export default function TransactionsTable({
  transactions,
  accounts,
}: {
  transactions: Tx[];
  accounts: AccountOption[];
}) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-navy-200 bg-white p-8 text-center dark:border-navy-700 dark:bg-navy-900">
        <p className="text-navy-500 dark:text-navy-300">No transactions in this status.</p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-200 bg-white dark:border-navy-700 dark:bg-navy-900">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wider text-navy-400 dark:border-navy-700">
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Bank account</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3">Categorise</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <Row key={tx.id} tx={tx} accounts={accounts} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Row({ tx, accounts }: { tx: Tx; accounts: AccountOption[] }) {
  const router = useRouter();
  const [accountId, setAccountId] = useState(tx.suggestedAccountId ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function categorise() {
    if (!accountId) return;
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/bankfeeds/transactions/${tx.id}/categorise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
        signal: AbortSignal.timeout(10_000),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to categorise");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const reconciled = tx.status === "RECONCILED" || tx.status === "CATEGORISED";

  return (
    <tr className="border-b border-navy-50 align-top dark:border-navy-800">
      <td className="px-4 py-3 text-navy-700 dark:text-navy-200">
        {tx.occurredAt.slice(0, 10)}
      </td>
      <td className="px-4 py-3 text-navy-700 dark:text-navy-200">
        <div>{tx.description}</div>
        {(tx.merchantName || tx.category) && (
          <div className="text-xs text-navy-400">
            {tx.merchantName ?? ""}
            {tx.merchantName && tx.category ? " · " : ""}
            {tx.category ?? ""}
          </div>
        )}
      </td>
      <td className="px-4 py-3 text-xs text-navy-500 dark:text-navy-400">{tx.bankAccountName}</td>
      <td className={`px-4 py-3 text-right font-mono ${Number(tx.amount) >= 0 ? "text-green-700 dark:text-green-400" : "text-navy-700 dark:text-navy-200"}`}>
        {fmt(tx.amount, tx.currency)}
      </td>
      <td className="px-4 py-3">
        {reconciled ? (
          <span className="text-xs font-semibold text-green-700 dark:text-green-300">{tx.status}</span>
        ) : (
          <div className="flex items-center gap-2">
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="rounded-lg border border-navy-300 bg-white px-2 py-1 text-xs dark:border-navy-600 dark:bg-navy-800 dark:text-navy-100"
            >
              <option value="">Choose account…</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} — {a.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={categorise}
              disabled={busy || !accountId}
              className="rounded-lg bg-navy-500 px-3 py-1 text-xs font-semibold text-white hover:bg-navy-600 disabled:opacity-50"
            >
              Post
            </button>
            {error && <span className="text-xs text-red-600">{error}</span>}
          </div>
        )}
      </td>
    </tr>
  );
}
