"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/shared/Toast";

interface Matter {
  id: string;
  title: string;
  matterNumber: string | null;
}

interface Props {
  accountId: string;
  currentBalance: number;
  currency: string;
  matters: Matter[];
}

type TxType = "DEPOSIT" | "WITHDRAWAL" | "FEE_DRAW";

export default function TrustTransactionForm({
  accountId,
  currentBalance,
  currency,
  matters,
}: Props) {
  const router = useRouter();
  const toast = useToast();
  const [type, setType] = useState<TxType>("DEPOSIT");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [matterId, setMatterId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const amountCents = Math.round(parseFloat(amount || "0") * 100);
  const wouldOverdraw =
    type !== "DEPOSIT" && amountCents > currentBalance;
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(currentBalance / 100);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amountCents || amountCents <= 0) {
      toast.error("Invalid amount", "Enter an amount greater than zero.");
      return;
    }
    if (!description.trim()) {
      toast.error("Description required", "Every trust entry must have a description for audit purposes.");
      return;
    }
    if (wouldOverdraw) {
      toast.error(
        "Insufficient balance",
        `Cannot ${type === "FEE_DRAW" ? "draw fees" : "withdraw"} more than the current balance of ${formattedBalance}.`,
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/trust-accounts/${accountId}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          amountInCents: amountCents,
          description: description.trim(),
          matterId: matterId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not record transaction.");
      }
      const label =
        type === "DEPOSIT"
          ? "Deposit recorded"
          : type === "FEE_DRAW"
            ? "Fee drawn"
            : "Withdrawal recorded";
      toast.success(
        label,
        `${description.trim()} · ${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amountCents / 100)}`,
      );
      setAmount("");
      setDescription("");
      setMatterId("");
      router.refresh();
    } catch (err) {
      toast.error(
        "Could not save transaction",
        err instanceof Error ? err.message : "Try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const typeOptions: {
    value: TxType;
    label: string;
    colour: string;
    description: string;
  }[] = [
    {
      value: "DEPOSIT",
      label: "Deposit",
      colour: "forest",
      description: "Client funds received into trust",
    },
    {
      value: "WITHDRAWAL",
      label: "Withdrawal",
      colour: "plum",
      description: "Disbursement to client or third party",
    },
    {
      value: "FEE_DRAW",
      label: "Fee draw",
      colour: "navy",
      description: "Earned fees moving to operating account",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400">
          Type
        </label>
        <div className="mt-2 grid gap-2">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setType(opt.value)}
              className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
                type === opt.value
                  ? opt.colour === "forest"
                    ? "border-forest-500 bg-forest-50"
                    : opt.colour === "plum"
                      ? "border-plum-500 bg-plum-50"
                      : "border-navy-500 bg-navy-50"
                  : "border-navy-200 bg-white hover:border-navy-300"
              }`}
            >
              <p className="text-sm font-medium text-navy-700">{opt.label}</p>
              <p className="mt-0.5 text-xs text-navy-400">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
        >
          Amount ({currency})
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-sm tabular-nums text-navy-700 placeholder-navy-300 focus:outline-none focus:ring-1 ${
            wouldOverdraw
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-navy-200 focus:border-navy-500 focus:ring-navy-500"
          }`}
          placeholder="0.00"
        />
        {wouldOverdraw && (
          <p className="mt-1.5 text-xs text-red-600">
            Exceeds balance of {formattedBalance}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          placeholder="e.g. Retainer deposit"
        />
      </div>

      {matters.length > 0 && (
        <div>
          <label
            htmlFor="matterId"
            className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
          >
            Link to matter (optional)
          </label>
          <select
            id="matterId"
            value={matterId}
            onChange={(e) => setMatterId(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="">No matter</option>
            {matters.map((m) => (
              <option key={m.id} value={m.id}>
                {m.matterNumber ? `#${m.matterNumber} · ` : ""}
                {m.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || wouldOverdraw}
        className="flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 disabled:opacity-50"
      >
        {submitting ? "Recording…" : "Record transaction"}
      </button>
    </form>
  );
}
