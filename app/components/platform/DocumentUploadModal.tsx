"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DocumentKind } from "@prisma/client";
import { toast } from "@/app/components/shared/Toast";
import { KIND_LABEL, KIND_ORDER, formatFileSize } from "./documentFormat";

interface MatterOption {
  id: string;
  title: string;
}
interface ClientOption {
  id: string;
  name: string;
}

export interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (doc: { id: string }) => void;
  defaultMatterId?: string;
  defaultClientId?: string;
  /** When true the body is rendered inline (no overlay/dialog chrome). */
  inline?: boolean;
}

export default function DocumentUploadModal(props: DocumentUploadModalProps) {
  const { open, onClose, inline } = props;

  // ESC to close — modal mode only
  useEffect(() => {
    if (inline || !open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inline, open, onClose]);

  // Body scroll lock + focus management
  const dialogRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (inline || !open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    // Focus first focusable element in dialog
    const t = setTimeout(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 20);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [inline, open]);

  if (inline) {
    return <UploadBody {...props} inline />;
  }
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy-900/40 px-4 py-6 backdrop-blur-sm sm:items-center"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-upload-title"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card-hover"
      >
        <UploadBody {...props} />
      </div>
    </div>
  );
}

function UploadBody({
  onClose,
  onSuccess,
  defaultMatterId,
  defaultClientId,
  inline,
}: DocumentUploadModalProps) {
  const titleId = "document-upload-title";
  const fileInputId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<DocumentKind>("OTHER");
  const [matterId, setMatterId] = useState<string>(defaultMatterId ?? "");
  const [clientId, setClientId] = useState<string>(defaultClientId ?? "");
  const [matters, setMatters] = useState<MatterOption[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [dragMessage, setDragMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load matters + clients for dropdowns
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [m, c] = await Promise.all([
          fetch("/api/matters").then((r) => (r.ok ? r.json() : { matters: [] })),
          fetch("/api/clients").then((r) => (r.ok ? r.json() : { clients: [] })),
        ]);
        if (cancelled) return;
        setMatters(
          (m.matters ?? []).map((x: { id: string; title: string }) => ({
            id: x.id,
            title: x.title,
          }))
        );
        setClients(
          (c.clients ?? []).map((x: { id: string; name: string }) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch {
        // Silently ignore — dropdowns just stay empty
      } finally {
        if (!cancelled) setLoadingLinks(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFile = useCallback((f: File | null) => {
    setFile(f);
    if (f) {
      // Strip extension for cleaner default title
      const base = f.name.replace(/\.[^.]+$/, "");
      setTitle((prev) => (prev ? prev : base));
    }
  }, []);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) {
      handleFile(f);
      setDragMessage(`File ready: ${f.name}`);
    }
  }

  function readFileAsDataURL(f: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(f);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      toast.error("Choose a file", "Drop a file or browse to upload.");
      return;
    }
    if (!title.trim()) {
      toast.error("Title required", "Give the document a clear title.");
      return;
    }

    setSubmitting(true);
    setProgress(8);

    // Optimistic progress while we POST
    const tick = setInterval(() => {
      setProgress((p) => (p < 85 ? p + Math.max(1, Math.round((90 - p) / 12)) : p));
    }, 120);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("title", title.trim());
      form.append("kind", kind);
      form.append("fileName", file.name);
      form.append("fileSize", String(file.size));
      form.append("mimeType", file.type || "application/octet-stream");
      if (matterId) form.append("matterId", matterId);
      if (clientId) form.append("clientId", clientId);

      const res = await fetch("/api/documents", { method: "POST", body: form });

      if (res.status === 501) {
        // Storage not configured — fall back to preview-mode stub
        const dataUrl = await readFileAsDataURL(file);
        const stubRes = await fetch("/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            fileName: file.name,
            fileUrl: dataUrl,
            fileSize: file.size,
            mimeType: file.type || "application/octet-stream",
            kind,
            matterId: matterId || null,
            clientId: clientId || null,
          }),
        });
        if (!stubRes.ok) {
          const j = await stubRes.json().catch(() => ({}));
          throw new Error(j?.error ?? "Upload failed");
        }
        const { document } = await stubRes.json();
        setProgress(100);
        toast.info(
          "Preview mode",
          "Real file storage is being configured — your document was saved with an inline preview."
        );
        toast.success("Document uploaded", `${title.trim()} is now in your library.`);
        onSuccess?.(document);
        if (!inline) onClose();
        return;
      }

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "Upload failed");
      }

      const { document } = await res.json();
      setProgress(100);
      toast.success("Document uploaded", `${title.trim()} is now in your library.`);
      onSuccess?.(document);
      if (!inline) onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error("Upload failed", message);
    } finally {
      clearInterval(tick);
      setSubmitting(false);
      // Brief pause so the bar visually completes before unmount
      setTimeout(() => setProgress(0), 600);
    }
  }

  const previewMime = file?.type || "application/octet-stream";

  const dropzoneClasses = useMemo(
    () =>
      `flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
        dragActive
          ? "border-forest-500 bg-forest-50/60"
          : "border-navy-200 bg-navy-50/40 hover:border-navy-300"
      }`,
    [dragActive]
  );

  return (
    <form onSubmit={submit} className="flex max-h-[90vh] flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-navy-100 px-6 py-4">
        <div>
          <h2 id={titleId} className="font-serif text-2xl text-navy-800">
            Upload document
          </h2>
          <p className="mt-1 text-sm text-navy-400">
            Add a file to your library and link it to a matter or client.
          </p>
        </div>
        {!inline && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close upload dialog"
            className="rounded-md p-2 text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-700"
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
        )}
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
        {/* Drop zone */}
        <div
          className={dropzoneClasses}
          onDragOver={(e) => {
            e.preventDefault();
            if (!dragActive) {
              setDragActive(true);
              setDragMessage("File ready to drop");
            }
          }}
          onDragLeave={() => {
            setDragActive(false);
            setDragMessage("");
          }}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          aria-label="Drag and drop a file here, or activate to browse"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          {file ? (
            <>
              <div className="text-sm font-medium text-navy-700">{file.name}</div>
              <div className="text-xs text-navy-400">
                {formatFileSize(file.size)} • {previewMime}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="mt-1 text-xs font-semibold text-navy-500 underline-offset-2 hover:underline"
              >
                Choose a different file
              </button>
            </>
          ) : (
            <>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-navy-400"
                />
              </svg>
              <div className="text-sm font-medium text-navy-700">
                Drag a file here, or{" "}
                <span className="text-forest-600 underline-offset-2 hover:underline">
                  browse
                </span>
              </div>
              <div className="text-xs text-navy-400">
                PDF, image, contract — anything you need to keep with the matter.
              </div>
            </>
          )}
          <input
            ref={fileInputRef}
            id={fileInputId}
            type="file"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          {/* Live region for drag/drop announcements */}
          <span aria-live="polite" className="sr-only">
            {dragMessage}
          </span>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="doc-title" className="block text-sm font-medium text-navy-700">
            Title
          </label>
          <input
            id="doc-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Engagement letter — Patel"
            className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="doc-kind" className="block text-sm font-medium text-navy-700">
              Kind
            </label>
            <select
              id="doc-kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as DocumentKind)}
              className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
            >
              {KIND_ORDER.map((k) => (
                <option key={k} value={k}>
                  {KIND_LABEL[k]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="doc-matter" className="block text-sm font-medium text-navy-700">
              Matter <span className="text-navy-400">(optional)</span>
            </label>
            <select
              id="doc-matter"
              value={matterId}
              onChange={(e) => setMatterId(e.target.value)}
              disabled={loadingLinks}
              className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 disabled:bg-navy-50"
            >
              <option value="">Not linked</option>
              {matters.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="doc-client" className="block text-sm font-medium text-navy-700">
              Client <span className="text-navy-400">(optional)</span>
            </label>
            <select
              id="doc-client"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              disabled={loadingLinks}
              className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 disabled:bg-navy-50"
            >
              <option value="">Not linked</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {progress > 0 && (
          <div>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label="Upload progress"
              className="h-1.5 w-full overflow-hidden rounded-full bg-navy-100"
            >
              <div
                className="h-full bg-forest-500 transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-navy-400">{progress}%</div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-navy-100 bg-navy-50/40 px-6 py-4">
        {!inline && (
          <button
            type="button"
            onClick={onClose}
            className="min-h-touch rounded-lg px-4 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting || !file}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:cursor-not-allowed disabled:bg-navy-300"
        >
          {submitting ? "Uploading…" : "Upload document"}
        </button>
      </div>
    </form>
  );
}
