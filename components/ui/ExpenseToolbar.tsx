
"use client";

import { useState } from "react";
import DropDown from "./DropDown";
import { categories } from "@/data/categories";
import ExpenseUploadModal from "../ExpenseUploadModel";

interface ExpenseToolbarProps {
  recordCount?: number;
  onSearch?: (value: string) => void;
  onCategoryChange?: (category: string) => void;
  onExport?: () => void;
  onAddExpense?: () => void;
}

export default function ExpenseToolbar({
  recordCount = 38,
  onSearch,
  onCategoryChange,
  onExport,
  onAddExpense,
}: ExpenseToolbarProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [dateRange, setDateRange] = useState("Oct – Nov 2023");

  //  Expense toolbar 
  const [open, setOpen] = useState(false)

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    onCategoryChange?.(value);
  };

  const handleupload =()=>{
     console.log( " Handle  file uplaod started ....")
  }

  return (
    <section className="w-full space-y-4 font-[Inter,sans-serif]">
      {/* Heading and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Expense History
          </h2>
          <span className="text-sm text-slate-600">
            {recordCount} records logged
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExport}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-indigo-50 px-4 text-sm font-medium text-slate-800 transition hover:bg-indigo-100"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v12m-4-4 4 4 4-4" />
              <path d="M5 17v3h14v-3" />
            </svg>
            Export
          </button>


          {/*  log btn */}
          <button
            type="button"
            onClick={() =>setOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Log
          </button>
         
        </div>
         <ExpenseUploadModal
            open={open}
            onClose={() => setOpen(false)}
            onUpload={handleupload}
          />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_170px_165px]">
        {/* Search */}
        <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
          <svg
            className="h-[18px] w-[18px] shrink-0 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Filter by merchant, tag, or note..."
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />

          <kbd className="rounded bg-indigo-50 px-1.5 py-0.5 text-xs text-indigo-500">
            /
          </kbd>
        </div>

        {/* Category */}
        <div className="relative">
          <DropDown
            value={category}
            setValue={setCategory}
            options={categories}
          >
          </DropDown>

          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 10 5 5 5-5" />
          </svg>
        </div>

        {/* Date Range */}
        <div className="relative">
          <input
            type="text"
            aria-label="Date range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-400"
          />

          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" />
          </svg>
        </div>
      </div>
    </section>
  );
}
