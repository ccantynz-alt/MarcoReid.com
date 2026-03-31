import { TIME_SAVINGS } from "@/lib/constants";

export default function TimeSavingsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-300">
            <th className="pb-4 pr-6 text-xs font-medium uppercase tracking-widest text-neutral-500">
              Task
            </th>
            <th className="pb-4 pr-6 text-xs font-medium uppercase tracking-widest text-neutral-500">
              Before
            </th>
            <th className="pb-4 pr-6 text-xs font-medium uppercase tracking-widest text-neutral-500">
              With AlecRae
            </th>
            <th className="pb-4 text-xs font-medium uppercase tracking-widest text-neutral-500">
              Saved
            </th>
          </tr>
        </thead>
        <tbody>
          {TIME_SAVINGS.map((row) => (
            <tr key={row.task} className="border-b border-neutral-200">
              <td className="py-4 pr-6 text-neutral-700">{row.task}</td>
              <td className="py-4 pr-6 text-neutral-500">{row.without}</td>
              <td className="py-4 pr-6 font-medium text-neutral-950">
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
