import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import { phases, stats } from "./data";

export const metadata: Metadata = {
  title: "Build Status",
  description: "Live build status for the Marco Reid platform.",
  robots: { index: false, follow: false },
};

const statusStyles = {
  done: {
    ring: "ring-forest-300",
    bg: "bg-forest-500",
    text: "text-forest-600",
    label: "Done",
  },
  in_progress: {
    ring: "ring-plum-300",
    bg: "bg-plum-500",
    text: "text-plum-600",
    label: "In progress",
  },
  queued: {
    ring: "ring-navy-200",
    bg: "bg-white",
    text: "text-navy-400",
    label: "Queued",
  },
  blocked: {
    ring: "ring-red-300",
    bg: "bg-red-500",
    text: "text-red-600",
    label: "Blocked",
  },
} as const;

function Tick({ status }: { status: keyof typeof statusStyles }) {
  const s = statusStyles[status];
  return (
    <span
      className={`inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ring-2 ${s.ring} ${s.bg}`}
      aria-label={s.label}
    >
      {status === "done" && (
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-white" fill="none">
          <path
            d="M5 10l3.5 3.5L15 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {status === "in_progress" && (
        <span className="h-2 w-2 rounded-full bg-white" />
      )}
      {status === "blocked" && (
        <svg viewBox="0 0 20 20" className="h-3 w-3 text-white" fill="none">
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}

export default function BuildStatusPage() {
  const totals = phases.reduce(
    (acc, phase) => {
      phase.items.forEach((item) => {
        acc.total++;
        if (item.status === "done") acc.done++;
        if (item.status === "in_progress") acc.in_progress++;
        if (item.status === "blocked") acc.blocked++;
      });
      return acc;
    },
    { total: 0, done: 0, in_progress: 0, blocked: 0 },
  );

  const percent = Math.round((totals.done / totals.total) * 100);

  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-200">
              Internal
            </p>
            <h1 className="mt-4 font-serif text-hero text-white">
              Build Status
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
              Live state of the Marco Reid platform build. Green ticks are
              shipped. Amber dots are in progress. Circles are queued.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-4">
              <div className="rounded-2xl bg-white/5 px-5 py-6 ring-1 ring-white/10 backdrop-blur">
                <p className="font-serif text-3xl text-white">{percent}%</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-navy-200">
                  Complete
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 px-5 py-6 ring-1 ring-white/10 backdrop-blur">
                <p className="font-serif text-3xl text-forest-300">
                  {totals.done}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-navy-200">
                  Shipped
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 px-5 py-6 ring-1 ring-white/10 backdrop-blur">
                <p className="font-serif text-3xl text-plum-200">
                  {totals.in_progress}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-navy-200">
                  In progress
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 px-5 py-6 ring-1 ring-white/10 backdrop-blur">
                <p className="font-serif text-3xl text-white">
                  {totals.total - totals.done - totals.in_progress}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-navy-200">
                  Queued
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-navy-100 bg-navy-50 py-12">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="grid gap-6 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                      {stat.label}
                    </p>
                    <p className="mt-2 font-serif text-2xl text-navy-700">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-navy-400">{stat.note}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-4xl space-y-16">
            {phases.map((phase, phaseIndex) => {
              const phaseDone = phase.items.filter(
                (i) => i.status === "done",
              ).length;
              const phasePercent = Math.round(
                (phaseDone / phase.items.length) * 100,
              );

              return (
                <Reveal key={phase.title} delay={phaseIndex * 0.05}>
                  <div>
                    <div className="flex items-baseline justify-between gap-6 border-b border-navy-100 pb-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
                          Phase {phaseIndex + 1}
                        </p>
                        <h2 className="mt-2 font-serif text-headline text-navy-800">
                          {phase.title}
                        </h2>
                        <p className="mt-2 text-navy-400">{phase.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="font-serif text-2xl text-navy-700">
                          {phasePercent}%
                        </p>
                        <p className="text-xs uppercase tracking-wider text-navy-400">
                          {phaseDone}/{phase.items.length}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-8 space-y-4">
                      {phase.items.map((item) => {
                        const s = statusStyles[item.status];
                        return (
                          <li
                            key={item.title}
                            className="flex items-start gap-4 rounded-xl border border-navy-100 bg-white p-5 transition-all hover:border-navy-200 hover:shadow-card"
                          >
                            <div className="pt-0.5">
                              <Tick status={item.status} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-3">
                                <p
                                  className={`font-semibold ${
                                    item.status === "done"
                                      ? "text-navy-700"
                                      : "text-navy-600"
                                  }`}
                                >
                                  {item.title}
                                </p>
                                <span
                                  className={`rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${s.text}`}
                                >
                                  {s.label}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-navy-400">
                                {item.description}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
