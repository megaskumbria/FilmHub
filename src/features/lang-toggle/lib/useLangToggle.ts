import { apiClient } from "@/shared/api/api-client";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/shared/api/config";

interface UseLangToggleArgs {
  language: "en" | "ru";
}

export const useLangToggle = () => {
  return useMutation({
    mutationFn: async ({ language }: UseLangToggleArgs) => {
      return await apiClient.patch(`${API_URL}/profile/language`, { language });
    },
  });
};
