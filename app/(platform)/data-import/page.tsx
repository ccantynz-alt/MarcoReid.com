"use client";

import { useState, useCallback, useRef } from "react";
import LegalDisclaimer from "@/app/components/shared/LegalDisclaimer";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SourceSystem =
  | "clio"
  | "leap"
  | "actionstep"
  | "xero"
  | "myob"
  | "quickbooks"
  | "iress"
  | "smokeball"
  | "affinity"
  | "other";

type MappingStatus = "mapped" | "needs-review" | "unmapped";

interface FieldMapping {
  sourceField: string;
  marcoField: string;
  sampleData: string;
  status: MappingStatus;
  typeMismatch: boolean;
}

interface ImportSummary {
  clients: number;
  matters: number;
  documents: number;
  timeEntries: number;
  contacts: number;
}

type Step = 1 | 2 | 3 | 4 | 5;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SOURCE_SYSTEMS: {
  id: SourceSystem;
  name: string;
  description: string;
  exportInstructions: string;
  formats: string;
}[] = [
  {
    id: "clio",
    name: "Clio",
    description: "Practice management",
    exportInstructions: "In Clio, go to Settings → Firm Settings → Data Export → Download CSV",
    formats: "CSV",
  },
  {
    id: "leap",
    name: "LEAP",
    description: "Legal practice management",
    exportInstructions: "In LEAP, go to More → Office Setup → Data Export → Export All Data",
    formats: "CSV, JSON",
  },
  {
    id: "actionstep",
    name: "Actionstep",
    description: "Legal workflow automation",
    exportInstructions: "In Actionstep, go to Admin → Data Export → Select tables → Export",
    formats: "CSV",
  },
  {
    id: "xero",
    name: "Xero",
    description: "Accounting software",
    exportInstructions: "In Xero, go to Settings → Export Data → Select date range → Export",
    formats: "CSV",
  },
  {
    id: "myob",
    name: "MYOB",
    description: "Accounting software",
    exportInstructions: "In MYOB, go to File → Export Data → Select data type → Export",
    formats: "CSV, TXT",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Accounting software",
    exportInstructions: "In QuickBooks, go to Reports → Custom Reports → Export to CSV",
    formats: "CSV, IIF",
  },
  {
    id: "iress",
    name: "IRESS",
    description: "Financial planning",
    exportInstructions: "In IRESS, go to Admin → Data Management → Export → Select modules",
    formats: "CSV",
  },
  {
    id: "smokeball",
    name: "Smokeball",
    description: "Legal practice management",
    exportInstructions: "In Smokeball, go to Settings → Data → Export All Data",
    formats: "CSV, JSON",
  },
  {
    id: "affinity",
    name: "Affinity",
    description: "Legal practice management",
    exportInstructions: "In Affinity, go to Admin → Export → Select data types → Export",
    formats: "CSV",
  },
  {
    id: "other",
    name: "Other",
    description: "Any CSV or JSON export",
    exportInstructions: "Export your data as CSV or JSON from your current system",
    formats: "CSV, JSON",
  },
];

const MARCO_FIELDS = [
  "client_name",
  "client_email",
  "client_phone",
  "client_address",
  "matter_name",
  "matter_number",
  "matter_type",
  "matter_status",
  "matter_open_date",
  "matter_close_date",
  "responsible_attorney",
  "document_name",
  "document_type",
  "document_date",
  "time_entry_date",
  "time_entry_hours",
  "time_entry_rate",
  "time_entry_description",
  "time_entry_attorney",
  "invoice_number",
  "invoice_date",
  "invoice_amount",
  "contact_first_name",
  "contact_last_name",
  "contact_email",
  "contact_phone",
  "contact_company",
  "— Skip this field —",
];

// ---------------------------------------------------------------------------
// Step Indicator
// ---------------------------------------------------------------------------

