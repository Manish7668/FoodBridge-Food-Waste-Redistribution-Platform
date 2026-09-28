import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import type { User } from '../../types';

export function DashboardHeader({ user, onMenu, onLogout }: { user: User; onMenu: () => void; onLogout: () => void }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={23} /></button>
        <div className="search-box">
          <Search size={19} />
          <input placeholder="Search donations, NGOs, locations..." aria-label="Search" />
        </div>
      </div>
      <div className="header-actions">
        <div className="header-popover-wrap">
          <button className="icon-button notification-button" onClick={() => setNotificationsOpen((v) => !v)} aria-label="Notifications">
            <Bell size={21} />
            <span className="notification-dot">3</span>
          </button>
          {notificationsOpen && (
            <div className="header-popover notification-popover">
              <div className="popover-title">Notifications</div>
              <div className="notification-item"><span>🟢</span><div><b>FoodBridge is ready</b><small>Your dashboard is connected to the live API.</small></div></div>
              <div className="notification-item"><span>🍱</span><div><b>Keep food moving</b><small>Create a donation before it becomes surplus waste.</small></div></div>
              <div className="notification-item"><span>🌱</span><div><b>Impact tracking</b><small>Completed deliveries contribute to your impact metrics.</small></div></div>
            </div>
          )}
        </div>
        <div className="header-popover-wrap">
          <button className="profile-trigger" onClick={() => setProfileOpen((v) => !v)}>
            <span className="avatar">{user.name?.slice(0, 1).toUpperCase()}</span>
            <span className="profile-copy"><b>Hello, {user.name?.split(' ')[0] || 'there'}</b><small>{user.role}</small></span>
            <ChevronDown size={16} />
          </button>
          {profileOpen && (
            <div className="header-popover profile-popover">
              <div className="profile-menu-item"><span>Signed in as</span><b>{user.email}</b></div>
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
