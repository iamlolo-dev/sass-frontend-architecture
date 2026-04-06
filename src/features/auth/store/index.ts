

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthStore, User } from '../login/types';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user: User | null) => 
        set({ user, isAuthenticated: !!user }),

      setToken: (token: string | null) => 
        set({ token }),

      setLoading: (isLoading: boolean) => 
        set({ isLoading }),

      setError: (error: string | null) => 
        set({ error }),

      login: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }),

      logout: () =>
        set({
          ...initialState,
        }),

      clearError: () => 
        set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
