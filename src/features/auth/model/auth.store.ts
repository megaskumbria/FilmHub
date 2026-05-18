import { create } from "zustand";
import { API_URL } from "@/shared/constants/constants";
import { apiClient } from "@/shared/api/api-client";

export interface ISignUpData {
  username: string;
  email: string;
  password: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IUser {
  username: string | null;
  email: string | null;
  id: string | null;
}

interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

interface AuthStore {
  user: IUser;
  setUser: (user: IUser) => void;

  signUp: (data: ISignUpData) => Promise<void>;
  signIn: (data: ISignInData) => Promise<void>;
  isLoading: boolean;

  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: { username: null, email: null, id: null },
  setUser: ({ username, email, id }: IUser) => set({ user: { username, email, id } }),
  isLoading: false,

  signUp: async (data: ISignUpData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<IAuthResponse>(`${API_URL}/auth/register`, data);

      const { username, email, id } = response.data.user;
      set({ user: { username, email, id }, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (data: ISignInData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<IAuthResponse>(`${API_URL}/auth/login`, data);

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
