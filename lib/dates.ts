import type { Bill, Frequency } from './types';
import { MONTHLY_FACTOR } from './types';

const pad = (n: number) => String(n).padStart(2, '0');

export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const fromISO = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const todayISO = () => toISO(new Date());

export function daysUntil(iso: string): number {
  const ms = fromISO(iso).getTime() - fromISO(todayISO()).getTime();
  return Math.round(ms / 86_400_000);
}

function addMonthsAnchored(iso: string, months: number, anchorDay: number): string {
  const d = fromISO(iso);
  const first = new Date(d.getFullYear(), d.getMonth() + months, 1);
  const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  first.setDate(Math.min(anchorDay, lastDay));
  return toISO(first);
}

export function advanceDue(iso: string, frequency: Frequency, anchorDay: number): string {
  switch (frequency) {
    case 'weekly': {
      const d = fromISO(iso);
      d.setDate(d.getDate() + 7);
      return toISO(d);
    }
    case 'monthly':
      return addMonthsAnchored(iso, 1, anchorDay);
    case 'quarterly':
      return addMonthsAnchored(iso, 3, anchorDay);
    case 'yearly':
      return addMonthsAnchored(iso, 12, anchorDay);
  }
}

export type Status = 'overdue' | 'today' | 'soon' | 'upcoming';

export function statusOf(iso: string): Status {
  const d = daysUntil(iso);
  if (d < 0) return 'overdue';
  if (d === 0) return 'today';
  if (d <= 7) return 'soon';
  return 'upcoming';
}

export function dueLabel(iso: string): string {
  const d = daysUntil(iso);
  if (d < 0) return `Overdue by ${-d} day${d === -1 ? '' : 's'}`;
  if (d === 0) return 'Due today';
  if (d === 1) return 'Due tomorrow';
  return `Due in ${d} days`;
}

export const formatDate = (iso: string) =>
  fromISO(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const monthlyEquivalent = (b: Bill) => b.amount * MONTHLY_FACTOR[b.frequency];