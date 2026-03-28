import { FLAG_BACKGROUND_ALPHA } from "../constants/constants";

export const hexToFlagBg = (color: string) => {
  return `color-mix(in srgb, ${color} ${FLAG_BACKGROUND_ALPHA * 100}%, transparent)`;
};
