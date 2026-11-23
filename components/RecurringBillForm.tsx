'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Bill, BillInput, Category, Frequency } from '@/lib/types';
import { CATEGORIES, CATEGORY_LABEL, FREQUENCIES, FREQ_LABEL } from '@/lib/types';
import { todayISO } from '@/lib/dates';

interface Props {
  initial?: Bill;
  onSave: (input: BillInput) => void;
  onClose: () => void;
}

export default function BillForm({ initial, onSave, onClose }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [amount, setAmount] = useState(initial ? String(initial.amount) : '');
  const [category, setCategory] = useState<Category>(initial?.category ?? 'needs');
  const [frequency, setFrequency] = useState<Frequency>(initial?.frequency ?? 'monthly');
  const [nextDue, setNextDue] = useState(initial?.nextDue ?? todayISO());
  const [autopay, setAutopay] = useState(initial?.autopay ?? false);
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!name.trim()) return setError('Give the bill a name.');
    if (!(amt > 0)) return setError('Enter an amount greater than zero.');
    if (!nextDue) return setError('Pick the next due date.');
    onSave({ name: name.trim(), amount: amt, category, frequency, nextDue, autopay });
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2>{initial ? 'Edit bill' : 'Add recurring bill'}</h2>

        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Electricity, Netflix, Rent" autoFocus />
        </label>

        <div className="grid2">
          <label>
            Amount
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              inputMode="decimal"
              placeholder="0"
            />
          </label>
          <label>
            Next due date
            <input type="date" value={nextDue} onChange={(e) => setNextDue(e.target.value)} />
          </label>
        </div>

        <div className="grid2">
          <label>
            Repeats
            <select value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)}>
              {FREQUENCIES.map((f) => (
                <option key={f} value={f}>{FREQ_LABEL[f]}</option>
              ))}
            </select>
          </label>
          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="check">
          <input type="checkbox" checked={autopay} onChange={(e) => setAutopay(e.target.checked)} />
          Paid automatically (autopay)
        </label>

        {error && <p className="error">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">{initial ? 'Save changes' : 'Add bill'}</button>
        </div>
      </form>
    </div>
  );
}