import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Marco Reid refund and cancellation policy. Fair, transparent billing practices.",
};

const sections = [
  {
    title: "1. Subscription cancellation",
    content:
      "You may cancel your Marco Reid subscription at any time from your account settings (Dashboard > Billing > Cancel Subscription) or by emailing billing@marcoreid.com. Cancellation takes effect at the end of your current billing period. You retain full access to the Platform until the end of the period you have already paid for. No further charges will be made after cancellation.",
  },
  {
    title: "2. Refund eligibility",
    content:
      "14-Day Money-Back Guarantee: If you cancel within 14 days of your initial subscription purchase, you are entitled to a full refund of the first payment, no questions asked. To request your refund, email billing@marcoreid.com with your account email and the subject line \"Refund Request\".\n\nAfter 14 Days: Subscription fees paid after the 14-day window are non-refundable, except where required by applicable consumer protection law. We do not offer partial refunds for unused portions of a billing period.\n\nAnnual Subscriptions: If you are on an annual plan and cancel within 14 days of the annual charge, you receive a full refund. After 14 days, annual fees are non-refundable except as required by law.",
  },
  {
    title: "3. Service disruption credits",
    content:
      "If the Platform experiences material downtime (defined as the Platform being substantially unavailable for more than 4 consecutive hours, excluding scheduled maintenance), you may request a service credit by contacting billing@marcoreid.com within 30 days of the incident. Service credits are calculated as a pro-rata portion of your monthly fee for the affected period and are applied to your next billing cycle. Service credits are not payable as cash refunds.",
  },
  {
    title: "4. Marketplace transactions",
    content:
      "Payments made through the Marco Reid professional marketplace (Stripe Connect transactions between professionals) are subject to separate refund terms. Marketplace disputes should be resolved directly between the parties to the transaction. Reid & Associates Ltd acts as a technology intermediary and is not responsible for refunding marketplace payments. If a marketplace payment dispute cannot be resolved between the parties, you may contact us at billing@marcoreid.com and we will make reasonable efforts to facilitate resolution.",
  },
  {
    title: "5. Price changes",
    content:
      "We will provide at least 30 days' written notice before any price increase. Price increases take effect at the start of your next billing cycle following the notice period. If you do not agree to a price increase, you may cancel your subscription before the new price takes effect and receive a refund for any unused prepaid period at the old rate.",
  },
  {
    title: "6. Account termination by us",
    content:
      "If we terminate your account for a breach of the Terms of Service or Acceptable Use Policy, no refund is owed. If we terminate your account for any other reason (e.g., we discontinue the Platform), we will provide a pro-rata refund for the unused portion of your current billing period.",
  },
  {
    title: "7. Consumer protection rights",
    content:
      "Nothing in this policy limits your rights under applicable consumer protection law, including but not limited to the New Zealand Consumer Guarantees Act 1993, the Australian Consumer Law, the UK Consumer Rights Act 2015, or the EU Consumer Rights Directive. If you are a consumer in a jurisdiction with mandatory refund protections, those protections apply in addition to this policy.",
  },
  {
    title: "8. How to request a refund",
    content:
      "Email billing@marcoreid.com with the subject line \"Refund Request\" and include your account email address. We will process eligible refunds within 5 to 10 business days. Refunds are issued to the original payment method via Stripe. If your original payment method is no longer available, we will work with you to arrange an alternative.",
  },
];

export default function RefundsPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Fair, transparent billing. Cancel anytime.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-sm text-navy-400">
                Last updated: April 2026
              </p>
              <p className="mt-6 text-lg text-navy-500">
                This policy describes the refund and cancellation terms for
                Marco Reid subscriptions and services operated by Reid &amp;
                Associates Ltd.
              </p>
            </Reveal>

            <div className="mt-16 space-y-12">
              {sections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.05}>
                  <h2 className="font-serif text-headline text-navy-800">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-navy-500 whitespace-pre-line">
                    {section.content}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-16 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Need help with billing?
                </p>
                <p className="mt-2 text-navy-400">
                  Contact us at billing@marcoreid.com. We respond to all billing
                  enquiries within one business day.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
