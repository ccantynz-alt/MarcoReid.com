"use client";

import { useState, useMemo } from "react";
import {
  COURSES,
  CPD_REQUIREMENTS,
  TRAINING_CATEGORIES,
  getCPDRequirements,
  type Course,
} from "@/lib/training";

/* ------------------------------------------------------------------ */
/*  Country names                                                      */
/* ------------------------------------------------------------------ */

const COUNTRY_OPTIONS = [
  { code: "NZ", name: "New Zealand" },
  { code: "AU", name: "Australia" },
  { code: "UK", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "IE", name: "Ireland" },
  { code: "SG", name: "Singapore" },
  { code: "IN", name: "India" },
];

/* ------------------------------------------------------------------ */
/*  Badge components                                                   */
/* ------------------------------------------------------------------ */

function LevelBadge({ level }: { level: Course["level"] }) {
  const styles: Record<string, string> = {
    beginner: "bg-forest-50 text-forest-700 border-forest-200 dark:bg-forest-900/30 dark:text-forest-300 dark:border-forest-700",
    intermediate: "bg-gold-50 text-gold-700 border-gold-200 dark:bg-gold-900/30 dark:text-gold-300 dark:border-gold-700",
    advanced: "bg-plum-50 text-plum-600 border-plum-200 dark:bg-plum-900/30 dark:text-plum-300 dark:border-plum-700",
    expert: "bg-navy-100 text-navy-700 border-navy-200 dark:bg-navy-700 dark:text-navy-200 dark:border-navy-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${styles[level]}`}>
      {level}
    </span>
  );
}

function FormatBadge({ format }: { format: Course["format"] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-navy-200 bg-navy-50 px-2 py-0.5 text-[10px] font-medium capitalize text-navy-600 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-300">
      {format}
    </span>
  );
}

