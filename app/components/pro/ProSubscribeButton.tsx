"use client";

import { useState } from "react";
import type { ProPlanTier } from "@/lib/marketplace/pro-plans";

export default function ProSubscribeButton({
  tier,
  highlighted,
}: {
  tier: ProPlanTier;
  highlighted?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pro/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Could not start checkout");
        setLoading(false);
        return;
      }
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setError("No checkout URL returned");
      setLoading(false);
    } catch {
      setError("Network error — please try again");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`mt-8 w-full rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-50 ${
          highlighted
            ? "bg-white text-navy-800 hover:bg-navy-50"
            : "bg-navy-500 text-white hover:bg-navy-600"
        }`}
      >
        {loading ? "Redirecting…" : "Subscribe"}
      </button>
      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </>
  );
}
