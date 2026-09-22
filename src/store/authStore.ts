import { create } from 'zustand';
import { UserRole, Profile } from '../types/database';

interface AuthState {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  
  // Actions
  setAuth: (user: Profile | null, token: string | null, role: UserRole) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  role: 'visitor',
  isAuthenticated: false,
  isLoading: true,
  token: null,

  setAuth: (user, token, role) => {
    set({
      user,
      token,
      role,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  logout: () => {
    set({
      user: null,
      token: null,
      role: 'visitor',
      isAuthenticated: false,
      isLoading: false,
    });
  }
}));
