"use client";

import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";
import SectionHeader from "../SectionHeader";

const PRACTICE_AREAS = [
  "Litigation",
  "Corporate / commercial",
  "Property and conveyancing",
  "Family",
  "Criminal",
  "Employment",
  "Tax",
  "Estates and trusts",
  "Intellectual property",
  "Immigration",
  "Audit and assurance",
  "Bookkeeping",
  "Tax compliance",
  "Advisory",
  "Other",
];

const JURISDICTIONS = [
  "New Zealand",
  "Australia",
  "United Kingdom",
  "United States — Federal",
  "United States — California",
  "United States — New York",
  "United States — Texas",
  "Canada",
  "Other",
];

const TIME_ZONES = [
  "Pacific/Auckland",
  "Australia/Sydney",
  "Asia/Singapore",
  "Asia/Hong_Kong",
  "Asia/Tokyo",
  "Europe/London",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "UTC",
];

interface Props {
  initial: {
    name: string;
    email: string;
    practiceArea: string;
    jurisdiction: string;
    timeZone: string;
  };
}

const inputClass =
  "w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-800 placeholder:text-navy-400 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 disabled:bg-navy-50 disabled:text-navy-400";

const labelClass = "block text-sm font-medium text-navy-700";

function initialsOf(name: string, email: string) {
  const source = (name || email).trim();
  const parts = source.split(/[\s@.]+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return (letters || "M").toUpperCase().slice(0, 2);
}

export default function ProfileForm({ initial }: Props) {
  const toast = useToast();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/me/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          practiceArea: form.practiceArea,
          jurisdiction: form.jurisdiction,
          timeZone: form.timeZone,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Save failed");
      }
      toast.success("Profile saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <SectionHeader
        title="Profile"
        description="Your personal details. Visible to your team and on documents you issue."
      />

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-5">
          <div
            aria-hidden="true"
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-plum-50 text-lg font-semibold text-plum-600"
          >
            {initialsOf(form.name, form.email)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-navy-700">Profile photo</p>
            <p className="text-xs text-navy-400">
              Upload coming soon. We will use your initials in the meantime.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Photo upload is coming soon")}
            className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={`mt-2 ${inputClass}`}
              placeholder="Marco Reid"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="email"
                type="email"
                value={form.email}
                disabled
                aria-readonly="true"
                className={inputClass}
                autoComplete="email"
              />
              <button
                type="button"
                onClick={() =>
                  toast.info("Email change with verification is coming soon")
                }
                className="flex-shrink-0 rounded-lg border border-navy-200 px-3 py-3 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
              >
                Change
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="practiceArea" className={labelClass}>
              Practice area
            </label>
            <select
              id="practiceArea"
              value={form.practiceArea}
              onChange={(e) => update("practiceArea", e.target.value)}
              className={`mt-2 ${inputClass}`}
            >
              <option value="">Choose a practice area</option>
              {PRACTICE_AREAS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="jurisdiction" className={labelClass}>
              Jurisdiction
            </label>
            <select
              id="jurisdiction"
              value={form.jurisdiction}
              onChange={(e) => update("jurisdiction", e.target.value)}
              className={`mt-2 ${inputClass}`}
            >
              <option value="">Choose a jurisdiction</option>
              {JURISDICTIONS.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="timeZone" className={labelClass}>
              Time zone
            </label>
            <select
              id="timeZone"
              value={form.timeZone}
              onChange={(e) => update("timeZone", e.target.value)}
              className={`mt-2 ${inputClass}`}
            >
              {TIME_ZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-navy-400">
              Used for billing, deadlines, and notifications.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-navy-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
