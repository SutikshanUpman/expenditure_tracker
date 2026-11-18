import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { money, Empty } from './Common';

export const COLORS = [
  '#245c47',
  '#8ab58b',
  '#d4ac63',
  '#8f9ac0',
  '#d18b73',
  '#a5bbbc',
  '#cab5d3',
  '#8d9973',
  '#b6a18d',
];
const shortMonth = (month) =>
  new Date(`${month}-01T12:00:00`).toLocaleDateString('en-IN', { month: 'short' });
const axis = { axisLine: false, tickLine: false, tick: { fill: '#848b86', fontSize: 12 } };
export function TrendChart({ data, bars = false }) {
  if (!data.some((d) => d.income || d.expenses))
    return (
      <Empty
        title="Your story starts here"
        text="Record income and expenses to see your six-month trend."
      />
    );
  const Chart = bars ? BarChart : AreaChart;
  return (
    <div
      className="chart-wrap"
      role="img"
      aria-label={`Income and expenses over six months: ${data.map((d) => `${shortMonth(d.month)} income ${money(d.income)}, expenses ${money(d.expenses)}`).join('; ')}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data} margin={{ top: 12, right: 15, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5d9479" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#5d9479" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#edf0ea" strokeDasharray="4 5" />
          <XAxis dataKey="month" tickFormatter={shortMonth} {...axis} dy={8} />
          <YAxis
            {...axis}
            width={50}
            tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
          />
          <Tooltip
            formatter={money}
            contentStyle={{ borderRadius: 12, border: '1px solid #e4e8e1' }}
            labelFormatter={shortMonth}
          />
          {bars ? (
            <>
              <Bar
                dataKey="income"
                name="Income"
                fill="#245c47"
                radius={[4, 4, 0, 0]}
                maxBarSize={25}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#d4ac63"
                radius={[4, 4, 0, 0]}
                maxBarSize={25}
              />
            </>
          ) : (
            <>
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#39775a"
                strokeWidth={2.5}
                fill="url(#incomeFill)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#d4ac63"
                strokeWidth={2.5}
                fill="transparent"
              />
            </>
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}
export function SpendingChart({ data }) {
  const spending = data.filter((d) => d.amount > 0);
  const total = spending.reduce((sum, row) => sum + row.amount, 0);
  if (!spending.length)
    return (
      <Empty title="Room for your first expense" text="Your spending breakdown will appear here." />
    );
  return (
    <div className="spending-chart">
      <div
        className="donut-wrap"
        role="img"
        aria-label={`Spending by category: ${spending.map((d) => `${d.category_name} ${money(d.amount)}`).join('; ')}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spending}
              dataKey="amount"
              nameKey="category_name"
              innerRadius={69}
              outerRadius={89}
              paddingAngle={3}
              stroke="none"
            >
              {spending.map((row, index) => (
                <Cell key={row.category_id} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={money} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <span>Total spent</span>
          <strong>{money(total)}</strong>
        </div>
      </div>
      <div className="category-legend">
        {spending.map((row, i) => (
          <div key={row.category_id}>
            <span className="legend-label">
              <i style={{ background: COLORS[i % COLORS.length] }} />
              {row.category_name}
            </span>
            <strong>{Math.round((row.amount / total) * 100)}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
export function BudgetChart({ data }) {
  if (!data.length)
    return (
      <Empty
        title="Give your money a plan"
        text="Create a budget to compare your limits with actual spending."
      />
    );
  return (
    <div className="chart-wrap" role="img" aria-label="Budget limits compared with actual expenses">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data.map((row) => ({
            ...row,
            monthly_limit: Number(row.monthly_limit),
            spent: Number(row.spent),
          }))}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#edf0ea" />
          <XAxis dataKey="category_name" {...axis} tick={{ fontSize: 10 }} interval={0} />
          <YAxis {...axis} width={45} tickFormatter={(n) => (n >= 1000 ? `${n / 1000}k` : n)} />
          <Tooltip formatter={money} />
          <Legend iconType="circle" />
          <Bar name="Budget" dataKey="monthly_limit" fill="#dce7d8" radius={[4, 4, 0, 0]} />
          <Bar name="Spent" dataKey="spent" fill="#245c47" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
