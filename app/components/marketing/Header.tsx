"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Mega-menu data                                                     */
/* ------------------------------------------------------------------ */

interface NavChild {
  label: string;
  href: string;
  desc?: string;
  icon?: string;
  badge?: string;
}

interface NavSection {
  label: string;
  href?: string;
  children?: NavChild[];
  columns?: number;
  featured?: NavChild;
}

const MEGA_NAV: NavSection[] = [
  {
    label: "Products",
    columns: 3,
    featured: {
      label: "See all five products",
      href: "/#law",
      desc: "One platform. One login. Five professional-grade products.",
    },
    children: [
      {
        label: "Marco Reid Legal",
        href: "/law",
        icon: "⚖",
        desc: "Case management, billing, trust accounting, document AI, court calendaring",
      },
      {
        label: "Marco Reid Accounting",
        href: "/accounting",
        icon: "◈",
        desc: "Autonomous bookkeeping, 5-jurisdiction payroll, tax compliance, Catch-Up Centre",
      },
      {
        label: "Marco",
        href: "/oracle",
        icon: "◉",
        desc: "Cross-domain legal + tax research. Every citation verified before it reaches you",
        badge: "AI",
      },
      {
        label: "Marco Reid Voice",
        href: "/dictation",
        icon: "◎",
        desc: "Speak. It is done. Legal and accounting vocabulary. 9 languages from day one",
        badge: "AI",
      },
      {
        label: "Marco Reid Courtroom",
        href: "/courtroom",
        icon: "◆",
        desc: "AI transcription, judge analytics, evidence management, mid-hearing research",
      },
      {
        label: "Client Portal",
        href: "/portal",
        icon: "◇",
        desc: "Your clients track matters, documents, invoices and message you securely",
      },
    ],
  },
  {
    label: "Platform",
    columns: 2,
    children: [
      {
        label: "Case Management",
        href: "/law",
        desc: "Matters, tasks, deadlines, documents — the spine of every law practice",
      },
      {
        label: "Document AI & Editor",
        href: "/law",
        desc: "Full document editor with AI drafting. Replaces Word and DocuSign.",
      },
      {
        label: "Trust Accounting",
        href: "/law",
        desc: "IOLTA-compliant. Three-way reconciliation. Every state bar rule built in.",
      },
      {
        label: "Billing & Time Tracking",
        href: "/law",
        desc: "Time entries by voice or click. LEDES invoices. Stripe payment collection.",
      },
      {
        label: "Bank Feed Integration",
        href: "/accounting",
        desc: "Direct bank connections via Plaid. AI categorisation. Real-time reconciliation.",
      },
      {
        label: "Catch-Up Centre",
        href: "/catch-up-centre",
        desc: "Years behind on tax returns? Upload what you have. Fixed fee. Filed.",
        badge: "Popular",
      },
      {
        label: "Court Rules Calculator",
        href: "/tools/court-rules",
        desc: "28 NZ/AU/UK/US court rules. Every downstream deadline cited to the rule.",
      },
      {
        label: "Conflict Checker",
        href: "/tools/conflict-check",
        desc: "Automated conflict of interest detection across all matters and clients.",
      },
      {
        label: "Audit Trails",
        href: "/security",
        desc: "Immutable, cryptographically signed logs on every user action.",
      },
      {
        label: "Company Incorporation",
        href: "/launch",
        desc: "Multi-jurisdiction entity formation. LLC, Corp across all 50 US states + international.",
      },
    ],
  },
  {
    label: "For Professionals",
    columns: 2,
    children: [
      {
        label: "For Lawyers",
        href: "/for-attorneys",
        desc: "Complete practice management — from intake to invoice",
      },
      {
        label: "For Accountants",
        href: "/for-accountants",
        desc: "Bookkeeping, payroll, tax, compliance — one intelligent platform",
      },
      {
        label: "For Courts",
        href: "/courts",
        desc: "Bench tools, docket management, reporter integration, e-filing",
      },
      {
        label: "For HR Firms",
        href: "/hr",
        desc: "Recruit and manage talent for legal and accounting firms",
      },
      {
        label: "For Small Business",
        href: "/for-small-business",
        desc: "Legal and accounting intelligence for growing businesses",
      },
      {
        label: "For Startups",
        href: "/for-startups",
        desc: "Incorporation, cap table, compliance — from day one",
      },
      {
        label: "Immigration Advisers",
        href: "/immigration-advisers",
        desc: "NZ, AU, UK, US, CA immigration workflows with AI research",
      },
      {
        label: "Tax Advisors",
        href: "/tax-advisors",
        desc: "Multi-jurisdiction tax research, compliance filings, and client management",
      },
    ],
  },
  {
    label: "Resources",
    columns: 2,
    children: [
      {
        label: "Academy",
        href: "/academy",
        desc: "CPD-accredited courses for lawyers, accountants, and legal staff",
        badge: "CPD",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        desc: "How early partners reduced admin by 20 hours per attorney per week",
      },
      {
        label: "How It Works",
        href: "/how-it-works",
        desc: "A complete walkthrough of every product and workflow",
      },
      {
        label: "Generate a Document",
        href: "/generate",
        desc: "Free AI-drafted wills, contracts, and agreements — no account required",
        badge: "Free",
      },
      {
        label: "Find a Lawyer",
        href: "/find-a-lawyer",
        desc: "Verified attorneys by specialty and jurisdiction. Engage directly.",
      },
      {
        label: "Find an Accountant",
        href: "/find-an-accountant",
        desc: "Verified CPAs and chartered accountants across NZ, AU, UK, US",
      },
      {
        label: "Security & Trust",
        href: "/security",
        desc: "FIPS 140-3 encryption, SOC 2 in progress, GDPR, NZ Privacy Act",
      },
      {
        label: "Changelog",
        href: "/changelog",
        desc: "Every release, every feature, every fix — publicly logged",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function panelWidth(cols: number): string {
  if (cols >= 3) return "w-[780px]";
  if (cols >= 2) return "w-[600px]";
  return "w-[340px]";
}

function gridCols(cols: number): string {
  if (cols >= 3) return "grid-cols-3";
  if (cols >= 2) return "grid-cols-2";
  return "grid-cols-1";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openMobileSections, setOpenMobileSections] = useState<Set<string>>(new Set());
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const pathname = usePathname();

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenDesktop(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDesktop(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDesktop(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDesktop(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setOpenDesktop(null), 180);
  }, []);

  const toggleMobileSection = (label: string) => {
    setOpenMobileSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const linkColor = (active: boolean) =>
    active
      ? "text-navy-800 font-semibold"
      : scrolled
        ? "text-navy-500 hover:text-navy-700"
        : "text-navy-400 hover:text-navy-700";

  /* ---------------------------------------------------------------- */
  /*  Render helpers                                                   */
  /* ---------------------------------------------------------------- */

  const ChevronDown = ({ className = "" }: { className?: string }) => (
    <svg
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );

  const renderDesktopPanel = (section: NavSection) => {
    if (!section.children) return null;
    const isOpen = openDesktop === section.label;
    const cols = section.columns ?? 1;

    return (
      <div
        className={`absolute left-1/2 top-full z-50 pt-3 -translate-x-1/2 transition-all duration-200 ease-out ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1.5 opacity-0"
        }`}
      >
        {/* Arrow nub */}
        <div className="absolute left-1/2 top-1.5 h-3 w-3 -translate-x-1/2 rotate-45 rounded-tl border-l border-t border-navy-100 bg-white" />

        <div className={`relative overflow-hidden rounded-2xl border border-navy-100/80 bg-white shadow-xl ${panelWidth(cols)}`}>
          {/* Gold accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

          <div className="p-5">
            <div className={`grid gap-x-4 gap-y-0.5 ${gridCols(cols)}`}>
              {section.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-navy-50"
                >
                  {child.icon && (
                    <span className="mt-0.5 shrink-0 text-base text-navy-300 group-hover:text-navy-500">
                      {child.icon}
                    </span>
                  )}
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-navy-700 group-hover:text-navy-900">
                        {child.label}
                      </span>
                      {child.badge && (
                        <span className="inline-flex items-center rounded-full bg-gold-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                          {child.badge}
                        </span>
                      )}
                    </span>
                    {child.desc && (
                      <span className="mt-0.5 block text-xs leading-relaxed text-navy-400 group-hover:text-navy-500">
                        {child.desc}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>

            {/* Featured link at bottom */}
            {section.featured && (
              <div className="mt-3 border-t border-navy-100 pt-3">
                <Link
                  href={section.featured.href}
                  className="group flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3 transition-colors hover:bg-navy-100"
                >
                  <span>
                    <span className="block text-sm font-semibold text-navy-700 group-hover:text-navy-900">
                      {section.featured.label}
                    </span>
                    {section.featured.desc && (
                      <span className="block text-xs text-navy-400">{section.featured.desc}</span>
                    )}
                  </span>
                  <svg className="h-4 w-4 shrink-0 text-navy-400 group-hover:text-navy-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMobileSection = (section: NavSection) => {
    if (section.href && !section.children) {
      return (
        <Link
          key={section.label}
          href={section.href}
          className={`block min-h-touch py-3 text-base font-medium transition-colors hover:text-navy-700 ${
            pathname === section.href ? "text-navy-800 font-semibold" : "text-navy-500"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {section.label}
        </Link>
      );
    }

    const isOpen = openMobileSections.has(section.label);

    return (
      <div key={section.label} className="border-b border-navy-100/60 last:border-b-0">
        <button
          type="button"
          className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium text-navy-500 transition-colors hover:text-navy-700"
          onClick={() => toggleMobileSection(section.label)}
          aria-expanded={isOpen}
        >
          {section.label}
          <ChevronDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4 pl-3">
            {section.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={`block rounded-xl py-2.5 pl-2 pr-3 text-sm transition-colors hover:bg-navy-50 ${
                  pathname === child.href ? "font-semibold text-navy-800" : "text-navy-500"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  {child.icon && <span className="text-navy-300">{child.icon}</span>}
                  <span className="font-medium">{child.label}</span>
                  {child.badge && (
                    <span className="inline-flex items-center rounded-full bg-gold-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                      {child.badge}
                    </span>
                  )}
                </span>
                {child.desc && (
                  <span className="mt-0.5 block pl-5 text-xs leading-relaxed text-navy-400">
                    {child.desc}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Main render                                                      */
  /* ---------------------------------------------------------------- */

  return (
    <div className="fixed top-0 z-50 w-full">
      {/* ---- Announcement bar ---- */}
      {announcementVisible && (
        <div className="relative bg-navy-900 px-4 py-2 text-center text-xs text-white/90">
          <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-forest-400" aria-hidden="true" />
              <span>Now soft-launching in New Zealand &amp; Australia</span>
            </span>
            <span className="text-white/40" aria-hidden="true">&middot;</span>
            <Link href="/contact" className="font-semibold text-gold-300 underline underline-offset-2 hover:text-gold-200 transition-colors">
              Join the founding cohort &rarr;
            </Link>
            <span className="text-white/40" aria-hidden="true">&middot;</span>
            <span className="text-white/60">US &amp; UK rolling out 2026/2027</span>
          </span>
          <button
            type="button"
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/50 hover:text-white/90 transition-colors"
            aria-label="Dismiss announcement"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <header
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-navy-100/60 bg-white/90 shadow-sm backdrop-blur-xl"
            : "border-b border-navy-100/40 bg-white/95 backdrop-blur-md"
        }`}
      >
        {/* Gold prestige accent line */}
        <div className="gold-divider" />

        <nav
          ref={navRef}
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10"
        >
          {/* ---- Logo ---- */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 font-serif text-xl text-navy-600 hover:text-navy-800 transition-colors"
          >
            <span className="text-gold-500 text-2xl" aria-hidden="true">&diams;</span>
            <span>Marco Reid</span>
          </Link>

          {/* ---- Desktop mega-menu ---- */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {MEGA_NAV.map((section) => {
              if (section.href && !section.children) {
                return (
                  <Link
                    key={section.label}
                    href={section.href}
                    className={`inline-flex min-h-touch items-center px-3.5 py-2 text-sm font-medium transition-colors ${linkColor(pathname === section.href)}`}
                  >
                    {section.label}
                  </Link>
                );
              }

              const isOpen = openDesktop === section.label;
              const isActive = section.children?.some((c) => pathname === c.href);

              return (
                <div
                  key={section.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(section.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className={`inline-flex min-h-touch items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors ${linkColor(!!isActive)}`}
                    onClick={() => setOpenDesktop(isOpen ? null : section.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {section.label}
                    <ChevronDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {renderDesktopPanel(section)}
                </div>
              );
            })}

            {/* Separator */}
            <div className="mx-2 h-5 w-px bg-navy-100/70" aria-hidden="true" />

            {/* Sign in */}
            <Link
              href="/login"
              className={`inline-flex min-h-touch items-center px-3.5 py-2 text-sm font-medium transition-colors ${linkColor(pathname === "/login")}`}
            >
              Sign in
            </Link>

            {/* Primary CTA */}
            <Link
              href="/trial"
              className="ml-2 inline-flex min-h-touch items-center gap-1.5 rounded-lg bg-navy-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-navy-700 hover:shadow-md"
            >
              Start free trial
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* ---- Mobile: CTA + toggle ---- */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/trial"
              className="inline-flex min-h-touch items-center rounded-lg bg-navy-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-navy-700 transition-colors"
            >
              Free trial
            </Link>
            <button
              type="button"
              className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* ---- Mobile menu ---- */}
        <div
          className={`overflow-hidden border-t border-navy-100 bg-white/98 backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden ${
            mobileMenuOpen
              ? "max-h-[calc(100vh-6rem)] overflow-y-auto opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }`}
        >
          <div className="px-5 pb-8 pt-4">
            {MEGA_NAV.map((section) => renderMobileSection(section))}

            {/* Mobile bottom CTA block */}
            <div className="mt-6 space-y-3 border-t border-navy-100 pt-5">
              <Link
                href="/login"
                className="block rounded-xl border border-navy-200 py-3 text-center text-sm font-medium text-navy-600 hover:bg-navy-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/trial"
                className="block rounded-xl bg-navy-600 py-3 text-center text-sm font-semibold text-white hover:bg-navy-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start free trial &rarr;
              </Link>
            </div>

            {/* Mobile trust footnote */}
            <p className="mt-4 text-center text-xs text-navy-400">
              Soft-launching NZ &amp; AU &middot; US &amp; UK rolling out 2026/2027
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
