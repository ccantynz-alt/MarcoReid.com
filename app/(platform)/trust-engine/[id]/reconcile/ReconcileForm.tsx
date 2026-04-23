"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  accountId: string;
  currency: string;
  ledgerBalance: string;
  clientLedgerSum: string;
  defaultPeriodStart: string;
  defaultPeriodEnd: string;
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ReconcileForm({
  accountId,
  currency,
  ledgerBalance,
  clientLedgerSum,
  defaultPeriodStart,
  defaultPeriodEnd,
}: Props) {
  const router = useRouter();
  const [periodStart, setPeriodStart] = useState(defaultPeriodStart);
  const [periodEnd, setPeriodEnd] = useState(defaultPeriodEnd);
  const [bankStatementBalance, setBankStatementBalance] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ledgerNum = Number(ledgerBalance);
  const clientSumNum = Number(clientLedgerSum);
  const bankNum = Number(bankStatementBalance || 0);

  const variance = useMemo(
    () => (bankStatementBalance === "" ? null : bankNum - ledgerNum),
    [bankStatementBalance, bankNum, ledgerNum],
  );

  const ledgerVsClientDelta = ledgerNum - clientSumNum;
  const isBalanced = variance === 0 && ledgerVsClientDelta === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(
        `/api/trust/accounts/${accountId}/reconcile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            periodStart: new Date(periodStart).toISOString(),
            periodEnd: new Date(periodEnd).toISOString(),
            bankStatementBalance,
            notes: notes || null,
          }),
        },
      );
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Reconciliation failed");
      }
      router.push(`/trust-engine/${accountId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reconciliation failed");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="periodStart"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            Period start
          </label>
          <input
            id="periodStart"
            type="date"
            required
            value={periodStart}
            onChange={(e) => setPeriodStart(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="periodEnd"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            Period end
          </label>
          <input
            id="periodEnd"
            type="date"
            required
            value={periodEnd}
            onChange={(e) => setPeriodEnd(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-xl border border-navy-100 bg-navy-50/50 p-4">
        <div className="grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Platform ledger
            </p>
            <p className="mt-1 font-serif text-lg text-navy-700 tabular-nums">
              {formatMoney(ledgerNum, currency)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Client ledger sum
            </p>
            <p className="mt-1 font-serif text-lg text-navy-700 tabular-nums">
              {formatMoney(clientSumNum, currency)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Internal delta
            </p>
            <p
              className={`mt-1 font-serif text-lg tabular-nums ${
                ledgerVsClientDelta === 0
                  ? "text-forest-600"
                  : "text-plum-600"
              }`}
            >
              {formatMoney(ledgerVsClientDelta, currency)}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="bankBalance"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
        >
          Bank statement balance ({currency})
        </label>
        <input
          id="bankBalance"
          type="number"
          step="0.01"
          required
          placeholder="0.00"
          value={bankStatementBalance}
          onChange={(e) => setBankStatementBalance(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-navy-400">
          Enter the closing balance from the bank statement for the period
          above.
        </p>
      </div>

      {variance !== null && (
        <div
          className={`rounded-xl border p-4 ${
            isBalanced
              ? "border-forest-200 bg-forest-50"
              : "border-plum-200 bg-plum-50"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
            Variance (bank − ledger)
          </p>
          <p
            className={`mt-1 font-serif text-2xl tabular-nums ${
              isBalanced ? "text-forest-600" : "text-plum-600"
            }`}
          >
            {formatMoney(variance, currency)}
          </p>
          <p className="mt-1 text-sm text-navy-600">
            {isBalanced
              ? "All three balances agree. The reconciliation will be saved as BALANCED."
              : "The three balances do not agree. The reconciliation will be saved as OUT_OF_BALANCE for follow-up."}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="notes"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Any anomalies, outstanding deposits, or correspondence with the bank."
          className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-plum-200 bg-plum-50 px-4 py-3 text-sm text-plum-700">
          {error}
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push(`/trust-engine/${accountId}`)}
          className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Record reconciliation"}
        </button>
      </div>
    </form>
  );
}
