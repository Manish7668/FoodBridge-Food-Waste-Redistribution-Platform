import type { ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types';
import { logoutStorage } from '../../lib/storage';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';

export function DashboardLayout({ user, children }: { user: User; children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    logoutStorage();
    navigate('/login');
  };

  return (
    <div className="dashboard-shell">
      <Sidebar role={user.role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={logout} />
      <div className="dashboard-main">
        <DashboardHeader user={user} onMenu={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
