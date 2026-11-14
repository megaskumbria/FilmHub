"use client";

import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { FlagBadge, useFitScale } from "@/entities/flag-badge";
import { flagSoftBackground } from "@/shared/lib";
import { FolderOpen } from "lucide-react";
import { DotGrid, InlineSvg } from "@/shared/ui";
import { useShallow } from "zustand/shallow";
import { memo } from "react";
import { useTranslations } from "next-intl";
import { PreviewFit } from "./PreviewFit";

export const FlagPreview = memo(() => {
  const t = useTranslations("flags");
  const { flag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
    })),
  );

  const { flagName, selectedColor, bgOpacity, selectedFont, selectedIcon, scale } = flag;

  const selectedColorBg = flagSoftBackground(selectedColor, bgOpacity);

  const { svgContent } = selectedIcon ?? {};
  const displayName = flagName || t("newFlag");

  const chipFit = useFitScale();
  const badgeFit = useFitScale();

  return (
    <section className="flex min-w-0 w-full flex-1 flex-col gap-3 rounded-xl border border-border/60 bg-surface-subtle p-4">
      <div className="flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />

        <span className="text-sm font-semibold text-foreground tracking-wide">
          {t("preview.title")}
        </span>
      </div>

      <div className="relative flex h-full w-full min-w-0 flex-col items-center justify-center gap-4 overflow-x-clip rounded-lg border border-border/30 bg-obsidian/60 px-4 py-4">
        <DotGrid />

        <div className="flex items-center gap-1.5">
          <FolderOpen className="size-3.5 shrink-0" />

          <span className="text-sm font-medium text-zinc-muted">{t("preview.scale")}</span>

          <span className="text-foreground font-medium">
            {scale.name || t("preview.notSelected")}
          </span>
        </div>

        <div ref={chipFit.containerRef} className="flex w-full min-w-0 justify-center">
          <PreviewFit fit={chipFit}>
            <div
              className="inline-flex max-h-11.5 items-center gap-1.5 rounded-lg border p-2"
              style={{
                color: selectedColor,
                backgroundColor: selectedColorBg,
                borderColor: selectedColor,
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
                fontFamily: selectedFont,
              }}
            >
              {svgContent && <InlineSvg svg={svgContent} className="size-8 shrink-0" />}

              <span
                className="text-lg font-bold whitespace-nowrap"
                style={{ color: selectedColor, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
              >
                {displayName}
              </span>
            </div>
          </PreviewFit>
        </div>

        <div
          ref={badgeFit.containerRef}
          className="flex w-full min-w-0 items-center justify-center gap-3"
        >
          <span ref={badgeFit.reservedRef} className="shrink-0 text-sm text-zinc-muted">
            {t("preview.badgeStyle")}
          </span>

          <PreviewFit fit={badgeFit}>
            <FlagBadge
              flagItem={{
                flagName: displayName,
                color: selectedColor,
                bgOpacity,
                fontFamily: selectedFont,
                icon: selectedIcon,
              }}
            />
          </PreviewFit>
        </div>
      </div>
    </section>
  );
});
