"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface MatterOption {
  id: string;
  title: string;
  clientName?: string;
}

interface TimerState {
  matterId: string;
  description: string;
  billable: boolean;
  // elapsed ms accumulated while paused
  elapsedMs: number;
  // ts ms when last started, null when paused
  startedAt: number | null;
}

const STORAGE_KEY = "mr:timer:v1";
const DEFAULT_RATE_KEY = "mr:timer:rate";

const emptyState: TimerState = {
  matterId: "",
  description: "",
  billable: true,
  elapsedMs: 0,
  startedAt: null,
};

function formatDuration(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

export default function TimerWidget({
  matters,
  defaultRateInCents = 30000,
  floating = false,
}: {
  matters: MatterOption[];
  defaultRateInCents?: number;
  floating?: boolean;
}) {
  const [state, setState] = useState<TimerState>(emptyState);
  const [expanded, setExpanded] = useState(!floating);
  const [, forceTick] = useState(0);
  const [showSave, setShowSave] = useState(false);
  const [pendingMinutes, setPendingMinutes] = useState(0);
  const [saveForm, setSaveForm] = useState({
    description: "",
    rateInCents: defaultRateInCents,
    date: new Date().toISOString().slice(0, 10),
    billable: true,
    matterId: "",
    minutes: 0,
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as TimerState;
        setState(parsed);
      }
    } catch {}
    try {
      const r = localStorage.getItem(DEFAULT_RATE_KEY);
      if (r) {
        const n = parseInt(r, 10);
        if (Number.isFinite(n) && n >= 0) {
          setSaveForm((f) => ({ ...f, rateInCents: n }));
        }
      }
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  // Tick while running
  useEffect(() => {
    if (state.startedAt == null) return;
    const id = window.setInterval(() => forceTick((n) => n + 1), 500);
    return () => window.clearInterval(id);
  }, [state.startedAt]);

  const currentMs = useMemo(() => {
    if (state.startedAt == null) return state.elapsedMs;
    return state.elapsedMs + (Date.now() - state.startedAt);
  }, [state]);

  const isRunning = state.startedAt != null;

  const start = useCallback(() => {
    if (!state.matterId) return;
    if (isRunning) return;
    setState((s) => ({ ...s, startedAt: Date.now() }));
  }, [state.matterId, isRunning]);

  const pause = useCallback(() => {
    setState((s) => {
      if (s.startedAt == null) return s;
      const add = Date.now() - s.startedAt;
      return { ...s, startedAt: null, elapsedMs: s.elapsedMs + add };
    });
  }, []);

  const stop = useCallback(() => {
    // Compute final elapsed
    let finalMs = state.elapsedMs;
    if (state.startedAt != null) {
      finalMs += Date.now() - state.startedAt;
    }
    const minutes = Math.max(1, Math.round(finalMs / 60000));
    setPendingMinutes(minutes);
    setSaveForm((f) => ({
      ...f,
      minutes,
      description: state.description,
      billable: state.billable,
      matterId: state.matterId,
      date: new Date().toISOString().slice(0, 10),
    }));
    // Pause the timer
    setState((s) => ({ ...s, startedAt: null, elapsedMs: finalMs }));
    setShowSave(true);
  }, [state]);

  const reset = useCallback(() => {
    setState(emptyState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  // Keyboard: Space to start/pause when focus is on the timer container
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === " " || e.code === "Space") {
        const target = e.target as HTMLElement;
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        if (isRunning) pause();
        else if (state.matterId) start();
      }
    },
    [isRunning, pause, start, state.matterId]
  );

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveError(null);
    setSaving(true);
    try {
      if (!saveForm.matterId) throw new Error("Matter is required");
      if (!saveForm.description.trim()) throw new Error("Description is required");
      if (!saveForm.minutes || saveForm.minutes <= 0) throw new Error("Minutes must be > 0");

      const res = await fetch("/api/time-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matterId: saveForm.matterId,
          description: saveForm.description,
          minutes: saveForm.minutes,
          rateInCents: saveForm.rateInCents,
          date: new Date(saveForm.date).toISOString(),
          billable: saveForm.billable,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Failed to save entry");
      }

      // Persist default rate
      try {
        localStorage.setItem(DEFAULT_RATE_KEY, String(saveForm.rateInCents));
      } catch {}

      setSaveSuccess(true);
      setShowSave(false);
      reset();
      // Notify any listeners (e.g. /time page) to refresh
      try {
        window.dispatchEvent(new CustomEvent("mr:time-entry:created"));
      } catch {}
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  const selectedMatter = matters.find((m) => m.id === state.matterId);

  const panel = (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`rounded-2xl border border-navy-100 bg-white p-5 shadow-card focus:outline-none focus:ring-2 focus:ring-navy-200 ${
        floating ? "w-[340px]" : "w-full"
      }`}
      aria-label="Time tracking timer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              isRunning ? "animate-pulse bg-forest-500" : "bg-navy-200"
            }`}
            aria-hidden
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
            {isRunning ? "Running" : currentMs > 0 ? "Paused" : "Timer"}
          </span>
        </div>
        {floating && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="rounded-md p-1 text-navy-400 hover:bg-navy-50 hover:text-navy-600"
            aria-label="Minimize timer"
          >
            &minus;
          </button>
        )}
      </div>

      <div
        className="mt-3 text-center font-mono text-4xl font-semibold tabular-nums text-navy-800"
        aria-live="polite"
      >
        {formatDuration(currentMs)}
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-xs font-medium text-navy-500" htmlFor="timer-matter">
            Matter <span className="text-plum-600">*</span>
          </label>
          <select
            id="timer-matter"
            disabled={isRunning}
            value={state.matterId}
            onChange={(e) => setState((s) => ({ ...s, matterId: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100 disabled:bg-navy-50"
          >
            <option value="">Select a matter…</option>
            {matters.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
                {m.clientName ? ` — ${m.clientName}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-navy-500" htmlFor="timer-desc">
            Description
          </label>
          <input
            id="timer-desc"
            type="text"
            placeholder="What are you working on?"
            value={state.description}
            onChange={(e) => setState((s) => ({ ...s, description: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-navy-600">
          <input
            type="checkbox"
            checked={state.billable}
            onChange={(e) => setState((s) => ({ ...s, billable: e.target.checked }))}
            className="h-4 w-4 rounded border-navy-300 text-forest-600 focus:ring-forest-500"
          />
          Billable
        </label>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {!isRunning ? (
          <button
            type="button"
            onClick={start}
            disabled={!state.matterId}
            className="inline-flex min-h-touch flex-1 items-center justify-center rounded-lg bg-forest-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentMs > 0 ? "Resume" : "Start"}
          </button>
        ) : (
          <button
            type="button"
            onClick={pause}
            className="inline-flex min-h-touch flex-1 items-center justify-center rounded-lg bg-navy-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600"
          >
            Pause
          </button>
        )}
        <button
          type="button"
          onClick={stop}
          disabled={currentMs === 0}
          className="inline-flex min-h-touch items-center justify-center rounded-lg border border-plum-300 bg-white px-4 py-2.5 text-sm font-semibold text-plum-700 transition-all hover:bg-plum-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Stop
        </button>
        {(currentMs > 0 || state.matterId || state.description) && !isRunning && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-touch items-center justify-center rounded-lg px-3 py-2.5 text-xs font-medium text-navy-400 hover:text-navy-600"
            aria-label="Reset timer"
          >
            Reset
          </button>
        )}
      </div>

      {selectedMatter && (
        <p className="mt-3 text-xs text-navy-400">
          Press <kbd className="rounded bg-navy-50 px-1.5 py-0.5 font-mono text-[10px]">Space</kbd>{" "}
          to {isRunning ? "pause" : "start"}
        </p>
      )}

      {saveSuccess && (
        <div className="mt-3 rounded-lg bg-forest-50 px-3 py-2 text-xs font-medium text-forest-700">
          Time entry saved.
        </div>
      )}
    </div>
  );

  return (
    <>
      {floating ? (
        <div className="fixed bottom-6 right-6 z-40 print:hidden">
          {expanded ? (
            panel
          ) : (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group flex items-center gap-3 rounded-full bg-navy-800 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy-900"
              aria-label="Open timer"
            >
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  isRunning ? "animate-pulse bg-forest-400" : "bg-navy-300"
                }`}
                aria-hidden
              />
              <span className="font-mono tabular-nums">{formatDuration(currentMs)}</span>
              <span className="text-navy-200 group-hover:text-white">Timer</span>
            </button>
          )}
        </div>
      ) : (
        panel
      )}

      {showSave && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 px-4 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Save time entry"
        >
          <form
            onSubmit={handleSave}
            className="w-full max-w-lg rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
          >
            <h2 className="font-serif text-xl text-navy-800">Save time entry</h2>
            <p className="mt-1 text-sm text-navy-400">
              Captured {formatDuration(pendingMinutes * 60 * 1000)} — review and save.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-navy-500">Matter</label>
                <select
                  required
                  value={saveForm.matterId}
                  disabled
                  className="mt-1 w-full rounded-lg border border-navy-200 bg-navy-50 px-3 py-2 text-sm text-navy-700"
                >
                  <option value="">—</option>
                  {matters.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                      {m.clientName ? ` — ${m.clientName}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-navy-500">
                  Description <span className="text-plum-600">*</span>
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  value={saveForm.description}
                  onChange={(e) => setSaveForm((f) => ({ ...f, description: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-navy-500">
                  Duration (minutes)
                </label>
                <input
                  required
                  type="number"
                  min={1}
                  step={1}
                  value={saveForm.minutes}
                  onChange={(e) =>
                    setSaveForm((f) => ({ ...f, minutes: parseInt(e.target.value, 10) || 0 }))
                  }
                  className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-navy-500">
                  Rate (USD/hr)
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={(saveForm.rateInCents / 100).toFixed(2)}
                  onChange={(e) =>
                    setSaveForm((f) => ({
                      ...f,
                      rateInCents: Math.round(parseFloat(e.target.value || "0") * 100),
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-navy-500">Date</label>
                <input
                  type="date"
                  value={saveForm.date}
                  onChange={(e) => setSaveForm((f) => ({ ...f, date: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
                />
              </div>

              <label className="flex items-center gap-2 self-end pb-2 text-sm text-navy-600">
                <input
                  type="checkbox"
                  checked={saveForm.billable}
                  onChange={(e) => setSaveForm((f) => ({ ...f, billable: e.target.checked }))}
                  className="h-4 w-4 rounded border-navy-300 text-forest-600 focus:ring-forest-500"
                />
                Billable
              </label>
            </div>

            {saveError && (
              <p className="mt-3 rounded-lg bg-plum-50 px-3 py-2 text-sm text-plum-700">
                {saveError}
              </p>
            )}

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSave(false)}
                className="inline-flex min-h-touch items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-navy-500 hover:text-navy-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save entry"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
