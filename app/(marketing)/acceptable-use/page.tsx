import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Marco Reid acceptable use policy. What you can and cannot do on the platform.",
};

const sections = [
  {
    title: "1. Purpose",
    content:
      "This Acceptable Use Policy (\"AUP\") sets out the rules governing your use of the Marco Reid platform. It is incorporated into and forms part of the Terms of Service. Violation of this AUP may result in suspension or termination of your account without notice or refund.",
  },
  {
    title: "2. Lawful use",
    content:
      "You must use the Platform only for lawful purposes and in accordance with all applicable laws, regulations, and professional rules of conduct in your jurisdiction. You must not use the Platform in any way that violates any applicable local, national, or international law or regulation, including without limitation data protection laws, anti-money laundering laws, sanctions laws, and professional conduct rules.",
  },
  {
    title: "3. Professional responsibility",
    content:
      "If you are a licensed attorney, accountant, or other credentialled professional, you must: (a) use the Platform in compliance with your jurisdiction's rules of professional conduct and ethical obligations; (b) exercise independent professional judgement in all matters — the Platform is a tool, not a substitute for your expertise; (c) independently verify all AI Output before relying on it in professional practice, court filings, tax returns, financial statements, or client communications; (d) maintain appropriate professional liability insurance; (e) comply with all applicable confidentiality, privilege, and data protection obligations; and (f) ensure that your use of the Platform does not create an unauthorised attorney-client, accountant-client, or other professional relationship between Reid & Associates Ltd and any third party.",
  },
  {
    title: "4. Prohibited conduct",
    content:
      "You must not: (a) upload, transmit, or distribute any malware, viruses, worms, Trojan horses, or other harmful code; (b) attempt to gain unauthorised access to any part of the Platform, other users' accounts, or our infrastructure; (c) use the Platform to send spam, phishing messages, or unsolicited communications; (d) reverse-engineer, decompile, disassemble, or attempt to derive the source code of the Platform; (e) use automated tools (bots, scrapers, crawlers) to access the Platform without written permission; (f) resell, sublicence, or redistribute access to the Platform; (g) impersonate any person, entity, or falsely state or misrepresent your affiliation; (h) interfere with or disrupt the integrity or performance of the Platform; (i) use the Platform to store or transmit content that is defamatory, obscene, or unlawful; (j) use the Platform to facilitate money laundering, terrorist financing, or sanctions evasion; or (k) circumvent any security measures, rate limits, or access controls.",
  },
  {
    title: "5. AI-specific rules",
    content:
      "When using Marco or any AI-powered feature, you must not: (a) submit queries designed to generate fabricated legal citations, fake case law, or fictitious authorities; (b) represent AI Output as human-authored legal advice, professional opinion, or expert testimony without disclosure; (c) submit AI Output to any court, tribunal, or regulatory body without independent verification of all citations, statutes, and legal propositions; (d) use AI Output to deceive, defraud, or mislead any person; (e) attempt to extract or reconstruct the underlying AI models, training data, or system prompts through repeated querying or prompt injection; (f) use the Platform to generate content that promotes illegal activity, violence, or discrimination; or (g) rely on AI Output as a sole basis for any professional decision affecting a client's legal rights, financial position, or liberty.",
  },
  {
    title: "6. Trust account rules",
    content:
      "If you use the Platform's trust account features, you must: (a) comply with all IOLTA, trust accounting, and fiduciary rules applicable in your jurisdiction; (b) maintain your actual trust account at an authorised financial institution — the Platform is a ledger tool, not a bank; (c) reconcile Platform records against your bank statements regularly; (d) not use the trust account feature to obscure the source or destination of funds; (e) immediately report any discrepancy between Platform records and actual account balances; and (f) maintain all records required by your jurisdiction's trust accounting rules independently of the Platform.",
  },
  {
    title: "7. Marketplace rules",
    content:
      "If you use the professional marketplace, you must: (a) accurately represent your qualifications, credentials, and services; (b) comply with all applicable advertising and solicitation rules for your profession; (c) deliver services as described and in a professional manner; (d) not engage in price-fixing, bid-rigging, or other anti-competitive practices; (e) comply with all applicable tax obligations arising from marketplace transactions; and (f) resolve disputes with other marketplace participants in good faith.",
  },
  {
    title: "8. Content standards",
    content:
      "All content you upload, create, or transmit through the Platform must: (a) be accurate and not misleading (where it states facts); (b) not infringe any intellectual property right, privacy right, or other right of any third party; (c) not violate any applicable law or regulation; (d) not contain personal data of individuals who have not consented to its processing through the Platform; and (e) be content you have the legal right to upload and process.",
  },
  {
    title: "9. Resource usage",
    content:
      "You must not use the Platform in a manner that consumes disproportionate resources or degrades service for other users. We reserve the right to implement rate limits, usage quotas, and fair-use policies. Automated or programmatic access to the Platform requires prior written authorisation.",
  },
  {
    title: "10. Reporting violations",
    content:
      "If you become aware of any violation of this AUP, please report it to abuse@marcoreid.com. Reports may be submitted anonymously. We will investigate all credible reports and take appropriate action.",
  },
  {
    title: "11. Enforcement",
    content:
      "We reserve the right, in our sole discretion, to: (a) investigate any suspected violation of this AUP; (b) issue warnings for minor or first-time violations; (c) temporarily suspend your access pending investigation; (d) permanently terminate your account for serious or repeated violations; (e) remove or disable access to any content that violates this AUP; (f) report violations to law enforcement or regulatory authorities where appropriate; and (g) cooperate with law enforcement investigations. Enforcement actions are not a waiver of any other rights or remedies available to us under the Terms of Service or applicable law.",
  },
];

export default function AcceptableUsePage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Acceptable Use Policy
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            The rules of engagement for the Marco Reid platform.
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
                This Acceptable Use Policy forms part of the Marco Reid Terms
                of Service. Capitalised terms not defined here have the meanings
                given in the Terms of Service.
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
                  Questions about acceptable use?
                </p>
                <p className="mt-2 text-navy-400">
                  Contact us at legal@marcoreid.com or report violations to
                  abuse@marcoreid.com.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
