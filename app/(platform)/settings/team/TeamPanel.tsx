"use client";

import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";
import SectionHeader from "../SectionHeader";

interface Member {
  name: string;
  email: string;
  role: string;
  joined: string;
}

interface Props {
  planLabel: string;
  seatsLabel: string;
  currentMember: Member;
}

function initialsOf(name: string, email: string) {
  const source = (name || email).trim();
  const parts = source.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "") || "M")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamPanel({
  planLabel,
  seatsLabel,
  currentMember,
}: Props) {
  const toast = useToast();
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Team"
        description="Manage who has access to your firm's Marco Reid workspace."
        action={
          <button
            type="button"
            onClick={() => setInviteOpen(true)}
            className="rounded-lg bg-navy-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Invite team member
          </button>
        }
      />

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-navy-400">
              Current plan
            </p>
            <p className="mt-1 font-serif text-2xl text-navy-800">{planLabel}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-navy-400">Seats</p>
            <p className="mt-1 text-lg font-semibold text-navy-700">
              1 of {seatsLabel}
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-lg bg-plum-50 px-4 py-3 text-sm text-plum-600">
          Multi-seat collaboration is rolling out shortly. Invitations are
          queued and will activate the moment seats become available on your
          plan.
        </p>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white shadow-card">
        <div className="border-b border-navy-100 px-6 py-4 sm:px-8">
          <h3 className="font-serif text-lg text-navy-800">Members</h3>
        </div>
        <ul className="divide-y divide-navy-100">
          <li className="flex items-center gap-4 px-6 py-4 sm:px-8">
            <div
              aria-hidden="true"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-plum-50 text-sm font-semibold text-plum-600"
            >
              {initialsOf(currentMember.name, currentMember.email)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-navy-800">
                {currentMember.name}
                <span className="ml-2 text-xs font-normal text-navy-400">
                  (you)
                </span>
              </p>
              <p className="truncate text-xs text-navy-400">
                {currentMember.email}
              </p>
            </div>
            <div className="hidden sm:block">
              <span className="rounded-full bg-forest-100 px-2.5 py-0.5 text-xs font-semibold text-forest-800">
                {currentMember.role === "ADMIN" ? "Owner" : "Owner"}
              </span>
            </div>
            <button
              type="button"
              disabled
              className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-400"
              aria-label="Manage role (coming soon)"
            >
              Manage
            </button>
          </li>
          <li className="px-6 py-6 text-sm text-navy-400 sm:px-8">
            Team seats coming soon. Today, your firm runs as a solo workspace.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Roles</h3>
        <p className="mt-1 text-sm text-navy-400">
          Roles control what each member can see and do. Custom roles arrive
          with the team release.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { name: "Owner", desc: "Full access. Billing, members, settings." },
            { name: "Lawyer / CPA", desc: "Matters, clients, Marco, billing." },
            { name: "Assistant", desc: "Read-only on matters and clients." },
          ].map((r) => (
            <li
              key={r.name}
              className="rounded-xl border border-navy-100 bg-navy-50 p-4"
            >
              <p className="text-sm font-semibold text-navy-800">{r.name}</p>
              <p className="mt-1 text-xs text-navy-400">{r.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      {inviteOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="invite-title"
          className="fixed inset-0 z-40 flex items-center justify-center bg-navy-800/40 px-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
            <h3 id="invite-title" className="font-serif text-2xl text-navy-800">
              Invite team member
            </h3>
            <p className="mt-2 text-sm text-navy-400">
              Multi-seat invites are coming soon. Want early access? Email us
              from your firm domain and we will queue your seats.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setInviteOpen(false)}
                className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setInviteOpen(false);
                  toast.info("We'll let you know the moment invites open.");
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
