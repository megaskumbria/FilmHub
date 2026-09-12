import { create } from "zustand";
import { API_URL } from "@/shared/constants/constants";
import { apiClient } from "@/shared/api/api-client";

export interface InitialUser {
  sub: string;
  email: string;
  username: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface User {
  username: string | null;
  email: string | null;
  id: string | null;
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

const EMPTY_USER: User = { username: null, email: null, id: null };

interface Store {
  user: User;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  setHasHydrated: (value: boolean) => void;

  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  isLoading: boolean;

  logout: () => void;
}

export const useAuthStore = create<Store>((set) => ({
  user: EMPTY_USER,
  hasHydrated: false,

  isLoading: false,

  setUser: ({ username, email, id }: User) => set({ user: { username, email, id } }),
  setHasHydrated: (value) => set({ hasHydrated: value }),

  signUp: async (data: SignUpData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<AuthResponse>(`${API_URL}/auth/register`, data);

      const { username, email, id } = response.data.user;
      set({ user: { username, email, id }, isLoading: false, hasHydrated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (data: SignInData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<AuthResponse>(`${API_URL}/auth/login`, data);

      const { username, email, id } = response.data.user;
      set({ user: { username, email, id }, isLoading: false, hasHydrated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout() {
    set({ user: EMPTY_USER, hasHydrated: true });
  },
}));
