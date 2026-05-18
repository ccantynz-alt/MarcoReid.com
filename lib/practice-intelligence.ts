export interface ClientProfitability {
  clientId: string;
  clientName: string;
  totalRevenue: number;
  totalCost: number;
  profitMargin: number;
  hoursConsumed: number;
  effectiveRate: number;
  trend: "improving" | "stable" | "declining";
  recommendation: string;
}

export interface ScopeCreepAlert {
  matterId: string;
  matterTitle: string;
  clientName: string;
  quotedHours: number;
  actualHours: number;
  overagePercent: number;
  unbilledAmount: number;
  recommendation: string;
}

export interface CashFlowForecast {
  period: string;
  expectedIncome: number;
  expectedExpenses: number;
  netCashFlow: number;
  confidence: number;
}

export interface CapacityMetric {
  currentClients: number;
  maxRecommended: number;
  utilizationPercent: number;
  availableHoursPerWeek: number;
  recommendation: string;
}

export interface DebtorAging {
  clientId: string;
  clientName: string;
  invoiceId: string;
  amount: number;
  daysOverdue: number;
  category: "current" | "30-days" | "60-days" | "90-plus";
  autoChaseStatus: "pending" | "reminder-sent" | "follow-up-sent" | "final-notice" | "collections";
  nextActionDate: string;
}

export interface YearEndChecklistItem {
  id: string;
  category: string;
  task: string;
  jurisdiction: string;
  dueDate: string;
  status: "not-started" | "in-progress" | "complete" | "not-applicable";
  notes: string;
}

export interface FeeRecommendation {
  matterType: string;
  jurisdiction: string;
  currentRate: number;
  marketMedian: number;
  marketP75: number;
  recommendation: string;
  potentialRevenueLift: number;
}

// Generate sample data for demos
export function getClientProfitability(): ClientProfitability[] {
  return [
    { clientId: "1", clientName: "Meridian Corp", totalRevenue: 24500_00, totalCost: 18200_00, profitMargin: 25.7, hoursConsumed: 52, effectiveRate: 471, trend: "stable", recommendation: "Client is profitable. Consider annual rate review." },
    { clientId: "2", clientName: "Thompson Family Trust", totalRevenue: 8900_00, totalCost: 12400_00, profitMargin: -39.3, hoursConsumed: 31, effectiveRate: 287, trend: "declining", recommendation: "Client is unprofitable. Scope creep detected — 3 out-of-scope queries this month. Raise fees or renegotiate scope." },
    { clientId: "3", clientName: "Pacific Holdings Ltd", totalRevenue: 45000_00, totalCost: 28000_00, profitMargin: 37.8, hoursConsumed: 80, effectiveRate: 562, trend: "improving", recommendation: "Highly profitable. Potential for expanded services (payroll, tax planning)." },
    { clientId: "4", clientName: "Chen, Wei (Individual)", totalRevenue: 3200_00, totalCost: 4800_00, profitMargin: -50.0, hoursConsumed: 12, effectiveRate: 267, trend: "declining", recommendation: "Significantly unprofitable. Consider transitioning to fixed-fee arrangement or referring to junior practitioner." },
    { clientId: "5", clientName: "Greenfield Developments", totalRevenue: 18700_00, totalCost: 14200_00, profitMargin: 24.1, hoursConsumed: 42, effectiveRate: 445, trend: "stable", recommendation: "Healthy margin. Year-end tax planning opportunity identified." },
  ];
}

export function getScopeCreepAlerts(): ScopeCreepAlert[] {
  return [
    { matterId: "1", matterTitle: "Annual accounts preparation", clientName: "Thompson Family Trust", quotedHours: 8, actualHours: 27.5, overagePercent: 244, unbilledAmount: 5850_00, recommendation: "Client consistently exceeds scope. Recommend: (1) Bill for excess hours immediately, (2) Renegotiate engagement letter with clear scope boundaries, (3) Consider fixed-fee with scope exclusions." },
    { matterId: "2", matterTitle: "GST returns — quarterly", clientName: "Chen, Wei", quotedHours: 2, actualHours: 5.5, overagePercent: 175, unbilledAmount: 1050_00, recommendation: "Client bookkeeping quality is poor, causing excess preparation time. Recommend: (1) Offer bookkeeping add-on service, (2) Provide client with receipt scanning training, (3) Adjust quarterly fee to reflect actual effort." },
  ];
}

