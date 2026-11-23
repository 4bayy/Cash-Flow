"use client";

import Link from "next/link";
import Summary from "@/components/Summary";
import { useExpenses } from "@/lib/useExpenses";
import { useState } from "react";
import ExpenseToolbar from "@/components/ui/ExpenseToolbar";
import ExpenseDataTable from "@/components/ui/ExpenseDataTable";

export default function DashboardPage() {
  const { expenses, loaded } = useExpenses();
  const recent = [...expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const [search, setSearch] = useState("");


  return (
    <div className="container">
      <header className="page-header">
        {/* <h1>Good Morning Abhay </h1> */}
        <p> Take A quick look at your spending.</p>
      </header>

      <div className="mb-4">
        <ExpenseToolbar
          recordCount={38}
          onSearch={(value) => console.log("Search:", value)}
          onCategoryChange={(value) => console.log("Category:", value)}
          onExport={() => console.log("Export expenses")}
          onAddExpense={() => console.log("Open expense form")}
        />
      </div>

      {!loaded ? (
        <p>Loading…</p>
      ) : (
        <>
          <Summary expenses={expenses} />
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-semibold tracking-tight text-slate-900">
                Recent Transactions
              </h2>

              <span className="text-xs font-medium text-slate-500">
                Latest activity
              </span>
            </div>

            <div className="p-2 sm:p-3">
              <ExpenseDataTable />
            </div>
          </div>
          {/* <section className="card">
            <h2>Recent</h2>
            {recent.length === 0 ? (
              <div className="empty">
                No expenses yet. <Link href="/expenses">Add your first one</Link>.
              </div>
            ) : (
              <ul className="list">
                {recent.map((e) => (
                  <li key={e.id} className="item">
                    <div className="main">
                      <div className="title">{e.title}</div>
                      <div className="meta">
                        <span className="badge">{e.category}</span>
                        {e.date}
                      </div>
                    </div>
                    <div className="amount">{formatMoney(e.amount)}</div>
                  </li>
                ))}
              </ul>
            )}
          </section> */}
        </>
      )}
    </div>
  );
}
