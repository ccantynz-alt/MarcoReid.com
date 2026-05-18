"use client";

import { useState, useEffect, useCallback } from "react";
import LegalDisclaimer from "@/app/components/shared/LegalDisclaimer";
import Breadcrumb from "@/app/components/platform/Breadcrumb";

interface AuditEvent {
  id: string;
  userId: string;
  clientId: string | null;
  matterId: string | null;
  category: string;
  action: string;
  resource: string;
  resourceId: string | null;
  description: string;
  details: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  sessionId: string | null;
  previousHash: string | null;
  eventHash: string;
  timestamp: string;
}

interface ClientSummary {
  id: string;
  userId: string;
  clientId: string;
  totalEvents: number;
  lastEventAt: string | null;
  authEvents: number;
  matterEvents: number;
  documentEvents: number;
  trustEvents: number;
  billingEvents: number;
  researchEvents: number;
  voiceEvents: number;
  complianceEvents: number;
}

interface VerificationResult {
  valid: boolean;
  totalEvents: number;
  brokenAt?: string;
  message: string;
}

const CATEGORIES = [
  "all",
  "auth",
  "matter",
  "client",
  "document",
  "trust",
  "billing",
  "research",
  "voice",
  "communication",
  "compliance",
  "system",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  auth: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  matter: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  client: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  document: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  trust: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  billing: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  research: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  voice: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  communication: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  compliance: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  system: "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300",
};

const ACTION_COLORS: Record<string, string> = {
  created: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  updated: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  deleted: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  viewed: "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300",
  exported: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  filed: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  signed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  verified: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  searched: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  queried: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
};

