-- Optional sample records. Run once on a fresh database after schema.sql and seed.sql.
BEGIN;
INSERT INTO transactions (user_id, category_id, amount, transaction_type, description, transaction_date, merchant_city)
SELECT 1, c.category_id, d.amount, c.category_type, d.description,
       (date_trunc('month', CURRENT_DATE) + d.day_offset * interval '1 day')::date, d.city
FROM (VALUES
  ('Allowance', 18000.00, 'Monthly allowance', 0, 'Delhi'),
  ('Freelancing', 6500.00, 'Website project', 2, 'Delhi'),
  ('Rent', 6000.00, 'Monthly rent', 0, 'Delhi'),
  ('Food', 420.00, 'Weekend groceries', 1, 'Delhi'),
  ('Food', 180.00, 'Lunch with friends', 3, 'Delhi'),
  ('Transportation', 350.00, 'Metro recharge', 1, 'Delhi'),
  ('Education', 1200.00, 'Course books', 4, 'Noida'),
  ('Shopping', 899.00, 'Everyday essentials', 5, 'Gurugram'),
  ('Entertainment', 450.00, 'Movie night', 6, 'Noida'),
  ('Utilities', 699.00, 'Internet bill', 2, 'Delhi')
) AS d(category, amount, description, day_offset, city)
JOIN categories c ON c.category_name = d.category;

INSERT INTO budgets (user_id, category_id, monthly_limit, budget_month)
SELECT 1, c.category_id, d.limits, date_trunc('month', CURRENT_DATE)::date
FROM (VALUES ('Food', 3000), ('Transportation', 1500), ('Shopping', 2000),
             ('Education', 2500), ('Entertainment', 1000), ('Rent', 6000)) AS d(category, limits)
JOIN categories c ON c.category_name = d.category
ON CONFLICT DO NOTHING;
COMMIT;
