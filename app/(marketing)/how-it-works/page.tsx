import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import { CONNECTION_TYPES, USER_ROLES } from "@/lib/connections";

export const metadata: Metadata = {
  title: "How Marco Reid Works — One Platform, Everyone Connected",
  description:
    "See how Marco Reid connects clients, lawyers, accountants, HR firms, and students in one platform. Encrypted communications, shared matters, cross-professional collaboration, and more.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "How Marco Reid Works",
  description:
    "One platform connecting clients, lawyers, accountants, HR firms, and students with encrypted communications and cross-professional collaboration.",
};

/* ------------------------------------------------------------------ */
/*  Role metadata for the visual diagram                               */
/* ------------------------------------------------------------------ */

const ROLE_STYLES: Record<
  string,
  { bg: string; border: string; text: string; ringColor: string; label: string; desc: string; cta: string; ctaHref: string }
> = {
  client: {
    bg: "bg-gold-50",
    border: "border-gold-200",
    text: "text-gold-700",
    ringColor: "ring-gold-300",
    label: "Client / Public",
    desc: "Individuals and businesses seeking legal or accounting services",
    cta: "Find a professional",
    ctaHref: "/find-a-lawyer",
  },
  lawyer: {
    bg: "bg-navy-50",
    border: "border-navy-200",
    text: "text-navy-700",
    ringColor: "ring-navy-300",
    label: "Lawyer / Attorney",
    desc: "Licensed legal practitioners",
    cta: "Join as a lawyer",
    ctaHref: "/for-attorneys",
  },
  accountant: {
    bg: "bg-forest-50",
    border: "border-forest-200",
    text: "text-forest-700",
    ringColor: "ring-forest-300",
    label: "Accountant / CPA",
    desc: "Licensed accounting professionals",
    cta: "Join as an accountant",
    ctaHref: "/for-accountants",
  },
  hr: {
    bg: "bg-plum-50",
    border: "border-plum-200",
    text: "text-plum-700",
    ringColor: "ring-plum-300",
    label: "HR / Recruitment",
    desc: "Professional recruitment firms",
    cta: "Become an HR partner",
    ctaHref: "/hr",
  },
  student: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    ringColor: "ring-sky-300",
    label: "Student / Trainee",
    desc: "Academy students and trainees",
    cta: "Explore the Academy",
    ctaHref: "/academy",
  },
};

/* ------------------------------------------------------------------ */
/*  Role icon SVGs                                                     */
/* ------------------------------------------------------------------ */