export default function AuditTrailPage() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [summaries, setSummaries] = useState<ClientSummary[]>([]);
  const [expandedHashes, setExpandedHashes] = useState<Set<string>>(new Set());

  // Filters
  const [clientFilter, setClientFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Pagination
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  // Clients list for dropdown
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => {
        if (data.clients) setClients(data.clients);
      })
      .catch(() => {});
  }, []);

  const fetchEvents = useCallback(
    async (cursor?: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (clientFilter) params.set("clientId", clientFilter);
        if (categoryFilter !== "all") params.set("category", categoryFilter);
        if (dateFrom) params.set("from", dateFrom);
        if (dateTo) params.set("to", dateTo);
        if (cursor) params.set("cursor", cursor);

        const res = await fetch(`/api/audit?${params.toString()}`);
        const data = await res.json();

        if (cursor) {
          setEvents((prev) => [...prev, ...(data.events || [])]);
        } else {
          setEvents(data.events || []);
        }
        setNextCursor(data.nextCursor || null);
        setHasMore(data.hasMore || false);
      } catch {
        // Silently handle
      } finally {
        setLoading(false);
      }
    },
    [clientFilter, categoryFilter, dateFrom, dateTo]
  );

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Fetch client summaries
  useEffect(() => {
    fetch("/api/audit?limit=0")
      .then(() => {
        // We'll compute summaries from clients
        if (clients.length > 0) {
          // Fetch summaries by querying for each client's events count
          // For now, use the client list
          setSummaries([]);
        }
      })
      .catch(() => {});
  }, [clients]);

  const handleVerify = async () => {
    setVerifying(true);
    try {
      const res = await fetch("/api/audit/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: clientFilter || undefined }),
      });
      const data = await res.json();
      setVerification(data);
    } catch {
      setVerification({
        valid: false,
        totalEvents: 0,
        message: "Verification failed — unable to reach server.",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleExport = async () => {
    if (!clientFilter) {
      alert("Select a client to export their audit trail.");
      return;
    }

    try {
      const res = await fetch("/api/audit/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: clientFilter }),
      });
      const data = await res.json();

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-trail-${clientFilter}-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Export failed.");
    }
  };

  const toggleHash = (id: string) => {
    setExpandedHashes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const formatTimestamp = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Audit Trail" },
        ]}
      />

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            Audit Trail
          </h1>
          <p className="mt-2 text-navy-400 dark:text-navy-300">
            Immutable, tamper-evident record of every action. Court-admissible.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-700 dark:bg-navy-600 dark:hover:bg-navy-500"
        >
          Export Client Audit Trail
        </button>
      </div>

      {/* Chain Integrity Verification */}
      <div className="mt-8">
        {verification ? (
          <div
            className={`rounded-xl border px-6 py-4 ${
              verification.valid
                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40"
                : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    verification.valid
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {verification.valid ? "✓" : "✗"}
                </span>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      verification.valid
                        ? "text-green-800 dark:text-green-200"
                        : "text-red-800 dark:text-red-200"
                    }`}
                  >
                    {verification.valid
                      ? `Chain Verified — ${verification.totalEvents} events, no tampering detected`
                      : `Chain Integrity Compromised`}
                  </p>
                  <p
                    className={`text-xs ${
                      verification.valid
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {verification.message}
                  </p>
                </div>
              </div>
              <button
                onClick={handleVerify}
                disabled={verifying}
                className="rounded-lg border border-current px-3 py-1.5 text-xs font-medium opacity-70 transition hover:opacity-100 disabled:opacity-40"
              >
                {verifying ? "Verifying..." : "Verify Again"}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-navy-200 bg-navy-50 px-6 py-4 dark:border-navy-700 dark:bg-navy-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy-700 dark:text-navy-200">
                  Chain Integrity Not Yet Verified
                </p>
                <p className="text-xs text-navy-500 dark:text-navy-400">
                  Run verification to confirm no audit events have been tampered with.
                </p>
              </div>
              <button
                onClick={handleVerify}
                disabled={verifying}
                className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-700 disabled:opacity-40 dark:bg-navy-600 dark:hover:bg-navy-500"
              >
                {verifying ? "Verifying..." : "Verify Now"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-600 dark:text-navy-300">
            Client
          </label>
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 dark:border-navy-700 dark:bg-navy-800 dark:text-white"
          >
            <option value="">All Clients</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-600 dark:text-navy-300">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 dark:border-navy-700 dark:bg-navy-800 dark:text-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-600 dark:text-navy-300">
            From
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 dark:border-navy-700 dark:bg-navy-800 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-600 dark:text-navy-300">
            To
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 dark:border-navy-700 dark:bg-navy-800 dark:text-white"
          />
        </div>
      </div>

      {/* Per-Client Summary Cards */}
      {clients.length > 0 && (
        <div className="mt-8">
          <h2 className="font-serif text-lg text-navy-800 dark:text-white">
            Client Summaries
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.slice(0, 6).map((client) => {
              const summary = summaries.find((s) => s.clientId === client.id);
              return (
                <div
                  key={client.id}
                  className="rounded-xl border border-navy-200 bg-white p-4 dark:border-navy-700 dark:bg-navy-800"
                >
                  <p className="text-sm font-semibold text-navy-800 dark:text-white">
                    {client.name}
                  </p>
                  {summary ? (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-navy-500 dark:text-navy-400">
                        {summary.totalEvents} total events
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {summary.matterEvents > 0 && (
                          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            {summary.matterEvents} matter
                          </span>
                        )}
                        {summary.documentEvents > 0 && (
                          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                            {summary.documentEvents} document
                          </span>
                        )}
                        {summary.trustEvents > 0 && (
                          <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] text-red-700 dark:bg-red-900/40 dark:text-red-300">
                            {summary.trustEvents} trust
                          </span>
                        )}
                        {summary.billingEvents > 0 && (
                          <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                            {summary.billingEvents} billing
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-navy-400 dark:text-navy-500">
                      No audit data
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Event Timeline */}
      <div className="mt-8">
        <h2 className="font-serif text-lg text-navy-800 dark:text-white">
          Event Timeline
        </h2>
        <div className="mt-4">
          {loading && events.length === 0 ? (
            <div className="py-12 text-center text-sm text-navy-400 dark:text-navy-500">
              Loading audit events...
            </div>
          ) : events.length === 0 ? (
            <div className="py-12 text-center text-sm text-navy-400 dark:text-navy-500">
              No audit events found for the selected filters.
            </div>
          ) : (
            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 h-full w-px bg-navy-200 dark:bg-navy-700" />

              {events.map((event) => (
                <div key={event.id} className="relative flex gap-4 py-3">
                  {/* Timeline dot */}
                  <div className="relative z-10 mt-1.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-navy-200 bg-white dark:border-navy-700 dark:bg-navy-900">
                    <div className="h-2 w-2 rounded-full bg-navy-400 dark:bg-navy-500" />
                  </div>

                  {/* Event content */}
                  <div className="min-w-0 flex-1 rounded-xl border border-navy-100 bg-white p-4 dark:border-navy-700 dark:bg-navy-800">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-navy-500 dark:text-navy-400">
                        {formatTimestamp(event.timestamp)}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          CATEGORY_COLORS[event.category] || CATEGORY_COLORS.system
                        }`}
                      >
                        {event.category}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          ACTION_COLORS[event.action] || ACTION_COLORS.viewed
                        }`}
                      >
                        {event.action}
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm text-navy-800 dark:text-white">
                      {event.description}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-navy-500 dark:text-navy-400">
                      <span>
                        Resource:{" "}
                        <span className="font-medium text-navy-700 dark:text-navy-200">
                          {event.resource}
                        </span>
                        {event.resourceId && (
                          <span className="ml-1 font-mono text-[10px]">
                            ({event.resourceId})
                          </span>
                        )}
                      </span>
                      {event.clientId && (
                        <span>
                          Client:{" "}
                          <span className="font-medium text-navy-700 dark:text-navy-200">
                            {clients.find((c) => c.id === event.clientId)?.name ||
                              event.clientId}
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Hash */}
                    <div className="mt-2">
                      <button
                        onClick={() => toggleHash(event.id)}
                        className="text-[10px] font-mono text-navy-400 transition hover:text-navy-600 dark:text-navy-500 dark:hover:text-navy-300"
                      >
                        {expandedHashes.has(event.id)
                          ? `SHA-256: ${event.eventHash}`
                          : `SHA-256: ${event.eventHash.slice(0, 16)}...`}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load more */}
              {hasMore && (
                <div className="relative z-10 pt-4 text-center">
                  <button
                    onClick={() => nextCursor && fetchEvents(nextCursor)}
                    disabled={loading}
                    className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 transition hover:bg-navy-50 disabled:opacity-40 dark:border-navy-700 dark:text-navy-300 dark:hover:bg-navy-800"
                  >
                    {loading ? "Loading..." : "Load More Events"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-navy-200 pt-6 dark:border-navy-700">
        <p className="text-xs leading-relaxed text-navy-400 dark:text-navy-500">
          Audit records are immutable and tamper-evident. Each event is
          cryptographically chained to the previous event using SHA-256 hashing.
          Chain integrity can be independently verified at any time.
        </p>
        <div className="mt-4">
          <LegalDisclaimer type="AUDIT_TRAIL" variant="footer" />
        </div>
      </div>
    </div>
  );
}
