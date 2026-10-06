"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

export const useChangePasswordSchema = () => {
  const t = useTranslations("settings.security");

  return z
    .object({
      currentPassword: z.string().min(1, t("currentRequired")),
      newPassword: z.string().min(8, t("passwordMin")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwordMismatch"),
      path: ["confirmPassword"],
    });
};

export type ChangePasswordSchema = z.infer<ReturnType<typeof useChangePasswordSchema>>;
