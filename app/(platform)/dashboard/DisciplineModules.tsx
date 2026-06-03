import Link from "next/link";

// -----------------------------------------------------------------------
// Discipline detection
// -----------------------------------------------------------------------

export type Discipline = "LEGAL" | "ACCOUNTING" | "GENERAL";

export function detectDiscipline(practiceArea: string | null | undefined): Discipline {
  if (!practiceArea) return "GENERAL";
  const lower = practiceArea.toLowerCase();

  const legalKeywords = [
    "law",
    "legal",
    "attorney",
    "lawyer",
    "barrister",
    "solicitor",
    "conveyancing",
    "litigation",
    "immigration",
  ];
  const accountingKeywords = [
    "account",
    "cpa",
    "tax",
    "audit",
    "bookkeeping",
    "financial",
    "chartered",
  ];

  const isLegal = legalKeywords.some((kw) => lower.includes(kw));
  const isAccounting = accountingKeywords.some((kw) => lower.includes(kw));

  if (isLegal && isAccounting) return "GENERAL";
  if (isLegal) return "LEGAL";
  if (isAccounting) return "ACCOUNTING";
  return "GENERAL";
}

// -----------------------------------------------------------------------
// Module tile data
// -----------------------------------------------------------------------

type ModuleTile = {
  title: string;
  subtitle: string;
  href: string;
  emoji: string;
};

const LEGAL_MODULES: ModuleTile[] = [
  {
    title: "Matters",
    subtitle: "Manage all client matters",
    href: "/matters",
    emoji: "⚖️",
  },
  {
    title: "Trust Accounts",
    subtitle: "IOLTA-compliant trust management",
    href: "/trust",
    emoji: "🔒",
  },
  {
    title: "Court Calendaring",
    subtitle: "Deadline calculator, court rules",
    href: "/tools/court-rules",
    emoji: "📅",
  },
  {
    title: "Document AI",
    subtitle: "Draft, edit, and sign documents",
    href: "/documents",
    emoji: "📝",
  },
  {
    title: "Client Portal",
    subtitle: "What your clients see",
    href: "/portal",
    emoji: "🏛️",
  },
  {
    title: "Billing & Time",
    subtitle: "Time entries and invoices",
    href: "/billing",
    emoji: "⏱️",
  },
  {
    title: "E-Signatures",
    subtitle: "Send documents for signing",
    href: "/signatures",
    emoji: "✍️",
  },
  {
    title: "Conflict Check",
    subtitle: "Check for conflicts of interest",
    href: "/tools/conflict-check",
    emoji: "🛡️",
  },
];

const ACCOUNTING_MODULES: ModuleTile[] = [
  {
    title: "Bank Feeds",
    subtitle: "Live bank connections via Plaid",
    href: "/bank-feeds",
    emoji: "🏦",
  },
  {
    title: "Tax Compliance",
    subtitle: "GST, VAT, income tax management",
    href: "/tax-calculator",
    emoji: "📊",
  },
  {
    title: "Payroll",
    subtitle: "Multi-jurisdiction payroll",
    href: "/payroll",
    emoji: "💼",
  },
  {
    title: "Catch-Up Centre",
    subtitle: "Reconstruct years of unfiled returns",
    href: "/catch-up-centre",
    emoji: "🔄",
  },
  {
    title: "Client Management",
    subtitle: "Engagements, fees, contacts",
    href: "/clients",
    emoji: "👥",
  },
  {
    title: "Invoices",
    subtitle: "Create and send invoices",
    href: "/billing/invoices",
    emoji: "🧾",
  },
  {
    title: "Document Editor",
    subtitle: "Engagement letters, financial statements",
    href: "/documents",
    emoji: "📄",
  },
  {
    title: "Marco Accounting",
    subtitle: "AI tax research",
    href: "/marco/accounting",
    emoji: "🤖",
  },
];

// -----------------------------------------------------------------------
// Module tile component
// -----------------------------------------------------------------------

function ModuleTile({
  tile,
  accentColor,
}: {
  tile: ModuleTile;
  accentColor: "plum" | "forest";
}) {
  return (
    <Link
      href={tile.href}
      className={`group flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover ${
        accentColor === "plum"
          ? "border-l-4 border-l-plum-400"
          : "border-l-4 border-l-forest-400"
      }`}
    >
      <span className="text-2xl" aria-hidden="true">
        {tile.emoji}
      </span>
      <p className="mt-2 font-semibold text-navy-700 group-hover:text-navy-900">
        {tile.title}
      </p>
      <p className="mt-1 text-xs text-navy-400">{tile.subtitle}</p>
    </Link>
  );
}

// -----------------------------------------------------------------------
// Module grid section
// -----------------------------------------------------------------------

function ModuleSection({
  heading,
  tiles,
  accentColor,
}: {
  heading: string;
  tiles: ModuleTile[];
  accentColor: "plum" | "forest";
}) {
  return (
    <div>
      <h2 className="font-serif text-headline text-navy-800">{heading}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <ModuleTile key={tile.href + tile.title} tile={tile} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// DisciplineModules — server component
// -----------------------------------------------------------------------

interface DisciplineModulesProps {
  practiceArea: string | null | undefined;
}

export default function DisciplineModules({ practiceArea }: DisciplineModulesProps) {
  const discipline = detectDiscipline(practiceArea);

  if (discipline === "LEGAL") {
    return (
      <div className="mt-12">
        <ModuleSection
          heading="Your legal practice tools"
          tiles={LEGAL_MODULES}
          accentColor="plum"
        />
      </div>
    );
  }

  if (discipline === "ACCOUNTING") {
    return (
      <div className="mt-12">
        <ModuleSection
          heading="Your accounting practice tools"
          tiles={ACCOUNTING_MODULES}
          accentColor="forest"
        />
      </div>
    );
  }

  // GENERAL — show both side by side on large screens
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-2">
      <ModuleSection
        heading="Legal practice tools"
        tiles={LEGAL_MODULES}
        accentColor="plum"
      />
      <ModuleSection
        heading="Accounting practice tools"
        tiles={ACCOUNTING_MODULES}
        accentColor="forest"
      />
    </div>
  );
}
