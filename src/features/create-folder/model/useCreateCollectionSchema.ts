"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateCollectionSchema = () => {
  const t = useTranslations("collections.create");

  return z.object({
    collectionName: z.string().trim().max(50, t("nameMax")),
    iconName: z.string(),
    colorHex: z.string(),
  });
};

export type CreateCollectionSchema = z.infer<ReturnType<typeof useCreateCollectionSchema>>;