export function getCashFlowForecast(): CashFlowForecast[] {
  return [
    { period: "This month", expectedIncome: 42000_00, expectedExpenses: 28000_00, netCashFlow: 14000_00, confidence: 92 },
    { period: "Next month", expectedIncome: 38000_00, expectedExpenses: 27000_00, netCashFlow: 11000_00, confidence: 78 },
    { period: "Month 3", expectedIncome: 45000_00, expectedExpenses: 29000_00, netCashFlow: 16000_00, confidence: 65 },
  ];
}

export function getCapacityMetric(): CapacityMetric {
  return {
    currentClients: 34,
    maxRecommended: 40,
    utilizationPercent: 85,
    availableHoursPerWeek: 6,
    recommendation: "You have capacity for approximately 3 more clients at current service levels. Beyond that, quality metrics typically decline. Consider hiring before taking additional clients.",
  };
}

export function getDebtorAging(): DebtorAging[] {
  return [
    { clientId: "1", clientName: "Meridian Corp", invoiceId: "INV-2024-089", amount: 4500_00, daysOverdue: 0, category: "current", autoChaseStatus: "pending", nextActionDate: "Due in 14 days" },
    { clientId: "2", clientName: "Thompson Family Trust", invoiceId: "INV-2024-076", amount: 2800_00, daysOverdue: 35, category: "30-days", autoChaseStatus: "reminder-sent", nextActionDate: "Follow-up in 3 days" },
    { clientId: "3", clientName: "Chen, Wei", invoiceId: "INV-2024-062", amount: 1200_00, daysOverdue: 67, category: "60-days", autoChaseStatus: "follow-up-sent", nextActionDate: "Final notice in 7 days" },
    { clientId: "4", clientName: "Old Client Ltd", invoiceId: "INV-2024-041", amount: 8900_00, daysOverdue: 95, category: "90-plus", autoChaseStatus: "final-notice", nextActionDate: "Collections review" },
  ];
}

