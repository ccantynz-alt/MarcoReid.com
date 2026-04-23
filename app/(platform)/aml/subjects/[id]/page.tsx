import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getUserId } from "@/lib/session";
import { getSubject } from "@/lib/aml/cdd";
import SubjectActions from "./SubjectActions";

export const dynamic = "force-dynamic";

function formatDate(d: Date | null | undefined) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function SubjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { id } = await params;
  const subject = await getSubject(id);
  if (!subject || subject.firmId !== userId) notFound();

  const riskClass =
    subject.riskLevel === "UNACCEPTABLE"
      ? "bg-red-50 text-red-600"
      : subject.riskLevel === "HIGH"
        ? "bg-plum-50 text-plum-600"
        : subject.riskLevel === "MEDIUM"
          ? "bg-gold-50 text-gold-700"
          : "bg-forest-50 text-forest-600";

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/aml/subjects"
        className="text-sm font-medium text-navy-500 hover:text-navy-700"
      >
        &larr; All subjects
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800">
            {subject.legalName}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${riskClass}`}
            >
              {subject.riskLevel}
            </span>
            <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-500">
              {subject.status}
            </span>
            <span className="text-navy-400">{subject.subjectType}</span>
            {subject.expiresAt && (
              <span className="text-navy-400">
                · Expires {formatDate(subject.expiresAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg text-navy-800">
              Subject details
            </h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-navy-400">Preferred name</dt>
                <dd className="text-navy-700">
                  {subject.preferredName ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-navy-400">Date of birth</dt>
                <dd className="text-navy-700">
                  {subject.dateOfBirth
                    ? formatDate(subject.dateOfBirth)
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-navy-400">Country of residence</dt>
                <dd className="text-navy-700">
                  {subject.countryOfResidence ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-navy-400">Citizenship</dt>
                <dd className="text-navy-700">
                  {subject.countryOfCitizenship ?? "—"}
                </dd>
              </div>
              {subject.subjectType === "ENTITY" && (
                <>
                  <div>
                    <dt className="text-navy-400">Entity type</dt>
                    <dd className="text-navy-700">
                      {subject.entityType ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-navy-400">Registration #</dt>
                    <dd className="text-navy-700">
                      {subject.entityRegistrationNumber ?? "—"}
                    </dd>
                  </div>
                </>
              )}
              <div className="sm:col-span-2">
                <dt className="text-navy-400">Address</dt>
                <dd className="text-navy-700">
                  {[
                    subject.addressLine1,
                    subject.addressLine2,
                    subject.city,
                    subject.region,
                    subject.postalCode,
                    subject.country,
                  ]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg text-navy-800">
                Check history
              </h2>
              <span className="text-xs text-navy-400">
                {subject.checks.length}{" "}
                {subject.checks.length === 1 ? "check" : "checks"}
              </span>
            </div>
            {subject.checks.length === 0 ? (
              <p className="mt-4 text-sm text-navy-400">
                No checks run yet.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-navy-50">
                {subject.checks.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-navy-700">{c.type}</p>
                      <p className="text-xs text-navy-400">
                        {formatDate(c.performedAt)}
                        {c.vendorRef ? ` · ref ${c.vendorRef}` : ""}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        c.result === "CLEAR"
                          ? "bg-forest-50 text-forest-600"
                          : c.result === "HIT"
                            ? "bg-red-50 text-red-600"
                            : "bg-gold-50 text-gold-700"
                      }`}
                    >
                      {c.result}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg text-navy-800">
              Beneficial owners
            </h2>
            {subject.beneficialOwners.length === 0 ? (
              <p className="mt-4 text-sm text-navy-400">
                None recorded.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-navy-50">
                {subject.beneficialOwners.map((bo) => (
                  <li
                    key={bo.id}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-navy-700">
                        {bo.ownerName}
                      </p>
                      <p className="text-xs text-navy-400">{bo.ownerType}</p>
                    </div>
                    <span className="text-navy-500">
                      {bo.ownershipPct.toString()}%
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg text-navy-800">
              Source of funds
            </h2>
            {subject.sourceOfFunds.length === 0 ? (
              <p className="mt-4 text-sm text-navy-400">
                Not yet captured.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-navy-50">
                {subject.sourceOfFunds.map((sof) => (
                  <li key={sof.id} className="py-3 text-sm">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-navy-700">
                        {sof.category}
                      </p>
                      <span className="text-navy-500">
                        {sof.amountStated
                          ? `${sof.currency} ${sof.amountStated.toString()}`
                          : "—"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-navy-400">
                      {sof.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside>
          <SubjectActions
            subjectId={subject.id}
            status={subject.status}
            riskLevel={subject.riskLevel}
          />
        </aside>
      </div>
    </div>
  );
}
