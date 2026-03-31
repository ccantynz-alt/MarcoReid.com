"use client";

import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Sparkles from "@/app/components/effects/Sparkles";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Multi-layered background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary accent glow */}
        <div className="absolute left-1/2 top-1/3 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[150px] animate-glow-pulse" />
        {/* Secondary blue glow */}
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
        {/* Gold accent */}
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[400px] rounded-full bg-amber-500/5 blur-[100px] animate-glow-pulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* Sparkle particles */}
      <Sparkles />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative z-10 text-center">
        {/* Eyebrow badge */}
        <div className="animate-fade-in-up opacity-0">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/5 px-5 py-2 text-xs font-semibold text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            Introducing AlecRae &mdash; Coming 2026
          </span>
        </div>

        {/* Main headline */}
        <h1 className="mt-10 text-display-2xl font-serif animate-fade-in-up-delay opacity-0">
          <span className="text-gradient-gold">
            The most advanced
          </span>
          <br />
          <span className="text-text-primary">
            professional platform
          </span>
          <br />
          <span className="text-gradient">
            ever built.
          </span>
        </h1>

        {/* Sub copy */}
        <p className="mx-auto mt-10 max-w-2xl text-xl leading-relaxed text-text-secondary animate-fade-in-up-delay-2 opacity-0">
          Four revolutionary products under one roof. AI-powered law.
          AI-powered accounting. The most intelligent research engine
          on the planet. And a voice interface that understands your profession.
        </p>

        {/* CTAs */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up-delay-3 opacity-0">
          <Button href="#products" size="lg">
            See what we built
          </Button>
          <Button href="/pricing" variant="secondary" size="lg">
            View pricing
          </Button>
        </div>

        {/* Product count */}
        <div className="mt-20 flex items-center justify-center gap-8 animate-fade-in-up-delay-3 opacity-0">
          {[
            { label: "Law", color: "text-accent" },
            { label: "Accounting", color: "text-blue-400" },
            { label: "Oracle", color: "text-purple-400" },
            { label: "Voice", color: "text-amber-400" },
          ].map((p, i) => (
            <div key={p.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-surface-border">&middot;</span>}
              <span className={`text-sm font-semibold ${p.color}`}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-text-tertiary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
