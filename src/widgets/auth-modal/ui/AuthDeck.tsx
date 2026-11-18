"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FlagBadge } from "@/entities";
import { cn } from "@/shared/lib/utils";

export type DeckMode = "signin" | "signup" | "reset";

interface CardPose {
  x: number;
  y: number;
  rotate: number;
}

const POSTERS = [
  "/images/avengers-poster.webp",
  "/images/dune-poster.webp",
  "/images/breaking-bad-poster.jpg",
] as const;

const POSES: Record<DeckMode, CardPose[]> = {
  signin: [
    { x: -10, y: 6, rotate: -7 },
    { x: 9, y: 2, rotate: 5 },
    { x: 0, y: 0, rotate: -1 },
  ],
  signup: [
    { x: -64, y: 16, rotate: -14 },
    { x: 64, y: 16, rotate: 14 },
    { x: 0, y: -6, rotate: 0 },
  ],
  reset: [
    { x: -6, y: 4, rotate: -4 },
    { x: 6, y: 2, rotate: 3 },
    { x: 0, y: 0, rotate: 0 },
  ],
};

interface Props {
  mode: DeckMode;
}

export const AuthDeck = ({ mode }: Props) => {
  const t = useTranslations("auth.deck");

  const isFaceDown = mode === "reset";
  const topIndex = POSTERS.length - 1;

  return (
    <div className="relative h-28 w-32 shrink-0 sm:h-64 sm:w-full" aria-hidden>
      <div className="absolute inset-0 scale-[0.52] perspective-[900px] sm:scale-100">
        {POSTERS.map((src, index) => {
          const { x, y, rotate } = POSES[mode][index];

          return (
            <div
              key={src}
              className="absolute top-1/2 left-1/2 h-48 w-32 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] transform-3d motion-reduce:transition-none"
              style={{
                zIndex: index,
                transitionDelay: `${index * 45}ms`,
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotate}deg) rotateY(${isFaceDown ? 180 : 0}deg)`,
              }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_18px_40px_-12px_rgba(0,0,0,0.85)] ring-1 ring-white/10 backface-hidden">
                <Image src={src} alt="" fill sizes="128px" className="object-cover" />
              </div>

              <div className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_18px_40px_-12px_rgba(0,0,0,0.85)] ring-1 ring-accent/25 backface-hidden transform-[rotateY(180deg)]">
                <Image
                  src="/images/card-shirt.png"
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              {index === topIndex && (
                <div
                  className={cn(
                    "absolute -bottom-3 -left-5 transition-opacity duration-300 motion-reduce:transition-none",
                    isFaceDown && "opacity-0",
                  )}
                >
                  <FlagBadge
                    flagItem={{
                      flagName: t("flag"),
                      color: "#c4a0ff",
                      bgOpacity: 0.3,
                      fontFamily: "Manrope",
                      icon: null,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
