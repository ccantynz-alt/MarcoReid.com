"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TimerWidget from "./TimerWidget";

interface MatterOption {
  id: string;
  title: string;
  clientName?: string;
}

export default function FloatingTimer() {
  const pathname = usePathname();
  const [matters, setMatters] = useState<MatterOption[] | null>(null);
  const [defaultRateInCents, setDefaultRateInCents] = useState<number>(30000);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/matters", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const list: MatterOption[] = (data.matters ?? []).map(
          (m: { id: string; title: string; client?: { name?: string } }) => ({
            id: m.id,
            title: m.title,
            clientName: m.client?.name,
          })
        );
        setMatters(list);
      } catch {
        // ignore
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      const r = localStorage.getItem("mr:timer:rate");
      if (r) {
        const n = parseInt(r, 10);
        if (Number.isFinite(n)) setDefaultRateInCents(n);
      }
    } catch {}
  }, []);

  // Do not render on the /time page itself — it already has an inline timer.
  if (pathname?.startsWith("/time")) return null;

  // Do not render until matters are loaded to avoid an empty picker flash
  if (!matters || matters.length === 0) return null;

  return (
    <TimerWidget matters={matters} defaultRateInCents={defaultRateInCents} floating />
  );
}
