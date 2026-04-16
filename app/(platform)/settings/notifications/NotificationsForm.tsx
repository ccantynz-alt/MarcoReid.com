"use client";

import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";
import SectionHeader from "../SectionHeader";

interface Prefs {
  emailMatter: boolean;
  emailClient: boolean;
  emailBilling: boolean;
  emailMarco: boolean;
  emailSecurity: boolean;
  emailProduct: boolean;
  inAppMatter: boolean;
  inAppMessages: boolean;
  weeklyDigest: boolean;
  digestDayOfWeek: number;
}

const DEFAULT_PREFS: Prefs = {
  emailMatter: true,
  emailClient: true,
  emailBilling: true,
  emailMarco: true,
  emailSecurity: true,
  emailProduct: false,
  inAppMatter: true,
  inAppMessages: true,
  weeklyDigest: true,
  digestDayOfWeek: 1,
};

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Toggle({
  id,
  label,
  desc,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-navy-800">
          {label}
        </label>
        <p className="mt-0.5 text-xs text-navy-400">{desc}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-forest-500" : "bg-navy-200"
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function NotificationsForm() {
  const toast = useToast();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Prefs>(key: K, value: Prefs[K]) {
    setPrefs((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/me/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Save failed");
      }
      toast.success("Notification preferences saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <SectionHeader
        title="Notifications"
        description="Choose what reaches you, and how. Security alerts can never be muted."
      />

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Email</h3>
        <div className="mt-2 divide-y divide-navy-100">
          <Toggle
            id="emailMatter"
            label="Matter updates"
            desc="Status changes, deadlines, and assignments on your matters."
            checked={prefs.emailMatter}
            onChange={(v) => set("emailMatter", v)}
          />
          <Toggle
            id="emailClient"
            label="Client activity"
            desc="When clients reply, view documents, or upload to the portal."
            checked={prefs.emailClient}
            onChange={(v) => set("emailClient", v)}
          />
          <Toggle
            id="emailBilling"
            label="Billing alerts"
            desc="Invoices, payment receipts, and subscription changes."
            checked={prefs.emailBilling}
            onChange={(v) => set("emailBilling", v)}
          />
          <Toggle
            id="emailMarco"
            label="Marco updates"
            desc="When Marco completes long research jobs in the background."
            checked={prefs.emailMarco}
            onChange={(v) => set("emailMarco", v)}
          />
          <Toggle
            id="emailSecurity"
            label="Security alerts"
            desc="New sign-ins, password changes, and suspicious activity."
            checked={prefs.emailSecurity}
            onChange={(v) => set("emailSecurity", v)}
          />
          <Toggle
            id="emailProduct"
            label="Product news"
            desc="Occasional updates about new features and releases."
            checked={prefs.emailProduct}
            onChange={(v) => set("emailProduct", v)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">In-app</h3>
        <div className="mt-2 divide-y divide-navy-100">
          <Toggle
            id="inAppMatter"
            label="Real-time matter activity"
            desc="Toasts and indicators as activity happens on your matters."
            checked={prefs.inAppMatter}
            onChange={(v) => set("inAppMatter", v)}
          />
          <Toggle
            id="inAppMessages"
            label="New messages"
            desc="Live notifications for new client and team messages."
            checked={prefs.inAppMessages}
            onChange={(v) => set("inAppMessages", v)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Weekly digest</h3>
        <div className="mt-2 divide-y divide-navy-100">
          <Toggle
            id="weeklyDigest"
            label="Send a weekly digest"
            desc="A short summary of your firm's week, delivered every week."
            checked={prefs.weeklyDigest}
            onChange={(v) => set("weeklyDigest", v)}
          />
          <div className="flex items-center justify-between gap-4 py-4">
            <label
              htmlFor="digestDay"
              className="text-sm font-medium text-navy-800"
            >
              Day of the week
            </label>
            <select
              id="digestDay"
              value={prefs.digestDayOfWeek}
              onChange={(e) =>
                set("digestDayOfWeek", parseInt(e.target.value, 10))
              }
              disabled={!prefs.weeklyDigest}
              className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 disabled:bg-navy-50 disabled:text-navy-400"
            >
              {DAYS.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-navy-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save preferences"}
        </button>
      </div>
    </form>
  );
}
