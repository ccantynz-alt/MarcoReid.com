"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const cards = [
  {
    title: "Marco",
    desc: "Ask anything. Legal and accounting research with verified citations.",
    href: "/marco",
    accent: "plum",
    cta: "Ask Marco",
  },
  {
    title: "Matters",
    desc: "Manage your active cases and engagements.",
    href: "/matters",
    accent: "navy",
  },
  {
    title: "Clients",
    desc: "Your client directory and CRM.",
    href: "/clients",
    accent: "navy",
  },
  {
    title: "Voice",
    desc: "Dictate anywhere. Powered by Marco Reid Voice.",
    href: "/voice",
    accent: "forest",
  },
  {
    title: "Documents",
    desc: "Files, drafts, and templates.",
    href: "/documents",
    accent: "navy",
  },
  {
    title: "Trust",
    desc: "IOLTA trust accounts and ledger.",
    href: "/trust",
    accent: "navy",
  },
  {
    title: "Billing",
    desc: "Time tracking, invoices, and payments.",
    href: "/billing",
    accent: "navy",
  },
] as const;

const accentRing: Record<string, string> = {
  plum: "border-plum-200 hover:border-plum-400",
  forest: "border-forest-200 hover:border-forest-400",
  navy: "border-navy-100 hover:border-navy-300",
};

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800">
        Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}.
      </h1>
      <p className="mt-2 text-lg text-navy-400">
        Your Marco Reid dashboard. This is where your practice lives.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group block rounded-2xl border bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 ${accentRing[item.accent]}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-navy-700">{item.title}</h2>
              {"cta" in item && item.cta && (
                <span className="rounded-full bg-plum-50 px-2.5 py-0.5 text-xs font-medium text-plum-600">
                  {item.cta}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-navy-400">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
