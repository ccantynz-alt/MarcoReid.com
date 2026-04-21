import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import TryDemo from "./TryDemo";

export const metadata: Metadata = {
  title: "Try Marco — Describe your legal or accounting situation",
  description:
    "Type your NZ or AU legal or accounting situation in plain English. Marco drafts a first-pass memo in real time, with inline citations to specific statutes. A verified lawyer or accountant can review and sign off from $149.",
  openGraph: {
    title: "Try Marco — Plain English in. First-pass legal memo out.",
    description:
      "Watch an AI draft a real first-pass legal or accounting memo for your situation — with inline statute citations — in under 30 seconds.",
    url: `${BRAND.url}/try`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Marco Reid — Try demo",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  description:
    "Public AI demo: describe a NZ or AU legal or accounting situation and Marco drafts a first-pass memo with inline statute citations.",
  url: `${BRAND.url}/try`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NZD",
  },
};

export default function TryPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />
      <section className="relative overflow-hidden bg-navy-500 pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold-400/20 blur-[120px]" />
          <div className="animate-drift-reverse absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-forest-500/15 blur-[100px]" />
        </div>
        <Container className="relative text-center">
          <p className="text-sm font-semibold tracking-wider text-gold-400">
            Try Marco &middot; NZ &amp; AU &middot; free, no signup
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Describe your situation.
            <br />
            <span className="text-gold-300">
              Watch a first-pass memo write itself.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-100 sm:text-xl">
            One line of plain English in. A real first-pass legal or accounting
            memo out — with inline citations to specific NZ or AU statutes — in
            under 30 seconds.
          </p>
        </Container>
      </section>

      <section className="bg-white pb-24 pt-10 sm:pb-32">
        <Container>
          <TryDemo />
        </Container>
      </section>

      <section className="border-t border-navy-100 bg-navy-50 py-10">
        <Container className="text-center">
          <Link
            href="/for-professionals"
            className="text-sm text-navy-500 underline decoration-navy-200 underline-offset-4 hover:text-navy-700 hover:decoration-navy-500"
          >
            Are you a lawyer or accountant? See the pro side &rarr;
          </Link>
        </Container>
      </section>
    </>
  );
}