function RoleIcon({ role }: { role: string }) {
  const icons: Record<string, React.ReactNode> = {
    client: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    ),
    lawyer: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
      />
    ),
    accountant: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
      />
    ),
    hr: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    ),
    student: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
      />
    ),
  };

  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      {icons[role] ?? icons.client}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HowItWorksPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-48 -top-48 h-[480px] w-[480px] rounded-full bg-gold-500/15 blur-[140px]" />
          <div className="animate-drift-reverse absolute -left-48 -bottom-32 h-[420px] w-[420px] rounded-full bg-forest-500/12 blur-[120px]" />
        </div>
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              How it works
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              One platform. Everyone connected.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Marco Reid connects clients, lawyers, accountants, HR firms, and
              students in a single ecosystem. Every interaction is secure,
              tracked, and designed to make professional services faster and more
              transparent.
            </p>
          </div>
        </Container>
      </section>

      {/* ROLE CARDS */}
      <section className="relative -mt-10 z-10">
        <Container>
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {USER_ROLES.map((r) => {
                const style = ROLE_STYLES[r.role];
                return (
                  <div
                    key={r.role}
                    className={`rounded-2xl border ${style.border} ${style.bg} p-5 shadow-card text-center`}
                  >
                    <span
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${style.bg} ${style.text} ring-2 ${style.ringColor}`}
                    >
                      <RoleIcon role={r.role} />
                    </span>
                    <p
                      className={`mt-3 font-serif text-base ${style.text}`}
                    >
                      {style.label}
                    </p>
                    <p className="mt-1 text-xs text-navy-400">{style.desc}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* VISUAL CONNECTION DIAGRAM */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              How everyone connects.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Every user type on Marco Reid connects to others through secure,
              purpose-built channels. Privileged communications are encrypted
              end-to-end.
            </p>
          </Reveal>

          {/* Connection diagram - CSS/HTML visual */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative rounded-3xl border border-navy-100 bg-white p-8 shadow-card sm:p-12">
              {/* Centre node */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-400 shadow-lg">
                <span className="font-serif text-sm font-bold text-navy-900">
                  Marco
                  <br />
                  Reid
                </span>
              </div>

              {/* Surrounding role nodes with connection lines */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {USER_ROLES.map((r) => {
                  const style = ROLE_STYLES[r.role];
                  const connections = CONNECTION_TYPES.filter(
                    (c) => c.from === r.role || c.to === r.role,
                  );
                  return (
                    <div
                      key={r.role}
                      className={`rounded-xl border ${style.border} ${style.bg} p-4 text-center`}
                    >
                      <span className={`font-serif text-sm font-bold ${style.text}`}>
                        {style.label}
                      </span>
                      <div className="mt-2 space-y-1">
                        {connections.map((c, i) => {
                          const other = c.from === r.role ? c.to : c.from;
                          const otherStyle = ROLE_STYLES[other];
                          return (
                            <div
                              key={`${c.from}-${c.to}-${i}`}
                              className="flex items-center gap-1.5 text-left"
                            >
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                  c.privileged ? "bg-forest-500" : "bg-navy-300"
                                }`}
                              />
                              <span className="text-[10px] text-navy-500">
                                {otherStyle?.label ?? other}
                              </span>
                              {c.privileged && (
                                <span className="rounded bg-forest-50 px-1 py-px text-[8px] font-bold text-forest-700">
                                  Encrypted
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-navy-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-forest-500" />
                  Privileged and encrypted
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-navy-300" />
                  Standard connection
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CONNECTION DETAILS */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Every connection in detail.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {CONNECTION_TYPES.map((c) => {
              const fromStyle = ROLE_STYLES[c.from];
              const toStyle = ROLE_STYLES[c.to];
              return (
                <Reveal
                  key={`${c.from}-${c.to}`}
                  delay={0.04}
                >
                  <div className="h-full rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-lg px-2 py-1 text-xs font-bold ${fromStyle?.bg ?? "bg-navy-50"} ${fromStyle?.text ?? "text-navy-600"}`}
                      >
                        {fromStyle?.label ?? c.from}
                      </span>
                      <svg
                        className="h-4 w-4 text-navy-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                        />
                      </svg>
                      <span
                        className={`rounded-lg px-2 py-1 text-xs font-bold ${toStyle?.bg ?? "bg-navy-50"} ${toStyle?.text ?? "text-navy-600"}`}
                      >
                        {toStyle?.label ?? c.to}
                      </span>
                      {c.privileged && (
                        <span className="ml-auto rounded bg-forest-50 px-2 py-0.5 text-[10px] font-bold text-forest-700">
                          Privileged
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-navy-700">
                      {c.relationship}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {c.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-navy-500"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-forest-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Join as your role.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Every role has its own entry point, its own tools, and its own
              connections. Choose yours.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {USER_ROLES.map((r) => {
              const style = ROLE_STYLES[r.role];
              return (
                <Reveal key={r.role} delay={0.04}>
                  <Link
                    href={style.ctaHref}
                    className={`group flex h-full flex-col items-center rounded-xl border ${style.border} ${style.bg} p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${style.bg} ${style.text} ring-2 ${style.ringColor}`}
                    >
                      <RoleIcon role={r.role} />
                    </span>
                    <p className={`mt-3 font-serif text-base ${style.text}`}>
                      {style.label}
                    </p>
                    <p className="mt-2 flex-1 text-xs text-navy-400">
                      {style.desc}
                    </p>
                    <span
                      className={`mt-4 text-sm font-semibold ${style.text} group-hover:underline`}
                    >
                      {style.cta} &rarr;
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
