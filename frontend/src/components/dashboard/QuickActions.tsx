import { BarChart3, MapPin, PackagePlus, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  { title: 'Donate Food', subtitle: 'List surplus food', to: '/donor/donations/new', icon: PackagePlus, tone: 'green' },
  { title: 'Track Pickup', subtitle: 'View live status', to: '/donor/pickups', icon: Truck, tone: 'blue' },
  { title: 'Find NGOs', subtitle: 'Nearby organizations', to: '/donor/organizations', icon: MapPin, tone: 'orange' },
  { title: 'View Impact', subtitle: 'See your contribution', to: '/donor/impact', icon: BarChart3, tone: 'purple' },
];

export function QuickActions() {
  return <section className="panel quick-panel"><div className="panel-heading compact"><div><span className="panel-kicker">DO MORE</span><h2>Quick Actions</h2></div></div><div className="quick-grid">{actions.map(({ title, subtitle, to, icon: Icon, tone }) => <Link to={to} className={`quick-action quick-${tone}`} key={title}><span className="quick-icon"><Icon size={23} /></span><b>{title}</b><small>{subtitle}</small></Link>)}</div></section>;
}
