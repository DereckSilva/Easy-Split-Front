import { create } from 'zustand';

interface AuthStore {
  user: { id: number, email: string, name: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  error: {message: string} | null;

  login: (user: { id: number, email: string, name: string }, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
  errorUser: (message: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  
  
  errorUser: (message) => set({
    error: message ? { message } : null
  }),

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