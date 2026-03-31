interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  gradient?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  gradient = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2
        className={`text-display font-serif ${
          gradient ? "text-gradient" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl text-xl text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
