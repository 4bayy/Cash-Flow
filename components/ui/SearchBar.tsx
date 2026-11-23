
"use client";

import { useState } from "react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search transactions, categories, merchants...",
  className = "",
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");

  const searchValue = value ?? internalValue;

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div
      className={`flex h-11 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-3.5 transition-all focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:focus-within:border-gray-600 dark:focus-within:ring-gray-800 ${className}`}
    >
      <svg
        className="h-[18px] w-[18px] shrink-0 text-gray-400"
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
        type="text"
        value={searchValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
      />

      {searchValue ? (
        <button
          type="button"
          onClick={() => handleChange("")}
          aria-label="Clear search"
          className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="m18 6-12 12M6 6l12 12" />
          </svg>
        </button>
      ) : (
        <kbd className="hidden rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[11px] text-gray-400 sm:inline-block dark:border-gray-700 dark:bg-gray-800">
          /
        </kbd>
      )}
    </div>
  );
}
