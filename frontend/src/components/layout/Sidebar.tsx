import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Boxes,
  CircleHelp,
  Home,
  LogOut,
  MessageSquare,
  PackagePlus,
  Settings,
  Truck,
  UserRound,
  X,
} from 'lucide-react';
import type { Role } from '../../types';

const navByRole: Record<Role, { label: string; to: string; icon: typeof Home }[]> = {
  DONOR: [
    { label: 'Dashboard', to: '/donor/dashboard', icon: Home },
    { label: 'Donate Food', to: '/donor/donations/new', icon: PackagePlus },
    { label: 'My Donations', to: '/donor/donations', icon: Boxes },
    { label: 'Pickup Requests', to: '/donor/pickups', icon: Truck },
    { label: 'Impact & Analytics', to: '/donor/impact', icon: BarChart3 },
    { label: 'Messages', to: '/donor/messages', icon: MessageSquare },
    { label: 'Profile', to: '/donor/profile', icon: UserRound },
  ],
  NGO: [
    { label: 'Dashboard', to: '/ngo/dashboard', icon: Home },
    { label: 'Find Food', to: '/ngo/donations', icon: Boxes },
    { label: 'Requests', to: '/ngo/requests', icon: PackagePlus },
    { label: 'Pickups', to: '/ngo/pickups', icon: Truck },
    { label: 'Impact', to: '/ngo/impact', icon: BarChart3 },
    { label: 'Messages', to: '/ngo/messages', icon: MessageSquare },
    { label: 'Profile', to: '/ngo/profile', icon: UserRound },
  ],
  VOLUNTEER: [
    { label: 'Dashboard', to: '/volunteer/dashboard', icon: Home },
    { label: 'Pickup Tasks', to: '/volunteer/tasks', icon: Truck },
    { label: 'Impact', to: '/volunteer/impact', icon: BarChart3 },
    { label: 'Messages', to: '/volunteer/messages', icon: MessageSquare },
    { label: 'Profile', to: '/volunteer/profile', icon: UserRound },
  ],
  ADMIN: [
    { label: 'Dashboard', to: '/admin/dashboard', icon: Home },
    { label: 'Users', to: '/admin/users', icon: UserRound },
    { label: 'Organizations', to: '/admin/organizations', icon: Boxes },
    { label: 'Donations', to: '/admin/donations', icon: PackagePlus },
    { label: 'Pickups', to: '/admin/pickups', icon: Truck },
    { label: 'Complaints', to: '/admin/complaints', icon: MessageSquare },
    { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  ],
};

export function Sidebar({ role, open, onClose, onLogout }: { role: Role; open: boolean; onClose: () => void; onLogout: () => void }) {
  return (
    <>
      <div className={`sidebar-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`app-sidebar ${open ? 'open' : ''}`}>
        <div className="brand-block">
          <div className="brand-mark"><span>🍃</span></div>
          <div>
            <div className="brand-name">FoodBridge</div>
            <div className="brand-tagline">Good Food. Brighter Tomorrow.</div>
          </div>
          <button className="mobile-close" onClick={onClose} aria-label="Close navigation"><X size={20} /></button>
        </div>

        <nav className="sidebar-nav">
          {navByRole[role].map(({ label, to, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Icon size={20} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink to={`/${role.toLowerCase()}/help`} onClick={onClose} className="sidebar-link">
            <CircleHelp size={20} />
            <span>Help & Support</span>
          </NavLink>
          <button className="sidebar-link sidebar-logout" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          <div className="sidebar-impact-note">
            <span>🌱</span>
            <p>Together we can reduce food waste and feed more people.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
