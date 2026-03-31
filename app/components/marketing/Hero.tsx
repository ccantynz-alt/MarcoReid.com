import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[600px] -translate-y-1/4 rounded-full bg-blue-500/5 blur-[100px] animate-glow-pulse" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative z-10 text-center">
        {/* Eyebrow */}
        <div className="animate-fade-in-up opacity-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-raised px-4 py-1.5 text-xs font-medium text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            The future of professional intelligence
          </span>
        </div>

        {/* Main headline */}
        <h1 className="mt-8 text-display-2xl font-serif text-gradient animate-fade-in-up-delay opacity-0">
          The platform that
          <br />
          replaces everything.
        </h1>

        {/* Sub copy */}
        <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-text-secondary animate-fade-in-up-delay-2 opacity-0">
          One login. Every tool a legal or accounting professional needs.
          Case management. Billing. Research. Dictation.
          All of it. Finally, in one place.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up-delay-3 opacity-0">
          <Button href="/law" size="lg">
            Explore AlecRae Law
          </Button>
          <Button href="/accounting" variant="secondary" size="lg">
            Explore Accounting
          </Button>
        </div>

        {/* Bottom tagline */}
        <p className="mt-16 text-sm text-text-tertiary animate-fade-in-up-delay-3 opacity-0">
          Built by professionals. Powered by AI. Designed to be irreplaceable.
        </p>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
