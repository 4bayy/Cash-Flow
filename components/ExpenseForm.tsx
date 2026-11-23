"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, type Category, type Expense, type ExpenseInput } from "@/lib/types";

interface Props {
  editing: Expense | null;
  onSubmit: (input: ExpenseInput) => void;
  onCancel: () => void;
}

function today(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function ExpenseForm({ editing, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [date, setDate] = useState(today());
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ title?: string; amount?: string; date?: string }>({});

  // Fill the form when an expense is picked for editing, reset otherwise
  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setAmount(String(editing.amount));
      setCategory(editing.category);
      setDate(editing.date);
      setNote(editing.note ?? "");
    } else {
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate(today());
      setNote("");
    }
    setErrors({});
  }, [editing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    const parsed = Number(amount);

    if (!title.trim()) next.title = "Title is required.";
    if (!amount || Number.isNaN(parsed) || parsed <= 0) {
      next.amount = "Enter an amount greater than 0.";
    }
    if (!date) next.date = "Pick a date.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSubmit({
      title: title.trim(),
      amount: Math.round(parsed * 100) / 100,
      category,
      date,
      note: note.trim() || undefined,
    });

    if (!editing) {
      setTitle("");
      setAmount("");
      setNote("");
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>{editing ? "Edit expense" : "Add expense"}</h2>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Groceries"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>

        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="note">Note (optional)</label>
        <textarea
          id="note"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="row">
        <button type="submit" className="primary">
          {editing ? "Save changes" : "Add expense"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
