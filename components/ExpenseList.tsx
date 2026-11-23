"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, type Expense } from "@/lib/types";
import { formatMoney } from "@/lib/format";

interface Props {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function ExpenseList({ expenses, onEdit, onDelete, onClearAll }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return expenses
      .filter((e) => category === "All" || e.category === category)
      .filter(
        (e) =>
          !q ||
          e.title.toLowerCase().includes(q) ||
          (e.note ?? "").toLowerCase().includes(q)
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses, query, category]);

  return (
    <section className="card">
      <h2>Expenses</h2>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search title or note…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search expenses"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          {expenses.length === 0
            ? "No expenses yet. Add your first one."
            : "No expenses match your filters."}
        </div>
      ) : (
        <ul className="list">
          {visible.map((e) => (
            <li key={e.id} className="item">
              <div className="main">
                <div className="title">{e.title}</div>
                <div className="meta">
                  <span className="badge">{e.category}</span>
                  {e.date}
                  {e.note ? ` · ${e.note}` : ""}
                </div>
              </div>
              <div className="amount">{formatMoney(e.amount)}</div>
              <div className="actions">
                <button className="small" onClick={() => onEdit(e)}>
                  Edit
                </button>
                <button
                  className="small danger"
                  onClick={() => {
                    if (window.confirm(`Delete "${e.title}"?`)) onDelete(e.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {expenses.length > 0 && (
        <div className="footer-actions">
          <button
            className="small danger"
            onClick={() => {
              if (window.confirm("Delete ALL expenses? This cannot be undone.")) {
                onClearAll();
              }
            }}
          >
            Clear all
          </button>
        </div>
      )}
    </section>
  );
}
