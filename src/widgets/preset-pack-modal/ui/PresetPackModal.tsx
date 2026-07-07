"use client";

import { Dialog, DialogContent, DialogTrigger, Button, DialogFooter } from "@/shared/ui";
import { FlagBadge } from "@/entities/flag-badge/ui/FlagBadge";
import { getPackAccentColor, getPackAccentRgb } from "@/widgets/popular-flags-carousel";
import { Check, FolderPlus } from "lucide-react";
import { ReactNode } from "react";
import { PresetPackModalHeader } from "./PresetPackModalHeader";
import { type PresetPack, useAddPresetPack } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

interface Props {
  presetPack: PresetPack;
  children: ReactNode;
}
export const PresetPackModal = ({ presetPack, children }: Props) => {
  const { flags, categoryName, isAdded, id } = presetPack;

  const { mutateAsync: addPresetPack, isPending } = useAddPresetPack();

  const handleAddPresetPack = async () => await addPresetPack(id);

  const accentColor = getPackAccentColor(presetPack);
  const accentRgb = getPackAccentRgb(presetPack);

  const isActionDisabled = isAdded || isPending;

  const buttonLabel =
    isAdded ? "Added"
    : isPending ? "Adding..."
    : "Add pack to collection";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="w-full max-w-lg sm:max-w-lg p-0 gap-0 overflow-hidden bg-surface border-border/60"
        showCloseButton={false}
        aria-describedby={undefined}
      >
        <div className="flex flex-col">
          <PresetPackModalHeader presetPack={presetPack} />

          <div className="px-6 py-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-xs font-semibold text-zinc-muted uppercase tracking-widest">
                Flags in this pack
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

            <div className="flex flex-col gap-2">
              {flags.map((flag, index) => (
                <div
                  key={flag.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border/30 bg-white/2 transition-all hover:bg-white/4 hover:border-border/50"
                >
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
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
            className="px-6 py-4 border-t border-border/40 flex-col"
            style={{
              background: `linear-gradient(to right, rgba(${accentRgb}, 0.04), transparent)`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-0.5 h-10 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: accentColor }}
              />

              <p className="text-sm text-zinc-muted leading-relaxed">
                The pack is added as a new category{" "}
                <strong className="text-foreground font-medium">"{categoryName}"</strong> in your
                sidebar. You can edit the flags after adding.
              </p>
            </div>

            <Button
              variant="transparent"
              size="default"
              className={cn(
                "w-full rounded-xl gap-2 hover:opacity-80 transition-all duration-200 active:scale-95",
                isActionDisabled && "opacity-50 pointer-events-none",
              )}
              style={{
                background: `linear-gradient(to right, ${accentColor}, rgba(${accentRgb}, 0.7))`,
              }}
              onClick={() => void handleAddPresetPack()}
              disabled={isActionDisabled}
            >
              <FolderPlus className="size-5 shrink-0" />

              <span className="font-semibold">{buttonLabel}</span>

              {isAdded && <Check className="ml-auto size-5 shrink-0" />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
