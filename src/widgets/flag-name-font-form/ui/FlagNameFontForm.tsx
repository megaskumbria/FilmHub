"use client";

import {
  Label,
  Input,
  FontPicker,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/ui";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { useShallow } from "zustand/shallow";
import { memo } from "react";
import { FlagIconPicker } from "@/features";
import { IconPhoto, IconChevronDown } from "@tabler/icons-react";

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
          value={flagName}
          onChange={(e) => setFlagName(e.target.value, selectedColor)}
        />
        <p className="text-xs text-zinc-muted/50">Up to 30 characters</p>
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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-9 justify-between px-3 border-border/60 bg-surface text-zinc-muted hover:bg-white/5 hover:text-foreground transition-colors"
            >
              <span className="flex items-center gap-2">
                <IconPhoto className="size-4 shrink-0 text-zinc-muted" />
                <span className="text-sm truncate">{selectedIcon ?? "Choose an icon..."}</span>
              </span>
              <IconChevronDown className="size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            sideOffset={6}
            className="max-w-130 w-full p-0 border-border/60 bg-surface-subtle shadow-xl shadow-black/40 rounded-xl"
          >
            <FlagIconPicker />
          </PopoverContent>
        </Popover>

        <p className="text-xs text-zinc-muted/50">Selected: {selectedIcon ?? "—"}</p>
      </div>
    </section>
  );
});
