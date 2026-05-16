import { z } from "zod";

export const createFolderSchema = z.object({
  name: z.string().min(4, "Name is required"),
  icon: z.number(),
  color: z.number(),
});

export type CreateFolderSchema = z.infer<typeof createFolderSchema>;
