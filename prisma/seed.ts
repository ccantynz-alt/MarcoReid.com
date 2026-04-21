import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

// Beachhead practice areas for the NZ + AU soft launch. Each ackBullets
// array is the plain-language click-through a citizen sees when starting
// an intake for that specific matter type — layered on top of the global
// signup acknowledgment so the record is granular, not generic.
const PRACTICE_AREAS = [
  {
    slug: "nz-tenancy-dispute",
    name: "Tenancy dispute (NZ)",
    domain: "LAW" as const,
    jurisdiction: "NZ",
    summary:
      "Bond, rent arrears, repairs, 14-day notices, Tenancy Tribunal applications.",
    intakeCopy:
      "Tell us what happened with your tenancy. Marco drafts the Tenancy Tribunal application, a qualified NZ lawyer reviews and signs it off before anything is filed.",
    leadFeeInCents: 4900,
    currency: "NZD",
    priority: 100,
    ackBullets: [
      "Tenancy disputes are decided by the NZ Tenancy Tribunal, not Marco Reid. Marco Reid prepares the paperwork; the Tribunal decides the outcome.",
      "My matter will be reviewed and signed off by a lawyer admitted in New Zealand before any document is filed or sent.",
      "Statutory time limits (e.g. 14-day and 42-day notices, bond refund deadlines) apply and are my responsibility to meet.",
      "Lead fee is a flat NZD $49 paid to Marco Reid for intake and matching. Any further fees charged by the lawyer are separate and disclosed up-front.",
    ],
  },
  {
    slug: "nz-sme-catch-up",
    name: "SME tax catch-up (NZ)",
    domain: "ACCOUNTING" as const,
    jurisdiction: "NZ",
    summary:
      "Years of unfiled GST, income tax, and provisional tax reconstructed and filed.",
    intakeCopy:
      "Upload whatever records you have — bank exports, invoices, shoeboxes. Marco reconstructs the books, recalculates every GST and tax period, and a NZ chartered accountant signs off before anything is lodged with IR.",
    leadFeeInCents: 14900,
    currency: "NZD",
    priority: 95,
    ackBullets: [
      "Marco Reid will reconstruct my records using AI. A chartered accountant (CA ANZ member) reviews and signs off every return before it is filed with Inland Revenue.",
      "Penalty remission and tax-debt negotiation outcomes depend on IR's discretion. Marco Reid cannot guarantee any specific outcome.",
      "I am responsible for the accuracy of the records I provide. Missing or misleading records may affect the result.",
      "Lead fee is a flat NZD $149. Filing and preparation fees charged by the accountant are separate and disclosed before work starts.",
    ],
  },
  {
    slug: "au-tenancy-dispute",
    name: "Residential tenancy dispute (AU)",
    domain: "LAW" as const,
    jurisdiction: "AU",
    summary:
      "Bond, rent arrears, repairs, termination — NCAT, VCAT, QCAT and state equivalents.",
    intakeCopy:
      "Describe the issue with your tenancy. Marco drafts the application for the relevant state tribunal (NCAT in NSW, VCAT in VIC, QCAT in QLD, etc). An Australian-admitted lawyer signs off before filing.",
    leadFeeInCents: 4900,
    currency: "AUD",
    priority: 90,
    ackBullets: [
      "Residential tenancy disputes in Australia are heard by the relevant state tribunal (NCAT, VCAT, QCAT, SAT, ACAT, TASCAT, NTCAT). Marco Reid prepares the application; the tribunal decides the outcome.",
      "My matter will be reviewed and signed off by a lawyer admitted to practise in the relevant Australian state or territory before any document is filed.",
      "State-specific deadlines apply (for example, 14-day termination notices under the RTA). Missing a deadline may forfeit my claim.",
      "Lead fee is a flat AUD $49 paid to Marco Reid for intake and matching. Lawyer fees are separate and disclosed up-front.",
    ],
  },
  {
    slug: "au-sme-catch-up",
    name: "SME tax catch-up (AU)",
    domain: "ACCOUNTING" as const,
    jurisdiction: "AU",
    summary:
      "Years of unfiled BAS, income tax, and PAYG reconstructed and lodged with the ATO.",
    intakeCopy:
      "Upload what you have — Xero/MYOB exports, bank statements, invoices. Marco rebuilds the books and recalculates every BAS and tax period. A registered tax agent reviews and signs off before lodgement with the ATO.",
    leadFeeInCents: 14900,
    currency: "AUD",
    priority: 85,
    ackBullets: [
      "Lodgement with the ATO is performed by a registered tax agent. Marco Reid is not a registered tax agent; it is a platform that prepares draft work for the tax agent's review.",
      "Penalty remission and payment-arrangement outcomes depend on ATO discretion. Marco Reid cannot guarantee any specific outcome.",
      "I am responsible for the completeness and accuracy of the records I upload. Undisclosed income or liabilities may affect the result.",
      "Lead fee is a flat AUD $149. Tax agent preparation and lodgement fees are separate and disclosed before work starts.",
    ],
  },
  {
    slug: "nz-employment-dispute",
    name: "Employment dispute (NZ)",
    domain: "LAW" as const,
    jurisdiction: "NZ",
    summary:
      "Personal grievances, unjustified dismissal, raising an ERA claim, mediation briefs.",
    intakeCopy:
      "Tell us what happened at work — the dismissal, the discrimination, the unpaid wages, the bullying. Marco drafts the personal grievance letter, mediation brief, or ERA statement of problem. A NZ-admitted employment lawyer signs off before anything is sent to your employer, MBIE mediation, or the Employment Relations Authority.",
    leadFeeInCents: 9900,
    currency: "NZD",
    priority: 80,
    ackBullets: [
      "Personal grievances must be raised within 90 days of the act (or of when I became aware of it). Missing the deadline generally forfeits the claim.",
      "My matter will be reviewed and signed off by a lawyer admitted in New Zealand before anything is sent to my employer, MBIE, or the ERA.",
      "Outcomes are decided by my employer, the mediator, or the Employment Relations Authority — not by Marco Reid.",
      "Lead fee is a flat NZD $99 paid to Marco Reid. Lawyer fees are separate and disclosed before work starts.",
    ],
  },
  {
    slug: "nz-family-separation",
    name: "Separation & parenting (NZ)",
    domain: "LAW" as const,
    jurisdiction: "NZ",
    summary:
      "Separation agreements, parenting orders, day-to-day care arrangements under the Care of Children Act.",
    intakeCopy:
      "Describe your situation: who lives where, who the children are with, who pays what. Marco drafts the separation agreement or parenting plan under NZ law. A NZ family lawyer reviews and signs off before it's shared with the other party or filed with the Family Court.",
    leadFeeInCents: 9900,
    currency: "NZD",
    priority: 75,
    ackBullets: [
      "Separation agreements must be signed and certified by each party's lawyer to be binding under the Property (Relationships) Act 1976. Marco Reid organises the paperwork; each party still needs independent legal advice.",
      "Parenting arrangements that affect children must consider the child's welfare and best interests as the paramount consideration under the Care of Children Act 2004.",
      "My matter will be reviewed and signed off by a lawyer admitted in New Zealand before anything is sent to the other party or filed with the Court.",
      "Lead fee is a flat NZD $99. Further legal fees (including independent certification fees) are separate and disclosed up-front.",
    ],
  },
  {
    slug: "nz-wills-estates",
    name: "Wills & simple estates (NZ)",
    domain: "LAW" as const,
    jurisdiction: "NZ",
    summary:
      "Will drafting, enduring powers of attorney, simple probate applications.",
    intakeCopy:
      "Tell us who you are, what you own, and who you'd like to benefit. Marco drafts the will, EPAs (property + personal care), or probate application. A NZ-admitted lawyer signs off before any document is executed or filed with the High Court.",
    leadFeeInCents: 7900,
    currency: "NZD",
    priority: 70,
    ackBullets: [
      "A will is only valid under the Wills Act 2007 if signed and witnessed correctly. Marco Reid prepares the document; execution formalities must be followed exactly.",
      "Enduring powers of attorney must be signed in front of a qualified witness (a lawyer, legal executive, or authorised officer of a trustee corporation).",
      "Complex estates (contested wills, overseas assets, trusts, Family Protection Act claims) may be outside the scope of this service.",
      "Lead fee is a flat NZD $79. Lawyer fees for drafting and execution are separate and disclosed before work starts.",
    ],
  },
  {
    slug: "nz-disputes-tribunal",
    name: "Small claim — Disputes Tribunal (NZ)",
    domain: "LAW" as const,
    jurisdiction: "NZ",
    summary:
      "Claims up to $30,000 — unpaid invoices, consumer disputes, property damage, service failures.",
    intakeCopy:
      "Describe the dispute: who owes what, what was promised, what went wrong. Marco drafts the Disputes Tribunal application. Disputes Tribunal hearings don't use lawyers — but Marco Reid still has a NZ-admitted lawyer review the application for legal merit before you file.",
    leadFeeInCents: 4900,
    currency: "NZD",
    priority: 65,
    ackBullets: [
      "The Disputes Tribunal does not allow lawyer representation at hearings. Marco Reid drafts the application and has a lawyer review its legal merit; I represent myself at the hearing.",
      "The Tribunal can hear claims up to $30,000. Larger or more complex matters should go to the District Court.",
      "Tribunal referees decide on a substantial-merits basis and are not strictly bound by law. Outcomes vary.",
      "Lead fee is a flat NZD $49. The Tribunal's own filing fee is separate and paid to the Ministry of Justice.",
    ],
  },
  {
    slug: "nz-immigration",
    name: "Immigration & visa appeals (NZ)",
    domain: "LAW" as const,
    jurisdiction: "NZ",
    summary:
      "Residence applications, work visa reconsiderations, IPT appeals, s61 requests.",
    intakeCopy:
      "Tell us your visa history, your circumstances, and what INZ decided (or didn't). Marco drafts the reconsideration, IPT appeal, or s61 request. A lawyer or licensed immigration adviser signs off before anything is lodged with Immigration New Zealand or the Tribunal.",
    leadFeeInCents: 14900,
    currency: "NZD",
    priority: 60,
    ackBullets: [
      "Immigration advice in New Zealand can only be given by a lawyer or a licensed immigration adviser under the Immigration Advisers Licensing Act 2007. Marco Reid matches you with a licensed provider.",
      "Time limits for reconsiderations (typically 14 days for temporary visas) and IPT appeals (typically 28 or 42 days depending on decision type) are strict.",
      "Outcomes are decided by INZ or the Immigration and Protection Tribunal. Marco Reid cannot guarantee any specific outcome.",
      "Lead fee is a flat NZD $149. Adviser or lawyer fees and INZ's own lodgement fees are separate and disclosed up-front.",
    ],
  },
  {
    slug: "au-employment-dispute",
    name: "Employment dispute (AU)",
    domain: "LAW" as const,
    jurisdiction: "AU",
    summary:
      "Unfair dismissal, general protections, Fair Work Commission applications, underpayment claims.",
    intakeCopy:
      "Describe what happened at work — the dismissal, the adverse action, the unpaid entitlements. Marco drafts the Fair Work Commission application (F2 unfair dismissal, F8 general protections) or underpayment claim. An Australian-admitted employment lawyer signs off before anything is filed.",
    leadFeeInCents: 9900,
    currency: "AUD",
    priority: 80,
    ackBullets: [
      "Unfair dismissal applications must be lodged within 21 days of the dismissal taking effect. Missing the deadline generally forfeits the claim.",
      "My matter will be reviewed and signed off by a lawyer admitted to practise in an Australian state or territory before anything is filed with the Fair Work Commission or Federal Circuit and Family Court.",
      "Outcomes are decided by the FWC, the Court, or negotiated settlement — not by Marco Reid.",
      "Lead fee is a flat AUD $99. Lawyer fees are separate and disclosed before work starts.",
    ],
  },
  {
    slug: "au-family-separation",
    name: "Separation & parenting (AU)",
    domain: "LAW" as const,
    jurisdiction: "AU",
    summary:
      "Parenting orders, consent orders, binding financial agreements under the Family Law Act.",
    intakeCopy:
      "Describe your situation: living arrangements, children, assets, and what you'd like to happen. Marco drafts the parenting plan, consent order application, or binding financial agreement. An Australian family lawyer reviews and signs off before filing with the Federal Circuit and Family Court of Australia.",
    leadFeeInCents: 9900,
    currency: "AUD",
    priority: 75,
    ackBullets: [
      "Binding financial agreements (BFAs) are only enforceable if each party has received independent legal advice and a lawyer has signed a certificate. Marco Reid organises the paperwork; each party still needs independent advice.",
      "Parenting arrangements must treat the child's best interests as the paramount consideration under the Family Law Act 1975.",
      "My matter will be reviewed and signed off by a lawyer admitted to practise in an Australian state or territory before filing with the FCFCOA.",
      "Lead fee is a flat AUD $99. Lawyer fees (including the independent-advice certificate) are separate.",
    ],
  },
  {
    slug: "au-wills-estates",
    name: "Wills & simple estates (AU)",
    domain: "LAW" as const,
    jurisdiction: "AU",
    summary:
      "Will drafting, enduring powers of attorney, simple probate applications.",
    intakeCopy:
      "Tell us who you are, what you own, and who you'd like to benefit. Marco drafts the will, EPOA, advance care directive, or probate application for your state. An Australian-admitted lawyer signs off before any document is executed or filed with the Supreme Court.",
    leadFeeInCents: 7900,
    currency: "AUD",
    priority: 70,
    ackBullets: [
      "Will execution requirements (witnessing, signing) vary by state and territory. Marco Reid prepares the document; execution formalities must be followed exactly for the will to be valid.",
      "Enduring powers of attorney and advance care directives are governed by state-specific legislation and have state-specific witnessing rules.",
      "Complex estates (contested wills, overseas assets, trusts, family provision claims) may be outside the scope of this service.",
      "Lead fee is a flat AUD $79. Lawyer fees for drafting and execution are separate and disclosed before work starts.",
    ],
  },
  {
    slug: "au-small-claims",
    name: "Small claim — state tribunal (AU)",
    domain: "LAW" as const,
    jurisdiction: "AU",
    summary:
      "Consumer and commercial claims under state tribunal limits — NCAT, VCAT, QCAT and equivalents.",
    intakeCopy:
      "Describe the dispute: unpaid invoices, defective goods, consumer issues, minor contract disputes. Marco drafts the application for the relevant state tribunal. Most state tribunals don't allow legal representation at hearing — but we still have a lawyer review the application for legal merit before you file.",
    leadFeeInCents: 4900,
    currency: "AUD",
    priority: 65,
    ackBullets: [
      "Most state civil tribunals (NCAT, VCAT, QCAT, SACAT, SAT, ACAT) restrict legal representation at hearings. Marco Reid drafts the application and has a lawyer review its legal merit; I usually represent myself at the hearing.",
      "Monetary limits vary by state (generally $15,000–$40,000 for consumer/commercial matters). Larger matters must go to the Magistrates/Local Court.",
      "Tribunal members decide on a substantial-merits basis. Outcomes vary.",
      "Lead fee is a flat AUD $49. The tribunal's own filing fee is separate.",
    ],
  },
  {
    slug: "au-immigration",
    name: "Immigration & visa appeals (AU)",
    domain: "LAW" as const,
    jurisdiction: "AU",
    summary:
      "Visa applications, refusal reviews, AAT appeals, Ministerial intervention requests.",
    intakeCopy:
      "Tell us your visa history, your circumstances, and what Home Affairs decided. Marco drafts the application for review, AAT appeal, or Ministerial intervention request. An Australian-registered migration agent or immigration lawyer signs off before anything is lodged.",
    leadFeeInCents: 14900,
    currency: "AUD",
    priority: 60,
    ackBullets: [
      "Immigration assistance in Australia can only be given by a registered migration agent (MARA registered) or an Australian legal practitioner. Marco Reid matches you with a registered provider.",
      "Time limits for AAT review (generally 21 or 28 days depending on visa type) and Ministerial intervention are strict and missing them generally forfeits the appeal right.",
      "Outcomes are decided by Home Affairs, the AAT, or the Minister — not by Marco Reid.",
      "Lead fee is a flat AUD $149. Migration agent or lawyer fees and Home Affairs lodgement fees are separate.",
    ],
  },
  {
    slug: "nz-sole-trader-tax",
    name: "Sole trader & contractor tax (NZ)",
    domain: "ACCOUNTING" as const,
    jurisdiction: "NZ",
    summary:
      "Annual tax returns, GST registration and filing, provisional tax for sole traders and contractors.",
    intakeCopy:
      "Upload your income records (invoices, bank statements, payment summaries) and any business expense records. Marco prepares your IR3, GST returns, and provisional tax calculations. A NZ chartered accountant signs off before lodgement with Inland Revenue.",
    leadFeeInCents: 7900,
    currency: "NZD",
    priority: 55,
    ackBullets: [
      "Marco Reid will prepare your tax returns using AI. A chartered accountant (CA ANZ member) reviews and signs off every return before it's filed with Inland Revenue.",
      "Income and expense accuracy is my responsibility. Marco Reid works from the records I provide.",
      "Provisional tax, ACC levies, and KiwiSaver obligations are calculated on the same records. Under-disclosure may lead to use-of-money interest and penalties.",
      "Lead fee is a flat NZD $79. Further accounting fees are separate and disclosed before work starts.",
    ],
  },
  {
    slug: "au-sole-trader-tax",
    name: "Sole trader & contractor tax (AU)",
    domain: "ACCOUNTING" as const,
    jurisdiction: "AU",
    summary:
      "Annual tax returns, BAS lodgement, PAYG instalments for sole traders and ABN contractors.",
    intakeCopy:
      "Upload your income and expense records. Marco prepares your individual tax return (with business schedule), BAS, and PAYG instalment variations. A registered tax agent signs off before lodgement with the ATO.",
    leadFeeInCents: 7900,
    currency: "AUD",
    priority: 55,
    ackBullets: [
      "Lodgement with the ATO is performed by a registered tax agent. Marco Reid is not a registered tax agent.",
      "Income and expense accuracy is my responsibility. Marco Reid works from the records I provide.",
      "GST, PAYG instalment, and superannuation guarantee obligations are calculated on the same records. Under-disclosure may lead to interest and penalties.",
      "Lead fee is a flat AUD $79. Further accounting fees are separate and disclosed before work starts.",
    ],
  },
  {
    slug: "nz-company-formation",
    name: "Company formation & cross-border structure (NZ)",
    domain: "LAW" as const,
    jurisdiction: "NZ",
    summary:
      "Full company setup — NZ Ltd, family trusts, and cross-border overlays (Wyoming LLC, Delaware C-Corp, Cook Islands trust) designed for maximum asset protection.",
    intakeCopy:
      "Tell Marco who you are, what you're building, where your customers live, and how aggressively you want to protect your assets. Marco designs the full structure — holding company, operating entities, trust layers, IP licensing, and tax flow — and drafts every form, resolution, and intercompany agreement. A NZ-admitted lawyer signs off the overall plan; any US or offshore components are packaged for your local attorney to execute.",
    leadFeeInCents: 24900,
    currency: "NZD",
    priority: 110,
    ackBullets: [
      "Marco Reid designs the structure and drafts the paperwork. A lawyer admitted in New Zealand reviews and signs off the overall plan before any entity is formed.",
      "Cross-border structures (US LLCs, Delaware C-Corps, Cook Islands trusts, etc.) are packaged ready-to-execute — but the foreign entity is always formed by a lawyer admitted in that jurisdiction. Marco Reid coordinates, the local attorney executes.",
      "Tax outcomes depend on IRD rulings, NZ–US / NZ–AU tax treaties, and CFC / FIF rules. Structure recommendations always require independent confirmation by a chartered accountant before any entity is formed.",
      "Asset-protection levels ('standard', 'aggressive', 'maximum') are design goals, not guarantees. A determined creditor with a court order can reach most assets; proper structure raises the cost and difficulty of reaching them.",
      "Lead fee is a flat NZD $249 for the intake + structure design. Lawyer sign-off, overseas attorney fees, and companies-office / ASIC / Wyoming SOS / IRS filing fees are separate and disclosed up-front.",
    ],
  },
  {
    slug: "au-company-formation",
    name: "Company formation & cross-border structure (AU)",
    domain: "LAW" as const,
    jurisdiction: "AU",
    summary:
      "Full company setup — Pty Ltd, discretionary trusts, and cross-border overlays (Wyoming LLC, Delaware C-Corp, Cook Islands trust) designed for maximum asset protection.",
    intakeCopy:
      "Tell Marco who you are, what you're building, where your customers live, and how aggressively you want to protect your assets. Marco designs the full structure — Pty Ltd, discretionary or unit trust, US operating entity, IP licensing, and tax flow — and drafts every form, resolution, and intercompany agreement. An Australian-admitted lawyer signs off the overall plan; any US or offshore components are packaged for your local attorney.",
    leadFeeInCents: 24900,
    currency: "AUD",
    priority: 110,
    ackBullets: [
      "Marco Reid designs the structure and drafts the paperwork. A lawyer admitted in an Australian state or territory reviews and signs off the overall plan before any entity is formed.",
      "Cross-border structures (US LLCs, Delaware C-Corps, Cook Islands trusts, etc.) are packaged ready-to-execute — but the foreign entity is always formed by a lawyer admitted in that jurisdiction. Marco Reid coordinates, the local attorney executes.",
      "Tax outcomes depend on ATO rulings, AU–US / AU–NZ tax treaties, and CFC / controlled entity rules. Structure recommendations always require independent confirmation by a registered tax agent before any entity is formed.",
      "Asset-protection levels ('standard', 'aggressive', 'maximum') are design goals, not guarantees. A determined creditor with a court order can reach most assets; proper structure raises the cost and difficulty of reaching them.",
      "Lead fee is a flat AUD $249 for the intake + structure design. Lawyer sign-off, overseas attorney fees, and ASIC / Wyoming SOS / IRS filing fees are separate and disclosed up-front.",
    ],
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@marcoreid.com";
  const password = process.env.ADMIN_PASSWORD || "changeme123";

  const passwordHash = await hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Craig Cantyn",
      passwordHash,
      role: "ADMIN",
      firmName: "Marco Reid",
    },
  });

  console.log(`Admin user: ${admin.email} (${admin.role})`);

  for (const pa of PRACTICE_AREAS) {
    const row = await prisma.practiceArea.upsert({
      where: { slug: pa.slug },
      update: {
        name: pa.name,
        summary: pa.summary,
        intakeCopy: pa.intakeCopy,
        leadFeeInCents: pa.leadFeeInCents,
        currency: pa.currency,
        priority: pa.priority,
        ackBullets: pa.ackBullets,
      },
      create: pa,
    });
    console.log(`Practice area: ${row.slug} (${row.jurisdiction})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
