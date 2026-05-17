import { z } from "zod";

export const createFolderSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  icon: z.string(),
  color: z.string(),
});

export type CreateFolderSchema = z.infer<typeof createFolderSchema>;
