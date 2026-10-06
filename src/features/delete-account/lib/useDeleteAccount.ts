import { useTranslations } from "next-intl";
import axios from "axios";
import { apiClient } from "@/shared/api/api-client";
import { API_URL } from "@/shared/api/config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { type ApiFieldError } from "@/shared/types/api-error-types";

export const isPasswordIncorrectError = (error: unknown) => {
  return (
    axios.isAxiosError<ApiFieldError>(error) && error.response?.data.status === "INVALID_PASSWORD"
  );
};

export const useDeleteAccount = () => {
  const t = useTranslations("settings.deleteAccount");

  return useMutation({
    mutationFn: (password: string) => {
      return apiClient.delete(`${API_URL}/auth/account`, {
        data: {
          password,
        },
      });
    },

    onError: (error) => {
      if (isPasswordIncorrectError(error)) return;

      toast.error(t("failed"));
    },
  });
};
