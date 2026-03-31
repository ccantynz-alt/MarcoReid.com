import Link from "next/link";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={product.slug}
      className="group block rounded-3xl bg-neutral-200 p-8 transition-colors hover:bg-neutral-300 sm:p-10"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
        {product.name}
      </p>
      <h3 className="mt-3 font-serif text-headline text-neutral-950">
        {product.tagline}
      </h3>
      <p className="mt-4 leading-relaxed text-neutral-600">
        {product.description}
      </p>
      <p className="mt-6 text-sm font-medium text-neutral-950 transition-colors group-hover:text-accent">
        Learn more &rarr;
      </p>
    </Link>
  );
}
