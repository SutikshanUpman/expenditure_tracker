import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Target,
  ChevronRight,
  Plus,
  Sparkles,
} from 'lucide-react';
import { useResource } from '../hooks/useResource';
import { Status, money, Empty, TransactionTable, monthLabel } from '../components/Common';
import { TrendChart, SpendingChart, BudgetChart } from '../components/Charts';

export function BudgetProgress({ row }) {
  const over = row.utilization > 100;
  return (
    <div className="budget-progress">
      <div className="d-flex justify-content-between gap-2">
        <strong>{row.category_name}</strong>
        <span>
          <b>{money(row.spent)}</b> <span className="muted">/ {money(row.monthly_limit)}</span>
        </span>
      </div>
      <div
        className={`progress ${over ? 'over' : row.utilization >= 80 ? 'near' : ''}`}
        role="progressbar"
        aria-label={`${row.category_name} budget used`}
        aria-valuenow={row.utilization}
        aria-valuemin={0}
        aria-valuemax={Math.max(100, row.utilization)}
      >
        <div className="progress-bar" style={{ width: `${Math.min(row.utilization, 100)}%` }} />
      </div>
      <div className="d-flex justify-content-between">
        <small className={over ? 'negative' : 'muted'}>
          {over ? `${money(-row.remaining)} over budget` : `${money(row.remaining)} remaining`}
        </small>
        <small className={over ? 'negative' : 'muted'}>{row.utilization}% used</small>
      </div>
    </div>
  );
}
export default function Dashboard({ month, revision, add, navigate, analytics = false }) {
  const summary = useResource(`/analytics/summary?month=${month}`, revision);
  const categories = useResource(`/analytics/categories?month=${month}`, revision);
  const monthly = useResource(`/analytics/monthly?month=${month}`, revision);
  const budgets = useResource(`/budgets?month=${month}`, revision);
  const recent = useResource(`/transactions?month=${month}&limit=5`, revision);
  const cities = useResource(`/analytics/cities?month=${month}`, revision);
  return (
    <>
      <Status resource={summary}>
        {(data) => (
          <div className="metrics-grid">
            {[
              {
                label: 'Total income',
                value: data.income,
                icon: ArrowDownLeft,
                detail: 'Money coming in',
                color: 'green',
              },
              {
                label: 'Total expenses',
                value: data.expenses,
                icon: ArrowUpRight,
                detail: `${data.transaction_count} total transactions`,
                color: 'amber',
              },
              {
                label: 'Monthly balance',
                value: data.balance,
                icon: Wallet,
                detail: 'Income minus expenses',
                color: 'blue',
              },
              {
                label: 'Budget utilization',
                value: `${data.budget_utilization}%`,
                icon: Target,
                detail: data.budget
                  ? `${money(data.budgeted_spending)} of ${money(data.budget)}`
                  : 'Set your first budget',
                color: 'purple',
              },
            ].map((item) => (
              <section className="metric-card" key={item.label}>
                <div className="metric-top">
                  <span>{item.label}</span>
                  <span className={`metric-icon ${item.color}`}>
                    <item.icon size={18} />
                  </span>
                </div>
                <h2>{typeof item.value === 'number' ? money(item.value) : item.value}</h2>
                <p>{item.detail}</p>
              </section>
            ))}
          </div>
        )}
      </Status>
      <div className="dashboard-grid">
        <section className="panel trend-panel">
          <div className="panel-heading">
            <div>
              <h2>Money in, money out</h2>
              <p>A little perspective on your progress</p>
            </div>
            <div className="chart-key">
              <span>
                <i className="green-dot" />
                Income
              </span>
              <span>
                <i className="amber-dot" />
                Expenses
              </span>
            </div>
          </div>
          <Status resource={monthly}>
            {(data) => <TrendChart data={data} bars={analytics} />}
          </Status>
        </section>
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Where it goes</h2>
              <p>Spending by category</p>
            </div>
            <span className="subtle-badge">This month</span>
          </div>
          <Status resource={categories}>{(data) => <SpendingChart data={data} />}</Status>
        </section>
      </div>
      {analytics ? (
        <div className="dashboard-grid">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Plan vs. actual</h2>
                <p>Category budgets and spending</p>
              </div>
            </div>
            <Status resource={budgets}>{(data) => <BudgetChart data={data} />}</Status>
          </section>
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Spending by city</h2>
                <p>Your expenses, a place at a time</p>
              </div>
            </div>
            <Status resource={cities}>
              {(data) =>
                data.length ? (
                  <div className="city-list">
                    {data.map((city) => (
                      <div key={city.city}>
                        <div className="d-flex justify-content-between">
                          <strong>{city.city}</strong>
                          <span>{money(city.amount)}</span>
                        </div>
                        <div className="city-bar">
                          <span style={{ width: `${(city.amount / data[0].amount) * 100}%` }} />
                        </div>
                        <small className="muted">{city.transaction_count} transactions</small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty title="No city data yet" text="Add a city when recording an expense." />
                )
              }
            </Status>
          </section>
        </div>
      ) : (
        <>
          <div className="dashboard-grid lower-grid">
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h2>Recent transactions</h2>
                  <p>The latest from {monthLabel(month)}</p>
                </div>
                <button className="text-button" onClick={() => navigate('Transactions')}>
                  View all <ChevronRight size={15} />
                </button>
              </div>
              <Status resource={recent}>
                {(data) =>
                  data.data.length ? (
                    <TransactionTable rows={data.data} />
                  ) : (
                    <Empty
                      action={
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => add('transaction')}
                        >
                          <Plus size={16} /> Add transaction
                        </button>
                      }
                    />
                  )
                }
              </Status>
            </section>
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h2>Your budgets</h2>
                  <p>Make room for what matters</p>
                </div>
                <button
                  className="icon-button"
                  aria-label="Add budget"
                  onClick={() => add('budget')}
                >
                  <Plus size={18} />
                </button>
              </div>
              <Status resource={budgets}>
                {(data) =>
                  data.length ? (
                    <div className="budget-list">
                      {data.slice(0, 4).map((row) => (
                        <BudgetProgress key={row.budget_id} row={row} />
                      ))}
                      <button className="text-button" onClick={() => navigate('Budgets')}>
                        Manage all budgets <ChevronRight size={15} />
                      </button>
                    </div>
                  ) : (
                    <Empty
                      title="A plan for every rupee"
                      text="Set category limits and keep spending on track."
                      action={
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => add('budget')}
                        >
                          Create budget
                        </button>
                      }
                    />
                  )
                }
              </Status>
            </section>
          </div>
          <div className="insight-banner">
            <span className="insight-icon">
              <Sparkles size={20} />
            </span>
            <div>
              <strong>Small steps. A clearer financial picture.</strong>
              <p>A quick daily check-in is all it takes to build a better money habit.</p>
            </div>
            <button className="text-button" onClick={() => navigate('Analytics')}>
              Explore insights <ArrowUpRight size={17} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