function StepIndicator({ currentStep }: { currentStep: Step }) {
  const steps = [
    { num: 1 as const, label: "Select Source" },
    { num: 2 as const, label: "Upload Data" },
    { num: 3 as const, label: "Map Fields" },
    { num: 4 as const, label: "Review" },
    { num: 5 as const, label: "Import" },
  ];

  return (
    <nav aria-label="Migration progress" className="mb-10">
      <ol className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.num;
          const isComplete = currentStep > step.num;

          return (
            <li key={step.num} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    isComplete
                      ? "bg-forest-500 text-white"
                      : isActive
                        ? "bg-navy-600 text-white dark:bg-navy-400 dark:text-navy-950"
                        : "bg-navy-100 text-navy-400 dark:bg-navy-700 dark:text-navy-500"
                  }`}
                >
                  {isComplete ? (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.num
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive
                      ? "text-navy-700 dark:text-navy-200"
                      : isComplete
                        ? "text-forest-600 dark:text-forest-400"
                        : "text-navy-400 dark:text-navy-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`mx-3 mt-[-1.5rem] h-0.5 flex-1 ${
                    currentStep > step.num
                      ? "bg-forest-400"
                      : "bg-navy-200 dark:bg-navy-700"
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Step 1: Select Source System
// ---------------------------------------------------------------------------

function StepSelectSource({
  selected,
  onSelect,
  onNext,
}: {
  selected: SourceSystem | null;
  onSelect: (s: SourceSystem) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="font-serif text-xl text-navy-800 dark:text-white">
        Where is your data coming from?
      </h2>
      <p className="mt-2 text-sm text-navy-400 dark:text-navy-500">
        Select your current practice management or accounting system. We will guide you through the export process.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SOURCE_SYSTEMS.map((sys) => (
          <button
            key={sys.id}
            onClick={() => onSelect(sys.id)}
            className={`flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
              selected === sys.id
                ? "border-navy-500 bg-navy-50 ring-2 ring-navy-500/20 dark:border-navy-400 dark:bg-navy-800 dark:ring-navy-400/20"
                : "border-navy-200 bg-white hover:border-navy-300 hover:shadow-md dark:border-navy-700 dark:bg-navy-800 dark:hover:border-navy-600"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${
                selected === sys.id
                  ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                  : "bg-navy-100 text-navy-500 dark:bg-navy-700 dark:text-navy-300"
              }`}
            >
              {sys.name.charAt(0)}
            </div>
            <div className="mt-3">
              <span className="text-sm font-semibold text-navy-700 dark:text-navy-200">
                {sys.name}
              </span>
              <p className="mt-0.5 text-xs text-navy-400 dark:text-navy-500">
                {sys.description}
              </p>
              <p className="mt-1 text-xs text-navy-300 dark:text-navy-600">
                Formats: {sys.formats}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!selected}
          className="rounded-xl bg-navy-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-navy-500 dark:hover:bg-navy-400"
        >
          Continue to upload
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2: Upload Data
// ---------------------------------------------------------------------------

function StepUploadData({
  sourceSystem,
  fileName,
  onFileSelected,
  onNext,
  onBack,
}: {
  sourceSystem: SourceSystem;
  fileName: string | null;
  onFileSelected: (name: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const systemInfo = SOURCE_SYSTEMS.find((s) => s.id === sourceSystem);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        onFileSelected(file.name);
      }
    },
    [onFileSelected],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelected(file.name);
      }
    },
    [onFileSelected],
  );

  return (
    <div>
      <h2 className="font-serif text-xl text-navy-800 dark:text-white">
        Upload your data
      </h2>
      <p className="mt-2 text-sm text-navy-400 dark:text-navy-500">
        Export your data from {systemInfo?.name ?? "your system"} and upload it here.
      </p>

      {/* Export instructions */}
      <div className="mt-6 rounded-2xl border border-navy-100 bg-navy-50 p-5 dark:border-navy-700 dark:bg-navy-800/50">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-400">
          Export instructions for {systemInfo?.name}
        </h3>
        <p className="mt-2 text-sm text-navy-600 dark:text-navy-300">
          {systemInfo?.exportInstructions}
        </p>
        <p className="mt-2 text-xs text-navy-400 dark:text-navy-500">
          Supported formats: {systemInfo?.formats}
        </p>
      </div>

      {/* Drag-and-drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`mt-6 flex min-h-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
          isDragging
            ? "border-navy-500 bg-navy-50 dark:border-navy-400 dark:bg-navy-800/60"
            : fileName
              ? "border-forest-400 bg-forest-50 dark:border-forest-600 dark:bg-forest-950/20"
              : "border-navy-200 bg-white dark:border-navy-700 dark:bg-navy-800"
        }`}
      >
        {fileName ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-100 dark:bg-forest-900/40">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-forest-600 dark:text-forest-400" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-forest-700 dark:text-forest-400">
              {fileName}
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-navy-400 underline hover:text-navy-600 dark:text-navy-500 dark:hover:text-navy-300"
            >
              Choose a different file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-navy-300 dark:text-navy-600" aria-hidden="true">
              <polyline points="16 16 12 12 8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="12" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm text-navy-500 dark:text-navy-400">
              Drag and drop your export file here, or
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg bg-navy-100 px-4 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-200 dark:bg-navy-700 dark:text-navy-300 dark:hover:bg-navy-600"
            >
              Browse files
            </button>
            <p className="text-xs text-navy-400 dark:text-navy-500">
              CSV, JSON, or platform-specific export files
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json,.txt,.iif"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload data file"
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="rounded-xl border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-600 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!fileName}
          className="rounded-xl bg-navy-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-navy-500 dark:hover:bg-navy-400"
        >
          Continue to field mapping
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3: Field Mapping Validation
// ---------------------------------------------------------------------------

function StepFieldMapping({
  mappings,
  onUpdateMapping,
  onNext,
  onBack,
}: {
  mappings: FieldMapping[];
  onUpdateMapping: (index: number, marcoField: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const mapped = mappings.filter((m) => m.status === "mapped").length;
  const needsReview = mappings.filter((m) => m.status === "needs-review").length;
  const unmapped = mappings.filter((m) => m.status === "unmapped").length;
  const total = mappings.length;
  const progressPercent = total > 0 ? Math.round((mapped / total) * 100) : 0;

  return (
    <div>
      <h2 className="font-serif text-xl text-navy-800 dark:text-white">
        Field mapping validation
      </h2>
      <p className="mt-2 text-sm text-navy-400 dark:text-navy-500">
        Review and confirm how your data fields map to Marco Reid. Fix any mismatches before proceeding.
      </p>

      {/* Progress indicator */}
      <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-navy-700 dark:text-navy-200">
            {mapped} of {total} fields mapped successfully
          </span>
          <span className="text-sm font-medium tabular-nums text-navy-500 dark:text-navy-400">
            {progressPercent}%
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-navy-100 dark:bg-navy-700">
          <div
            className="h-full rounded-full bg-forest-500 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-3 flex gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-forest-500" aria-hidden="true" />
            <span className="text-navy-500 dark:text-navy-400">Mapped ({mapped})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span className="text-navy-500 dark:text-navy-400">Needs review ({needsReview})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-navy-300 dark:bg-navy-600" aria-hidden="true" />
            <span className="text-navy-500 dark:text-navy-400">Unmapped ({unmapped})</span>
          </span>
        </div>
      </div>

      {/* Mapping table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-card dark:border-navy-700 dark:bg-navy-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-navy-100 dark:border-navy-700">
              <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                Your data fields
              </th>
              <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                Marco Reid fields
              </th>
              <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                Sample data
              </th>
              <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50 dark:divide-navy-700">
            {mappings.map((m, idx) => (
              <tr
                key={idx}
                className={
                  m.typeMismatch
                    ? "bg-red-50/50 dark:bg-red-950/10"
                    : m.status === "needs-review"
                      ? "bg-amber-50/50 dark:bg-amber-950/10"
                      : ""
                }
              >
                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-navy-700 dark:text-navy-300">
                  {m.sourceField}
                </td>
                <td className="px-5 py-3">
                  <select
                    value={m.marcoField}
                    onChange={(e) => onUpdateMapping(idx, e.target.value)}
                    className={`w-full rounded-lg border px-2 py-1.5 text-xs transition-colors focus:outline-none focus:ring-1 ${
                      m.typeMismatch
                        ? "border-red-300 bg-red-50 text-red-700 focus:ring-red-500 dark:border-red-700 dark:bg-red-950/20 dark:text-red-400"
                        : "border-navy-200 bg-white text-navy-700 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-300"
                    }`}
                    aria-label={`Map ${m.sourceField} to Marco Reid field`}
                  >
                    <option value="">Select field...</option>
                    {MARCO_FIELDS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="max-w-[200px] truncate px-5 py-3 text-xs text-navy-500 dark:text-navy-400">
                  {m.sampleData}
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  {m.typeMismatch ? (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-400">
                      Type mismatch
                    </span>
                  ) : m.status === "mapped" ? (
                    <span className="inline-flex items-center rounded-full bg-forest-100 px-2.5 py-0.5 text-[10px] font-semibold text-forest-700 dark:bg-forest-900/40 dark:text-forest-400">
                      Mapped
                    </span>
                  ) : m.status === "needs-review" ? (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                      Needs review
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-navy-100 px-2.5 py-0.5 text-[10px] font-semibold text-navy-500 dark:bg-navy-700 dark:text-navy-400">
                      Unmapped
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="rounded-xl border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-600 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={unmapped > 0}
          className="rounded-xl bg-navy-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-navy-500 dark:hover:bg-navy-400"
        >
          Continue to review
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 4: Review & Confirm
// ---------------------------------------------------------------------------

function StepReviewConfirm({
  summary,
  mappings,
  confirmed,
  onConfirm,
  onNext,
  onBack,
}: {
  summary: ImportSummary;
  mappings: FieldMapping[];
  confirmed: boolean;
  onConfirm: (v: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const warnings: string[] = [];
  const missingRequired = mappings.filter(
    (m) => m.status !== "mapped" && !m.marcoField.startsWith("—"),
  );
  if (missingRequired.length > 0) {
    warnings.push(`${missingRequired.length} field(s) are not fully mapped.`);
  }

  // Simulated preview data
  const previewClients = [
    { name: "Smith & Associates", email: "smith@example.com", phone: "09-555-0100" },
    { name: "Johnson Corp", email: "info@johnsoncorp.com", phone: "09-555-0200" },
    { name: "Williams Legal", email: "contact@williams.law", phone: "09-555-0300" },
    { name: "Brown Accounting", email: "admin@brownacct.com", phone: "09-555-0400" },
    { name: "Davis & Partners", email: "davis@dpartners.com", phone: "09-555-0500" },
  ];

  return (
    <div>
      <h2 className="font-serif text-xl text-navy-800 dark:text-white">
        Review and confirm
      </h2>
      <p className="mt-2 text-sm text-navy-400 dark:text-navy-500">
        Review the import summary before starting. Make sure everything looks correct.
      </p>

      {/* Summary cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Clients", count: summary.clients },
          { label: "Matters", count: summary.matters },
          { label: "Documents", count: summary.documents },
          { label: "Time entries", count: summary.timeEntries },
          { label: "Contacts", count: summary.contacts },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              {item.label}
            </p>
            <p className="mt-2 font-serif text-2xl text-navy-800 dark:text-white">
              {item.count.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Preview of first 5 records */}
      <div className="mt-6 rounded-2xl border border-navy-100 bg-white shadow-card dark:border-navy-700 dark:bg-navy-800">
        <div className="border-b border-navy-100 px-5 py-4 dark:border-navy-700">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            Preview: first 5 client records
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 dark:border-navy-700">
                <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                  Name
                </th>
                <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                  Email
                </th>
                <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50 dark:divide-navy-700">
              {previewClients.map((c, idx) => (
                <tr key={idx}>
                  <td className="whitespace-nowrap px-5 py-3 text-navy-700 dark:text-navy-300">
                    {c.name}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-navy-500 dark:text-navy-400">
                    {c.email}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-navy-500 dark:text-navy-400">
                    {c.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Data quality warnings
          </h3>
          <ul className="mt-2 space-y-1">
            {warnings.map((w, idx) => (
              <li key={idx} className="text-sm text-amber-700 dark:text-amber-300">
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Confirmation checkbox */}
      <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => onConfirm(e.target.checked)}
            className="mt-0.5 h-5 w-5 rounded border-navy-300 text-navy-600 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900"
          />
          <span className="text-sm text-navy-700 dark:text-navy-300">
            I confirm that the field mapping is correct and I am ready to import this data
            into Marco Reid. I understand that duplicate records may be created if this data
            already exists in the system.
          </span>
        </label>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="rounded-xl border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-600 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!confirmed}
          className="rounded-xl bg-forest-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-forest-500 dark:hover:bg-forest-400"
        >
          Start import
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 5: Import Progress
// ---------------------------------------------------------------------------

function StepImportProgress({
  summary,
  progress,
  isComplete,
  errors,
}: {
  summary: ImportSummary;
  progress: number;
  isComplete: boolean;
  errors: string[];
}) {
  const totalRecords =
    summary.clients + summary.matters + summary.documents + summary.timeEntries + summary.contacts;
  const recordsImported = Math.round((progress / 100) * totalRecords);

  return (
    <div>
      <h2 className="font-serif text-xl text-navy-800 dark:text-white">
        {isComplete ? "Import complete" : "Importing your data..."}
      </h2>
      <p className="mt-2 text-sm text-navy-400 dark:text-navy-500">
        {isComplete
          ? "Your data has been successfully imported into Marco Reid."
          : "Please do not close this page while the import is in progress."}
      </p>

      {/* Progress bar */}
      <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-navy-700 dark:text-navy-200">
            {isComplete ? "Complete" : "Importing..."}
          </span>
          <span className="text-sm font-medium tabular-nums text-navy-500 dark:text-navy-400">
            {recordsImported.toLocaleString()} / {totalRecords.toLocaleString()} records
          </span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-navy-100 dark:bg-navy-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isComplete ? "bg-forest-500" : "bg-navy-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm tabular-nums text-navy-500 dark:text-navy-400">
          {progress}%
        </p>
      </div>

      {/* Import log */}
      <div className="mt-6 rounded-2xl border border-navy-100 bg-white shadow-card dark:border-navy-700 dark:bg-navy-800">
        <div className="border-b border-navy-100 px-5 py-4 dark:border-navy-700">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            Import log
          </h3>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-5">
          <div className="space-y-2 font-mono text-xs">
            {progress >= 10 && (
              <p className="text-forest-600 dark:text-forest-400">
                [OK] Importing clients... {summary.clients} records processed
              </p>
            )}
            {progress >= 30 && (
              <p className="text-forest-600 dark:text-forest-400">
                [OK] Importing matters... {summary.matters} records processed
              </p>
            )}
            {progress >= 50 && (
              <p className="text-forest-600 dark:text-forest-400">
                [OK] Importing contacts... {summary.contacts} records processed
              </p>
            )}
            {progress >= 70 && (
              <p className="text-forest-600 dark:text-forest-400">
                [OK] Importing time entries... {summary.timeEntries} records processed
              </p>
            )}
            {progress >= 90 && (
              <p className="text-forest-600 dark:text-forest-400">
                [OK] Importing documents... {summary.documents} records processed
              </p>
            )}
            {isComplete && (
              <p className="mt-2 font-semibold text-forest-600 dark:text-forest-400">
                Import completed successfully.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 shadow-card dark:border-red-800 dark:bg-red-950/30">
          <div className="border-b border-red-200 px-5 py-4 dark:border-red-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-400">
              Errors ({errors.length})
            </h3>
          </div>
          <div className="max-h-[200px] overflow-y-auto p-5">
            <ul className="space-y-1 font-mono text-xs text-red-600 dark:text-red-400">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Success summary */}
      {isComplete && (
        <div className="mt-6 rounded-2xl border border-forest-200 bg-forest-50 p-6 dark:border-forest-800 dark:bg-forest-950/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-100 dark:bg-forest-900/40">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-forest-600 dark:text-forest-400" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-forest-800 dark:text-forest-300">
                Import complete
              </p>
              <p className="text-sm text-forest-600 dark:text-forest-400">
                {totalRecords.toLocaleString()} records have been imported into Marco Reid.
                {errors.length > 0
                  ? ` ${errors.length} record(s) failed — see the error log above.`
                  : " No errors detected."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

// Simulated field mappings for demo purposes
function generateMockMappings(source: SourceSystem): FieldMapping[] {
  const fieldSets: Record<string, { sourceField: string; marcoField: string; sampleData: string; status: MappingStatus; typeMismatch: boolean }[]> = {
    clio: [
      { sourceField: "client_name", marcoField: "client_name", sampleData: "Smith & Associates", status: "mapped", typeMismatch: false },
      { sourceField: "email", marcoField: "client_email", sampleData: "smith@example.com", status: "mapped", typeMismatch: false },
      { sourceField: "phone_number", marcoField: "client_phone", sampleData: "09-555-0100", status: "mapped", typeMismatch: false },
      { sourceField: "matter_title", marcoField: "matter_name", sampleData: "Doe v. Smith Corp", status: "mapped", typeMismatch: false },
      { sourceField: "matter_ref", marcoField: "matter_number", sampleData: "MAT-2025-0042", status: "mapped", typeMismatch: false },
      { sourceField: "practice_area", marcoField: "matter_type", sampleData: "Immigration", status: "needs-review", typeMismatch: false },
      { sourceField: "opened_date", marcoField: "matter_open_date", sampleData: "01/15/2025", status: "needs-review", typeMismatch: true },
      { sourceField: "responsible_atty", marcoField: "responsible_attorney", sampleData: "Jane Doe", status: "mapped", typeMismatch: false },
      { sourceField: "time_date", marcoField: "time_entry_date", sampleData: "2025-03-01", status: "mapped", typeMismatch: false },
      { sourceField: "hours", marcoField: "time_entry_hours", sampleData: "2.5", status: "mapped", typeMismatch: false },
      { sourceField: "billing_rate", marcoField: "time_entry_rate", sampleData: "$350.00", status: "mapped", typeMismatch: false },
      { sourceField: "description", marcoField: "time_entry_description", sampleData: "Reviewed immigration petition", status: "mapped", typeMismatch: false },
    ],
    default: [
      { sourceField: "name", marcoField: "client_name", sampleData: "Smith & Associates", status: "mapped", typeMismatch: false },
      { sourceField: "email_address", marcoField: "client_email", sampleData: "smith@example.com", status: "mapped", typeMismatch: false },
      { sourceField: "tel", marcoField: "client_phone", sampleData: "09-555-0100", status: "needs-review", typeMismatch: false },
      { sourceField: "address_line_1", marcoField: "client_address", sampleData: "123 Queen St", status: "mapped", typeMismatch: false },
      { sourceField: "case_name", marcoField: "matter_name", sampleData: "Doe v. Smith Corp", status: "mapped", typeMismatch: false },
      { sourceField: "ref_no", marcoField: "matter_number", sampleData: "REF-001", status: "mapped", typeMismatch: false },
      { sourceField: "type", marcoField: "", sampleData: "Litigation", status: "unmapped", typeMismatch: false },
      { sourceField: "status_code", marcoField: "matter_status", sampleData: "1", status: "needs-review", typeMismatch: true },
      { sourceField: "open_dt", marcoField: "matter_open_date", sampleData: "15-Jan-2025", status: "needs-review", typeMismatch: true },
      { sourceField: "lawyer", marcoField: "responsible_attorney", sampleData: "Jane Doe", status: "mapped", typeMismatch: false },
    ],
  };

  return fieldSets[source] ?? fieldSets.default;
}

export default function MigrationPage() {
  const [step, setStep] = useState<Step>(1);
  const [sourceSystem, setSourceSystem] = useState<SourceSystem | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [mappings, setMappings] = useState<FieldMapping[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importComplete, setImportComplete] = useState(false);
  const [importErrors] = useState<string[]>([]);

  const summary: ImportSummary = {
    clients: 47,
    matters: 123,
    documents: 892,
    timeEntries: 3_456,
    contacts: 215,
  };

  const handleUpdateMapping = useCallback(
    (index: number, marcoField: string) => {
      setMappings((prev) => {
        const updated = [...prev];
        const isSkip = marcoField.startsWith("—");
        updated[index] = {
          ...updated[index],
          marcoField,
          status: isSkip ? "mapped" : marcoField ? "mapped" : "unmapped",
          typeMismatch: false,
        };
        return updated;
      });
    },
    [],
  );

  const goToStep = useCallback(
    (nextStep: Step) => {
      if (nextStep === 3 && sourceSystem) {
        setMappings(generateMockMappings(sourceSystem));
      }
      if (nextStep === 5) {
        // Simulate import progress
        setImportProgress(0);
        setImportComplete(false);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setImportComplete(true);
          }
          setImportProgress(progress);
        }, 300);
      }
      setStep(nextStep);
    },
    [sourceSystem],
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-navy-400 dark:text-navy-500" aria-label="Breadcrumb">
        <span>Settings</span>
        <span className="mx-2">/</span>
        <span className="text-navy-700 dark:text-navy-200">Data Migration</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="font-serif text-display text-navy-800 dark:text-white">
          Data migration
        </h1>
        <p className="mt-2 text-navy-400 dark:text-navy-500">
          Import your existing data from another platform into Marco Reid. We will guide you through
          every step to ensure nothing is lost.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mt-8">
        <StepIndicator currentStep={step} />
      </div>

      {/* Step content */}
      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card dark:border-navy-700 dark:bg-navy-800">
        {step === 1 && (
          <StepSelectSource
            selected={sourceSystem}
            onSelect={setSourceSystem}
            onNext={() => goToStep(2)}
          />
        )}
        {step === 2 && sourceSystem && (
          <StepUploadData
            sourceSystem={sourceSystem}
            fileName={fileName}
            onFileSelected={setFileName}
            onNext={() => goToStep(3)}
            onBack={() => goToStep(1)}
          />
        )}
        {step === 3 && (
          <StepFieldMapping
            mappings={mappings}
            onUpdateMapping={handleUpdateMapping}
            onNext={() => goToStep(4)}
            onBack={() => goToStep(2)}
          />
        )}
        {step === 4 && (
          <StepReviewConfirm
            summary={summary}
            mappings={mappings}
            confirmed={confirmed}
            onConfirm={setConfirmed}
            onNext={() => goToStep(5)}
            onBack={() => goToStep(3)}
          />
        )}
        {step === 5 && (
          <StepImportProgress
            summary={summary}
            progress={importProgress}
            isComplete={importComplete}
            errors={importErrors}
          />
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-8">
        <LegalDisclaimer type="PLATFORM" variant="footer" />
      </div>
    </div>
  );
}
