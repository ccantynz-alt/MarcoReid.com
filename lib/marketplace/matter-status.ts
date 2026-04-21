import { ProMatterStatus } from "@prisma/client";

interface StatusPresentation {
  label: string;
  tone: string;
  citizenMessage: string;
}

export const MATTER_STATUS_PRESENTATION: Record<ProMatterStatus, StatusPresentation> = {
  DRAFT: {
    label: "Draft",
    tone: "bg-navy-100 text-navy-600",
    citizenMessage: "You saved this matter as a draft. Submit it when you're ready.",
  },
  AWAITING_PAYMENT: {
    label: "Awaiting payment",
    tone: "bg-amber-100 text-amber-800",
    citizenMessage:
      "Finish the lead-fee checkout to post your matter. We don't show it to professionals until payment clears.",
  },
  AWAITING_PRO: {
    label: "Waiting for a professional",
    tone: "bg-amber-100 text-amber-800",
    citizenMessage:
      "Your matter has been posted. A verified lawyer or chartered accountant in your area will pick it up — usually within two working days.",
  },
  ACCEPTED: {
    label: "Accepted",
    tone: "bg-forest-100 text-forest-800",
    citizenMessage:
      "A professional has accepted your matter and is working on it. You'll see any outputs here once they have been signed off.",
  },
  AWAITING_SIGNOFF: {
    label: "In review",
    tone: "bg-plum-100 text-plum-800",
    citizenMessage:
      "A draft has been prepared and is being reviewed and signed off. Nothing is sent on your behalf until the pro approves it.",
  },
  SIGNED_OFF: {
    label: "Signed off",
    tone: "bg-gold-100 text-gold-800",
    citizenMessage: "The output below has been reviewed and released by your professional.",
  },
  CLOSED: {
    label: "Closed",
    tone: "bg-navy-100 text-navy-500",
    citizenMessage: "This matter has been closed.",
  },
  CANCELLED: {
    label: "Cancelled",
    tone: "bg-navy-100 text-navy-400",
    citizenMessage: "This matter was cancelled before completion.",
  },
};
