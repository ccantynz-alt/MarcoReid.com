import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import FAQ from "@/app/components/shared/FAQ";
import { JURISDICTIONS } from "@/lib/jurisdictions";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/services";
import { BRAND } from "@/lib/constants";

const VALID_COUNTRIES = ["nz", "au", "uk", "us", "ca", "ie", "sg"] as const;
type CountrySlug = (typeof VALID_COUNTRIES)[number];

const COUNTRY_MAP: Record<CountrySlug, string> = {
  nz: "NZ",
  au: "AU",
  uk: "UK",
  us: "US",
  ca: "CA",
  ie: "IE",
  sg: "SG",
};

function isValidCountry(slug: string): slug is CountrySlug {
  return VALID_COUNTRIES.includes(slug as CountrySlug);
}

// Country-specific legal context for each service
const COUNTRY_CONTEXT: Record<string, Record<string, string>> = {
  NZ: {
    wills: "In New Zealand, wills must comply with the Wills Act 2007. A will must be in writing, signed by the testator (who must be 18 or older), and witnessed by two independent witnesses who are present at the same time.",
    "enduring-power-of-attorney": "In New Zealand, EPAs are governed by the Protection of Personal and Property Rights Act 1988. You can appoint an attorney for property and/or personal care and welfare.",
    probate: "Probate in New Zealand is governed by the Administration Act 1969. Applications are filed in the High Court. If the estate value is below $15,000, probate may not be required.",
    "family-trusts": "New Zealand trusts are governed by the Trusts Act 2019. This reformed trust law, introducing mandatory trustee duties, beneficiary information rights, and a maximum trust duration of 125 years.",
    conveyancing: "New Zealand conveyancing typically uses the Auckland District Law Society (ADLS) Agreement for Sale and Purchase. Lawyers must hold trust account funds under the Lawyers and Conveyancers Act 2006.",
    "company-formation": "Companies in New Zealand are registered with the Companies Office under the Companies Act 1993. A company needs at least one director who is a New Zealand resident.",
    "individual-tax-returns": "New Zealand individual tax returns (IR3) are filed with Inland Revenue for the tax year ending 31 March. If you have only salary/wage income, your tax is generally handled automatically through PAYE.",
    "gst-vat-returns": "New Zealand GST is currently 15% and is filed on GST101A returns. Registration is mandatory if turnover exceeds $60,000 in any 12-month period.",
    "work-visas": "New Zealand work visas are managed by Immigration New Zealand (INZ). The Accredited Employer Work Visa (AEWV) is the primary employer-supported visa pathway.",
    "residence-visas": "New Zealand residence can be obtained through the Skilled Migrant Category, family stream, or investor categories. The Green List provides a direct pathway for certain occupations.",
    "catch-up-filing": "Inland Revenue New Zealand can impose penalties of up to $250 per return for late filing, plus use-of-money interest on unpaid tax. Voluntary disclosure before an audit may reduce penalties.",
  },
  AU: {
    wills: "In Australia, will requirements vary by state and territory. Generally, a will must be in writing, signed by the testator (18+), and witnessed by two people. Each state has its own Succession Act.",
    "enduring-power-of-attorney": "Australian power of attorney laws vary by state. In most states, an enduring power of attorney covers financial matters, while an Advance Health Directive covers medical decisions.",
    probate: "Probate in Australia is granted by the Supreme Court of the relevant state or territory. The process and requirements vary between jurisdictions.",
    conveyancing: "Australian conveyancing varies by state. In Victoria, vendors must provide a Section 32 statement. In NSW, contracts must include specific prescribed documents.",
    "company-formation": "Australian companies are registered with ASIC under the Corporations Act 2001. A proprietary company must have at least one director who ordinarily resides in Australia.",
    "individual-tax-returns": "Australian individual tax returns are lodged with the ATO for the financial year ending 30 June. The deadline is 31 October for self-lodgers, or later if using a registered tax agent.",
    "gst-vat-returns": "Australian GST is 10% and is reported through the Business Activity Statement (BAS). GST registration is mandatory for businesses with turnover of $75,000 or more.",
    "work-visas": "Australian work visas are managed by the Department of Home Affairs. Key pathways include the Temporary Skill Shortage (TSS) visa (subclass 482) and employer-nominated visas.",
    "catch-up-filing": "The ATO imposes Failure to Lodge (FTL) penalties of one penalty unit ($313 as of 2024-25) for each 28-day period a return is late, up to a maximum of five penalty units.",
  },
  UK: {
    wills: "In England and Wales, wills are governed by the Wills Act 1837 (as amended). A will must be in writing, signed by the testator (18+), and witnessed by two people present at the same time. Scottish law differs.",
    "enduring-power-of-attorney": "In England and Wales, Lasting Powers of Attorney (LPA) are governed by the Mental Capacity Act 2005. There are two types: Property and Financial Affairs, and Health and Welfare.",
    probate: "Probate in England and Wales is granted by the Probate Registry (part of HMCTS). Inheritance Tax (IHT) must be calculated and the IHT400 submitted before probate can be granted.",
    conveyancing: "English conveyancing follows a two-stage process: exchange of contracts and completion. The Land Registry handles registration. SDLT (Stamp Duty Land Tax) applies in England and LBTT in Scotland.",
    "company-formation": "UK companies are registered with Companies House under the Companies Act 2006. A private limited company must have at least one director and a registered office in the UK.",
    "individual-tax-returns": "UK Self Assessment tax returns (SA100) are filed with HMRC for the tax year ending 5 April. Paper returns must be filed by 31 October; online returns by 31 January.",
    "gst-vat-returns": "UK VAT is 20% (standard rate). VAT registration is mandatory for businesses with turnover exceeding £90,000. Returns are filed quarterly through Making Tax Digital (MTD).",
    "work-visas": "UK work visas are managed by UK Visas and Immigration (UKVI). The Skilled Worker visa is the primary route, requiring sponsorship from a licensed employer.",
    "catch-up-filing": "HMRC imposes automatic penalties for late Self Assessment filing: £100 immediately, then £10/day after 3 months (up to £900), plus further penalties at 6 and 12 months.",
  },
  US: {
    wills: "In the United States, will requirements vary by state. Most states require the testator to be 18+, the will to be in writing, signed, and witnessed by two people. Some states recognise holographic wills.",
    "enduring-power-of-attorney": "In the United States, Durable Powers of Attorney are governed by state law. The Uniform Power of Attorney Act has been adopted by many states, but variations exist.",
    probate: "US probate is handled at the state level, typically through Surrogate's Court or Probate Court. Requirements and procedures vary significantly between states.",
    "company-formation": "US companies can be formed at the state level. Delaware and Wyoming are popular for incorporation. LLCs, C-Corps, and S-Corps have different tax and liability implications.",
    "individual-tax-returns": "US individual tax returns (Form 1040) are filed with the IRS for the calendar year. The filing deadline is April 15 (extensions available to October 15). State returns may also be required.",
    "work-visas": "US work visas are managed by USCIS. Common categories include H-1B (specialty occupation), L-1 (intracompany transfer), and O-1 (extraordinary ability).",
    "catch-up-filing": "The IRS imposes a Failure to File penalty of 5% per month (up to 25%) and a Failure to Pay penalty of 0.5% per month. Voluntary disclosure through the Streamlined Filing Compliance Procedures may reduce penalties.",
  },
  CA: {
    wills: "In Canada, will requirements are governed by provincial law. Generally, the testator must be 18+ (19 in some provinces), the will must be in writing, signed, and witnessed by two people.",
    "enduring-power-of-attorney": "Canadian power of attorney law varies by province. In Ontario, it's called a Continuing Power of Attorney for Property and a Power of Attorney for Personal Care.",
    probate: "Canadian probate is a provincial matter. In Ontario, it's called a Certificate of Appointment of Estate Trustee. Probate fees vary significantly between provinces.",
    "company-formation": "Canadian companies can be incorporated federally (under the CBCA) or provincially. Federal incorporation provides name protection across Canada.",
    "individual-tax-returns": "Canadian individual tax returns (T1) are filed with the CRA for the calendar year. The filing deadline is April 30 (June 15 for self-employed, but payment is due April 30).",
    "gst-vat-returns": "Canadian GST/HST rates vary by province (5% GST federally, up to 15% HST in harmonised provinces). Registration is mandatory for businesses with revenue over $30,000.",
    "work-visas": "Canadian work permits are managed by IRCC. The Temporary Foreign Worker Program (TFWP) and International Mobility Program (IMP) are the main pathways.",
    "catch-up-filing": "The CRA imposes a late-filing penalty of 5% of the balance owing plus 1% per month (up to 12 months). Repeat late filers may face doubled penalties.",
  },
  IE: {
    wills: "In Ireland, wills are governed by the Succession Act 1965. The testator must be 18+ (or married), the will must be in writing, signed, and witnessed by two people. Section 117 provides rights to children.",
    "enduring-power-of-attorney": "In Ireland, Enduring Powers of Attorney are governed by the Assisted Decision-Making (Capacity) Act 2015, which replaced the previous 1996 Act. EPAs must be registered with the Decision Support Service.",
    probate: "Irish probate is granted by the Probate Office or District Probate Registry. Capital Acquisitions Tax (CAT) may apply to inheritances above the relevant threshold.",
    conveyancing: "Irish conveyancing is governed by the Land and Conveyancing Law Reform Act 2009. Stamp duty applies to property transfers. The Property Registration Authority handles registration.",
    "company-formation": "Irish companies are registered with the CRO under the Companies Act 2014. The most common type is a Private Company Limited by Shares (LTD).",
    "individual-tax-returns": "Irish income tax returns (Form 11) are filed with Revenue for the tax year ending 31 December. The pay-and-file deadline is 31 October (mid-November for ROS e-filers).",
    "gst-vat-returns": "Irish VAT has two main rates: 23% (standard) and 13.5% (reduced). VAT registration is mandatory for goods over €80,000 or services over €40,000. Returns are filed bi-monthly on VAT3.",
    "catch-up-filing": "Revenue Ireland imposes surcharges for late filing: 5% of the tax due (up to €12,695) if filed within 2 months, 10% (up to €63,485) thereafter. Interest of 0.0219% per day also applies.",
  },
  SG: {
    wills: "In Singapore, wills are governed by the Wills Act 1838 (Cap. 352). The testator must be 21+ (or married), the will must be in writing, signed, and witnessed by two people. Muslim estates are subject to Faraid law.",
    "enduring-power-of-attorney": "In Singapore, Lasting Powers of Attorney (LPA) are governed by the Mental Capacity Act 2008. The LPA must be registered with the Office of the Public Guardian.",
    "company-formation": "Singapore companies are registered with ACRA under the Companies Act 1967. A private limited company must have at least one local resident director and a registered office in Singapore.",
    "individual-tax-returns": "Singapore individual tax returns are filed with IRAS for the Year of Assessment. The filing deadline is 15 April (18 April for e-filing). Singapore has a progressive tax rate from 0% to 24%.",
    "gst-vat-returns": "Singapore GST is currently 9% (increased from 8% on 1 January 2024). Registration is mandatory for businesses with annual turnover exceeding S$1 million.",
    "work-visas": "Singapore work passes are managed by the Ministry of Manpower (MOM). Key types include the Employment Pass (EP) for professionals, S Pass for mid-skilled workers, and Work Permit.",
    "catch-up-filing": "IRAS imposes penalties for late filing including a $100 penalty for each instance, with possible composition fines of up to $1,000 or prosecution for persistent non-compliance.",
  },
};

