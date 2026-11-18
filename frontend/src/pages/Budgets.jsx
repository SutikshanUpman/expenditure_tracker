import { Plus, Target, CircleAlert } from 'lucide-react';
import { useResource } from '../hooks/useResource';
import { Status, Empty, money, Actions } from '../components/Common';
import { BudgetProgress } from './Dashboard';

export default function Budgets({ month, revision, add, edit, remove }) {
  const resource = useResource(`/budgets?month=${month}`, revision);
  return (
    <Status resource={resource}>
      {(data) => (
        <>
          {data.length ? (
            <>
              <div className="budget-overview">
                <span className="overview-icon">
                  <Target size={24} />
                </span>
                <div>
                  <span className="eyebrow">YOUR MONTHLY PLAN</span>
                  <h2>{money(data.reduce((sum, row) => sum + Number(row.monthly_limit), 0))}</h2>
                  <p>
                    allocated across {data.length} categories · Only budgeted categories count
                    toward utilization.
                  </p>
                </div>
              </div>
              <div className="budget-card-grid">
                {data.map((row) => (
                  <section className="panel budget-card" key={row.budget_id}>
                    <div className="d-flex justify-content-between mb-4">
                      <span
                        className={`subtle-badge ${row.utilization > 100 ? 'danger-badge' : ''}`}
                      >
                        {row.utilization > 100 ? (
                          <>
                            <CircleAlert size={13} /> Over budget
                          </>
                        ) : row.utilization >= 80 ? (
                          'Getting close'
                        ) : (
                          'On track'
                        )}
                      </span>
                      <Actions
                        name={row.category_name}
                        edit={() => edit(row)}
                        remove={() => remove(row)}
                      />
                    </div>
                    <BudgetProgress row={row} />
                  </section>
                ))}
                <button className="add-budget-card" onClick={() => add('budget')}>
                  <Plus size={24} />
                  <strong>Make a little more room</strong>
                  <span>Add a category budget</span>
                </button>
              </div>
            </>
          ) : (
            <section className="panel">
              <Empty
                title="A little planning goes a long way"
                text="Set monthly limits for your expense categories. We’ll keep track of the rest."
                action={
                  <button className="btn btn-primary" onClick={() => add('budget')}>
                    <Plus size={16} /> Create your first budget
                  </button>
                }
              />
            </section>
          )}
        </>
      )}
    </Status>
  );
}
