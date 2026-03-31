import { PRODUCTS, BRAND } from "@/lib/constants";
import Hero from "@/app/components/marketing/Hero";
import ValueProposition from "@/app/components/marketing/ValueProposition";
import ProductCard from "@/app/components/marketing/ProductCard";
import CtaSection from "@/app/components/marketing/CtaSection";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: BRAND.url,
  description: BRAND.description,
  slogan: BRAND.tagline,
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: BRAND.description,
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={softwareSchema} />

      <Hero />

      <ValueProposition />

      {/* Products */}
      <section className="bg-neutral-100 py-24 sm:py-36">
        <Container>
          <div className="text-center">
            <h2 className="text-display font-serif text-neutral-950">
              Four products. One platform.
            </h2>
            <p className="mt-6 text-xl text-neutral-600">
              Everything a professional needs, nothing they don&rsquo;t.
            </p>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <ProductCard product={PRODUCTS.law} />
            <ProductCard product={PRODUCTS.accounting} />
            <ProductCard product={PRODUCTS.oracle} />
            <ProductCard product={PRODUCTS.voice} />
          </div>
        </Container>
      </section>

      {/* Manifesto */}
      <section className="py-24 sm:py-36">
        <Container narrow>
          <h2 className="text-display font-serif text-neutral-950">
            Your profession back.
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-neutral-600">
            Lawyers and accountants became professionals to practise their craft
            {"\u00A0"}&mdash; not to spend their days on admin, research grunt
            work, and chasing clients for information.
          </p>
          <p className="mt-6 text-xl leading-relaxed text-neutral-600">
            AlecRae handles the machine work. You handle the judgment work.
            That is the only division that makes sense.
          </p>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
