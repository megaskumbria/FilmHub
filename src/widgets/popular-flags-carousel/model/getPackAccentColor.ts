import { IPresetPack } from "./preset-packs-data";

export const getPackAccentColor = (pack: IPresetPack): string => {
  const middleIndex = Math.floor(pack.flags.length / 2);
  return pack.flags[middleIndex].color;
};

export const getPackAccentRgb = (pack: IPresetPack): string => {
  return getPackAccentColor(pack).replace("rgba(", "").split(",").slice(0, 3).join(", ");
};
