import Link from "next/link";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={product.slug}
      className="group card-glow flex flex-col transition-all duration-500 hover:border-surface-border-light"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-accent">
        {product.name}
      </p>
      <h3 className="mt-4 font-serif text-headline text-text-primary">
        {product.tagline}
      </h3>
      <p className="mt-4 flex-1 leading-relaxed text-text-secondary">
        {product.description}
      </p>
      <div className="glow-line-subtle mt-6" />
      <p className="mt-6 text-sm font-medium text-text-secondary transition-colors group-hover:text-accent">
        Learn more &rarr;
      </p>
    </Link>
  );
}
