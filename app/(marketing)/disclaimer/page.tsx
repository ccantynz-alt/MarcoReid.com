import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer — AlecRae",
  description:
    "Important disclaimers regarding AI-generated content, professional responsibility, and the limitations of the AlecRae platform. AlecRae is a tool for professionals, not a substitute for professional judgment.",
};

const EFFECTIVE_DATE = "3 April 2026";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Disclaimer — AlecRae",
  description: "Important disclaimers regarding AI-generated content and professional responsibility on the AlecRae platform.",
  url: "https://alecrae.com/disclaimer",
};

export default function DisclaimerPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Legal
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Disclaimer
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

            <h2>1. AlecRae Is a Technology Platform &mdash; Not a Professional Service Provider</h2>
            <p>
              AlecRae Ltd and its affiliated entities (&ldquo;AlecRae&rdquo;) provide a technology
              platform designed to assist licensed legal and accounting professionals in the
              performance of their professional duties. <strong>AlecRae does not practise law,
              does not provide legal advice, does not provide accounting services, does not
              provide tax advice, and does not provide any other professional service.</strong>
            </p>
            <p>
              AlecRae is not a law firm. AlecRae is not an accounting firm. AlecRae is not
              a financial advisor. AlecRae is not a tax preparer. No interaction with the
              Platform creates an attorney-client relationship, accountant-client relationship,
              fiduciary relationship, or any other professional-client relationship between
              AlecRae and any user or any user&rsquo;s client.
            </p>

            <h2>2. AI-Generated Content Disclaimer</h2>
            <p>
              The AlecRae platform uses artificial intelligence, including large language
              models, to generate content including but not limited to: legal research results,
              accounting research results, tax analysis, compliance recommendations, document
              drafts, citation suggestions, voice transcriptions, and other AI Output.
            </p>
            <p>
              <strong>ALL AI-GENERATED CONTENT IS PROVIDED FOR INFORMATIONAL AND RESEARCH
              ASSISTANCE PURPOSES ONLY.</strong> AI-generated content:
            </p>
            <ul>
              <li><strong>May contain errors.</strong> Large language models can and do produce inaccurate, incomplete, outdated, or fabricated information (&ldquo;hallucinations&rdquo;), including fabricated case citations, invented statutes, incorrect tax rates, and mischaracterised legal principles.</li>
              <li><strong>May be outdated.</strong> AI models are trained on data with a knowledge cutoff. Laws change. Regulations are amended. Case law evolves. Tax codes are updated. AI Output may not reflect the most current law.</li>
              <li><strong>May not apply to your jurisdiction.</strong> Legal and accounting rules vary dramatically across jurisdictions. AI Output may reference rules from a jurisdiction that does not apply to your matter.</li>
              <li><strong>Is not a substitute for professional judgment.</strong> No AI system, regardless of sophistication, can replace the professional judgment of a qualified attorney or accountant who understands the specific facts, circumstances, and context of a matter.</li>
              <li><strong>Must be independently verified before any reliance.</strong> Every citation, every case reference, every statutory reference, every tax calculation, every compliance recommendation must be independently verified by a qualified professional before reliance.</li>
            </ul>

            <h2>3. Citation Verification Badges</h2>
            <p>
              The Oracle assigns verification badges to citations based on automated
              cross-referencing with authoritative public domain sources:
            </p>
            <ul>
              <li><strong>Verified:</strong> The citation was found in an authoritative source and the reference appears to be accurate. This does NOT guarantee that the citation is current, correctly applied, or relevant to your specific matter. Verification confirms existence, not applicability.</li>
              <li><strong>Unverified:</strong> The citation could not be confirmed against available sources. It may be accurate but could not be verified. <strong>Treat with extreme caution. Independent verification is mandatory.</strong></li>
              <li><strong>Not Found:</strong> The citation was not found in any authoritative source. It may be fabricated by the AI. <strong>Do not rely on this citation without independent verification from a primary source.</strong></li>
            </ul>
            <p>
              <strong>An attorney or accountant who relies on an unverified or not-found
              citation without conducting independent verification does so at their own
              professional risk.</strong> The verification badge is an automated quality
              signal, not a guarantee of accuracy. The professional&rsquo;s duty of competence
              and diligence is not delegable to a technology tool.
            </p>

            <h2>4. Professional Responsibility</h2>
            <p>
              Professional Users of the Platform remain subject to all applicable professional
              conduct rules, ethical obligations, and regulatory requirements. Use of AlecRae
              does not alter, diminish, or discharge any professional duty including but not
              limited to:
            </p>
            <ul>
              <li><strong>Duty of competence:</strong> the obligation to provide competent representation, which includes the duty to independently verify all research, citations, and analysis;</li>
              <li><strong>Duty of diligence:</strong> the obligation to act with reasonable diligence and promptness;</li>
              <li><strong>Duty of supervision:</strong> the obligation to supervise all work product, including AI-generated content, before submission or reliance;</li>
              <li><strong>Duty of confidentiality:</strong> the obligation to protect client confidences and secrets;</li>
              <li><strong>Duty of candour:</strong> the obligation to be truthful in all dealings with courts, tribunals, and regulatory bodies;</li>
              <li><strong>Duty of independence:</strong> the obligation to exercise independent professional judgment;</li>
              <li><strong>Fiduciary duties:</strong> all fiduciary obligations owed to clients, including the duty to safeguard trust funds;</li>
              <li><strong>Continuing education:</strong> the obligation to maintain professional competence, including competence in the ethical use of technology tools.</li>
            </ul>

            <h2>5. No Warranty</h2>
            <p>
              <strong>THE PLATFORM AND ALL AI OUTPUT ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
              AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED,
              STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, RELIABILITY,
              COMPLETENESS, TIMELINESS, NON-INFRINGEMENT, OR AVAILABILITY.</strong>
            </p>
            <p>
              AlecRae makes no representation or warranty that:
            </p>
            <ul>
              <li>AI Output will be accurate, complete, current, or reliable;</li>
              <li>The Platform will be uninterrupted, error-free, or secure;</li>
              <li>Any particular citation, case, statute, regulation, or tax provision exists, is current, or is correctly characterised;</li>
              <li>The Platform will meet your specific professional, regulatory, or jurisdictional requirements;</li>
              <li>The Platform will comply with any specific bar rule, law society requirement, or accounting board regulation in your jurisdiction.</li>
            </ul>

            <h2>6. Limitation of Liability</h2>
            <p>
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALECRAE SHALL
              NOT BE LIABLE FOR ANY LOSS, DAMAGE, COST, EXPENSE, CLAIM, SANCTION, PENALTY,
              MALPRACTICE CLAIM, BAR COMPLAINT, DISCIPLINARY ACTION, OR OTHER ADVERSE
              CONSEQUENCE OF ANY KIND ARISING FROM OR IN CONNECTION WITH:</strong>
            </p>
            <ul>
              <li>Any reliance on AI Output, whether or not the AI Output was accurate;</li>
              <li>Any citation, case reference, statutory reference, or regulatory interpretation that was inaccurate, fabricated, outdated, overruled, or inapplicable;</li>
              <li>Any tax calculation, compliance recommendation, or financial analysis that was incorrect;</li>
              <li>Any document generated by the Platform that contained errors;</li>
              <li>Any professional decision made or action taken based on AI Output;</li>
              <li>Any submission to a court, tribunal, regulatory body, or tax authority that contained AI-generated content;</li>
              <li>Any failure to independently verify AI Output before reliance.</li>
            </ul>
            <p>
              This limitation applies regardless of the theory of liability (contract, tort,
              negligence, strict liability, or otherwise) and even if AlecRae has been advised
              of the possibility of such loss or damage.
            </p>
            <p>
              Full limitation of liability terms are set out in our{" "}
              <a href="/terms">Terms of Service</a>.
            </p>

            <h2>7. Jurisdictional Variations</h2>
            <p>
              AlecRae operates across multiple jurisdictions. The following jurisdictional
              notes apply:
            </p>
            <h3>7.1 New Zealand</h3>
            <p>
              Where the New Zealand Consumer Guarantees Act 1993 applies, nothing in this
              Disclaimer excludes or limits rights that cannot be excluded under that Act.
              AlecRae&rsquo;s services are provided for business purposes. Where services are
              acquired for business purposes, the Consumer Guarantees Act does not apply.
            </p>
            <h3>7.2 Australia</h3>
            <p>
              Our services come with guarantees that cannot be excluded under the Australian
              Consumer Law. For major failures with the service, you are entitled to cancel
              your service contract and receive a refund for the unused portion, or to
              compensation for its reduced value. You are also entitled to choose a refund
              or replacement for major failures with goods. If a failure does not amount to
              a major failure, you are entitled to have the failure rectified in a reasonable
              time.
            </p>
            <h3>7.3 United Kingdom</h3>
            <p>
              Nothing in this Disclaimer affects your statutory rights under the UK Consumer
              Rights Act 2015 or other applicable UK consumer protection legislation. Where
              such rights apply and cannot be contractually excluded, this Disclaimer is
              subject to and limited by those rights.
            </p>
            <h3>7.4 United States</h3>
            <p>
              Some US states do not allow the exclusion of implied warranties or the
              limitation of liability for incidental or consequential damages. In such
              states, the limitations set out above may not apply to you in full. In such
              cases, AlecRae&rsquo;s liability is limited to the maximum extent permitted by
              applicable state law.
            </p>

            <h2>8. Unauthorised Practice of Law / Accounting</h2>
            <p>
              AlecRae does not engage in the unauthorised practice of law or accounting in
              any jurisdiction. The Platform is a technology tool used by licensed professionals.
              It does not independently provide advice, appear in court, sign documents, file
              returns, or otherwise engage in activities that constitute the practice of law
              or accounting.
            </p>
            <p>
              If you are not a licensed professional and you use the Platform for self-help
              purposes, you do so at your own risk. The Platform is designed for use by
              qualified professionals and its output is calibrated for professional users who
              can independently evaluate its accuracy and applicability.
            </p>

            <h2>9. Third-Party Services and Content</h2>
            <p>
              The Platform may integrate with or reference third-party services, websites,
              databases, APIs, and content. AlecRae does not control, endorse, or assume
              responsibility for any third-party service or content. Your use of third-party
              services is governed by their respective terms and policies.
            </p>
            <p>
              Citations and research results may reference materials from third-party
              sources including court databases, government websites, regulatory publications,
              and academic repositories. AlecRae does not guarantee the accuracy, availability,
              or completeness of third-party sources.
            </p>

            <h2>10. Medical, Investment, and Other Professional Advice</h2>
            <p>
              The Platform does not provide medical advice, investment advice, financial
              planning advice, insurance advice, or any professional advice outside the scope
              of legal and accounting research assistance. Nothing on the Platform should be
              construed as advice in any discipline.
            </p>

            <h2>11. Contact</h2>
            <p>
              For questions about this Disclaimer, contact us at:
            </p>
            <p>
              <strong>AlecRae Ltd</strong><br />
              Auckland, New Zealand<br />
              Email: legal@alecrae.com<br />
              Web: {BRAND.url}
            </p>

          </div>
        </Container>
      </section>
    </>
  );
}
