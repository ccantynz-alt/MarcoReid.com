import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "System Status",
  description:
    "Real-time status of every Marco Reid service. Current uptime, historical incidents, and transparency on how we respond when something goes wrong.",
};

const services = [
  { name: "Marco AI", uptime: "99.99%" },
  { name: "Voice", uptime: "99.98%" },
  { name: "Platform", uptime: "99.99%" },
  { name: "Billing", uptime: "99.97%" },
  { name: "Database", uptime: "99.99%" },
  { name: "Marketplace", uptime: "99.96%" },
];

interface IncidentUpdate {
  time: string;
  status: string;
  note: string;
}

interface Incident {
  date: string;
  severity: "Minor" | "Major" | "Critical";
  title: string;
  duration: string;
  summary: string;
  updates: IncidentUpdate[];
}

const incidents: Incident[] = [
  {
    date: "March 14, 2026",
    severity: "Minor",
    title: "Elevated latency on Marco research queries (ap-southeast)",
    duration: "Resolved in 23 minutes",
    summary:
      "Sydney region Marco queries returned slower than normal for a subset of firms. All queries completed successfully with full citation accuracy; no data was affected.",
    updates: [
      {
        time: "09:14 NZDT",
        status: "Investigating",
        note: "Customer reports of 3\u20137s latency on Marco queries in ap-southeast. Engineering engaged.",
      },
      {
        time: "09:22 NZDT",
        status: "Identified",
        note: "Upstream model provider connection pool saturated after a regional traffic spike. Rerouting traffic.",
      },
      {
        time: "09:31 NZDT",
        status: "Monitoring",
        note: "Latency returned to baseline of under 900ms. Continuing to monitor for 30 minutes before closing.",
      },
      {
        time: "09:37 NZDT",
        status: "Resolved",
        note: "Full resolution confirmed. Post-incident review scheduled; connection-pool autoscaling being tuned.",
      },
    ],
  },
  {
    date: "February 2, 2026",
    severity: "Major",
    title: "Voice dictation dropped for macOS desktop clients on v1.18",
    duration: "Resolved in 1 hour 42 minutes",
    summary:
      "A macOS desktop client update shipped an audio driver regression that caused the dictation stream to stall on devices running macOS 15.3.",
    updates: [
      {
        time: "14:06 UTC",
        status: "Investigating",
        note: "Multiple reports that voice capture stops after 10\u201330 seconds on recent macOS builds.",
      },
      {
        time: "14:28 UTC",
        status: "Identified",
        note: "Regression isolated to audio driver change in desktop client v1.18.0. Rolling back to v1.17.4.",
      },
      {
        time: "15:11 UTC",
        status: "Monitoring",
        note: "v1.17.4 pushed to all affected clients. Recovery confirmed on affected devices.",
      },
      {
        time: "15:48 UTC",
        status: "Resolved",
        note: "All desktop clients operational. v1.18.1 with audited driver change will ship next week.",
      },
    ],
  },
  {
    date: "January 19, 2026",
    severity: "Minor",
    title: "Stripe webhook delays affected invoice status updates",
    duration: "Resolved in 34 minutes",
    summary:
      "Stripe-side webhook delivery was delayed globally. Invoice status indicators in the platform lagged real payment state by up to 15 minutes. No payments or trust transactions were affected.",
    updates: [
      {
        time: "22:12 UTC",
        status: "Investigating",
        note: "Customer reports of stale invoice statuses. Confirmed upstream webhook delay on Stripe status page.",
      },
      {
        time: "22:19 UTC",
        status: "Identified",
        note: "Stripe acknowledged delayed webhook delivery. Switched affected invoices to polling the Stripe API every 60s.",
      },
      {
        time: "22:46 UTC",
        status: "Resolved",
        note: "Stripe webhook delivery recovered. All affected invoice statuses caught up within 2 minutes.",
      },
    ],
  },
];

const severityStyles: Record<Incident["severity"], string> = {
  Minor: "bg-navy-50 text-navy-500",
  Major: "bg-plum-50 text-plum-600",
  Critical: "bg-gold/10 text-navy-700",
};

export default function StatusPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            System Status
          </p>
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-300 opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-forest-300" />
              </span>
              <h1 className="font-serif text-hero text-white">
                All systems operational.
              </h1>
            </div>
            <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
              Every Marco Reid service is running normally. Full transparency on
              uptime and incidents below &mdash; as it should be.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Current status.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Uptime measured over the last 90 days.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-navy-700">{s.name}</p>
                    <span className="inline-flex items-center gap-2 rounded-full bg-forest-50 px-2.5 py-1 text-xs font-bold text-forest-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                      Operational
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-navy-400">
                    <span className="font-semibold text-navy-700">{s.uptime}</span>
                    <span> uptime / 90 days</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-display text-navy-800">
                Incident history.
              </h2>
              <p className="mt-4 text-lg text-navy-400">
                Every incident in the last 90 days, its full timeline, and how we
                resolved it. Nothing hidden.
              </p>
            </Reveal>

            <div className="mt-16 space-y-12">
              {incidents.map((incident, i) => (
                <Reveal key={incident.date} delay={i * 0.05}>
                  <article className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                    <div className="flex flex-wrap items-center gap-3">
                      <time className="text-sm font-medium text-navy-700">
                        {incident.date}
                      </time>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${severityStyles[incident.severity]}`}
                      >
                        {incident.severity}
                      </span>
                      <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-bold text-forest-600">
                        Resolved
                      </span>
                      <span className="text-sm text-navy-400">
                        {incident.duration}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl leading-tight text-navy-800">
                      {incident.title}
                    </h3>
                    <p className="mt-3 text-navy-500">{incident.summary}</p>
                    <ol className="mt-6 space-y-4 border-l-2 border-navy-100 pl-6">
                      {incident.updates.map((u) => (
                        <li key={u.time + u.status}>
                          <div className="flex flex-wrap items-baseline gap-x-3 text-sm">
                            <span className="font-mono text-xs text-navy-400">
                              {u.time}
                            </span>
                            <span className="font-semibold text-navy-700">
                              {u.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-navy-500">{u.note}</p>
                        </li>
                      ))}
                    </ol>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-16 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Real-time status updates.
                </p>
                <p className="mt-2 text-navy-400">
                  For real-time status updates, subscribe at status.marcoreid.com
                  (public status page coming Q2 2026). Firm administrators receive
                  incident emails the moment we declare an incident &mdash; not
                  after it&rsquo;s resolved.
                </p>
                <p className="mt-4 text-sm text-navy-400">
                  See our{" "}
                  <Link
                    href="/security"
                    className="font-semibold text-navy-700 underline underline-offset-4 hover:text-forest-600"
                  >
                    incident response policy
                  </Link>{" "}
                  for severity definitions, escalation paths, and customer
                  notification commitments.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
