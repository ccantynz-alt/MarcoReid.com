import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import IntegrationsGrid, { type Integration } from "./IntegrationsGrid";
import SectionHeader from "../SectionHeader";

export const dynamic = "force-dynamic";

export default async function IntegrationsSettingsPage() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string } | undefined;
  if (!sessionUser?.id) {
    redirect("/login?next=/settings/integrations");
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: { stripeCustomerId: true, connectOnboarded: true },
  });

  const integrations: Integration[] = [
    {
      key: "stripe",
      name: "Stripe — billing",
      desc: "Subscriptions, payment methods, and invoices.",
      status: user?.stripeCustomerId ? "connected" : "available",
      action: user?.stripeCustomerId ? "manage" : "connect",
    },
    {
      key: "stripe-connect",
      name: "Stripe Connect — marketplace",
      desc: "Receive client payments through Marco Reid escrow.",
      status: user?.connectOnboarded ? "connected" : "available",
      action: user?.connectOnboarded ? "manage" : "connect",
    },
    {
      key: "anthropic",
      name: "Anthropic Claude",
      desc: "Powers Marco's reasoning across legal and accounting.",
      status: "connected",
      backend: true,
    },
    {
      key: "openai-whisper",
      name: "OpenAI Whisper",
      desc: "Powers Marco Reid Voice — multilingual dictation.",
      status: "connected",
      backend: true,
    },
    {
      key: "courtlistener",
      name: "CourtListener",
      desc: "Verified citations from US case law and federal court records.",
      status: "connected",
      backend: true,
    },
    {
      key: "microsoft365",
      name: "Microsoft 365",
      desc: "Sync mail, calendar, and OneDrive into your matters.",
      status: "coming-soon",
    },
    {
      key: "google-workspace",
      name: "Google Workspace",
      desc: "Gmail, Calendar, and Drive across your firm.",
      status: "coming-soon",
    },
    {
      key: "legacy-pms-import",
      name: "Legacy practice management import",
      desc: "Migrate matters, contacts, and time entries from your existing practice management system.",
      status: "coming-soon",
    },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Integrations"
        description="Connect Marco Reid to the rest of your stack."
      />
      <IntegrationsGrid integrations={integrations} />
    </div>
  );
}
