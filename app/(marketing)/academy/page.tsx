import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import {
  COURSES,
  CPD_REQUIREMENTS,
  TRAINING_CATEGORIES,
  type Course,
} from "@/lib/training";

export const metadata: Metadata = {
  title: "Marco Reid Academy — The world's professional training network",
  description:
    "CPD, CLE, specialist certificates, and pre-qualification programs for lawyers and accountants across 8 countries. From student to retirement.",
};

/* ------------------------------------------------------------------ */
/*  Computed stats                                                     */
/* ------------------------------------------------------------------ */

const totalCourses = COURSES.length;
const totalCPDHours = COURSES.reduce((sum, c) => sum + c.durationHours, 0);
const totalCountries = new Set(COURSES.flatMap((c) => c.countries)).size;
const totalAccreditations = new Set(
  COURSES.flatMap((c) => c.accreditations)
).size;

/* ------------------------------------------------------------------ */
/*  Country names                                                      */
/* ------------------------------------------------------------------ */

const COUNTRY_NAMES: Record<string, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
  CA: "Canada",
  IE: "Ireland",
  SG: "Singapore",
  IN: "India",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function LevelBadge({ level }: { level: Course["level"] }) {
  const styles: Record<string, string> = {
    beginner:
      "bg-forest-50 text-forest-700 border-forest-200",
    intermediate:
      "bg-gold-50 text-gold-700 border-gold-200",
    advanced:
      "bg-plum-50 text-plum-600 border-plum-200",
    expert:
      "bg-navy-100 text-navy-700 border-navy-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${styles[level]}`}
    >
      {level}
    </span>
  );
}

function FormatBadge({ format }: { format: Course["format"] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-navy-200 bg-navy-50 px-2.5 py-0.5 text-[11px] font-medium capitalize text-navy-600">
      {format}
    </span>
  );
}

