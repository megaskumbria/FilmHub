import { AVATAR_COLORS } from "../model";

const HASH_MULTIPLIER = 31;

export const getAvatarColor = (userId: string): string => {
  let hash = 0;

  for (const char of userId) {
    hash = (hash * HASH_MULTIPLIER + char.charCodeAt(0)) | 0;
  }

  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};
