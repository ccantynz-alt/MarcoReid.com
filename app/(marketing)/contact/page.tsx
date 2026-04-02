import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

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
              <form className="mt-12 space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-navy-600">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-navy-600">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                    placeholder="you@yourfirm.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-firm" className="block text-sm font-medium text-navy-600">
                    Firm name
                  </label>
                  <input
                    id="contact-firm"
                    name="firm"
                    type="text"
                    className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                    placeholder="Your firm (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-navy-600">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                  >
                    <option>General enquiry</option>
                    <option>Pricing question</option>
                    <option>Security question</option>
                    <option>Partnership opportunity</option>
                    <option>Early access request</option>
                    <option>Press / media</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-navy-600">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
                >
                  Send message
                </button>
              </form>
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
