import { PRESET_COLORS } from "@/features/flag-color-picker/model/preset-colors";
import { create } from "zustand";

interface CreationFlagStore {
  flagName: string;
  setFlagName: (flagName: string, color: string) => void;
  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;
  category: string;
  setCategory: (category: string) => void;
  selectedIcon: string;
  setSelectedIcon: (selectedIcon: string) => void;
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
    category: "",
    setCategory: (category) => set({ category }),
    selectedIcon: "Flame",
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
