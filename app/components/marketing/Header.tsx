"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2 font-serif text-2xl text-navy-500">
          <span className="text-gold-500">&diams;</span>
          Marco Reid
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`min-h-touch inline-flex items-center text-sm font-medium transition-colors hover:text-navy-600 ${
                pathname === link.href
                  ? "text-navy-800 font-semibold"
                  : scrolled
                    ? "text-navy-400"
                    : "text-navy-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className={`min-h-touch inline-flex items-center text-sm font-medium transition-colors hover:text-navy-600 ${
              scrolled ? "text-navy-400" : "text-navy-300"
            }`}
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="ml-2 inline-flex min-h-touch items-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-navy-600 hover:shadow-md"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex min-h-touch min-w-touch items-center justify-center text-navy-400 hover:text-navy-600 md:hidden"
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
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-navy-100 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block min-h-touch py-2 text-base transition-colors hover:text-navy-600 ${
                pathname === link.href ? "text-navy-800 font-semibold" : "text-navy-400"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="block min-h-touch py-2 text-base text-navy-400 transition-colors hover:text-navy-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign in
          </Link>
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
