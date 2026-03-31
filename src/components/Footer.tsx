import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-white">Alec</span>
              <span className="text-gold">Rae</span>
            </Link>
            <p className="mt-3 text-sm text-slate leading-relaxed">
              Professional intelligence for law and accounting.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate">
              <li><Link href="#dictation" className="hover:text-white transition-colors">AI Dictation</Link></li>
              <li><Link href="#oracle" className="hover:text-white transition-colors">The Oracle</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-slate">
          &copy; {new Date().getFullYear()} AlecRae. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
