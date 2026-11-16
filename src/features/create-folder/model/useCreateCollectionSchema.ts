"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

export const COLLECTION_NAME_MAX = 24;

export const useCreateCollectionSchema = () => {
  const t = useTranslations("collections.create");

  return z.object({
    collectionName: z.string().trim().max(COLLECTION_NAME_MAX, t("nameMax")),
    iconName: z.string(),
    colorHex: z.string(),
  });
};

export type CreateCollectionSchema = z.infer<ReturnType<typeof useCreateCollectionSchema>>;
