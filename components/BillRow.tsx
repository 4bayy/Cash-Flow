import type { Bill } from '@/lib/types';
import { CATEGORY_LABEL, FREQ_LABEL } from '@/lib/types';
import { dueLabel, formatDate, statusOf, todayISO } from '@/lib/dates';
import { formatMoney } from '@/lib/format';

interface Props {
  bill: Bill;
  onPaid: () => void;
  onUndo: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BillRow({ bill, onPaid, onUndo, onEdit, onDelete }: Props) {
  const status = statusOf(bill.nextDue);
  const paidToday = bill.lastPaid === todayISO() && !!bill.prevDue;

  return (
    <li className="row">
      <span className="dot" style={{ background: `var(--${bill.category})` }} aria-hidden />

      <div className="row-main">
        <p className="row-name">{bill.name}</p>
        <p className="row-meta">
          {FREQ_LABEL[bill.frequency]} · {CATEGORY_LABEL[bill.category]}
          {bill.autopay && ' · Autopay'}
        </p>
      </div>

      <div className="row-due">
        <span className={`pill pill-${status}`}>{dueLabel(bill.nextDue)}</span>
        <span className="row-date">{formatDate(bill.nextDue)}</span>
      </div>

      <p className="row-amount">{formatMoney(bill.amount)}</p>

      <div className="row-actions">
        {paidToday ? (
          <button className="btn ghost" onClick={onUndo}>Paid · Undo</button>
        ) : (
          <button className="btn primary small" onClick={onPaid}>Mark paid</button>
        )}
        <button className="btn link" onClick={onEdit}>Edit</button>
        <button className="btn link danger" onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
}