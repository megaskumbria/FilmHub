"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth";
import { apiClient } from "@/shared/api/api-client";
import { API_URL } from "@/shared/api/config";
import { useSwitchLocale } from "@/shared/hooks/useSwitchLocale";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const switchLocale = useSwitchLocale();

  return async () => {
    try {
      await apiClient.post<string>(`${API_URL}/auth/logout`);
    } finally {
      logout();
      queryClient.removeQueries({ queryKey: ["collection"] });
      queryClient.removeQueries({ queryKey: ["media-collection"] });

      const browserLocale = navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";

      if (!switchLocale(browserLocale)) router.refresh();
    }
  };
};