function PriceBadge({ price }: { price: Course["price"] }) {
  const styles: Record<string, string> = {
    free: "bg-forest-500 text-white",
    included: "bg-navy-500 text-white dark:bg-navy-600",
    premium: "bg-gold-400 text-navy-900",
  };
  const labels: Record<string, string> = {
    free: "Free",
    included: "Included",
    premium: "Premium",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${styles[price]}`}>
      {labels[price]}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Mock completion data — in a real app this comes from the DB        */
/* ------------------------------------------------------------------ */

const MOCK_COMPLETED: Record<string, { completedAt: string; cpdPointsEarned: number }> = {
  "ai-in-legal-practice": { completedAt: "2026-03-15", cpdPointsEarned: 2 },
  "ethics-professional-responsibility": { completedAt: "2026-01-22", cpdPointsEarned: 2 },
};

const MOCK_IN_PROGRESS: Record<string, { progress: number; lastAccessedAt: string }> = {
  "aml-cft-for-lawyers": { progress: 60, lastAccessedAt: "2026-05-18" },
};

/* ------------------------------------------------------------------ */
/*  Course card                                                        */
/* ------------------------------------------------------------------ */

function CourseCard({ course }: { course: Course }) {
  const completed = MOCK_COMPLETED[course.slug];
  const inProgress = MOCK_IN_PROGRESS[course.slug];

  return (
    <div className="flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-200 hover:shadow-card-hover dark:border-navy-700 dark:bg-navy-800">
      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-1.5">
        <LevelBadge level={course.level} />
        <FormatBadge format={course.format} />
        <PriceBadge price={course.price} />
      </div>

      {/* Title + description */}
      <h3 className="mt-3 text-sm font-semibold text-navy-800 dark:text-white">
        {course.title}
      </h3>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-navy-500 dark:text-navy-300">
        {course.description.length > 140
          ? course.description.slice(0, 140) + "..."
          : course.description}
      </p>

      {/* Stats */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-navy-400 dark:text-navy-400">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6.5" />
            <polyline points="8 4.5 8 8 10.5 9.5" />
          </svg>
          {course.durationHours}h
        </span>
        {course.cpdPoints > 0 && (
          <span className="font-semibold text-forest-600 dark:text-forest-400">
            {course.cpdPoints} CPD pts
          </span>
        )}
        <span>{course.modules.length} modules</span>
      </div>

      {/* Accreditations */}
      {course.accreditations.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {course.accreditations.slice(0, 3).map((a) => (
            <span key={a} className="rounded bg-navy-50 px-1.5 py-0.5 text-[9px] font-medium text-navy-500 dark:bg-navy-700 dark:text-navy-300">
              {a}
            </span>
          ))}
          {course.accreditations.length > 3 && (
            <span className="rounded bg-navy-50 px-1.5 py-0.5 text-[9px] text-navy-400 dark:bg-navy-700 dark:text-navy-400">
              +{course.accreditations.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Progress bar for in-progress */}
      {inProgress && !completed && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-navy-500 dark:text-navy-300">{inProgress.progress}% complete</span>
            <span className="text-navy-400 dark:text-navy-400">Last accessed {inProgress.lastAccessedAt}</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-navy-100 dark:bg-navy-700">
            <div
              className="h-full rounded-full bg-forest-500 transition-all"
              style={{ width: `${inProgress.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Action button */}
      <div className="mt-4">
        {completed ? (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-forest-600 dark:text-forest-400">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3.5 8.5 6.5 11.5 12.5 5.5" />
              </svg>
              Completed
            </span>
            <button className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-600 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-700">
              Download certificate
            </button>
          </div>
        ) : inProgress ? (
          <button className="w-full rounded-lg bg-forest-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-600">
            Continue course
          </button>
        ) : (
          <button className="w-full rounded-lg bg-navy-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-600 dark:bg-navy-600 dark:hover:bg-navy-500">
            Start course
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CPD Progress widget                                                */
/* ------------------------------------------------------------------ */

function CPDProgressWidget({
  country,
  profession,
}: {
  country: string;
  profession: "lawyer" | "accountant";
}) {
  const req = getCPDRequirements(country, profession);
  if (!req) return null;

  // Mock: sum completed CPD points this year
  const completedHours = Object.values(MOCK_COMPLETED).reduce(
    (sum, c) => sum + c.cpdPointsEarned,
    0
  );
  const required = req.annualHours;
  const percentage = required > 0 ? Math.min(100, Math.round((completedHours / required) * 100)) : 100;

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-navy-800 dark:text-white">
            CPD Progress &mdash; {COUNTRY_OPTIONS.find((c) => c.code === country)?.name}
          </h3>
          <p className="mt-0.5 text-xs text-navy-400 dark:text-navy-400">
            {req.body} &middot; {req.reportingPeriod}
          </p>
        </div>
        <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-semibold capitalize text-navy-600 dark:bg-navy-700 dark:text-navy-300">
          {profession}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-navy-700 dark:text-navy-200">
            {completedHours} / {required > 0 ? required : "--"} hours
          </span>
          <span className={`font-bold ${percentage >= 100 ? "text-forest-600" : percentage >= 50 ? "text-gold-600" : "text-navy-400"}`}>
            {required > 0 ? `${percentage}%` : "Reflective"}
          </span>
        </div>
        {required > 0 && (
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-navy-100 dark:bg-navy-700">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 100
                  ? "bg-forest-500"
                  : percentage >= 50
                    ? "bg-gold-400"
                    : "bg-navy-400"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>

      {/* Category requirements */}
      {req.categories && req.categories.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {req.categories.map((cat) => (
            <div key={cat.name} className="flex items-center justify-between text-[11px]">
              <span className="text-navy-500 dark:text-navy-300">{cat.name}</span>
              <span className="font-medium text-navy-600 dark:text-navy-300">
                {cat.minHours}h minimum
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      <p className="mt-3 text-[11px] leading-relaxed text-navy-400 dark:text-navy-400">
        {req.notes}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Completed courses widget                                           */
/* ------------------------------------------------------------------ */

function CompletedCoursesWidget() {
  const completedCourses = COURSES.filter((c) => MOCK_COMPLETED[c.slug]);
  if (completedCourses.length === 0) return null;

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-800">
      <h3 className="text-sm font-semibold text-navy-800 dark:text-white">
        Completed courses
      </h3>
      <div className="mt-3 space-y-2">
        {completedCourses.map((course) => {
          const data = MOCK_COMPLETED[course.slug];
          return (
            <div
              key={course.slug}
              className="flex items-center justify-between rounded-lg border border-navy-100 bg-navy-50/50 px-3 py-2.5 dark:border-navy-700 dark:bg-navy-800/50"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium text-navy-700 dark:text-navy-200">
                  {course.title}
                </p>
                <p className="mt-0.5 text-[10px] text-navy-400">
                  Completed {data.completedAt} &middot;{" "}
                  {data.cpdPointsEarned} CPD pts earned
                </p>
              </div>
              <button className="ml-3 flex-shrink-0 rounded border border-navy-200 bg-white px-2.5 py-1 text-[10px] font-medium text-navy-600 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-300 dark:hover:bg-navy-700">
                Certificate
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function AcademyPlatformPage() {
  const [selectedCountry, setSelectedCountry] = useState("NZ");
  const [selectedProfession, setSelectedProfession] = useState<"lawyer" | "accountant">("lawyer");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedAudience, setSelectedAudience] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      if (selectedCategory !== "all" && course.category !== selectedCategory) return false;
      if (selectedLevel !== "all" && course.level !== selectedLevel) return false;
      if (selectedAudience !== "all" && !course.audience.includes(selectedAudience as "lawyer" | "accountant" | "student" | "public")) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q) ||
          course.accreditations.some((a) => a.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedCategory, selectedLevel, selectedAudience, searchQuery]);

  const totalCompletedHours = Object.keys(MOCK_COMPLETED).reduce((sum, slug) => {
    const course = COURSES.find((c) => c.slug === slug);
    return sum + (course?.cpdPoints ?? 0);
  }, 0);

  const inProgressCount = Object.keys(MOCK_IN_PROGRESS).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* ------------------------------------------------------------ */}
      {/* Header                                                        */}
      {/* ------------------------------------------------------------ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-800 dark:text-white">
            Academy
          </h1>
          <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">
            {totalCompletedHours} CPD hours earned &middot;{" "}
            {Object.keys(MOCK_COMPLETED).length} courses completed &middot;{" "}
            {inProgressCount} in progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200"
          >
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value as "lawyer" | "accountant")}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm capitalize text-navy-700 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200"
          >
            <option value="lawyer">Lawyer</option>
            <option value="accountant">Accountant</option>
          </select>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* CPD Progress + Completed                                      */}
      {/* ------------------------------------------------------------ */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <CPDProgressWidget
          country={selectedCountry}
          profession={selectedProfession}
        />
        <CompletedCoursesWidget />
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Filters                                                       */}
      {/* ------------------------------------------------------------ */}
      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-navy-100 bg-white p-4 dark:border-navy-700 dark:bg-navy-800 sm:flex-row sm:items-center sm:gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            viewBox="0 0 20 20"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400"
            fill="none"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M14 14l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-navy-200 bg-navy-50 py-2 pl-10 pr-4 text-sm text-navy-700 placeholder:text-navy-400 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200 dark:placeholder:text-navy-500"
          />
        </div>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-navy-200 bg-navy-50 px-3 py-2 text-sm text-navy-700 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
        >
          <option value="all">All categories</option>
          {TRAINING_CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Level */}
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="rounded-lg border border-navy-200 bg-navy-50 px-3 py-2 text-sm text-navy-700 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
        >
          <option value="all">All levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>

        {/* Audience */}
        <select
          value={selectedAudience}
          onChange={(e) => setSelectedAudience(e.target.value)}
          className="rounded-lg border border-navy-200 bg-navy-50 px-3 py-2 text-sm text-navy-700 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
        >
          <option value="all">All audiences</option>
          <option value="lawyer">Lawyers</option>
          <option value="accountant">Accountants</option>
          <option value="student">Students</option>
        </select>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Course count                                                  */}
      {/* ------------------------------------------------------------ */}
      <p className="mt-4 text-xs text-navy-400 dark:text-navy-400">
        Showing {filteredCourses.length} of {COURSES.length} courses
      </p>

      {/* ------------------------------------------------------------ */}
      {/* Course grid                                                   */}
      {/* ------------------------------------------------------------ */}
      {filteredCourses.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <svg viewBox="0 0 24 24" className="h-12 w-12 text-navy-300 dark:text-navy-600" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
          </svg>
          <p className="text-sm text-navy-500 dark:text-navy-300">
            No courses match your filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedLevel("all");
              setSelectedAudience("all");
              setSearchQuery("");
            }}
            className="text-sm font-medium text-navy-600 underline hover:text-navy-800 dark:text-navy-300 dark:hover:text-white"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
