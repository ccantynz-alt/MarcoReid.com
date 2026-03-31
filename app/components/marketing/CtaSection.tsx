import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
}

export default function CtaSection({
  title = "This is what the future of\nprofessional work looks like.",
  subtitle = "One platform. Every tool. No compromises.",
}: CtaSectionProps) {
  return (
    <section className="relative py-32 sm:py-44">
      {/* Glow effect behind CTA */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <Container className="relative text-center">
        <h2 className="whitespace-pre-line text-display-xl font-serif text-gradient">
          {title}
        </h2>
        <p className="mt-8 text-xl text-text-secondary">{subtitle}</p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/law" size="lg">
            Explore AlecRae Law
          </Button>
          <Button href="/accounting" variant="secondary" size="lg">
            Explore Accounting
          </Button>
        </div>
      </Container>
    </section>
  );
}
