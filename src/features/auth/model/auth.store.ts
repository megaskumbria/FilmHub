import { create } from "zustand";
import { API_URL } from "@/shared/api/config";
import { apiClient } from "@/shared/api/api-client";

export type Language = "ru" | "en";

export interface SignUpData {
  nickname: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface User {
  id: string | null;
  email: string | null;
  nickname: string | null;
  avatarUrl: string | null;
  language: Language;
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

const EMPTY_USER: User = { id: null, email: null, nickname: null, avatarUrl: null, language: "en" };

interface Store {
  user: User;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  setHasHydrated: (value: boolean) => void;

  signUp: (data: SignUpData) => Promise<User>;
  signIn: (data: SignInData) => Promise<User>;
  isLoading: boolean;

  logout: () => void;
}

export const useAuthStore = create<Store>((set) => ({
  user: EMPTY_USER,
  hasHydrated: false,

  isLoading: false,

  setUser: ({ nickname, email, id, avatarUrl, language }: User) =>
    set({ user: { nickname, email, id, avatarUrl, language } }),
  setHasHydrated: (value) => set({ hasHydrated: value }),

  signUp: async (data: SignUpData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<AuthResponse>(`${API_URL}/auth/register`, data);

      const { id, email, nickname, avatarUrl, language } = response.data.user;
      const user: User = { id, email, nickname, avatarUrl, language };

      set({ user, isLoading: false, hasHydrated: true });
      return user;
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (data: SignInData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<AuthResponse>(`${API_URL}/auth/login`, data);

      const { id, email, nickname, avatarUrl, language } = response.data.user;
      const user: User = { id, email, nickname, avatarUrl, language };

      set({ user, isLoading: false, hasHydrated: true });
      return user;
    } finally {
      set({ isLoading: false });
    }
  },

  logout() {
    set({ user: EMPTY_USER, hasHydrated: true });
  },
}));