export function getYearEndChecklist(jurisdiction: string): YearEndChecklistItem[] {
  const nz: YearEndChecklistItem[] = [
    { id: "1", category: "Tax", task: "Prepare IR3/IR4 income tax returns", jurisdiction: "NZ", dueDate: "7 July", status: "not-started", notes: "Due 7 July (or 31 March for non-agent)" },
    { id: "2", category: "Tax", task: "Calculate and confirm provisional tax obligations", jurisdiction: "NZ", dueDate: "28 August", status: "not-started", notes: "Terminal tax due 7 Feb; provtax instalments throughout year" },
    { id: "3", category: "GST", task: "File final GST return for period", jurisdiction: "NZ", dueDate: "28th following", status: "not-started", notes: "28th of month following end of period" },
    { id: "4", category: "Payroll", task: "Reconcile PAYE and confirm employer monthly schedules", jurisdiction: "NZ", dueDate: "Ongoing", status: "not-started", notes: "IR348 due 20th of following month" },
    { id: "5", category: "KiwiSaver", task: "Confirm KiwiSaver contributions reconciled", jurisdiction: "NZ", dueDate: "Year-end", status: "not-started", notes: "Ensure all contributions remitted to IR" },
    { id: "6", category: "Trust", task: "Three-way trust account reconciliation", jurisdiction: "NZ", dueDate: "Quarterly", status: "not-started", notes: "NZLS Trust Account Regulations" },
    { id: "7", category: "Compliance", task: "AML/CFT annual risk assessment review", jurisdiction: "NZ", dueDate: "Annual", status: "not-started", notes: "Required under AML/CFT Act 2009" },
    { id: "8", category: "Admin", task: "Update engagement letters for new year", jurisdiction: "NZ", dueDate: "Before new work", status: "not-started", notes: "Best practice for all continuing engagements" },
  ];

  const au: YearEndChecklistItem[] = [
    { id: "1", category: "Tax", task: "Lodge individual tax returns", jurisdiction: "AU", dueDate: "15 May (agent)", status: "not-started", notes: "Due 31 Oct (non-agent) or 15 May (agent lodged)" },
    { id: "2", category: "Tax", task: "Lodge company tax returns", jurisdiction: "AU", dueDate: "15 May (agent)", status: "not-started", notes: "Company return due date varies by entity type" },
    { id: "3", category: "BAS", task: "Lodge final BAS for quarter/month", jurisdiction: "AU", dueDate: "28th following", status: "not-started", notes: "28th of month following end of quarter" },
    { id: "4", category: "STP", task: "STP finalisation declaration", jurisdiction: "AU", dueDate: "14 July", status: "not-started", notes: "Annual STP finalisation due 14 July" },
    { id: "5", category: "Super", task: "Confirm superannuation guarantee payments", jurisdiction: "AU", dueDate: "28th quarterly", status: "not-started", notes: "SG charge applies if late" },
    { id: "6", category: "Trust", task: "Trust account annual audit", jurisdiction: "AU", dueDate: "Per state rules", status: "not-started", notes: "Varies by state — check with Law Society" },
    { id: "7", category: "Compliance", task: "TPAR (Taxable Payments Annual Report)", jurisdiction: "AU", dueDate: "28 August", status: "not-started", notes: "If applicable to building/cleaning/courier etc." },
    { id: "8", category: "Admin", task: "Review client engagement letters", jurisdiction: "AU", dueDate: "Annual", status: "not-started", notes: "Best practice — update fee schedules" },
  ];

  const uk: YearEndChecklistItem[] = [
    { id: "1", category: "Tax", task: "File Self Assessment returns (SA100)", jurisdiction: "UK", dueDate: "31 January", status: "not-started", notes: "Paper: 31 Oct. Online: 31 Jan following tax year end" },
    { id: "2", category: "Tax", task: "File Corporation Tax returns (CT600)", jurisdiction: "UK", dueDate: "12 months after period end", status: "not-started", notes: "Tax payment due 9 months and 1 day after period end" },
    { id: "3", category: "VAT", task: "File final VAT return (MTD)", jurisdiction: "UK", dueDate: "1 month + 7 days after quarter end", status: "not-started", notes: "Making Tax Digital — digital links required" },
    { id: "4", category: "Payroll", task: "P11D benefits in kind reporting", jurisdiction: "UK", dueDate: "6 July", status: "not-started", notes: "Report benefits provided to employees" },
    { id: "5", category: "Payroll", task: "P60 end of year certificates", jurisdiction: "UK", dueDate: "31 May", status: "not-started", notes: "Issue to all employees by 31 May" },
    { id: "6", category: "Pension", task: "Confirm auto-enrolment pension compliance", jurisdiction: "UK", dueDate: "Ongoing", status: "not-started", notes: "Re-enrolment every 3 years" },
    { id: "7", category: "Trust", task: "SRA annual accountant's report", jurisdiction: "UK", dueDate: "6 months after accounting period", status: "not-started", notes: "SRA Accounts Rules 2019" },
    { id: "8", category: "AML", task: "MLR 2017 firm-wide risk assessment review", jurisdiction: "UK", dueDate: "Annual", status: "not-started", notes: "Money Laundering Regulations 2017" },
  ];

  const us: YearEndChecklistItem[] = [
    { id: "1", category: "Tax", task: "File individual returns (Form 1040)", jurisdiction: "US", dueDate: "15 April (or Oct with extension)", status: "not-started", notes: "Automatic 6-month extension available with Form 4868" },
    { id: "2", category: "Tax", task: "File corporate returns (Form 1120)", jurisdiction: "US", dueDate: "15 April (calendar year)", status: "not-started", notes: "C-corps: 15 April. S-corps/partnerships: 15 March" },
    { id: "3", category: "Payroll", task: "File Form 941 (quarterly payroll)", jurisdiction: "US", dueDate: "End of month following quarter", status: "not-started", notes: "Quarterly federal payroll tax return" },
    { id: "4", category: "Payroll", task: "Issue W-2s and 1099s", jurisdiction: "US", dueDate: "31 January", status: "not-started", notes: "Must be provided to recipients by 31 Jan" },
    { id: "5", category: "State", task: "File state income tax returns", jurisdiction: "US", dueDate: "Varies by state", status: "not-started", notes: "Most states follow federal deadline" },
    { id: "6", category: "Sales Tax", task: "File state sales tax returns", jurisdiction: "US", dueDate: "Varies by state", status: "not-started", notes: "Monthly/quarterly/annual depending on volume" },
    { id: "7", category: "Trust", task: "IOLTA three-way reconciliation", jurisdiction: "US", dueDate: "Monthly recommended", status: "not-started", notes: "State bar rules vary — monthly is best practice" },
    { id: "8", category: "Compliance", task: "FinCEN BOI (Beneficial Ownership) reporting", jurisdiction: "US", dueDate: "Various", status: "not-started", notes: "Corporate Transparency Act requirements" },
  ];

  const ca: YearEndChecklistItem[] = [
    { id: "1", category: "Tax", task: "File T1 individual returns", jurisdiction: "CA", dueDate: "30 April (15 June self-employed)", status: "not-started", notes: "Balance due always 30 April regardless of filing deadline" },
    { id: "2", category: "Tax", task: "File T2 corporate returns", jurisdiction: "CA", dueDate: "6 months after year-end", status: "not-started", notes: "Tax balance due 2-3 months after year-end" },
    { id: "3", category: "GST/HST", task: "File GST/HST return", jurisdiction: "CA", dueDate: "3 months after fiscal year-end", status: "not-started", notes: "Annual filers; quarterly filers due 1 month after quarter" },
    { id: "4", category: "Payroll", task: "T4/T4A information returns", jurisdiction: "CA", dueDate: "28 February", status: "not-started", notes: "Must file T4 slips for all employees by end of Feb" },
    { id: "5", category: "Payroll", task: "Confirm CPP/EI remittances reconciled", jurisdiction: "CA", dueDate: "Ongoing", status: "not-started", notes: "Remittance frequency depends on average monthly withholdings" },
    { id: "6", category: "Quebec", task: "File Quebec TP-1/CO-17 (if applicable)", jurisdiction: "CA", dueDate: "Same as federal", status: "not-started", notes: "Revenu Québec — separate filing required" },
    { id: "7", category: "Trust", task: "Law Society trust account audit", jurisdiction: "CA", dueDate: "Per provincial rules", status: "not-started", notes: "Varies by province — LSO, LSBC, Barreau du Québec" },
    { id: "8", category: "Compliance", task: "FINTRAC reporting review", jurisdiction: "CA", dueDate: "Annual", status: "not-started", notes: "PCMLTFA obligations for lawyers and accountants" },
  ];

  switch (jurisdiction) {
    case "NZ": return nz;
    case "AU": return au;
    case "UK": return uk;
    case "US": return us;
    case "CA": return ca;
    default: return us;
  }
}

