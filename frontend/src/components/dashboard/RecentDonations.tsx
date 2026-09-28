import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Donation } from '../../types';
import { EmptyState } from '../common/EmptyState';
import { StatusBadge } from '../common/StatusBadge';

function foodEmoji(category: string) {
  const value = category.toLowerCase();
  if (value.includes('fruit') || value.includes('vegetable')) return '🥕';
  if (value.includes('bakery') || value.includes('bread')) return '🥖';
  if (value.includes('dairy')) return '🥛';
  if (value.includes('prepared') || value.includes('meal')) return '🍛';
  return '🍱';
}

export function RecentDonations({ donations, loading }: { donations: Donation[]; loading: boolean }) {
  return (
    <section className="panel recent-panel">
      <div className="panel-heading">
        <div><span className="panel-kicker">YOUR CONTRIBUTION</span><h2>Recent Donations</h2></div>
        <Link to="/donor/donations" className="view-link">View All <ArrowRight size={16} /></Link>
      </div>
      {loading ? <div className="skeleton-table"><span /><span /><span /><span /></div> : donations.length ? (
        <div className="donation-table-wrap">
          <table className="donation-table">
            <thead><tr><th>Food item</th><th>Quantity</th><th>Pickup location</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {donations.slice(0, 5).map((donation) => (
                <tr key={donation._id}>
                  <td><div className="food-cell"><span className="food-thumb">{foodEmoji(donation.category)}</span><div><b>{donation.title}</b><small>{donation.category}</small></div></div></td>
                  <td>{donation.quantity} {donation.unit}</td>
                  <td><span className="location-cell"><MapPin size={15} />{donation.pickupLocation?.label || 'Pickup location'}</span></td>
                  <td><StatusBadge status={donation.status} /></td>
                  <td><span className="date-cell"><CalendarDays size={14} />{new Date(donation.createdAt || donation.consumeBy).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon="🍱" title="No donations yet" description="Turn surplus food into shared meals by creating your first donation." action={<Link to="/donor/donations/new" className="primary-button">Donate Food</Link>} />
      )}
    </section>
  );
}
