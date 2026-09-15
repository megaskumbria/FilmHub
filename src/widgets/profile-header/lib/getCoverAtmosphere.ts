export interface CoverAtmosphere {
  background: string;
  streak: {
    angle: number;
    color: string;
  };
  grainFrequency: number;
  grainOpacity: number;
}

const hashSeed = (seed: string): number => {
  let hash = 2166136261;

  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const channel = (hash: number, shift: number, min: number, max: number): number => {
  const span = max - min + 1;
  return min + ((hash >>> shift) % span);
};

export const getCoverAtmosphere = (seed: string): CoverAtmosphere => {
  const hash = hashSeed(seed);
  const hue = channel(hash, 0, 248, 298);
  const hueShift = channel(hash, 8, 16, 38);
  const satA = channel(hash, 4, 52, 74);
  const satB = channel(hash, 12, 42, 64);
  const lightA = channel(hash, 16, 46, 60);
  const lightB = channel(hash, 20, 38, 52);

  const blobA = {
    x: channel(hash, 2, 12, 38),
    y: channel(hash, 6, 18, 48),
    color: `hsla(${hue}, ${satA}%, ${lightA}%, 0.78)`,
  };

  const blobB = {
    x: channel(hash, 10, 62, 92),
    y: channel(hash, 14, 22, 58),
    color: `hsla(${(hue + hueShift) % 360}, ${satB}%, ${lightB}%, 0.7)`,
  };

  const blobC = {
    x: channel(hash, 18, 32, 68),
    y: channel(hash, 22, 62, 88),
    color: `hsla(${(hue + 340) % 360}, ${channel(hash, 5, 40, 58)}%, ${channel(hash, 9, 32, 46)}%, 0.62)`,
  };

  const background = [
    `radial-gradient(ellipse 95% 90% at ${blobA.x}% ${blobA.y}%, ${blobA.color} 0%, transparent 62%)`,
    `radial-gradient(ellipse 90% 95% at ${blobB.x}% ${blobB.y}%, ${blobB.color} 0%, transparent 60%)`,
    `radial-gradient(ellipse 110% 80% at ${blobC.x}% ${blobC.y}%, ${blobC.color} 0%, transparent 68%)`,
    "linear-gradient(180deg, #24242c 0%, #1e1e24 100%)",
  ].join(", ");

  return {
    background,
    streak: {
      angle: channel(hash, 7, 12, 28),
      color: `hsla(${hue}, 78%, 76%, 0.16)`,
    },
    grainFrequency: 0.55 + channel(hash, 3, 0, 25) / 100,
    grainOpacity: 0.2 + channel(hash, 11, 0, 10) / 100,
  };
};
