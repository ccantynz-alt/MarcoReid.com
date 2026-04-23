"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const JURISDICTIONS = [
  { value: "AU_AUSTRAC", label: "Australia — AUSTRAC (Tranche 2)" },
  { value: "NZ_DIA", label: "New Zealand — DIA" },
  { value: "UK_HMRC", label: "United Kingdom — HMRC (MLR 2017)" },
  { value: "US_FINCEN", label: "United States — FinCEN" },
];

export default function NewSubjectPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    jurisdiction: "AU_AUSTRAC",
    subjectType: "INDIVIDUAL",
    legalName: "",
    preferredName: "",
    dateOfBirth: "",
    countryOfResidence: "",
    countryOfCitizenship: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    entityType: "",
    entityRegistrationNumber: "",
    entityJurisdiction: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/aml/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          dateOfBirth: form.dateOfBirth || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to start CDD");
      router.push(`/aml/subjects/${data.subject.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setSubmitting(false);
    }
  }

  const input =
    "w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100";
  const label = "block text-sm font-medium text-navy-600 mb-1.5";
  const isEntity = form.subjectType === "ENTITY";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800">
        Start CDD
      </h1>
      <p className="mt-2 text-sm text-navy-400">
        Capture the subject. Run identity, screening, and SOF checks on the
        next screen.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-navy-100 bg-white p-8 shadow-card"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Jurisdiction *</label>
            <select
              className={input}
              value={form.jurisdiction}
              onChange={(e) =>
                setForm({ ...form, jurisdiction: e.target.value })
              }
            >
              {JURISDICTIONS.map((j) => (
                <option key={j.value} value={j.value}>
                  {j.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Subject type *</label>
            <select
              className={input}
              value={form.subjectType}
              onChange={(e) =>
                setForm({ ...form, subjectType: e.target.value })
              }
            >
              <option value="INDIVIDUAL">Individual</option>
              <option value="ENTITY">Entity</option>
            </select>
          </div>
        </div>

        <div>
          <label className={label}>Legal name *</label>
          <input
            required
            className={input}
            value={form.legalName}
            onChange={(e) => setForm({ ...form, legalName: e.target.value })}
          />
        </div>

        {!isEntity && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Preferred name</label>
                <input
                  className={input}
                  value={form.preferredName}
                  onChange={(e) =>
                    setForm({ ...form, preferredName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={label}>Date of birth</label>
                <input
                  type="date"
                  className={input}
                  value={form.dateOfBirth}
                  onChange={(e) =>
                    setForm({ ...form, dateOfBirth: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>
                  Country of residence (ISO-2)
                </label>
                <input
                  className={input}
                  placeholder="AU"
                  value={form.countryOfResidence}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      countryOfResidence: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
              <div>
                <label className={label}>
                  Country of citizenship (ISO-2)
                </label>
                <input
                  className={input}
                  placeholder="AU"
                  value={form.countryOfCitizenship}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      countryOfCitizenship: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
            </div>
          </>
        )}

        {isEntity && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={label}>Entity type</label>
              <select
                className={input}
                value={form.entityType}
                onChange={(e) =>
                  setForm({ ...form, entityType: e.target.value })
                }
              >
                <option value="">Select…</option>
                <option value="COMPANY">Company</option>
                <option value="TRUST">Trust</option>
                <option value="PARTNERSHIP">Partnership</option>
                <option value="ASSOCIATION">Association</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className={label}>Registration number</label>
              <input
                className={input}
                value={form.entityRegistrationNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    entityRegistrationNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={label}>
                Entity jurisdiction (ISO-2)
              </label>
              <input
                className={input}
                placeholder="AU"
                value={form.entityJurisdiction}
                onChange={(e) =>
                  setForm({
                    ...form,
                    entityJurisdiction: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>
        )}

        <fieldset className="rounded-xl border border-navy-100 p-5">
          <legend className="px-2 text-sm font-medium text-navy-600">
            Address
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label}>Line 1</label>
              <input
                className={input}
                value={form.addressLine1}
                onChange={(e) =>
                  setForm({ ...form, addressLine1: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Line 2</label>
              <input
                className={input}
                value={form.addressLine2}
                onChange={(e) =>
                  setForm({ ...form, addressLine2: e.target.value })
                }
              />
            </div>
            <div>
              <label className={label}>City</label>
              <input
                className={input}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div>
              <label className={label}>Region / State</label>
              <input
                className={input}
                value={form.region}
                onChange={(e) =>
                  setForm({ ...form, region: e.target.value })
                }
              />
            </div>
            <div>
              <label className={label}>Postal code</label>
              <input
                className={input}
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
              />
            </div>
            <div>
              <label className={label}>Country (ISO-2)</label>
              <input
                className={input}
                value={form.country}
                onChange={(e) =>
                  setForm({ ...form, country: e.target.value.toUpperCase() })
                }
              />
            </div>
          </div>
        </fieldset>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-plum-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-plum-600 disabled:opacity-60"
          >
            {submitting ? "Starting…" : "Start CDD"}
          </button>
        </div>
      </form>
    </div>
  );
}