function PriceBadge({ price }: { price: Course["price"] }) {
  const styles: Record<string, string> = {
    free: "bg-forest-500 text-white",
    included: "bg-navy-500 text-white",
    premium: "bg-gold-400 text-navy-900",
  };
  const labels: Record<string, string> = {
    free: "Free",
    included: "Included",
    premium: "Premium",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${styles[price]}`}
    >
      {labels[price]}
    </span>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="flex flex-wrap items-center gap-2">
        <LevelBadge level={course.level} />
        <FormatBadge format={course.format} />
        <PriceBadge price={course.price} />
      </div>
      <h3 className="mt-4 font-serif text-lg text-navy-800">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">
        {course.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-navy-100 pt-4 text-xs text-navy-400">
        <span className="flex items-center gap-1">
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="8" cy="8" r="6.5" />
            <polyline points="8 4.5 8 8 10.5 9.5" />
          </svg>
          {course.durationHours}h
        </span>
        {course.cpdPoints > 0 && (
          <span className="flex items-center gap-1 font-semibold text-forest-600">
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M8 1l2 4 4.5.5-3.25 3 .75 4.5L8 11l-4 2 .75-4.5L1.5 5.5 6 5z" />
            </svg>
            {course.cpdPoints} CPD pts
          </span>
        )}
        <span>{course.modules.length} modules</span>
        {course.certificateOnCompletion && (
          <span className="flex items-center gap-1 text-gold-600">
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="8" cy="6" r="5" />
              <path d="M5.5 10.5L4 15l4-2 4 2-1.5-4.5" />
            </svg>
            Certificate
          </span>
        )}
      </div>
      {course.accreditations.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {course.accreditations.slice(0, 4).map((a) => (
            <span
              key={a}
              className="rounded border border-navy-100 bg-navy-50 px-1.5 py-0.5 text-[10px] font-medium text-navy-500"
            >
              {a}
            </span>
          ))}
          {course.accreditations.length > 4 && (
            <span className="rounded border border-navy-100 bg-navy-50 px-1.5 py-0.5 text-[10px] font-medium text-navy-400">
              +{course.accreditations.length - 4} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Accreditation bodies (unique across all courses)                   */
/* ------------------------------------------------------------------ */

const ALL_ACCREDITATIONS = Array.from(
  new Set(COURSES.flatMap((c) => c.accreditations))
).sort();

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AcademyPage() {
  const lawyerCourses = COURSES.filter((c) => c.audience.includes("lawyer") && c.category.startsWith("cpd"));
  const accountantCourses = COURSES.filter(
    (c) =>
      c.audience.includes("accountant") &&
      (c.category.startsWith("cpd") || c.category === "cpd-tax")
  );
  const preQualCourses = COURSES.filter(
    (c) => c.category === "pre-qualification"
  );
  const specialistCourses = COURSES.filter(
    (c) => c.category === "specialist"
  );
  const certificationCourse = COURSES.find(
    (c) => c.slug === "marco-reid-certification"
  );

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-linear-to-b from-navy-50/50 to-white pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-36">
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 opacity-0">
              Marco Reid Academy
            </p>
            <h1 className="mt-6 animate-fade-up-1 font-serif text-hero text-navy-800 opacity-0">
              The world&rsquo;s professional training network.
            </h1>
            <p className="mt-6 animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
              From student to partner. CPD, specialist certificates, and
              pre-qualification programs for lawyers and accountants across 8
              countries. Accredited by the bodies that matter. Built by the
              platform that runs your practice.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-fade-up-3 opacity-0 sm:flex-row">
              <Button href="/trial" variant="gold" size="lg">
                Start learning today
              </Button>
              <Button
                href="#courses"
                variant="ghost"
                size="lg"
              >
                Browse courses &darr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* STATS BAR                                                     */}
      {/* ============================================================ */}
      <section className="relative -mt-12 z-10">
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 gap-6 rounded-2xl border border-navy-100 bg-white p-8 shadow-card sm:grid-cols-4">
              <div className="text-center">
                <p className="font-serif text-3xl text-navy-800 sm:text-4xl">
                  {totalCourses}
                </p>
                <p className="mt-1 text-xs font-medium text-navy-400">
                  Courses
                </p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-navy-800 sm:text-4xl">
                  {totalCPDHours}+
                </p>
                <p className="mt-1 text-xs font-medium text-navy-400">
                  CPD hours available
                </p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-navy-800 sm:text-4xl">
                  {totalCountries}
                </p>
                <p className="mt-1 text-xs font-medium text-navy-400">
                  Countries
                </p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-navy-800 sm:text-4xl">
                  {totalAccreditations}
                </p>
                <p className="mt-1 text-xs font-medium text-navy-400">
                  Professional body accreditations
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* FOR LAWYERS                                                   */}
      {/* ============================================================ */}
      <section id="courses" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
                For lawyers
              </p>
              <h2 className="mt-4 font-serif text-display text-navy-800">
                CPD for legal professionals.
              </h2>
              <p className="mt-4 text-lg text-navy-500">
                Ethics, AML/CFT, trust accounting, AI competence, and more.
                Accredited by NZLS, SRA, ABA, State Bars, and professional bodies
                across 7 countries.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lawyerCourses.map((course, i) => (
              <Reveal key={course.slug} delay={i * 0.05}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* FOR ACCOUNTANTS                                               */}
      {/* ============================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
                For accountants
              </p>
              <h2 className="mt-4 font-serif text-display text-navy-800">
                CPD for accounting professionals.
              </h2>
              <p className="mt-4 text-lg text-navy-500">
                Ethics, GST/VAT, AML, cloud accounting migration, tax planning,
                and multi-jurisdiction payroll. Recognised by CA ANZ, CPA
                Australia, ICAEW, ACCA, AICPA, and more.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {accountantCourses.map((course, i) => (
              <Reveal key={course.slug} delay={i * 0.05}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* PRE-QUALIFICATION                                             */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
                Pre-qualification
              </p>
              <h2 className="mt-4 font-serif text-display text-navy-800">
                Start your career here.
              </h2>
              <p className="mt-4 text-lg text-navy-500">
                Comprehensive foundation programs for aspiring lawyers and
                accountants. 40 hours of structured learning covering every
                fundamental you need before you qualify.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {preQualCourses.map((course, i) => (
              <Reveal key={course.slug} delay={i * 0.1}>
                <div className="rounded-2xl border-2 border-plum-200 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
                  <div className="flex flex-wrap items-center gap-2">
                    <LevelBadge level={course.level} />
                    <FormatBadge format={course.format} />
                    <PriceBadge price={course.price} />
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-navy-800">
                    {course.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {course.description}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {course.modules.map((m) => (
                      <div
                        key={m.title}
                        className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2"
                      >
                        <p className="text-xs font-medium text-navy-700">
                          {m.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-navy-400">
                          {m.durationMinutes} min
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-4 text-xs text-navy-400">
                    <span>{course.durationHours} hours</span>
                    <span>{course.modules.length} modules</span>
                    <span>{course.countries.length} countries</span>
                    {course.certificateOnCompletion && (
                      <span className="text-gold-600 font-semibold">
                        Certificate on completion
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SPECIALIST CERTIFICATES                                       */}
      {/* ============================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
                Specialist certificates
              </p>
              <h2 className="mt-4 font-serif text-display text-navy-800">
                Go deeper. Stand out.
              </h2>
              <p className="mt-4 text-lg text-navy-500">
                Advanced specialist certifications that prove your expertise in
                high-demand practice areas. Rigorous assessment, recognised
                credentials.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-1">
            {specialistCourses.map((course, i) => (
              <Reveal key={course.slug} delay={i * 0.1}>
                <div className="rounded-2xl border-2 border-gold-300 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
                  <div className="flex flex-wrap items-center gap-2">
                    <LevelBadge level={course.level} />
                    <FormatBadge format={course.format} />
                    <PriceBadge price={course.price} />
                    <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-bold text-gold-700">
                      {course.cpdPoints} CPD points
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl text-navy-800">
                    {course.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy-500">
                    {course.description}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {course.modules.map((m) => (
                      <div
                        key={m.title}
                        className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-2"
                      >
                        <p className="text-xs font-medium text-navy-700">
                          {m.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-navy-400">
                          {m.durationMinutes} min
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {course.accreditations.map((a) => (
                      <span
                        key={a}
                        className="rounded border border-navy-200 bg-white px-2 py-0.5 text-[10px] font-medium text-navy-600"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* CPD REQUIREMENTS BY COUNTRY                                   */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
                CPD requirements
              </p>
              <h2 className="mt-4 font-serif text-display text-navy-800">
                Know your obligations.
              </h2>
              <p className="mt-4 text-lg text-navy-500">
                CPD requirements for lawyers and accountants vary by jurisdiction.
                Here is what you need to know.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-navy-200">
                    <th className="py-3 pr-4 font-semibold text-navy-700">
                      Country
                    </th>
                    <th className="py-3 pr-4 font-semibold text-navy-700">
                      Profession
                    </th>
                    <th className="py-3 pr-4 font-semibold text-navy-700">
                      Body
                    </th>
                    <th className="py-3 pr-4 font-semibold text-navy-700">
                      Annual Hours
                    </th>
                    <th className="py-3 pr-4 font-semibold text-navy-700">
                      Categories
                    </th>
                    <th className="py-3 pr-4 font-semibold text-navy-700">
                      Period
                    </th>
                    <th className="py-3 font-semibold text-navy-700">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {CPD_REQUIREMENTS.map((req, i) => (
                    <tr
                      key={`${req.country}-${req.profession}`}
                      className={`border-b border-navy-100 ${
                        i % 2 === 0 ? "bg-white" : "bg-navy-50/50"
                      }`}
                    >
                      <td className="py-3 pr-4 font-medium text-navy-700">
                        {COUNTRY_NAMES[req.country] ?? req.country}
                      </td>
                      <td className="py-3 pr-4 capitalize text-navy-600">
                        {req.profession}
                      </td>
                      <td className="py-3 pr-4 text-navy-600">{req.body}</td>
                      <td className="py-3 pr-4">
                        {req.annualHours > 0 ? (
                          <span className="font-semibold text-navy-800">
                            {req.annualHours}h
                          </span>
                        ) : (
                          <span className="text-navy-400 italic">
                            No minimum
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        {req.categories ? (
                          <div className="flex flex-wrap gap-1">
                            {req.categories.map((cat) => (
                              <span
                                key={cat.name}
                                className="rounded bg-forest-50 px-1.5 py-0.5 text-[10px] font-medium text-forest-700"
                              >
                                {cat.name}: {cat.minHours}h min
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-navy-400">&mdash;</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-xs text-navy-500">
                        {req.reportingPeriod}
                      </td>
                      <td className="py-3 text-xs leading-relaxed text-navy-500">
                        {req.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* MARCO REID CERTIFICATION                                      */}
      {/* ============================================================ */}
      {certificationCourse && (
        <section className="bg-navy-500 py-20 sm:py-28">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-4xl rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm sm:p-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                  <div className="flex-shrink-0">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gold-400/20">
                      <svg
                        viewBox="0 0 48 48"
                        className="h-14 w-14"
                        fill="none"
                      >
                        <circle
                          cx="24"
                          cy="20"
                          r="14"
                          stroke="#d4a843"
                          strokeWidth="2"
                        />
                        <path
                          d="M24 10l3 6 6.5.8-4.75 4.4 1.1 6.5L24 24.5l-5.85 3.2 1.1-6.5L14.5 16.8l6.5-.8z"
                          fill="#d4a843"
                        />
                        <path
                          d="M16 33l-2 11 10-5 10 5-2-11"
                          stroke="#ebcf82"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <PriceBadge price={certificationCourse.price} />
                      <span className="rounded-full bg-gold-400/20 px-2.5 py-0.5 text-[11px] font-bold text-gold-300">
                        {certificationCourse.cpdPoints} CPD points
                      </span>
                    </div>
                    <h2 className="mt-4 font-serif text-headline text-white">
                      {certificationCourse.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      {certificationCourse.description}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {certificationCourse.modules.map((m) => (
                        <div
                          key={m.title}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                        >
                          <p className="text-xs font-medium text-white/90">
                            {m.title}
                          </p>
                          <p className="mt-0.5 text-[10px] text-white/50">
                            {m.durationMinutes} min
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-4 text-xs text-white/60">
                      <span>{certificationCourse.durationHours} hours</span>
                      <span>
                        {certificationCourse.modules.length} modules
                      </span>
                      <span>
                        {certificationCourse.countries.length} countries
                      </span>
                      <span className="font-semibold text-gold-300">
                        Certification badge on completion
                      </span>
                    </div>
                    <div className="mt-8">
                      <Button href="/trial" variant="gold" size="lg">
                        Get certified &mdash; free
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ============================================================ */}
      {/* HOW IT WORKS                                                  */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              How it works.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Enrol",
                description:
                  "Choose from our catalog of accredited courses. Filter by profession, jurisdiction, category, or level.",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-forest-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Learn",
                description:
                  "Work through interactive modules at your own pace. Video, workshops, and hands-on exercises designed by practitioners.",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-forest-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Pass",
                description:
                  "Complete assessments to demonstrate competence. Practical scenarios, not just multiple-choice.",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-forest-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                ),
              },
              {
                step: "04",
                title: "Certificate",
                description:
                  "Receive your certificate and CPD points logged automatically to your professional record. Ready for audit.",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-gold-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="8" r="7" />
                    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50">
                    {item.icon}
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-gold-500">
                    Step {item.step}
                  </p>
                  <h3 className="mt-2 font-serif text-lg text-navy-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* ACCREDITATIONS                                                */}
      {/* ============================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
                Recognised worldwide
              </p>
              <h2 className="mt-4 font-serif text-display text-navy-800">
                Accredited by the bodies that matter.
              </h2>
              <p className="mt-4 text-lg text-navy-500">
                Marco Reid Academy courses are recognised by professional bodies
                across 8 countries. Your CPD hours count.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {ALL_ACCREDITATIONS.map((body) => (
                <div
                  key={body}
                  className="rounded-xl border border-navy-200 bg-white px-5 py-3 text-sm font-medium text-navy-700 shadow-card"
                >
                  {body}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* CATEGORIES OVERVIEW                                           */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Training across every discipline.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRAINING_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
                  <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                    {cat.name}
                  </p>
                  <p className="mt-2 text-sm text-navy-500">
                    {cat.description}
                  </p>
                  <p className="mt-3 text-xs text-navy-400">
                    {COURSES.filter((c) => c.category === cat.slug).length}{" "}
                    courses
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* CTA                                                           */}
      {/* ============================================================ */}
      <section className="bg-navy-500 py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-display text-white">
                Start learning today.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Every Marco Reid subscriber has full access to the Academy.
                CPD tracked automatically. Certificates generated instantly.
                Your professional development, handled.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/trial" variant="gold" size="lg">
                  Start your free trial
                </Button>
                <Button
                  href="/pricing"
                  variant="ghost"
                  size="lg"
                  className="text-white hover:text-gold-300"
                >
                  View pricing &rarr;
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
