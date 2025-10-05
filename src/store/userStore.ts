import { create } from 'zustand';

interface CreatedUserStore {
  name?: string;
  email?: string;
  password?: string;
  birthdate?: Date;
  role?: string;
  message?: string;

  setName(name: string): void
  setEmail(email: string): void
  setPassword(password: string): void
  setBirthdate(birthdate: Date): void
  setRole(role: string): void
  setMessage(message: string): void
}

export const useCreatedUserStore = create<CreatedUserStore>((set) => ({
  name: '',
  email: '',
  password: '',
  birthdate: new Date(),
  role: '',
  message: '',

  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setBirthdate: (birthdate) => set({ birthdate }),
  setRole: (role) => set({ role }),
  setMessage: (message) => set({ message }),

}))