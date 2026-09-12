"use client";

import { useRef, useState } from "react";
import { CircleStencil, Cropper, type CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { IconX } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { Button, Dialog, DialogClose, DialogContent, DialogTitle } from "@/shared/ui";
import { canvasToFile } from "../lib/canvasToFile";

const HANDLER_CLASS_NAMES = {
  default: "!h-4 !w-4 !bg-transparent border-white/90",
  westNorth: "border-l-2 border-t-2 rounded-tl-sm",
  eastNorth: "border-r-2 border-t-2 rounded-tr-sm",
  westSouth: "border-l-2 border-b-2 rounded-bl-sm",
  eastSouth: "border-r-2 border-b-2 rounded-br-sm",
};

const HIDDEN_LINES = { west: false, east: false, north: false, south: false };

interface Props {
  open: boolean;
  imageUrl: string;
  onOpenChange: (open: boolean) => void;
  onCropDone: (file: File) => void;
}

export const AvatarCrop = ({ open, imageUrl, onOpenChange, onCropDone }: Props) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const cropperRef = useRef<CropperRef>(null);

  const handleSave = async (): Promise<void> => {
    const canvas = cropperRef.current?.getCanvas();
    if (!canvas) return;

    setIsSaving(true);

    try {
      const file = await canvasToFile(canvas);
      onCropDone(file);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="sm:max-w-105 gap-0 overflow-hidden rounded-2xl border-border p-0 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <DialogTitle className="text-base font-semibold text-foreground">Crop avatar</DialogTitle>

          <DialogClose asChild>
            <Button
              size="none"
              className="p-1 text-zinc-muted hover:text-foreground transition-colors"
            >
              <IconX className="size-6" />
            </Button>
          </DialogClose>
        </div>

        <div className="relative h-80 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-50 pointer-events-none"
          />

          <Cropper
            ref={cropperRef}
            src={imageUrl}
            stencilComponent={CircleStencil}
            stencilProps={{
              aspectRatio: 1,
              movable: true,
              resizable: true,
              lines: HIDDEN_LINES,
              handlerClassNames: HANDLER_CLASS_NAMES,
            }}
            className="relative z-10 h-full w-full bg-transparent!"
          />
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-5">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="h-9 px-4 rounded-xl text-sm font-medium border-border text-foreground hover:bg-white/5"
            >
              <span>Cancel</span>
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="accent"
            disabled={isSaving}
            onClick={() => void handleSave()}
            className="h-9 px-4 rounded-xl justify-center items-center text-sm font-semibold min-w-20"
          >
            {isSaving ?
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span className="text-sm">Saving...</span>
              </>
            : <span>Save</span>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
