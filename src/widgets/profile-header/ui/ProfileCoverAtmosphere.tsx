"use client";

import { useId, useMemo } from "react";
import { getCoverAtmosphere } from "../lib/getCoverAtmosphere";

interface Props {
  userId: string;
}

export const ProfileCoverAtmosphere = ({ userId }: Props) => {
  const reactId = useId();
  const grainId = `${reactId.replace(/:/g, "")}-grain`;
  const atmosphere = useMemo(() => getCoverAtmosphere(userId), [userId]);

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-t-2xl pointer-events-none isolate"
      aria-hidden
    >
      <div className="absolute inset-0" style={{ background: atmosphere.background }} />

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${atmosphere.streak.angle}deg, transparent 32%, ${atmosphere.streak.color} 50%, transparent 68%)`,
        }}
      />

      <svg className="absolute inset-0 size-full mix-blend-overlay">
        <filter id={grainId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={atmosphere.grainFrequency}
            numOctaves={4}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${grainId})`}
          opacity={atmosphere.grainOpacity}
        />
      </svg>
    </div>
  );
};
