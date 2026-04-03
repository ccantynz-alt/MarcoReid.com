import Header from "@/app/components/marketing/Header";
import Footer from "@/app/components/marketing/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-navy-700"
      >
        Skip to content
      </a>
      <Header />
      <div className="bg-forest-600 text-center">
        <p className="px-4 py-2 text-xs font-medium text-white sm:text-sm">
          AlecRae is in active development. Launching 2026. What you see here is our vision &mdash; honest, transparent, and built in public.
        </p>
      </div>
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
