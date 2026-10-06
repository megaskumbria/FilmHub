"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

export const useProfileEditSchema = () => {
  const t = useTranslations("collections.profile.validation");

  return z.object({
    nickname: z.string().trim().min(2, t("nicknameMin")).max(24, t("nicknameMax")),
    tag: z.string().trim().min(3, t("tagMin")).max(16, t("tagMax")),
    bio: z.string().trim().max(100, t("bioMax")),
  });
};

export type ProfileEditSchema = z.infer<ReturnType<typeof useProfileEditSchema>>;
