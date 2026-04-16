"use client";

import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";

export type Integration = {
  key: string;
  name: string;
  desc: string;
  status: "connected" | "available" | "coming-soon";
  action?: "connect" | "manage";
  backend?: boolean;
};

const statusStyles: Record<Integration["status"], string> = {
  connected: "bg-forest-100 text-forest-800",
  available: "bg-navy-100 text-navy-700",
  "coming-soon": "bg-plum-50 text-plum-600",
};

const statusLabels: Record<Integration["status"], string> = {
  connected: "Connected",
  available: "Available",
  "coming-soon": "Coming soon",
};

function IntegrationLogo({ name }: { name: string }) {
  const initials = name
    .split(/[\s—–-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-navy-200 bg-navy-50 text-sm font-semibold text-navy-700"
    >
      {initials || "M"}
    </div>
  );
}

export default function IntegrationsGrid({
  integrations,
}: {
  integrations: Integration[];
}) {
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function onClick(item: Integration) {
    if (item.backend) {
      toast.info(`${item.name} is managed by Marco Reid — no setup needed.`);
      return;
    }
    if (item.status === "coming-soon") {
      toast.info(`${item.name} is coming soon. We'll let you know.`);
      return;
    }
    if (item.key === "stripe" && item.action === "manage") {
      setBusy(item.key);
      try {
        const res = await fetch("/api/billing/portal", { method: "POST" });
        const data = (await res.json()) as { url?: string };
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        toast.error("Could not open Stripe portal.");
      } catch {
        toast.error("Could not open Stripe portal.");
      } finally {
        setBusy(null);
      }
      return;
    }
    if (item.key === "stripe-connect" && item.action === "connect") {
      setBusy(item.key);
      try {
        const res = await fetch("/api/billing/connect/onboard", {
          method: "POST",
        });
        const data = (await res.json()) as { url?: string };
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        toast.error("Could not start Stripe Connect.");
      } catch {
        toast.error("Could not start Stripe Connect.");
      } finally {
        setBusy(null);
      }
      return;
    }
    if (item.key === "stripe" && item.action === "connect") {
      window.location.href = "/pricing";
      return;
    }
    toast.info(`${item.name} setup is coming soon.`);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {integrations.map((item) => {
        const ctaLabel = item.backend
          ? "Built in"
          : item.status === "coming-soon"
            ? "Notify me"
            : item.action === "manage"
              ? "Manage"
              : "Connect";
        const isBusy = busy === item.key;
        return (
          <div
            key={item.key}
            className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-200 hover:shadow-card-hover sm:p-6"
          >
            <div className="flex items-start gap-4">
              <IntegrationLogo name={item.name} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-navy-800">
                    {item.name}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {statusLabels[item.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-navy-400">{item.desc}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => onClick(item)}
                disabled={isBusy || item.backend}
                aria-label={`${ctaLabel} ${item.name}`}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  item.backend
                    ? "cursor-default border border-navy-100 bg-navy-50 text-navy-400"
                    : item.status === "coming-soon"
                      ? "border border-navy-200 bg-white text-navy-700 hover:bg-navy-50"
                      : "bg-navy-700 text-white hover:bg-navy-800"
                } disabled:opacity-60`}
              >
                {isBusy ? "Loading…" : ctaLabel}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
