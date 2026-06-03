import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notices — Marco Reid",
  description:
    "Disclaimers, liability caps, governing law, and professional responsibility notices for Marco Reid across all operating jurisdictions.",
  openGraph: {
    title: "Legal Notices — Marco Reid",
    description:
      "AI output disclaimers, jurisdictional liability information, and professional responsibility notices.",
    url: "https://marcoreid.com/legal-notices",
  },
};

export default function LegalNoticesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
