"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface JurisdictionOption {
  value: string;
  label: string;
  citation: string;
}

interface Props {
  jurisdictions: JurisdictionOption[];
}

export default function NewAccountForm({ jurisdictions }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [jurisdiction, setJurisdiction] = useState(jurisdictions[0]?.value ?? "");
  const [bankName, setBankName] = useState("");
  const [bankAccountMasked, setBankAccountMasked] = useState("");
  const [bsbOrSortCode, setBsbOrSortCode] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [iban, setIban] = useState("");
  const [currency, setCurrency] = useState("NZD");
  const [openingBalance, setOpeningBalance] = useState("0");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCitation = jurisdictions.find(
    (j) => j.value === jurisdiction,
  )?.citation;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/trust/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          jurisdiction,
          bankName,
          bankAccountMasked,
          bsbOrSortCode: bsbOrSortCode || null,
          routingNumber: routingNumber || null,
          iban: iban || null,
          currency,
          openingBalance,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Could not create account");
      }
      const data = (await res.json()) as { account: { id: string } };
      router.push(`/trust-engine/${data.account.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
        >
          Account name
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="e.g. Firm general trust account"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="jurisdiction"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
        >
          Jurisdiction
        </label>
        <select
          id="jurisdiction"
          required
          value={jurisdiction}
          onChange={(e) => setJurisdiction(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
        >
          {jurisdictions.map((j) => (
            <option key={j.value} value={j.value}>
              {j.label}
            </option>
          ))}
        </select>
        {selectedCitation && (
          <p className="mt-1 text-xs text-navy-400">
            Governed by {selectedCitation}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="bankName"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            Bank name
          </label>
          <input
            id="bankName"
            type="text"
            required
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="bankAccountMasked"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            Account (last 4 digits)
          </label>
          <input
            id="bankAccountMasked"
            type="text"
            required
            maxLength={4}
            inputMode="numeric"
            pattern="[0-9]{4}"
            placeholder="0000"
            value={bankAccountMasked}
            onChange={(e) => setBankAccountMasked(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="bsbOrSortCode"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            BSB / sort code / branch
          </label>
          <input
            id="bsbOrSortCode"
            type="text"
            value={bsbOrSortCode}
            onChange={(e) => setBsbOrSortCode(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="routingNumber"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            Routing number (US)
          </label>
          <input
            id="routingNumber"
            type="text"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="iban"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            IBAN (UK / EU)
          </label>
          <input
            id="iban"
            type="text"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="currency"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
          >
            <option value="NZD">NZD</option>
            <option value="AUD">AUD</option>
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="openingBalance"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            Opening balance
          </label>
          <input
            id="openingBalance"
            type="number"
            step="0.01"
            value={openingBalance}
            onChange={(e) => setOpeningBalance(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-plum-200 bg-plum-50 px-4 py-3 text-sm text-plum-700">
          {error}
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/trust-engine")}
          className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating…" : "Create trust account"}
        </button>
      </div>
    </form>
  );
}
