import { useEffect, useId, useRef } from 'react';
import { ArrowDownLeft, ArrowUpRight, Inbox, X, Pencil, Trash2 } from 'lucide-react';

export const money = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
export const dateLabel = (value) =>
  new Date(`${String(value).slice(0, 10)}T12:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
export const monthLabel = (value) =>
  new Date(`${value}-01T12:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
export function Empty({
  title = 'A fresh start',
  text = 'Add your first transaction to start seeing the bigger picture.',
  action,
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Inbox size={25} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
export function Status({ resource, children }) {
  if (resource.loading)
    return (
      <div className="loading-state" role="status">
        <span className="spinner-border spinner-border-sm" /> Getting your numbers together…
      </div>
    );
  if (resource.error)
    return (
      <div className="alert alert-danger" role="alert">
        {resource.error}
      </div>
    );
  return children(resource.data);
}
export function Dialog({ title, close, children }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="app-dialog"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="dialog-content">
        <div className="dialog-heading">
          <div>
            <span className="eyebrow">YOUR MONEY, ORGANIZED</span>
            <h2 id={titleId}>{title}</h2>
          </div>
          <button type="button" className="icon-button" aria-label="Close dialog" onClick={close}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
export function Actions({ edit, remove, name }) {
  return (
    <div className="row-actions">
      <button className="icon-button" aria-label={`Edit ${name}`} onClick={edit}>
        <Pencil size={15} />
      </button>
      <button className="icon-button delete-button" aria-label={`Delete ${name}`} onClick={remove}>
        <Trash2 size={15} />
      </button>
    </div>
  );
}
export function TransactionTable({ rows, edit, remove }) {
  return (
    <div className="table-responsive">
      <table className="table transaction-table align-middle">
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Category</th>
            <th>Date</th>
            <th>City</th>
            <th className="text-end">Amount</th>
            {edit && (
              <th>
                <span className="visually-hidden">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.transaction_id}>
              <td>
                <div className="transaction-name">
                  <span
                    className={`transaction-icon ${row.transaction_type === 'Income' ? 'income' : ''}`}
                  >
                    {row.transaction_type === 'Income' ? (
                      <ArrowDownLeft size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </span>
                  <div>
                    <strong>{row.description || row.category_name}</strong>
                    <small>{row.transaction_type}</small>
                  </div>
                </div>
              </td>
              <td>
                <span className="category-tag">{row.category_name}</span>
              </td>
              <td className="muted-cell">{dateLabel(row.transaction_date)}</td>
              <td className="muted-cell">{row.merchant_city || '—'}</td>
              <td
                className={`text-end amount ${row.transaction_type === 'Income' ? 'positive' : ''}`}
              >
                {row.transaction_type === 'Income' ? '+' : '−'}
                {money(row.amount)}
              </td>
              {edit && (
                <td>
                  <Actions
                    name={row.description || row.category_name}
                    edit={() => edit(row)}
                    remove={() => remove(row)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
