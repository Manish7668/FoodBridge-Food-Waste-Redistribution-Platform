import type { User } from '../types';

export function getStoredUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null') as User | null;
  } catch {
    return null;
  }
}

export function logoutStorage() {
  localStorage.removeItem('access');
  localStorage.removeItem('user');
}
