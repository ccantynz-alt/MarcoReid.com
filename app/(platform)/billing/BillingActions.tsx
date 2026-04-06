"use client";

import { useState } from "react";

export default function BillingActions({
  hasCustomer,
  connectOnboarded,
}: {
  hasCustomer: boolean;
  connectOnboarded: boolean;
}) {
  const [loading, setLoading] = useState<string | null>(null);

  async function go(endpoint: string, key: string) {
    setLoading(key);
    try {
      const res = await fetch(endpoint, { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {hasCustomer && (
        <button
          onClick={() => go("/api/billing/portal", "portal")}
          disabled={loading !== null}
          className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-50"
        >
          {loading === "portal" ? "Loading..." : "Manage billing"}
        </button>
      )}
      {!connectOnboarded && (
        <button
          onClick={() => go("/api/billing/connect/onboard", "connect")}
          disabled={loading !== null}
          className="rounded-lg border border-navy-300 bg-white px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 disabled:opacity-50"
        >
          {loading === "connect" ? "Loading..." : "Onboard with Stripe"}
        </button>
      )}
      {connectOnboarded && (
        <span className="rounded-lg bg-forest-100 px-4 py-2 text-sm font-semibold text-forest-800">
          Connect onboarded
        </span>
      )}
    </div>
  );
}
