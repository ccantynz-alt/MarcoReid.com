"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Toast = {
  id: number;
  tone: "success" | "error" | "info";
  title: string;
  description?: string;
};

// Tiny local toast — the shared Toast.tsx is not yet present in this
// worktree, but the Toast API shape (title + optional description,
// success/error/info tones) mirrors the eventual useToast() hook so
// the call sites can migrate without change.
function useInlineToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  function push(tone: Toast["tone"], title: string, description?: string) {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, tone, title, description }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }
  const toast = {
    success: (title: string, description?: string) => push("success", title, description),
    error: (title: string, description?: string) => push("error", title, description),
    info: (title: string, description?: string) => push("info", title, description),
  };
  return { toast, toasts };
}

export default function InvoiceActions({
  invoiceId,
  invoiceNumber,
  clientEmail,
}: {
  invoiceId: string;
  invoiceNumber: string;
  clientEmail: string | null;
}) {
  const router = useRouter();
  const { toast, toasts } = useInlineToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function patchStatus(status: "SENT" | "PAID" | "VOID") {
    setBusy(status);
    try {
      const res = await fetch(
        `/api/invoices/${encodeURIComponent(invoiceId)}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        toast.error("Status update failed", data.error ?? "Please try again.");
      } else if (status === "SENT") {
        toast.success("Marked as sent", "Persistence arrives with Invoice model.");
      } else if (status === "PAID") {
        toast.success("Marked as paid", "Nice work — recorded for now.");
      } else {
        toast.info("Invoice voided", "Status change logged.");
      }
    } catch {
      toast.error("Network error", "Please try again.");
    } finally {
      setBusy(null);
    }
  }

  function downloadPdf() {
    toast.info("PDF coming soon", "We're finalising the print-to-PDF pipeline.");
  }
  function emailClient() {
    if (!clientEmail) {
      toast.error("No client email", "Add an email to the client record.");
      return;
    }
    toast.info("Email delivery coming soon", `Will send to ${clientEmail}.`);
  }
  function duplicate() {
    toast.info("Duplicate coming soon", "Invoice duplication lands with persistence.");
  }
  function printNow() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={printNow}
        className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50"
      >
        Print
      </button>
      <button
        type="button"
        onClick={downloadPdf}
        className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50"
      >
        Download PDF
      </button>
      <button
        type="button"
        onClick={() => patchStatus("SENT")}
        disabled={busy !== null}
        className="rounded-lg bg-navy-500 px-3 py-2 text-sm font-semibold text-white hover:bg-navy-600 disabled:opacity-50"
      >
        {busy === "SENT" ? "Working…" : "Mark as sent"}
      </button>
      <button
        type="button"
        onClick={() => patchStatus("PAID")}
        disabled={busy !== null}
        className="rounded-lg bg-forest-500 px-3 py-2 text-sm font-semibold text-white hover:bg-forest-600 disabled:opacity-50"
      >
        {busy === "PAID" ? "Working…" : "Mark as paid"}
      </button>
      <button
        type="button"
        onClick={emailClient}
        className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50"
      >
        Email to client
      </button>
      <button
        type="button"
        onClick={duplicate}
        className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50"
      >
        Duplicate
      </button>
      <button
        type="button"
        onClick={() => patchStatus("VOID")}
        disabled={busy !== null}
        className="rounded-lg border border-plum-200 bg-white px-3 py-2 text-sm font-semibold text-plum-600 hover:bg-plum-50 disabled:opacity-50"
      >
        {busy === "VOID" ? "Working…" : "Void"}
      </button>

      {/* toast viewport */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto min-w-[16rem] rounded-xl border px-4 py-3 text-sm shadow-card ${
              t.tone === "success"
                ? "border-forest-300 bg-forest-50 text-forest-600"
                : t.tone === "error"
                  ? "border-plum-200 bg-plum-50 text-plum-600"
                  : "border-navy-200 bg-white text-navy-700"
            }`}
          >
            <div className="font-semibold">{t.title}</div>
            {t.description && (
              <div className="mt-0.5 text-xs opacity-80">{t.description}</div>
            )}
          </div>
        ))}
      </div>

      {/* render invoice number as title for screen-reader announcements */}
      <span className="sr-only">Invoice {invoiceNumber}</span>
    </div>
  );
}
