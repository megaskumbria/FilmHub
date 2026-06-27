import { z } from "zod";

export const createCategorySchema = z.object({
  categoryName: z.string().max(40, "Name must be less than 40 characters"),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
