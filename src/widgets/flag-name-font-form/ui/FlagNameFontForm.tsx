"use client";

import { Label, Input, FontPicker } from "@/shared/ui";
import { useCreationFlagStore } from "@/features/creation-flag";
import { useShallow } from "zustand/shallow";
import { memo } from "react";
import { FlagIconPicker } from "@/features";
import { useTranslations } from "next-intl";

export const FlagNameFontForm = memo(() => {
  const t = useTranslations("flags.form");

  const { flag, updateStateFlag } = useCreationFlagStore(
    useShallow((state) => ({
      flag: state.flag,
      updateStateFlag: state.updateStateFlag,
    })),
  );

  const { flagName, selectedFont, selectedIcon, selectedColor } = flag;

  return (
    <section className="flex min-w-0 w-full flex-1 flex-col gap-4 rounded-xl border border-border/60 bg-surface-subtle p-4">
      <div className="flex items-center gap-2">
        <span className="h-4 w-0.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <span className="text-sm font-semibold tracking-wide text-foreground">{t("title")}</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="flag-name"
          className="text-[11px] font-medium tracking-[0.14em] text-zinc-muted"
        >
          {t("flagName")}
        </Label>

        <Input
          id="flag-name"
          variant="neutral"
          placeholder={t("namePlaceholder")}
          className="h-9 text-sm"
          maxLength={30}
          value={flagName}
          onChange={(e) => updateStateFlag({ flagName: e.target.value })}
        />

        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-zinc-muted/50">{t("maxChars")}</p>

          <span
            data-max-length={flagName.length >= 30}
            className="text-xs text-zinc-muted/50 data-[max-length=true]:text-red-500"
          >
            {flagName.length}/30
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-[11px] font-medium tracking-[0.14em] text-zinc-muted">
            {t("font")}
          </Label>

          <FontPicker
            value={selectedFont}
            onChange={(family) => updateStateFlag({ selectedFont: family })}
            accentColor={selectedColor}
          />
        </div>

        <FlagIconPicker selectedIcon={selectedIcon} />
      </div>
    </section>
  );
});
