import { TIME_SAVINGS } from "@/lib/constants";

export default function TimeSavingsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-navy-100">
            <th className="pb-3 pr-4 font-semibold text-navy-500">Task</th>
            <th className="pb-3 pr-4 font-semibold text-navy-500">
              Without AlecRae
            </th>
            <th className="pb-3 pr-4 font-semibold text-navy-500">
              With AlecRae
            </th>
            <th className="pb-3 font-semibold text-forest-500">Time Saved</th>
          </tr>
        </thead>
        <tbody>
          {TIME_SAVINGS.map((row) => (
            <tr key={row.task} className="border-b border-navy-50">
              <td className="py-3 pr-4 text-navy-400">{row.task}</td>
              <td className="py-3 pr-4 text-navy-300">{row.without}</td>
              <td className="py-3 pr-4 font-medium text-forest-500">
                {row.with}
              </td>
              <td className="py-3 font-semibold text-forest-600">
                {row.saved}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
