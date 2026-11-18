import { apiClient } from "@/shared/api/api-client";
import { useMutation } from "@tanstack/react-query";
import { useSyncAuthSession, useSwitchLocale } from "@/shared/hooks";
import { useAuthStore, type AuthResponse } from "@/features/auth";

interface ForgotPasswordResponse {
  message: string;
  status: "RECOVERY_CODE_SENT";
}

interface VerifyRecoveryResponse {
  resetToken: string;
}

interface VerifyRecoveryArgs {
  email: string;
  code: string;
}

interface ResetPasswordArgs {
  resetToken: string;
  newPassword: string;
}

export const useForgotPassword = () => {
  const syncAuthSession = useSyncAuthSession();
  const switchLocale = useSwitchLocale();

  const sendCode = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiClient.post<ForgotPasswordResponse>("/auth/forgot-password", {
        email,
      });
      return response.data;
    },
  });

  const verifyCode = useMutation({
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

  const resetPassword = useMutation({
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

  return { sendCode, verifyCode, resetPassword };
};
