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

      {/* Glowing divider */}
      <div className="glow-line mx-auto max-w-xs" />

      <ValueProposition />

      {/* Products */}
      <section className="py-32 sm:py-44">
        <Container>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
            The platform
          </p>
          <h2 className="mt-6 text-center text-display-xl font-serif text-text-primary">
            Four products.
            <br />
            <span className="text-gradient">One operating system.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-center text-xl text-text-secondary">
            Everything a professional needs. Nothing they don&rsquo;t.
          </p>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {Object.values(PRODUCTS).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-xs" />

      {/* Manifesto */}
      <section className="py-32 sm:py-44">
        <Container narrow>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            The philosophy
          </p>
          <h2 className="mt-6 text-display font-serif text-text-primary">
            Your profession back.
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-text-secondary">
            Lawyers and accountants became professionals to practise their
            craft&nbsp;&mdash; not to spend their days on admin, research
            grunt work, and chasing clients for information.
          </p>
          <p className="mt-6 text-xl leading-relaxed text-text-secondary">
            AlecRae handles the machine work. You handle the judgment work.
            That is the only division of labour that has ever made sense.
          </p>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
