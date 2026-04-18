import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Data Processing Agreement",
  description:
    "Marco Reid data processing agreement for business clients. GDPR-compliant data processing terms.",
};

const sections = [
  {
    title: "1. Scope and applicability",
    content:
      "This Data Processing Agreement (\"DPA\") forms part of the Terms of Service between Reid & Associates Ltd (\"Processor\", \"we\") and you (\"Controller\", \"you\") and governs the processing of personal data by us on your behalf. This DPA applies where you upload, store, or process personal data of your clients, employees, or other data subjects through the Marco Reid platform and we act as a data processor under GDPR, UK GDPR, NZ Privacy Act 2020, or other applicable data protection law. Terms not defined herein have the meanings given in the Terms of Service or the GDPR.",
  },
  {
    title: "2. Roles of the parties",
    content:
      "You are the Data Controller — you determine the purposes and means of processing personal data through the Platform. Reid & Associates Ltd is the Data Processor — we process personal data on your behalf and according to your instructions, solely to provide the Platform services. For your own account data (name, email, billing), we are a joint or independent controller as described in our Privacy Policy. For Client Data you upload (your clients' personal information, matter details, documents, trust records), we are your processor.",
  },
  {
    title: "3. Processing instructions",
    content:
      "We will process personal data only on your documented instructions, which are: (a) to provide the Platform services as described in the Terms of Service; (b) to process data in accordance with your use of Platform features (e.g., submitting queries to Marco, dictating via Voice, managing trust accounts); and (c) as otherwise agreed in writing. If we believe an instruction infringes applicable data protection law, we will promptly inform you. We will not process personal data for any other purpose, including our own marketing or analytics, unless the data has been properly anonymised.",
  },
  {
    title: "4. Confidentiality",
    content:
      "We ensure that all personnel authorised to process personal data on your behalf: (a) are bound by contractual obligations of confidentiality; (b) process personal data only on documented instructions; and (c) have received appropriate training in data protection.",
  },
  {
    title: "5. Security measures",
    content:
      "We implement and maintain appropriate technical and organisational security measures to protect personal data against unauthorised or unlawful processing, accidental loss, destruction, or damage. These include:\n\nEncryption: TLS 1.3 in transit, AES-256 at rest.\n\nAccess Controls: Role-based access, principle of least privilege, multi-factor authentication for administrative access.\n\nAudit Logging: Immutable, append-only audit trails of all data access and modifications.\n\nInfrastructure Security: SOC 2 compliant hosting, network segmentation, intrusion detection.\n\nPassword Security: bcrypt hashing with cost factor 12; no plaintext password storage.\n\nBreach Detection: Automated monitoring and alerting for unusual access patterns.\n\nRegular Testing: Periodic security assessments, vulnerability scanning, and penetration testing.\n\nWe will regularly review and update these measures to maintain an appropriate level of security.",
  },
  {
    title: "6. Sub-processors",
    content:
      "You provide general authorisation for us to engage sub-processors to assist in providing the Platform services. Our current sub-processors are:\n\nAnthropic, PBC — AI processing (Claude API) — United States\nOpenAI, Inc. — Voice transcription (Whisper API) — United States\nStripe, Inc. — Payment processing — United States\nNeon, Inc. — Database hosting (PostgreSQL) — United States / Regional\n\nWe will: (a) notify you of any intended changes to sub-processors at least 30 days before the change; (b) ensure each sub-processor is bound by data protection obligations no less protective than those in this DPA; and (c) remain fully liable for the acts and omissions of our sub-processors. If you object to a new sub-processor, you may terminate the affected services by providing written notice within 30 days of our notification.",
  },
  {
    title: "7. Data subject rights",
    content:
      "We will assist you in fulfilling your obligations to respond to data subject rights requests (access, rectification, erasure, portability, restriction, objection) by: (a) providing you with the ability to access, export, correct, and delete Client Data through the Platform's self-service tools; (b) promptly notifying you if we receive a request directly from a data subject (we will not respond to the request directly unless you instruct us to); and (c) providing reasonable technical assistance for requests that cannot be fulfilled through self-service tools.",
  },
  {
    title: "8. Data breach notification",
    content:
      "In the event of a personal data breach affecting data we process on your behalf, we will: (a) notify you without undue delay and in any event within 48 hours of becoming aware of the breach; (b) provide you with sufficient information to meet your obligation to notify the supervisory authority and affected data subjects, including the nature of the breach, categories and approximate number of data subjects affected, likely consequences, and measures taken or proposed to address the breach; (c) cooperate with you and take reasonable steps to assist in investigating, mitigating, and remediating the breach; and (d) not notify any supervisory authority or data subject directly on your behalf unless required by law or instructed by you in writing.",
  },
  {
    title: "9. Data protection impact assessments",
    content:
      "We will provide reasonable assistance to you in conducting data protection impact assessments (DPIAs) and prior consultations with supervisory authorities, where required under Article 35 or 36 of the GDPR, to the extent that such assessment relates to our processing of personal data on your behalf.",
  },
  {
    title: "10. International transfers",
    content:
      "Where personal data is transferred outside the EEA, UK, or other jurisdiction with data transfer restrictions, we will ensure that appropriate safeguards are in place, including: (a) transfers to countries with adequacy decisions (New Zealand holds an EU adequacy decision); (b) EU Standard Contractual Clauses (SCCs) — Module 3 (Processor to Sub-Processor) with our sub-processors; (c) UK International Data Transfer Agreement (IDTA) or UK Addendum to EU SCCs where applicable; and (d) supplementary measures where required by the Schrems II decision. Details of transfer mechanisms for each sub-processor are available upon request.",
  },
  {
    title: "11. Audits",
    content:
      "We will make available to you, upon reasonable request and subject to confidentiality obligations, all information reasonably necessary to demonstrate compliance with this DPA. You may, at your own expense and with reasonable prior notice (not less than 30 days), conduct or commission an audit of our processing activities relevant to this DPA, no more than once per year unless required by a supervisory authority or in response to a data breach. We may satisfy audit requests by providing: (a) existing third-party audit reports (e.g., SOC 2); (b) responses to a reasonable audit questionnaire; or (c) access to relevant personnel for interview.",
  },
  {
    title: "12. Data return and deletion",
    content:
      "Upon termination of the Terms of Service or upon your written request: (a) we will provide you with the ability to export your Client Data in a structured, commonly used, machine-readable format (JSON or CSV); (b) you have 30 days from termination to export your data; (c) after 30 days, we will permanently delete all Client Data from our active systems; (d) Client Data in backup systems will be deleted in accordance with our backup rotation schedule (not to exceed 90 days); and (e) we may retain data where required by law or regulation, in which case it will remain subject to this DPA.",
  },
  {
    title: "13. Duration and termination",
    content:
      "This DPA remains in effect for the duration of your use of the Platform. The obligations in this DPA survive termination to the extent we continue to process personal data on your behalf (e.g., during the data export and deletion period). Termination of this DPA does not release either party from obligations that accrued before termination.",
  },
  {
    title: "14. Governing law",
    content:
      "This DPA is governed by the laws of New Zealand, subject to any mandatory data protection laws that apply by virtue of the location of data subjects. Where the GDPR applies, its provisions take precedence over conflicting terms in this DPA. Where the UK GDPR applies, its provisions take precedence accordingly.",
  },
];

export default function DpaPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Data Processing Agreement
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            How we process data on your behalf, in compliance with GDPR and
            global data protection law.
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
                This Data Processing Agreement (&ldquo;DPA&rdquo;) supplements
                the Marco Reid Terms of Service and governs the processing of
                personal data by Reid &amp; Associates Ltd on behalf of
                Platform users who act as data controllers.
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
                  Need a signed DPA?
                </p>
                <p className="mt-2 text-navy-400">
                  Enterprise clients requiring a countersigned DPA can contact
                  legal@marcoreid.com. This online DPA is binding for all
                  Platform users under the Terms of Service.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
