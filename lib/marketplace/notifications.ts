// Marketplace email notifications — fire-and-forget from API routes on
// the hot state-transition paths. Failures are logged but never block the
// caller; the state change has already committed by the time we dispatch.

import { prisma } from "@/lib/prisma";
import { sendEmail, emailLayout } from "@/lib/email";
import { BRAND } from "@/lib/constants";

function baseUrl() {
  return process.env.NEXTAUTH_URL || BRAND.url;
}

function formatFee(cents: number, currency: string) {
  return `${currency} $${(cents / 100).toFixed(0)}`;
}

// Citizen posted a matter → notify every verified pro whose practice-area
// list includes the area, whose admission matches the jurisdiction, who
// is accepting new matters and whose PI is current.
export async function notifyMatchingProsOfNewMatter(matterId: string): Promise<void> {
  const matter = await prisma.proMatter.findUnique({
    where: { id: matterId },
    include: {
      practiceArea: { select: { name: true, slug: true, jurisdiction: true } },
    },
  });
  if (!matter || !matter.practiceArea) return;

  const now = new Date();
  const pros = await prisma.professional.findMany({
    where: {
      verifiedAt: { not: null },
      acceptingNewMatters: true,
      admissionJurisdiction: matter.jurisdiction,
      piPolicyExpiresAt: { gt: now },
      practiceAreas: { some: { practiceAreaId: matter.practiceAreaId } },
    },
    include: { user: { select: { email: true, name: true } } },
  });

  if (pros.length === 0) return;

  const dashboardUrl = `${baseUrl()}/pro-dashboard`;
  const feeLabel = formatFee(matter.leadFeeInCents, matter.currency);

  await Promise.allSettled(
    pros.map(async (pro) => {
      if (!pro.user?.email) return;
      const { html, text } = emailLayout({
        preheader: `New ${matter.practiceArea.name} matter available`,
        heading: "A matter is waiting for you",
        body: `
          <p>A new <strong>${escapeHtml(matter.practiceArea.name)}</strong> matter has been posted by a citizen in ${escapeHtml(jurisdictionName(matter.jurisdiction))}.</p>
          <p><strong>Summary:</strong> ${escapeHtml(matter.summary)}</p>
          <p>Lead fee on release: <strong>${feeLabel}</strong>. Once you accept, it's yours — other pros can no longer claim it.</p>
        `,
        cta: { href: dashboardUrl, label: "Review the matter" },
      });
      try {
        await sendEmail({
          to: pro.user.email,
          subject: `New matter: ${matter.practiceArea.name}`,
          html,
          text,
        });
      } catch (err) {
        console.error("[marketplace/notifications] notifyMatchingPros failed:", err);
      }
    }),
  );
}

// Pro accepted a matter → reassure the citizen their matter is now with a
// qualified professional. Surface the pro's display name + professional body.
export async function notifyCitizenOfAcceptance(matterId: string): Promise<void> {
  const matter = await prisma.proMatter.findUnique({
    where: { id: matterId },
    include: {
      citizen: { select: { email: true, name: true } },
      practiceArea: { select: { name: true } },
      acceptedBy: {
        select: {
          displayName: true,
          professionalBody: true,
          admissionJurisdiction: true,
        },
      },
    },
  });
  if (!matter || !matter.citizen?.email || !matter.acceptedBy) return;

  const matterUrl = `${baseUrl()}/matter/${matter.id}`;
  const { html, text } = emailLayout({
    preheader: "A qualified professional has accepted your matter",
    heading: "Your matter has been accepted",
    body: `
      <p>Good news — your <strong>${escapeHtml(matter.practiceArea.name)}</strong> matter has been accepted by <strong>${escapeHtml(matter.acceptedBy.displayName)}</strong>, a verified ${escapeHtml(matter.acceptedBy.professionalBody || "professional")} member admitted in ${escapeHtml(jurisdictionName(matter.acceptedBy.admissionJurisdiction))}.</p>
      <p>Marco is drafting the paperwork now. Your pro will review, sign off, and release it to you as soon as it's ready. You'll receive another email the moment it's in your hands.</p>
      <p>You can check progress anytime at the link below.</p>
    `,
    cta: { href: matterUrl, label: "Track your matter" },
  });
  try {
    await sendEmail({
      to: matter.citizen.email,
      subject: "Your Marco Reid matter has been accepted",
      html,
      text,
    });
  } catch (err) {
    console.error("[marketplace/notifications] notifyCitizenOfAcceptance failed:", err);
  }
}

// Sign-off released (approve or amend) → tell the citizen the work is ready.
export async function notifyCitizenOfRelease(signoffId: string): Promise<void> {
  const signoff = await prisma.signoffRequest.findUnique({
    where: { id: signoffId },
    include: {
      proMatter: {
        include: {
          citizen: { select: { email: true, name: true } },
          practiceArea: { select: { name: true } },
          acceptedBy: { select: { displayName: true } },
        },
      },
    },
  });
  if (!signoff || !signoff.proMatter.citizen?.email) return;

  const matter = signoff.proMatter;
  const matterUrl = `${baseUrl()}/matter/${matter.id}`;
  const amended = signoff.amendedOutput && signoff.amendedOutput.length > 0;

  const { html, text } = emailLayout({
    preheader: "Your matter has been signed off and is ready to review",
    heading: "Your matter is ready",
    body: `
      <p>Your <strong>${escapeHtml(matter.practiceArea.name)}</strong> matter has been signed off by ${escapeHtml(matter.acceptedBy?.displayName || "your professional")}.</p>
      ${amended
        ? "<p>The professional made amendments to the AI's draft before release — the final version you see is the one they have approved and will stand behind.</p>"
        : "<p>The AI's draft was approved as-is.</p>"}
      <p>Read the signed-off version and next steps at the link below.</p>
    `,
    cta: { href: matterUrl, label: "View your signed-off matter" },
  });
  try {
    await sendEmail({
      to: matter.citizen.email,
      subject: `Your ${matter.practiceArea.name.toLowerCase()} matter is ready`,
      html,
      text,
    });
  } catch (err) {
    console.error("[marketplace/notifications] notifyCitizenOfRelease failed:", err);
  }
}

function jurisdictionName(code: string): string {
  switch (code) {
    case "NZ":
      return "New Zealand";
    case "AU":
      return "Australia";
    case "US":
      return "the United States";
    case "UK":
      return "the United Kingdom";
    case "CA":
      return "Canada";
    default:
      return code;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
