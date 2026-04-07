import Link from "next/link";

const links = {
  products: [
    { label: "Marco Reid Legal", href: "/law" },
    { label: "Marco Reid Accounting", href: "/accounting" },
    { label: "Marco", href: "/marco" },
    { label: "Marco Reid Voice", href: "/dictation" },
    { label: "Marco Reid Courtroom", href: "/courtroom" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Security", href: "/security" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-50">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
