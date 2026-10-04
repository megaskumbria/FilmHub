import { z } from "zod";

export interface ProfileValidationMessages {
  nicknameMin: string;
  nicknameMax: string;
  tagMin: string;
  tagMax: string;
  bioMax: string;
}

export const createProfileEditSchema = (messages: ProfileValidationMessages) =>
  z.object({
    nickname: z.string().trim().min(2, messages.nicknameMin).max(24, messages.nicknameMax),
    tag: z.string().trim().min(3, messages.tagMin).max(16, messages.tagMax),
    bio: z.string().trim().max(100, messages.bioMax),
  });

export type ProfileEditSchema = z.infer<ReturnType<typeof createProfileEditSchema>>;
