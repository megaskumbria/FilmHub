import { FLAG_BACKGROUND_ALPHA } from "../constants/constants";

export const flagSoftBackground = (accent: string, alpha?: number) =>
  `color-mix(in srgb, ${accent} ${(alpha ?? FLAG_BACKGROUND_ALPHA) * 100}%, transparent)`;
