import Link from "next/link";
import Container from "@/app/components/shared/Container";

const footerLinks = {
  products: [
    { label: "AlecRae Law", href: "/law" },
    { label: "AlecRae Accounting", href: "/accounting" },
    { label: "The Oracle", href: "/oracle" },
    { label: "AlecRae Voice", href: "/dictation" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Security", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-50">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-serif text-2xl text-navy-500">
              AlecRae
            </Link>
            <p className="mt-2 text-sm text-navy-400">
              Professional intelligence {"\u2014"} law and accounting
            </p>
            <p className="mt-4 text-xs text-navy-300">
              Built in Auckland, New Zealand
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-navy-500">Products</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-navy-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-navy-500">Company</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-navy-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-navy-500">Legal</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-navy-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-100 pt-8">
          <p className="text-center text-xs text-navy-300">
            &copy; {new Date().getFullYear()} AlecRae. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
