import { z } from "zod";

export const profileEditSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(2, "Nickname must be at least 2 characters")
    .max(24, "Nickname must be less than 24 characters"),
  tag: z
    .string()
    .trim()
    .min(3, "Tag must be at least 3 characters")
    .max(16, "Tag must be less than 16 characters"),
  bio: z.string().trim().max(100, "Bio must be less than 100 characters"),
});

export type ProfileEditSchema = z.infer<typeof profileEditSchema>;
