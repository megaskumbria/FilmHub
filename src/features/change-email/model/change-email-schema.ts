import { z } from "zod";

export const changeEmailSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
});

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;
