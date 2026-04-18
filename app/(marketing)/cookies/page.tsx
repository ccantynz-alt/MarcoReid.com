import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Marco Reid cookie policy. We use essential cookies only — no tracking, no advertising.",
};

const sections = [
  {
    title: "1. What are cookies",
    content:
      "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, improve efficiency, and provide information to site operators. Cookies can be \"session\" cookies (deleted when you close your browser) or \"persistent\" cookies (remaining until they expire or you delete them).",
  },
  {
    title: "2. Our approach",
    content:
      "Marco Reid takes a privacy-first approach to cookies. We use only strictly necessary cookies that are essential for the Platform to function. We do not use advertising cookies, tracking cookies, analytics cookies, social media cookies, or any form of cross-site tracking. Because we use only strictly necessary cookies, consent is not required under Article 5(3) of the EU ePrivacy Directive or equivalent legislation. We provide this policy for transparency.",
  },
  {
    title: "3. Cookies we use",
    content:
      "Authentication Cookie: Maintains your login session after you sign in. Type: Strictly necessary. Duration: Session (expires when you close your browser or after inactivity timeout). Provider: First-party (marcoreid.com).\n\nSession Token: Stores an encrypted session identifier to authenticate API requests. Type: Strictly necessary. Duration: Session. Provider: First-party.\n\nCSRF Token: Protects against cross-site request forgery attacks. Type: Strictly necessary. Duration: Session. Provider: First-party.\n\nThese are the only cookies Marco Reid sets. There are no others.",
  },
  {
    title: "4. Cookies we do not use",
    content:
      "For absolute clarity, Marco Reid does NOT use: Google Analytics or any third-party analytics service; Facebook Pixel, LinkedIn Insight, or any social media tracking pixel; advertising cookies of any kind; retargeting or remarketing cookies; any cookie-based user profiling or behavioural tracking; any third-party cookies whatsoever. We track aggregated, anonymised usage data server-side for platform improvement, with no cookies involved.",
  },
  {
    title: "5. Third-party services",
    content:
      "Stripe (our payment processor) may set its own strictly necessary cookies when you interact with payment forms. These cookies are governed by Stripe's privacy policy and are necessary for secure payment processing. We do not control Stripe's cookies, but they are limited to payment functionality.",
  },
  {
    title: "6. Managing cookies",
    content:
      "You can control cookies through your browser settings. However, if you disable strictly necessary cookies, you will not be able to log in to the Platform. Instructions for managing cookies in common browsers:\n\nChrome: Settings > Privacy and Security > Cookies\nFirefox: Settings > Privacy & Security > Cookies\nSafari: Preferences > Privacy > Cookies\nEdge: Settings > Privacy > Cookies",
  },
  {
    title: "7. Do Not Track",
    content:
      "We honour Do Not Track (DNT) browser signals. However, since we do not track users across sites and do not use tracking cookies, our behaviour is the same regardless of your DNT setting.",
  },
  {
    title: "8. Changes to this policy",
    content:
      "We will update this Cookie Policy if we change our cookie practices. Material changes will be communicated to registered users. The \"Last updated\" date at the top reflects the most recent revision.",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">Cookie Policy</h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Essential cookies only. No tracking. No advertising. No exceptions.
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
                This Cookie Policy explains how Reid &amp; Associates Ltd
                (&ldquo;Marco Reid&rdquo;) uses cookies and similar technologies
                on the Marco Reid platform.
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
                  Questions about cookies?
                </p>
                <p className="mt-2 text-navy-400">
                  Contact us at privacy@marcoreid.com or write to Reid &amp;
                  Associates Ltd, Auckland, New Zealand.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
