"use client";

/**
 * NewJournalEntryForm — client-side multi-line editor.
 *
 * Real-time debit/credit totals so the post button enables only when
 * the entry balances. Submits to /api/ledger/journal (creates DRAFT)
 * then to /api/ledger/journal/[id]/post (promotes to POSTED).
 */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface AccountOption {
  id: string;
  code: string;
  name: string;
  type: string;
}

interface Line {
  accountId: string;
  debit: string;
  credit: string;
  description: string;
}

const blankLine = (): Line => ({ accountId: "", debit: "", credit: "", description: "" });

function n(v: string): number {
  const x = Number(v);
  return Number.isFinite(x) && x > 0 ? x : 0;
}

export default function NewJournalEntryForm({ accounts }: { accounts: AccountOption[] }) {
  const router = useRouter();
  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [lines, setLines] = useState<Line[]>([blankLine(), blankLine()]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalDebit = useMemo(() => lines.reduce((acc, l) => acc + n(l.debit), 0), [lines]);
  const totalCredit = useMemo(() => lines.reduce((acc, l) => acc + n(l.credit), 0), [lines]);
  const balanced = totalDebit > 0 && Math.abs(totalDebit - totalCredit) < 0.005;

  function update(i: number, patch: Partial<Line>) {
    setLines((current) => current.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }

  function addLine() {
    setLines((current) => [...current, blankLine()]);
  }

  function removeLine(i: number) {
    setLines((current) => (current.length <= 2 ? current : current.filter((_, idx) => idx !== i)));
  }

  async function submit(post: boolean) {
    setError(null);
    setBusy(true);
    try {
      if (!description.trim()) throw new Error("Description is required.");
      if (post && !balanced) throw new Error("Debits must equal credits before posting.");
      const cleanLines = lines
        .filter((l) => l.accountId && (n(l.debit) > 0 || n(l.credit) > 0))
        .map((l) => ({
          accountId: l.accountId,
          debit: n(l.debit).toString(),
          credit: n(l.credit).toString(),
          description: l.description || undefined,
        }));
      if (post && cleanLines.length < 2) throw new Error("At least two lines required.");

      const created = await fetch("/api/ledger/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryDate, description, reference, lines: cleanLines }),
        signal: AbortSignal.timeout(10_000),
      });
      const createdJson = await created.json();
      if (!created.ok) throw new Error(createdJson.error ?? "Failed to save");
      const entryId = createdJson.entry.id as string;

      if (post) {
        const posted = await fetch(`/api/ledger/journal/${entryId}/post`, {
          method: "POST",
          signal: AbortSignal.timeout(10_000),
        });
        const postedJson = await posted.json();
        if (!posted.ok) throw new Error(postedJson.error ?? "Failed to post");
      }

      router.push("/books/journal");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-6 dark:border-navy-700 dark:bg-navy-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="font-semibold text-navy-700 dark:text-navy-100">Date</span>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-navy-300 bg-white px-3 py-2 text-sm dark:border-navy-600 dark:bg-navy-800 dark:text-navy-100"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-semibold text-navy-700 dark:text-navy-100">Description</span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Office rent for April"
            className="mt-1 w-full rounded-lg border border-navy-300 bg-white px-3 py-2 text-sm dark:border-navy-600 dark:bg-navy-800 dark:text-navy-100"
          />
        </label>
        <label className="block text-sm sm:col-span-3">
          <span className="font-semibold text-navy-700 dark:text-navy-100">Reference (optional)</span>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="invoice #, contract id, etc."
            className="mt-1 w-full rounded-lg border border-navy-300 bg-white px-3 py-2 text-sm dark:border-navy-600 dark:bg-navy-800 dark:text-navy-100"
          />
        </label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-200 text-left text-xs uppercase tracking-wider text-navy-400 dark:border-navy-700">
              <th className="py-2">Account</th>
              <th className="py-2">Memo</th>
              <th className="w-32 py-2 text-right">Debit</th>
              <th className="w-32 py-2 text-right">Credit</th>
              <th className="w-12 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="border-b border-navy-50 dark:border-navy-800">
                <td className="py-2 pr-2">
                  <select
                    value={line.accountId}
                    onChange={(e) => update(i, { accountId: e.target.value })}
                    className="w-full rounded-lg border border-navy-300 bg-white px-2 py-1.5 text-sm dark:border-navy-600 dark:bg-navy-800 dark:text-navy-100"
                  >
                    <option value="">Select account…</option>
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.code} — {a.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 pr-2">
                  <input
                    type="text"
                    value={line.description}
                    onChange={(e) => update(i, { description: e.target.value })}
                    className="w-full rounded-lg border border-navy-300 bg-white px-2 py-1.5 text-sm dark:border-navy-600 dark:bg-navy-800 dark:text-navy-100"
                  />
                </td>
                <td className="py-2 pr-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={line.debit}
                    onChange={(e) => update(i, { debit: e.target.value, credit: "" })}
                    className="w-full rounded-lg border border-navy-300 bg-white px-2 py-1.5 text-right font-mono text-sm dark:border-navy-600 dark:bg-navy-800 dark:text-navy-100"
                  />
                </td>
                <td className="py-2 pr-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={line.credit}
                    onChange={(e) => update(i, { credit: e.target.value, debit: "" })}
                    className="w-full rounded-lg border border-navy-300 bg-white px-2 py-1.5 text-right font-mono text-sm dark:border-navy-600 dark:bg-navy-800 dark:text-navy-100"
                  />
                </td>
                <td className="py-2 text-right">
                  <button
                    type="button"
                    onClick={() => removeLine(i)}
                    disabled={lines.length <= 2}
                    className="text-xs text-navy-400 hover:text-red-600 disabled:cursor-not-allowed disabled:text-navy-200"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className="pt-2">
                <button
                  type="button"
                  onClick={addLine}
                  className="text-xs font-semibold text-gold-600 hover:text-gold-700"
                >
                  + Add line
                </button>
              </td>
              <td className="pt-2 text-right font-mono text-sm font-semibold">
                {totalDebit.toFixed(2)}
              </td>
              <td className="pt-2 text-right font-mono text-sm font-semibold">
                {totalCredit.toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-navy-100 bg-navy-50 px-4 py-2 text-xs dark:border-navy-700 dark:bg-navy-800">
        <span className={balanced ? "font-semibold text-green-700 dark:text-green-300" : "font-semibold text-gold-700 dark:text-gold-300"}>
          {balanced ? "Balanced" : `Out of balance: ${(totalDebit - totalCredit).toFixed(2)}`}
        </span>
        <span className="text-navy-400">Debits and credits must match exactly.</span>
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => submit(false)}
          disabled={busy}
          className="rounded-lg border border-navy-300 px-5 py-2 text-sm font-semibold text-navy-600 hover:bg-navy-50 disabled:opacity-50 dark:border-navy-600 dark:text-navy-200 dark:hover:bg-navy-800"
        >
          Save draft
        </button>
        <button
          type="button"
          onClick={() => submit(true)}
          disabled={busy || !balanced}
          className="rounded-lg bg-navy-500 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-600 disabled:opacity-50"
        >
          Save and post
        </button>
      </div>
    </div>
  );
}
