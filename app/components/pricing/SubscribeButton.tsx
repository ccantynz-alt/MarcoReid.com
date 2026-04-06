"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubscribeButton({
  priceId,
  highlighted,
  label = "Subscribe",
}: {
  priceId?: string;
  highlighted?: boolean;
  label?: string;
}) {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (status !== "authenticated") {
      router.push("/login?next=/pricing");
      return;
    }
    if (!priceId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = (await res.json()) as { url?: string };
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  const base =
    "mt-8 w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors disabled:opacity-50";
  const cls = highlighted
    ? `${base} bg-white text-navy-700 hover:bg-navy-50`
    : `${base} bg-navy-700 text-white hover:bg-navy-800`;

  return (
    <button onClick={handleClick} disabled={loading || !priceId} className={cls}>
      {loading ? "Loading..." : label}
    </button>
  );
}
