"use client";

import React from "react";

export interface ApplicationTrackerProps {
  status: "DRAFT" | "PENDING" | "AMENDED" | "APPROVED" | "SIGNED";
  jurisdiction?: string;
  documentType?: string;
  lastUpdated?: string;
  professionalName?: string;
}

type StageState = "complete" | "current" | "future";

interface Stage {
  id: number;
  label: string;
  sublabel: string;
  estimatedTime?: string;
  amendedOnly?: boolean;
}

function getStages(jurisdiction?: string): Stage[] {
  const jurisdictionLabel = jurisdiction ?? "your jurisdiction";
  return [
    {
      id: 1,
      label: "Application Drafted",
      sublabel: "Your document has been created and watermarked",
    },
    {
      id: 2,
      label: "Verification Passed",
      sublabel: "Marco has verified all fields and jurisdiction rules",
      estimatedTime: "Usually instant",
    },
    {
      id: 3,
      label: "Assigned to Professional",
      sublabel: `Routed to a credentialled professional in ${jurisdictionLabel}`,
      estimatedTime: "Typically within 1 hour",
    },
    {
      id: 4,
      label: "Under Professional Review",
      sublabel: "Your document is being reviewed by a licensed professional",
      estimatedTime: "Typically 1–3 business days",
    },
    {
      id: 5,
      label: "Amendments",
      sublabel:
        "The professional has requested changes — you'll be notified by email",
      estimatedTime: "Action required by you",
      amendedOnly: true,
    },
    {
      id: 6,
      label: "Ready for Submission",
      sublabel: "Reviewed and approved. Professional signature attached.",
      estimatedTime: "Typically within 24 hours",
    },
    {
      id: 7,
      label: "Filed / Complete",
      sublabel: "Your signed document is ready to download",
    },
  ];
}

function getActiveStageIndex(
  status: ApplicationTrackerProps["status"]
): number {
  // Returns 0-based index of the "current" stage (the one pulsing / in progress)
  switch (status) {
    case "DRAFT":
      return 1; // stage 2 (Verification) is current/auto-processing
    case "PENDING":
      return 3; // stage 4 (Under Professional Review)
    case "AMENDED":
      return 4; // stage 5 (Amendments)
    case "APPROVED":
      return 5; // stage 6 (Ready for Submission)
    case "SIGNED":
      return 6; // stage 7 (Filed / Complete) — will be marked complete
  }
}

function getStageState(
  stageIndex: number,
  activeIndex: number,
  status: ApplicationTrackerProps["status"]
): StageState {
  if (status === "SIGNED") return "complete";
  if (stageIndex < activeIndex) return "complete";
  if (stageIndex === activeIndex) return "current";
  return "future";
}

// Icons as inline SVG components — small, self-contained

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 6 10Zm.75 2.75a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7c0-.539.035-1.07.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.125-2.095.39-.307.43-.838.41-1.412a6.5 6.5 0 0 0-13.07 0Z" />
    </svg>
  );
}

function MagnifyIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function getStageIcon(stageId: number, state: StageState) {
  if (state === "complete") {
    return <CheckIcon />;
  }

  switch (stageId) {
    case 1:
      return <DocumentIcon />;
    case 2:
      return <ShieldIcon />;
    case 3:
      return <UserIcon />;
    case 4:
      return <MagnifyIcon />;
    case 5:
      return <PencilIcon />;
    case 6:
      return <StarIcon />;
    case 7:
      return <DownloadIcon />;
    default:
      return <ClockIcon />;
  }
}

function nodeClasses(state: StageState, isAmended: boolean): string {
  const base =
    "relative z-10 flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 transition-colors duration-300";
  if (state === "complete")
    return `${base} bg-forest-500 text-white shadow-sm`;
  if (state === "current") {
    if (isAmended)
      return `${base} bg-gold-600 text-white shadow-md ring-4 ring-gold-200`;
    return `${base} bg-gold-400 text-white shadow-md ring-4 ring-gold-100`;
  }
  return `${base} bg-navy-100 text-navy-300`;
}

