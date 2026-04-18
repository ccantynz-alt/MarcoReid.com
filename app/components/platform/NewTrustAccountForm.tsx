"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/shared/Toast";

interface Client {
  id: string;
  name: string;
  companyName: string | null;
}

export default function NewTrustAccountForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const toast = useToast();
  const [clientId, setClientId] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [depositDescription, setDepositDescription] = useState("Opening deposit");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientId) {
      toast.error("Select a client", "Choose which client this trust account is for.");
      return;
    }

    setSubmitting(true);
    try {
      const createRes = await fetch("/api/trust-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, currency }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData.error || "Could not create trust account.");
      }

      const accountId = createData.trustAccount?.id ?? createData.id;

      // If there's an initial deposit, record it
      const depositCents = Math.round(parseFloat(initialDeposit || "0") * 100);
      if (accountId && depositCents > 0) {
        await fetch(`/api/trust-accounts/${accountId}/transactions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "DEPOSIT",
            amountInCents: depositCents,
            description: depositDescription || "Opening deposit",
          }),
        });
      }

      toast.success("Trust account opened", "Ready to record transactions.");
      router.push(accountId ? `/trust/${accountId}` : "/trust");
      router.refresh();
    } catch (err) {
      toast.error(
        "Could not open account",
        err instanceof Error ? err.message : "Try again in a moment.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="clientId"
          className="block text-sm font-medium text-navy-600"
        >
          Client
        </label>
        <select
          id="clientId"
          required
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
        >
          <option value="">Select a client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
              {c.companyName ? ` · ${c.companyName}` : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="currency"
          className="block text-sm font-medium text-navy-600"
        >
          Currency
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
        >
          <option value="USD">USD — US Dollar</option>
          <option value="NZD">NZD — New Zealand Dollar</option>
          <option value="AUD">AUD — Australian Dollar</option>
          <option value="GBP">GBP — British Pound</option>
          <option value="EUR">EUR — Euro</option>
          <option value="CAD">CAD — Canadian Dollar</option>
        </select>
      </div>

      <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-4">
        <p className="text-sm font-medium text-navy-700">
          Initial deposit (optional)
        </p>
        <p className="mt-1 text-xs text-navy-400">
          Skip this and record the first deposit later if you prefer.
        </p>
        <div className="mt-3 space-y-3">
          <div>
            <label
              htmlFor="initialDeposit"
              className="block text-xs font-medium text-navy-500"
            >
              Amount ({currency})
            </label>
            <input
              id="initialDeposit"
              type="number"
              step="0.01"
              min="0"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm tabular-nums text-navy-700 placeholder-navy-300 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label
              htmlFor="depositDescription"
              className="block text-xs font-medium text-navy-500"
            >
              Description
            </label>
            <input
              id="depositDescription"
              type="text"
              value={depositDescription}
              onChange={(e) => setDepositDescription(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 placeholder-navy-300 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              placeholder="Opening deposit"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 disabled:opacity-50"
      >
        {submitting ? "Opening account…" : "Open trust account"}
      </button>
    </form>
  );
}
