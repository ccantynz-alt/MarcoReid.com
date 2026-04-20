"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelMatterButton({ matterId }: { matterId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function handleCancel() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/marketplace/matters/${matterId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || "Could not cancel this matter");
        setLoading(false);
        return;
      }
      router.push("/my-matters");
      router.refresh();
    } catch {
      setError("Network error — please try again");
      setLoading(false);
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center text-sm font-medium text-navy-500 underline hover:text-navy-800"
      >
        Cancel this matter
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-semibold text-red-800">
        Cancel this matter?
      </p>
      <p className="mt-1 text-sm text-red-700">
        It will be withdrawn from the marketplace. You can post a new matter at any time.
      </p>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Cancelling…" : "Yes, cancel matter"}
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirming(false);
            setError(null);
          }}
          className="inline-flex items-center rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
        >
          Keep it open
        </button>
      </div>
    </div>
  );
}
