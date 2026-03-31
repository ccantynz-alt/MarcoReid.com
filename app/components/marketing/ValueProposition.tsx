import Container from "@/app/components/shared/Container";

export default function ValueProposition() {
  return (
    <section className="py-24 sm:py-36">
      <Container>
        {/* The big statement */}
        <div className="text-center">
          <h2 className="text-display font-serif text-neutral-950">
            15{"\u2013"}20 hours back. Every week.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl text-neutral-600">
            At $350 an hour, that is over $5,000 of billing capacity recovered.
            Not next year. This week.
          </p>
        </div>

        {/* Three stats */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-neutral-200 px-8 py-12 text-center">
            <p className="font-serif text-display text-neutral-950">4h</p>
            <p className="mt-2 text-sm text-neutral-600">
              Legal research reduced to 30 minutes
            </p>
          </div>
          <div className="rounded-3xl bg-neutral-200 px-8 py-12 text-center">
            <p className="font-serif text-display text-neutral-950">3h</p>
            <p className="mt-2 text-sm text-neutral-600">
              Document drafting reduced to 45 minutes
            </p>
          </div>
          <div className="rounded-3xl bg-neutral-200 px-8 py-12 text-center">
            <p className="font-serif text-display text-neutral-950">5h</p>
            <p className="mt-2 text-sm text-neutral-600">
              Client follow-ups replaced by self-serve portal
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
