import Container from "@/app/components/shared/Container";
import SectionHeading from "@/app/components/shared/SectionHeading";
import TimeSavingsTable from "./TimeSavingsTable";

export default function ValueProposition() {
  return (
    <section className="bg-navy-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Recover the hours that matter"
          subtitle="Time saved multiplied by billable rate equals revenue recovered"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 text-center sm:p-8">
            <p className="font-serif text-4xl text-navy-500 sm:text-5xl">
              15{"\u2013"}20
            </p>
            <p className="mt-2 text-lg font-medium text-navy-400">
              hours saved per week for attorneys
            </p>
            <p className="mt-3 text-sm text-navy-300">
              At $350/hour, that is $5,250{"\u2013"}7,000 of additional billing
              capacity. Every week.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center sm:p-8">
            <p className="font-serif text-4xl text-forest-500 sm:text-5xl">
              12{"\u2013"}18
            </p>
            <p className="mt-2 text-lg font-medium text-navy-400">
              hours saved per week per CPA
            </p>
            <p className="mt-3 text-sm text-navy-300">
              Hours that can be billed to more clients, or simply given back to
              the people who matter.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-white p-6 sm:p-8">
          <TimeSavingsTable />
        </div>
      </Container>
    </section>
  );
}
