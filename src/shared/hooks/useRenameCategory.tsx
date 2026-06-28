import { useRef, useState, type KeyboardEvent } from "react";
import { useRenameFlagCategory } from "./useFlags";

export const useRenameCategory = () => {
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const pendingFocusRef = useRef(false);
  const prevCategoryNameRef = useRef<string | null>(null);

  const { mutateAsync: renameCategoryAsync } = useRenameFlagCategory();

  const handleStartRename = (currentName: string, categoryId: string) => {
    setEditingCategoryName(currentName);
    setEditingCategoryId(categoryId);
    pendingFocusRef.current = true;
    prevCategoryNameRef.current = currentName;
  };

  const focusInputIfPending = () => {
    if (pendingFocusRef.current) {
      pendingFocusRef.current = false;
      renameInputRef.current?.focus();
    }
  };

  const handleConfirmRename = async (categoryId: string) => {
    const originalName = prevCategoryNameRef.current;
    const newCategoryName = editingCategoryName.trim();

    const isSameName = originalName && originalName === newCategoryName;

    if (!isSameName) {
      await renameCategoryAsync({ categoryId, categoryName: newCategoryName });
      prevCategoryNameRef.current = newCategoryName;
    }

    setEditingCategoryId(null);
    prevCategoryNameRef.current = null;
  };

  const handleRenameKeyDown = (e: KeyboardEvent<HTMLInputElement>, categoryId: string) => {
    if (e.key === "Enter") void handleConfirmRename(categoryId);
    if (e.key === "Escape") setEditingCategoryName("");
  };

  return {
    editingCategoryName,
    editingCategoryId,
    renameInputRef,
    handleStartRename,
    handleConfirmRename,
    handleRenameKeyDown,
    setEditingCategoryName,
    focusInputIfPending,
  };
};
