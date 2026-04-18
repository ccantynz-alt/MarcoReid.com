"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { DocumentKind } from "@prisma/client";
import DocumentIcon from "./DocumentIcon";
import DocumentUploadModal from "./DocumentUploadModal";
import {
  KIND_BADGE,
  KIND_LABEL,
  KIND_ORDER,
  formatDateShort,
  formatFileSize,
} from "./documentFormat";

export interface DocumentRow {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  kind: DocumentKind;
  createdAt: string;
  matter: { id: string; title: string } | null;
  client: { id: string; name: string } | null;
}

interface DocumentsListClientProps {
  documents: DocumentRow[];
  /** Counts per kind across the user's full library (unfiltered). */
  counts: Record<"ALL" | DocumentKind, number>;
  /** Initial values from URL search params. */
  initialQuery: string;
  initialKind: DocumentKind | "ALL";
  initialSort: "recent" | "title" | "size" | "kind";
}

const SORT_LABEL: Record<DocumentsListClientProps["initialSort"], string> = {
  recent: "Most recent",
  title: "Title (A–Z)",
  size: "File size",
  kind: "Kind",
};

export default function DocumentsListClient({
  documents,
  counts,
  initialQuery,
  initialKind,
  initialSort,
}: DocumentsListClientProps) {
  const router = useRouter();
  const params = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [uploadOpen, setUploadOpen] = useState(false);

  // Debounced URL sync for the search box
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed === (initialQuery ?? "")) return;
    const handle = setTimeout(() => {
      const next = new URLSearchParams(params?.toString() ?? "");
      if (trimmed) next.set("q", trimmed);
      else next.delete("q");
      router.replace(`/documents${next.toString() ? `?${next}` : ""}`);
    }, 250);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params?.toString() ?? "");
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/documents${next.toString() ? `?${next}` : ""}`);
  }

  const tabs = useMemo(
    () => [
      { value: "ALL" as const, label: "All", count: counts.ALL },
      ...KIND_ORDER.map((k) => ({
        value: k,
        label: KIND_LABEL[k] + (k === "COURT_FILING" ? "s" : k === "OTHER" ? "" : "s"),
        count: counts[k] ?? 0,
      })),
    ],
    [counts]
  );

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-display text-navy-800">Documents</h1>
          <p className="mt-1 text-sm text-navy-400">
            Every contract, letter, filing and receipt — searchable and linked to your work.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="inline-flex min-h-touch items-center justify-center self-start rounded-lg bg-navy-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 sm:self-auto"
        >
          Upload document
        </button>
      </div>

      {/* Toolbar */}
      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-3 shadow-card">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or filename"
              aria-label="Search documents"
              className="w-full rounded-lg border border-navy-100 bg-navy-50/40 px-9 py-2 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-500/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="doc-sort" className="text-xs font-semibold uppercase tracking-wide text-navy-400">
              Sort
            </label>
            <select
              id="doc-sort"
              value={initialSort}
              onChange={(e) => setParam("sort", e.target.value === "recent" ? null : e.target.value)}
              className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
            >
              {(Object.keys(SORT_LABEL) as Array<keyof typeof SORT_LABEL>).map((s) => (
                <option key={s} value={s}>
                  {SORT_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Kind tabs */}
        <div
          role="tablist"
          aria-label="Filter by kind"
          className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-navy-50 pt-3"
        >
          {tabs.map((t) => {
            const active = initialKind === t.value;
            return (
              <button
                key={t.value}
                role="tab"
                aria-selected={active}
                onClick={() => setParam("kind", t.value === "ALL" ? null : t.value)}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "bg-navy-500 text-white"
                    : "bg-navy-50 text-navy-500 hover:bg-navy-100"
                }`}
              >
                {t.label}
                <span
                  className={`rounded-full px-1.5 text-[10px] font-semibold ${
                    active ? "bg-white/20 text-white" : "bg-white text-navy-400"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {documents.length === 0 ? (
          <EmptyState
            hasFilter={Boolean(query.trim() || initialKind !== "ALL")}
            onUpload={() => setUploadOpen(true)}
            onClear={() => {
              setQuery("");
              router.replace("/documents");
            }}
          />
        ) : (
          <ul role="list" className="divide-y divide-navy-50">
            {documents.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/documents/${d.id}`}
                  className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-navy-50/40 sm:px-6 sm:py-4"
                >
                  <DocumentIcon kind={d.kind} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-medium text-navy-700">{d.title}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${KIND_BADGE[d.kind]}`}
                      >
                        {KIND_LABEL[d.kind]}
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-navy-400">
                      <span className="truncate">{d.fileName}</span>
                      {d.matter && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span className="text-navy-500">{d.matter.title}</span>
                        </>
                      )}
                      {d.client && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span className="text-navy-500">{d.client.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="hidden text-right text-xs text-navy-400 sm:block">
                    <div>{formatFileSize(d.fileSize)}</div>
                    <div className="mt-0.5">{formatDateShort(d.createdAt)}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <DocumentUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </>
  );
}

function EmptyState({
  hasFilter,
  onUpload,
  onClear,
}: {
  hasFilter: boolean;
  onUpload: () => void;
  onClear: () => void;
}) {
  if (hasFilter) {
    return (
      <div className="px-6 py-12 text-center">
        <p className="text-sm font-medium text-navy-700">No documents match those filters.</p>
        <p className="mt-1 text-sm text-navy-400">
          Try a different search term, or clear the filters to see everything.
        </p>
        <button
          type="button"
          onClick={onClear}
          className="mt-4 inline-flex min-h-touch items-center justify-center rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50"
        >
          Clear filters
        </button>
      </div>
    );
  }
  return (
    <div className="px-6 py-12 text-center">
      <p className="font-serif text-2xl text-navy-700">Your library is empty.</p>
      <p className="mt-1 text-sm text-navy-400">
        Upload your first document to keep it linked to a matter and a client.
      </p>
      <button
        type="button"
        onClick={onUpload}
        className="mt-5 inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600"
      >
        Upload document
      </button>
    </div>
  );
}
