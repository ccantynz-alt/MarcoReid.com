import Link from "next/link";
import Card from "@/app/components/shared/Card";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  accentColor?: "navy" | "forest" | "plum";
}

const accentClasses = {
  navy: "text-navy-500",
  forest: "text-forest-500",
  plum: "text-plum-500",
};

export default function ProductCard({
  product,
  accentColor = "navy",
}: ProductCardProps) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-lg">
      <h3
        className={`font-serif text-2xl ${accentClasses[accentColor]} sm:text-3xl`}
      >
        {product.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-navy-300">
        {product.tagline}
      </p>
      <p className="mt-4 text-navy-400">{product.description}</p>
      <ul className="mt-6 flex-1 space-y-2">
        {product.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-navy-400">
            <span className={`mt-0.5 ${accentClasses[accentColor]}`}>
              {"\u2713"}
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={product.slug}
        className="mt-6 inline-flex min-h-touch items-center font-medium text-navy-500 transition-colors hover:text-navy-600"
      >
        Learn more {"\u2192"}
      </Link>
    </Card>
  );
}
