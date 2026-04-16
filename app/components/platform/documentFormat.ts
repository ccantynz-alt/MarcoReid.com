import type { DocumentKind } from "@prisma/client";

export const KIND_LABEL: Record<DocumentKind, string> = {
  CONTRACT: "Contract",
  LETTER: "Letter",
  COURT_FILING: "Court filing",
  EVIDENCE: "Evidence",
  INVOICE: "Invoice",
  RECEIPT: "Receipt",
  OTHER: "Other",
};

export const KIND_BADGE: Record<DocumentKind, string> = {
  CONTRACT: "bg-navy-50 text-navy-600",
  LETTER: "bg-navy-50 text-navy-500",
  COURT_FILING: "bg-plum-50 text-plum-600",
  EVIDENCE: "bg-gold-50 text-gold-700",
  INVOICE: "bg-forest-50 text-forest-600",
  RECEIPT: "bg-forest-50 text-forest-600",
  OTHER: "bg-navy-50 text-navy-400",
};

export const KIND_ORDER: DocumentKind[] = [
  "CONTRACT",
  "LETTER",
  "COURT_FILING",
  "EVIDENCE",
  "INVOICE",
  "RECEIPT",
  "OTHER",
];

/**
 * Format a byte count as a short human-readable string.
 * Uses binary units; rounds to one decimal for KB and above.
 */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function formatDateShort(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date);
}

export function formatDateTime(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
