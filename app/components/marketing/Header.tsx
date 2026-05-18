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
  children?: NavChild[];
}

interface NavSection {
  label: string;
  href?: string; // direct link (no dropdown) when present
  children?: NavChild[];
  columns?: number; // hint for desktop grid
}

const MEGA_NAV: NavSection[] = [
  {
    label: "Products",
    columns: 3,
    children: [
      {
        label: "Marco Reid Legal",
        href: "/law",
        desc: "Full-stack legal practice management",
      },
      {
        label: "Marco Reid Accounting",
        href: "/accounting",
        desc: "Accounting and bookkeeping for professionals",
      },
      {
        label: "Catch-Up Centre",
        href: "/catch-up-centre",
        desc: "Get years of overdue books up to date",
      },
      {
        label: "Marco (AI Research)",
        href: "/marco",
        desc: "AI-powered legal and financial research",
      },
      {
        label: "Marco Reid Voice",
        href: "/dictation",
        desc: "Dictation and voice commands for professionals",
      },
      {
        label: "Marco Reid Courtroom",
        href: "/courtroom",
        desc: "Real-time courtroom transcription and AI assistance",
      },
      {
        label: "Court Technology",
        href: "/courts",
        desc: "Digital infrastructure for courts and tribunals",
      },
    ],
  },
  {
    label: "Solutions",
    columns: 1,
    children: [
      {
        label: "For Lawyers",
        href: "/law",
        desc: "Practice management built for legal teams",
      },
      {
        label: "For Accountants",
        href: "/accounting",
        desc: "Ledgers, trust accounts, and compliance",
      },
      {
        label: "For Small Business",
        href: "/for-small-business",
        desc: "Affordable tools that scale with you",
      },
      {
        label: "For Startups",
        href: "/for-startups",
        desc: "Move fast with built-in compliance",
      },
      {
        label: "Immigration",
        href: "/immigration",
        desc: "Multi-jurisdiction immigration case management",
        children: [
          { label: "New Zealand", href: "/immigration/nz" },
          { label: "Australia", href: "/immigration/au" },
          { label: "United Kingdom", href: "/immigration/uk" },
          { label: "Canada", href: "/immigration/ca" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    columns: 2,
    children: [
      {
        label: "Help Centre",
        href: "/help",
        desc: "Guides, tutorials, and documentation",
      },
      {
        label: "Getting Started",
        href: "/help/getting-started",
        desc: "Set up your account in minutes",
      },
      {
        label: "FAQ",
        href: "/help/faq",
        desc: "Answers to common questions",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        desc: "How leading firms use Marco Reid",
      },
      {
        label: "Changelog",
        href: "/changelog",
        desc: "Latest product updates and releases",
      },
      {
        label: "System Status",
        href: "/status",
        desc: "Real-time uptime and incident reports",
      },
      {
        label: "Compare Clio",
        href: "/compare/clio",
        desc: "Marco Reid vs Clio side-by-side",
      },
      {
        label: "Compare Westlaw",
        href: "/compare/westlaw",
        desc: "Marco Reid vs Westlaw side-by-side",
      },
      {
        label: "Compare QuickBooks",
        href: "/compare/quickbooks",
        desc: "Marco Reid vs QuickBooks side-by-side",
      },
    ],
  },
  {
    label: "Trust & Compliance",
    columns: 1,
    children: [
      {
        label: "Security",
        href: "/security",
        desc: "Enterprise-grade encryption and access controls",
      },
      {
        label: "Trust Centre",
        href: "/trust-center",
        desc: "Certifications, audits, and policies",
      },
      {
        label: "Compliance",
        href: "/compliance",
        desc: "Regulatory compliance across jurisdictions",
      },
      {
        label: "Jurisdictions",
        href: "/jurisdictions",
        desc: "Rules and regulations by region",
      },
      {
        label: "Legal Notices",
        href: "/legal-notices",
        desc: "Terms, privacy, and disclosures",
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

/** Width class for each dropdown based on column count */
function panelWidth(cols: number): string {
  if (cols >= 3) return "w-[720px]";
  if (cols >= 2) return "w-[540px]";
  return "w-[320px]";
}

/** Grid class for each dropdown based on column count */
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
  const [openMobileSections, setOpenMobileSections] = useState<Set<string>>(
    new Set(),
  );
  const [openMobileSubSections, setOpenMobileSubSections] = useState<
    Set<string>
  >(new Set());
  const pathname = usePathname();

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* ---- scroll detection ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- close desktop dropdown on route change ---- */
  useEffect(() => {
    setOpenDesktop(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  /* ---- close desktop dropdown on Escape ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDesktop(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---- close desktop dropdown when clicking outside ---- */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDesktop(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* ---- hover helpers (desktop) ---- */
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

  /* ---- mobile accordion toggle ---- */
  const toggleMobileSection = (label: string) => {
    setOpenMobileSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const toggleMobileSubSection = (label: string) => {
    setOpenMobileSubSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  /* ---- text colour helper ---- */
  const linkColor = (active: boolean) =>
    active
      ? "text-navy-800 font-semibold"
      : scrolled
        ? "text-navy-400"
        : "text-navy-300";

  /* ---------------------------------------------------------------- */
  /*  Render helpers                                                   */
  /* ---------------------------------------------------------------- */

  /** Chevron-down icon (small) */
  const ChevronDown = ({ className = "" }: { className?: string }) => (
    <svg
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );

  /** Desktop dropdown panel for a given section */
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
        {/* Subtle arrow nub at top centre */}
        <div className="absolute left-1/2 top-1.5 h-3 w-3 -translate-x-1/2 rotate-45 rounded-tl border-l border-t border-navy-100 bg-white" />

        <div
          className={`relative overflow-hidden rounded-xl border border-navy-100 bg-white shadow-lg ${panelWidth(cols)}`}
        >
          {/* Faint gold accent line at top of panel */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-300/50 to-transparent" />

          <div className={`grid gap-x-4 gap-y-0.5 p-5 ${gridCols(cols)}`}>
            {section.children.map((child) => (
              <div key={child.href}>
                <Link
                  href={child.href}
                  className="group block rounded-lg px-3 py-2 transition-colors hover:bg-navy-50"
                >
                  <span className="text-sm font-medium text-navy-700 group-hover:text-navy-900">
                    {child.label}
                  </span>
                  {child.desc && (
                    <span className="mt-0.5 block text-xs leading-relaxed text-navy-400 group-hover:text-navy-500">
                      {child.desc}
                    </span>
                  )}
                </Link>

                {/* Nested children (e.g. Immigration sub-items) */}
                {child.children && child.children.length > 0 && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-navy-100 pl-3 pb-1">
                    {child.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="group block rounded-lg px-3 py-1.5 transition-colors hover:bg-navy-50"
                      >
                        <span className="text-xs font-medium text-navy-500 group-hover:text-navy-700">
                          {sub.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /** Mobile section renderer */
  const renderMobileSection = (section: NavSection) => {
    if (section.href && !section.children) {
      /* Direct link -- no accordion */
      return (
        <Link
          key={section.label}
          href={section.href}
          className={`block min-h-touch py-3 text-base font-medium transition-colors hover:text-navy-600 ${
            pathname === section.href
              ? "text-navy-800 font-semibold"
              : "text-navy-500"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {section.label}
        </Link>
      );
    }

    const isOpen = openMobileSections.has(section.label);

    return (
      <div
        key={section.label}
        className="border-b border-navy-100/60 last:border-b-0"
      >
        <button
          type="button"
          className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-navy-500 transition-colors hover:text-navy-700"
          onClick={() => toggleMobileSection(section.label)}
          aria-expanded={isOpen}
        >
          {section.label}
          <ChevronDown
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-3 pl-3">
            {section.children?.map((child) => {
              const hasSubChildren =
                child.children && child.children.length > 0;
              const subOpen = openMobileSubSections.has(child.label);

              return (
                <div key={child.href}>
                  <div className="flex items-center">
                    <Link
                      href={child.href}
                      className={`block flex-1 rounded-lg py-2 pl-2 text-sm transition-colors hover:bg-navy-50 ${
                        pathname === child.href
                          ? "font-semibold text-navy-800"
                          : "text-navy-500"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.label}
                      {child.desc && (
                        <span className="mt-0.5 block text-xs text-navy-400">
                          {child.desc}
                        </span>
                      )}
                    </Link>
                    {hasSubChildren && (
                      <button
                        type="button"
                        className="ml-1 rounded-md p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-600"
                        onClick={() => toggleMobileSubSection(child.label)}
                        aria-expanded={subOpen}
                        aria-label={`Expand ${child.label}`}
                      >
                        <ChevronDown
                          className={`transition-transform duration-200 ${subOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSubChildren && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        subOpen
                          ? "max-h-[400px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-4 border-l border-navy-100 pb-1 pl-3">
                        {child.children!.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block rounded-lg py-1.5 pl-2 text-sm transition-colors hover:bg-navy-50 ${
                              pathname === sub.href
                                ? "font-semibold text-navy-800"
                                : "text-navy-400"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Main render                                                      */
  /* ---------------------------------------------------------------- */

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-navy-100/60 bg-white/80 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Gold prestige accent line at very top */}
      <div className="gold-divider" />

      <nav
        ref={navRef}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-12"
      >
        {/* ---- Logo ---- */}
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-2xl text-navy-500"
        >
          <span className="text-gold-500">&diams;</span>
          Marco Reid
        </Link>

        {/* ---- Desktop mega-menu ---- */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {MEGA_NAV.map((section) => {
            /* Direct link (e.g. Pricing) -- no dropdown */
            if (section.href && !section.children) {
              return (
                <Link
                  key={section.label}
                  href={section.href}
                  className={`inline-flex min-h-touch items-center px-3 py-2 text-sm font-medium transition-colors hover:text-navy-600 ${linkColor(pathname === section.href)}`}
                >
                  {section.label}
                </Link>
              );
            }

            /* Dropdown section */
            const isOpen = openDesktop === section.label;
            const isActive = section.children?.some(
              (c) =>
                pathname === c.href ||
                c.children?.some((s) => pathname === s.href),
            );

            return (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(section.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`inline-flex min-h-touch items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-navy-600 ${linkColor(!!isActive)}`}
                  onClick={() =>
                    setOpenDesktop(isOpen ? null : section.label)
                  }
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {section.label}
                  <ChevronDown
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {renderDesktopPanel(section)}
              </div>
            );
          })}

          {/* Separator */}
          <div className="mx-2 h-5 w-px bg-navy-100/70" />

          {/* Sign in */}
          <Link
            href="/login"
            className={`inline-flex min-h-touch items-center px-3 py-2 text-sm font-medium transition-colors hover:text-navy-600 ${linkColor(pathname === "/login")}`}
          >
            Sign in
          </Link>

          {/* Book a Demo */}
          <Link
            href="/contact"
            className="ml-1.5 inline-flex min-h-touch items-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-navy-600 hover:shadow-md"
          >
            Book a Demo
          </Link>
        </div>

        {/* ---- Mobile toggle ---- */}
        <button
          type="button"
          className="inline-flex min-h-touch min-w-touch items-center justify-center text-navy-400 hover:text-navy-600 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* ---- Mobile menu ---- */}
      <div
        className={`overflow-hidden border-t border-navy-100 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen
            ? "max-h-[calc(100vh-4rem)] overflow-y-auto opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-4">
          {MEGA_NAV.map((section) => renderMobileSection(section))}

          {/* Sign in */}
          <Link
            href="/login"
            className="mt-2 block min-h-touch py-3 text-base text-navy-500 transition-colors hover:text-navy-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign in
          </Link>

          {/* Book a Demo */}
          <Link
            href="/contact"
            className="mt-4 block rounded-lg bg-navy-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
