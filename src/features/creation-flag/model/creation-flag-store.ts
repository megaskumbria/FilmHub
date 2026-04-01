import { PRESET_COLORS } from "@/features/flag-color-picker/model/preset-colors";
import { create } from "zustand";

interface CreationFlagStore {
  flagName: string;
  setFlagName: (flagName: string, color: string) => void;
  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;
  bgOpacity: number;
  setBgOpacity: (bgOpacity: number) => void;
  category: string | null;
  setCategory: (category: string) => void;
  selectedIcon: string | null;
  setSelectedIcon: (selectedIcon: string | null) => void;
  selectedFont: string;
  setSelectedFont: (selectedFont: string) => void;

  presetColors: string[];
  addPresetColor: (color: string) => void;
}

export const useCreationFlagStore = create<CreationFlagStore>((set) => {
  return {
    flagName: "Новый флаг",
    setFlagName: (flagName, color) => set({ flagName, selectedColor: color }),
    selectedColor: "rgba(139, 92, 246, 1)",
    setSelectedColor: (selectedColor) => set({ selectedColor }),
    bgOpacity: 0.38,
    setBgOpacity: (bgOpacity) => set({ bgOpacity }),
    category: null,
    setCategory: (category) => set({ category }),
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
