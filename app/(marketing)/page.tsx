import { PRODUCTS, BRAND } from "@/lib/constants";
import Hero from "@/app/components/marketing/Hero";
import ValueProposition from "@/app/components/marketing/ValueProposition";
import ProductCard from "@/app/components/marketing/ProductCard";
import CtaSection from "@/app/components/marketing/CtaSection";
import Container from "@/app/components/shared/Container";
import SectionHeading from "@/app/components/shared/SectionHeading";
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

      {/* Products section */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="Every tool your firm needs"
            subtitle="Four products, one platform, one login"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <ProductCard product={PRODUCTS.law} accentColor="navy" />
            <ProductCard product={PRODUCTS.accounting} accentColor="forest" />
            <ProductCard product={PRODUCTS.oracle} accentColor="plum" />
            <ProductCard product={PRODUCTS.voice} accentColor="navy" />
          </div>
        </Container>
      </section>

      {/* Emotional hook section */}
      <section className="bg-navy-500 py-20 sm:py-28">
        <Container className="text-center">
          <h2 className="mx-auto max-w-3xl font-serif text-3xl text-white sm:text-4xl lg:text-5xl">
            Your profession back
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-200">
            Lawyers and accountants became professionals to practise their craft
            {"\u00A0"}{"\u2014"} not to spend their days on admin, research grunt work, and
            chasing clients for information. AlecRae gives them their profession
            back. The platform handles the machine work. The professional handles
            the judgment work.
          </p>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
