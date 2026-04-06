import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthStore } from './authStore.type'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        //TODO: Mock login - in production this would call the backend
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        }
        set({ user: mockUser, isAuthenticated: true })
      },
      register: async (email, password, name) => {
        //TODO: Mock register - in production this would call the backend
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
          createdAt: new Date().toISOString(),
        }
        set({ user: mockUser, isAuthenticated: true })
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-store',
    }
  )
)
