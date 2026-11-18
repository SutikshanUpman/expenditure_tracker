import { beforeEach, afterEach, expect, test, vi } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { today } from '../components/Common';

let transactions, budgets, categories, writes;
beforeEach(() => {
  transactions = [];
  budgets = [];
  writes = [];
  categories = [
    { category_id: 6, category_name: 'Food', category_type: 'Expense' },
    { category_id: 1, category_name: 'Salary', category_type: 'Income' },
  ];
  vi.stubGlobal(
    'fetch',
    vi.fn(async (path, options = {}) => {
      const url = new URL(path, 'http://localhost');
      const route = url.pathname.replace('/api', '');
      const method = options.method || 'GET';
      let data;
      if (method !== 'GET') {
        const body = options.body ? JSON.parse(options.body) : null;
        writes.push({ route, method, body });
        if (route.startsWith('/transactions')) {
          if (method === 'DELETE')
            transactions = transactions.filter((row) => !route.endsWith(`/${row.transaction_id}`));
          else {
            const row = {
              ...body,
              transaction_id: 1,
              category_name: categories.find((c) => c.category_id === Number(body.category_id))
                ?.category_name,
            };
            transactions = [row];
            data = row;
          }
        } else if (route === '/categories') {
          data = { ...body, category_id: 20 };
          categories.push(data);
        }
        return { ok: true, status: method === 'DELETE' ? 204 : 200, json: async () => data };
      }
      if (route === '/categories') data = categories;
      else if (route === '/user') data = { name: 'Sutikshan' };
      else if (route === '/transactions') {
        const rows = transactions.filter(
          (row) =>
            !url.searchParams.get('search') ||
            row.description.includes(url.searchParams.get('search')),
        );
        data = { data: rows, pagination: { page: 1, limit: 10, total: rows.length } };
      } else if (route === '/budgets') data = budgets;
      else if (route === '/analytics/summary')
        data = {
          income: 0,
          expenses: 0,
          balance: 0,
          transaction_count: 0,
          budget: 0,
          budget_utilization: 0,
        };
      else if (route === '/analytics/monthly')
        data = [{ month: today().slice(0, 7), income: 0, expenses: 0 }];
      else data = [];
      return { ok: true, status: 200, json: async () => structuredClone(data) };
    }),
  );
});
afterEach(() => vi.unstubAllGlobals());

async function ready() {
  render(<App />);
  await waitFor(() =>
    expect(
      screen.getAllByRole('button', { name: 'Add transaction', exact: true })[0].disabled,
    ).toBe(false),
  );
  return userEvent.setup();
}

test('create a transaction and see it in transaction history', async () => {
  const user = await ready();
  await user.click(screen.getAllByRole('button', { name: 'Add transaction', exact: true })[0]);
  const form = within(screen.getByRole('dialog'));
  await user.type(form.getByRole('spinbutton'), '250.50');
  await user.selectOptions(form.getByLabelText('Category'), '6');
  await user.type(form.getByLabelText(/Description/), 'Lunch with friends');
  await user.type(form.getByLabelText(/City/), 'Delhi');
  await user.click(form.getByRole('button', { name: 'Add transaction', exact: true }));
  await screen.findByText('Transaction added.');
  expect(writes[0].body).toMatchObject({
    amount: '250.5',
    transaction_type: 'Expense',
    category_id: '6',
    merchant_city: 'Delhi',
  });
  await user.click(screen.getByRole('button', { name: 'Transactions', exact: true }));
  await screen.findByText('Lunch with friends');
  await user.type(screen.getByRole('textbox', { name: 'Search transactions' }), 'missing');
  await screen.findByText('No matching transactions');
});

test('edit and delete a transaction through confirmation dialogs', async () => {
  transactions = [
    {
      transaction_id: 1,
      category_id: 6,
      category_name: 'Food',
      transaction_type: 'Expense',
      amount: '50',
      transaction_date: today(),
      description: 'Lunch',
      merchant_city: 'Delhi',
    },
  ];
  const user = await ready();
  await user.click(screen.getByRole('button', { name: 'Transactions', exact: true }));
  await user.click(await screen.findByRole('button', { name: 'Edit Lunch' }));
  const form = within(screen.getByRole('dialog'));
  await user.clear(form.getByRole('spinbutton'));
  await user.type(form.getByRole('spinbutton'), '75');
  await user.click(form.getByRole('button', { name: 'Save changes' }));
  await screen.findByText('Transaction updated.');
  expect(writes[0]).toMatchObject({
    route: '/transactions/1',
    method: 'PUT',
    body: { amount: '75' },
  });
  await user.click(await screen.findByRole('button', { name: 'Delete Lunch' }));
  await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }));
  expect(writes).toHaveLength(1);
  await user.click(screen.getByRole('button', { name: 'Delete Lunch' }));
  await user.click(
    within(screen.getByRole('dialog')).getByRole('button', { name: 'Delete', exact: true }),
  );
  await screen.findByText('Transaction deleted.');
  await screen.findByText('No matching transactions');
  expect(writes[1].method).toBe('DELETE');
});

test('budget warnings show overspending and editing retains month and category', async () => {
  budgets = [
    {
      budget_id: 1,
      category_id: 6,
      category_name: 'Food',
      budget_month: `${today().slice(0, 7)}-01`,
      monthly_limit: '100',
      spent: '150',
      remaining: -50,
      utilization: 150,
    },
  ];
  const user = await ready();
  await user.click(screen.getByRole('button', { name: 'Budgets', exact: true }));
  await screen.findByText('Over budget');
  expect(screen.getByText('₹50.00 over budget')).toBeTruthy();
  await user.click(screen.getByRole('button', { name: 'Edit Food' }));
  const form = within(screen.getByRole('dialog'));
  expect(form.getByLabelText('Category').value).toBe('6');
  expect(form.getByRole('spinbutton').value).toBe('100');
  await user.click(form.getByRole('button', { name: 'Cancel' }));
  expect(screen.queryByRole('dialog')).toBeNull();
});

test('new income categories appear and transaction type changes reset category', async () => {
  const user = await ready();
  await user.click(screen.getByRole('button', { name: 'Categories', exact: true }));
  await user.click(screen.getAllByRole('button', { name: 'Add category', exact: true })[0]);
  let form = within(screen.getByRole('dialog'));
  await user.click(form.getByRole('button', { name: 'Income', exact: true }));
  await user.type(form.getByLabelText('Category name'), 'Gifts');
  await user.click(form.getByRole('button', { name: 'Add category', exact: true }));
  await screen.findByText('Category added.');
  await screen.findByText('Gifts');
  await user.click(screen.getByRole('button', { name: 'Transactions', exact: true }));
  await user.click(screen.getAllByRole('button', { name: 'Add transaction', exact: true })[0]);
  form = within(screen.getByRole('dialog'));
  await user.selectOptions(form.getByLabelText('Category'), '6');
  await user.click(form.getByRole('button', { name: 'Income', exact: true }));
  expect(form.getByLabelText('Category').value).toBe('');
  expect(form.getByRole('option', { name: 'Gifts' })).toBeTruthy();
  expect(form.queryByRole('option', { name: 'Food' })).toBeNull();
});

test('connection errors offer retry and do not enable transaction entry', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => {
      throw new Error('Connection unavailable');
    }),
  );
  render(<App />);
  await screen.findByText('Couldn’t connect to your workspace.');
  expect(screen.getAllByRole('button', { name: 'Add transaction', exact: true })[0].disabled).toBe(
    true,
  );
  expect(screen.getByRole('button', { name: 'Try again' })).toBeTruthy();
});
