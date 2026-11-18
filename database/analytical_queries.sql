-- Join transaction detail to category names.
SELECT t.*, c.category_name FROM transactions t
INNER JOIN categories c USING (category_id) WHERE t.user_id = 1;

-- Include categories without spending. Keep user filtering inside the LEFT JOIN.
SELECT c.category_name, COALESCE(SUM(t.amount), 0) AS total_expense
FROM categories c LEFT JOIN transactions t
ON t.category_id = c.category_id AND t.user_id = 1 AND t.transaction_type = 'Expense'
WHERE c.category_type = 'Expense' GROUP BY c.category_id ORDER BY total_expense DESC;

-- Nested subquery: above-average expenses for the same user.
SELECT * FROM transactions WHERE user_id = 1 AND transaction_type = 'Expense'
AND amount > (SELECT AVG(amount) FROM transactions WHERE user_id = 1 AND transaction_type = 'Expense');

SELECT * FROM monthly_expenses WHERE user_id = 1 ORDER BY month DESC;
