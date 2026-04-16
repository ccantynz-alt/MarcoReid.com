import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import MatterDocumentsUploadButton from "@/app/components/platform/MatterDocumentsUploadButton";

export const dynamic = "force-dynamic";

const money = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);

const formatHours = (minutes: number) => {
  const hours = minutes / 60;
  if (hours >= 10) return `${Math.round(hours)}h`;
  return `${hours.toFixed(1)}h`;
};

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);

const formatRelative = (d: Date) => {
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
};

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-forest-50 text-forest-600",
  ON_HOLD: "bg-navy-50 text-navy-500",
  CLOSED: "bg-plum-50 text-plum-600",
};

export default async function MatterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  const matter = await prisma.matter.findFirst({
    where: { id, userId },
    include: {
      client: true,
      documents: { orderBy: { createdAt: "desc" } },
      timeEntries: { orderBy: { date: "desc" } },
      trustTransactions: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });
  if (!matter) notFound();

  const totalMinutes = matter.timeEntries.reduce((s, t) => s + t.minutes, 0);
  const billableCents = matter.timeEntries
    .filter((t) => t.billable)
    .reduce((sum, t) => sum + Math.round((t.minutes / 60) * t.rateInCents), 0);
  const invoicedCents = matter.timeEntries
    .filter((t) => t.billable && t.invoiced)
    .reduce((sum, t) => sum + Math.round((t.minutes / 60) * t.rateInCents), 0);
  const trustBalance = matter.trustTransactions.reduce((s, t) => {
    return t.type === "DEPOSIT" ? s + t.amountInCents : s - t.amountInCents;
  }, 0);

  // Build a timeline: opened, documents, time entries, trust txs
  const events: Array<{
    at: Date;
    kind: "opened" | "document" | "time" | "trust" | "closed";
    title: string;
    detail: string;
  }> = [];

  events.push({
    at: matter.openedAt,
    kind: "opened",
    title: "Matter opened",
    detail: `For ${matter.client.name}`,
  });

  matter.documents.forEach((d) => {
    events.push({
      at: d.createdAt,
      kind: "document",
      title: `Document added: ${d.title}`,
      detail: `${d.kind.replace("_", " ")} · ${d.fileName}`,
    });
  });

  matter.timeEntries.forEach((t) => {
    events.push({
      at: t.createdAt,
      kind: "time",
      title: `${formatHours(t.minutes)} logged`,
      detail: `${t.description}${t.billable ? "" : " · non-billable"}`,
    });
  });

  matter.trustTransactions.forEach((t) => {
    events.push({
      at: t.createdAt,
      kind: "trust",
      title: `Trust ${t.type.toLowerCase().replace("_", " ")}: ${money(t.amountInCents)}`,
      detail: t.description,
    });
  });

  if (matter.closedAt) {
    events.push({
      at: matter.closedAt,
      kind: "closed",
      title: "Matter closed",
      detail: "",
    });
  }

  events.sort((a, b) => b.at.getTime() - a.at.getTime());

  const eventStyles: Record<string, string> = {
    opened: "bg-forest-500",
    document: "bg-navy-500",
    time: "bg-plum-500",
    trust: "bg-gold-500",
    closed: "bg-navy-400",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Breadcrumb */}
      <Link
        href="/matters"
        className="inline-flex items-center gap-1 text-sm text-navy-400 transition-colors hover:text-navy-700"
      >
        &larr; All matters
      </Link>

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-display text-navy-800">
              {matter.title}
            </h1>
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                statusStyles[matter.status]
              }`}
            >
              {matter.status.replace("_", " ")}
            </span>
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-500">
            <Link
              href={`/clients/${matter.clientId}`}
              className="font-medium text-navy-700 hover:underline"
            >
              {matter.client.name}
            </Link>
            {matter.matterNumber && (
              <>
                <span className="text-navy-300">·</span>
                <span>#{matter.matterNumber}</span>
              </>
            )}
            {matter.practiceArea && (
              <>
                <span className="text-navy-300">·</span>
                <span>{matter.practiceArea}</span>
              </>
            )}
            <span className="text-navy-300">·</span>
            <span>Opened {formatDate(matter.openedAt)}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/marco?matterId=${matter.id}`}
            className="inline-flex items-center rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-navy-400"
          >
            Ask Marco about this
          </Link>
          <Link
            href={`/matters/${matter.id}/edit`}
            className="inline-flex items-center rounded-lg bg-navy-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
          >
            Edit
          </Link>
        </div>
      </div>

      {/* Metrics bar */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Hours logged
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {formatHours(totalMinutes)}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            Across {matter.timeEntries.length} entries
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Billable
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {money(billableCents)}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            {money(invoicedCents)} invoiced
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Trust balance
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {money(trustBalance)}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            {matter.trustTransactions.length} transactions
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Documents
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {matter.documents.length}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            {matter.documents.length === 0 ? "None yet" : "In this matter"}
          </p>
        </div>
      </div>

      {/* Description */}
      {matter.description && (
        <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Description
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-navy-600">
            {matter.description}
          </p>
        </div>
      )}

      {/* Main grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <h2 className="font-serif text-headline text-navy-800">Timeline</h2>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            {events.length === 0 ? (
              <p className="text-sm text-navy-400">No activity yet.</p>
            ) : (
              <ol className="relative space-y-5">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-navy-100" />
                {events.slice(0, 15).map((event, i) => (
                  <li key={i} className="relative pl-7">
                    <span
                      className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-white ${
                        eventStyles[event.kind]
                      }`}
                    />
                    <p className="text-sm font-medium text-navy-700">
                      {event.title}
                    </p>
                    {event.detail && (
                      <p className="mt-0.5 text-sm text-navy-500">
                        {event.detail}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-navy-400">
                      {formatRelative(event.at)} · {formatDate(event.at)}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {/* Client card */}
        <div>
          <h2 className="font-serif text-headline text-navy-800">Client</h2>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-sm font-semibold text-navy-600">
                {matter.client.name.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-navy-700">
                  {matter.client.name}
                </p>
                {matter.client.companyName && (
                  <p className="truncate text-xs text-navy-400">
                    {matter.client.companyName}
                  </p>
                )}
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                  Email
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${matter.client.email}`}
                    className="text-navy-600 hover:text-navy-800"
                  >
                    {matter.client.email}
                  </a>
                </dd>
              </div>
              {matter.client.phone && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Phone
                  </dt>
                  <dd className="mt-0.5 text-navy-600">{matter.client.phone}</dd>
                </div>
              )}
              {matter.client.address && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Address
                  </dt>
                  <dd className="mt-0.5 whitespace-pre-line text-navy-600">
                    {matter.client.address}
                  </dd>
                </div>
              )}
            </dl>
            <Link
              href={`/clients/${matter.clientId}`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-navy-200 bg-white py-2 text-sm font-medium text-navy-700 transition-colors hover:border-navy-400"
            >
              View client profile &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Documents and time entries */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-headline text-navy-800">Documents</h2>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-500">
                {matter.documents.length}
              </span>
              <MatterDocumentsUploadButton
                matterId={matter.id}
                clientId={matter.clientId}
              />
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white shadow-card">
            {matter.documents.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-navy-400">
                No documents yet.
              </div>
            ) : (
              <ul className="divide-y divide-navy-50">
                {matter.documents.map((d) => (
                  <li key={d.id} className="px-5 py-4">
                    <p className="font-medium text-navy-700">{d.title}</p>
                    <p className="mt-0.5 text-xs text-navy-400">
                      {d.fileName} · {d.kind.replace("_", " ")} ·{" "}
                      {Math.round(d.fileSize / 1024)} KB ·{" "}
                      {formatRelative(d.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-headline text-navy-800">
              Time entries
            </h2>
            <span className="text-sm font-semibold text-forest-600">
              {money(billableCents)}
            </span>
          </div>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white shadow-card">
            {matter.timeEntries.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-navy-400">
                No time entries yet.
              </div>
            ) : (
              <ul className="divide-y divide-navy-50">
                {matter.timeEntries.slice(0, 8).map((t) => (
                  <li key={t.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 flex-1 font-medium text-navy-700">
                        {t.description}
                      </p>
                      <span className="flex-shrink-0 text-sm text-navy-600">
                        {formatHours(t.minutes)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-navy-400">
                      {formatDate(t.date)} · {money(t.rateInCents)}/hr
                      {t.billable ? "" : " · non-billable"}
                      {t.invoiced ? " · invoiced" : ""}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
