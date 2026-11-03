"use client";

import { useTranslations } from "next-intl";
import { useGetFlagsScale } from "../lib/useGetFlagsScale";
import { ScaleRung } from "./ScaleRung";

const FALLBACK_COLOR = "var(--accent)";

interface Props {
  scaleId: string;
  scaleName: string;
  currentFlagId: string;
}

export const FlagScaleContent = ({ scaleId, scaleName, currentFlagId }: Props) => {
  const t = useTranslations("flags");
  const { data: scale } = useGetFlagsScale(scaleId);

  if (!scale) return null;

  const total = scale.length;
  const currentIndex = scale.findIndex(({ id }) => id === currentFlagId);
  const currentColor = scale[currentIndex]?.color ?? FALLBACK_COLOR;

  return (
    <article
      className="flex flex-col gap-3 p-4"
      style={{
        backgroundImage: `radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, ${currentColor} 18%, transparent), transparent 65%)`,
      }}
    >
      <header className="flex items-start justify-between gap-6">
        <h4 className="font-unbounded text-base leading-tight font-semibold text-foreground">
          {scaleName}
        </h4>

        {currentIndex >= 0 && (
          <p className="flex items-baseline font-unbounded leading-none tabular-nums">
            <span className="sr-only">{t("level", { current: currentIndex + 1, total })}</span>

            <span aria-hidden className="text-2xl font-bold" style={{ color: currentColor }}>
              {currentIndex + 1}
            </span>

            <span aria-hidden className="text-sm text-zinc-muted">
              /{total}
            </span>
          </p>
        )}
      </header>

      <div className="flex flex-col gap-1">
        <ol className="flex flex-col-reverse">
          {scale.map((flag, index) => (
            <ScaleRung
              key={flag.id}
              flag={flag}
              index={index}
              currentIndex={currentIndex}
              lowerColor={scale[index - 1]?.color}
              upperColor={scale[index + 1]?.color}
            />
          ))}
        </ol>
      </div>
    </article>
  );
};
