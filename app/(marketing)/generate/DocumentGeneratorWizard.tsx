"use client";

import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DocType {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface WizardProps {
  docTypes: DocType[];
  countries: Country[];
}

/* ------------------------------------------------------------------ */
/*  Per-document-type question sets                                    */
/* ------------------------------------------------------------------ */

interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "email" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  helperText?: string;
}

const DOCUMENT_FIELDS: Record<string, FormField[]> = {
  will: [
    { name: "fullName", label: "Your full legal name", type: "text", placeholder: "e.g. James Michael Reid", required: true, helperText: "Enter the name exactly as it appears on your ID or passport" },
    { name: "dateOfBirth", label: "Date of birth", type: "date", required: true, helperText: "This is used to identify you as the testator in the will" },
    { name: "address", label: "Current address", type: "text", placeholder: "e.g. 14 Queen Street, Auckland 1010", required: true, helperText: "Include the full street address, city, and postcode" },
    { name: "executor", label: "Executor (full name and relationship)", type: "text", placeholder: "e.g. Sarah Reid, spouse", required: true, helperText: "The person responsible for carrying out your wishes after you pass" },
    { name: "beneficiaries", label: "Beneficiaries and what they receive", type: "textarea", placeholder: "e.g. Sarah Reid receives the family home; James Reid Jr receives 50% of remaining estate", required: true, helperText: "List each person and what they inherit — be as specific as possible" },
    { name: "guardians", label: "Guardian for minor children (if applicable)", type: "text", placeholder: "e.g. Michael Reid, brother", helperText: "Only required if you have children under 18" },
    { name: "specialBequests", label: "Special bequests or instructions", type: "textarea", placeholder: "e.g. Donate $5,000 to Red Cross NZ; my book collection to the Auckland City Library", helperText: "Any specific gifts of money, property, or belongings to named recipients" },
  ],
  tenancy: [
    { name: "landlordName", label: "Landlord full name", type: "text", placeholder: "e.g. Sarah Properties Ltd", required: true, helperText: "Enter the name exactly as it appears on the title or company register" },
    { name: "tenantName", label: "Tenant full name", type: "text", placeholder: "e.g. James Michael Reid", required: true, helperText: "Enter the name exactly as it appears on your ID or passport" },
    { name: "propertyAddress", label: "Property address", type: "text", placeholder: "e.g. 42 Ponsonby Road, Auckland 1011", required: true, helperText: "Include the full street address, city, and postcode" },
    { name: "weeklyRent", label: "Weekly rent amount", type: "text", placeholder: "e.g. $650", required: true, helperText: "State the agreed weekly rent in local currency" },
    { name: "bondAmount", label: "Bond amount", type: "text", placeholder: "e.g. $2,600 (4 weeks rent)", required: true, helperText: "Typically 4 weeks rent — check your jurisdiction's maximum bond rules" },
    { name: "startDate", label: "Tenancy start date", type: "date", required: true, helperText: "This is the date the document will take effect" },
    { name: "termType", label: "Fixed term or periodic", type: "select", options: ["Fixed term", "Periodic"], required: true, helperText: "Fixed term has a set end date; periodic continues week-to-week or month-to-month" },
    { name: "specialConditions", label: "Special conditions", type: "textarea", placeholder: "e.g. No pets; tenant responsible for lawn maintenance", helperText: "Any additional agreed conditions not covered by the standard agreement" },
  ],
  employment: [
    { name: "employerName", label: "Employer / company name", type: "text", placeholder: "e.g. Marco Reid Ltd", required: true, helperText: "Enter the registered legal name of the employing entity" },
    { name: "employeeName", label: "Employee full name", type: "text", placeholder: "e.g. James Michael Reid", required: true, helperText: "Enter the name exactly as it appears on their ID or passport" },
    { name: "jobTitle", label: "Job title", type: "text", placeholder: "e.g. Senior Software Engineer", required: true, helperText: "The official title that will appear in the employment agreement" },
    { name: "startDate", label: "Start date", type: "date", required: true, helperText: "This is the date the document will take effect" },
    { name: "salary", label: "Annual salary or hourly rate", type: "text", placeholder: "e.g. $120,000 per annum", required: true, helperText: "State the gross amount before tax in local currency" },
    { name: "hoursPerWeek", label: "Hours per week", type: "text", placeholder: "e.g. 40", required: true, helperText: "Ordinary hours — do not include overtime expectations here" },
    { name: "noticePeriod", label: "Notice period", type: "text", placeholder: "e.g. 4 weeks", helperText: "The minimum notice required by either party to end the employment" },
    { name: "specialTerms", label: "Special terms or conditions", type: "textarea", placeholder: "e.g. 90-day trial period; remote work arrangement", helperText: "Any terms specific to this role that are not covered by standard employment law" },
  ],
  "privacy-policy": [
    { name: "businessName", label: "Business / website name", type: "text", placeholder: "e.g. Marco Reid Ltd", required: true, helperText: "Enter the registered legal name of your business" },
    { name: "websiteUrl", label: "Website URL", type: "text", placeholder: "e.g. https://marcoreid.com", required: true, helperText: "The full URL where this privacy policy will be published" },
    { name: "contactEmail", label: "Privacy contact email", type: "email", placeholder: "e.g. privacy@marcoreid.com", required: true, helperText: "We'll use this to send you the completed document, and it will appear in the published policy" },
    { name: "dataCollected", label: "What data do you collect?", type: "textarea", placeholder: "e.g. Name, email, phone number, billing address, usage analytics", required: true, helperText: "List every category of personal data your platform collects from users" },
    { name: "dataUsePurpose", label: "How do you use the data?", type: "textarea", placeholder: "e.g. Provide services, send invoices, improve platform, marketing emails", required: true, helperText: "Describe each purpose — be specific, as vague descriptions can create legal risk" },
    { name: "thirdParties", label: "Third parties you share data with", type: "textarea", placeholder: "e.g. Stripe (payments), Mailgun (email), Google Analytics", helperText: "List every service provider that processes user data on your behalf" },
  ],
  terms: [
    { name: "businessName", label: "Business / website name", type: "text", placeholder: "e.g. Marco Reid Ltd", required: true, helperText: "Enter the registered legal name of your business" },
    { name: "websiteUrl", label: "Website URL", type: "text", placeholder: "e.g. https://marcoreid.com", required: true, helperText: "The full URL where these terms will be published" },
    { name: "contactEmail", label: "Contact email", type: "email", placeholder: "e.g. support@marcoreid.com", required: true, helperText: "We'll use this to send you the completed document" },
    { name: "servicesDescription", label: "Describe your services", type: "textarea", placeholder: "e.g. SaaS platform providing legal and accounting tools", required: true, helperText: "A clear description of what your platform provides to users" },
    { name: "paymentTerms", label: "Payment terms", type: "textarea", placeholder: "e.g. Monthly subscription billed in advance; 30-day free trial", helperText: "How and when customers are charged — include trial, refund, and cancellation terms" },
    { name: "limitations", label: "Limitations of liability", type: "textarea", placeholder: "e.g. Service provided as-is; no guarantee of uptime", helperText: "What your platform is not responsible for — important for AI-powered services" },
  ],
  nda: [
    { name: "disclosingParty", label: "Disclosing party name", type: "text", placeholder: "e.g. Marco Reid Ltd", required: true, helperText: "The party sharing confidential information — enter the full legal name" },
    { name: "receivingParty", label: "Receiving party name", type: "text", placeholder: "e.g. ABC Consulting Ltd", required: true, helperText: "The party receiving and agreeing to protect the confidential information" },
    { name: "purpose", label: "Purpose of disclosure", type: "textarea", placeholder: "e.g. Evaluation of potential business partnership", required: true, helperText: "Be specific — the NDA only covers information shared for this stated purpose" },
    { name: "ndaType", label: "NDA type", type: "select", options: ["Mutual (both parties)", "One-way (discloser protected)"], required: true, helperText: "Mutual means both parties protect each other's information; one-way protects only the discloser" },
    { name: "termLength", label: "Confidentiality period", type: "text", placeholder: "e.g. 2 years from date of signing", required: true, helperText: "How long the confidentiality obligation lasts after signing or after the relationship ends" },
    { name: "exclusions", label: "Exclusions from confidentiality", type: "textarea", placeholder: "e.g. Information already publicly available; independently developed information", helperText: "Standard exclusions protect information that is already public or independently developed" },
  ],
  partnership: [
    { name: "partner1Name", label: "Partner 1 full name", type: "text", placeholder: "e.g. James Michael Reid", required: true, helperText: "Enter the name exactly as it appears on their ID or passport" },
    { name: "partner2Name", label: "Partner 2 full name", type: "text", placeholder: "e.g. Sarah Louise Chen", required: true, helperText: "Enter the name exactly as it appears on their ID or passport" },
    { name: "businessName", label: "Partnership / business name", type: "text", placeholder: "e.g. Reid & Chen Associates", required: true, helperText: "The trading name of the partnership — check availability before finalising" },
    { name: "businessPurpose", label: "Business purpose", type: "textarea", placeholder: "e.g. Provision of legal consulting services", required: true, helperText: "A clear description of what the partnership will do — this defines the scope of the agreement" },
    { name: "capitalContributions", label: "Capital contributions", type: "textarea", placeholder: "e.g. Partner 1: $50,000; Partner 2: $50,000", required: true, helperText: "How much each partner is contributing to start the partnership" },
    { name: "profitSplit", label: "Profit and loss sharing", type: "text", placeholder: "e.g. 50/50", required: true, helperText: "How profits and losses are divided — must add up to 100%" },
    { name: "decisionMaking", label: "Decision-making process", type: "textarea", placeholder: "e.g. Unanimous consent for major decisions; majority for day-to-day", helperText: "How the partnership will make decisions — different thresholds for different types of decisions" },
  ],
  poa: [
    { name: "principalName", label: "Principal (person granting power)", type: "text", placeholder: "e.g. James Michael Reid", required: true, helperText: "Enter the name exactly as it appears on your ID or passport" },
    { name: "attorneyName", label: "Attorney (person receiving power)", type: "text", placeholder: "e.g. Sarah Louise Reid", required: true, helperText: "The trusted person who will act on your behalf — enter their full legal name" },
    { name: "relationship", label: "Relationship", type: "text", placeholder: "e.g. Spouse", required: true, helperText: "Your relationship to the attorney — e.g. spouse, sibling, child, solicitor" },
    { name: "poaType", label: "Type of power of attorney", type: "select", options: ["General (all matters)", "Enduring / Durable", "Specific (limited purpose)"], required: true, helperText: "Enduring/Durable continues if you lose mental capacity; Specific is limited to defined tasks only" },
    { name: "powersGranted", label: "Specific powers granted", type: "textarea", placeholder: "e.g. Manage bank accounts; sell property at 42 Queen Street; sign legal documents", required: true, helperText: "List every power you are granting — be precise, as courts interpret these documents narrowly" },
    { name: "restrictions", label: "Restrictions or limitations", type: "textarea", placeholder: "e.g. Cannot sell family home without consent of both children", helperText: "Any limits on how the attorney can exercise their powers" },
  ],
  constitution: [
    { name: "companyName", label: "Company name", type: "text", placeholder: "e.g. Marco Reid Ltd", required: true, helperText: "Enter the registered name exactly as it appears on the company register" },
    { name: "registrationNumber", label: "Company registration number (if known)", type: "text", placeholder: "e.g. 1234567", helperText: "Leave blank if the company has not yet been incorporated" },
    { name: "directors", label: "Director names", type: "textarea", placeholder: "e.g. James Michael Reid; Sarah Louise Reid", required: true, helperText: "List all directors — enter each name on a new line or separated by semicolons" },
    { name: "shareholders", label: "Shareholders and share allocation", type: "textarea", placeholder: "e.g. James Reid: 500 shares (50%); Sarah Reid: 500 shares (50%)", required: true, helperText: "List each shareholder, their share count, and percentage — must total 100%" },
    { name: "businessActivity", label: "Principal business activity", type: "text", placeholder: "e.g. Software development and consulting", required: true, helperText: "The primary purpose of the company — this may affect licensing or regulatory requirements" },
    { name: "specialProvisions", label: "Special provisions", type: "textarea", placeholder: "e.g. Pre-emptive rights on share transfer; quorum of 2 directors", helperText: "Any provisions that differ from your jurisdiction's default company rules" },
  ],
  loan: [
    { name: "lenderName", label: "Lender name", type: "text", placeholder: "e.g. James Michael Reid", required: true, helperText: "Enter the full legal name of the person or entity providing the loan" },
    { name: "borrowerName", label: "Borrower name", type: "text", placeholder: "e.g. Sarah Louise Chen", required: true, helperText: "Enter the full legal name of the person or entity receiving the loan" },
    { name: "loanAmount", label: "Loan amount", type: "text", placeholder: "e.g. $50,000", required: true, helperText: "State the principal amount in local currency" },
    { name: "interestRate", label: "Interest rate", type: "text", placeholder: "e.g. 5% per annum", required: true, helperText: "Check your jurisdiction's maximum interest rate laws before agreeing a rate" },
    { name: "repaymentSchedule", label: "Repayment schedule", type: "textarea", placeholder: "e.g. Monthly payments of $1,000 over 5 years", required: true, helperText: "How and when the loan will be repaid — include frequency, amount, and total duration" },
    { name: "security", label: "Security / collateral (if any)", type: "textarea", placeholder: "e.g. Second mortgage over property at 14 Queen Street", helperText: "What the lender can claim if the borrower defaults — leave blank for an unsecured loan" },
    { name: "defaultTerms", label: "Default and remedies", type: "textarea", placeholder: "e.g. 14 days notice to cure; acceleration of balance on default", helperText: "What happens if the borrower misses payments — grace periods and enforcement steps" },
  ],
  contractor: [
    { name: "clientName", label: "Client / company name", type: "text", placeholder: "e.g. Marco Reid Ltd", required: true, helperText: "Enter the registered legal name of the client engaging the contractor" },
    { name: "contractorName", label: "Contractor name", type: "text", placeholder: "e.g. James Reid Consulting", required: true, helperText: "Enter the contractor's full legal name or registered trading name" },
    { name: "servicesDescription", label: "Description of services", type: "textarea", placeholder: "e.g. Front-end web development for marcoreid.com", required: true, helperText: "Be specific — vague scope descriptions are the most common cause of contractor disputes" },
    { name: "rate", label: "Rate and payment terms", type: "text", placeholder: "e.g. $150/hour, invoiced fortnightly", required: true, helperText: "State the rate, currency, and invoicing frequency" },
    { name: "startDate", label: "Start date", type: "date", required: true, helperText: "This is the date the document will take effect" },
    { name: "endDate", label: "End date (if fixed term)", type: "date", helperText: "Leave blank for an open-ended engagement termination by notice" },
    { name: "ipOwnership", label: "IP ownership", type: "select", options: ["Client owns all IP", "Contractor retains IP, grants licence", "Joint ownership"], required: true, helperText: "Who owns the work product created — this is critical for software and creative work" },
    { name: "noticePeriod", label: "Termination notice period", type: "text", placeholder: "e.g. 14 days written notice", helperText: "How much advance notice either party must give to end the engagement" },
  ],
  demand: [
    { name: "senderName", label: "Your name (sender)", type: "text", placeholder: "e.g. James Michael Reid", required: true, helperText: "Enter the name exactly as it appears on your ID or passport" },
    { name: "recipientName", label: "Recipient name", type: "text", placeholder: "e.g. ABC Construction Ltd", required: true, helperText: "Enter the full legal name of the person or entity you are sending the demand to" },
    { name: "amountOwed", label: "Amount owed (if monetary)", type: "text", placeholder: "e.g. $15,000", helperText: "State the exact amount in local currency — leave blank if this is a non-monetary demand" },
    { name: "description", label: "What is the demand about?", type: "textarea", placeholder: "e.g. Payment for completed renovation work at 14 Queen Street, invoiced 60 days ago", required: true, helperText: "Describe the situation factually — dates, amounts, agreements, and what has not been done" },
    { name: "deadline", label: "Deadline for response", type: "text", placeholder: "e.g. 14 days from date of letter", required: true, helperText: "This is the date the document will take effect for calculating the response deadline" },
    { name: "consequences", label: "Consequences of non-compliance", type: "textarea", placeholder: "e.g. Legal proceedings will be filed in the District Court without further notice", helperText: "What action you will take if they do not comply — be credible and proportionate" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Placeholder document generator                                     */
/* ------------------------------------------------------------------ */

function generatePreview(
  docType: DocType,
  country: Country,
  answers: Record<string, string>,
): string {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const fields = DOCUMENT_FIELDS[docType.id] ?? [];
  const filledFields = fields
    .filter((f) => answers[f.name]?.trim())
    .map((f) => ({ label: f.label, value: answers[f.name] }));

  const header = `${docType.name.toUpperCase()}\n\nPrepared under the laws of ${country.name}\nDraft generated: ${date}\n\n${"=".repeat(60)}\n\n`;

  const disclaimer =
    "DRAFT — Not legal/tax advice. Pending professional review.\n\n";

  let body = "";

  switch (docType.id) {
    case "will":
      body = `LAST WILL AND TESTAMENT\n\nI, ${answers.fullName || "[Full Name]"}, of ${answers.address || "[Address]"}, ${country.name}, being of sound mind and memory, do hereby declare this to be my Last Will and Testament, revoking all previous wills and codicils.\n\n1. EXECUTOR\nI appoint ${answers.executor || "[Executor Name]"} as the Executor of this Will. If my named Executor is unable or unwilling to serve, I appoint [Alternate Executor] as alternate Executor.\n\n2. DEBTS AND EXPENSES\nI direct my Executor to pay all my legally enforceable debts, funeral expenses, and costs of administration from my estate.\n\n3. BENEFICIARIES AND BEQUESTS\n${answers.beneficiaries || "[Beneficiary details to be specified]"}\n\n${answers.guardians ? `4. GUARDIAN\nI appoint ${answers.guardians} as guardian of my minor children.\n\n` : ""}${answers.specialBequests ? `${answers.guardians ? "5" : "4"}. SPECIAL BEQUESTS\n${answers.specialBequests}\n\n` : ""}RESIDUARY ESTATE\nI give the rest, residue, and remainder of my estate to my named beneficiaries in the proportions set out above.\n\nIN WITNESS WHEREOF, I have hereunto set my hand this ______ day of _____________, 20___.\n\n\n_______________________________\n${answers.fullName || "[Testator]"}\n\nWITNESS 1:\nName: _________________________\nAddress: _______________________\nSignature: _____________________\n\nWITNESS 2:\nName: _________________________\nAddress: _______________________\nSignature: _____________________`;
      break;

    case "tenancy":
      body = `RESIDENTIAL TENANCY AGREEMENT\n\nBetween:\nLandlord: ${answers.landlordName || "[Landlord]"}\nTenant: ${answers.tenantName || "[Tenant]"}\n\nProperty: ${answers.propertyAddress || "[Property Address]"}\n\n1. TERM\nThis tenancy is ${answers.termType || "periodic"}, commencing on ${answers.startDate || "[Start Date]"}.\n\n2. RENT\nThe weekly rent is ${answers.weeklyRent || "[Amount]"}, payable in advance every week.\n\n3. BOND\nA bond of ${answers.bondAmount || "[Amount]"} is payable and will be lodged with the relevant authority.\n\n4. OBLIGATIONS OF THE LANDLORD\nThe landlord shall maintain the property in a reasonable state of repair and comply with all applicable health and safety standards.\n\n5. OBLIGATIONS OF THE TENANT\nThe tenant shall pay rent on time, keep the property reasonably clean and tidy, and notify the landlord promptly of any damage or required maintenance.\n\n${answers.specialConditions ? `6. SPECIAL CONDITIONS\n${answers.specialConditions}\n\n` : ""}This agreement is governed by the residential tenancy laws of ${country.name}.\n\nSigned:\n\nLandlord: _________________________  Date: ___________\n\nTenant: ___________________________  Date: ___________`;
      break;

    default:
      body = `${docType.name.toUpperCase()}\n\nThis document is prepared under the laws of ${country.name}.\n\n`;
      filledFields.forEach((f, i) => {
        body += `${i + 1}. ${f.label.toUpperCase()}\n${f.value}\n\n`;
      });
      body += `\nThis document was generated as a draft for review purposes only. All terms and conditions should be reviewed by a qualified ${country.name} professional before execution.\n\nSigned:\n\nParty 1: _________________________  Date: ___________\n\nParty 2: _________________________  Date: ___________`;
      break;
  }

  return disclaimer + header + body;
}

/* ------------------------------------------------------------------ */
/*  Icon component                                                     */
/* ------------------------------------------------------------------ */

function DocIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactNode> = {
    scroll: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    ),
    home: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    ),
    briefcase: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    ),
    shield: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    ),
    "file-text": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    ),
    lock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    ),
    handshake: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    ),
    stamp: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
    ),
    building: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
      />
    ),
    dollar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    wrench: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17l-5.1 5.1a2.121 2.121 0 01-3-3l5.1-5.1m0 0L2.82 7.575A9.019 9.019 0 0112 2.25c2.485 0 4.753 1.005 6.39 2.632M11.42 15.17l5.1-5.1m0 0L21.18 5.82a2.121 2.121 0 00-3-3l-4.66 4.66"
      />
    ),
    mail: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    ),
  };

  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      {paths[icon] ?? paths["file-text"]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Wizard component                                                   */
/* ------------------------------------------------------------------ */

export default function DocumentGeneratorWizard({
  docTypes,
  countries,
}: WizardProps) {
  const [step, setStep] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const activeDoc = docTypes.find((d) => d.id === selectedDoc);
  const activeCountry = countries.find((c) => c.code === selectedCountry);
  const fields = useMemo(
    () => (selectedDoc ? DOCUMENT_FIELDS[selectedDoc] ?? [] : []),
    [selectedDoc],
  );

  /* ---- handlers ---- */

  function selectDocType(id: string) {
    setSelectedDoc(id);
    setStep(2);
    setAnswers({});
    setPreview(null);
  }

  function selectCountry(code: string) {
    setSelectedCountry(code);
    setCurrentFieldIndex(0);
    setShowReview(false);
    setFieldError(null);
    setStep(3);
  }

  function handleFieldChange(name: string, value: string) {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  }

  function handleGenerate() {
    if (!activeDoc || !activeCountry) return;
    const result = generatePreview(activeDoc, activeCountry, answers);
    setPreview(result);
    setStep(5);
  }

  function handleReset() {
    setStep(1);
    setSelectedDoc(null);
    setSelectedCountry(null);
    setAnswers({});
    setPreview(null);
    setCurrentFieldIndex(0);
    setShowReview(false);
    setFieldError(null);
  }

  const requiredFieldsFilled = fields
    .filter((f) => f.required)
    .every((f) => answers[f.name]?.trim());

  /* ---- step bar ---- */

  const stepLabels = [
    "Document type",
    "Country",
    "Questions",
    "Generate",
    "Preview",
  ];

  return (
    <div className="rounded-2xl border border-navy-100 bg-white shadow-card">
      {/* Step indicator */}
      <div className="flex items-center gap-1 border-b border-navy-100 px-6 py-4 overflow-x-auto">
        {stepLabels.map((label, i) => {
          const sn = i + 1;
          const active = sn === step;
          const done = sn < step;
          return (
            <button
              key={label}
              type="button"
              disabled={sn > step}
              onClick={() => {
                if (sn < step) setStep(sn);
              }}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-gold-50 text-gold-700"
                  : done
                    ? "text-forest-600 hover:bg-forest-50 cursor-pointer"
                    : "text-navy-300 cursor-default"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  active
                    ? "bg-gold-400 text-navy-900"
                    : done
                      ? "bg-forest-100 text-forest-700"
                      : "bg-navy-100 text-navy-400"
                }`}
              >
                {done ? (
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  sn
                )}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6 sm:p-8">
        {/* STEP 1: Select document type */}
        {step === 1 && (
          <div>
            <h3 className="font-serif text-xl text-navy-800">
              What document do you need?
            </h3>
            <p className="mt-2 text-sm text-navy-400">
              Select the document type. Each one is drafted against the rules of
              your chosen jurisdiction.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {docTypes.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => selectDocType(d.id)}
                  className={`group flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover ${
                    selectedDoc === d.id
                      ? "border-gold-400 bg-gold-50/50 shadow-card"
                      : "border-navy-100 bg-white hover:border-gold-300"
                  }`}
                >
                  <span
                    className={`mt-0.5 shrink-0 rounded-lg p-2 transition-colors ${
                      selectedDoc === d.id
                        ? "bg-gold-100 text-gold-700"
                        : "bg-navy-50 text-navy-400 group-hover:bg-gold-50 group-hover:text-gold-600"
                    }`}
                  >
                    <DocIcon icon={d.icon} />
                  </span>
                  <div>
                    <p className="font-semibold text-navy-700">{d.name}</p>
                    <p className="mt-0.5 text-xs text-navy-400">{d.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Select country */}
        {step === 2 && (
          <div>
            <h3 className="font-serif text-xl text-navy-800">
              Which country&rsquo;s laws apply?
            </h3>
            <p className="mt-2 text-sm text-navy-400">
              Your{" "}
              <span className="font-semibold text-navy-600">
                {activeDoc?.name}
              </span>{" "}
              will be drafted to comply with the laws of the country you select.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => selectCountry(c.code)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover ${
                    selectedCountry === c.code
                      ? "border-gold-400 bg-gold-50/50 shadow-card"
                      : "border-navy-100 bg-white hover:border-gold-300"
                  }`}
                >
                  <span className="text-2xl">{c.flag}</span>
                  <span className="font-semibold text-navy-700">{c.name}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-6 text-sm font-medium text-navy-400 hover:text-navy-600"
            >
              &larr; Back to document types
            </button>
          </div>
        )}

        {/* STEP 3: Answer questions — progressive disclosure, one field at a time */}
        {step === 3 && (() => {
          const currentField = fields[currentFieldIndex];
          const isLastField = currentFieldIndex === fields.length - 1;

          function advanceField() {
            if (!currentField) return;
            if (currentField.required && !answers[currentField.name]?.trim()) {
              setFieldError(`Please fill in "${currentField.label}" before continuing.`);
              return;
            }
            setFieldError(null);
            if (isLastField) {
              setShowReview(true);
            } else {
              setCurrentFieldIndex((i) => i + 1);
            }
          }

          function goBackField() {
            setFieldError(null);
            if (showReview) {
              setShowReview(false);
            } else if (currentFieldIndex === 0) {
              setStep(2);
            } else {
              setCurrentFieldIndex((i) => i - 1);
            }
          }

          function renderInput(f: FormField) {
            const inputClass =
              "mt-3 w-full rounded-xl border-2 border-navy-200 bg-white px-5 py-4 text-base text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-colors";
            if (f.type === "textarea") {
              return (
                <textarea
                  id={`wiz-${f.name}`}
                  rows={4}
                  placeholder={f.placeholder}
                  value={answers[f.name] ?? ""}
                  onChange={(e) => {
                    handleFieldChange(f.name, e.target.value);
                    setFieldError(null);
                  }}
                  className={inputClass}
                />
              );
            }
            if (f.type === "select") {
              return (
                <select
                  id={`wiz-${f.name}`}
                  value={answers[f.name] ?? ""}
                  onChange={(e) => {
                    handleFieldChange(f.name, e.target.value);
                    setFieldError(null);
                  }}
                  className={inputClass}
                >
                  <option value="">Select…</option>
                  {f.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              );
            }
            return (
              <input
                id={`wiz-${f.name}`}
                type={f.type}
                placeholder={f.placeholder}
                value={answers[f.name] ?? ""}
                onChange={(e) => {
                  handleFieldChange(f.name, e.target.value);
                  setFieldError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") advanceField();
                }}
                className={inputClass}
              />
            );
          }

          /* Review / summary view */
          if (showReview) {
            return (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-navy-800">
                    Review your answers
                  </h3>
                  <span className="text-xs font-semibold text-navy-400">
                    {activeDoc?.name} &middot; {activeCountry?.flag}{" "}
                    {activeCountry?.name}
                  </span>
                </div>
                <p className="mt-2 text-sm text-navy-400">
                  Check everything looks right. You can go back to change any
                  answer before generating.
                </p>
                <div className="mt-6 divide-y divide-navy-100 rounded-xl border border-navy-100 overflow-hidden">
                  {fields.map((f, idx) => (
                    <div
                      key={f.name}
                      className="flex items-start gap-4 px-5 py-4 hover:bg-navy-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy-400 uppercase tracking-wide">
                          {f.label}
                        </p>
                        <p className="mt-1 text-sm text-navy-700 break-words">
                          {answers[f.name]?.trim() ? (
                            answers[f.name]
                          ) : (
                            <span className="italic text-navy-300">
                              Not answered
                            </span>
                          )}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentFieldIndex(idx);
                          setShowReview(false);
                          setFieldError(null);
                        }}
                        className="shrink-0 text-xs font-semibold text-gold-600 hover:text-gold-700 mt-1"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={goBackField}
                    className="text-sm font-medium text-navy-400 hover:text-navy-600"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    disabled={!requiredFieldsFilled}
                    onClick={handleGenerate}
                    className="inline-flex items-center justify-center rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:bg-gold-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  >
                    Generate document &rarr;
                  </button>
                </div>
              </div>
            );
          }

          /* Single-field view */
          if (!currentField) return null;
          return (
            <div>
              {/* Mini context header */}
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-wide">
                {activeDoc?.name} &middot; {activeCountry?.flag}{" "}
                {activeCountry?.name}
              </p>

              {/* Field progress indicator */}
              <p className="mt-1 text-xs text-navy-300">
                Question {currentFieldIndex + 1} of {fields.length}
              </p>

              {/* Progress bar */}
              <div className="mt-2 h-1 w-full rounded-full bg-navy-100">
                <div
                  className="h-1 rounded-full bg-gold-400 transition-all duration-300"
                  style={{
                    width: `${((currentFieldIndex + 1) / fields.length) * 100}%`,
                  }}
                />
              </div>

              {/* The question — fades in on each field change */}
              <div key={currentFieldIndex} className="mt-8 animate-fade-up">
                <label
                  htmlFor={`wiz-${currentField.name}`}
                  className="block font-serif text-2xl text-navy-800 leading-snug"
                >
                  {currentField.label}
                  {currentField.required && (
                    <span className="ml-1 text-plum-500 font-sans text-base">
                      *
                    </span>
                  )}
                </label>
                {currentField.helperText && (
                  <p className="mt-2 text-sm text-navy-400">
                    {currentField.helperText}
                  </p>
                )}
                {renderInput(currentField)}

                {/* Validation error */}
                {fieldError && (
                  <p className="mt-2 text-sm font-medium text-plum-600">
                    {fieldError}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goBackField}
                  className="text-sm font-medium text-navy-400 hover:text-navy-600"
                >
                  &larr; Back
                </button>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFieldError(null);
                      setShowReview(true);
                    }}
                    className="text-sm font-medium text-navy-400 hover:text-navy-600 text-right"
                  >
                    Review all
                  </button>
                  <button
                    type="button"
                    onClick={advanceField}
                    className="inline-flex items-center justify-center rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:bg-gold-300 hover:shadow-md min-h-[44px] sm:w-auto w-full"
                  >
                    {isLastField ? "Review answers" : "Continue"} &rarr;
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* STEP 5: Preview */}
        {step === 5 && preview && (
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-navy-800">
                Your draft is ready.
              </h3>
              <span className="rounded-lg bg-gold-50 px-3 py-1 text-xs font-bold text-gold-700">
                DRAFT
              </span>
            </div>
            <p className="mt-2 text-sm text-navy-400">
              This is an AI-generated draft of your{" "}
              <span className="font-semibold text-navy-600">
                {activeDoc?.name}
              </span>{" "}
              under{" "}
              <span className="font-semibold text-navy-600">
                {activeCountry?.name}
              </span>{" "}
              law. Review with a professional before relying on it.
            </p>

            {/* Document preview */}
            <div className="mt-6 max-h-[480px] overflow-y-auto rounded-xl border border-navy-200 bg-navy-50 p-6">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-navy-700">
                {preview}
              </pre>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([preview], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${activeDoc?.id ?? "document"}-draft.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="inline-flex items-center justify-center rounded-xl bg-navy-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 hover:shadow-md"
              >
                Download draft (free)
              </button>
              <a
                href="/directory"
                className="inline-flex items-center justify-center rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:bg-gold-300 hover:shadow-md"
              >
                Have a professional review ($99) &rarr;
              </a>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-6 text-sm font-medium text-navy-400 hover:text-navy-600"
            >
              &larr; Start a new document
            </button>

            {/* AI Disclaimer */}
            <div className="mt-8 rounded-xl border border-navy-100 bg-navy-50 px-6 py-5 text-sm">
              <p className="font-semibold text-navy-600">AI Disclaimer</p>
              <p className="mt-1 leading-relaxed text-navy-400">
                This content is generated by AI for research and informational
                purposes only. It does not constitute legal advice, tax advice,
                or professional advice of any kind. It does not create an
                attorney-client or accountant-client relationship. Always verify
                AI-generated content with a qualified professional before
                reliance. Marco Reid is a tool for professionals, not a
                substitute for professional judgment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
