BEGIN;

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL CHECK (length(trim(name)) > 0),
  email VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL CHECK (length(trim(category_name)) > 0),
  category_type VARCHAR(10) NOT NULL CHECK (category_type IN ('Income', 'Expense')),
  UNIQUE (category_name),
  UNIQUE (category_id, category_type)
);
CREATE UNIQUE INDEX IF NOT EXISTS categories_name_lower ON categories (lower(category_name));

CREATE TABLE IF NOT EXISTS transactions (
  transaction_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  category_id INTEGER NOT NULL,
  amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('Income', 'Expense')),
  description VARCHAR(500) NOT NULL DEFAULT '',
  transaction_date DATE NOT NULL,
  merchant_city VARCHAR(100) NOT NULL DEFAULT '',
  FOREIGN KEY (category_id, transaction_type) REFERENCES categories(category_id, category_type)
);
CREATE INDEX IF NOT EXISTS transactions_user_date ON transactions (user_id, transaction_date DESC, transaction_id DESC);
CREATE INDEX IF NOT EXISTS transactions_category ON transactions (category_id);

CREATE TABLE IF NOT EXISTS budgets (
  budget_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  category_id INTEGER NOT NULL,
  category_type VARCHAR(10) NOT NULL DEFAULT 'Expense' CHECK (category_type = 'Expense'),
  monthly_limit NUMERIC(10,2) NOT NULL CHECK (monthly_limit > 0),
  budget_month DATE NOT NULL CHECK (EXTRACT(DAY FROM budget_month) = 1),
  FOREIGN KEY (category_id, category_type) REFERENCES categories(category_id, category_type),
  UNIQUE (user_id, category_id, budget_month)
);

CREATE OR REPLACE VIEW monthly_expenses AS
SELECT user_id, DATE_TRUNC('month', transaction_date)::date AS month, category_id,
       SUM(amount) AS total_expense
FROM transactions WHERE transaction_type = 'Expense'
GROUP BY user_id, DATE_TRUNC('month', transaction_date)::date, category_id;

COMMIT;
