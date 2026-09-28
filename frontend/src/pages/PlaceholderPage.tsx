import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { User } from '../types';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export function PlaceholderPage({ user, title, description, backTo }: { user: User; title: string; description: string; backTo?: string }) {
  return <DashboardLayout user={user}><div className="placeholder-page"><div className="placeholder-icon"><Sparkles size={26}/></div><span className="eyebrow">FOODBRIDGE WORKSPACE</span><h1>{title}</h1><p>{description}</p><Link className="soft-button" to={backTo || `/${user.role.toLowerCase()}/dashboard`}><ArrowLeft size={16}/> Back to dashboard</Link></div></DashboardLayout>;
}
