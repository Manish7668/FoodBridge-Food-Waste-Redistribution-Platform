import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function DonationTrend({ donations }: { donations: { createdAt?: string; servings: number }[] }) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const label = date.toLocaleDateString('en-IN', { weekday: 'short' });
    const key = date.toISOString().slice(0, 10);
    const total = donations.filter((item) => (item.createdAt || '').slice(0, 10) === key).reduce((sum, item) => sum + (item.servings || 0), 0);
    return { day: label, meals: total };
  });

  return (
    <section className="panel trend-panel">
      <div className="panel-heading compact"><div><span className="panel-kicker">LAST 7 DAYS</span><h2>Donation Activity</h2></div><span className="trend-badge">🌱 Live data</span></div>
      <div className="trend-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={days} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}><defs><linearGradient id="foodBridgeGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16a34a" stopOpacity={0.28} /><stop offset="100%" stopColor="#16a34a" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="#edf2ee" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#718078', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#718078', fontSize: 11 }} allowDecimals={false} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4ece6', boxShadow: '0 10px 30px rgba(22,101,52,.08)' }} /><Area type="monotone" dataKey="meals" stroke="#16a34a" strokeWidth={3} fill="url(#foodBridgeGreen)" /></AreaChart></ResponsiveContainer></div>
    </section>
  );
}
