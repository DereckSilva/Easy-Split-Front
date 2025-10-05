import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  isAuthenticated: boolean;

  login: (token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  isAuthenticated: false,

  login: (token) => set({
    token,
    isAuthenticated: true
  }),

  logout: () => set({
    token: null,
    isAuthenticated: false
  }),

  setToken: (token) => set({
    token
  })
}))