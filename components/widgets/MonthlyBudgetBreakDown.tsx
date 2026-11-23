
interface MonthlyBudgetBreakdownProps {
  needs: number;
  wants: number;
  savings: number;
}

const formatCurrency = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function MonthlyBudgetBreakdown({
  needs,
  wants,
  savings,
}: MonthlyBudgetBreakdownProps) {
  const total = needs + wants + savings;

  const categories = [
    { label: "Needs", amount: needs, color: "#75A9DF" },
    { label: "Wants", amount: wants, color: "#E7A942" },
    { label: "Savings", amount: savings, color: "#55C5A5" },
  ];

  return (
    <div className="rounded-2xl border border-slate-700/70 bg-[#181f2b] px-5 py-5">
      <h2 className="mb-4 text-base font-medium text-white">
        Where the month goes
      </h2>

      {/* Budget distribution bar */}
      <div
        className="flex h-[15px] w-full overflow-hidden rounded-full bg-slate-700"
        role="img"
        aria-label={categories
          .map(
            (item) =>
              `${item.label}: ${Math.round((item.amount / total) * 100)}%`
          )
          .join(", ")}
      >
        {categories.map((item) => (
          <div
            key={item.label}
            style={{
              width: `${total > 0 ? (item.amount / total) * 100 : 0}%`,
              backgroundColor: item.color,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
        {categories.map((item) => {
          const percentage =
            total > 0 ? Math.round((item.amount / total) * 100) : 0;

          return (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-sm text-slate-300">
                {item.label}{" "}
                <span className="font-medium text-slate-200">
                  {formatCurrency(item.amount)} ({percentage}%)
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
