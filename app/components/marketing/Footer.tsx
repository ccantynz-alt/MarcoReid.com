import Link from "next/link";

const links = {
  products: [
    { label: "Marco Reid Legal", href: "/law" },
    { label: "Marco Reid Accounting", href: "/accounting" },
    { label: "Catch-Up Centre", href: "/catch-up-centre" },
    { label: "Marco", href: "/marco" },
    { label: "Marco Reid Voice", href: "/dictation" },
    { label: "Marco Reid Courtroom", href: "/courtroom" },
    { label: "Pricing", href: "/pricing" },
  ],
  marketplace: [
    { label: "For citizens", href: "/for-citizens" },
    { label: "Join as a professional", href: "/marketplace" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Changelog", href: "/changelog" },
    { label: "Contact", href: "/contact" },
    { label: "Sign in", href: "/login" },
  ],
  resources: [
    { label: "Help centre", href: "/help" },
    { label: "Getting started", href: "/help/getting-started" },
    { label: "FAQ", href: "/help/faq" },
    { label: "System status", href: "/status" },
  ],
  trust: [
    { label: "Security", href: "/security" },
    { label: "Trust centre", href: "/trust-center" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Data processing", href: "/dpa" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Acceptable use", href: "/acceptable-use" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "DMCA", href: "/dmca" },
    { label: "Refunds", href: "/refunds" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-50">
      <div className="gold-divider" />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" className="font-serif text-xl text-navy-500">
              Marco Reid
            </Link>
            <p className="mt-2 text-sm text-navy-400">
              Professional intelligence &mdash;
              <br />
              law and accounting.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Products
            </p>
            <ul className="mt-4 space-y-3">
              {links.products.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-navy-500 transition-colors hover:text-navy-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gold-600">
              Marketplace
            </p>
            <ul className="mt-4 space-y-3">
              {links.marketplace.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-navy-500 transition-colors hover:text-navy-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              {links.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-navy-500 transition-colors hover:text-navy-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-navy-400">
              Resources
            </p>
            <ul className="mt-4 space-y-3">
              {links.resources.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-navy-500 transition-colors hover:text-navy-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Trust
            </p>
            <ul className="mt-4 space-y-3">
              {links.trust.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-navy-500 transition-colors hover:text-navy-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              {links.legal.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-navy-500 transition-colors hover:text-navy-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-navy-200 pt-8">
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} Reid &amp; Associates. Auckland, New Zealand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
