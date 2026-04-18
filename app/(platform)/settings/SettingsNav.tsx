"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { label: "Profile", href: "/settings/profile" },
  { label: "Firm", href: "/settings/firm" },
  { label: "Team", href: "/settings/team" },
  { label: "Billing", href: "/settings/billing" },
  { label: "Integrations", href: "/settings/integrations" },
  { label: "Security", href: "/settings/security" },
  { label: "Notifications", href: "/settings/notifications" },
  { label: "Data & export", href: "/settings/data" },
];

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Settings sections">
      {/* Mobile: horizontal scroll tabs */}
      <ul className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
        {sections.map((s) => {
          const active = pathname === s.href;
          return (
            <li key={s.href} className="flex-shrink-0">
              <Link
                href={s.href}
                aria-current={active ? "page" : undefined}
                className={`block whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-navy-500 bg-navy-500 text-white"
                    : "border-navy-200 bg-white text-navy-500 hover:border-navy-300 hover:text-navy-700"
                }`}
              >
                {s.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop: vertical rail */}
      <ul className="hidden lg:sticky lg:top-24 lg:flex lg:flex-col lg:gap-1">
        {sections.map((s) => {
          const active = pathname === s.href;
          return (
            <li key={s.href}>
              <Link
                href={s.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-navy-50 text-navy-800"
                    : "text-navy-400 hover:bg-navy-50 hover:text-navy-700"
                }`}
              >
                {s.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
