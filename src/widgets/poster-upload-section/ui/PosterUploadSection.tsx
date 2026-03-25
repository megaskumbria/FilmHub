"use client";

import { cn } from "@/shared/lib/utils";
import { ImagePlus } from "lucide-react";
import { PosterPreviewActions } from "@/features";
import { useState } from "react";
import { useImageUpload } from "@/shared/hooks";

export const PosterUploadSection = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const { preview, fileInputRef, handleFileInputChange, handleDrop, handleReset } =
    useImageUpload();

  return (
    <section className="row-span-2 rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
        <span className="text-sm font-semibold text-foreground tracking-wide">Постер</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div
        className={cn(
          "relative flex-1 rounded-lg border-2 border-dashed overflow-hidden cursor-pointer transition-colors",
          isDragOver ? "border-accent/60 bg-accent/5" : "border-border/40 hover:border-border/70",
        )}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {preview ?
          <img
            src={preview}
            alt="poster"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        : <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 select-none">
            <ImagePlus className="size-8 text-zinc-muted/40" />
            <p className="text-[11px] text-zinc-muted/50 text-center leading-relaxed px-4">
              Нажмите или перетащите
              <br />
              изображение сюда
            </p>
          </div>
        }

        {isDragOver && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-accent/10 border-2 border-accent/40 pointer-events-none">
            <span className="text-xs font-medium text-accent">Отпустите файл</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <PosterPreviewActions onResetPreview={handleReset} />
      </div>
    </section>
  );
};
