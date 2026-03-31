import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";

export default function Hero() {
  return (
    <section className="py-20 sm:py-28 lg:py-36">
      <Container className="text-center">
        <h1 className="mx-auto max-w-4xl font-serif text-4xl text-navy-500 sm:text-5xl lg:text-7xl">
          Professional intelligence {"\u2014"}{" "}
          <span className="text-forest-500">law</span> and{" "}
          <span className="text-plum-500">accounting</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-400 sm:text-xl">
          The operating system for legal and accounting professionals. Every
          tool your firm needs, in one platform.
        </p>
        <p className="mt-4 text-sm font-medium text-navy-300">
          Built by professionals, powered by AI
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
