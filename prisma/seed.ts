import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local or your environment."
  );
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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
