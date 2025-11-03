// store/auth.ts
import { create } from 'zustand';
import api from '../api/api';

export type AuthState = {
  token?: string | null;
  login: (token?: string | null) => void;
  logout: () => void;
};

// Read any persisted token from localStorage so the user stays logged in after a refresh
const persistedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
if (persistedToken) {
  // Ensure axios sends the Authorization header on initial load
  api.defaults.headers.common['Authorization'] = `Bearer ${persistedToken}`;
}

export const useAuth = create<AuthState>((set) => ({
  token: persistedToken,
  login: (token: AuthState['token']) => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    set({ token: null });
  },
}));
