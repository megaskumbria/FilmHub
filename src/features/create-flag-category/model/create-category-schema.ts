import { z } from "zod";

export const createCategorySchema = z.object({
  categoryName: z.string().max(25, "Name must be less than 25 characters"),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
