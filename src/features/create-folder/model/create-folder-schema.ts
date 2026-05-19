import { z } from "zod";

export const createFolderSchema = z.object({
  id: z.number().optional(),
  folderName: z.string().trim().max(50, "Name must be less than 50 characters"),
  iconName: z.string(),
  colorHex: z.string(),
});

export type CreateFolderSchema = z.infer<typeof createFolderSchema>;
