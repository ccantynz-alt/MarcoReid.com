"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getClientProfitability,
  getScopeCreepAlerts,
  getCashFlowForecast,
  getCapacityMetric,
  getDebtorAging,
  getYearEndChecklist,
  getFeeRecommendations,
  type ClientProfitability,
  type ScopeCreepAlert,
  type CashFlowForecast,
  type CapacityMetric,
  type DebtorAging,
  type YearEndChecklistItem,
  type FeeRecommendation,
} from "@/lib/practice-intelligence";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function TrendArrow({ trend }: { trend: ClientProfitability["trend"] }) {
  if (trend === "improving") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-forest-600">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        Improving
      </span>
    );
  }
  if (trend === "declining") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Declining
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-navy-400">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
      Stable
    </span>
  );
}

function AgingBadge({ category }: { category: DebtorAging["category"] }) {
  const styles: Record<DebtorAging["category"], string> = {
    current: "bg-forest-50 text-forest-700",
    "30-days": "bg-amber-100 text-amber-700",
    "60-days": "bg-orange-100 text-orange-700",
    "90-plus": "bg-red-100 text-red-700",
  };
  const labels: Record<DebtorAging["category"], string> = {
    current: "Current",
    "30-days": "30 days",
    "60-days": "60 days",
    "90-plus": "90+ days",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles[category]}`}>
      {labels[category]}
    </span>
  );
}

function ChaseStatusBadge({ status }: { status: DebtorAging["autoChaseStatus"] }) {
  const styles: Record<DebtorAging["autoChaseStatus"], string> = {
    pending: "bg-navy-100 text-navy-600",
    "reminder-sent": "bg-blue-100 text-blue-700",
    "follow-up-sent": "bg-amber-100 text-amber-700",
    "final-notice": "bg-orange-100 text-orange-700",
    collections: "bg-red-100 text-red-700",
  };
  const labels: Record<DebtorAging["autoChaseStatus"], string> = {
    pending: "Pending",
    "reminder-sent": "Reminder sent",
    "follow-up-sent": "Follow-up sent",
    "final-notice": "Final notice",
    collections: "Collections",
  };
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Section components
// ---------------------------------------------------------------------------

function ClientProfitabilitySection({ data }: { data: ClientProfitability[] }) {
  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Client Profitability</h2>
      <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
        Real-time profitability analysis for every client in your practice.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 dark:border-navy-700">
              <th className="pb-3 text-left font-semibold text-navy-500 dark:text-navy-400">Client</th>
              <th className="pb-3 text-right font-semibold text-navy-500 dark:text-navy-400">Revenue</th>
              <th className="pb-3 text-right font-semibold text-navy-500 dark:text-navy-400">Cost</th>
              <th className="pb-3 text-right font-semibold text-navy-500 dark:text-navy-400">Margin</th>
              <th className="pb-3 text-right font-semibold text-navy-500 dark:text-navy-400">Eff. Rate</th>
              <th className="pb-3 text-center font-semibold text-navy-500 dark:text-navy-400">Trend</th>
              <th className="pb-3 text-left font-semibold text-navy-500 dark:text-navy-400">Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50 dark:divide-navy-700">
            {data.map((client) => (
              <tr key={client.clientId} className="group">
                <td className="py-3 font-medium text-navy-700 dark:text-navy-200">{client.clientName}</td>
                <td className="py-3 text-right text-navy-600 dark:text-navy-300">{formatMoney(client.totalRevenue)}</td>
                <td className="py-3 text-right text-navy-600 dark:text-navy-300">{formatMoney(client.totalCost)}</td>
                <td className={`py-3 text-right font-semibold ${client.profitMargin < 0 ? "text-red-600 dark:text-red-400" : client.profitMargin > 30 ? "text-forest-600 dark:text-forest-400" : "text-navy-700 dark:text-navy-200"}`}>
                  {client.profitMargin > 0 ? "+" : ""}{client.profitMargin.toFixed(1)}%
                </td>
                <td className="py-3 text-right text-navy-600 dark:text-navy-300">${client.effectiveRate}/hr</td>
                <td className="py-3 text-center"><TrendArrow trend={client.trend} /></td>
                <td className="py-3 text-xs text-navy-500 dark:text-navy-400 max-w-[240px]">{client.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ScopeCreepSection({ data }: { data: ScopeCreepAlert[] }) {
  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-red-600 dark:text-red-400" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </span>
        <div>
          <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Scope Creep Alerts</h2>
          <p className="text-sm text-navy-400 dark:text-navy-500">Matters exceeding quoted hours — you are losing money.</p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {data.map((alert) => (
          <div key={alert.matterId} className="rounded-xl border-l-4 border-l-red-500 border border-red-200 bg-red-50/50 p-5 dark:border-red-800 dark:bg-red-900/10">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-navy-800 dark:text-navy-100">{alert.matterTitle}</h3>
                <p className="text-sm text-navy-500 dark:text-navy-400">{alert.clientName}</p>
              </div>
              <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/60 dark:text-red-300">
                +{alert.overagePercent}%
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-navy-400 dark:text-navy-500">Quoted</span>
                <p className="font-semibold text-navy-700 dark:text-navy-200">{alert.quotedHours}h</p>
              </div>
              <div>
                <span className="text-navy-400 dark:text-navy-500">Actual</span>
                <p className="font-semibold text-red-600 dark:text-red-400">{alert.actualHours}h</p>
              </div>
              <div>
                <span className="text-navy-400 dark:text-navy-500">Unbilled</span>
                <p className="font-semibold text-red-600 dark:text-red-400">{formatMoney(alert.unbilledAmount)}</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-navy-600 dark:text-navy-300">{alert.recommendation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CashFlowSection({ data }: { data: CashFlowForecast[] }) {
  const maxIncome = Math.max(...data.map((d) => d.expectedIncome));

  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Cash Flow Forecast</h2>
      <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
        AI-predicted firm cash flow based on WIP, invoices, and historical patterns.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {data.map((forecast) => (
          <div key={forecast.period} className="rounded-xl border border-navy-100 p-4 dark:border-navy-700">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">{forecast.period}</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-500 dark:text-navy-400">Income</span>
                <span className="font-semibold text-forest-600 dark:text-forest-400">{formatMoney(forecast.expectedIncome)}</span>
              </div>
              <div className="h-2 rounded-full bg-navy-100 dark:bg-navy-700">
                <div
                  className="h-2 rounded-full bg-forest-500"
                  style={{ width: `${(forecast.expectedIncome / maxIncome) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-500 dark:text-navy-400">Expenses</span>
                <span className="font-semibold text-red-600 dark:text-red-400">{formatMoney(forecast.expectedExpenses)}</span>
              </div>
              <div className="h-2 rounded-full bg-navy-100 dark:bg-navy-700">
                <div
                  className="h-2 rounded-full bg-red-400"
                  style={{ width: `${(forecast.expectedExpenses / maxIncome) * 100}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-navy-100 pt-2 dark:border-navy-700">
                <span className="text-sm font-semibold text-navy-700 dark:text-navy-200">Net</span>
                <span className="text-sm font-bold text-forest-700 dark:text-forest-300">{formatMoney(forecast.netCashFlow)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-navy-400 dark:text-navy-500">Confidence</span>
                <span className={`text-xs font-semibold ${forecast.confidence >= 80 ? "text-forest-600" : forecast.confidence >= 60 ? "text-amber-600" : "text-red-600"}`}>
                  {forecast.confidence}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CapacitySection({ data }: { data: CapacityMetric }) {
  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Capacity Planner</h2>
      <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
        Understand your firm&apos;s bandwidth before taking on new work.
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Clients</p>
          <p className="mt-1 font-serif text-3xl text-navy-800 dark:text-white">{data.currentClients}<span className="text-lg text-navy-400">/{data.maxRecommended}</span></p>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Utilization</p>
          <p className={`mt-1 font-serif text-3xl ${data.utilizationPercent > 90 ? "text-red-600" : data.utilizationPercent > 75 ? "text-amber-600" : "text-forest-600"}`}>
            {data.utilizationPercent}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Available</p>
          <p className="mt-1 font-serif text-3xl text-navy-800 dark:text-white">{data.availableHoursPerWeek}<span className="text-lg text-navy-400">h/wk</span></p>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Room for</p>
          <p className="mt-1 font-serif text-3xl text-forest-600 dark:text-forest-400">~{data.maxRecommended - data.currentClients}<span className="text-lg text-navy-400"> clients</span></p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-navy-400 dark:text-navy-500">
          <span>0%</span>
          <span>Utilization</span>
          <span>100%</span>
        </div>
        <div className="mt-1 h-3 w-full rounded-full bg-navy-100 dark:bg-navy-700">
          <div
            className={`h-3 rounded-full transition-all ${data.utilizationPercent > 90 ? "bg-red-500" : data.utilizationPercent > 75 ? "bg-amber-500" : "bg-forest-500"}`}
            style={{ width: `${data.utilizationPercent}%` }}
          />
        </div>
      </div>
      <p className="mt-4 rounded-lg bg-navy-50 p-3 text-sm text-navy-600 dark:bg-navy-900 dark:text-navy-300">
        {data.recommendation}
      </p>
    </section>
  );
}

function DebtorAgingSection({ data }: { data: DebtorAging[] }) {
  const totalOutstanding = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Aged Debtors</h2>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            Automated debtor chasing with escalation workflows.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Total Outstanding</p>
          <p className="font-serif text-2xl text-navy-800 dark:text-white">{formatMoney(totalOutstanding)}</p>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 dark:border-navy-700">
              <th className="pb-3 text-left font-semibold text-navy-500 dark:text-navy-400">Client</th>
              <th className="pb-3 text-left font-semibold text-navy-500 dark:text-navy-400">Invoice</th>
              <th className="pb-3 text-right font-semibold text-navy-500 dark:text-navy-400">Amount</th>
              <th className="pb-3 text-center font-semibold text-navy-500 dark:text-navy-400">Age</th>
              <th className="pb-3 text-center font-semibold text-navy-500 dark:text-navy-400">Chase Status</th>
              <th className="pb-3 text-left font-semibold text-navy-500 dark:text-navy-400">Next Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50 dark:divide-navy-700">
            {data.map((debtor) => (
              <tr key={debtor.invoiceId}>
                <td className="py-3 font-medium text-navy-700 dark:text-navy-200">{debtor.clientName}</td>
                <td className="py-3 font-mono text-xs text-navy-500 dark:text-navy-400">{debtor.invoiceId}</td>
                <td className="py-3 text-right font-semibold text-navy-700 dark:text-navy-200">{formatMoney(debtor.amount)}</td>
                <td className="py-3 text-center"><AgingBadge category={debtor.category} /></td>
                <td className="py-3 text-center"><ChaseStatusBadge status={debtor.autoChaseStatus} /></td>
                <td className="py-3 text-sm text-navy-600 dark:text-navy-300">{debtor.nextActionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FeeRecommendationsSection({ data }: { data: FeeRecommendation[] }) {
  const totalLift = data.reduce((sum, d) => sum + d.potentialRevenueLift, 0);

  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Fee Recommendations</h2>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            Benchmark your rates against market data and identify revenue opportunities.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Potential Revenue Lift</p>
          <p className="font-serif text-2xl text-forest-600 dark:text-forest-400">{formatMoney(totalLift)}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {data.map((rec) => (
          <div key={rec.matterType} className="rounded-xl border border-navy-100 p-4 dark:border-navy-700">
            <h3 className="font-semibold text-navy-700 dark:text-navy-200">{rec.matterType}</h3>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-500">Your Rate</p>
                <p className="mt-0.5 font-semibold text-navy-700 dark:text-navy-200">{formatMoney(rec.currentRate)}/hr</p>
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-500">Market Median</p>
                <p className="mt-0.5 font-semibold text-amber-600 dark:text-amber-400">{formatMoney(rec.marketMedian)}/hr</p>
              </div>
              <div>
                <p className="text-xs text-navy-400 dark:text-navy-500">Market P75</p>
                <p className="mt-0.5 font-semibold text-forest-600 dark:text-forest-400">{formatMoney(rec.marketP75)}/hr</p>
              </div>
            </div>
            {rec.potentialRevenueLift > 0 && (
              <div className="mt-3 rounded-lg bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700 dark:bg-forest-900/30 dark:text-forest-300">
                Potential annual lift: {formatMoney(rec.potentialRevenueLift)}
              </div>
            )}
            <p className="mt-2 text-xs leading-relaxed text-navy-500 dark:text-navy-400">{rec.recommendation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function YearEndChecklistSection({
  checklist,
  jurisdiction,
  onJurisdictionChange,
  onToggle,
}: {
  checklist: YearEndChecklistItem[];
  jurisdiction: string;
  onJurisdictionChange: (j: string) => void;
  onToggle: (id: string) => void;
}) {
  const completedCount = checklist.filter((i) => i.status === "complete").length;
  const completionPercent = Math.round((completedCount / checklist.length) * 100);

  // Group by category
  const grouped = checklist.reduce<Record<string, YearEndChecklistItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Year-End Checklist</h2>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            Jurisdiction-aware compliance checklist to ensure nothing is missed.
          </p>
        </div>
        <select
          value={jurisdiction}
          onChange={(e) => onJurisdictionChange(e.target.value)}
          className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200"
        >
          <option value="NZ">New Zealand</option>
          <option value="AU">Australia</option>
          <option value="UK">United Kingdom</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
        </select>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-navy-400 dark:text-navy-500">
          <span>{completedCount} of {checklist.length} complete</span>
          <span className="font-semibold">{completionPercent}%</span>
        </div>
        <div className="mt-1 h-3 w-full rounded-full bg-navy-100 dark:bg-navy-700">
          <div
            className="h-3 rounded-full bg-forest-500 transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Grouped checklist */}
      <div className="mt-6 space-y-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">{category}</h3>
            <ul className="mt-2 space-y-2">
              {items.map((item) => (
                <li key={item.id} className="flex items-start gap-3 rounded-lg border border-navy-50 p-3 dark:border-navy-700">
                  <button
                    onClick={() => onToggle(item.id)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                      item.status === "complete"
                        ? "border-forest-500 bg-forest-500 text-white"
                        : "border-navy-300 bg-white dark:border-navy-600 dark:bg-navy-800"
                    }`}
                  >
                    {item.status === "complete" && (
                      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${item.status === "complete" ? "text-navy-400 line-through dark:text-navy-500" : "text-navy-700 dark:text-navy-200"}`}>
                      {item.task}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-navy-400 dark:text-navy-500">
                      <span>Due: {item.dueDate}</span>
                      <span>{item.notes}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PracticeIntelligencePage() {
  const [jurisdiction, setJurisdiction] = useState("NZ");
  const [checklistState, setChecklistState] = useState<Record<string, YearEndChecklistItem["status"]>>({});

  const profitability = useMemo(() => getClientProfitability(), []);
  const scopeCreep = useMemo(() => getScopeCreepAlerts(), []);
  const cashFlow = useMemo(() => getCashFlowForecast(), []);
  const capacity = useMemo(() => getCapacityMetric(), []);
  const debtors = useMemo(() => getDebtorAging(), []);
  const fees = useMemo(() => getFeeRecommendations(jurisdiction), [jurisdiction]);
  const rawChecklist = useMemo(() => getYearEndChecklist(jurisdiction), [jurisdiction]);

  const checklist = useMemo(() => {
    return rawChecklist.map((item) => ({
      ...item,
      status: checklistState[`${jurisdiction}-${item.id}`] || item.status,
    }));
  }, [rawChecklist, checklistState, jurisdiction]);

  const handleToggle = (id: string) => {
    const key = `${jurisdiction}-${id}`;
    setChecklistState((prev) => ({
      ...prev,
      [key]: prev[key] === "complete" ? "not-started" : "complete",
    }));
  };

  // Stats
  const totalRevenue = profitability.reduce((s, c) => s + c.totalRevenue, 0);
  const avgMargin = profitability.reduce((s, c) => s + c.profitMargin, 0) / profitability.length;
  const unprofitableClients = profitability.filter((c) => c.profitMargin < 0).length;
  const totalUnbilled = scopeCreep.reduce((s, a) => s + a.unbilledAmount, 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            Practice Intelligence
          </h1>
          <p className="mt-2 text-lg text-navy-400 dark:text-navy-500">
            AI-powered insights to grow your firm.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-navy-400 hover:text-navy-600 dark:hover:text-navy-300"
        >
          &larr; Dashboard
        </Link>
      </div>

      {/* Summary stats bar */}
      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Total Revenue</p>
          <p className="mt-1 font-serif text-2xl text-navy-800 dark:text-white">{formatMoney(totalRevenue)}</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Avg Margin</p>
          <p className={`mt-1 font-serif text-2xl ${avgMargin > 0 ? "text-forest-600" : "text-red-600"}`}>
            {avgMargin > 0 ? "+" : ""}{avgMargin.toFixed(1)}%
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Unprofitable Clients</p>
          <p className="mt-1 font-serif text-2xl text-red-600 dark:text-red-400">{unprofitableClients}</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">Unbilled Work</p>
          <p className="mt-1 font-serif text-2xl text-amber-600 dark:text-amber-400">{formatMoney(totalUnbilled)}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-8 space-y-8">
        <ClientProfitabilitySection data={profitability} />
        <ScopeCreepSection data={scopeCreep} />
        <CashFlowSection data={cashFlow} />
        <CapacitySection data={capacity} />
        <DebtorAgingSection data={debtors} />
        <FeeRecommendationsSection data={fees} />
        <YearEndChecklistSection
          checklist={checklist}
          jurisdiction={jurisdiction}
          onJurisdictionChange={setJurisdiction}
          onToggle={handleToggle}
        />
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-navy-400 dark:text-navy-500">
        Practice Intelligence analyses your firm&apos;s data to surface actionable insights. In production, data is pulled from your time entries, invoices, trust accounts, and engagement records. Market rate data sourced from anonymised industry benchmarks. This does not constitute financial or professional advice.
      </p>
    </div>
  );
}
