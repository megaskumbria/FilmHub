import { PRESET_COLORS } from "@/features/flag-color-picker/model/preset-colors";
import { create } from "zustand";

interface Store {
  flagName: string;
  setFlagName: (flagName: string, color: string) => void;

  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;

  bgOpacity: number;
  setBgOpacity: (bgOpacity: number) => void;

  categoryName: string | null;
  setCategoryName: (categoryName: string) => void;

  selectedIcon: string | null;
  setSelectedIcon: (selectedIcon: string | null) => void;

  selectedFont: string;
  setSelectedFont: (selectedFont: string) => void;

  presetColors: string[];
  addPresetColor: (color: string) => void;
}

export const useCreationFlagStore = create<Store>((set) => {
  return {
    flagName: "New flag",
    setFlagName: (flagName, color) => set({ flagName, selectedColor: color }),

    selectedColor: "rgba(139, 92, 246, 1)",
    setSelectedColor: (selectedColor) => set({ selectedColor }),

    bgOpacity: 0.38,
    setBgOpacity: (bgOpacity) => set({ bgOpacity }),

    categoryName: null,
    setCategoryName: (categoryName) => set({ categoryName }),

    selectedIcon: null,
    setSelectedIcon: (selectedIcon) => set({ selectedIcon }),

    selectedFont: "Manrope",
    setSelectedFont: (selectedFont) => set({ selectedFont }),

    presetColors: PRESET_COLORS,
    addPresetColor: (color) =>
      set((state) => ({
        presetColors:
          state.presetColors.includes(color) ? state.presetColors : [...state.presetColors, color],
      })),
  };
});
