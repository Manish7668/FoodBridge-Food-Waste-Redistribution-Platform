import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login, Register } from './pages/auth/AuthPages';
import { DonorDashboard } from './pages/donor/DonorDashboard';
import { DonorDonations } from './pages/donor/Donations';
import { NewDonation } from './pages/donor/NewDonation';
import { NgoDashboard } from './pages/ngo/NgoDashboard';
import { VolunteerDashboard } from './pages/volunteer/VolunteerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { getStoredUser, logoutStorage } from './lib/storage';
import type { Role, User } from './types';

function ProtectedRoute({ role, children }: { role?: Role; children: React.ReactNode }) {
  const user = getStoredUser();
  const token = localStorage.getItem('access');
  if (!user || !token) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />;
  return <>{children}</>;
}

function PublicShell({ children }: { children: React.ReactNode }) {
  const user = getStoredUser();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => { const handler = () => { logoutStorage(); navigate('/login'); }; window.addEventListener('foodbridge:logout', handler); return () => window.removeEventListener('foodbridge:logout', handler); }, [navigate]);
  if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register') return <>{children}</>;
  if (!user) return <>{children}</>;
  return <>{children}</>;
}

function AppRoutes() {
  const user = getStoredUser();
  const placeholder = (title: string, description: string, role: Role) => <ProtectedRoute role={role}><PlaceholderPage user={user!} title={title} description={description} /></ProtectedRoute>;
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/donor/dashboard" element={<ProtectedRoute role="DONOR"><DonorDashboard user={user!} /></ProtectedRoute>} />
    <Route path="/donor/donations" element={<ProtectedRoute role="DONOR"><DonorDonations user={user!} /></ProtectedRoute>} />
    <Route path="/donor/donations/new" element={<ProtectedRoute role="DONOR"><NewDonation user={user!} /></ProtectedRoute>} />
    <Route path="/donor/pickups" element={placeholder('Pickup requests', 'Pickup and delivery events will appear here as the workflow assigns volunteers.', 'DONOR')} />
    <Route path="/donor/impact" element={placeholder('Impact & analytics', 'Your detailed impact analytics can be expanded here using the same live donation data.', 'DONOR')} />
    <Route path="/donor/messages" element={placeholder('Messages', 'Donation-specific conversations will appear here when chat endpoints are enabled.', 'DONOR')} />
    <Route path="/donor/profile" element={placeholder('Profile', 'Manage your FoodBridge account and organization information.', 'DONOR')} />
    <Route path="/donor/organizations" element={placeholder('Nearby organizations', 'Organization discovery will connect to the matching and geospatial services.', 'DONOR')} />
    <Route path="/donor/help" element={placeholder('Help & support', 'Find guidance about donations, food safety, pickups and account access.', 'DONOR')} />
    <Route path="/ngo/dashboard" element={<ProtectedRoute role="NGO"><NgoDashboard user={user!} /></ProtectedRoute>} />
    <Route path="/ngo/donations" element={placeholder('Available food', 'Browse live donation inventory from the NGO dashboard.', 'NGO')} />
    <Route path="/ngo/requests" element={placeholder('Donation requests', 'Track claimed donations and request status here.', 'NGO')} />
    <Route path="/ngo/pickups" element={placeholder('Pickup schedule', 'Pickup tasks appear here when the workflow schedules them.', 'NGO')} />
    <Route path="/ngo/impact" element={placeholder('NGO impact', 'Measure meals received and successful deliveries from live transaction data.', 'NGO')} />
    <Route path="/ngo/messages" element={placeholder('Messages', 'Secure donation-specific chat will appear here.', 'NGO')} />
    <Route path="/ngo/profile" element={placeholder('Organization profile', 'Manage your organization verification and food preferences.', 'NGO')} />
    <Route path="/ngo/help" element={placeholder('Help & support', 'Guidance for receiving organizations.', 'NGO')} />
    <Route path="/volunteer/dashboard" element={<ProtectedRoute role="VOLUNTEER"><VolunteerDashboard user={user!} /></ProtectedRoute>} />
    <Route path="/volunteer/tasks" element={placeholder('Pickup tasks', 'Assigned pickup and delivery tasks will appear here.', 'VOLUNTEER')} />
    <Route path="/volunteer/impact" element={placeholder('Volunteer impact', 'Track completed deliveries, hours and distance.', 'VOLUNTEER')} />
    <Route path="/volunteer/messages" element={placeholder('Messages', 'Secure task-specific communication will appear here.', 'VOLUNTEER')} />
    <Route path="/volunteer/profile" element={placeholder('Volunteer profile', 'Manage availability, transport and service preferences.', 'VOLUNTEER')} />
    <Route path="/volunteer/help" element={placeholder('Help & support', 'Guidance for volunteers.', 'VOLUNTEER')} />
    <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard user={user!} /></ProtectedRoute>} />
    <Route path="/admin/users" element={placeholder('User management', 'Review users and platform access from the admin workspace.', 'ADMIN')} />
    <Route path="/admin/organizations" element={placeholder('Organization verification', 'Review organizations and verification status.', 'ADMIN')} />
    <Route path="/admin/donations" element={placeholder('Donation management', 'Monitor active, completed and expired donations.', 'ADMIN')} />
    <Route path="/admin/pickups" element={placeholder('Pickup management', 'Monitor pickup scheduling and volunteer assignments.', 'ADMIN')} />
    <Route path="/admin/complaints" element={placeholder('Complaints', 'Review platform complaints and resolution workflow.', 'ADMIN')} />
    <Route path="/admin/analytics" element={placeholder('Analytics', 'Explore platform-wide activity and impact metrics.', 'ADMIN')} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}

export function App() { return <PublicShell><AppRoutes /></PublicShell>; }
