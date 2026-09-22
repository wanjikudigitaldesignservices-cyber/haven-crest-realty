import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole, Profile } from '../types/database';
import { MOCK_PROFILES } from '../lib/mockData';

interface AuthState {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  users: (Profile & { email?: string; password?: string })[];
  
  // Actions
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  addUser: (user: Profile & { email?: string; password?: string }) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Default to visitor persona for public view
      user: null,
      role: 'visitor',
      isAuthenticated: false,
      isLoading: false,
      users: [
        {
          ...MOCK_PROFILES[0], // admin
          email: 'admin@havencrest.com',
          password: 'AdminPassword123'
        },
        ...MOCK_PROFILES.filter(p => p.role === 'agent').map(p => ({
          ...p,
          email: `${p.full_name?.split(' ')[0].toLowerCase()}@havencrest.com`,
          password: 'AgentPassword123'
        }))
      ],

      login: (email, password, role) => {
        const { users } = get();
        const matchedUser = users.find(
          u => u.email === email && u.password === password && u.role === role
        );

        if (matchedUser) {
          set({
            user: matchedUser,
            role: matchedUser.role,
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          user: null,
          role: 'visitor',
          isAuthenticated: false,
        });
      },

      addUser: (newUser) => {
        set((state) => ({
          users: [...state.users, newUser],
        }));
      }
    }),
    {
      name: 'havencrest-auth-storage',
      partialize: (state) => ({ users: state.users, user: state.user, role: state.role, isAuthenticated: state.isAuthenticated }),
    }
  )
);