export function getFeeRecommendations(jurisdiction: string): FeeRecommendation[] {
  const base: FeeRecommendation[] = [
    { matterType: "Tax return preparation (individual)", jurisdiction, currentRate: 180_00, marketMedian: 220_00, marketP75: 280_00, recommendation: "You are charging 18% below market median. Consider increasing to at least $220/hr or implementing value-based pricing.", potentialRevenueLift: 8400_00 },
    { matterType: "Annual accounts preparation", jurisdiction, currentRate: 200_00, marketMedian: 245_00, marketP75: 320_00, recommendation: "Below market median by 18%. Your expertise level supports P75 pricing. Raise incrementally over 2 billing cycles.", potentialRevenueLift: 12600_00 },
    { matterType: "GST/VAT advisory", jurisdiction, currentRate: 250_00, marketMedian: 240_00, marketP75: 310_00, recommendation: "At market rate. Good. Consider fixed-fee packaging for recurring advisory to increase perceived value.", potentialRevenueLift: 0 },
    { matterType: "Tax dispute representation", jurisdiction, currentRate: 350_00, marketMedian: 420_00, marketP75: 550_00, recommendation: "Significantly below market for specialist work. Tax dispute specialists command premium rates. Immediate rate correction recommended.", potentialRevenueLift: 21000_00 },
  ];
  return base;
}
