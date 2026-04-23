"use client";

/**
 * BanksClient — per-provider Connect button.
 *
 * If the provider's keys are configured the button initiates a
 * connection (which will eventually trigger the OAuth flow). If the
 * keys are missing the button still posts so the platform records the
 * intent — the response message explains what's needed.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BanksClient({
  provider,
  configured,
}: {
  provider: string;
  configured: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function connect() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/bankfeeds/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
        signal: AbortSignal.timeout(10_000),
      });
      const json = await res.json();
      setMessage(json.message ?? (res.ok ? "Connection initiated." : json.error ?? "Failed."));
      if (res.ok) router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to initiate connection.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={connect}
        disabled={busy}
        className={`w-full rounded-lg px-4 py-2 text-sm font-semibold ${
          configured
            ? "bg-navy-500 text-white hover:bg-navy-600"
            : "border border-navy-300 text-navy-600 hover:bg-navy-50 dark:border-navy-600 dark:text-navy-200 dark:hover:bg-navy-800"
        } disabled:opacity-50`}
      >
        {busy ? "Connecting…" : configured ? "Connect" : "Set up keys"}
      </button>
      {message && <p className="mt-2 text-xs text-navy-400">{message}</p>}
    </div>
  );
}
