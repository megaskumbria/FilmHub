import { FLAG_BACKGROUND_ALPHA } from "../constants/constants";

export const flagSoftBackground = (accent: string) =>
  `color-mix(in srgb, ${accent} ${FLAG_BACKGROUND_ALPHA * 100}%, transparent)`;
