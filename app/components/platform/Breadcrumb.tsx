"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-navy-300" aria-hidden="true">
                  &#8250;
                </span>
              )}
              {isLast || !item.href ? (
                <span className="font-medium text-navy-700">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-navy-400 transition-colors hover:text-navy-600"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
