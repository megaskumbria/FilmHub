import axios from "axios";
import { apiClient } from "@/shared/api/api-client";
import { API_URL } from "@/shared/api/config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth";
import { type ApiFieldError } from "@/shared/types/api-error-types";

export const isEmailTakenError = (error: unknown) =>
  axios.isAxiosError<ApiFieldError>(error) && error.response?.data.status === "EMAIL_EXISTS";

export const useChangeEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return await apiClient.post(`${API_URL}/auth/change-email`, {
        email,
      });
    },

    onSuccess: (_data, email) => {
      const { user, setUser } = useAuthStore.getState();
      setUser({ ...user, email });

      toast.success("Email changed successfully");
    },

    onError: (error) => {
      if (isEmailTakenError(error)) return;

      toast.error("Failed to change email");
    },
  });
};
