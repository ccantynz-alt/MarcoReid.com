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
    <section className="py-24 sm:py-36">
      <Container className="text-center">
        <h2 className="whitespace-pre-line text-display font-serif text-neutral-950">
          {title}
        </h2>
        <p className="mt-6 text-xl text-neutral-600">{subtitle}</p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/law" size="lg">
            Explore Law
          </Button>
          <Button href="/accounting" variant="secondary" size="lg">
            Explore Accounting
          </Button>
        </div>
      </Container>
    </section>
  );
}
