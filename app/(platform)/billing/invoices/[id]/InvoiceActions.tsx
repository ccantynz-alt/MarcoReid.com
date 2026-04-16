"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";

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
  const toast = useToast();
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
        },
      );
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        toast.error("Status update failed", data.error ?? "Please try again.");
      } else if (status === "SENT") {
        toast.success(
          "Marked as sent",
          "Persistence arrives with the Invoice model.",
        );
        router.refresh();
      } else if (status === "PAID") {
        toast.success("Marked as paid", "Nice work — recorded for now.");
        router.refresh();
      } else {
        toast.info("Invoice voided", "Status change logged.");
        router.refresh();
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
    toast.info(
      "Duplicate coming soon",
      "Invoice duplication lands with persistence.",
    );
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

      <span className="sr-only">Invoice {invoiceNumber}</span>
    </div>
  );
}
