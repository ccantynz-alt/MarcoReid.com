import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";

export const metadata: Metadata = {
  title: "Client Portal — Track Your Matter, Documents, and Invoices",
  description:
    "Your secure client portal on Marco Reid. View matter status, upload documents, pay invoices, message your professional, sign documents, and track deadlines. All in one place.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Marco Reid Client Portal",
  description:
    "Secure client portal for tracking legal and accounting matters, documents, invoices, and communications.",
};

const features = [
  {
    title: "Track your matter status",
    desc: "See exactly where your matter stands in plain English. No legal jargon. No chasing your professional for updates. Real-time status visible the moment anything changes.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
        />
      </svg>
    ),
  },
  {
    title: "View and upload documents",
    desc: "Every document related to your matter in one place. Upload files your professional needs. Download documents they have prepared for you. Version history preserved.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },
  {
    title: "Pay invoices securely",
    desc: "View detailed invoice breakdowns. Pay online with a single click. Full payment history available. All payments processed securely through Stripe.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        />
      </svg>
    ),
  },
  {
    title: "Message your professional",
    desc: "Secure, encrypted messaging linked to your matter. Every message becomes part of the official record. No more searching through email threads.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    ),
  },
  {
    title: "Sign documents digitally",
    desc: "E-signature built in. When your professional prepares a document for your signature, sign it directly in the portal. No printing, scanning, or posting.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    ),
  },
  {
    title: "Track deadlines",
    desc: "See every deadline related to your matter. Court dates, filing deadlines, response windows. Automatic reminders before anything is due.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>
    ),
  },
];

export default function PortalPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-48 -top-48 h-[480px] w-[480px] rounded-full bg-forest-500/15 blur-[140px]" />
          <div className="animate-drift-reverse absolute -left-48 -bottom-32 h-[420px] w-[420px] rounded-full bg-gold-500/10 blur-[120px]" />
        </div>
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Client portal
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Your matters. Your documents. Your portal.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Everything about your legal or accounting matter in one secure
              place. Track status, upload documents, pay invoices, message your
              professional, and sign documents without leaving the portal.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/login" variant="gold" size="lg">
                Log in to your portal &rarr;
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Your professional should have sent you an invitation by email. If
              you have not received one, contact your lawyer or accountant
              directly.
            </p>
          </div>
        </Container>
      </section>

      {/* WHAT YOU CAN DO */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              What you can do.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Your client portal gives you complete visibility into your matter.
              No phone tag. No waiting for email replies. Everything in real
              time.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Reveal key={f.title} delay={0.04}>
                <div className="flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-500">
                    {f.icon}
                  </span>
                  <h3 className="mt-4 font-semibold text-navy-700">
                    {f.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-400">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SECURITY */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Your data is protected.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Marco Reid handles some of the most sensitive data in the
              professional world. Your portal is secured to courtroom-admissibility
              standards.
            </p>
          </Reveal>
          <div className="mt-10 space-y-4">
            {[
              {
                title: "End-to-end encryption",
                desc: "Messages between you and your professional are encrypted in transit and at rest. Nobody else can read them, including Marco Reid.",
              },
              {
                title: "Role-based access",
                desc: "You only see your matters, your documents, and your invoices. No other client's data is ever visible to you.",
              },
              {
                title: "Immutable audit trail",
                desc: "Every action in the portal is logged with a timestamp and cryptographic signature. A complete chain of custody for every document.",
              },
              {
                title: "Two-factor authentication",
                desc: "Protect your account with two-factor authentication. Optional but strongly recommended for any matter involving sensitive information.",
              },
            ].map((item) => (
              <Reveal key={item.title} delay={0.03}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW TO GET ACCESS */}
      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              How to get access.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Your professional invites you",
                desc: "Your lawyer or accountant sends you an email invitation from Marco Reid. Click the link to create your portal account.",
              },
              {
                step: "02",
                title: "Set up your account",
                desc: "Create a password and optionally enable two-factor authentication. No credit card required to access the portal.",
              },
              {
                step: "03",
                title: "Access your matter",
                desc: "View your matter status, documents, invoices, and messages immediately. Everything your professional has shared is already there.",
              },
            ].map((s) => (
              <Reveal key={s.step} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
                  <p className="font-serif text-2xl text-gold-500">{s.step}</p>
                  <h3 className="mt-2 font-serif text-base text-navy-800">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-navy-500">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy-500 py-20 sm:py-28">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Already have an invitation?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Log in to your client portal to view your matter status, documents,
              and invoices.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/login" variant="gold" size="lg">
                Log in to your portal &rarr;
              </Button>
              <Button href="/find-a-lawyer" variant="ghost" size="lg" className="text-white hover:text-gold-200">
                Find a professional &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
