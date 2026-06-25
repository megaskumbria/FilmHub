import { PRESET_COLORS } from "@/features/flag-color-picker/model/preset-colors";
import { create } from "zustand";

interface Store {
  flagName: string;
  setFlagName: (flagName: string, color: string) => void;

  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;

  bgOpacity: number;
  setBgOpacity: (bgOpacity: number) => void;

  category: { name: string; id: string };
  setCategory: (category: { name: string; id: string }) => void;

  selectedIcon: { iconName: string; svgContent: string } | null;
  setSelectedIcon: (selectedIcon: { iconName: string; svgContent: string } | null) => void;

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

    category: { name: "", id: "" },
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
