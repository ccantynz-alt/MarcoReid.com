import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulatory Compliance — Marco Reid",
  description:
    "How Marco Reid meets the legal, professional, and regulatory requirements across every jurisdiction we operate in — NZ, AU, UK, US, and Canada.",
  openGraph: {
    title: "Regulatory Compliance — Marco Reid",
    description:
      "Jurisdiction-by-jurisdiction compliance matrix: privacy law, bar rules, IOLTA, GDPR, and professional regulations.",
    url: "https://marcoreid.com/compliance",
  },
};

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
