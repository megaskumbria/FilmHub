import { z } from "zod";

export const createCollectionSchema = z.object({
  collectionName: z.string().trim().max(50, "Name must be less than 50 characters"),
  iconName: z.string(),
  colorHex: z.string(),
});

export type CreateCollectionSchema = z.infer<typeof createCollectionSchema>;
