"use client";

import { useCallback, useEffect, useState } from "react";
import type { Expense, ExpenseInput } from "./types";

const STORAGE_KEY = "expense-tracker:v1";

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * CRUD hook backed by localStorage.
 * `loaded` is false until the first client-side read, which avoids
 * a hydration mismatch between server and client renders.
 */
export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Read
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setExpenses(JSON.parse(raw) as Expense[]);
    } catch {
      // ignore corrupt or unavailable storage
    }
    setLoaded(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch {
      // ignore quota / private-mode errors
    }
  }, [expenses, loaded]);

  // Create
  const addExpense = useCallback((input: ExpenseInput) => {
    setExpenses((prev) => [{ ...input, id: newId() }, ...prev]);
  }, []);

  // Update
  const updateExpense = useCallback((id: string, input: ExpenseInput) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...input, id } : e))
    );
  }, []);

  // Delete
  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearAll = useCallback(() => setExpenses([]), []);

  return {
    expenses,
    loaded,
    addExpense,
    updateExpense,
    deleteExpense,
    clearAll,
  };
}
