import { useState } from 'react';
import { api } from '../services/api';
import { Dialog, today } from './Common';

export function EntryForm({ kind, entry, categories, month, close, saved }) {
  const isBudget = kind === 'budget';
  const isCategory = kind === 'category';
  const [form, setForm] = useState(
    isCategory
      ? { category_name: '', category_type: 'Expense' }
      : isBudget
        ? {
            category_id: entry?.category_id || '',
            monthly_limit: entry?.monthly_limit || '',
            budget_month: entry?.budget_month?.slice(0, 7) || month,
          }
        : {
            transaction_type: entry?.transaction_type || 'Expense',
            category_id: entry?.category_id || '',
            amount: entry?.amount || '',
            description: entry?.description || '',
            merchant_city: entry?.merchant_city || '',
            transaction_date:
              entry?.transaction_date?.slice(0, 10) ||
              (month === today().slice(0, 7) ? today() : `${month}-01`),
          },
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const change = (event) => {
    const { name, value } = event.target;
    setForm((old) => ({
      ...old,
      [name]: value,
      ...(name === 'transaction_type' ? { category_id: '' } : {}),
    }));
  };
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const path = isCategory ? '/categories' : isBudget ? '/budgets' : '/transactions';
    const id = isBudget ? entry?.budget_id : entry?.transaction_id;
    try {
      await api(`${path}${id ? `/${id}` : ''}`, { method: id ? 'PUT' : 'POST', body: form });
      saved(
        `${isCategory ? 'Category' : isBudget ? 'Budget' : 'Transaction'} ${id ? 'updated' : 'added'}.`,
      );
    } catch (error) {
      setError(error.message);
      setBusy(false);
    }
  };
  const selectedType = isBudget ? 'Expense' : form.transaction_type;
  return (
    <Dialog
      title={`${entry ? 'Edit' : 'Add'} ${kind}`}
      close={() => {
        if (!busy) close();
      }}
    >
      <form onSubmit={submit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {!isBudget && (
          <div className="type-switch" role="group" aria-label="Transaction type">
            {['Expense', 'Income'].map((type) => (
              <button
                type="button"
                key={type}
                className={
                  (isCategory ? form.category_type : form.transaction_type) === type
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setForm((old) => ({
                    ...old,
                    [isCategory ? 'category_type' : 'transaction_type']: type,
                    category_id: '',
                  }))
                }
              >
                {type}
              </button>
            ))}
          </div>
        )}
        {isCategory ? (
          <label className="field-label">
            Category name
            <input
              autoFocus
              required
              maxLength={50}
              className="form-control"
              name="category_name"
              value={form.category_name}
              onChange={change}
              placeholder="e.g. Subscriptions"
            />
          </label>
        ) : (
          <>
            <label className="field-label">
              {isBudget ? 'Monthly limit' : 'Amount'} (₹)
              <input
                autoFocus
                className="form-control amount-input"
                type="number"
                min="0.01"
                max="99999999.99"
                step="0.01"
                required
                name={isBudget ? 'monthly_limit' : 'amount'}
                value={isBudget ? form.monthly_limit : form.amount}
                onChange={change}
                placeholder="0.00"
              />
            </label>
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="field-label">
                  Category
                  <select
                    required
                    className="form-select"
                    name="category_id"
                    value={form.category_id}
                    onChange={change}
                  >
                    <option value="">Select category</option>
                    {categories
                      .filter((c) => c.category_type === selectedType)
                      .map((c) => (
                        <option key={c.category_id} value={c.category_id}>
                          {c.category_name}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
              <div className="col-sm-6">
                <label className="field-label">
                  {isBudget ? 'Budget month' : 'Date'}
                  <input
                    required
                    className="form-control"
                    type={isBudget ? 'month' : 'date'}
                    min={isBudget ? '1900-01' : '1900-01-01'}
                    max={isBudget ? '2100-12' : '2100-12-31'}
                    name={isBudget ? 'budget_month' : 'transaction_date'}
                    value={isBudget ? form.budget_month : form.transaction_date}
                    onChange={change}
                  />
                </label>
              </div>
            </div>
            {!isBudget && (
              <>
                <label className="field-label">
                  Description <span className="optional">optional</span>
                  <input
                    className="form-control"
                    maxLength={500}
                    name="description"
                    value={form.description}
                    onChange={change}
                    placeholder="What was it for?"
                  />
                </label>
                <label className="field-label">
                  City <span className="optional">optional</span>
                  <input
                    className="form-control"
                    maxLength={100}
                    name="merchant_city"
                    value={form.merchant_city}
                    onChange={change}
                    placeholder="e.g. Delhi"
                  />
                </label>
              </>
            )}
          </>
        )}
        <div className="dialog-footer">
          <button type="button" className="btn btn-light" disabled={busy} onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={busy}>
            {busy ? 'Saving…' : entry ? 'Save changes' : `Add ${kind}`}
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export function DeleteDialog({ target, close, saved }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const remove = async () => {
    setBusy(true);
    try {
      await api(
        `/${target.kind === 'budget' ? 'budgets' : 'transactions'}/${target.entry.budget_id || target.entry.transaction_id}`,
        { method: 'DELETE' },
      );
      saved(`${target.kind === 'budget' ? 'Budget' : 'Transaction'} deleted.`);
    } catch (error) {
      setError(error.message);
      setBusy(false);
    }
  };
  return (
    <Dialog
      title={`Delete ${target.kind}?`}
      close={() => {
        if (!busy) close();
      }}
    >
      <p>
        This will permanently remove this {target.kind}.{' '}
        {target.kind === 'budget' && 'Your transactions will stay as they are.'}
      </p>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="dialog-footer">
        <button className="btn btn-light" disabled={busy} onClick={close}>
          Cancel
        </button>
        <button className="btn btn-danger" disabled={busy} onClick={remove}>
          {busy ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </Dialog>
  );
}
