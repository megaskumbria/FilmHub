"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

export const useDeleteAccountSchema = () => {
  const t = useTranslations("settings.deleteAccount");

  return z.object({
    password: z.string().min(1, t("passwordRequired")),
  });
};

export type DeleteAccountSchema = z.infer<ReturnType<typeof useDeleteAccountSchema>>;
