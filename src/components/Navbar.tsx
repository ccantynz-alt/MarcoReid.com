"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-white">Alec</span>
          <span className="text-gold">Rae</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-slate hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#dictation" className="text-sm text-slate hover:text-white transition-colors">
            AI Dictation
          </Link>
          <Link href="#oracle" className="text-sm text-slate hover:text-white transition-colors">
            The Oracle
          </Link>
          <Link href="#pricing" className="text-sm text-slate hover:text-white transition-colors">
            Pricing
          </Link>
          <Link
            href="#waitlist"
            className="rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-navy hover:bg-gold-light transition-colors"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-navy px-6 py-4 space-y-4">
          <Link href="#features" className="block text-sm text-slate hover:text-white" onClick={() => setMobileOpen(false)}>
            Features
          </Link>
          <Link href="#dictation" className="block text-sm text-slate hover:text-white" onClick={() => setMobileOpen(false)}>
            AI Dictation
          </Link>
          <Link href="#oracle" className="block text-sm text-slate hover:text-white" onClick={() => setMobileOpen(false)}>
            The Oracle
          </Link>
          <Link href="#pricing" className="block text-sm text-slate hover:text-white" onClick={() => setMobileOpen(false)}>
            Pricing
          </Link>
          <Link
            href="#waitlist"
            className="block rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-navy text-center hover:bg-gold-light"
            onClick={() => setMobileOpen(false)}
          >
            Join Waitlist
          </Link>
        </div>
      )}
    </nav>
  );
}
