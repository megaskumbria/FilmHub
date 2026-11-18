import { apiClient } from "@/shared/api/api-client";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore, type AuthResponse } from "../model/auth.store";
import { useSyncAuthSession } from "@/shared/hooks";
import { useAuthModalStore } from "../model/auth-modal.store";

export const useGoogleAuth = () => {
  const syncAuthSession = useSyncAuthSession();
  const close = useAuthModalStore((s) => s.close);

  return useMutation({
    mutationFn: async (idToken: string) => {
      const response = await apiClient.post<AuthResponse>("/auth/google", { idToken });
      return response.data;
    },

    onSuccess: (data) => {
      const { setUser } = useAuthStore.getState();
      setUser({ ...data.user });

      syncAuthSession();
      close();

      document.cookie = `accessToken=${data.accessToken}; path=/; SameSite=Lax`;
      document.cookie = `refreshToken=${data.refreshToken}; path=/; SameSite=Lax`;
    },
  });
};
