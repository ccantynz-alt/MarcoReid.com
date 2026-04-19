"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ---------- types ---------- */

interface Client {
  id: string;
  name: string;
}

interface Matter {
  id: string;
  title: string;
  matterNumber: string | null;
}

interface TrustAccount {
  id: string;
  clientId: string;
  currency: string;
  balanceInCents: number;
  client: { id: string; name: string };
}

interface Transaction {
  id: string;
  type: "DEPOSIT" | "WITHDRAWAL" | "FEE_DRAW";
  amountInCents: number;
  description: string;
  matterId: string | null;
  createdAt: string;
}

interface Props {
  accounts: TrustAccount[];
  clients: Client[];
  matters: Matter[];
}

/* ---------- helpers ---------- */

const CURRENCIES = ["USD", "NZD", "AUD", "GBP", "EUR"] as const;

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    cents / 100,
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const input =
  "w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100";
const label = "block text-sm font-medium text-navy-600 mb-1.5";
const btnPrimary =
  "inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:opacity-50";
const btnSecondary =
  "inline-flex min-h-touch items-center rounded-lg px-5 py-3 text-sm font-semibold text-navy-500 hover:text-navy-700";

/* ======================================================================
   MAIN COMPONENT
   ====================================================================== */

export default function TrustActions({ accounts, clients, matters }: Props) {
  return (
    <div className="space-y-10">
      <NewAccountForm clients={clients} />
      <AccountsTable accounts={accounts} matters={matters} />
    </div>
  );
}

/* ======================================================================
   NEW TRUST ACCOUNT FORM
   ====================================================================== */

function NewAccountForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    clientId: clients[0]?.id ?? "",
    currency: "USD" as string,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/trust-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create trust account");
      }
      router.refresh();
      setForm({ clientId: clients[0]?.id ?? "", currency: "USD" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  if (clients.length === 0) return null;

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
      <h2 className="font-serif text-lg text-navy-800">New trust account</h2>
      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div>
          <label className={label}>Client *</label>
          <select
            required
            className={input}
            value={form.clientId}
            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Currency *</label>
          <select
            required
            className={input}
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-plum-600">{error}</p>}

        <button type="submit" disabled={submitting} className={btnPrimary}>
          {submitting ? "Creating..." : "Create trust account"}
        </button>
      </form>
    </div>
  );
}

/* ======================================================================
   ACCOUNTS TABLE (with expandable rows + transaction form)
   ====================================================================== */

