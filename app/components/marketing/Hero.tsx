import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";

export default function Hero() {
  return (
    <section className="pb-24 pt-32 sm:pb-36 sm:pt-44 lg:pb-44 lg:pt-52">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Law &middot; Accounting &middot; Intelligence
        </p>
        <h1 className="mt-6 text-display-xl font-serif text-neutral-950">
          The platform that{" "}
          <br className="hidden sm:block" />
          replaces everything.
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-neutral-600">
          One login. One platform. Every tool a legal or accounting
          professional needs to run their entire practice.
        </p>
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
