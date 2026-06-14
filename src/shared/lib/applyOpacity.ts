export const applyOpacity = (color: string, opacity: number) => {
  return color.replace(/[\d.]+\)$/, `${opacity})`);
};
