"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/shared/Toast";
import RequestSignatureForm from "@/app/components/platform/RequestSignatureForm";
import EmptyState from "@/app/components/platform/EmptyState";

export interface SignatureRequestRow {
  id: string;
  title: string;
  status: string;
  signerName: string;
  signerEmail: string;
  message: string | null;
  document: { id: string; title: string } | null;
  matter: { id: string; title: string } | null;
  sentAt: string | null;
  viewedAt: string | null;
  signedAt: string | null;
  declinedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

interface Props {
  signatureRequests: SignatureRequestRow[];
  documents: { id: string; title: string }[];
  matters: { id: string; title: string }[];
}

const STATUS_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: "bg-navy-100 dark:bg-navy-700", text: "text-navy-600 dark:text-navy-300", label: "Draft" },
  sent: { bg: "bg-blue-50 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300", label: "Sent" },
  viewed: { bg: "bg-amber-50 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300", label: "Viewed" },
  signed: { bg: "bg-forest-50 dark:bg-forest-900/40", text: "text-forest-700 dark:text-forest-300", label: "Signed" },
  declined: { bg: "bg-red-50 dark:bg-red-900/40", text: "text-red-700 dark:text-red-300", label: "Declined" },
  expired: { bg: "bg-navy-50 dark:bg-navy-800", text: "text-navy-500 dark:text-navy-400", label: "Expired" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_BADGE[status] ?? STATUS_BADGE.draft;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function SignaturesClient({ signatureRequests, documents, matters }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [showForm, setShowForm] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Stats
  const draftCount = signatureRequests.filter((sr) => sr.status === "draft").length;
  const pendingCount = signatureRequests.filter((sr) => sr.status === "sent" || sr.status === "viewed").length;
  const signedCount = signatureRequests.filter((sr) => sr.status === "signed").length;
  const declinedCount = signatureRequests.filter((sr) => sr.status === "declined").length;

  const stats = [
    { label: "Draft", value: draftCount, accent: "text-navy-600 dark:text-navy-300" },
    { label: "Sent / Pending", value: pendingCount, accent: "text-blue-600 dark:text-blue-400" },
    { label: "Signed", value: signedCount, accent: "text-forest-600 dark:text-forest-400" },
    { label: "Declined", value: declinedCount, accent: "text-red-600 dark:text-red-400" },
  ];

  async function handleAction(id: string, action: string) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/signatures/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Action failed");
      }
      toast.success("Updated", `Signature request ${action === "send" ? "sent" : action.replace("mark_", "marked as ")}.`);
      router.refresh();
    } catch (err) {
      toast.error("Error", err instanceof Error ? err.message : "Action failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this draft signature request?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/signatures/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Delete failed");
      }
      toast.success("Deleted", "Draft signature request removed.");
      router.refresh();
    } catch (err) {
      toast.error("Error", err instanceof Error ? err.message : "Delete failed");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <>
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              {stat.label}
            </p>
            <p className={`mt-3 font-serif text-4xl ${stat.accent}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Integration note */}
      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 px-5 py-4 dark:border-blue-800 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          E-signature integration coming soon. Signature requests are tracked here and will
          connect to your signing provider when available.
        </p>
      </div>

      {/* Action bar */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-navy-400 dark:text-navy-500">
          {signatureRequests.length} {signatureRequests.length === 1 ? "request" : "requests"} total
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 dark:bg-navy-400 dark:text-navy-950 dark:hover:bg-navy-300"
        >
          Request Signature
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy-900/40 px-4 py-6 backdrop-blur-sm sm:items-center"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowForm(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-signature-title"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card-hover dark:border-navy-700 dark:bg-navy-800"
          >
            <RequestSignatureForm
              documents={documents}
              matters={matters}
              onClose={() => setShowForm(false)}
              onSuccess={() => {
                setShowForm(false);
                router.refresh();
              }}
            />
          </div>
        </div>
      )}

      {/* Signature request cards */}
      <div className="mt-6 space-y-4">
        {signatureRequests.length === 0 ? (
          <div className="rounded-2xl border border-navy-100 bg-white shadow-card dark:border-navy-700 dark:bg-navy-800">
            <EmptyState
              icon="pen"
              title="No signature requests yet"
              description="Create your first signature request to start collecting e-signatures."
              action={{ label: "Request signature", href: "/signatures" }}
            />
          </div>
        ) : (
          signatureRequests.map((sr) => (
            <div
              key={sr.id}
              className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:shadow-card-hover dark:border-navy-700 dark:bg-navy-800"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="truncate font-semibold text-navy-800 dark:text-navy-100">
                      {sr.title}
                    </h3>
                    <StatusBadge status={sr.status} />
                  </div>
                  <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
                    {sr.signerName} &middot; {sr.signerEmail}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-shrink-0 items-center gap-2">
                  {sr.status === "draft" && (
                    <>
                      <button
                        onClick={() => handleAction(sr.id, "send")}
                        disabled={actionLoading === sr.id}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 disabled:opacity-50 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60"
                      >
                        Send
                      </button>
                      <button
                        onClick={() => handleDelete(sr.id)}
                        disabled={actionLoading === sr.id}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-900/60"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {(sr.status === "sent" || sr.status === "viewed") && (
                    <>
                      <button
                        onClick={() => handleAction(sr.id, "mark_signed")}
                        disabled={actionLoading === sr.id}
                        className="rounded-lg bg-forest-50 px-3 py-1.5 text-xs font-semibold text-forest-700 transition-colors hover:bg-forest-100 disabled:opacity-50 dark:bg-forest-900/40 dark:text-forest-300 dark:hover:bg-forest-900/60"
                      >
                        Mark Signed
                      </button>
                      <button
                        onClick={() => handleAction(sr.id, "mark_declined")}
                        disabled={actionLoading === sr.id}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-900/60"
                      >
                        Mark Declined
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Linked document/matter */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-400 dark:text-navy-500">
                {sr.document && (
                  <span>
                    Document: <span className="font-medium text-navy-600 dark:text-navy-300">{sr.document.title}</span>
                  </span>
                )}
                {sr.matter && (
                  <span>
                    Matter: <span className="font-medium text-navy-600 dark:text-navy-300">{sr.matter.title}</span>
                  </span>
                )}
              </div>

              {/* Dates */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-400 dark:text-navy-500">
                <span>Created {formatDate(sr.createdAt)}</span>
                {sr.sentAt && <span>Sent {formatDate(sr.sentAt)}</span>}
                {sr.viewedAt && <span>Viewed {formatDate(sr.viewedAt)}</span>}
                {sr.signedAt && <span>Signed {formatDate(sr.signedAt)}</span>}
                {sr.declinedAt && <span>Declined {formatDate(sr.declinedAt)}</span>}
                {sr.expiresAt && <span>Expires {formatDate(sr.expiresAt)}</span>}
              </div>

              {/* Message preview */}
              {sr.message && (
                <p className="mt-3 text-sm text-navy-500 dark:text-navy-400 line-clamp-2">
                  {sr.message}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
