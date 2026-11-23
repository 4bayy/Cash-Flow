
import type { Expense } from "@/lib/types";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const metrics = [
  {
    label: "TOTAL SPEND",
    amount: "42,850",
    decimal: "00",
    icon: "▣",
    footer: "↗ 4.2% vs last cycle",
    color: "text-indigo-600",
  },
  {
    label: "THIS MONTH",
    amount: "14,290",
    decimal: "00",
    icon: "▦",
    footer: "Nov 2023 • 6 entries",
    color: "text-indigo-600",
  },
  {
    label: "AVG / ENTRY",
    amount: "1,127",
    decimal: "60",
    icon: "⌁",
    footer: "Across 38 transactions",
    color: "text-slate-500",
  },
];

const chartData = [
  35, 40, 33, 55, 45, 65, 48, 70, 53, 60,
  47, 75, 52, 65, 44, 68, 75, 61, 82, 70,
];

function SpendingChart() {
  const width = 500;
  const height = 45;

  const points = chartData.map((value, index) => {
    const x = (index / (chartData.length - 1)) * width;
    const y = height - (value / 100) * height;

    return `${x},${y}`;
  });

  const linePoints = points.join(" ");
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-11 w-full overflow-visible"
    >
      <polygon
        points={areaPoints}
        fill="#5748f5"
        fillOpacity="0.09"
      />

      <polyline
        points={linePoints}
        fill="none"
        stroke="#5748f5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {[12, 14, 18].map((index) => {
        const x = (index / (chartData.length - 1)) * width;
        const y = height - (chartData[index] / 100) * height;

        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="2.8"
            fill="#5748f5"
          />
        );
      })}
    </svg>
  );
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  return (
    <section className="w-full space-y-4">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        {metrics.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-100 bg-white px-3 py-3 shadow-sm"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold tracking-[0.6px] text-slate-500">
                {item.label}
              </span>

              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-md bg-indigo-100 text-[11px] font-semibold text-indigo-600">
                {item.icon}
              </span>
            </div>

            {/* Amount */}
            <div className="mt-1 flex items-baseline whitespace-nowrap text-[25px] font-bold tracking-tight text-slate-900">
              <span className="mr-0.5">₹</span>
              {item.amount}
              <span className="text-[12px] font-normal text-slate-500">
                .{item.decimal}
              </span>
            </div>

            {/* Footer */}
            <p className={`mt-1 text-[9px] ${item.color}`}>
              {item.footer}
            </p>
          </div>
        ))}

      </div>

      {/* Spending Chart Card */}
      <div className="rounded-xl border border-slate-100 bg-white px-3 py-3 shadow-sm">

        <div className="flex items-center justify-between gap-2">
          <span className="whitespace-nowrap text-[9px] font-medium text-indigo-600">
            Daily Outflow Trend
          </span>
        </div>

      </div>

    </section>
  );
}
