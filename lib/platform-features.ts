export interface UpcomingFeature {
  id: number;
  name: string;
  description: string;
  status: "planned" | "in-progress" | "beta" | "released";
  eta: string;
}

export const UPCOMING_FEATURES: UpcomingFeature[] = [
  {
    id: 11,
    name: "Video Consultations",
    description:
      "Built-in video calls between professionals and clients. No Zoom needed. Recorded, transcribed, and linked to the matter.",
    status: "planned",
    eta: "Q3 2026",
  },
  {
    id: 12,
    name: "Escrow Payments",
    description:
      "Secure escrow for client payments. Funds held until work is completed and approved. Protects both parties.",
    status: "planned",
    eta: "Q3 2026",
  },
  {
    id: 13,
    name: "Client Reviews & Ratings",
    description:
      "After matter completion, clients rate their professional. Builds trust and helps the public find the best practitioners.",
    status: "planned",
    eta: "Q3 2026",
  },
  {
    id: 14,
    name: "Appointment Booking",
    description:
      "Clients book consultations directly from the professional's profile. Calendar sync with Google and Outlook.",
    status: "planned",
    eta: "Q3 2026",
  },
  {
    id: 15,
    name: "Mobile App (iOS & Android)",
    description:
      "Native mobile apps for professionals and clients. Push notifications, document scanning, voice notes.",
    status: "planned",
    eta: "Q4 2026",
  },
  {
    id: 16,
    name: "AI Document Review",
    description:
      "Upload any legal or accounting document. Marco reads it and highlights risks, missing clauses, and compliance issues.",
    status: "planned",
    eta: "Q3 2026",
  },
  {
    id: 17,
    name: "Smart Referral Network",
    description:
      "When a lawyer needs an accountant (or vice versa), Marco suggests the best match from the platform based on speciality, jurisdiction, and ratings.",
    status: "planned",
    eta: "Q3 2026",
  },
  {
    id: 18,
    name: "White-Label Client Portal",
    description:
      "Professionals can brand the client portal with their own firm logo, colours, and domain. Clients see the firm's brand, powered by Marco Reid.",
    status: "planned",
    eta: "Q4 2026",
  },
  {
    id: 19,
    name: "Government API Integrations",
    description:
      "Direct API connections to IR (NZ), ATO (AU), HMRC (UK), IRS (US), CRA (CA) for real-time filing and status checks.",
    status: "planned",
    eta: "Q4 2026",
  },
  {
    id: 20,
    name: "Multi-Language Interface",
    description:
      "Full platform available in 9 languages: English, French, Spanish, Mandarin, Hindi, Arabic, Portuguese, German, Japanese.",
    status: "planned",
    eta: "2027",
  },
];
