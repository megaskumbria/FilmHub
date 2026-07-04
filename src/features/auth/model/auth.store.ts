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
  username: string | null;
  email: string | null;
  id: string | null;
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

interface AuthStore {
  user: User;
  setUser: (user: User) => void;

  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  isLoading: boolean;

  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: { username: null, email: null, id: null },
  setUser: ({ username, email, id }: User) => set({ user: { username, email, id } }),
  isLoading: false,

  signUp: async (data: SignUpData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<AuthResponse>(`${API_URL}/auth/register`, data);

      const { username, email, id } = response.data.user;
      set({ user: { username, email, id }, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (data: SignInData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<AuthResponse>(`${API_URL}/auth/login`, data);

      const { username, email, id } = response.data.user;
      set({ user: { username, email, id }, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  logout() {
    void apiClient.post<string>(`${API_URL}/auth/logout`);
    set({ user: { username: null, email: null, id: null } });
  },
}));
