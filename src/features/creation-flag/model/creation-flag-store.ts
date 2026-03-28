import { create } from "zustand";

interface CreationFlagStore {
  flagName: string;
  setFlagName: (flagName: string) => void;
  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;
  category: string;
  setCategory: (category: string) => void;
  selectedIcon: string;
  setSelectedIcon: (selectedIcon: string) => void;
  selectedFont: string;
  setSelectedFont: (selectedFont: string) => void;
}

export const useCreationFlagStore = create<CreationFlagStore>((set) => {
  return {
    flagName: "Новый флаг",
    setFlagName: (flagName) => set({ flagName }),
    selectedColor: "#8b5cf6",
    setSelectedColor: (selectedColor) => set({ selectedColor }),
    category: "",
    setCategory: (category) => set({ category }),
    selectedIcon: "Flame",
    setSelectedIcon: (selectedIcon) => set({ selectedIcon }),
    selectedFont: "Manrope",
    setSelectedFont: (selectedFont) => set({ selectedFont }),
  };
});
