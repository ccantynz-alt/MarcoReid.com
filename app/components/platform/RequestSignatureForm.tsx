"use client";

import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";

interface Props {
  documents: { id: string; title: string }[];
  matters: { id: string; title: string }[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function RequestSignatureForm({ documents, matters, onClose, onSuccess }: Props) {
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [message, setMessage] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [matterId, setMatterId] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(sendNow: boolean) {
    if (!title.trim()) {
      toast.error("Title required", "Give the signature request a title.");
      return;
    }
    if (!signerName.trim()) {
      toast.error("Signer name required", "Enter the name of the person who will sign.");
      return;
    }
    if (!signerEmail.trim()) {
      toast.error("Signer email required", "Enter the email of the person who will sign.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signerEmail.trim())) {
      toast.error("Invalid email", "Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          signerName: signerName.trim(),
          signerEmail: signerEmail.trim(),
          message: message.trim() || null,
          documentId: documentId || null,
          matterId: matterId || null,
          expiresAt: expiresAt || null,
          sendNow,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to create signature request");
      }

      toast.success(
        sendNow ? "Signature request sent" : "Draft saved",
        sendNow
          ? `Request sent to ${signerEmail.trim()}.`
          : "Signature request saved as draft.",
      );
      onSuccess();
    } catch (err) {
      toast.error("Error", err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex max-h-[90vh] flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-navy-100 px-6 py-4 dark:border-navy-700">
        <div>
          <h2
            id="request-signature-title"
            className="font-serif text-2xl text-navy-800 dark:text-navy-100"
          >
            Request Signature
          </h2>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            Send a document for e-signature or save as a draft.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-md p-2 text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-700 dark:hover:bg-navy-700 dark:hover:text-navy-200"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2 2l10 10M12 2L2 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Form body */}
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
        {/* Integration notice */}
        <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-3 dark:border-amber-800 dark:bg-amber-900/20">
          <p className="text-xs text-amber-800 dark:text-amber-300">
            E-signature integration coming soon. Signature requests are tracked here and will
            connect to your signing provider when available.
          </p>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="sig-title" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="sig-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Engagement letter — Patel"
            className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-100 dark:focus:border-navy-400"
          />
        </div>

        {/* Signer name + email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sig-signer-name" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
              Signer name <span className="text-red-500">*</span>
            </label>
            <input
              id="sig-signer-name"
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="Jane Doe"
              className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-100 dark:focus:border-navy-400"
            />
          </div>
          <div>
            <label htmlFor="sig-signer-email" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
              Signer email <span className="text-red-500">*</span>
            </label>
            <input
              id="sig-signer-email"
              type="email"
              value={signerEmail}
              onChange={(e) => setSignerEmail(e.target.value)}
              placeholder="jane@example.com"
              className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-100 dark:focus:border-navy-400"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="sig-message" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
            Message to signer <span className="text-navy-400 dark:text-navy-500">(optional)</span>
          </label>
          <textarea
            id="sig-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Please review and sign the attached document at your earliest convenience."
            className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-100 dark:focus:border-navy-400"
          />
        </div>

        {/* Document + Matter dropdowns */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sig-document" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
              Link to document <span className="text-navy-400 dark:text-navy-500">(optional)</span>
            </label>
            <select
              id="sig-document"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-100 dark:focus:border-navy-400"
            >
              <option value="">Not linked</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sig-matter" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
              Link to matter <span className="text-navy-400 dark:text-navy-500">(optional)</span>
            </label>
            <select
              id="sig-matter"
              value={matterId}
              onChange={(e) => setMatterId(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-100 dark:focus:border-navy-400"
            >
              <option value="">Not linked</option>
              {matters.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Expiry date */}
        <div>
          <label htmlFor="sig-expires" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
            Expiry date <span className="text-navy-400 dark:text-navy-500">(optional)</span>
          </label>
          <input
            id="sig-expires"
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-100 dark:focus:border-navy-400"
          />
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex items-center justify-end gap-3 border-t border-navy-100 bg-navy-50/40 px-6 py-4 dark:border-navy-700 dark:bg-navy-900/40">
        <button
          type="button"
          onClick={onClose}
          className="min-h-touch rounded-lg px-4 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-100 dark:text-navy-400 dark:hover:bg-navy-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={submitting}
          className="min-h-touch rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-700 shadow-sm transition-all hover:border-navy-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200 dark:hover:border-navy-500"
        >
          {submitting ? "Saving..." : "Save as Draft"}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          disabled={submitting}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:cursor-not-allowed disabled:bg-navy-300 dark:bg-navy-400 dark:text-navy-950 dark:hover:bg-navy-300"
        >
          {submitting ? "Sending..." : "Send for Signature"}
        </button>
      </div>
    </div>
  );
}
