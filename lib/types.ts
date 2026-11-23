export const CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD
  note?: string;
}

export type ExpenseInput = Omit<Expense, "id">;



export type Frequency = 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type RCategory = 'needs' | 'wants' | 'savings';

export interface Bill {
  id: string;
  name: string;
  amount: number;
  category: Category;
  frequency: Frequency;
  /** next due date, local date as YYYY-MM-DD */
  nextDue: string;
  /** day of month of the first due date, so Jan 31 -> Feb 28 -> Mar 31 does not drift */
  anchorDay: number;
  autopay: boolean;
  lastPaid?: string;
  /** due date before the last "mark paid", used by undo */
  prevDue?: string;
  /** most recent payment dates, newest first (max 12) */
  history: string[];
}

//   Recurring 

export type BillInput = Pick<Bill, 'name' | 'amount' | 'category' | 'frequency' | 'nextDue' | 'autopay'>;

export const RCATEGORIES: RCategory[] = ['needs', 'wants', 'savings'];

export const CATEGORY_LABEL: Record<RCategory, string> = {
  needs: 'Needs',
  wants: 'Wants',
  savings: 'Savings',
};

export const FREQUENCIES: Frequency[] = ['weekly', 'monthly', 'quarterly', 'yearly'];

export const FREQ_LABEL: Record<Frequency, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
};

/** multiply a bill amount by this to get its monthly cost */
export const MONTHLY_FACTOR: Record<Frequency, number> = {
  weekly: 52 / 12,
  monthly: 1,
  quarterly: 1 / 3,
  yearly: 1 / 12,
};