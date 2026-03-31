import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alecrae.com"),
  title: {
    default: "AlecRae \u2014 Professional Intelligence for Law and Accounting",
    template: "%s | AlecRae",
  },
  description:
    "The operating system for legal and accounting professionals. Case management, billing, AI research, dictation, and every tool your firm needs \u2014 in one platform.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AlecRae",
    title: "AlecRae \u2014 Professional Intelligence for Law and Accounting",
    description:
      "The operating system for legal and accounting professionals. Every tool your firm needs, in one platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlecRae \u2014 Professional Intelligence for Law and Accounting",
    description:
      "The operating system for legal and accounting professionals. Every tool your firm needs, in one platform.",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
