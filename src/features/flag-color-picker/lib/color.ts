interface Rgb {
  r: number;
  g: number;
  b: number;
}

const FALLBACK: Rgb = { r: 128, g: 128, b: 128 };
const REELS_COUNT = 3;
const NEUTRAL_SATURATION = 0.15;

export const parseColor = (color: string): Rgb => {
  const value = color.trim();

  if (value.startsWith("#")) {
    const hex = value.slice(1);
    const full =
      hex.length <= 4 ?
        hex
          .split("")
          .map((char) => char + char)
          .join("")
      : hex;
    const int = Number.parseInt(full.slice(0, 6), 16);

    if (Number.isNaN(int)) return FALLBACK;

    return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
  }

  const channels = value.match(/-?\d*\.?\d+/g)?.map(Number);

  if (!channels || channels.length < 3) return FALLBACK;

  const [r, g, b] = channels;

  return { r, g, b };
};

export const toHex = (color: string) => {
  const { r, g, b } = parseColor(color);

  return `#${[r, g, b]
    .map((channel) =>
      Math.max(0, Math.min(255, Math.round(channel)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")
    .toUpperCase()}`;
};

const toHsl = ({ r, g, b }: Rgb) => {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  if (delta === 0) return { h: 0, s: 0, l };

  const s = delta / (1 - Math.abs(2 * l - 1));

  let h = 0;
  if (max === rn) h = ((gn - bn) / delta) % 6;
  else if (max === gn) h = (bn - rn) / delta + 2;
  else h = (rn - gn) / delta + 4;

  return { h: (h * 60 + 360) % 360, s, l };
};

/** Ink colour that stays readable on top of the given fill. */
export const readableInk = (color: string) => {
  const { r, g, b } = parseColor(color);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.6 ? "#0a0a0a" : "#fafafa";
};

const splitEvenly = <T>(items: T[], parts: number) => {
  const size = Math.ceil(items.length / parts);

  return Array.from({ length: parts }, (_, index) => items.slice(index * size, (index + 1) * size));
};

/**
 * Lays presets out as "movie barcode" reels: light, mid and deep tones,
 * each one sweeping through the hue circle and fading out into neutrals.
 */
export const buildReels = (colors: string[]) => {
  const entries = colors.map((color) => ({ color, ...toHsl(parseColor(color)) }));
  const byLightness = (a: { l: number }, b: { l: number }) => b.l - a.l;

  const chromatic = entries.filter((entry) => entry.s >= NEUTRAL_SATURATION).sort(byLightness);
  const neutral = entries.filter((entry) => entry.s < NEUTRAL_SATURATION).sort(byLightness);

  const chromaticReels = splitEvenly(chromatic, REELS_COUNT);
  const neutralReels = splitEvenly(neutral, REELS_COUNT);

  return chromaticReels
    .map((reel, index) =>
      [...reel.sort((a, b) => a.h - b.h), ...neutralReels[index]].map((entry) => entry.color),
    )
    .filter((reel) => reel.length > 0);
};
