import { prisma } from "@/lib/prisma";
import SetupCompanyWizard from "@/app/components/citizen/SetupCompanyWizard";

export const metadata = {
  title: "Set up a company — Marco Reid",
  description:
    "Tell us about your business and founders. Marco designs a multi-jurisdiction structure — local operating company, any US or trust overlay needed for asset protection — and hands the pack to a licensed professional to sign off.",
};

export const dynamic = "force-dynamic";

export default async function SetupCompanyPage() {
  const areas = await prisma.practiceArea.findMany({
    where: {
      active: true,
      slug: { in: ["nz-company-formation", "au-company-formation"] },
    },
    select: {
      slug: true,
      name: true,
      jurisdiction: true,
      leadFeeInCents: true,
      currency: true,
      ackVersion: true,
      ackBullets: true,
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Set up a company
        </p>
        <h1 className="mt-3 font-serif text-4xl text-navy-800">
          A company structure designed for where you actually trade.
        </h1>
        <p className="mt-4 text-navy-500">
          Tell us who the founders are, where you sell, and how protected you
          want to be. Marco drafts the full structure — home operating
          company, any US or IP-holding entity, trust overlay where it&rsquo;s
          warranted — and a licensed lawyer or chartered accountant signs off
          before anything is filed.
        </p>
      </div>

      <SetupCompanyWizard areas={areas} />
    </div>
  );
}