function labelClasses(state: StageState, isAmended: boolean): string {
  if (state === "complete") return "text-forest-600 font-semibold";
  if (state === "current") {
    return isAmended ? "text-gold-700 font-semibold" : "text-gold-600 font-semibold";
  }
  return "text-navy-400";
}

// ─── Desktop horizontal connector ────────────────────────────────────────────

function HorizontalConnector({ state }: { state: StageState }) {
  const isComplete = state === "complete";
  return (
    <div
      className="flex-1 h-0.5 mx-1 mt-[-22px] relative z-0"
      aria-hidden="true"
    >
      <div
        className={
          isComplete
            ? "w-full h-full bg-forest-500 transition-all duration-500"
            : "w-full h-full border-t-2 border-dashed border-navy-200"
        }
      />
    </div>
  );
}

// ─── Mobile vertical connector ───────────────────────────────────────────────

function VerticalConnector({ state }: { state: StageState }) {
  const isComplete = state === "complete";
  return (
    <div
      className="w-0.5 h-8 ml-[21px] my-0"
      aria-hidden="true"
    >
      <div
        className={
          isComplete
            ? "w-full h-full bg-forest-500"
            : "w-full h-full border-l-2 border-dashed border-navy-200"
        }
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ApplicationTracker({
  status,
  jurisdiction,
  documentType,
  lastUpdated,
  professionalName,
}: ApplicationTrackerProps) {
  const allStages = getStages(jurisdiction);
  const activeIndex = getActiveStageIndex(status);
  const showAmendedStage = status === "AMENDED" || status === "APPROVED" || status === "SIGNED";

  // Filter stages: only show the AMENDED stage when relevant
  const visibleStages = allStages.filter(
    (s) => !s.amendedOnly || showAmendedStage
  );

  // Re-map activeIndex after filtering if needed
  // (stage IDs are fixed, so we match by id)
  const activeStageId = allStages[activeIndex].id;

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleString("en-NZ", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const isAllComplete = status === "SIGNED";
  const isAmended = status === "AMENDED";

  return (
    <div className="w-full">
      {/* Banners */}
      {isAmended && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3.5">
          <span className="mt-0.5 text-gold-600 flex-shrink-0">
            <WarningIcon />
          </span>
          <p className="text-sm font-medium text-gold-800">
            <span className="font-bold">Action required</span> — the
            professional has requested amendments. Check your email for details.
          </p>
        </div>
      )}

      {isAllComplete && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-forest-300 bg-forest-50 px-4 py-3.5">
          <span className="mt-0.5 text-forest-600 flex-shrink-0">
            <CheckIcon />
          </span>
          <p className="text-sm font-medium text-forest-800">
            <span className="font-bold">Complete</span> — your document is
            ready to download.
          </p>
        </div>
      )}

      {/* Document meta row */}
      {(documentType || professionalName) && (
        <div className="mb-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-navy-500">
          {documentType && (
            <span>
              <span className="font-medium text-navy-700">Document:</span>{" "}
              {documentType}
            </span>
          )}
          {jurisdiction && (
            <span>
              <span className="font-medium text-navy-700">Jurisdiction:</span>{" "}
              {jurisdiction}
            </span>
          )}
          {professionalName && (
            <span>
              <span className="font-medium text-navy-700">Professional:</span>{" "}
              {professionalName}
            </span>
          )}
        </div>
      )}

      {/* ── Desktop tracker (md+) ── */}
      <div
        className="hidden md:block"
        role="list"
        aria-label="Application progress"
      >
        {/* Nodes row */}
        <div className="flex items-center">
          {visibleStages.map((stage, idx) => {
            const stageState = getStageState(
              allStages.indexOf(allStages.find((s) => s.id === stage.id)!),
              allStages.findIndex((s) => s.id === activeStageId),
              status
            );
            const isCurrentStage = stage.id === activeStageId && !isAllComplete;
            const isAmd = isAmended && isCurrentStage;

            return (
              <React.Fragment key={stage.id}>
                {/* Node */}
                <div
                  role="listitem"
                  className="flex flex-col items-center relative"
                  style={{ minWidth: 44 }}
                >
                  {/* Pulse ring behind node */}
                  {isCurrentStage && (
                    <span
                      className={`pulse-ring absolute inset-0 rounded-full w-11 h-11 ${
                        isAmd
                          ? "bg-gold-600/30"
                          : "bg-gold-400/30"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <div className={nodeClasses(stageState, isAmd)}>
                    {getStageIcon(stage.id, stageState)}
                  </div>
                </div>

                {/* Connector (not after last) */}
                {idx < visibleStages.length - 1 && (
                  <HorizontalConnector state={stageState} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Labels row */}
        <div className="flex items-start mt-3">
          {visibleStages.map((stage, idx) => {
            const stageIndex = allStages.findIndex((s) => s.id === stage.id);
            const activeStageIndex = allStages.findIndex(
              (s) => s.id === activeStageId
            );
            const stageState = getStageState(stageIndex, activeStageIndex, status);
            const isCurrentStage = stage.id === activeStageId && !isAllComplete;
            const isAmd = isAmended && isCurrentStage;

            return (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center text-center" style={{ minWidth: 44 }}>
                  <span className={`text-xs leading-tight ${labelClasses(stageState, isAmd)}`}>
                    {stage.label}
                  </span>
                  {isCurrentStage && (
                    <span className="mt-1 text-[10px] leading-snug text-navy-500 max-w-[80px]">
                      {stage.sublabel}
                    </span>
                  )}
                  {isCurrentStage && stage.estimatedTime && (
                    <span
                      className={`mt-1 text-[10px] font-medium ${
                        isAmd ? "text-gold-600" : "text-gold-500"
                      }`}
                    >
                      {stage.estimatedTime}
                    </span>
                  )}
                  {stageState === "complete" && status === "SIGNED" && stage.id === 7 && (
                    <span className="mt-1 text-[10px] text-forest-600 font-medium">
                      Download ready
                    </span>
                  )}
                </div>
                {idx < visibleStages.length - 1 && (
                  <div className="flex-1" aria-hidden="true" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Mobile tracker (<md) ── */}
      <div
        className="md:hidden flex flex-col"
        role="list"
        aria-label="Application progress"
      >
        {visibleStages.map((stage, idx) => {
          const stageIndex = allStages.findIndex((s) => s.id === stage.id);
          const activeStageIndex = allStages.findIndex(
            (s) => s.id === activeStageId
          );
          const stageState = getStageState(stageIndex, activeStageIndex, status);
          const isCurrentStage = stage.id === activeStageId && !isAllComplete;
          const isAmd = isAmended && isCurrentStage;
          const isLast = idx === visibleStages.length - 1;

          // Connector state: uses the state of the CURRENT stage to connect to the next
          const connectorState =
            stageState === "complete" ? "complete" : "future";

          return (
            <div key={stage.id} role="listitem" className="flex flex-col">
              <div className="flex items-start gap-4">
                {/* Node column */}
                <div className="relative flex flex-col items-center flex-shrink-0">
                  {isCurrentStage && (
                    <span
                      className={`pulse-ring absolute inset-0 rounded-full w-11 h-11 ${
                        isAmd ? "bg-gold-600/30" : "bg-gold-400/30"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <div className={nodeClasses(stageState, isAmd)}>
                    {getStageIcon(stage.id, stageState)}
                  </div>
                </div>

                {/* Label column */}
                <div className="pt-2.5 pb-1 flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${labelClasses(stageState, isAmd)}`}>
                    {stage.label}
                  </p>
                  {(isCurrentStage || stageState === "complete") && (
                    <p className="mt-0.5 text-xs text-navy-500 leading-snug">
                      {stage.sublabel}
                    </p>
                  )}
                  {isCurrentStage && stage.estimatedTime && (
                    <p
                      className={`mt-1 text-xs font-medium ${
                        isAmd ? "text-gold-600" : "text-gold-500"
                      }`}
                    >
                      {stage.estimatedTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Vertical connector */}
              {!isLast && <VerticalConnector state={connectorState} />}
            </div>
          );
        })}
      </div>

      {/* Last updated */}
      {formattedDate && (
        <p className="mt-5 text-xs text-navy-400">
          Last updated: {formattedDate}
        </p>
      )}
    </div>
  );
}
