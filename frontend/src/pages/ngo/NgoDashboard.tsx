import { useEffect, useMemo, useState } from 'react';
import { MapPin, PackageCheck, Soup, Timer, UsersRound } from 'lucide-react';
import { api, getApiError, request } from '../../lib/api';
import type { Donation, DonationListResponse, User } from '../../types';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DonationCard } from '../../components/dashboard/DonationCard';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';
import { StatCard } from '../../components/dashboard/StatCard';

export function NgoDashboard({ user }: { user: User }) {
  const [donations, setDonations] = useState<Donation[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [claiming, setClaiming] = useState('');
  const load = async () => { setLoading(true); try { const r = await request<DonationListResponse>(api.get('/donations?limit=50')); setDonations(r.items || []); } catch (e) { setError(getApiError(e)); } finally { setLoading(false); } };
  useEffect(() => { void load(); }, []);
  const available = useMemo(() => donations.filter((d) => d.status === 'AVAILABLE'), [donations]);
  const claim = async (id: string) => { setClaiming(id); setError(''); try { await request(api.post(`/donations/${id}/claim`)); await load(); } catch (e) { setError(getApiError(e, 'Unable to claim donation. The NGO may need verification first.')); } finally { setClaiming(''); } };
  return <DashboardLayout user={user}><div className="page-heading"><div><span className="eyebrow">RECEIVE MORE. WASTE LESS.</span><h1>Food available nearby</h1><p>Review current donations and claim what your organization can receive.</p></div><div className="heading-pill"><MapPin size={17} /> Nearby matches</div></div><div className="stats-grid"><StatCard icon={<PackageCheck size={22} />} label="Available donations" value={available.length} helper="Ready to be claimed" tone="green" /><StatCard icon={<Soup size={22} />} label="Meals available" value={available.reduce((s, d) => s + d.servings, 0)} helper="Estimated servings" tone="orange" /><StatCard icon={<Timer size={22} />} label="Urgent food" value={available.filter((d) => new Date(d.consumeBy).getTime() - Date.now() < 6 * 3600000).length} helper="Consume-by within 6h" tone="red" /><StatCard icon={<UsersRound size={22} />} label="Your requests" value={donations.filter((d) => d.status === 'CLAIMED').length} helper="Currently claimed" tone="blue" /></div>{error && <div className="inline-error">{error}</div>}{loading ? <LoadingState label="Finding available donations..." /> : available.length ? <div className="donation-card-grid">{available.map((donation) => <DonationCard key={donation._id} donation={donation} action={<button className="primary-button small-button" disabled={claiming === donation._id} onClick={() => void claim(donation._id)}>{claiming === donation._id ? 'Claiming...' : 'Claim donation'}</button>} />)}</div> : <EmptyState icon="🥕" title="No available donations" description="New matched donations will appear here when donors publish surplus food." />}</DashboardLayout>;
}
