import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('access')) {
      localStorage.removeItem('access');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('foodbridge:logout'));
    }
    return Promise.reject(error);
  },
);

export async function request<T>(promise: Promise<{ data: { data: T } }>): Promise<T> {
  return (await promise).data.data;
}

export function getApiError(error: unknown, fallback = 'Something went wrong') {
  const value = error as { response?: { data?: { error?: { message?: string } } } };
  return value.response?.data?.error?.message || fallback;
}
