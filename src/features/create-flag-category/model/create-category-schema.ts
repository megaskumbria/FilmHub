import { z } from "zod";

export const createCategorySchema = z.object({
  categoryName: z.string().max(30, "Name must be less than 30 characters"),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
