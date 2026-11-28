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

  const { flagName, selectedFont, selectedIcon } = flag;

  return (
    <section className="rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-4 flex-1">
      <div className="flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <span className="text-sm font-semibold text-foreground tracking-wide">{t("title")}</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold text-zinc-muted uppercase tracking-wider">
          {t("flagName")}
        </Label>

        <Input
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
            className="data-[max-length=true]:text-red-500 text-xs text-zinc-muted/50"
          >
            {flagName.length}/30
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <Label className="text-xs font-semibold text-zinc-muted uppercase tracking-wider">
          {t("font")}
        </Label>

        <FontPicker
          value={selectedFont}
          onChange={(family) => updateStateFlag({ selectedFont: family })}
        />

        <p className="text-xs text-zinc-muted/50">
          {t("selected")} {selectedFont}
        </p>
      </div>

      <FlagIconPicker selectedIcon={selectedIcon} />
    </section>
  );
});
