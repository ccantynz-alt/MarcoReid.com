"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

export interface TimeEntryRow {
  id: string;
  date: string; // ISO
  description: string;
  minutes: number;
  rateInCents: number;
  billable: boolean;
  invoiced: boolean;
  matter: { id: string; title: string };
}

const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

const hoursFmt = (min: number) => (min / 60).toFixed(2);

const dateFmt = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(iso));

export default function TimeEntriesTable({
  entries,
  matters,
  onChanged,
}: {
  entries: TimeEntryRow[];
  matters: { id: string; title: string }[];
  onChanged?: () => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<TimeEntryRow> & { hours?: string }>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const allSelected = entries.length > 0 && selected.size === entries.length;
  const someSelected = selected.size > 0;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(entries.map((e) => e.id)));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startEdit = (row: TimeEntryRow) => {
    setEditingId(row.id);
    setEditDraft({
      id: row.id,
      description: row.description,
      hours: hoursFmt(row.minutes),
      rateInCents: row.rateInCents,
      date: row.date.slice(0, 10),
      billable: row.billable,
      matter: row.matter,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({});
  };

  const notify = useCallback((type: "ok" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 2500);
  }, []);

  async function saveEdit() {
    if (!editingId) return;
    const hoursNum = parseFloat(editDraft.hours || "0");
    if (!Number.isFinite(hoursNum) || hoursNum <= 0) {
      notify("error", "Hours must be > 0");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/time-entries/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: editDraft.description,
          minutes: Math.round(hoursNum * 60),
          rateInCents: editDraft.rateInCents,
          date: editDraft.date ? new Date(editDraft.date).toISOString() : undefined,
          billable: editDraft.billable,
          matterId: editDraft.matter?.id,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Update failed");
      }
      notify("ok", "Entry updated");
      setEditingId(null);
      setEditDraft({});
      onChanged?.();
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function deleteOne(id: string) {
    setBusy(true);
    try {
      const res = await fetch(`/api/time-entries/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Delete failed");
      }
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      notify("ok", "Entry deleted");
      setConfirmDelete(null);
      onChanged?.();
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function bulkPatch(data: Partial<Pick<TimeEntryRow, "billable">>) {
    if (selected.size === 0) return;
    setBusy(true);
    try {
      const ids = Array.from(selected);
      const results = await Promise.all(
        ids.map((id) =>
          fetch(`/api/time-entries/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
        )
      );
      const failed = results.filter((r) => !r.ok).length;
      if (failed > 0) notify("error", `${failed} update(s) failed`);
      else notify("ok", `Updated ${ids.length} entries`);
      setSelected(new Set());
      onChanged?.();
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function bulkDelete() {
    if (selected.size === 0) return;
    if (!window.confirm(`Delete ${selected.size} time ${selected.size === 1 ? "entry" : "entries"}?`)) return;
    setBusy(true);
    try {
      const ids = Array.from(selected);
      const results = await Promise.all(
        ids.map((id) => fetch(`/api/time-entries/${id}`, { method: "DELETE" }))
      );
      const failed = results.filter((r) => !r.ok).length;
      if (failed > 0) notify("error", `${failed} deletion(s) failed (invoiced entries cannot be deleted)`);
      else notify("ok", `Deleted ${ids.length} entries`);
      setSelected(new Set());
      onChanged?.();
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-md border border-navy-200 bg-white px-2 py-1 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100";

  // Stable matter lookup for editor dropdown
  const matterOptions = useMemo(() => matters, [matters]);

  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
      {someSelected && (
        <div className="flex flex-wrap items-center gap-2 border-b border-navy-100 bg-navy-50/60 px-4 py-3 text-sm">
          <span className="font-medium text-navy-700">{selected.size} selected</span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => bulkPatch({ billable: true })}
              disabled={busy}
              className="rounded-md border border-forest-200 bg-white px-3 py-1.5 text-xs font-semibold text-forest-700 hover:bg-forest-50 disabled:opacity-50"
            >
              Mark billable
            </button>
            <button
              type="button"
              onClick={() => bulkPatch({ billable: false })}
              disabled={busy}
              className="rounded-md border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-600 hover:bg-navy-50 disabled:opacity-50"
            >
              Mark non-billable
            </button>
            <button
              type="button"
              onClick={bulkDelete}
              disabled={busy}
              className="rounded-md border border-plum-200 bg-white px-3 py-1.5 text-xs font-semibold text-plum-700 hover:bg-plum-50 disabled:opacity-50"
            >
              Delete selected
            </button>
          </div>
        </div>
      )}

      {message && (
        <div
          className={`border-b px-4 py-2 text-sm ${
            message.type === "ok"
              ? "border-forest-100 bg-forest-50 text-forest-700"
              : "border-plum-100 bg-plum-50 text-plum-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-navy-100 bg-navy-50/50 text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all"
                  className="h-4 w-4 rounded border-navy-300 text-navy-600 focus:ring-navy-500"
                />
              </th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Matter</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-right">Hours</th>
              <th className="px-4 py-3 text-right">Rate</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3">Billable</th>
              <th className="px-4 py-3">Invoiced</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-sm text-navy-400">
                  No time entries.
                </td>
              </tr>
            ) : (
              entries.map((row) => {
                const amount = Math.round((row.minutes / 60) * row.rateInCents);
                const isEditing = editingId === row.id;
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-navy-50 last:border-0 text-sm ${
                      selected.has(row.id) ? "bg-navy-50/30" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(row.id)}
                        onChange={() => toggleOne(row.id)}
                        aria-label={`Select entry ${row.description}`}
                        className="h-4 w-4 rounded border-navy-300 text-navy-600 focus:ring-navy-500"
                      />
                    </td>

                    <td className="px-4 py-3 text-navy-500">
                      {isEditing ? (
                        <input
                          type="date"
                          className={inputCls}
                          value={editDraft.date as string}
                          onChange={(e) => setEditDraft({ ...editDraft, date: e.target.value })}
                        />
                      ) : (
                        dateFmt(row.date)
                      )}
                    </td>

                    <td className="px-4 py-3 text-navy-700">
                      {isEditing ? (
                        <select
                          className={inputCls}
                          value={editDraft.matter?.id}
                          onChange={(e) =>
                            setEditDraft({
                              ...editDraft,
                              matter: {
                                id: e.target.value,
                                title:
                                  matterOptions.find((m) => m.id === e.target.value)?.title ?? "",
                              },
                            })
                          }
                        >
                          {matterOptions.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.title}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Link
                          href={`/matters/${row.matter.id}`}
                          className="font-medium hover:text-navy-900"
                        >
                          {row.matter.title}
                        </Link>
                      )}
                    </td>

                    <td className="px-4 py-3 text-navy-700">
                      {isEditing ? (
                        <input
                          className={inputCls}
                          value={editDraft.description ?? ""}
                          onChange={(e) =>
                            setEditDraft({ ...editDraft, description: e.target.value })
                          }
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEdit(row)}
                          className="text-left hover:text-navy-900"
                          title="Click to edit"
                        >
                          {row.description}
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right text-navy-700 tabular-nums">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          className={`${inputCls} text-right`}
                          value={editDraft.hours ?? ""}
                          onChange={(e) =>
                            setEditDraft({ ...editDraft, hours: e.target.value })
                          }
                        />
                      ) : (
                        hoursFmt(row.minutes)
                      )}
                    </td>

                    <td className="px-4 py-3 text-right text-navy-500 tabular-nums">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          className={`${inputCls} text-right`}
                          value={((editDraft.rateInCents ?? 0) / 100).toFixed(2)}
                          onChange={(e) =>
                            setEditDraft({
                              ...editDraft,
                              rateInCents: Math.round(parseFloat(e.target.value || "0") * 100),
                            })
                          }
                        />
                      ) : (
                        money(row.rateInCents)
                      )}
                    </td>

                    <td className="px-4 py-3 text-right font-medium text-navy-700 tabular-nums">
                      {isEditing
                        ? money(
                            Math.round(
                              (parseFloat(editDraft.hours || "0") || 0) *
                                (editDraft.rateInCents ?? 0)
                            )
                          )
                        : money(amount)}
                    </td>

                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="checkbox"
                          checked={!!editDraft.billable}
                          onChange={(e) =>
                            setEditDraft({ ...editDraft, billable: e.target.checked })
                          }
                          className="h-4 w-4 rounded border-navy-300 text-forest-600 focus:ring-forest-500"
                        />
                      ) : row.billable ? (
                        <span className="rounded-full bg-forest-50 px-2 py-0.5 text-xs font-medium text-forest-700">
                          Billable
                        </span>
                      ) : (
                        <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-500">
                          Non
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {row.invoiced ? (
                        <span className="rounded-full bg-plum-50 px-2 py-0.5 text-xs font-medium text-plum-700">
                          Invoiced
                        </span>
                      ) : (
                        <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-400">
                          Open
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right">
                      {isEditing ? (
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={saveEdit}
                            disabled={busy}
                            className="rounded-md bg-navy-500 px-3 py-1 text-xs font-semibold text-white hover:bg-navy-600 disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            disabled={busy}
                            className="rounded-md px-3 py-1 text-xs font-semibold text-navy-500 hover:text-navy-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : confirmDelete === row.id ? (
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => deleteOne(row.id)}
                            disabled={busy}
                            className="rounded-md bg-plum-600 px-3 py-1 text-xs font-semibold text-white hover:bg-plum-700 disabled:opacity-50"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDelete(null)}
                            className="rounded-md px-3 py-1 text-xs font-semibold text-navy-500 hover:text-navy-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(row)}
                            className="rounded-md px-2 py-1 text-xs font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-700"
                          >
                            Edit
                          </button>
                          <Link
                            href={`/time/entry/${row.id}/edit`}
                            className="rounded-md px-2 py-1 text-xs font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-700"
                          >
                            Full edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => setConfirmDelete(row.id)}
                            disabled={row.invoiced}
                            title={
                              row.invoiced
                                ? "Invoiced entries cannot be deleted"
                                : "Delete entry"
                            }
                            className="rounded-md px-2 py-1 text-xs font-semibold text-plum-600 hover:bg-plum-50 disabled:cursor-not-allowed disabled:text-navy-300 disabled:hover:bg-transparent"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
