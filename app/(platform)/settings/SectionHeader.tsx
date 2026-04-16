interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-2 border-b border-navy-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-serif text-2xl text-navy-800 sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-navy-400">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex-shrink-0">{action}</div> : null}
    </div>
  );
}
