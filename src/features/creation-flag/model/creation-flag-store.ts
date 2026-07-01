import { PRESET_COLORS } from "@/features/flag-color-picker/model/preset-colors";
import { create } from "zustand";

interface LastSnapshotFlag {
  flagName: string;
  selectedColor: string;
  bgOpacity: number;
  selectedFont: string;
  selectedIcon: {
    iconName: string | null;
    svgContent: string | null;
    iconId: string | null;
  } | null;
  category: { name: string; id: string };
  isCreatingNew: boolean;
}

interface Store {
  flagName: string;
  setFlagName: (flagName: string, color: string) => void;

  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;

  bgOpacity: number;
  setBgOpacity: (bgOpacity: number) => void;

  category: { name: string; id: string };
  setCategory: (category: { name: string; id: string }) => void;

  selectedIcon: {
    iconName: string | null;
    svgContent: string | null;
    iconId: string | null;
  } | null;
  setSelectedIcon: (
    selectedIcon: {
      iconName: string | null;
      svgContent: string | null;
      iconId: string | null;
    } | null,
  ) => void;

  selectedFont: string;
  setSelectedFont: (selectedFont: string) => void;

  presetColors: string[];
  addPresetColor: (color: string) => void;

  isCreatingNew: boolean;
  setIsCreatingNew: (val: boolean) => void;

  editingFlagId: string | null;
  setEditingFlagId: (id: string | null) => void;

  lastSnapshotFlag: LastSnapshotFlag | null;
  cancelCreationFlag: () => void;
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

    isCreatingNew: false,
    setIsCreatingNew: (val) => set({ isCreatingNew: val }),

    editingFlagId: null,
    setEditingFlagId: (id) => set({ editingFlagId: id }),

    lastSnapshotFlag: null,
    cancelCreationFlag: () =>
      set((state) => {
        setTimeout(() => {
          useCreationFlagStore.setState({ lastSnapshotFlag: null });
        }, 300);

        return {
          lastSnapshotFlag: {
            flagName: state.flagName,
            selectedColor: state.selectedColor,
            bgOpacity: state.bgOpacity,
            selectedFont: state.selectedFont,
            selectedIcon: state.selectedIcon,
            category: state.category,
            isCreatingNew: state.isCreatingNew,
          },

          isCreatingNew: false,
          editingFlagId: null,
          flagName: "",
          selectedColor: PRESET_COLORS[0],
          bgOpacity: 0.38,
          selectedFont: "Manrope",
          selectedIcon: null,
          category: { name: "", id: "" },
        };
      }),
  };
});
