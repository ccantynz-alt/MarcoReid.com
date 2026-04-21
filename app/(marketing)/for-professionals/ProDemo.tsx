"use client";

import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";
import { formatFee } from "@/lib/marketplace/format";
import { MOCK_QUEUE, type MockMatter } from "./mock-queue";

type Mode = "idle" | "amend" | "reject";

function MatterCard({ matter }: { matter: MockMatter }) {
  const { info, success, warning } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [amended, setAmended] = useState(matter.draftBody);
  const [rejectReason, setRejectReason] = useState("");

  function handleSignoff() {
    success(
      "Demo mode — sign-off not filed.",
      "Join the verified pro network to release this to the citizen for real.",
    );
  }

  function handleAmendSave() {
    info(
      "Demo mode — amended draft not released.",
      "In the real tool, your amended text is hashed, timestamped, and delivered to the citizen.",
    );
    setMode("idle");
  }

  function handleReject() {
    if (rejectReason.trim().length < 10) return;
    warning(
      "Demo mode — rejection not recorded.",
      "In the real tool, the matter re-queues for a different pro and the citizen is notified.",
    );
    setRejectReason("");
    setMode("idle");
  }

  return (
    <li className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-plum-500">
            <span aria-hidden="true" className="mr-1">
              {matter.flag}
            </span>
            {matter.practiceArea} &middot; {matter.jurisdiction}
          </p>
          <p className="mt-2 font-serif text-lg text-navy-800 sm:text-xl">
            {matter.summary}
          </p>
          <p className="mt-1 text-xs text-navy-400">{matter.postedLabel}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800">
            {formatFee(matter.leadFeeNetToProCents, matter.currency)} to you
          </span>
          <span className="text-[11px] text-navy-400">
            after {formatFee(matter.platformFeeCents, matter.currency)} platform fee
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-navy-100 bg-navy-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-forest-600">
          AI draft ready &middot; ~{matter.reviewMinutes} min review
        </p>
        <p className="mt-2 font-serif text-[15px] leading-relaxed text-navy-700">
          {matter.draftBody.split("\n\n")[0]}
        </p>
      </div>

      {!expanded ? (
        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex min-h-touch items-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
          >
            Review &rarr;
          </button>
          <span className="text-xs text-navy-400">
            {matter.citations.length} statute citations
          </span>
        </div>
      ) : (
        <div className="mt-5 border-t border-navy-100 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Citizen&rsquo;s description
            </p>
            <button
              type="button"
              onClick={() => {
                setExpanded(false);
                setMode("idle");
              }}
              className="text-xs font-semibold text-navy-500 hover:text-navy-700"
            >
              Collapse &uarr;
            </button>
          </div>
          <p className="mt-2 whitespace-pre-wrap rounded-lg bg-navy-50 p-4 text-sm text-navy-700">
            {matter.detailsFromCitizen}
          </p>

          <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                AI draft &middot; for your review
              </p>
              <span className="rounded-full bg-forest-100 px-2.5 py-0.5 text-[11px] font-semibold text-forest-800">
                Ready to sign off
              </span>
            </div>
            <h3 className="mt-2 font-serif text-xl text-navy-800">
              {matter.draftTitle}
            </h3>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-navy-700">
              {matter.draftBody.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-navy-100 bg-navy-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">
                Authorities cited
              </p>
              <ul className="mt-2 space-y-1">
                {matter.citations.map((c) => (
                  <li key={c} className="text-sm text-navy-700">
                    &middot; {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {mode === "idle" && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSignoff}
                className="inline-flex min-h-touch items-center rounded-lg bg-forest-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2"
              >
                Sign off as-is
              </button>
              <button
                type="button"
                onClick={() => setMode("amend")}
                className="inline-flex min-h-touch items-center rounded-lg border border-navy-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
              >
                Amend and sign off
              </button>
              <button
                type="button"
                onClick={() => setMode("reject")}
                className="inline-flex min-h-touch items-center rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                Reject &mdash; needs a human from scratch
              </button>
            </div>
          )}

          {mode === "amend" && (
            <div className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Amended draft
              </label>
              <textarea
                value={amended}
                onChange={(e) => setAmended(e.target.value)}
                rows={14}
                className="mt-2 w-full rounded-lg border border-navy-200 px-4 py-3 font-mono text-[13px] text-navy-800 focus:border-gold-400 focus:outline-none"
              />
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAmendSave}
                  disabled={amended === matter.draftBody}
                  className="inline-flex min-h-touch items-center rounded-lg bg-plum-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-plum-700 disabled:opacity-50"
                >
                  Save amendment &amp; sign off
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAmended(matter.draftBody);
                    setMode("idle");
                  }}
                  className="text-sm text-navy-500 hover:text-navy-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {mode === "reject" && (
            <div className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Why does this need a human from scratch?
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                placeholder="Briefly: what did the AI miss? (min. 10 chars)"
                className="mt-2 w-full rounded-lg border border-navy-200 px-4 py-3 text-sm text-navy-800 focus:border-gold-400 focus:outline-none"
              />
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReject}
                  disabled={rejectReason.trim().length < 10}
                  className="inline-flex min-h-touch items-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                >
                  Reject &amp; re-queue
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRejectReason("");
                    setMode("idle");
                  }}
                  className="text-sm text-navy-500 hover:text-navy-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default function ProDemo() {
  return (
    <ul className="space-y-5">
      {MOCK_QUEUE.map((m) => (
        <MatterCard key={m.id} matter={m} />
      ))}
    </ul>
  );
}
