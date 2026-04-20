"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProActionButtons({
  matterId,
  canAccept,
}: {
  matterId: string;
  canAccept: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<"accept" | "pass" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function act(action: "accept" | "pass") {
    setBusy(action);
    setError(null);
    try {
      const res = await fetch(`/api/marketplace/matters/${matterId}/${action}`, {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Failed");
        setBusy(null);
        return;
      }
      if (action === "accept") {
        router.push(`/pro-matter/${matterId}`);
      } else {
        router.refresh();
      }
    } catch {
      setError("Network error");
      setBusy(null);
    }
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => act("accept")}
        disabled={!canAccept || busy !== null}
        className="rounded-lg bg-forest-500 px-5 py-2 text-sm font-semibold text-white hover:bg-forest-600 disabled:cursor-not-allowed disabled:bg-navy-200"
      >
        {busy === "accept" ? "Accepting…" : "Accept"}
      </button>
      <button
        type="button"
        onClick={() => act("pass")}
        disabled={busy !== null}
        className="rounded-lg border border-navy-200 px-5 py-2 text-sm font-semibold text-navy-600 hover:bg-navy-50 disabled:opacity-50"
      >
        {busy === "pass" ? "…" : "Pass"}
      </button>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
