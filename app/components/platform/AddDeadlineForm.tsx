"use client";

import { useState, FormEvent } from "react";

interface MatterOption {
  id: string;
  title: string;
  clientName: string;
}

const JURISDICTIONS = [
  { value: "NZ", label: "New Zealand" },
  { value: "AU", label: "Australia" },
  { value: "UK", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
];

const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const REMINDER_OPTIONS = [
  { value: 1, label: "1 day before" },
  { value: 3, label: "3 days before" },
  { value: 7, label: "1 week before" },
  { value: 14, label: "2 weeks before" },
  { value: 30, label: "30 days before" },
];

export default function AddDeadlineForm({
  matters,
  onCreated,
}: {
  matters: MatterOption[];
  onCreated: () => void;
}) {
  const [matterId, setMatterId] = useState("");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [courtRule, setCourtRule] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [priority, setPriority] = useState("normal");
  const [reminderDays, setReminderDays] = useState(3);
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!matterId || !title || !dueDate) {
      setError("Matter, title, and due date are required.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/deadlines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matterId,
          title,
          dueDate,
          courtRule: courtRule || undefined,
          jurisdiction: jurisdiction || undefined,
          priority,
          reminderDays,
          description: description || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create deadline.");
        setSaving(false);
        return;
      }

      onCreated();
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400";
  const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
    >
      <h3 className="font-serif text-lg text-navy-800">Add Deadline</h3>

      {error && (
        <div className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Matter */}
        <div>
          <label className={labelClasses}>Matter *</label>
          <select
            value={matterId}
            onChange={(e) => setMatterId(e.target.value)}
            className={inputClasses}
            required
          >
            <option value="">Select a matter...</option>
            {matters.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title} ({m.clientName})
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className={labelClasses}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., File Statement of Defence"
            className={inputClasses}
            required
          />
        </div>

        {/* Due Date */}
        <div>
          <label className={labelClasses}>Due Date *</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        {/* Court Rule */}
        <div>
          <label className={labelClasses}>Court Rule Reference</label>
          <input
            type="text"
            value={courtRule}
            onChange={(e) => setCourtRule(e.target.value)}
            placeholder='e.g., FRCP Rule 12(a)(1)(A)'
            className={inputClasses}
          />
        </div>

        {/* Jurisdiction */}
        <div>
          <label className={labelClasses}>Jurisdiction</label>
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className={inputClasses}
          >
            <option value="">Select jurisdiction...</option>
            {JURISDICTIONS.map((j) => (
              <option key={j.value} value={j.value}>
                {j.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className={labelClasses}>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={inputClasses}
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reminder Days */}
        <div>
          <label className={labelClasses}>Reminder</label>
          <select
            value={reminderDays}
            onChange={(e) => setReminderDays(Number(e.target.value))}
            className={inputClasses}
          >
            {REMINDER_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description — full width */}
        <div className="sm:col-span-2">
          <label className={labelClasses}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Additional notes about this deadline..."
            rows={2}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add Deadline"}
        </button>
      </div>
    </form>
  );
}
