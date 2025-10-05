import { create } from 'zustand';

type cadUser = {
  name?: string;
  email?: string;
  password?: string;
  birthdate?: Date;
  role?: string;
  message?: string;
}

interface AuthStore {
  user: { id: number, email: string, name: string } | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: { id: number, email: string, name: string }, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => set({
    token, 
    user,
    isAuthenticated: true
  }),

  logout: () => set({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  setToken: (token) => set({
    token
  })
}))