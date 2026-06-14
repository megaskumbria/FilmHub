"use client";

import { useEffect, useRef, useState } from "react";

export const useWindowFileDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const counterRef = useRef(0);

  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes("Files")) {
        counterRef.current++;
        setIsDragging(true);
      }
    };

    const onDragLeave = () => {
      counterRef.current--;
      if (counterRef.current <= 0) {
        counterRef.current = 0;
        setIsDragging(false);
      }
    };

    const onDrop = () => {
      counterRef.current = 0;
      setIsDragging(false);
    };

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);

    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  return isDragging;
};
