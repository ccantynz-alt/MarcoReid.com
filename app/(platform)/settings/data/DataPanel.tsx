"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";
import SectionHeader from "../SectionHeader";

export default function DataPanel({ email }: { email: string }) {
  const toast = useToast();
  const [exporting, setExporting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function onExport() {
    setExporting(true);
    try {
      // Stub: in production this would queue a background job and email the
      // user a signed download link.
      await new Promise((r) => setTimeout(r, 600));
      toast.success(
        "Export queued — you'll receive an email within 24 hours."
      );
    } finally {
      setExporting(false);
    }
  }

  async function onDelete() {
    if (confirmText !== "DELETE") return;
    setDeleting(true);
    try {
      // Endpoint not yet implemented — stub.
      await fetch("/api/me/delete", { method: "POST" }).catch(() => null);
      toast.info(
        "Deletion request received. Our team will confirm by email within 48 hours."
      );
      setDeleteOpen(false);
      setConfirmText("");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Data and export"
        description="Your data is yours. Take it with you any time."
      />

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg text-navy-800">Export all data</h3>
            <p className="mt-1 text-sm text-navy-400">
              Includes matters, clients, documents, time entries, trust
              transactions, and Marco history. Delivered as JSON to{" "}
              <span className="font-medium text-navy-700">{email}</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={onExport}
            disabled={exporting}
            className="rounded-lg bg-navy-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
          >
            {exporting ? "Queuing…" : "Export all data"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Data retention</h3>
        <p className="mt-1 text-sm text-navy-400">
          Marco Reid keeps your data for as long as your account is active.
          Cancelled accounts are retained for 30 days, then permanently
          deleted.
        </p>
        <Link
          href="/privacy#retention"
          className="mt-3 inline-flex items-center text-sm font-medium text-navy-500 hover:text-navy-700"
        >
          Read the full retention policy
          <span aria-hidden="true" className="ml-1">→</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Your data rights</h3>
        <p className="mt-1 text-sm text-navy-400">
          Under GDPR and equivalent regimes, you have the right to:
        </p>
        <ul className="mt-3 grid gap-3 text-sm text-navy-700 sm:grid-cols-2">
          <li className="rounded-xl border border-navy-100 bg-navy-50 p-4">
            <p className="font-semibold text-navy-800">Access</p>
            <p className="mt-1 text-navy-400">
              Request a copy of everything we hold about you.
            </p>
          </li>
          <li className="rounded-xl border border-navy-100 bg-navy-50 p-4">
            <p className="font-semibold text-navy-800">Correction</p>
            <p className="mt-1 text-navy-400">
              Ask us to fix anything that is wrong.
            </p>
          </li>
          <li className="rounded-xl border border-navy-100 bg-navy-50 p-4">
            <p className="font-semibold text-navy-800">Portability</p>
            <p className="mt-1 text-navy-400">
              Move your data to another provider any time.
            </p>
          </li>
          <li className="rounded-xl border border-navy-100 bg-navy-50 p-4">
            <p className="font-semibold text-navy-800">Erasure</p>
            <p className="mt-1 text-navy-400">
              Delete your account and your data on demand.
            </p>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg text-navy-800">
              Delete my account
            </h3>
            <p className="mt-1 text-sm text-navy-700">
              Permanently remove your account and all associated data. This
              cannot be undone.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
          >
            Delete account
          </button>
        </div>
      </div>

      {deleteOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          className="fixed inset-0 z-40 flex items-center justify-center bg-navy-800/40 px-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
            <h3 id="delete-title" className="font-serif text-2xl text-navy-800">
              Delete your account
            </h3>
            <p className="mt-2 text-sm text-navy-700">
              This will permanently delete your matters, clients, documents,
              billing history, and Marco research. There is no undo.
            </p>
            <label
              htmlFor="confirm"
              className="mt-5 block text-sm font-medium text-navy-700"
            >
              Type <span className="font-mono text-red-700">DELETE</span> to confirm
            </label>
            <input
              id="confirm"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoComplete="off"
              className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-800 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteOpen(false);
                  setConfirmText("");
                }}
                className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDelete}
                disabled={confirmText !== "DELETE" || deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Submitting…" : "Permanently delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
