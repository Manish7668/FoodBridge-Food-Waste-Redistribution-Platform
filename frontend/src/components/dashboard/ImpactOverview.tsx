import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const colors = ['#16a34a', '#f97316', '#3b82f6', '#8b5cf6'];

export function ImpactOverview({ donations, meals }: { donations: { category: string; servings: number }[]; meals: number }) {
  const groups = donations.reduce<Record<string, number>>((acc, donation) => {
    const key = donation.category || 'Other';
    acc[key] = (acc[key] || 0) + Math.max(0, donation.servings || 0);
    return acc;
  }, {});
  const data = Object.entries(groups).slice(0, 4).map(([name, value]) => ({ name, value }));
  if (!data.length) data.push({ name: 'No data yet', value: 1 });

  return (
    <section className="panel impact-panel">
      <div className="panel-heading compact"><div><span className="panel-kicker">LIVE FROM YOUR DONATIONS</span><h2>Impact Overview</h2></div><span className="period-pill">This account</span></div>
      <div className="impact-chart-row">
        <div className="donut-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={76} paddingAngle={3} stroke="none">
                {data.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, 'Meals']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center"><b>{meals}</b><span>Meals shared</span></div>
        </div>
        <div className="legend-list">
          {data.map((item, index) => <div className="legend-row" key={item.name}><span><i style={{ background: colors[index % colors.length] }} />{item.name}</span><b>{item.value}</b></div>)}
        </div>
      </div>
    </section>
  );
}
