import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApiError, api, request } from '../../lib/api';
import type { Role } from '../../types';

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <div className="auth-page"><div className="auth-art"><div className="auth-art-content"><span className="eyebrow">FOODBRIDGE</span><h1>Good food should not go to waste.</h1><p>Connect surplus food with people and communities who can use it.</p><div className="auth-food-cloud">🍅 🥕 🥬 🍞 🍲</div></div></div><div className="auth-panel"><Link to="/" className="auth-brand">🍃 FoodBridge</Link><div className="auth-form-wrap"><span className="eyebrow">WELCOME</span><h2>{title}</h2><p className="auth-subtitle">{subtitle}</p>{children}</div></div></div>;
}

export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); setLoading(true); try { const result = await request<{ user: { id: string; name: string; email: string; role: Role }; access: string }>(api.post('/auth/login', form)); localStorage.setItem('access', result.access); localStorage.setItem('user', JSON.stringify(result.user)); navigate(`/${result.user.role.toLowerCase()}/dashboard`); } catch (e) { setError(getApiError(e, 'Login failed. Check your email and password.')); } finally { setLoading(false); } };
  return <AuthShell title="Welcome back" subtitle="Sign in to continue moving good food forward."><form onSubmit={submit} className="auth-form"><label>Email<input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label><label>Password<input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>{error && <div className="form-error">{error}</div>}<button className="primary-button full-button" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button><p className="auth-switch">New to FoodBridge? <Link to="/register">Create an account</Link></p></form></AuthShell>;
}

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<{ name: string; email: string; password: string; role: Role }>({ name: '', email: '', password: '', role: 'DONOR' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); setLoading(true); try { const result = await request<{ user: { id: string; name: string; email: string; role: Role }; access: string }>(api.post('/auth/register', form)); localStorage.setItem('access', result.access); localStorage.setItem('user', JSON.stringify(result.user)); navigate(`/${result.user.role.toLowerCase()}/dashboard`); } catch (e) { setError(getApiError(e, 'Registration failed.')); } finally { setLoading(false); } };
  return <AuthShell title="Create your account" subtitle="Choose how you want to participate in FoodBridge."><form onSubmit={submit} className="auth-form"><label>Name<input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} minLength={2} required /></label><label>Email<input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label><label>Password<input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={8} required /></label><label>Account type<select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}><option value="DONOR">Donor / Business</option><option value="NGO">NGO / Shelter</option><option value="VOLUNTEER">Volunteer</option></select></label>{error && <div className="form-error">{error}</div>}<button className="primary-button full-button" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button><p className="auth-switch">Already registered? <Link to="/login">Login</Link></p></form></AuthShell>;
}
