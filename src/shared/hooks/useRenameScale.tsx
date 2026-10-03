"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useRenameFlagScale } from "./useFlagScales";

export const useRenameScale = () => {
  const [editingScaleName, setEditingScaleName] = useState("");
  const [editingScaleId, setEditingScaleId] = useState<string | null>(null);

  const renameInputRef = useRef<HTMLInputElement>(null);
  const pendingFocusRef = useRef(false);
  const prevScaleNameRef = useRef("");

  const { mutateAsync: renameScaleAsync } = useRenameFlagScale();

  const handleStartRename = (currentName: string, scaleId: string) => {
    setEditingScaleName(currentName);
    setEditingScaleId(scaleId);
    pendingFocusRef.current = true;
    prevScaleNameRef.current = currentName;
  };

  const focusInputIfPending = () => {
    if (pendingFocusRef.current) {
      pendingFocusRef.current = false;
      renameInputRef.current?.focus();
    }
  };

  const handleConfirmRename = async (scaleId: string) => {
    if (editingScaleName.trim().length === 0) {
      setEditingScaleName(prevScaleNameRef.current);
      return;
    }

    const originalName = prevScaleNameRef.current;
    const newScaleName = editingScaleName.trim();

    const isSameName = originalName === newScaleName;

    if (!isSameName) {
      await renameScaleAsync({ scaleId: scaleId, scaleName: newScaleName });
      prevScaleNameRef.current = newScaleName;
    }

    setEditingScaleId(null);
  };

  const handleRenameKeyDown = (e: KeyboardEvent<HTMLInputElement>, scaleId: string) => {
    if (e.key === "Enter") void handleConfirmRename(scaleId);
    if (e.key === "Escape") void handleConfirmRename(scaleId);
  };

  return {
    editingScaleName,
    editingScaleId,
    renameInputRef,
    handleStartRename,
    handleConfirmRename,
    handleRenameKeyDown,
    setEditingScaleName,
    focusInputIfPending,
  };
};
