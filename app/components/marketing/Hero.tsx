"use client";

import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Sparkles from "@/app/components/effects/Sparkles";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Multi-layered background — more intense */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[180px] animate-glow-pulse" />
        <div className="absolute bottom-1/3 right-1/3 h-[500px] w-[600px] rounded-full bg-blue-500/8 blur-[140px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute left-1/3 top-1/4 h-[400px] w-[500px] rounded-full bg-amber-500/8 blur-[120px] animate-glow-pulse" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-1/4 left-1/2 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/6 blur-[100px] animate-glow-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <Sparkles />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative z-10 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up opacity-0">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            Introducing AlecRae
          </span>
        </div>

        {/* MASSIVE headline — this is the moment */}
        <h1 className="mt-12 animate-fade-in-up-delay opacity-0">
          <span className="block text-display-2xl font-serif text-gradient-gold leading-[0.9]">
            The most powerful
          </span>
          <span className="mt-2 block text-display-2xl font-serif text-text-primary leading-[0.9]">
            professional platform
          </span>
          <span className="mt-2 block text-display-2xl font-serif text-gradient leading-[0.9]">
            on the planet.
          </span>
        </h1>

        {/* Sub — short, punchy, not a paragraph */}
        <p className="mx-auto mt-10 max-w-lg text-xl text-text-secondary animate-fade-in-up-delay-2 opacity-0">
          AI-powered law. AI-powered accounting.
          <br />
          The most intelligent research engine ever built.
          <br />
          And a voice that understands your profession.
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

        {/* Four product indicators */}
        <div className="mt-24 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in-up-delay-3 opacity-0">
          {[
            { name: "AlecRae Law", color: "from-emerald-400 to-emerald-600", desc: "Practice management" },
            { name: "The Oracle", color: "from-purple-400 to-purple-600", desc: "AI research" },
            { name: "AlecRae Voice", color: "from-amber-400 to-amber-600", desc: "Voice intelligence" },
            { name: "Accounting", color: "from-blue-400 to-blue-600", desc: "AI accounting" },
          ].map((p) => (
            <div key={p.name} className="rounded-xl border border-surface-border/50 bg-surface-raised/50 px-4 py-3 backdrop-blur-sm">
              <div className={`mx-auto h-1 w-8 rounded-full bg-gradient-to-r ${p.color}`} />
              <p className="mt-2 text-sm font-semibold text-text-primary">{p.name}</p>
              <p className="text-xs text-text-tertiary">{p.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-text-tertiary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
