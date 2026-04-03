import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Acceptable Use Policy — AlecRae",
  description:
    "Rules governing acceptable use of the AlecRae professional intelligence platform. Prohibited activities, enforcement, and reporting.",
};

const EFFECTIVE_DATE = "3 April 2026";

export default function AcceptableUsePage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Legal
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Acceptable Use Policy
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-200">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container narrow>
          <div className="prose prose-navy max-w-none text-navy-600 [&_h2]:font-serif [&_h2]:text-navy-800 [&_h3]:text-navy-700 [&_h2]:text-2xl [&_h3]:text-lg [&_strong]:text-navy-700 [&_a]:text-forest-600 [&_a]:underline">

            <p className="text-sm text-navy-400">
              Last updated: {EFFECTIVE_DATE}
            </p>

            <h2>1. Overview</h2>
            <p>
              This Acceptable Use Policy (&ldquo;AUP&rdquo;) governs your use of the AlecRae
              platform, including all websites, applications, APIs, products, and services
              (the &ldquo;Platform&rdquo;). This AUP is incorporated into and forms part of the
              AlecRae <a href="/terms">Terms of Service</a>.
            </p>
            <p>
              AlecRae reserves the right to update this AUP at any time. Material changes
              will be notified in accordance with the Terms of Service.
            </p>

            <h2>2. General Obligations</h2>
            <p>You agree to:</p>
            <ul>
              <li>Use the Platform only for lawful purposes and in accordance with these Terms;</li>
              <li>Comply with all applicable laws, regulations, and professional conduct rules in your jurisdiction;</li>
              <li>Maintain the security and confidentiality of your account credentials;</li>
              <li>Provide accurate and truthful information in all interactions with the Platform;</li>
              <li>Respect the rights of other users and third parties;</li>
              <li>Use the Platform in a manner consistent with its intended purpose as a professional intelligence tool.</li>
            </ul>

            <h2>3. Prohibited Activities</h2>
            <p>
              <strong>You must not use the Platform to:</strong>
            </p>
            <h3>3.1 Illegal Activities</h3>
            <ul>
              <li>Violate any applicable law, regulation, court order, or governmental directive;</li>
              <li>Facilitate, promote, or engage in money laundering, terrorist financing, sanctions evasion, or other financial crimes;</li>
              <li>Facilitate, promote, or engage in fraud, identity theft, or phishing;</li>
              <li>Process or store proceeds of crime;</li>
              <li>Violate any professional conduct rule, ethical obligation, or regulatory requirement applicable to your profession.</li>
            </ul>
            <h3>3.2 Misuse of AI Capabilities</h3>
            <ul>
              <li>Generate fraudulent legal documents, court filings, or financial statements;</li>
              <li>Fabricate evidence, citations, case law, statutes, or regulatory materials;</li>
              <li>Use AI Output to deceive courts, regulatory bodies, clients, or other parties;</li>
              <li>Submit AI-generated content to any court, tribunal, or regulatory body without independent verification and professional review;</li>
              <li>Represent AI Output as the independent professional work product of a human practitioner without disclosure;</li>
              <li>Attempt to circumvent, disable, or manipulate the Platform&rsquo;s hallucination prevention, citation verification, or safety systems;</li>
              <li>Use prompt injection, jailbreaking, or other techniques to cause the AI to produce harmful, misleading, or prohibited content.</li>
            </ul>
            <h3>3.3 Trust Accounting Violations</h3>
            <ul>
              <li>Commingle client trust funds with operating funds;</li>
              <li>Use the Platform to facilitate misappropriation of trust funds;</li>
              <li>Manipulate, falsify, or tamper with trust accounting records or audit trails;</li>
              <li>Circumvent trust accounting controls, reconciliation requirements, or reporting obligations.</li>
            </ul>
            <h3>3.4 Security Violations</h3>
            <ul>
              <li>Attempt to gain unauthorised access to the Platform, other accounts, or any systems or networks connected to the Platform;</li>
              <li>Probe, scan, or test the vulnerability of the Platform without express written authorisation;</li>
              <li>Interfere with or disrupt the Platform or the servers or networks that host it;</li>
              <li>Introduce viruses, malware, worms, trojan horses, or other harmful code;</li>
              <li>Scrape, crawl, or use automated means to access the Platform except through our published APIs;</li>
              <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Platform;</li>
              <li>Circumvent any access controls, rate limits, or usage restrictions.</li>
            </ul>
            <h3>3.5 Intellectual Property Violations</h3>
            <ul>
              <li>Infringe the intellectual property rights of AlecRae or any third party;</li>
              <li>Use AlecRae trademarks, logos, or branding without written authorisation;</li>
              <li>Copy, reproduce, distribute, or create derivative works of the Platform or any part thereof;</li>
              <li>Resell, sublicence, or redistribute access to the Platform without AlecRae&rsquo;s prior written consent.</li>
            </ul>
            <h3>3.6 Harmful Content</h3>
            <ul>
              <li>Upload, transmit, or store content that is defamatory, obscene, threatening, harassing, or discriminatory;</li>
              <li>Upload content that violates the privacy or publicity rights of any person;</li>
              <li>Upload content that contains personal information of individuals who have not consented to its collection and processing.</li>
            </ul>
            <h3>3.7 Competitive Misuse</h3>
            <ul>
              <li>Use the Platform to build, train, or improve a competing product or service;</li>
              <li>Systematically extract data, AI Output, or research results for use outside the Platform;</li>
              <li>Benchmark the Platform against competing products for publication without AlecRae&rsquo;s prior written consent;</li>
              <li>Access the Platform for the purpose of competitive intelligence or to monitor availability, performance, or functionality.</li>
            </ul>

            <h2>4. Usage Limits</h2>
            <p>
              Your Subscription plan defines usage limits including query volumes, storage
              capacity, and API call limits. Exceeding these limits may result in throttling,
              suspension, or additional charges. AlecRae reserves the right to implement and
              enforce fair use policies to ensure platform stability for all users.
            </p>

            <h2>5. Monitoring and Enforcement</h2>
            <p>
              AlecRae reserves the right to monitor use of the Platform for compliance with
              this AUP. We may, at our sole discretion and without prior notice:
            </p>
            <ul>
              <li>Investigate suspected violations of this AUP;</li>
              <li>Remove or disable access to content that violates this AUP;</li>
              <li>Suspend or terminate accounts that violate this AUP;</li>
              <li>Report violations to law enforcement, regulatory authorities, or professional disciplinary bodies where required by law or where we reasonably believe a crime has been committed;</li>
              <li>Cooperate with law enforcement investigations and court orders.</li>
            </ul>
            <p>
              <strong>Where professional misconduct is detected</strong> &mdash; including
              trust accounting irregularities, submission of fabricated evidence, or other
              conduct that endangers the public &mdash; AlecRae may be required by law to
              report such conduct to the relevant professional regulatory body and reserves
              the right to do so.
            </p>

            <h2>6. Reporting Violations</h2>
            <p>
              If you become aware of any violation of this AUP, please report it immediately
              to abuse@alecrae.com. Reports may be made anonymously. AlecRae will investigate
              all credible reports and take appropriate action.
            </p>

            <h2>7. Consequences of Violation</h2>
            <p>
              Violation of this AUP may result in:
            </p>
            <ul>
              <li>Warning and request for corrective action;</li>
              <li>Temporary suspension of access to the Platform;</li>
              <li>Permanent termination of your account;</li>
              <li>Forfeiture of prepaid fees (to the extent permitted by applicable law);</li>
              <li>Reporting to law enforcement or regulatory authorities;</li>
              <li>Civil or criminal legal proceedings.</li>
            </ul>
            <p>
              AlecRae&rsquo;s failure to enforce any provision of this AUP shall not constitute
              a waiver of that provision.
            </p>

            <h2>8. Contact</h2>
            <p>
              For questions about this Acceptable Use Policy, contact us at:
            </p>
            <p>
              <strong>AlecRae Ltd</strong><br />
              Auckland, New Zealand<br />
              Email: abuse@alecrae.com<br />
              Web: {BRAND.url}
            </p>

          </div>
        </Container>
      </section>
    </>
  );
}
