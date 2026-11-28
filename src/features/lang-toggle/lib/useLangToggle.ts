import { apiClient } from "@/shared/api/api-client";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/shared/api/config";
import type { Locale } from "@/shared/config/i18n/locales-config";

interface UseLangToggleArgs {
  language: Locale;
}

export const useLangToggle = () => {
  return useMutation({
    mutationFn: async ({ language }: UseLangToggleArgs) => {
      return await apiClient.patch(`${API_URL}/profile/language`, { language });
    },
  });
};
