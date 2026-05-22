"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import {
  CommandPaletteProvider,
  useCommandPalette,
} from "@/app/components/platform/CommandPalette";
import FloatingTimer from "@/app/components/platform/FloatingTimer";
import DarkModeToggle from "@/app/components/shared/DarkModeToggle";
import NotificationBadge from "@/app/components/platform/NotificationBadge";

/* ------------------------------------------------------------------ */
/*  Icons – lightweight inline SVGs                                    */
/* ------------------------------------------------------------------ */

function IconDashboard({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconMatters({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}

function IconClients({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconDeadlines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconConflicts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconDocuments({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconSignatures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

function IconMessages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconTime({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 8 14" />
    </svg>
  );
}

function IconInvoices({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}

function IconTrust({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconBankFeeds({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function IconPayroll({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

function IconTax({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="12" y2="14" />
    </svg>
  );
}

function IconMarco({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function IconVoice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function IconPredictions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function IconIntelligence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  );
}

function IconAlerts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function IconAudit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconPracticeIntel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconEfiling({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </svg>
  );
}

function IconAcademy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    </svg>
  );
}

function IconSettings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function IconMigration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M15 13l2 2-2 2" />
      <path d="M9 13l-2 2 2 2" />
    </svg>
  );
}

function IconAdmin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconSignOut({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation structure                                               */
/* ------------------------------------------------------------------ */

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
};

type NavGroup = {
  heading: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Practice",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: IconDashboard },
      { label: "Matters", href: "/matters", icon: IconMatters },
      { label: "Clients", href: "/clients", icon: IconClients },
      { label: "Deadlines", href: "/deadlines", icon: IconDeadlines },
      { label: "Conflicts", href: "/conflicts", icon: IconConflicts },
    ],
  },
  {
    heading: "Documents & Communication",
    items: [
      { label: "Documents", href: "/documents", icon: IconDocuments },
      { label: "Messages", href: "/messages", icon: IconMessages },
      { label: "E-Signatures", href: "/signatures", icon: IconSignatures },
    ],
  },
  {
    heading: "Financial",
    items: [
      { label: "Time & Billing", href: "/time", icon: IconTime },
      { label: "Invoices", href: "/billing/invoices", icon: IconInvoices },
      { label: "Trust Accounts", href: "/trust", icon: IconTrust },
      { label: "Bank Feeds", href: "/bank-feeds", icon: IconBankFeeds },
      { label: "Payroll Calculator", href: "/payroll", icon: IconPayroll },
      { label: "Tax Calculator", href: "/tax-calculator", icon: IconTax },
    ],
  },
  {
    heading: "AI & Research",
    items: [
      { label: "Ask Marco", href: "/marco", icon: IconMarco },
      { label: "Voice Dictation", href: "/voice", icon: IconVoice },
      { label: "Outcome Predictions", href: "/predictions", icon: IconPredictions },
      { label: "Proactive Intelligence", href: "/intelligence", icon: IconIntelligence },
    ],
  },
  {
    heading: "Compliance & Audit",
    items: [
      { label: "Regulatory Alerts", href: "/alerts", icon: IconAlerts },
      { label: "Audit Trail", href: "/audit", icon: IconAudit },
      { label: "Conflict Check", href: "/conflicts", icon: IconConflicts },
    ],
  },
  {
    heading: "Practice Management",
    items: [
      { label: "Practice Intelligence", href: "/practice-intelligence", icon: IconPracticeIntel },
      { label: "Court E-Filing", href: "/efiling", icon: IconEfiling },
    ],
  },
  {
    heading: "Learning",
    items: [
      { label: "Academy", href: "/academy/learn", icon: IconAcademy },
    ],
  },
  {
    heading: "Settings",
    items: [
      { label: "Settings", href: "/settings", icon: IconSettings },
      { label: "Data Migration", href: "/data-import", icon: IconMigration },
      { label: "Admin", href: "/admin", icon: IconAdmin, adminOnly: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sidebar link                                                       */
/* ------------------------------------------------------------------ */

function SidebarLink({
  item,
  active,
  onClick,
  badgeCount,
}: {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
  badgeCount?: number;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors ${
        active
          ? "bg-navy-100 font-semibold text-navy-700 dark:bg-navy-800 dark:text-white"
          : "text-navy-500 hover:bg-navy-50 hover:text-navy-700 dark:text-navy-300 dark:hover:bg-navy-800/60 dark:hover:text-navy-100"
      }`}
    >
      <Icon
        className={`h-4 w-4 flex-shrink-0 ${
          active
            ? "text-navy-600 dark:text-navy-200"
            : "text-navy-400 group-hover:text-navy-500 dark:text-navy-400 dark:group-hover:text-navy-300"
        }`}
      />
      <span className="flex-1">{item.label}</span>
      {badgeCount != null && badgeCount > 0 && (
        <NotificationBadge count={badgeCount} />
      )}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar component                                                  */
/* ------------------------------------------------------------------ */

function Sidebar({
  open,
  onClose,
  pathname,
  session,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  session: { user?: { email?: string | null; role?: string } } | null;
}) {
  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo area */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center">
          <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none">
            <path
              d="M16 2l6 10-6 10-6-10z"
              fill="url(#gold-gradient)"
              stroke="#b8922e"
              strokeWidth="1"
            />
            <path
              d="M16 6l4 6.67L16 19.33l-4-6.66z"
              fill="url(#gold-inner)"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="gold-gradient" x1="10" y1="2" x2="22" y2="22">
                <stop offset="0%" stopColor="#ebcf82" />
                <stop offset="50%" stopColor="#d4a843" />
                <stop offset="100%" stopColor="#b8922e" />
              </linearGradient>
              <linearGradient id="gold-inner" x1="12" y1="6" x2="20" y2="19">
                <stop offset="0%" stopColor="#faf2de" />
                <stop offset="100%" stopColor="#ebcf82" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-lg font-semibold leading-tight text-navy-700 dark:text-white">
            Marco Reid
          </span>
          <span className="text-[11px] text-navy-400 dark:text-navy-400">
            Legal Platform
          </span>
        </div>
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-navy-400 hover:bg-navy-100 hover:text-navy-600 dark:hover:bg-navy-800 dark:hover:text-navy-200 lg:hidden"
          aria-label="Close sidebar"
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4" aria-label="Platform navigation">
        {NAV_GROUPS.map((group) => {
          const visibleItems = group.items.filter(
            (item) => !item.adminOnly || isAdmin
          );
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.heading} className="mb-5">
              <h3 className="mb-1.5 px-3 text-[11px] font-medium uppercase tracking-wider text-navy-400 dark:text-navy-500">
                {group.heading}
              </h3>
              <div className="flex flex-col gap-0.5">
                {visibleItems.map((item) => (
                  <SidebarLink
                    key={item.href + item.label}
                    item={item}
                    active={isActive(item.href)}
                    onClick={onClose}
                    badgeCount={item.label === "Messages" ? 3 : undefined}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom: user info + sign out */}
      <div className="border-t border-navy-100 px-3 py-3 dark:border-navy-700">
        <div className="mb-2 truncate px-3 text-xs text-navy-400 dark:text-navy-400">
          {session?.user?.email}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-700 dark:text-navy-300 dark:hover:bg-navy-800/60 dark:hover:text-navy-100"
        >
          <IconSignOut className="h-4 w-4 text-navy-400" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar – always visible */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-navy-100 bg-white dark:border-navy-700 dark:bg-navy-900 lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-navy-100 bg-white shadow-2xl dark:border-navy-700 dark:bg-navy-900">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Command palette trigger                                            */
/* ------------------------------------------------------------------ */

function CommandPaletteTrigger() {
  const { open } = useCommandPalette();
  return (
    <button
      onClick={open}
      className="flex h-9 items-center gap-2 rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-400 transition-colors hover:border-navy-300 hover:text-navy-600 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-400 dark:hover:border-navy-500 dark:hover:text-navy-200"
      aria-label="Open command palette"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M14 14l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="hidden sm:inline">Search or jump to&hellip;</span>
      <kbd className="ml-1 hidden rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 font-mono text-[10px] text-navy-500 dark:border-navy-600 dark:bg-navy-700 dark:text-navy-400 sm:inline">
        &#8984;K
      </kbd>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Platform shell                                                     */
/* ------------------------------------------------------------------ */

function PlatformShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-navy-950">
        <div className="flex flex-col items-center gap-3">
          <svg viewBox="0 0 32 32" className="h-10 w-10 animate-pulse" fill="none">
            <path d="M16 2l6 10-6 10-6-10z" fill="#d4a843" />
          </svg>
          <p className="text-sm text-navy-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-navy-50 dark:bg-navy-950">
      <a
        href="#platform-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-navy-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        pathname={pathname}
        session={session}
      />

      {/* Main area offset by sidebar width on desktop */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-navy-100 bg-white/80 backdrop-blur-md dark:border-navy-700 dark:bg-navy-900/80">
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              {/* Hamburger – mobile only */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-navy-500 hover:bg-navy-100 dark:text-navy-300 dark:hover:bg-navy-800 lg:hidden"
                aria-label="Open navigation menu"
              >
                <IconMenu className="h-5 w-5" />
              </button>
              <CommandPaletteTrigger />
            </div>
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <span className="hidden text-sm text-navy-400 dark:text-navy-400 sm:block">
                {session?.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main id="platform-main" className="min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>
      </div>

      <FloatingTimer />
    </div>
  );
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommandPaletteProvider>
      <PlatformShell>{children}</PlatformShell>
    </CommandPaletteProvider>
  );
}
