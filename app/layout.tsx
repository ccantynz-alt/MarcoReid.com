import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

const siteUrl = "https://marcoreid.com";
const siteName = "Marco Reid";
const siteDescription =
  "The operating system for legal and accounting professionals. Case management, billing, AI research, dictation — every tool your firm needs in one platform.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Professional Intelligence for Law and Accounting`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "legal practice management",
    "accounting software for CPAs",
    "AI legal research",
    "IOLTA trust accounting",
    "legal citation verification",
    "law firm software",
    "dictation for lawyers",
    "cross-domain legal research",
    "Clio alternative",
    "Westlaw alternative",
  ],
  authors: [{ name: "Reid & Associates Ltd" }],
  creator: "Reid & Associates Ltd",
  publisher: "Reid & Associates Ltd",
  applicationName: siteName,
  category: "Business Software",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} — Professional Intelligence for Law and Accounting`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteName} — the platform for legal and accounting professionals`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Professional Intelligence for Law and Accounting`,
    description: siteDescription,
    creator: "@marcoreid",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add verification tokens when claiming Search Console / Bing Webmaster Tools
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Reid & Associates Ltd",
  alternateName: "Marco Reid",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: siteDescription,
  foundingLocation: {
    "@type": "Place",
    name: "Auckland, New Zealand",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Auckland",
    addressCountry: "NZ",
  },
  sameAs: [] as string[],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@marcoreid.com",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "legal",
      email: "legal@marcoreid.com",
    },
    {
      "@type": "ContactPoint",
      contactType: "privacy",
      email: "privacy@marcoreid.com",
    },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteName,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: siteDescription,
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "99",
      priceCurrency: "USD",
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: 1,
        unitCode: "MON",
      },
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
      </head>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
