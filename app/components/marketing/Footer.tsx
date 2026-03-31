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
    <footer className="bg-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <Link href="/" className="font-serif text-lg text-neutral-950">
              AlecRae
            </Link>
            <p className="mt-2 text-sm text-neutral-600">
              Professional intelligence.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
              Products
            </p>
            <ul className="mt-4 space-y-3">
              {links.products.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-neutral-700 transition-colors hover:text-neutral-950">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              {links.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-neutral-700 transition-colors hover:text-neutral-950">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              {links.legal.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-neutral-700 transition-colors hover:text-neutral-950">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-300 pt-8">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} AlecRae. Auckland, New Zealand.
          </p>
        </div>
      </div>
    </footer>
  );
}