function AccountsTable({
  accounts,
  matters,
}: {
  accounts: TrustAccount[];
  matters: Matter[];
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [txFormId, setTxFormId] = useState<string | null>(null);

  if (accounts.length === 0) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white shadow-card">
        <div className="p-8 text-center text-sm text-navy-400">
          No trust accounts yet.
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
      <table className="w-full">
        <thead className="border-b border-navy-100 bg-navy-50/50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
            <th className="px-6 py-3">Client</th>
            <th className="px-6 py-3">Currency</th>
            <th className="px-6 py-3 text-right">Balance</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a) => (
            <AccountRow
              key={a.id}
              account={a}
              matters={matters}
              expanded={expandedId === a.id}
              showTxForm={txFormId === a.id}
              onToggleExpand={() =>
                setExpandedId(expandedId === a.id ? null : a.id)
              }
              onToggleTxForm={() =>
                setTxFormId(txFormId === a.id ? null : a.id)
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ======================================================================
   SINGLE ACCOUNT ROW
   ====================================================================== */

function AccountRow({
  account,
  matters,
  expanded,
  showTxForm,
  onToggleExpand,
  onToggleTxForm,
}: {
  account: TrustAccount;
  matters: Matter[];
  expanded: boolean;
  showTxForm: boolean;
  onToggleExpand: () => void;
  onToggleTxForm: () => void;
}) {
  return (
    <>
      <tr className="border-b border-navy-50 last:border-0">
        <td className="px-6 py-4 text-sm font-medium text-navy-700">
          {account.client.name}
        </td>
        <td className="px-6 py-4 text-sm text-navy-500">{account.currency}</td>
        <td className="px-6 py-4 text-right text-sm font-semibold text-forest-600">
          {money(account.balanceInCents, account.currency)}
        </td>
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={onToggleTxForm}
              className="rounded-lg bg-forest-500 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-forest-600"
            >
              {showTxForm ? "Cancel" : "Record transaction"}
            </button>
            <button
              onClick={onToggleExpand}
              className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-500 transition-all hover:bg-navy-50"
            >
              {expanded ? "Hide history" : "History"}
            </button>
          </div>
        </td>
      </tr>

      {showTxForm && (
        <tr className="border-b border-navy-50">
          <td colSpan={4} className="px-6 py-4">
            <TransactionForm
              accountId={account.id}
              currency={account.currency}
              matters={matters}
              onDone={onToggleTxForm}
            />
          </td>
        </tr>
      )}

      {expanded && (
        <tr className="border-b border-navy-50">
          <td colSpan={4} className="px-0 py-0">
            <TransactionHistory
              accountId={account.id}
              currency={account.currency}
            />
          </td>
        </tr>
      )}
    </>
  );
}

/* ======================================================================
   TRANSACTION FORM
   ====================================================================== */

function TransactionForm({
  accountId,
  currency,
  matters,
  onDone,
}: {
  accountId: string;
  currency: string;
  matters: Matter[];
  onDone: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: "DEPOSIT" as "DEPOSIT" | "WITHDRAWAL" | "FEE_DRAW",
    amount: "",
    description: "",
    matterId: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const dollars = parseFloat(form.amount);
    if (isNaN(dollars) || dollars <= 0) {
      setError("Amount must be a positive number");
      setSubmitting(false);
      return;
    }

    const amountInCents = Math.round(dollars * 100);

    try {
      const res = await fetch(`/api/trust-accounts/${accountId}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.type,
          amountInCents,
          description: form.description,
          matterId: form.matterId || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to record transaction");
      }
      router.refresh();
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-navy-100 bg-navy-50/30 p-6">
      <h3 className="font-serif text-base text-navy-800">
        Record transaction
      </h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Type *</label>
            <select
              required
              className={input}
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value as "DEPOSIT" | "WITHDRAWAL" | "FEE_DRAW",
                })
              }
            >
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
              <option value="FEE_DRAW">Fee draw</option>
            </select>
          </div>
          <div>
            <label className={label}>Amount ({currency}) *</label>
            <input
              required
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className={input}
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={label}>Description *</label>
          <input
            required
            className={input}
            placeholder="e.g. Initial retainer deposit"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className={label}>Matter (optional)</label>
          <select
            className={input}
            value={form.matterId}
            onChange={(e) => setForm({ ...form, matterId: e.target.value })}
          >
            <option value="">-- None --</option>
            {matters.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
                {m.matterNumber ? ` (${m.matterNumber})` : ""}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-plum-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={submitting} className={btnPrimary}>
            {submitting ? "Recording..." : "Record transaction"}
          </button>
          <button type="button" onClick={onDone} className={btnSecondary}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ======================================================================
   TRANSACTION HISTORY (lazy-loaded)
   ====================================================================== */

function TransactionHistory({
  accountId,
  currency,
}: {
  accountId: string;
  currency: string;
}) {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/trust-accounts/${accountId}/transactions`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then((data) => {
        setTransactions(data.transactions ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load");
        setLoading(false);
      });
  }, [accountId]);

  if (loading) {
    return (
      <div className="px-6 py-6 text-center text-sm text-navy-400">
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-6 text-center text-sm text-plum-600">
        {error}
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="px-6 py-6 text-center text-sm text-navy-400">
        No transactions recorded yet.
      </div>
    );
  }

  // Compute running balance (transactions come newest-first, reverse for running calc)
  const reversed = [...transactions].reverse();
  const runningBalances: number[] = [];
  let running = 0;
  for (const tx of reversed) {
    const delta = tx.type === "DEPOSIT" ? tx.amountInCents : -tx.amountInCents;
    running += delta;
    runningBalances.push(running);
  }
  // Reverse back so indices align with original order
  runningBalances.reverse();

  return (
    <div className="bg-navy-50/30">
      <table className="w-full">
        <thead className="border-b border-navy-100 bg-navy-50/60">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
            <th className="px-6 py-2">Date</th>
            <th className="px-6 py-2">Type</th>
            <th className="px-6 py-2">Description</th>
            <th className="px-6 py-2 text-right">Amount</th>
            <th className="px-6 py-2 text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => {
            const isDeposit = tx.type === "DEPOSIT";
            const displayAmount = isDeposit
              ? money(tx.amountInCents, currency)
              : `-${money(tx.amountInCents, currency)}`;
            const typeLabel =
              tx.type === "FEE_DRAW"
                ? "Fee draw"
                : tx.type.charAt(0) + tx.type.slice(1).toLowerCase();

            return (
              <tr
                key={tx.id}
                className="border-b border-navy-50 last:border-0"
              >
                <td className="px-6 py-3 text-xs text-navy-500">
                  {formatDate(tx.createdAt)}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      isDeposit
                        ? "bg-forest-50 text-forest-700"
                        : "bg-gold-50 text-gold-700"
                    }`}
                  >
                    {typeLabel}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-navy-600">
                  {tx.description}
                </td>
                <td
                  className={`px-6 py-3 text-right text-sm font-medium ${
                    isDeposit ? "text-forest-600" : "text-plum-600"
                  }`}
                >
                  {displayAmount}
                </td>
                <td className="px-6 py-3 text-right text-sm font-semibold text-navy-700">
                  {money(runningBalances[i], currency)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
