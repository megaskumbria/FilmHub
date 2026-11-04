"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

const INVALID_TAG_CHARACTERS = /[^a-zA-Z0-9_]/g;

export const sanitizeTag = (value: string): string => value.replace(INVALID_TAG_CHARACTERS, "");

export const useProfileEditSchema = () => {
  const t = useTranslations("collections.profile.validation");

  return z.object({
    nickname: z.string().trim().min(2, t("nicknameMin")).max(24, t("nicknameMax")),
    tag: z
      .string()
      .trim()
      .min(3, t("tagMin"))
      .max(16, t("tagMax"))
      .regex(/^[a-zA-Z0-9_]+$/, t("tagCharset")),
    bio: z.string().trim().max(100, t("bioMax")),
  });
};

export type ProfileEditSchema = z.infer<ReturnType<typeof useProfileEditSchema>>;
