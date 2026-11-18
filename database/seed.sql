BEGIN;
INSERT INTO users (user_id, name, email)
VALUES (1, 'Sutikshan', 's.upman.mat@gmail.com') ON CONFLICT DO NOTHING;
SELECT setval(pg_get_serial_sequence('users', 'user_id'), GREATEST((SELECT MAX(user_id) FROM users), 1));

INSERT INTO categories (category_name, category_type) VALUES
('Salary', 'Income'), ('Allowance', 'Income'), ('Freelancing', 'Income'),
('Scholarship', 'Income'), ('Other Income', 'Income'),
('Food', 'Expense'), ('Transportation', 'Expense'), ('Shopping', 'Expense'),
('Education', 'Expense'), ('Entertainment', 'Expense'), ('Healthcare', 'Expense'),
('Rent', 'Expense'), ('Utilities', 'Expense'), ('Other Expenses', 'Expense')
ON CONFLICT DO NOTHING;
COMMIT;
