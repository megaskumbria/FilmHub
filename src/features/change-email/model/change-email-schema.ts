"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

export const useChangeEmailSchema = () => {
  const t = useTranslations("settings.security");

  return z.object({
    email: z.string().trim().email(t("emailInvalid")),
  });
};

export type ChangeEmailSchema = z.infer<ReturnType<typeof useChangeEmailSchema>>;
