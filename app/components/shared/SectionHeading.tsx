interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="text-display font-serif text-neutral-950">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl text-xl text-neutral-600 sm:text-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
