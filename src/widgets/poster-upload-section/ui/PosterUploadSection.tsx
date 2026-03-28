"use client";

import { PosterPreviewActions } from "@/features";
import { useImageUpload } from "@/shared/hooks";
import { PosterUpload } from "@/shared/ui/poster-upload.tsx";
import { Settings } from "lucide-react";
import { SettingsModal } from "@/widgets";
import { Button } from "@/shared/ui";

export const PosterUploadSection = () => {
  const { preview, fileInputRef, handleFileInputChange, handleDrop, handleReset } =
    useImageUpload();

  return (
    <section className="row-span-2 rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <span className="text-sm font-semibold text-foreground tracking-wide">Постер</span>
        </div>

        <SettingsModal>
          <Button className="flex items-center gap-1.5 group">
            <Settings className="size-4 text-zinc-muted/90 group-hover:text-foreground/70 transition-colors" />
            <span className="text-xs text-zinc-muted/90 font-semibold tracking-widest transition-colors group-hover:text-foreground/70 ">
              Настроить
            </span>
          </Button>
        </SettingsModal>
      </div>

      <PosterUpload
        fileInputRef={fileInputRef}
        preview={preview}
        handleFileInputChange={handleFileInputChange}
        handleDrop={handleDrop}
        flagPreview
      />

      <div className="flex items-center gap-2">
        <PosterPreviewActions onResetPreview={handleReset} />
      </div>
    </section>
  );
};
