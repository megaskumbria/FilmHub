"use client";

import { useTranslations } from "next-intl";
import z from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// const emailOrPhone = z
//   .string()
//   .min(1, "Enter email or phone")
//   .refine(
//     (val) => z.string().email().safeParse(val).success || /^\+?[\d\s()-]{10,}$/.test(val),
//     "Invalid email or phone number",
//   );

export const useSignInSchema = () => {
  const t = useTranslations("auth.validation");

  return z.object({
    email: z.string().email(t("email")),
    password: z.string().min(8, t("passwordMin")),
  });
};

export const useSignUpSchema = () => {
  const t = useTranslations("auth.validation");

  return z.object({
    email: z.string().email(t("email")),
    nickname: z.string().min(5, t("nicknameMin")),
    password: z.string().min(8, t("passwordMin")),
  });
};

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
export type SignInSchema = z.infer<ReturnType<typeof useSignInSchema>>;

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export type SignUpSchema = z.infer<ReturnType<typeof useSignUpSchema>>;
