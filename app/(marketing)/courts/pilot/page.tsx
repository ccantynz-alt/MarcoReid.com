import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import PilotForm from "./PilotForm";

export const metadata: Metadata = {
  title: "Request a Pilot \u2014 Marco Reid Courts",
  description:
    "Run Marco Reid Courts in your courtroom. Tell us about your court and we'll put a working pilot in your hands within 30 days.",
};

export default function PilotPage() {
  return (
    <section className="py-32 sm:py-44">
      <Container narrow>
        <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
          Marco Reid Courts
        </p>
        <h1 className="mt-6 text-display font-serif text-navy-700">
          Request a pilot.
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-navy-400">
          Court procurement is relationship-driven. Tell us about your court, the products you
          want to evaluate, and the use case you&rsquo;re trying to solve. We&rsquo;ll respond
          within two business days and put a working pilot in your hands within 30 days.
        </p>
        <div className="mt-12">
          <PilotForm />
        </div>
      </Container>
    </section>
  );
}
