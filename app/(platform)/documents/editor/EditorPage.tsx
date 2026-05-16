"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import DocumentEditor from "@/app/components/platform/DocumentEditor";

interface EditorPageProps {
  documentId?: string;
  initialTitle?: string;
  initialContent?: string;
}

export default function EditorPage({
  documentId,
  initialTitle,
  initialContent,
}: EditorPageProps) {
  const [title, setTitle] = useState(initialTitle ?? "Untitled Document");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const contentRef = useRef<string>(initialContent ?? "");

  const handleContentUpdate = useCallback((html: string) => {
    contentRef.current = html;
    setSaved(false);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    try {
      const body = {
        title,
        fileName: `${title.replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "-").toLowerCase()}.html`,
        fileUrl: `data:text/html;base64,${btoa(unescape(encodeURIComponent(contentRef.current)))}`,
        fileSize: new Blob([contentRef.current]).size,
        mimeType: "text/html",
        kind: "LETTER",
      };

      if (documentId) {
        await fetch(`/api/documents/${documentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      setSaved(true);
    } catch {
      // Save failed silently
    } finally {
      setSaving(false);
    }
  }, [title, documentId]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/documents"
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Documents
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAiOpen(!aiOpen)}
            className="inline-flex items-center gap-2 rounded-lg border border-plum-200 bg-plum-50 px-4 py-2 text-sm font-semibold text-plum-600 transition-colors hover:bg-plum-100 dark:border-plum-700 dark:bg-plum-900/30 dark:text-plum-300 dark:hover:bg-plum-900/50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l1.09 3.26L16 6l-2.91.74L12 10l-1.09-3.26L8 6l2.91-.74L12 2z" />
              <path d="M18 12l.6 1.82L20.4 14.4l-1.8.58L18 16.8l-.6-1.82-1.8-.58 1.8-.58L18 12z" />
              <path d="M7 14l.8 2.44L10.24 17.24l-2.44.8L7 20.48l-.8-2.44L3.76 17.24l2.44-.8L7 14z" />
            </svg>
            Marco AI
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:opacity-60 dark:bg-navy-400 dark:text-navy-900 dark:hover:bg-navy-300"
          >
            {saving ? "Saving..." : saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* AI Placeholder Panel */}
      {aiOpen && (
        <div className="mb-6 rounded-2xl border border-plum-200 bg-plum-50/50 p-6 dark:border-plum-700 dark:bg-plum-900/20">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-plum-100 dark:bg-plum-800">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-plum-500"
              >
                <path d="M12 2l1.09 3.26L16 6l-2.91.74L12 10l-1.09-3.26L8 6l2.91-.74L12 2z" />
                <path d="M18 12l.6 1.82L20.4 14.4l-1.8.58L18 16.8l-.6-1.82-1.8-.58 1.8-.58L18 12z" />
                <path d="M7 14l.8 2.44L10.24 17.24l-2.44.8L7 20.48l-.8-2.44L3.76 17.24l2.44-.8L7 14z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-lg text-navy-800 dark:text-navy-100">
                Marco AI Drafting
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-500 dark:text-navy-400">
                AI drafting coming soon — Marco will draft clauses, review
                documents, and suggest edits. You will be able to highlight any
                section and ask Marco to refine, expand, or rewrite it in the
                appropriate legal style.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAiOpen(false)}
              className="shrink-0 rounded-md p-1 text-navy-400 hover:text-navy-600 dark:hover:text-navy-200"
              aria-label="Close AI panel"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Document title */}
      <div className="mb-4">
        <label htmlFor="doc-title" className="sr-only">
          Document title
        </label>
        <input
          id="doc-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSaved(false);
          }}
          placeholder="Document title"
          className="w-full border-none bg-transparent font-serif text-3xl text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-0 dark:text-navy-100 dark:placeholder:text-navy-600"
        />
      </div>

      {/* Editor */}
      <DocumentEditor
        initialContent={initialContent}
        onUpdate={handleContentUpdate}
      />
    </div>
  );
}
