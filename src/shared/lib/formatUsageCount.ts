export const formatUsageCount = (usageCount: number): string => {
  if (usageCount >= 1000) return `${(usageCount / 1000).toFixed(1).replace(".0", "")}K`;
  return String(usageCount);
};
