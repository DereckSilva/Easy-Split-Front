import { create } from 'zustand';

interface CreatedUserMessageStore {
  name?: string;
  email?: string;
  password?: string;
  birthdate?: string
  role?: string;
  message?: string;
  error: boolean;

  setName(name: string): void
  setEmail(email: string): void
  setPassword(password: string): void
  setBirthdate(birthdate: string): void
  setRole(role: string): void
  setMessage(message: string): void
  setError(error: boolean): void
  setInitializeAttributes(): void
}

export const useCreatedUserMessageStore = create<CreatedUserMessageStore>((set) => ({
  name: '',
  email: '',
  password: '',
  birthdate: '',
  role: '',
  message: '',
  error: false,

  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setBirthdate: (birthdate) => set({ birthdate }),
  setRole: (role) => set({ role }),
  setMessage: (message) => set({ message }),
  setError: (error) => set({error}),
  setInitializeAttributes: () => set({
    name: '',
    email: '',
    password: '',
    birthdate: '',
    role: '',
    message: '',
    error: false
  })

}))