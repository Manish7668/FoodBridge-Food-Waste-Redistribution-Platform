import { Clock3, MapPin, Package, Users } from 'lucide-react';
import type { Donation } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

export function DonationCard({ donation, action }: { donation: Donation; action?: React.ReactNode }) {
  const hours = Math.max(0, Math.round((new Date(donation.consumeBy).getTime() - Date.now()) / 3600000));
  return <article className="donation-card"><div className="donation-card-top"><span className="food-thumb large">{donation.category.toLowerCase().includes('fruit') ? '🥕' : donation.category.toLowerCase().includes('bakery') ? '🥖' : '🍛'}</span><div className="donation-card-title"><div><h3>{donation.title}</h3><span>{donation.category} · {donation.foodType.replace('_', ' ')}</span></div><StatusBadge status={donation.status} /></div></div><div className="donation-card-meta"><span><Package size={15} />{donation.quantity} {donation.unit}</span><span><Users size={15} />{donation.servings} servings</span><span><MapPin size={15} />{donation.pickupLocation?.label || 'Pickup location'}</span><span className={hours <= 6 ? 'urgent-text' : ''}><Clock3 size={15} />{hours > 0 ? `${hours}h left` : 'Expired'}</span></div>{action && <div className="donation-card-action">{action}</div>}</article>;
}
