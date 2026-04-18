"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/shared/Toast";

interface Matter {
  id: string;
  title: string;
  matterNumber: string | null;
  practiceArea: string | null;
  status: string;
  description: string | null;
  clientId: string;
  closedAt: string | null;
}

interface Client {
  id: string;
  name: string;
}

const practiceAreas = [
  "Litigation",
  "Corporate",
  "Tax",
  "Immigration",
  "Intellectual property",
  "Real estate",
  "Family",
  "Estates & trusts",
  "Criminal defence",
  "Employment",
  "Accounting",
  "Other",
];

export default function MatterEditForm({
  matter,
  clients,
}: {
  matter: Matter;
  clients: Client[];
}) {
  const router = useRouter();
  const toast = useToast();

  const [title, setTitle] = useState(matter.title);
  const [matterNumber, setMatterNumber] = useState(matter.matterNumber ?? "");
  const [practiceArea, setPracticeArea] = useState(matter.practiceArea ?? "");
  const [status, setStatus] = useState(matter.status);
  const [description, setDescription] = useState(matter.description ?? "");
  const [clientId, setClientId] = useState(matter.clientId);
  const [closedAt, setClosedAt] = useState(matter.closedAt ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/matters/${matter.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          matterNumber: matterNumber.trim() || null,
          practiceArea: practiceArea || null,
          status,
          description: description.trim() || null,
          closedAt: closedAt || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not save changes.");
      }
      toast.success("Matter updated", title);
      router.push(`/matters/${matter.id}`);
      router.refresh();
    } catch (err) {
      toast.error(
        "Could not save",
        err instanceof Error ? err.message : "Try again in a moment.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/matters/${matter.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Could not delete matter.");
      }
      toast.success("Matter deleted", `${title} has been removed.`);
      router.push("/matters");
      router.refresh();
    } catch (err) {
      toast.error(
        "Could not delete",
        err instanceof Error ? err.message : "Try again in a moment.",
      );
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-navy-600">
          Title
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="matterNumber" className="block text-sm font-medium text-navy-600">
            Matter number
          </label>
          <input
            id="matterNumber"
            type="text"
            value={matterNumber}
            onChange={(e) => setMatterNumber(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
            placeholder="e.g. 2026-041"
          />
        </div>
        <div>
          <label htmlFor="practiceArea" className="block text-sm font-medium text-navy-600">
            Practice area
          </label>
          <select
            id="practiceArea"
            value={practiceArea}
            onChange={(e) => setPracticeArea(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="">—</option>
            {practiceAreas.map((pa) => (
              <option key={pa} value={pa}>
                {pa}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="clientId" className="block text-sm font-medium text-navy-600">
            Client
          </label>
          <select
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-navy-600">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="ACTIVE">Active</option>
            <option value="ON_HOLD">On hold</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {status === "CLOSED" && (
        <div>
          <label htmlFor="closedAt" className="block text-sm font-medium text-navy-600">
            Closed date
          </label>
          <input
            id="closedAt"
            type="date"
            value={closedAt}
            onChange={(e) => setClosedAt(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
        </div>
      )}

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-navy-600">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          placeholder="Matter background, scope, key facts..."
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-navy-100 pt-6">
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-touch items-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <a
            href={`/matters/${matter.id}`}
            className="inline-flex min-h-touch items-center rounded-lg border border-navy-200 bg-white px-5 py-2.5 text-sm font-medium text-navy-700 hover:border-navy-400"
          >
            Cancel
          </a>
        </div>

        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Delete matter
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
            <span className="text-xs text-red-700">Are you sure?</span>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="text-xs font-medium text-navy-500 hover:text-navy-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Yes, delete"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
