"use client";

import { useState, type ReactNode } from "react";
import { Camera, Crown, Lock, X } from "lucide-react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { COLOR_PRESETS } from "../model/color-presets";
import { ICONS } from "../model/icons";

const TOTAL_FOLDERS = 10;
const USED_FOLDERS = 7;

interface CreateFolderModalProps {
  children: ReactNode;
  isEditing: boolean;
}

export function CreateFolderModal({ children, isEditing }: CreateFolderModalProps) {
  const [selectedIcon, setSelectedIcon] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [folderName, setFolderName] = useState("");

  const remaining = TOTAL_FOLDERS - USED_FOLDERS;
  const isNearLimit = remaining <= 2;

  const selectedPreset = COLOR_PRESETS[selectedColor];
  const SelectedIcon = ICONS[selectedIcon].icon;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="sm:max-w-[460px] gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl"
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-base font-semibold text-foreground">
              {isEditing ? "Edit collection" : "New collection"}
            </DialogTitle>

            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums border",
                isNearLimit ?
                  "bg-amber-500/10 border-amber-500/30 text-amber-400"
                : "bg-surface border-border text-zinc-muted",
              )}
            >
              <span>{USED_FOLDERS}</span>
              <span className="opacity-50">/</span>
              <span>{TOTAL_FOLDERS}</span>
            </div>
          </div>

          <DialogClose asChild>
            <Button size="none" className="p-1 text-muted hover:text-foreground transition-colors">
              <X className="size-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="px-5 py-5 flex flex-col gap-5">
          <div className="flex gap-4 items-start">
            <div
              className={cn(
                "shrink-0 size-16 rounded-xl border overflow-hidden relative flex items-center justify-center bg-linear-to-t",
                selectedPreset.bg,
                selectedPreset.border,
              )}
            >
              <SelectedIcon className="size-7 text-white/80" />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                Name
              </Label>
              <Input
                variant="neutral"
                inputSize="default"
                placeholder="e.g. Favorite thrillers"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
              Icon
            </Label>
            <div className="grid grid-cols-8 gap-1.5">
              {ICONS.map(({ icon: Icon, label }, i) => (
                <Button
                  key={i}
                  title={label}
                  onClick={() => setSelectedIcon(i)}
                  className={cn(
                    "size-10 rounded-lg flex items-center justify-center transition-all duration-150",
                    "border text-muted hover:text-foreground",
                    selectedIcon === i ?
                      "bg-accent/15 border-accent/50 text-accent"
                    : "bg-surface border-border hover:bg-surface-elevated",
                  )}
                >
                  <Icon className="size-4" />
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
              Color
            </Label>
            <div className="flex items-center gap-2">
              {COLOR_PRESETS.map((preset, i) => (
                <Button
                  key={i}
                  title={preset.label}
                  onClick={() => setSelectedColor(i)}
                  className={cn(
                    "size-7 rounded-full border-2 transition-all hover:scale-105 duration-150 flex items-center justify-center",
                    preset.dot,
                    selectedColor === i ? "border-white scale-110" : (
                      "border-transparent opacity-70 hover:scale-105"
                    ),
                  )}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <div className="flex items-center gap-1.5 text-xs text-zinc-muted">
                <Crown className="size-3 text-amber-400" />
                <span>Premium</span>
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Button
              className={cn(
                "w-full rounded-xl border border-border border-dashed px-4 py-3",
                "flex items-center gap-3",
                "bg-surface hover:bg-surface-elevated transition-colors",
                "group",
              )}
            >
              <div className="size-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Camera className="size-4 text-amber-400" />
              </div>
              <div className="flex flex-col items-start gap-0.5 flex-1">
                <span className="text-sm font-medium text-foreground">Custom cover</span>
                <span className="text-xs text-zinc-muted">Upload your own image for the folder</span>
              </div>
              <Lock className="size-4 text-zinc-muted group-hover:text-amber-400 transition-colors" />
            </Button>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-lg text-sm text-muted hover:text-foreground"
            >
              <span>Cancel</span>
            </Button>
          </DialogClose>

          <Button
            variant="accent"
            size="sm"
            className="rounded-lg text-sm"
            disabled={!folderName.trim()}
          >
            <span className="font-medium">Create collection</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
