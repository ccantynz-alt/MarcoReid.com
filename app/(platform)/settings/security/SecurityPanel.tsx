"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";
import SectionHeader from "../SectionHeader";

export default function SecurityPanel({ email }: { email: string }) {
  const toast = useToast();
  const [twoFAOpen, setTwoFAOpen] = useState(false);
  const [notifyLogins, setNotifyLogins] = useState(true);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Security"
        description="Protect your account, your firm, and your clients' data."
      />

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg text-navy-800">Password</h3>
            <p className="mt-1 text-sm text-navy-400">
              We will email a reset link to <span className="font-medium text-navy-700">{email}</span>.
            </p>
          </div>
          <Link
            href="/forgot-password"
            className="rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
          >
            Change password
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg text-navy-800">
              Two-factor authentication
            </h3>
            <p className="mt-1 text-sm text-navy-400">
              Add a second step at sign-in using an authenticator app or
              hardware key.
            </p>
            <p className="mt-2 inline-block rounded-full bg-navy-100 px-2.5 py-0.5 text-xs font-semibold text-navy-700">
              Not enabled
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTwoFAOpen(true)}
            className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Enable 2FA
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4 sm:px-8">
          <h3 className="font-serif text-lg text-navy-800">Active sessions</h3>
          <button
            type="button"
            onClick={() =>
              toast.info("Session revocation is coming soon.")
            }
            className="text-sm font-medium text-navy-500 transition-colors hover:text-navy-700"
          >
            Revoke all other sessions
          </button>
        </div>
        <ul className="divide-y divide-navy-100">
          <li className="flex items-center justify-between px-6 py-4 sm:px-8">
            <div>
              <p className="text-sm font-medium text-navy-800">
                This device
                <span className="ml-2 rounded-full bg-forest-100 px-2 py-0.5 text-xs font-semibold text-forest-800">
                  Current
                </span>
              </p>
              <p className="mt-0.5 text-xs text-navy-400">
                Web browser • signed in just now
              </p>
            </div>
            <span className="text-xs text-navy-400">—</span>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white shadow-card">
        <div className="border-b border-navy-100 px-6 py-4 sm:px-8">
          <h3 className="font-serif text-lg text-navy-800">Login history</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-navy-100 text-sm">
            <thead className="bg-navy-50 text-left text-xs uppercase tracking-wide text-navy-400">
              <tr>
                <th className="px-6 py-3 sm:px-8">When</th>
                <th className="px-6 py-3">Device</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 text-navy-700">
              <tr>
                <td className="px-6 py-3 sm:px-8">Just now</td>
                <td className="px-6 py-3">Web</td>
                <td className="px-6 py-3">—</td>
                <td className="px-6 py-3">
                  <span className="rounded-full bg-forest-100 px-2 py-0.5 text-xs font-semibold text-forest-800">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-xs text-navy-400 sm:px-8"
                >
                  Full login history is being rolled out. Past 90 days will appear here.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg text-navy-800">Security alerts</h3>
            <p className="mt-1 text-sm text-navy-400">
              Get an email whenever we detect a sign-in from a new device or
              location.
            </p>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <span className="text-sm font-medium text-navy-700">
              Notify me about new logins
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={notifyLogins}
              onClick={() => {
                setNotifyLogins((v) => !v);
                toast.success(
                  notifyLogins
                    ? "Login alerts turned off"
                    : "Login alerts turned on"
                );
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifyLogins ? "bg-forest-500" : "bg-navy-200"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  notifyLogins ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {twoFAOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="twofa-title"
          className="fixed inset-0 z-40 flex items-center justify-center bg-navy-800/40 px-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
            <h3 id="twofa-title" className="font-serif text-2xl text-navy-800">
              Two-factor authentication
            </h3>
            <p className="mt-2 text-sm text-navy-400">
              We are rolling out 2FA across the platform shortly. Authenticator
              apps and hardware security keys will be supported.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setTwoFAOpen(false)}
                className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setTwoFAOpen(false);
                  toast.info("We'll email you the moment 2FA is live.");
                }}
                className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                Notify me
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
