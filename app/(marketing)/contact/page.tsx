import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact AlecRae",
  description:
    "Get in touch with AlecRae. Questions about the platform, security, pricing, or partnerships.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Get in touch.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Questions about AlecRae? We&rsquo;d love to hear from you.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="mx-auto max-w-xl">
            <Reveal>
              <h2 className="font-serif text-display text-navy-800">
                Send us a message.
              </h2>
              <p className="mt-4 text-lg text-navy-400">
                Whether you have questions about the platform, security, pricing,
                or partnership opportunities &mdash; we respond to every message.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-16">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm text-navy-400">
              AlecRae &middot; Auckland, New Zealand
            </p>
            <p className="mt-2 text-sm text-navy-400">
              We respond to every message within 24 hours.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
