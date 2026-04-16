"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/shared/Toast";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  companyName: string | null;
  notes: string | null;
}

export default function ClientEditForm({ client }: { client: Client }) {
  const router = useRouter();
  const toast = useToast();

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone ?? "");
  const [companyName, setCompanyName] = useState(client.companyName ?? "");
  const [address, setAddress] = useState(client.address ?? "");
  const [notes, setNotes] = useState(client.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          companyName: companyName.trim() || null,
          address: address.trim() || null,
          notes: notes.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not save changes.");
      }
      toast.success("Client updated", name);
      router.push(`/clients/${client.id}`);
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
      const res = await fetch(`/api/clients/${client.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Could not delete client.");
      }
      toast.success("Client deleted", `${name} has been removed.`);
      router.push("/clients");
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
        <label htmlFor="name" className="block text-sm font-medium text-navy-600">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy-600">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-navy-600">
          Company
        </label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-navy-600">
          Address
        </label>
        <textarea
          id="address"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          placeholder="Street, city, region, postcode, country"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-navy-600">
          Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          placeholder="Key contacts, preferences, context..."
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
            href={`/clients/${client.id}`}
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
            Delete client
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
            <span className="text-xs text-red-700">
              Cannot undo. Matters will be orphaned.
            </span>
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
