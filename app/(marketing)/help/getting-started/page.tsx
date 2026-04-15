import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Getting started with Marco Reid",
  description:
    "A step-by-step walkthrough for new firms \u2014 from account creation to your first Marco query and enabling Voice dictation.",
};

const steps = [
  {
    title: "Create your account",
    paragraphs: [
      "Head to the sign-up page and enter your work email, a strong password, and your full legal name. We send a verification link within seconds \u2014 click it from the same device you signed up on to finish account creation.",
      "If your firm is already on Marco Reid, ask your administrator to send you a seat invitation instead. Accepting an invitation joins you directly to the firm workspace with the role they chose.",
      "Multi-factor authentication is mandatory. During first login we\u2019ll walk you through pairing an authenticator app or a hardware security key. We recommend both \u2014 the hardware key as your primary, the app as backup.",
    ],
    screenshot:
      "Sign-up screen with the firm workspace selector and the mandatory MFA step.",
  },
  {
    title: "Set up your firm profile",
    paragraphs: [
      "Your firm profile is the centre of everything. Add your legal entity name, registered address, primary jurisdiction, and practice areas. Marco uses your jurisdiction to prioritise the right statutes and case law when you run a query.",
      "If you operate across multiple jurisdictions \u2014 for example New York and New Jersey \u2014 add each one. You can switch the active jurisdiction per matter later.",
      "Upload your firm logo and letterhead template. Marco Reid applies them to generated documents, invoices, and exported reports automatically.",
    ],
    screenshot:
      "Firm profile page showing jurisdictions, practice areas, and letterhead upload.",
  },
  {
    title: "Add your first client",
    paragraphs: [
      "Clients live separately from matters. You can have several matters open for the same client over time, and they all roll up to a single client record with a consolidated billing view.",
      "Enter the client\u2019s full legal name, contact details, and billing entity. For institutional clients, add the main point of contact and any secondary contacts authorised to receive privileged communication.",
      "Conflict checks run automatically when you save a new client. If Marco Reid finds a potential conflict against an existing client or matter, the record is flagged and an admin must clear it before you can open a matter.",
    ],
    screenshot:
      "New client form with conflict-check banner and billing entity fields.",
  },
  {
    title: "Open your first matter",
    paragraphs: [
      "From the client record, click \u201cOpen matter.\u201d Give the matter a clear internal title, choose the practice area, and set the responsible attorney or accountant. The matter inherits the client\u2019s jurisdiction by default \u2014 change it if the matter is governed elsewhere.",
      "Choose a fee arrangement: hourly, flat fee, contingency, or retainer. Retainer matters automatically link to a trust account so funds stay segregated.",
      "Add the initial participants \u2014 the team members who should see this matter. Everyone else in the firm is locked out until granted access.",
    ],
    screenshot:
      "Matter creation screen with fee arrangement and participant selector.",
  },
  {
    title: "Run your first Marco query",
    paragraphs: [
      "Press \u2318K from anywhere in the app to open the command palette. Type a research question in plain English \u2014 the more specific the better. For example: \u201cWhat is the statute of limitations for breach of contract in New York for a written agreement?\u201d",
      "Marco drafts a response, pulls relevant statutes and case law, and marks every citation with its verification status. Click any VERIFIED citation to read the source; UNVERIFIED citations show why verification failed.",
      "Save the result to the matter with one click. It becomes part of the matter\u2019s research folder and is searchable by every authorised team member.",
    ],
    screenshot:
      "\u2318K command palette open with a research query and the verified result panel.",
  },
  {
    title: "Enable Marco Reid Voice",
    paragraphs: [
      "Voice turns dictation into structured notes. Open any matter, click the microphone icon, and start speaking. Marco transcribes in real time and auto-formats headings, lists, and action items.",
      "On first use you\u2019ll grant microphone permission and choose a dictation profile \u2014 attorney, CPA, or general. The profile biases the language model toward the vocabulary of your practice so obscure terms transcribe cleanly.",
      "Once you\u2019re finished, Marco offers to file the note to the matter, draft a client update email, or generate a follow-up task list. Everything is editable before it\u2019s saved.",
    ],
    screenshot:
      "Voice dictation panel with live transcription and post-dictation actions.",
  },
];

const nextSteps = [
  {
    title: "Marco research in depth",
    description:
      "How citation verification works, how to write sharper queries, and when to trust AI output.",
    href: "/help/marco-research",
  },
  {
    title: "Trust accounts & IOLTA",
    description:
      "Open a trust account, record deposits, and run three-way reconciliation.",
    href: "/help/trust-accounts",
  },
  {
    title: "Billing & subscriptions",
    description:
      "Add seats, manage payment methods, and understand the Stripe billing portal.",
    href: "/help/billing",
  },
];

export default function GettingStartedPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Help centre &middot; Getting started
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Getting started with Marco Reid.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Six steps, about ten minutes, and your firm is live. Work through
            them in order or skip to whichever you need.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-20">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={0.05}>
                  <article>
                    <div className="flex items-center gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-500 font-serif text-xl text-white">
                        {i + 1}
                      </div>
                      <h2 className="font-serif text-headline text-navy-800">
                        {step.title}
                      </h2>
                    </div>
                    <div className="mt-6 space-y-5">
                      {step.paragraphs.map((p, j) => (
                        <p
                          key={j}
                          className="text-lg leading-relaxed text-navy-500"
                        >
                          {p}
                        </p>
                      ))}
                      <div className="mt-8 rounded-2xl border border-dashed border-navy-200 bg-navy-50 px-6 py-10">
                        <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                          Screenshot
                        </p>
                        <p className="mt-2 text-sm text-navy-500">
                          {step.screenshot}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Next steps">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Next steps.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Once the basics are in place, these guides take you deeper.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {nextSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <Link
                  href={s.href}
                  className="group block h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <h3 className="font-serif text-xl text-navy-800">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {s.description}
                  </p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-forest-600">
                    Read guide &rarr;
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
