"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateScaleSchema = () => {
  const t = useTranslations("flags.scales");

  return z.object({
    scaleName: z.string().max(25, t("nameMax")),
  });
};

export type CreateScaleSchema = z.infer<ReturnType<typeof useCreateScaleSchema>>;
