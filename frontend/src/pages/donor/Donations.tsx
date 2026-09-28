import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, getApiError, request } from '../../lib/api';
import type { Donation, DonationListResponse, User } from '../../types';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DonationCard } from '../../components/dashboard/DonationCard';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';

export function DonorDonations({ user }: { user: User }) {
  const [items, setItems] = useState<Donation[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { request<DonationListResponse>(api.get('/donations?limit=50')).then((r) => setItems(r.items || [])).catch((e) => setError(getApiError(e))).finally(() => setLoading(false)); }, []);
  return <DashboardLayout user={user}><div className="page-heading"><div><span className="eyebrow">YOUR FOOD JOURNEY</span><h1>My Donations</h1><p>Track every surplus food contribution from creation to delivery.</p></div><Link to="/donor/donations/new" className="primary-button">+ Donate Food</Link></div>{error && <div className="inline-error">{error}</div>}{loading ? <LoadingState /> : items.length ? <div className="card-list">{items.map((item) => <DonationCard key={item._id} donation={item} />)}</div> : <EmptyState icon="🍱" title="No donations yet" description="Create your first donation and start your FoodBridge journey." action={<Link to="/donor/donations/new" className="primary-button">Donate Food</Link>} />}</DashboardLayout>;
}
