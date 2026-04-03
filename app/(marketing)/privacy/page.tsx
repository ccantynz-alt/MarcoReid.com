import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy — AlecRae",
  description:
    "How AlecRae collects, uses, stores, and protects your personal information. Compliant with GDPR, UK GDPR, NZ Privacy Act 2020, Australian Privacy Act 1988, and CCPA.",
};

const EFFECTIVE_DATE = "3 April 2026";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — AlecRae",
  description: "How AlecRae collects, uses, stores, and protects your personal information.",
  url: "https://alecrae.com/privacy",
};

export default function PrivacyPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Legal
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Privacy Policy
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

            <h2>1. Introduction</h2>
            <p>
              AlecRae Ltd (New Zealand) and its affiliated entities
              (&ldquo;AlecRae&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) are committed to protecting
              your privacy and the security of your personal information. This Privacy Policy
              describes how we collect, use, store, disclose, and protect personal information
              when you use the AlecRae platform, websites, and services (collectively, the
              &ldquo;Platform&rdquo;).
            </p>
            <p>
              This Policy applies globally and addresses the requirements of the following
              laws and regulations:
            </p>
            <ul>
              <li>General Data Protection Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;)</li>
              <li>UK General Data Protection Regulation (&ldquo;UK GDPR&rdquo;) and the Data Protection Act 2018</li>
              <li>New Zealand Privacy Act 2020</li>
              <li>Australian Privacy Act 1988 (including the Australian Privacy Principles)</li>
              <li>California Consumer Privacy Act (&ldquo;CCPA&rdquo;) and California Privacy Rights Act (&ldquo;CPRA&rdquo;)</li>
              <li>Other applicable state, federal, and international privacy laws</li>
            </ul>

            <h2>2. Data Controller</h2>
            <p>
              The data controller for personal information collected through the Platform is:
            </p>
            <p>
              <strong>AlecRae Ltd</strong><br />
              Auckland, New Zealand<br />
              Email: privacy@alecrae.com
            </p>
            <p>
              For users in the European Economic Area (&ldquo;EEA&rdquo;) and United Kingdom, our EU/UK
              representative details are available upon request at privacy@alecrae.com.
            </p>
            <p>
              Where AlecRae processes personal data on behalf of Professional Users (i.e.,
              their Client Data), AlecRae acts as a data processor. The Professional User is
              the data controller for their Client Data and is responsible for obtaining all
              necessary consents and providing all required notices to their clients.
            </p>

            <h2>3. Information We Collect</h2>
            <h3>3.1 Information You Provide</h3>
            <ul>
              <li><strong>Account information:</strong> name, email address, firm name, professional credentials, role, and password (stored as a bcrypt hash, never in plaintext).</li>
              <li><strong>Payment information:</strong> billing address, payment method details. Payment card details are processed and stored exclusively by our payment processor (Stripe, Inc.) and are never stored on AlecRae servers.</li>
              <li><strong>Professional credentials:</strong> bar number, CPA licence number, jurisdiction of admission, and other professional qualifications.</li>
              <li><strong>Content:</strong> documents, files, case materials, financial records, and other data you upload to the Platform.</li>
              <li><strong>Communications:</strong> messages, support requests, and feedback you send to us.</li>
              <li><strong>Voice data:</strong> audio recordings processed by AlecRae Voice for transcription. Audio is processed in real-time and is not stored after transcription is complete unless you explicitly choose to save a recording.</li>
            </ul>
            <h3>3.2 Information We Collect Automatically</h3>
            <ul>
              <li><strong>Usage data:</strong> pages visited, features used, timestamps, session duration, and interaction patterns.</li>
              <li><strong>Device information:</strong> IP address, browser type and version, operating system, device type, and screen resolution.</li>
              <li><strong>Log data:</strong> server logs, error logs, and performance data.</li>
              <li><strong>Cookies and similar technologies:</strong> see Section 10 below.</li>
            </ul>
            <h3>3.3 Information from Third Parties</h3>
            <ul>
              <li><strong>Payment processor:</strong> payment confirmation, transaction status, and billing details from Stripe.</li>
              <li><strong>Banking connectivity:</strong> bank account information and transaction data provided through Plaid or equivalent connectivity provider, only when you explicitly connect your bank account.</li>
              <li><strong>Authentication providers:</strong> if you sign in using a third-party provider, we receive the information you authorise that provider to share.</li>
            </ul>

            <h2>4. How We Use Your Information</h2>
            <p>We use your personal information for the following purposes:</p>
            <h3>4.1 Provision of Services (Contractual Necessity / Legitimate Interest)</h3>
            <ul>
              <li>Operating, maintaining, and improving the Platform;</li>
              <li>Processing your queries through The Oracle and returning research results;</li>
              <li>Processing voice input through AlecRae Voice;</li>
              <li>Managing your account and Subscription;</li>
              <li>Processing payments and preventing fraud;</li>
              <li>Providing customer support.</li>
            </ul>
            <h3>4.2 Security and Compliance (Legitimate Interest / Legal Obligation)</h3>
            <ul>
              <li>Maintaining the security and integrity of the Platform;</li>
              <li>Detecting and preventing fraud, abuse, and security incidents;</li>
              <li>Maintaining audit trails for trust accounting compliance;</li>
              <li>Complying with legal obligations, including tax reporting, court orders, and regulatory requirements.</li>
            </ul>
            <h3>4.3 Communications (Consent / Legitimate Interest)</h3>
            <ul>
              <li>Sending service-related notifications (account, billing, security);</li>
              <li>Sending marketing communications (only with your explicit consent, and you may opt out at any time).</li>
            </ul>
            <h3>4.4 Analytics and Improvement (Legitimate Interest)</h3>
            <ul>
              <li>Analysing usage patterns to improve the Platform;</li>
              <li>Monitoring performance and diagnosing technical issues;</li>
              <li>Conducting aggregate, anonymised research on query patterns to improve AI Output quality.</li>
            </ul>
            <p>
              <strong>We do NOT use your Content, Client Data, or any user-uploaded materials
              to train, fine-tune, or improve our AI models. Your data is never used for
              model training. Period.</strong>
            </p>

            <h2>5. Legal Basis for Processing (GDPR / UK GDPR)</h2>
            <p>Where GDPR or UK GDPR applies, our legal basis for processing is:</p>
            <ul>
              <li><strong>Performance of contract:</strong> processing necessary to provide the Platform and fulfil our contractual obligations (Sections 4.1).</li>
              <li><strong>Legitimate interest:</strong> processing necessary for our legitimate interests (security, fraud prevention, analytics, service improvement) where those interests are not overridden by your rights and freedoms (Sections 4.2, 4.4).</li>
              <li><strong>Legal obligation:</strong> processing required to comply with applicable laws (Section 4.2).</li>
              <li><strong>Consent:</strong> marketing communications and non-essential cookies (Section 4.3). You may withdraw consent at any time.</li>
            </ul>

            <h2>6. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We do not share your personal
              information with third parties for their own marketing purposes. We disclose
              personal information only in the following circumstances:
            </p>
            <h3>6.1 Service Providers</h3>
            <p>
              We share personal information with third-party service providers who process
              data on our behalf, including:
            </p>
            <ul>
              <li><strong>Cloud infrastructure:</strong> hosting and data storage;</li>
              <li><strong>Payment processing:</strong> Stripe, Inc.;</li>
              <li><strong>Banking connectivity:</strong> Plaid or equivalent;</li>
              <li><strong>AI processing:</strong> Anthropic (for Oracle queries &mdash; queries are processed but not used for model training under our agreement);</li>
              <li><strong>Email and communications:</strong> transactional email providers.</li>
            </ul>
            <p>
              All service providers are bound by data processing agreements that require
              them to protect your data to the same standard as this Policy.
            </p>
            <h3>6.2 Legal Requirements</h3>
            <p>
              We may disclose personal information where required by law, regulation, court
              order, subpoena, or other legal process. Where permitted by law, we will notify
              you before making such disclosure.
            </p>
            <h3>6.3 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, reorganisation, or sale of assets,
              your personal information may be transferred to the successor entity. We will
              notify you of any such transfer and any changes to this Policy.
            </p>
            <h3>6.4 With Your Consent</h3>
            <p>
              We may share personal information with third parties when you have given your
              explicit consent to do so.
            </p>

            <h2>7. International Data Transfers</h2>
            <p>
              AlecRae operates across multiple jurisdictions. Your personal information may
              be transferred to and processed in countries other than the country in which
              you reside, including New Zealand, the United States, Australia, and the United
              Kingdom.
            </p>
            <p>Where personal information is transferred from the EEA or UK:</p>
            <ul>
              <li>Transfers to New Zealand are covered by the European Commission&rsquo;s adequacy decision for New Zealand;</li>
              <li>Transfers to other countries are protected by Standard Contractual Clauses (SCCs) adopted by the European Commission, supplemented by additional safeguards where necessary;</li>
              <li>The UK International Data Transfer Agreement (IDTA) or UK Addendum to SCCs applies for transfers from the UK.</li>
            </ul>
            <p>
              Where personal information is transferred from Australia, we comply with
              Australian Privacy Principle 8 (cross-border disclosure of personal information).
            </p>

            <h2>8. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to fulfil the
              purposes for which it was collected, including:
            </p>
            <ul>
              <li><strong>Account data:</strong> retained for the duration of your account and for 90 days after account closure to allow for account recovery.</li>
              <li><strong>Content and Client Data:</strong> retained for the duration of your account. Upon account closure, you will have at least 30 days to export your data, after which it will be permanently deleted.</li>
              <li><strong>Financial and billing records:</strong> retained for 7 years after the relevant transaction as required by tax and accounting regulations in applicable jurisdictions.</li>
              <li><strong>Audit trails:</strong> trust accounting audit trails are retained for the period required by applicable professional regulations (typically 6&ndash;7 years).</li>
              <li><strong>Usage and analytics data:</strong> retained in anonymised, aggregate form. Individual-level data is deleted within 26 months.</li>
              <li><strong>Voice recordings:</strong> processed in real-time and not retained unless you explicitly save them. Saved recordings follow Content retention rules.</li>
            </ul>

            <h2>9. Your Rights</h2>
            <h3>9.1 Rights Under GDPR / UK GDPR</h3>
            <p>If you are located in the EEA or UK, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> request a copy of the personal data we hold about you;</li>
              <li><strong>Rectification:</strong> request correction of inaccurate personal data;</li>
              <li><strong>Erasure:</strong> request deletion of your personal data (&ldquo;right to be forgotten&rdquo;);</li>
              <li><strong>Restriction:</strong> request restriction of processing in certain circumstances;</li>
              <li><strong>Portability:</strong> receive your personal data in a structured, commonly used, machine-readable format;</li>
              <li><strong>Object:</strong> object to processing based on legitimate interest or for direct marketing;</li>
              <li><strong>Automated decision-making:</strong> not be subject to a decision based solely on automated processing that produces legal effects concerning you.</li>
            </ul>
            <p>
              You also have the right to lodge a complaint with a supervisory authority
              (e.g., the UK Information Commissioner&rsquo;s Office, or the relevant EEA data
              protection authority).
            </p>
            <h3>9.2 Rights Under NZ Privacy Act 2020</h3>
            <p>If you are located in New Zealand, you have the right to:</p>
            <ul>
              <li>Request access to your personal information (Information Privacy Principle 6);</li>
              <li>Request correction of your personal information (Information Privacy Principle 7);</li>
              <li>Lodge a complaint with the Office of the Privacy Commissioner.</li>
            </ul>
            <h3>9.3 Rights Under Australian Privacy Act 1988</h3>
            <p>If you are located in Australia, you have the right to:</p>
            <ul>
              <li>Access your personal information (APP 12);</li>
              <li>Request correction of your personal information (APP 13);</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC).</li>
            </ul>
            <h3>9.4 Rights Under CCPA / CPRA (California Residents)</h3>
            <p>If you are a California resident, you have the right to:</p>
            <ul>
              <li><strong>Know:</strong> request disclosure of the categories and specific pieces of personal information we have collected;</li>
              <li><strong>Delete:</strong> request deletion of your personal information;</li>
              <li><strong>Correct:</strong> request correction of inaccurate personal information;</li>
              <li><strong>Opt-out of sale:</strong> we do not sell personal information, so this right is satisfied by default;</li>
              <li><strong>Non-discrimination:</strong> you will not be discriminated against for exercising your privacy rights.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at privacy@alecrae.com. We will
              respond within the timeframes required by applicable law (typically 30 days,
              or 45 days for CCPA requests).
            </p>

            <h2>10. Cookies and Tracking Technologies</h2>
            <p>We use the following categories of cookies:</p>
            <ul>
              <li><strong>Strictly necessary cookies:</strong> required for the Platform to function (authentication, security, session management). These cannot be disabled.</li>
              <li><strong>Analytics cookies:</strong> used to understand how users interact with the Platform. Enabled only with your consent where required by law.</li>
              <li><strong>Preference cookies:</strong> used to remember your settings and preferences. Enabled only with your consent where required by law.</li>
            </ul>
            <p>
              We do not use third-party advertising cookies or tracking pixels. We do not
              participate in cross-site tracking or real-time bidding.
            </p>
            <p>
              You can manage your cookie preferences through your browser settings or through
              our cookie consent mechanism. Note that disabling strictly necessary cookies may
              impair the functionality of the Platform.
            </p>

            <h2>11. Data Security</h2>
            <p>
              We implement technical and organisational security measures designed to protect
              personal information against unauthorised access, alteration, disclosure, or
              destruction, including:
            </p>
            <ul>
              <li>Encryption of data at rest and in transit (FIPS 140-3 compliant);</li>
              <li>Cryptographically signed, immutable audit trails;</li>
              <li>Multi-factor authentication for all accounts;</li>
              <li>Role-based access controls;</li>
              <li>Regular security assessments and penetration testing;</li>
              <li>Data residency controls (your data stays in your selected region);</li>
              <li>Incident response procedures and breach notification protocols.</li>
            </ul>
            <p>
              For more information about our security architecture, see our{" "}
              <a href="/security">Security</a> page.
            </p>

            <h2>12. Data Breach Notification</h2>
            <p>
              In the event of a personal data breach that poses a risk to your rights and
              freedoms, we will:
            </p>
            <ul>
              <li>Notify the relevant supervisory authority within 72 hours of becoming aware of the breach (where required by GDPR/UK GDPR);</li>
              <li>Notify the NZ Privacy Commissioner of serious breaches as required by the NZ Privacy Act 2020;</li>
              <li>Notify the OAIC as required by the Australian Notifiable Data Breaches scheme;</li>
              <li>Notify affected individuals without undue delay where the breach is likely to result in a high risk to their rights and freedoms;</li>
              <li>Document all breaches and remedial actions taken.</li>
            </ul>

            <h2>13. Children&rsquo;s Privacy</h2>
            <p>
              The Platform is not directed at individuals under the age of 18 and we do not
              knowingly collect personal information from children. If we become aware that
              we have collected personal information from a child under 18, we will take
              steps to delete that information promptly. If you believe a child has provided
              us with personal information, contact us at privacy@alecrae.com.
            </p>

            <h2>14. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will
              be notified via email or prominent notice on the Platform at least 30 days
              before they take effect. Your continued use of the Platform after the effective
              date constitutes acceptance of the updated Policy.
            </p>

            <h2>15. Contact Information</h2>
            <p>
              For questions, concerns, or requests related to this Privacy Policy or your
              personal information, contact us at:
            </p>
            <p>
              <strong>AlecRae Ltd — Privacy</strong><br />
              Auckland, New Zealand<br />
              Email: privacy@alecrae.com<br />
              Web: {BRAND.url}
            </p>
            <p>
              You may also contact the relevant data protection authority in your jurisdiction:
            </p>
            <ul>
              <li><strong>New Zealand:</strong> Office of the Privacy Commissioner — privacy.org.nz</li>
              <li><strong>Australia:</strong> Office of the Australian Information Commissioner — oaic.gov.au</li>
              <li><strong>United Kingdom:</strong> Information Commissioner&rsquo;s Office — ico.org.uk</li>
              <li><strong>European Union:</strong> Your local Data Protection Authority</li>
              <li><strong>California:</strong> Office of the Attorney General — oag.ca.gov</li>
            </ul>

          </div>
        </Container>
      </section>
    </>
  );
}
