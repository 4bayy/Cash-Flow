
import BillRow from "@/components/BillRow";
import ExpenseSummary from "@/components/Summary";
import MonthlyBudgetBreakdown from "@/components/widgets/MonthlyBudgetBreakDown";
import { Metadata } from "next";

type Category = "Needs" | "Wants";
type Status = "Paid" | "Pending";

interface Bill {
  id: number;
  name: string;
  amount: number;
  category: Category;
  dueDay: number;
  status: Status;
}

const initialBills: Bill[] = [
  { id: 1, name: "House Rent", amount: 8000, category: "Needs", dueDay: 1, status: "Paid" },
  { id: 2, name: "Internet", amount: 999, category: "Needs", dueDay: 5, status: "Paid" },
  { id: 3, name: "Mobile Recharge", amount: 499, category: "Needs", dueDay: 12, status: "Pending" },
  { id: 4, name: "Netflix", amount: 649, category: "Wants", dueDay: 18, status: "Pending" },
  { id: 5, name: "Electricity", amount: 8353, category: "Needs", dueDay: 25, status: "Pending" },
];


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


export const metadata: Metadata = {
  title: 'Recurring bills',
  description: 'Track recurring bills, mark them paid, and see what is due next.',
};

export default function RecurringBillsPage() {

  return (
    <section className="container">
      <header className="page-header">
        {/* <h1>Good Morning Abhay </h1> */}
        <p className="text-xl font-semibold tracking-tight text-slate-950"> Recurring Payments.</p>
        <p> Mark a bill paid and its next due date moves forward on its own.</p>
      </header>

      {/*  summary section  */}
      <div >

        <ExpenseSummary expenses={metrics} />
      </div>


      <div>
        <MonthlyBudgetBreakdown
          needs={23839}
          wants={2149}
          savings={5000}
        />
      </div>
    </section>
  );
}
