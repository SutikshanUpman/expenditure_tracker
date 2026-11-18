import { useState } from 'react';
import { Search, Download, SlidersHorizontal, X } from 'lucide-react';
import { useResource } from '../hooks/useResource';
import { query, exportCsv } from '../services/api';
import { Status, Empty, TransactionTable } from '../components/Common';

export default function Transactions({ month, revision, categories, edit, remove, notify }) {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category_id: '',
    from: '',
    to: '',
    city: '',
  });
  const [page, setPage] = useState(1);
  const [advanced, setAdvanced] = useState(false);
  const resource = useResource(
    `/transactions?${query({ month, ...filters, page, limit: 10 })}`,
    revision,
  );
  const change = (event) => {
    setPage(1);
    setFilters((old) => ({
      ...old,
      [event.target.name]: event.target.value,
      ...(event.target.name === 'type' ? { category_id: '' } : {}),
    }));
  };
  const reset = () => {
    setPage(1);
    setFilters({ search: '', type: '', category_id: '', from: '', to: '', city: '' });
  };
  const download = async () => {
    try {
      await exportCsv({ month, ...filters });
    } catch (error) {
      notify(error.message);
    }
  };
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Your transaction history</h2>
          <p>Every little detail, all in one place</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={download}>
          <Download size={15} /> Export CSV
        </button>
      </div>
      <div className="filter-row">
        <label className="search-field">
          <Search size={17} />
          <input
            className="form-control"
            aria-label="Search transactions"
            name="search"
            placeholder="Search transactions…"
            value={filters.search}
            maxLength={100}
            onChange={change}
          />
        </label>
        <select
          className="form-select"
          aria-label="Filter by type"
          name="type"
          value={filters.type}
          onChange={change}
        >
          <option value="">All types</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
        <select
          className="form-select"
          aria-label="Filter by category"
          name="category_id"
          value={filters.category_id}
          onChange={change}
        >
          <option value="">All categories</option>
          {categories
            .filter((c) => !filters.type || c.category_type === filters.type)
            .map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
        </select>
        <button
          className="btn btn-light"
          aria-expanded={advanced}
          onClick={() => setAdvanced(!advanced)}
        >
          <SlidersHorizontal size={17} />
          <span>Filters</span>
        </button>
      </div>
      {advanced && (
        <div className="advanced-filters">
          <label className="field-label">
            From
            <input
              className="form-control"
              type="date"
              name="from"
              value={filters.from}
              onChange={change}
            />
          </label>
          <label className="field-label">
            To
            <input
              className="form-control"
              type="date"
              name="to"
              value={filters.to}
              onChange={change}
            />
          </label>
          <label className="field-label">
            City
            <input
              className="form-control"
              placeholder="Exact city name"
              name="city"
              value={filters.city}
              onChange={change}
            />
          </label>
          <button className="text-button" onClick={reset}>
            <X size={14} /> Clear filters
          </button>
        </div>
      )}
      <Status resource={resource}>
        {(data) =>
          data.data.length ? (
            <>
              <TransactionTable rows={data.data} edit={edit} remove={remove} />
              <div className="pagination-row">
                <span>
                  {(page - 1) * 10 + 1}–{Math.min(page * 10, data.pagination.total)} of{' '}
                  {data.pagination.total} transactions
                </span>
                <div>
                  <button
                    className="btn btn-light btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                  <span className="page-number">{page}</span>
                  <button
                    className="btn btn-light btn-sm"
                    disabled={page * 10 >= data.pagination.total}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Empty
              title="No matching transactions"
              text="Try a different month or clear the filters to see more."
              action={
                Object.values(filters).some(Boolean) || page > 1 ? (
                  <button className="btn btn-outline-primary btn-sm" onClick={reset}>
                    Reset filters
                  </button>
                ) : null
              }
            />
          )
        }
      </Status>
    </section>
  );
}
