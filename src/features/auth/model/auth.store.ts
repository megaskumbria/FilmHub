import { create } from "zustand";
import { API_URL } from "@/shared/constants/constants";
import { apiClient } from "@/shared/api/api-client";

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
  id: string | null;
  email: string | null;
  nickname: string | null;
  avatarUrl: string | null;
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

const EMPTY_USER: User = { id: null, email: null, nickname: null, avatarUrl: null };

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

  setUser: ({ nickname, email, id, avatarUrl }: User) =>
    set({ user: { nickname, email, id, avatarUrl } }),
  setHasHydrated: (value) => set({ hasHydrated: value }),

  signUp: async (data: SignUpData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<AuthResponse>(`${API_URL}/auth/register`, data);

      const { id, email, nickname, avatarUrl } = response.data.user;
      set({ user: { id, email, nickname, avatarUrl }, isLoading: false, hasHydrated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (data: SignInData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<AuthResponse>(`${API_URL}/auth/login`, data);

      const { id, email, nickname, avatarUrl } = response.data.user;
      set({ user: { id, email, nickname, avatarUrl }, isLoading: false, hasHydrated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout() {
    set({ user: EMPTY_USER, hasHydrated: true });
  },
}));
