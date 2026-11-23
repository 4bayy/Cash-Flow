# Expense Tracker

A small Next.js (App Router + TypeScript) app with basic CRUD for expenses.
Data is stored in the browser's `localStorage`, so no backend or database is needed.

## Features

- **Create** – add an expense (title, amount, category, date, optional note) with validation
- **Read** – list sorted by date, with search and category filter, plus total / this-month / count summary
- **Update** – click *Edit*, change the form, save
- **Delete** – per-item delete and *Clear all*, both with confirmation

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        Root layout + metadata
  page.tsx          Page: wires the form, list and summary together
  globals.css       Styles (light/dark)
components/
  ExpenseForm.tsx   Add / edit form
  ExpenseList.tsx   List, search, filter, edit/delete buttons
  Summary.tsx       Totals
lib/
  types.ts          Expense type and categories
  useExpenses.ts    CRUD hook backed by localStorage
  format.ts         Currency formatting (INR, change as needed)
```

## Next steps

- Swap `useExpenses` for API calls (Route Handlers + a database such as SQLite/Postgres)
- Add charts per category, CSV export, or a budget limit
