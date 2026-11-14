"use client";

import { Dialog, DialogContent, DialogTrigger, Button, DialogFooter } from "@/shared/ui";
import { FlagBadge } from "@/entities/flag-badge/ui/FlagBadge";
import { getPackAccentColor, getPackAccentRgb } from "@/widgets/popular-flags-carousel";
import { Check, FolderPlus } from "lucide-react";
import { ReactNode } from "react";
import { PresetPackModalHeader } from "./PresetPackModalHeader";
import { type PresetPack, useAddPresetPack } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  presetPack: PresetPack;
  children: ReactNode;
}
export const PresetPackModal = ({ presetPack, children }: Props) => {
  const t = useTranslations("flags.packs");
  const { flags, scaleName, isAdded, id } = presetPack;

  const { mutateAsync: addPresetPack, isPending } = useAddPresetPack();

  const handleAddPresetPack = async () => await addPresetPack(id);

  const accentColor = getPackAccentColor(presetPack);
  const accentRgb = getPackAccentRgb(presetPack);

  const isActionDisabled = isAdded || isPending;

  const buttonLabel =
    isAdded ? t("added")
    : isPending ? t("adding")
    : t("add");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="w-full max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden bg-surface p-0 border-border/60 max-md:max-h-[calc(100dvh-1.5rem)] max-md:overflow-y-auto md:max-w-lg"
        showCloseButton={false}
        aria-describedby={undefined}
      >
        <div className="flex flex-col">
          <PresetPackModalHeader presetPack={presetPack} />

          <div className="px-4 py-3 md:px-6 md:py-4">
            <div className="mb-2 flex items-center gap-2 md:mb-3">
              <h3 className="text-xs font-semibold text-zinc-muted uppercase tracking-widest">
                {t("flagsInPack")}
              </h3>

              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
                style={{
                  color: accentColor,
                  backgroundColor: `rgba(${accentRgb}, 0.12)`,
                }}
              >
                {flags.length}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 md:gap-2">
              {flags.map((flag, index) => (
                <div
                  key={flag.id}
                  className="flex items-center gap-2 rounded-xl border border-border/30 bg-white/2 px-2.5 py-1.5 transition-all hover:bg-white/4 hover:border-border/50 md:gap-3 md:px-3 md:py-2.5"
                >
                  <span
                    className="flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold md:size-6 md:text-sm"
                    style={{
                      backgroundColor: `rgba(${accentRgb}, 0.12)`,
                      color: accentColor,
                    }}
                  >
                    {index + 1}
                  </span>

                  <FlagBadge flagItem={flag} />
                </div>
              ))}
            </div>
          </div>

          <DialogFooter
            className="flex-col border-t border-border/40 px-4 py-3 md:px-6 md:py-4"
            style={{
              background: `linear-gradient(to right, rgba(${accentRgb}, 0.04), transparent)`,
            }}
          >
            <div className="mb-2 flex items-center gap-2 md:mb-3">
              <div
                className="h-8 w-0.5 shrink-0 rounded-full shadow-sm md:h-10"
                style={{ backgroundColor: accentColor }}
              />

              <p className="text-xs leading-relaxed text-zinc-muted md:text-sm">
                {t.rich("addHint", {
                  name: scaleName,
                  strong: (chunks) => (
                    <strong className="text-foreground font-medium">{chunks}</strong>
                  ),
                })}
              </p>
            </div>

            <Button
              variant="transparent"
              size="default"
              className={cn(
                "h-8 w-full gap-2 rounded-xl transition-all duration-200 hover:opacity-80 active:scale-95 md:h-9",
                isActionDisabled && "opacity-50 pointer-events-none",
              )}
              style={{
                background: `linear-gradient(to right, ${accentColor}, rgba(${accentRgb}, 0.7))`,
              }}
              onClick={() => void handleAddPresetPack()}
              disabled={isActionDisabled}
            >
              <FolderPlus className="size-4 shrink-0 md:size-5" />

              <span className="font-semibold">{buttonLabel}</span>

              {isAdded && <Check className="ml-auto size-4 shrink-0 md:size-5" />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
