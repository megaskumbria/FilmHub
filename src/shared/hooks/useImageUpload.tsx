"use client";

import { useState, DragEvent, useRef, ChangeEvent, useEffect } from "react";
import { MOVIE_CARD_PREVIEW_KEY } from "@/shared/storages/storage-keys";
import { toast } from "sonner";

export interface IPreviewInfo {
  backdropUrl: string;
  genres: string[];
  id: number;
  originalTitle: string;
  originalName: string;
  overview: string;
  posterUrl: string;
  releaseDate: string;
  firstAirDate: string;
  voteAverage: number;
  ratingImdb: string | null;
}

export const useImageUpload = () => {
  const [previewInfo, setPreviewInfo] = useState<IPreviewInfo>({
    posterUrl: "",
    backdropUrl: "",
    genres: [],
    id: 0,
    originalTitle: "",
    originalName: "",
    overview: "",
    releaseDate: "",
    firstAirDate: "",
    voteAverage: 0,
    ratingImdb: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem(MOVIE_CARD_PREVIEW_KEY);
    if (!saved) return;

    try {
      setPreviewInfo(JSON.parse(saved) as IPreviewInfo);
    } catch {
      localStorage.removeItem(MOVIE_CARD_PREVIEW_KEY);
    }
  }, []);

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
      setPreviewInfo({ ...previewInfo, posterUrl: dataUrl });
      localStorage.setItem(MOVIE_CARD_PREVIEW_KEY, dataUrl);
      toast.success("Poster uploaded", { position: "bottom-left" });
    };

    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    if (fileInputRef.current || previewInfo) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      setPreviewInfo({
        posterUrl: "",
        ratingImdb: null,
        voteAverage: 0,
        backdropUrl: "",
        genres: [],
        id: 0,
        originalTitle: "",
        originalName: "",
        overview: "",
        releaseDate: "",
        firstAirDate: "",
      });

      localStorage.removeItem(MOVIE_CARD_PREVIEW_KEY);

      toast.success("Preview cleared", { position: "bottom-left" });
      return;
    }
    toast.error("Could not reset preview", { position: "bottom-left" });
  };

  const handleSetPreviewInfo = (previewInfo: IPreviewInfo) => {
    setPreviewInfo(previewInfo);
    localStorage.setItem(MOVIE_CARD_PREVIEW_KEY, JSON.stringify(previewInfo));
  };

  return {
    previewInfo,
    fileInputRef,
    handleFileInputChange,
    handleDrop,
    handleReset,
    handleSetPreviewInfo,
  };
};
