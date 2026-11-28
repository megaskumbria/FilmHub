"use client";

import { FlagBadge } from "@/entities/flag-badge";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { flagSoftBackground } from "@/shared/lib";
import { Button, DotGrid, InlineSvg } from "@/shared/ui";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useShallow } from "zustand/shallow";
import type { PickerIcon } from "../model/types";

interface Props {
  previewIcon: PickerIcon | null;
}

export const IconTryOnStage = ({ previewIcon }: Props) => {
  const t = useTranslations("flags");

  const reduceMotion = useReducedMotion();

  const { flag, updateStateFlag } = useCreationFlagStore(
    useShallow((state) => ({ flag: state.flag, updateStateFlag: state.updateStateFlag })),
  );

  const { flagName, selectedColor, bgOpacity, selectedFont, selectedIcon } = flag;

  const selected: PickerIcon | null =
    selectedIcon?.svgContent ?
      {
        id: selectedIcon.iconId,
        iconName: selectedIcon.iconName ?? "",
        svgContent: selectedIcon.svgContent,
      }
    : null;

  const shown = previewIcon ?? selected;
  const isTryingOn = !!previewIcon && previewIcon.id !== selected?.id;

  return (
    <figure
      className="relative isolate flex h-52 shrink-0 flex-col overflow-hidden border-b border-border/60"
      style={{
        background: `radial-gradient(120% 90% at 50% 38%, ${flagSoftBackground(selectedColor, 0.16)}, transparent 70%)`,
      }}
    >
      <DotGrid />

      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div
          className="relative flex size-18 items-center justify-center rounded-2xl border transition-[border-style,border-color] duration-200"
          style={
            shown ?
              {
                color: selectedColor,
                borderColor: selectedColor,
                backgroundColor: flagSoftBackground(selectedColor, bgOpacity),
                boxShadow: `0 12px 40px -12px ${selectedColor}`,
              }
            : { borderStyle: "dashed", borderColor: "var(--border)" }
          }
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {shown && (
              <motion.span
                key={shown.id}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="flex"
              >
                <InlineSvg svg={shown.svgContent} className="size-10" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className={isTryingOn ? "opacity-80" : undefined}>
          <FlagBadge
            flagItem={{
              flagName: flagName.trim() || t("bar.untitled"),
              color: selectedColor,
              bgOpacity,
              fontFamily: selectedFont,
              icon:
                shown ?
                  { iconId: shown.id, iconName: shown.iconName, svgContent: shown.svgContent }
                : null,
            }}
          />
        </div>
      </div>

      <figcaption className="flex h-11 items-center justify-between gap-3 px-4 text-sm">
        {shown ?
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="shrink-0 text-xs text-zinc-muted">
              {isTryingOn ? t("iconPicker.tryingOn") : t("iconPicker.onFlag")}
            </span>
            <span className="truncate text-foreground">{shown.iconName}</span>
          </span>
        : <span className="text-xs text-zinc-muted">{t("iconPicker.stageHint")}</span>}

        {selected && (
          <Button
            variant="soft"
            size="xs"
            onClick={() => updateStateFlag({ selectedIcon: null })}
            className="shrink-0"
          >
            <IconX />
            {t("iconPicker.remove")}
          </Button>
        )}
      </figcaption>
    </figure>
  );
};
