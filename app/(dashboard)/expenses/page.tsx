"use client";

import { useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import Summary from "@/components/Summary";
import { useExpenses } from "@/lib/useExpenses";
import type { Expense, ExpenseInput } from "@/lib/types";

export default function HomePage() {
  const { expenses, loaded, addExpense, updateExpense, deleteExpense, clearAll } =
    useExpenses();
  const [editing, setEditing] = useState<Expense | null>(null);

  function handleSubmit(input: ExpenseInput) {
    if (editing) {
      updateExpense(editing.id, input);
      setEditing(null);
    } else {
      addExpense(input);
    }
  }

  function handleDelete(id: string) {
    deleteExpense(id);
    if (editing?.id === id) setEditing(null);
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>Expense Tracker</h1>
        <p>Add, edit and delete expenses. Data is saved in your browser.</p>
      </header>

      {!loaded ? (
        <p>Loading…</p>
      ) : (
        <>
          <Summary expenses={expenses} />
          <div className="grid">
            <ExpenseForm
              editing={editing}
              onSubmit={handleSubmit}
              onCancel={() => setEditing(null)}
            />
            <ExpenseList
              expenses={expenses}
              onEdit={setEditing}
              onDelete={handleDelete}
              onClearAll={() => {
                clearAll();
                setEditing(null);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
