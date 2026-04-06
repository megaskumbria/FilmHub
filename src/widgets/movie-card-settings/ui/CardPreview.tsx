"use client";

import { PosterPreviewActions, PosterUpload } from "@/features";
import { DotGrid } from "@/shared/ui";
import { useImageUpload } from "@/shared/hooks";
import { ZONES } from "../model/zones";

export const CardPreview = () => {
  const { fileInputRef, handleReset, preview, handleFileInputChange, handleDrop } =
    useImageUpload();

  return (
    <section className="relative flex flex-col items-center bg-obsidian p-4 gap-7 overflow-y-auto drawer-scroll min-h-0">
      <DotGrid />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-accent/5 blur-3xl rounded-full" />

      <p className="relative text-xs font-semibold tracking-widest uppercase text-zinc-muted">
        Preview
      </p>

      <div className="max-w-[270px] w-full">
        <PosterUpload
          fileInputRef={fileInputRef}
          preview={preview}
          handleFileInputChange={handleFileInputChange}
          handleDrop={handleDrop}
        />
      </div>

      <div className="relative flex items-center gap-2">
        <PosterPreviewActions onResetPreview={handleReset} />
      </div>

      <div className="relative flex items-center gap-4">
        {ZONES.map(({ key, label, dotClass }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full ${dotClass}`} />

            <span className="text-xs font-medium tracking-wider text-zinc-muted/60 uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="relative text-xs text-zinc-muted/40 text-center max-w-[190px] leading-relaxed">
        Toggle blocks on or off for each card zone
      </p>
    </section>
  );
};
