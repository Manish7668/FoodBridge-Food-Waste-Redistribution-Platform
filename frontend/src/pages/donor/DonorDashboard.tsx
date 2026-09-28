import { CheckCircle2, Package, Soup, UsersRound } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api, getApiError, request } from '../../lib/api';
import type { Donation, DonationListResponse, User } from '../../types';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { WelcomeBanner } from '../../components/dashboard/WelcomeBanner';
import { StatCard } from '../../components/dashboard/StatCard';
import { RecentDonations } from '../../components/dashboard/RecentDonations';
import { ImpactOverview } from '../../components/dashboard/ImpactOverview';
import { DonationTrend } from '../../components/dashboard/DonationTrend';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { ImpactBanner } from '../../components/dashboard/ImpactBanner';
import { LoadingState } from '../../components/common/LoadingState';

export function DonorDashboard({ user }: { user: User }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => { setLoading(true); try { const result = await request<DonationListResponse>(api.get('/donations?limit=50')); setDonations(result.items || []); setError(''); } catch (e) { setError(getApiError(e, 'Unable to load your donations.')); } finally { setLoading(false); } };
  useEffect(() => { void load(); }, []);

  const stats = useMemo(() => {
    const delivered = donations.filter((d) => d.status === 'DELIVERED');
    const active = donations.filter((d) => !['DELIVERED', 'EXPIRED', 'CANCELLED', 'REJECTED'].includes(d.status));
    return { total: donations.length, active: active.length, delivered: delivered.length, meals: donations.reduce((sum, d) => sum + (d.servings || 0), 0), food: donations.reduce((sum, d) => sum + (d.quantity || 0), 0) };
  }, [donations]);

  return <DashboardLayout user={user}><div className="dashboard-page"><WelcomeBanner name={user.name} />{error && <div className="inline-error">{error}</div>}{loading ? <LoadingState label="Loading your impact dashboard..." /> : <>
    <div className="stats-grid"><StatCard icon={<Package size={22} />} label="Total Donations" value={stats.total} helper={`${stats.active} active right now`} tone="green" /><StatCard icon={<Soup size={22} />} label="Meals Shared" value={stats.meals} helper={`${stats.delivered} completed deliveries`} tone="orange" /><StatCard icon={<CheckCircle2 size={22} />} label="Food Rescued" value={`${stats.food.toFixed(1)} kg`} helper="Calculated from recorded quantity" tone="red" /><StatCard icon={<UsersRound size={22} />} label="People Reached" value={stats.meals} helper="Estimated from servings" tone="blue" /></div>
    <div className="dashboard-grid-main"><RecentDonations donations={donations} loading={loading} /><ImpactOverview donations={donations} meals={stats.meals} /></div>
    <div className="dashboard-grid-secondary"><DonationTrend donations={donations} /><QuickActions /></div>
    <ImpactBanner />
  </>}</div></DashboardLayout>;
}
