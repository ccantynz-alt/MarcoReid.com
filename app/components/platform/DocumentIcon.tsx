import type { DocumentKind } from "@prisma/client";

interface DocumentIconProps {
  kind: DocumentKind;
  className?: string;
}

const palette: Record<DocumentKind, { bg: string; fg: string }> = {
  CONTRACT: { bg: "bg-navy-50", fg: "text-navy-500" },
  LETTER: { bg: "bg-navy-50", fg: "text-navy-500" },
  COURT_FILING: { bg: "bg-plum-50", fg: "text-plum-600" },
  EVIDENCE: { bg: "bg-gold-50", fg: "text-gold-600" },
  INVOICE: { bg: "bg-forest-50", fg: "text-forest-600" },
  RECEIPT: { bg: "bg-forest-50", fg: "text-forest-600" },
  OTHER: { bg: "bg-navy-50", fg: "text-navy-400" },
};

/**
 * DocumentIcon — minimalist square glyph keyed off DocumentKind.
 * Each kind gets a subtle colour tint and a distinct mark so rows scan fast.
 */
export default function DocumentIcon({
  kind,
  className = "h-10 w-10",
}: DocumentIconProps) {
  const { bg, fg } = palette[kind] ?? palette.OTHER;
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-lg ${bg} ${fg} ${className}`}
      aria-hidden="true"
    >
      <Glyph kind={kind} />
    </span>
  );
}

function Glyph({ kind }: { kind: DocumentKind }) {
  // Common page outline
  const page = (
    <path
      d="M6 2.5h7.5L18 7v13.5A1.5 1.5 0 0116.5 22H6A1.5 1.5 0 014.5 20.5v-16A2 2 0 016 2.5z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
  );
  const fold = (
    <path
      d="M13 2.5V7h5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
  );

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      {page}
      {fold}
      {kind === "CONTRACT" && (
        <>
          <path d="M8 12h7M8 15h7M8 18h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
      {kind === "LETTER" && (
        <path
          d="M7.5 11l4 3 4-3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {kind === "COURT_FILING" && (
        <>
          <path d="M11.5 12.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M9 17.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M9 12.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </>
      )}
      {kind === "EVIDENCE" && (
        <>
          <circle cx="11.5" cy="14.5" r="2.2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M13.4 16.4l1.6 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
      {kind === "INVOICE" && (
        <>
          <path d="M8 12h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8 15h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8 18h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M14 17.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
      {kind === "RECEIPT" && (
        <path
          d="M7.5 11.5h8M7.5 14h8M7.5 16.5h5M7.5 19l1-.6 1 .6 1-.6 1 .6 1-.6 1 .6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
      {kind === "OTHER" && (
        <circle cx="11.5" cy="15.5" r="0.9" fill="currentColor" />
      )}
    </svg>
  );
}
