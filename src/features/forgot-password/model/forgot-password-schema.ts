"use client";

import { useTranslations } from "next-intl";
import z from "zod";

export const useEmailSchema = () => {
  const t = useTranslations("auth.validation");

  return z.object({
    email: z.string().email(t("email")),
  });
};

export const useCodeSchema = () => {
  const t = useTranslations("auth.validation");

  return z.object({
    code: z
      .string()
      .trim()
      .regex(/^\d{6}$/, t("code")),
  });
};

export const useForgotPasswordSchema = () => {
  const t = useTranslations("auth.validation");

  return z
    .object({
      password: z.string().min(8, t("passwordMin")),
      confirmPassword: z.string().min(1, t("passwordMatch")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordMatch"),
      path: ["confirmPassword"],
    });
};

export type EmailSchema = z.infer<ReturnType<typeof useEmailSchema>>;
export type CodeSchema = z.infer<ReturnType<typeof useCodeSchema>>;
export type ForgotPasswordSchema = z.infer<ReturnType<typeof useForgotPasswordSchema>>;
