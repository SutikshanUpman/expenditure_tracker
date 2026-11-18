import { Plus, Tags } from 'lucide-react';
import { Empty } from '../components/Common';

export default function Categories({ categories, add }) {
  return (
    <div className="row g-4">
      {['Expense', 'Income'].map((type) => (
        <div className="col-lg-6" key={type}>
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>{type} categories</h2>
                <p>A place for every transaction</p>
              </div>
              <span className="metric-icon green">
                <Tags size={18} />
              </span>
            </div>
            <div className="category-grid">
              {categories
                .filter((c) => c.category_type === type)
                .map((c) => (
                  <div className="category-tile" key={c.category_id}>
                    <span className={`category-mark ${type === 'Income' ? 'income' : ''}`} />
                    <strong>{c.category_name}</strong>
                  </div>
                ))}
            </div>
            {!categories.some((c) => c.category_type === type) && (
              <Empty
                title="No categories yet"
                text="Create a category to organize your transactions."
              />
            )}
            <button className="text-button mt-4" onClick={() => add('category')}>
              <Plus size={16} /> Add category
            </button>
          </section>
        </div>
      ))}
    </div>
  );
}
