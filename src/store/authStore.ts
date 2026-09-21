import { create } from 'zustand';
import { UserRole, Profile } from '../types/database';
import { MOCK_PROFILES } from '../lib/mockData';

interface AuthState {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  loginAs: (role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Default to visitor persona for public view
  user: MOCK_PROFILES.find(p => p.role === 'visitor') || null,
  role: 'visitor',
  isAuthenticated: true,
  isLoading: false,

  loginAs: (role: UserRole) => {
    const matchedProfile = MOCK_PROFILES.find(p => p.role === role) || {
      id: `usr-${role}-${Date.now()}`,
      role,
      full_name: role === 'admin' ? 'Victoria Alistair' : role === 'agent' ? 'Marcus Sterling' : 'Jonathan Miller',
      phone: '+254 700 000 000',
      avatar_url: null,
      created_at: new Date().toISOString(),
    };

    set({
      user: matchedProfile,
      role,
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      user: null,
      role: 'visitor',
      isAuthenticated: false,
    });
  },

  setRole: (role: UserRole) => {
    const matchedProfile = MOCK_PROFILES.find(p => p.role === role) || null;
    set({
      role,
      user: matchedProfile,
      isAuthenticated: Boolean(matchedProfile),
    });
  },
}));
