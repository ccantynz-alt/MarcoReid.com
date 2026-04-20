"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── Helpers ────────────────────────────────────────────────────── */

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 10_000) {
    return `$${Math.round(value).toLocaleString("en-US")}`;
  }
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function formatHours(value: number): string {
  return value.toFixed(1);
}

/** Smooth animated number that transitions when `value` changes. */
function useAnimatedValue(target: number, duration = 500) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number>(0);
  const startRef = useRef(target);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = display;
    startTimeRef.current = null;

    function tick(now: number) {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startRef.current + (target - startRef.current) * eased;
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return display;
}

/* ── Slider component ───────────────────────────────────────────── */

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (v: number) => void;
}

function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  onChange,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="group">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-navy-600">{label}</label>
        <span className="font-serif text-lg font-semibold text-navy-800">
          {prefix}
          {value.toLocaleString("en-US")}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider mt-2 h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
        style={{
          background: `linear-gradient(to right, var(--color-navy-500) 0%, var(--color-navy-500) ${pct}%, var(--color-navy-100) ${pct}%, var(--color-navy-100) 100%)`,
        }}
      />
      <div className="mt-1 flex justify-between text-xs text-navy-300">
        <span>
          {prefix}
          {min.toLocaleString("en-US")}
          {suffix}
        </span>
        <span>
          {prefix}
          {max.toLocaleString("en-US")}
          {suffix}
        </span>
      </div>
    </div>
  );
}

/* ── Metric card ────────────────────────────────────────────────── */

interface MetricProps {
  label: string;
  value: number;
  formatter: (v: number) => string;
  highlight?: boolean;
}

function Metric({ label, value, formatter, highlight = false }: MetricProps) {
  const animated = useAnimatedValue(value);

  return (
    <div className={highlight ? "mt-4 border-t border-navy-100 pt-4" : ""}>
      <p className="text-sm text-navy-400">{label}</p>
      <p
        className={`font-serif tabular-nums ${
          highlight
            ? "text-3xl font-bold text-forest-600 sm:text-4xl"
            : "text-2xl font-semibold text-navy-800"
        }`}
      >
        {formatter(animated)}
      </p>
    </div>
  );
}

/* ── Main calculator ────────────────────────────────────────────── */

const MARCO_REID_PER_SEAT = 199;

export default function ROICalculator() {
  const [professionals, setProfessionals] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(350);
  const [researchHours, setResearchHours] = useState(6);
  const [subscriptions, setSubscriptions] = useState(5);
  const [avgSubscriptionCost, setAvgSubscriptionCost] = useState(150);

  // Calculations
  const hoursSavedPerWeek = researchHours * 0.75 * professionals;
  const revenueRecoveredPerWeek = hoursSavedPerWeek * hourlyRate;
  const revenueRecoveredPerYear = revenueRecoveredPerWeek * 50;
  const currentCostPerMonth = subscriptions * avgSubscriptionCost;
  const marcoReidCostPerMonth = professionals * MARCO_REID_PER_SEAT;
  const monthlySavings = currentCostPerMonth - marcoReidCostPerMonth;
  const annualSavings = monthlySavings * 12 + revenueRecoveredPerYear;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* ── LEFT: Inputs ────────────────────────────────────────── */}
      <div className="space-y-8">
        <SliderInput
          label="Number of lawyers / CPAs"
          value={professionals}
          min={1}
          max={50}
          onChange={setProfessionals}
        />
        <SliderInput
          label="Average hourly rate"
          value={hourlyRate}
          min={100}
          max={800}
          step={10}
          prefix="$"
          onChange={setHourlyRate}
        />
        <SliderInput
          label="Research hours per week per professional"
          value={researchHours}
          min={1}
          max={20}
          onChange={setResearchHours}
        />
        <SliderInput
          label="Current software subscriptions"
          value={subscriptions}
          min={1}
          max={15}
          onChange={setSubscriptions}
        />
        <SliderInput
          label="Average cost per subscription"
          value={avgSubscriptionCost}
          min={20}
          max={500}
          step={10}
          prefix="$"
          suffix="/mo"
          onChange={setAvgSubscriptionCost}
        />
      </div>

      {/* ── RIGHT: Results ──────────────────────────────────────── */}
      <div className="rounded-2xl border-t-4 border-t-gold-400 bg-white p-8 shadow-card sm:p-10">
        <p className="text-xs font-bold tracking-wider text-gold-600">
          Your Estimated Savings
        </p>

        <div className="mt-6 space-y-5">
          <Metric
            label="Hours saved per week"
            value={hoursSavedPerWeek}
            formatter={(v) => `${formatHours(v)} hrs`}
          />
          <Metric
            label="Revenue recovered per week"
            value={revenueRecoveredPerWeek}
            formatter={formatCurrency}
          />
          <Metric
            label="Revenue recovered per year (50 weeks)"
            value={revenueRecoveredPerYear}
            formatter={formatCurrency}
          />
        </div>

        <div className="mt-8 rounded-xl bg-navy-50 p-5">
          <p className="text-xs font-bold tracking-wider text-navy-400">
            Software Cost Comparison
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-navy-500">
                Current tools ({subscriptions} subscriptions)
              </span>
              <span className="font-serif text-lg font-semibold text-navy-700">
                {formatCurrency(currentCostPerMonth)}/mo
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-navy-500">
                Marco Reid ({professionals} seat{professionals !== 1 ? "s" : ""}{" "}
                &times; ${MARCO_REID_PER_SEAT})
              </span>
              <span className="font-serif text-lg font-semibold text-forest-600">
                {formatCurrency(marcoReidCostPerMonth)}/mo
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-navy-200 pt-3">
              <span className="text-sm font-medium text-navy-600">
                Monthly software savings
              </span>
              <span
                className={`font-serif text-lg font-bold ${
                  monthlySavings >= 0 ? "text-forest-600" : "text-navy-400"
                }`}
              >
                {monthlySavings >= 0 ? "+" : ""}
                {formatCurrency(monthlySavings)}/mo
              </span>
            </div>
          </div>
        </div>

        <Metric
          label="Total annual savings (software + recovered revenue)"
          value={annualSavings}
          formatter={formatCurrency}
          highlight
        />
      </div>
    </div>
  );
}
