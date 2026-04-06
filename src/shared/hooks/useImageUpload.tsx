"use client";

import { useState } from "react";
import { useRef } from "react";
import { ChangeEvent } from "react";
import { DragEvent } from "react";
import { MOVIE_CARD_PREVIEW_KEY } from "@/shared/storages/storage-keys";
import { toast } from "sonner";

export const useImageUpload = () => {
  const [preview, setPreview] = useState<string | null>(() => {
    const preview = localStorage.getItem(MOVIE_CARD_PREVIEW_KEY);
    return preview ?? null;
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      localStorage.setItem(MOVIE_CARD_PREVIEW_KEY, dataUrl);
      toast.success("Poster uploaded", { position: "bottom-left" });
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setPreview(null);
      localStorage.removeItem(MOVIE_CARD_PREVIEW_KEY);

      toast.success("Preview cleared", { position: "bottom-left" });
      return;
    }
    toast.error("Could not reset preview", { position: "bottom-left" });
  };

  return {
    preview,
    fileInputRef,
    handleFileInputChange,
    handleDrop,
    handleReset,
  };
};