// FAQ templates for each service
function getServiceFAQs(service: typeof SERVICES[number], jurisdictionName: string): { question: string; answer: string }[] {
  const faqs: Record<string, { question: string; answer: string }[]> = {
    wills: [
      { question: `Do I need a lawyer to write a will in ${jurisdictionName}?`, answer: `While it is possible to write a will yourself, using a qualified professional ensures your will is legally valid and properly addresses your estate planning needs. Errors in wills can lead to costly disputes after your death. Marco Reid can draft your will and have it reviewed by a verified professional.` },
      { question: "What happens if I die without a will?", answer: `If you die without a will (intestate), your estate will be distributed according to the intestacy rules of ${jurisdictionName}. This may not reflect your wishes and can cause significant delays and expense for your family.` },
      { question: "How often should I update my will?", answer: "You should review your will every 3-5 years, or whenever you experience a major life event such as marriage, divorce, the birth of a child, or a significant change in your financial circumstances." },
      { question: "Can I make a will online?", answer: `Yes. Marco Reid's document generator can draft a will based on your instructions, compliant with ${jurisdictionName} law. The draft is then reviewed and signed off by a verified legal professional before it becomes a final document.` },
    ],
    "company-formation": [
      { question: `How long does it take to register a company in ${jurisdictionName}?`, answer: `Company registration typically takes 1-5 business days in ${jurisdictionName}, depending on the type of entity and whether all required documents are in order. Marco Reid can prepare all formation documents and file them electronically.` },
      { question: "What documents do I need to form a company?", answer: "You'll typically need a company constitution (or articles of association), director consent forms, shareholder details, a registered office address, and identification documents for all directors and shareholders." },
      { question: "Can a foreigner register a company?", answer: `Requirements vary by jurisdiction. In ${jurisdictionName}, there are specific rules about resident directors and local registered offices. Marco Reid can guide you through the requirements for your situation.` },
      { question: "What is the difference between a company and a sole trader?", answer: "A company is a separate legal entity that limits your personal liability. A sole trader is simpler to set up but you are personally liable for all business debts. The right structure depends on your circumstances, risk profile, and tax situation." },
    ],
    "individual-tax-returns": [
      { question: `When are tax returns due in ${jurisdictionName}?`, answer: `Filing deadlines vary. Check with the relevant tax authority in ${jurisdictionName} for exact dates. If you use a registered tax agent through Marco Reid, you may qualify for extended deadlines.` },
      { question: "What happens if I file late?", answer: `Late filing penalties in ${jurisdictionName} can include fixed penalties, percentage-based surcharges on tax owed, and interest charges. The exact penalties depend on how late you are and the amount of tax outstanding.` },
      { question: "Can I file my own tax return?", answer: `Yes, many individuals can file their own tax returns. Marco Reid's self-serve tools can help you prepare your return. For complex situations (multiple income sources, foreign income, investments), we recommend engaging a qualified tax professional.` },
      { question: "What deductions can I claim?", answer: `Allowable deductions depend on your jurisdiction and circumstances. Common deductions include work-related expenses, charitable donations, and certain investment costs. A tax professional can help ensure you claim everything you are entitled to.` },
    ],
    "work-visas": [
      { question: `What types of work visas are available in ${jurisdictionName}?`, answer: `${jurisdictionName} offers several work visa categories depending on your skills, qualifications, and employment situation. The most common pathways involve employer sponsorship, although some categories allow independent applications for highly skilled individuals.` },
      { question: "How long does a work visa application take?", answer: `Processing times vary depending on the visa type and current processing volumes. Standard applications typically take 1-6 months. Marco Reid can track your application status and ensure all documentation is complete.` },
      { question: "Can my family join me?", answer: `Most work visa categories allow you to include dependent family members (spouse/partner and dependent children) in your application or apply for them separately. Specific requirements vary by visa type.` },
      { question: "Do I need a job offer first?", answer: `Most work visa categories require an offer of employment from an approved employer. Some categories for highly skilled individuals or entrepreneurs may not require an existing job offer.` },
    ],
  };

  // Return service-specific FAQs or generate generic ones
  if (faqs[service.slug]) {
    return faqs[service.slug];
  }

  // Generic FAQs for services without specific ones
  return [
    {
      question: `How does ${service.name} work through Marco Reid?`,
      answer: service.publicAccess
        ? `You can start the ${service.name.toLowerCase()} process yourself using our self-serve tools. Complete the intake form, and our system will generate the necessary documents or applications. A verified professional in ${jurisdictionName} reviews everything before it is finalised.`
        : `${service.name} requires a licensed professional. Submit your details through Marco Reid and we will connect you with a verified professional in ${jurisdictionName} who specialises in this area. They will handle the entire process on your behalf.`,
    },
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${jurisdictionName}?`,
      answer: service.estimatedCost
        ? `Indicative pricing starts ${service.estimatedCost.toLowerCase()} in ${jurisdictionName}. Final fees depend on the complexity of your matter and will be confirmed in the engagement letter before any work begins.`
        : `Fees for ${service.name.toLowerCase()} vary depending on the complexity of your matter. Request a quote through Marco Reid and you will receive transparent pricing before any work begins. The engagement letter sets the binding fee.`,
    },
    {
      question: `How long does ${service.name.toLowerCase()} take?`,
      answer: `Timeframes for ${service.name.toLowerCase()} in ${jurisdictionName} vary depending on complexity and current processing volumes. After you submit your initial details, your assigned professional will provide an estimated timeline.`,
    },
    {
      question: `Do I need a professional for ${service.name.toLowerCase()}?`,
      answer: service.professionalRequired
        ? `Yes, ${service.name.toLowerCase()} in ${jurisdictionName} requires a licensed professional. Marco Reid will connect you with a verified professional who is registered with the relevant ${jurisdictionName} regulatory body.`
        : `While you can initiate ${service.name.toLowerCase()} yourself using our self-serve tools, we recommend consulting a professional for complex situations. Marco Reid makes it easy to escalate to a verified professional at any stage.`,
    },
  ];
}

interface PageProps {
  params: Promise<{ country: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { country: string; slug: string }[] = [];
  for (const countrySlug of VALID_COUNTRIES) {
    const code = COUNTRY_MAP[countrySlug];
    const services = SERVICES.filter((s) => s.countries.includes(code));
    for (const service of services) {
      params.push({ country: countrySlug, slug: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, slug } = await params;
  if (!isValidCountry(country)) {
    return { title: "Not found" };
  }
  const code = COUNTRY_MAP[country];
  const jurisdiction = JURISDICTIONS[code];
  const service = SERVICES.find((s) => s.slug === slug && s.countries.includes(code));
  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: `${service.name} in ${jurisdiction.name} ${jurisdiction.flag} — ${BRAND.name}`,
    description: `${service.description} Available in ${jurisdiction.name} through ${BRAND.name}. ${
      service.publicAccess ? "Self-serve available." : "Professional service."
    }`,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { country, slug } = await params;
  if (!isValidCountry(country)) notFound();

  const code = COUNTRY_MAP[country];
  const jurisdiction = JURISDICTIONS[code];
  const service = SERVICES.find((s) => s.slug === slug && s.countries.includes(code));
  if (!service) notFound();

  const categoryInfo = SERVICE_CATEGORIES.find((c) => c.slug === service.category);
  const countryContext = COUNTRY_CONTEXT[code]?.[slug];
  const faqItems = getServiceFAQs(service, jurisdiction.name);

  // Find related services (same category, same country)
  const relatedServices = SERVICES.filter(
    (s) =>
      s.slug !== service.slug &&
      s.category === service.category &&
      s.countries.includes(code)
  ).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BRAND.name, item: BRAND.url },
      {
        "@type": "ListItem",
        position: 2,
        name: jurisdiction.name,
        item: `${BRAND.url}/${country}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Services",
        item: `${BRAND.url}/${country}/services`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: service.name,
        item: `${BRAND.url}/${country}/services/${slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.url,
    },
    areaServed: {
      "@type": "Country",
      name: jurisdiction.name,
    },
    ...(service.estimatedCost
      ? {
          offers: {
            "@type": "Offer",
            description: service.estimatedCost,
            priceCurrency: jurisdiction.currency.code,
          },
        }
      : {}),
  };

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={serviceSchema} />

      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="bg-navy-500 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
              <Link href={`/${country}`} className="hover:text-white/80 transition-colors">
                {jurisdiction.flag} {jurisdiction.name}
              </Link>
              <span>/</span>
              <Link href={`/${country}/services`} className="hover:text-white/80 transition-colors">
                Services
              </Link>
              <span>/</span>
              <Link
                href={`/${country}/services?category=${service.category}`}
                className="hover:text-white/80 transition-colors"
              >
                {categoryInfo?.name ?? service.category}
              </Link>
              <span>/</span>
              <span className="text-white/70">{service.name}</span>
            </nav>

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                {service.publicAccess ? (
                  <span className="rounded-md bg-forest-500/20 px-2.5 py-1 text-xs font-semibold text-forest-300">
                    Self-serve available
                  </span>
                ) : (
                  <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/80">
                    Professional required
                  </span>
                )}
                {service.estimatedCost && (
                  <span className="rounded-md bg-gold-500/20 px-2.5 py-1 text-xs font-semibold text-gold-300">
                    {service.estimatedCost}
                  </span>
                )}
              </div>
              <h1 className="mt-4 font-serif text-hero text-white">
                {service.name}
              </h1>
              <p className="mt-4 text-xl leading-relaxed text-navy-100">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {service.publicAccess ? (
                  <Button href="/generate" variant="gold" size="lg">
                    Start this service
                  </Button>
                ) : (
                  <Button href="/directory" variant="gold" size="lg">
                    Find a professional
                  </Button>
                )}
                <Button
                  href="/contact"
                  variant="ghost"
                  className="text-white hover:text-gold-300"
                >
                  Get advice &rarr;
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* MAIN CONTENT                                                  */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
              {/* LEFT COLUMN — details */}
              <div className="space-y-8">
                {/* Country-specific legal context */}
                {countryContext && (
                  <Reveal>
                    <div className="rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 via-white to-white p-6 shadow-card sm:p-8">
                      <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                        {jurisdiction.flag} {jurisdiction.name} — legal context
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-navy-600">
                        {countryContext}
                      </p>
                    </div>
                  </Reveal>
                )}

                {/* Forms and documents */}
                {service.forms && service.forms.length > 0 && (
                  <Reveal delay={0.05}>
                    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                      <h2 className="font-serif text-2xl text-navy-800">
                        Related forms &amp; documents
                      </h2>
                      <p className="mt-2 text-sm text-navy-400">
                        The following forms and documents may be required or generated
                        as part of this service in {jurisdiction.name}.
                      </p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {service.forms.map((form) => (
                          <div
                            key={form}
                            className="flex items-center gap-3 rounded-lg border border-navy-100 bg-navy-50/40 px-4 py-3"
                          >
                            <svg
                              className="h-4 w-4 shrink-0 text-forest-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="text-sm text-navy-700">{form}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* How it works */}
                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                    <h2 className="font-serif text-2xl text-navy-800">
                      How it works
                    </h2>
                    <div className="mt-6 space-y-6">
                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-500 text-sm font-bold text-white">
                          1
                        </div>
                        <div>
                          <p className="font-semibold text-navy-700">Tell us what you need</p>
                          <p className="mt-1 text-sm text-navy-400">
                            Complete a plain-English intake form. No legal jargon required.
                            Our system asks the right questions for {jurisdiction.name}.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-500 text-sm font-bold text-white">
                          2
                        </div>
                        <div>
                          <p className="font-semibold text-navy-700">
                            {service.publicAccess
                              ? "AI drafts your documents"
                              : "We connect you with a professional"}
                          </p>
                          <p className="mt-1 text-sm text-navy-400">
                            {service.publicAccess
                              ? `Our AI generates compliant documents for ${jurisdiction.name}. Every citation is verified. Every form is jurisdiction-specific.`
                              : `We match you with a verified professional in ${jurisdiction.name} who specialises in ${service.name.toLowerCase()}. They review your situation and provide a quote.`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-500 text-sm font-bold text-white">
                          3
                        </div>
                        <div>
                          <p className="font-semibold text-navy-700">Professional sign-off</p>
                          <p className="mt-1 text-sm text-navy-400">
                            A verified professional in {jurisdiction.name} reviews and
                            approves the final output. Nothing goes out the door without
                            a credentialled professional signing it off.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* RIGHT COLUMN — sidebar */}
              <aside className="space-y-4">
                {/* Action card */}
                <Reveal>
                  <div className="rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-50 via-white to-white p-6 shadow-card">
                    <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                      Get started
                    </p>
                    <h3 className="mt-3 font-serif text-lg text-navy-800">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-navy-500">
                      {service.publicAccess
                        ? "Start the process yourself, or get connected with a professional."
                        : "This service requires a licensed professional. We will connect you with the right person."}
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                      {service.publicAccess && (
                        <Button href="/generate" variant="gold" size="md">
                          Start self-serve &rarr;
                        </Button>
                      )}
                      <Button href="/directory" variant="primary" size="md">
                        Find a professional
                      </Button>
                    </div>
                    {service.estimatedCost && (
                      <p className="mt-4 text-xs text-navy-400">
                        Indicative pricing: {service.estimatedCost} ({jurisdiction.currency.code})
                      </p>
                    )}
                  </div>
                </Reveal>

                {/* Service details */}
                <Reveal delay={0.05}>
                  <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                      Service details
                    </p>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-navy-400">Category</span>
                        <span className="font-semibold text-navy-700">
                          {categoryInfo?.name ?? service.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-navy-400">Access</span>
                        {service.publicAccess ? (
                          <span className="rounded-md bg-forest-50 px-2 py-0.5 text-xs font-semibold text-forest-700">
                            Self-serve
                          </span>
                        ) : (
                          <span className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-600">
                            Professional
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-navy-400">Jurisdiction</span>
                        <span className="font-semibold text-navy-700">
                          {jurisdiction.flag} {jurisdiction.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-navy-400">Currency</span>
                        <span className="font-semibold text-navy-700">
                          {jurisdiction.currency.code} ({jurisdiction.currency.symbol})
                        </span>
                      </div>
                      {service.forms && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-navy-400">Forms</span>
                          <span className="font-semibold text-navy-700">
                            {service.forms.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>

                {/* Available in other countries */}
                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                      Also available in
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.countries
                        .filter((c) => c !== code)
                        .map((c) => {
                          const j = JURISDICTIONS[c];
                          const countrySlug = Object.entries(COUNTRY_MAP).find(
                            ([, v]) => v === c
                          )?.[0];
                          if (!j || !countrySlug) return null;
                          return (
                            <Link
                              key={c}
                              href={`/${countrySlug}/services/${slug}`}
                              className="rounded-md border border-navy-100 bg-white px-2.5 py-1 text-xs font-medium text-navy-700 transition-colors hover:border-gold-300 hover:text-gold-700"
                            >
                              {j.flag} {j.name}
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                </Reveal>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* RELATED SERVICES                                              */}
      {/* ============================================================ */}
      {relatedServices.length > 0 && (
        <section className="border-t border-navy-100 bg-navy-50 py-16 sm:py-24">
          <Container>
            <Reveal>
              <h2 className="font-serif text-display text-navy-800">
                Related services in {jurisdiction.name}.
              </h2>
              <p className="mt-2 text-sm text-navy-400">
                Other {categoryInfo?.name.toLowerCase() ?? service.category} services
                available in {jurisdiction.name}.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <Reveal key={related.slug} delay={0.05}>
                  <Link
                    href={`/${country}/services/${related.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-gold-300"
                  >
                    <h3 className="font-serif text-lg text-navy-800 group-hover:text-navy-900">
                      {related.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-400">
                      {related.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      {related.publicAccess ? (
                        <span className="rounded-md bg-forest-50 px-2 py-0.5 text-xs font-semibold text-forest-700">
                          Self-serve
                        </span>
                      ) : (
                        <span className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-500">
                          Professional required
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-xs font-semibold text-navy-400 group-hover:text-gold-600">
                      View details &rarr;
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-8 text-center">
                <Button href={`/${country}/services`} variant="ghost">
                  View all {jurisdiction.name} services &rarr;
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ============================================================ */}
      {/* FAQ                                                           */}
      {/* ============================================================ */}
      <FAQ
        items={faqItems}
        heading={`${service.name} in ${jurisdiction.name} — frequently asked questions.`}
        subheading={`Common questions about ${service.name.toLowerCase()} for individuals and businesses in ${jurisdiction.name}.`}
      />

      {/* ============================================================ */}
      {/* BOTTOM CTA                                                    */}
      {/* ============================================================ */}
      <section className="bg-navy-500 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-serif text-display text-white">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-white/80">
                {service.publicAccess
                  ? `Start your ${service.name.toLowerCase()} now, or connect with a verified professional in ${jurisdiction.name}.`
                  : `Connect with a verified professional in ${jurisdiction.name} who specialises in ${service.name.toLowerCase()}.`}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {service.publicAccess ? (
                  <>
                    <Button href="/generate" variant="gold" size="lg">
                      Start this service
                    </Button>
                    <Button
                      href="/directory"
                      variant="ghost"
                      className="text-white hover:text-gold-300"
                    >
                      Find a professional &rarr;
                    </Button>
                  </>
                ) : (
                  <>
                    <Button href="/directory" variant="gold" size="lg">
                      Find a professional
                    </Button>
                    <Button
                      href="/contact"
                      variant="ghost"
                      className="text-white hover:text-gold-300"
                    >
                      Contact us &rarr;
                    </Button>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* COMPLIANCE NOTE                                               */}
      {/* ============================================================ */}
      <section className="py-10">
        <Container narrow>
          <p className="text-center text-xs text-navy-400">
            {BRAND.name} is a tooling vendor, not a law firm or accounting practice.
            {service.professionalRequired
              ? ` ${service.name} in ${jurisdiction.name} is delivered entirely by independently licensed professionals.`
              : ` Self-serve outputs for ${service.name.toLowerCase()} are reviewed and approved by a credentialled professional in ${jurisdiction.name} before release.`}{" "}
            All professionals are registered with the relevant {jurisdiction.name} regulatory body.
          </p>
        </Container>
      </section>
    </>
  );
}
