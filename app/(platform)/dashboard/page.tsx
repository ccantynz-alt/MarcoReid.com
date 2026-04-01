"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800">
        Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}.
      </h1>
      <p className="mt-2 text-lg text-navy-400">
        Your AlecRae dashboard. This is where your practice lives.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Matters", desc: "Manage your active cases and engagements", count: "0" },
          { title: "Clients", desc: "Your client directory and CRM", count: "0" },
          { title: "The Oracle", desc: "AI-powered legal and accounting research", count: null },
          { title: "Documents", desc: "Files, drafts, and templates", count: "0" },
          { title: "Billing", desc: "Time tracking, invoices, and payments", count: "0" },
          { title: "Messages", desc: "Secure matter-centric conversations", count: "0" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-navy-700">{item.title}</h2>
              {item.count !== null && (
                <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-400">
                  {item.count}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-navy-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
