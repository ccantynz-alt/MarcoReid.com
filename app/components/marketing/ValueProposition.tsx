import Container from "@/app/components/shared/Container";

export default function ValueProposition() {
  return (
    <section className="relative py-32 sm:py-44">
      <div className="glow-line mx-auto max-w-lg" />

      <Container className="mt-20">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            The numbers
          </p>
          <h2 className="mt-6 text-display-xl font-serif text-gradient">
            15&ndash;20 hours back.
            <br />
            Every single week.
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-xl text-text-secondary">
            At $350 an hour, that is over $5,000 of billing capacity recovered.
            Not next quarter. This week.
          </p>
        </div>

        {/* Three dramatic stats */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          <div className="card-dark text-center">
            <p className="font-serif text-display-xl text-text-primary">
              4<span className="text-accent">h</span>
            </p>
            <p className="mt-3 text-sm text-text-secondary">
              of legal research compressed into 30 minutes
            </p>
          </div>
          <div className="card-dark text-center">
            <p className="font-serif text-display-xl text-text-primary">
              3<span className="text-accent">h</span>
            </p>
            <p className="mt-3 text-sm text-text-secondary">
              of document drafting compressed into 45 minutes
            </p>
          </div>
          <div className="card-dark text-center">
            <p className="font-serif text-display-xl text-text-primary">
              5<span className="text-accent">h</span>
            </p>
            <p className="mt-3 text-sm text-text-secondary">
              of weekly follow-ups replaced by self-serve portal
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
