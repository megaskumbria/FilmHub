export const FLAG_BACKGROUND_ALPHA = 0.38;

export const flagSoftBackground = (accent: string, alpha?: number) =>
  `color-mix(in srgb, ${accent} ${(alpha ?? FLAG_BACKGROUND_ALPHA) * 100}%, transparent)`;
