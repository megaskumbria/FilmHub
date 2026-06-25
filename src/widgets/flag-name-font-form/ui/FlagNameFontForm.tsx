"use client";

import {
  Label,
  Input,
  FontPicker,
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  InlineSvg,
  SheetClose,
} from "@/shared/ui";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { useShallow } from "zustand/shallow";
import { memo } from "react";
import { FlagIconPicker } from "@/features";
import { IconPhoto, IconChevronsLeft } from "@tabler/icons-react";

export const FlagNameFontForm = memo(() => {
  const { flagName, selectedFont, selectedColor, selectedIcon, setFlagName, setSelectedFont } =
    useCreationFlagStore(
      useShallow((state) => ({
        flagName: state.flagName,
        selectedFont: state.selectedFont,
        selectedColor: state.selectedColor,
        selectedIcon: state.selectedIcon,
        setFlagName: state.setFlagName,
        setSelectedFont: state.setSelectedFont,
      })),
    );

  const { iconName, svgContent } = selectedIcon ?? {};

  return (
    <section className="rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-4 flex-1">
      <div className="flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <span className="text-sm font-semibold text-foreground tracking-wide">Settings</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-semibold text-zinc-muted uppercase tracking-wider">
          Flag name
        </Label>

        <Input
          variant="neutral"
          placeholder="Enter a name..."
          className="h-9 text-sm"
          maxLength={30}
          value={flagName}
          onChange={(e) => setFlagName(e.target.value, selectedColor)}
        />

        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-zinc-muted/50">Up to 30 characters</p>

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
          Font
        </Label>

        <FontPicker value={selectedFont} onChange={(family) => setSelectedFont(family)} />

        <p className="text-xs text-zinc-muted/50">Selected: {selectedFont}</p>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <Label className="text-xs font-semibold text-zinc-muted uppercase tracking-wider">
          Icon
        </Label>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-9 justify-between px-3 border-border/60 bg-surface text-zinc-muted hover:bg-white/5 hover:text-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
                {svgContent ?
                  <InlineSvg svg={svgContent} className="size-6 shrink-0 text-zinc-muted" />
                : <IconPhoto className="size-6 shrink-0 text-zinc-muted" />}

                <span className="text-sm truncate">{iconName ?? "Choose an icon..."}</span>
              </div>
            </Button>
          </SheetTrigger>

          <SheetContent
            showCloseButton={false}
            isHideOverlay={true}
            side="left"
            className="w-full p-0 border-border/60 bg-surface-subtle flex flex-col gap-0 z-1000 h-screen overflow-hidden"
          >
            <SheetHeader className="px-4 pt-4 pb-3 border-b border-border/60 flex items-center justify-between flex-row">
              <SheetTitle className="text-sm font-semibold text-foreground">
                Choose an icon
              </SheetTitle>

              <SheetClose className="cursor-pointer">
                <IconChevronsLeft className="size-5 shrink-0" />
              </SheetClose>
            </SheetHeader>

            <FlagIconPicker />
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
});
