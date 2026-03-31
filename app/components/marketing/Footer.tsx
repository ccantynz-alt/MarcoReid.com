import Link from "next/link";

const links = {
  products: [
    { label: "Law", href: "/law" },
    { label: "Accounting", href: "/accounting" },
    { label: "The Oracle", href: "/oracle" },
    { label: "Voice", href: "/dictation" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Security", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-surface-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <Link href="/" className="font-serif text-lg text-text-primary">
              AlecRae
            </Link>
            <p className="mt-2 text-sm text-text-tertiary">
              Professional intelligence.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
              Products
            </p>
            <ul className="mt-4 space-y-3">
              {links.products.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              {links.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              {links.legal.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glow-line-subtle mt-16" />
        <p className="mt-8 text-xs text-text-tertiary">
          &copy; {new Date().getFullYear()} AlecRae. Auckland, New Zealand.
        </p>
      </div>
    </footer>
  );
}
