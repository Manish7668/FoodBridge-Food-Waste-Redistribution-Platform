import type { ReactNode } from 'react';

export function StatCard({ icon, label, value, helper, tone = 'green' }: { icon: ReactNode; label: string; value: string | number; helper: string; tone?: 'green' | 'orange' | 'red' | 'blue' }) {
  return (
    <div className={`stat-card stat-${tone}`}>
      <div className="stat-top"><div className="stat-icon">{icon}</div><span className="stat-spark">↗</span></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-helper">{helper}</div>
      <div className="mini-chart"><span /><span /><span /><span /><span /></div>
    </div>
  );
}
