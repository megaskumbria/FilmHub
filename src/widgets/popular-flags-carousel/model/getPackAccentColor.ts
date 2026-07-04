import { PresetPack } from "./preset-packs-data";

export const getPackAccentColor = (pack: PresetPack): string => {
  const middleIndex = Math.floor(pack.flags.length / 2);
  return pack.flags[middleIndex].color;
};

export const getPackAccentRgb = (pack: PresetPack): string => {
  return getPackAccentColor(pack).replace("rgba(", "").split(",").slice(0, 3).join(", ");
};
