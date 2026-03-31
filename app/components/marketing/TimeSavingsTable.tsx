import { TIME_SAVINGS } from "@/lib/constants";

export default function TimeSavingsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-surface-border">
            <th className="pb-4 pr-6 text-xs font-medium uppercase tracking-widest text-text-tertiary">
              Task
            </th>
            <th className="pb-4 pr-6 text-xs font-medium uppercase tracking-widest text-text-tertiary">
              Before
            </th>
            <th className="pb-4 pr-6 text-xs font-medium uppercase tracking-widest text-text-tertiary">
              With AlecRae
            </th>
            <th className="pb-4 text-xs font-medium uppercase tracking-widest text-accent">
              Saved
            </th>
          </tr>
        </thead>
        <tbody>
          {TIME_SAVINGS.map((row) => (
            <tr key={row.task} className="border-b border-surface-border/50">
              <td className="py-4 pr-6 text-text-secondary">{row.task}</td>
              <td className="py-4 pr-6 text-text-tertiary">{row.without}</td>
              <td className="py-4 pr-6 font-medium text-text-primary">
                {row.with}
              </td>
              <td className="py-4 font-semibold text-accent">{row.saved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
