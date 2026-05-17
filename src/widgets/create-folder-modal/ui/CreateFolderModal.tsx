"use client";

import { type ReactNode } from "react";
import { IconX } from "@tabler/icons-react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { CreateFolder } from "@/features";

const TOTAL_FOLDERS = 10;
const USED_FOLDERS = 7;

interface CreateFolderModalProps {
  children: ReactNode;
  isEditing: boolean;
}

export function CreateFolderModal({ children, isEditing }: CreateFolderModalProps) {
  const remaining = TOTAL_FOLDERS - USED_FOLDERS;
  const isNearLimit = remaining <= 2;

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
              <IconX className="size-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <CreateFolder />
      </DialogContent>
    </Dialog>
  );
}
