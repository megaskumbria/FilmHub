import { z } from "zod";

export const createFolderSchema = z.object({
  folderName: z.string().min(3, "Name must be at least 3 characters long"),
  iconName: z.string(),
  colorHex: z.string(),
});

export type CreateFolderSchema = z.infer<typeof createFolderSchema>;
