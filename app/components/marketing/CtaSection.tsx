import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
}

export default function CtaSection({
  title = "Ready to transform your practice?",
  subtitle = "Join the professionals who are building the future of law and accounting.",
}: CtaSectionProps) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="text-center">
        <h2 className="font-serif text-3xl text-navy-500 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/law" size="lg">
            Explore AlecRae Law
          </Button>
          <Button href="/accounting" variant="secondary" size="lg">
            Explore AlecRae Accounting
          </Button>
        </div>
      </Container>
    </section>
  );
}
