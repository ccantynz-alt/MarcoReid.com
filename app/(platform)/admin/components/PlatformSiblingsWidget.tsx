"use client";

import { useCallback, useEffect, useState } from "react";

// Live family health strip. Renders one card per sibling product (plus
// self) and polls each /api/platform-status endpoint every 30s with a
// 3s per-request timeout. A sibling that fails to answer renders as
// "unreachable" and never crashes the widget — the strip stays up
// even if every other family member is down.

type ProductSlug = "marco-reid" | "crontech" | "gluecron" | "gatetest";

interface PlatformStatus {
  product: string;
  version?: string;
  status: "operational" | "degraded" | "outage";
  region?: string;
  uptimeSeconds?: number;
  checks?: {
    database?: { status: string; latencyMs?: number };
    ai?: { status: string; latencyMs?: number };
    email?: { status: string; queuedCount?: number };
    storage?: { status: string };
  };
  metrics?: {
    activeUsers24h?: number;
    activeMatters?: number;
    pendingSignoffs?: number;
  };
  timestamp?: string;
}

interface SiblingState {
  slug: ProductSlug;
  label: string;
  url: string;
  status: PlatformStatus | null;
  reachable: boolean;
  lastCheckedAt: Date | null;
  loading: boolean;
}

const POLL_INTERVAL_MS = 30_000;
const FETCH_TIMEOUT_MS = 3_000;

function getSiblings(): SiblingState[] {
  return [
    {
      slug: "marco-reid",
      label: "Marco Reid",
      url: "/api/platform-status",
      status: null,
      reachable: true,
      lastCheckedAt: null,
      loading: true,
    },
    {
      slug: "crontech",
      label: "Crontech",
      url:
        process.env.NEXT_PUBLIC_CRONTECH_STATUS_URL ||
        "https://crontech.ai/api/platform-status",
      status: null,
      reachable: true,
      lastCheckedAt: null,
      loading: true,
    },
    {
      slug: "gluecron",
      label: "Gluecron",
      url:
        process.env.NEXT_PUBLIC_GLUECRON_STATUS_URL ||
        "https://gluecron.com/api/platform-status",
      status: null,
      reachable: true,
      lastCheckedAt: null,
      loading: true,
    },
    {
      slug: "gatetest",
      label: "Gatetest",
      url:
        process.env.NEXT_PUBLIC_GATETEST_STATUS_URL ||
        "https://gatetest.io/api/platform-status",
      status: null,
      reachable: true,
      lastCheckedAt: null,
      loading: true,
    },
  ];
}

function StatusDot({
  state,
}: {
  state: "operational" | "degraded" | "outage" | "unreachable";
}) {
  const colour =
    state === "operational"
      ? "bg-forest-500"
      : state === "degraded"
        ? "bg-gold-400"
        : state === "outage"
          ? "bg-plum-600"
          : "bg-navy-300";
  const ring =
    state === "operational"
      ? "ring-forest-200"
      : state === "degraded"
        ? "ring-gold-200"
        : state === "outage"
          ? "ring-plum-200"
          : "ring-navy-200";
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${colour} ring-4 ${ring}`}
      aria-hidden="true"
    />
  );
}

function formatRelative(d: Date | null): string {
  if (!d) return "—";
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

export default function PlatformSiblingsWidget() {
  const [siblings, setSiblings] = useState<SiblingState[]>(() => getSiblings());
  const [expanded, setExpanded] = useState<ProductSlug | null>(null);

  const refresh = useCallback(async () => {
    const next = await Promise.all(
      siblings.map(async (sibling) => {
        try {
          const res = await fetch(sibling.url, {
            method: "GET",
            cache: "no-store",
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
          });
          if (!res.ok) {
            return {
              ...sibling,
              status: null,
              reachable: false,
              lastCheckedAt: new Date(),
              loading: false,
            };
          }
          const status = (await res.json()) as PlatformStatus;
          return {
            ...sibling,
            status,
            reachable: true,
            lastCheckedAt: new Date(),
            loading: false,
          };
        } catch {
          return {
            ...sibling,
            status: null,
            reachable: false,
            lastCheckedAt: new Date(),
            loading: false,
          };
        }
      }),
    );
    setSiblings(next);
    // siblings is intentionally stable for the lifetime of the component —
    // re-running this effect on every render would cause a tight poll loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <section
      aria-label="Family platform health"
      className="mb-8 rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
            Family network
          </p>
          <h2 className="mt-1 font-serif text-xl text-navy-800 dark:text-navy-100">
            Sibling products — live health
          </h2>
        </div>
        <p className="text-xs text-navy-400">Polls every 30s</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {siblings.map((sibling) => {
          const state: "operational" | "degraded" | "outage" | "unreachable" =
            !sibling.reachable
              ? "unreachable"
              : (sibling.status?.status ?? "unreachable");
          const isOpen = expanded === sibling.slug;
          return (
            <button
              key={sibling.slug}
              type="button"
              onClick={() => setExpanded(isOpen ? null : sibling.slug)}
              className={`flex flex-col rounded-xl border p-4 text-left transition-colors ${
                isOpen
                  ? "border-gold-400 bg-gold-50/40 dark:border-gold-400 dark:bg-navy-800"
                  : "border-navy-100 bg-navy-50/40 hover:border-navy-300 dark:border-navy-700 dark:bg-navy-800/50 dark:hover:border-navy-500"
              }`}
              aria-expanded={isOpen}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-navy-800 dark:text-navy-100">
                  {sibling.label}
                </span>
                <StatusDot state={state} />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-navy-400">
                {state === "unreachable"
                  ? "unreachable"
                  : (sibling.status?.region ?? "—")}
              </p>
              <p className="mt-3 text-[11px] text-navy-400">
                {sibling.loading
                  ? "Checking…"
                  : `Checked ${formatRelative(sibling.lastCheckedAt)}`}
              </p>

              {isOpen && (
                <div className="mt-3 space-y-1.5 border-t border-navy-100 pt-3 text-xs text-navy-500 dark:border-navy-700 dark:text-navy-300">
                  {sibling.status ? (
                    <>
                      <div className="flex justify-between">
                        <span>Version</span>
                        <span className="tabular-nums">
                          {sibling.status.version ?? "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Database</span>
                        <span>
                          {sibling.status.checks?.database?.status ?? "—"}
                          {sibling.status.checks?.database?.latencyMs != null
                            ? ` · ${sibling.status.checks.database.latencyMs}ms`
                            : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI</span>
                        <span>
                          {sibling.status.checks?.ai?.status ?? "—"}
                          {sibling.status.checks?.ai?.latencyMs != null
                            ? ` · ${sibling.status.checks.ai.latencyMs}ms`
                            : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email</span>
                        <span>
                          {sibling.status.checks?.email?.status ?? "—"}
                          {sibling.status.checks?.email?.queuedCount != null
                            ? ` · ${sibling.status.checks.email.queuedCount} queued`
                            : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage</span>
                        <span>
                          {sibling.status.checks?.storage?.status ?? "—"}
                        </span>
                      </div>
                      <div className="mt-2 border-t border-navy-100 pt-2 dark:border-navy-700">
                        <div className="flex justify-between">
                          <span>Active users (24h)</span>
                          <span className="tabular-nums">
                            {sibling.status.metrics?.activeUsers24h ?? "—"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active matters</span>
                          <span className="tabular-nums">
                            {sibling.status.metrics?.activeMatters ?? "—"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pending signoffs</span>
                          <span className="tabular-nums">
                            {sibling.status.metrics?.pendingSignoffs ?? "—"}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-navy-400">
                      Sibling did not answer in 3s.
                    </p>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
