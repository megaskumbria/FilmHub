import { apiClient } from "@/shared/api/api-client";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore, type AuthResponse } from "../model/auth.store";
import { useSyncAuthSession, useSwitchLocale } from "@/shared/hooks";
import { useAuthModalStore } from "../model/auth-modal.store";

interface ForgotPasswordResponse {
  message: string;
  status: "RECOVERY_CODE_SENT";
}

interface VerifyRecoveryResponse {
  resetToken: string;
}

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

interface ResetPasswordArgs {
  resetToken: string;
  newPassword: string;
}

export const useResetPassword = () => {
  const syncAuthSession = useSyncAuthSession();
  const switchLocale = useSwitchLocale();

  return useMutation({
    mutationFn: async ({ resetToken, newPassword }: ResetPasswordArgs) => {
      const response = await apiClient.post<AuthResponse>("/auth/reset-password", {
        resetToken,
        newPassword,
      });
      return response.data;
    },

    onSuccess: (data) => {
      const { setUser } = useAuthStore.getState();
      setUser({ ...data.user });

      syncAuthSession();
      switchLocale(data.user.language);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await apiClient.post<ForgotPasswordResponse>("/auth/forgot-password", {
        email,
      });
      return response.data;
    },
  });
};

interface VerifyRecoveryArgs {
  email: string;
  code: string;
}

export const useVerifyRecoveryPassword = () => {
  return useMutation({
    mutationFn: async ({ email, code }: VerifyRecoveryArgs) => {
      const response = await apiClient.post<VerifyRecoveryResponse>(
        "/auth/verify-recovery-password",
        {
          email,
          code,
        },
      );
      return response.data;
    },
  });
};
