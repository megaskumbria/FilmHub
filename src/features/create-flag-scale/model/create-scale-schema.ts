import { z } from "zod";

export const createScaleSchema = z.object({
  scaleName: z.string().max(25, "Name must be less than 25 characters"),
});

export type CreateScaleSchema = z.infer<typeof createScaleSchema>;
