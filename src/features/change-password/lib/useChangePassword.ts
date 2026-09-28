import { apiClient } from "@/shared/api/api-client";
import { API_URL } from "@/shared/api/config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { type ApiFieldError } from "@/shared/types/api-error-types";

export const isPasswordIncorrectError = (error: unknown) => {
  return (
    axios.isAxiosError<ApiFieldError>(error) && error.response?.data.status === "INVALID_PASSWORD"
  );
};

export const isSamePasswordError = (error: unknown) => {
  return (
    axios.isAxiosError<ApiFieldError>(error) && error.response?.data.status === "PASSWORD_SAME"
  );
};

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => {
      return apiClient.patch(`${API_URL}/auth/change-password`, payload);
    },

    onSuccess: () => {
      toast.success("Password changed successfully");
    },

    onError: (error) => {
      if (isPasswordIncorrectError(error) || isSamePasswordError(error)) return;

      toast.error("Failed to change password");
    },
  });
};
